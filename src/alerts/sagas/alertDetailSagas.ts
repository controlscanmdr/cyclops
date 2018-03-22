// Vendor
import { SagaIterator } from 'redux-saga';
import {
  all, takeLatest, call, fork, take, cancelled, put,
  cancel, race,
} from 'redux-saga/effects';

// Local
import * as alertDetailActions from '../actions/alertDetailActions';
import * as alertEndpoint from '../services/alertsAPI';
import { getLocationsWithAddress } from '../../map/services/getLocationsWithAddress';
import { createLocationGeoJSON } from '../../map/services/createLocationGeoJSON';
import { addError } from '../../errors/actions/errorModalActions';
import { checkAlertUpdate } from '../services/checkAlertUpdate';
import { modifyAlertUpdate } from '../services/modifyAlertUpdate';
import { createAlertUpdateComment } from '../services/createAlertUpdateComment';
import { AlertDetail } from '../types/Alert';

/**
 * Fetches a new alert detail object and updates it with location information if applicable.
 * @param {FetchAlertAction} action
 * @returns {SagaIterator}
 */
export function * fetchAlert(action: alertDetailActions.FetchAlertAction): SagaIterator {
  try {
    const alert = yield call(alertEndpoint.fetchAlert, action.payload.alertID);

    if (!alert.distillery) {
      return yield put(alertDetailActions.fetchAlertSuccess(alert, null, null));
    }

    const locations = yield call(getLocationsWithAddress, alert.distillery.container, alert.data);
    const markers = locations.length ? createLocationGeoJSON(locations) : null;

    yield put(alertDetailActions.fetchAlertSuccess(alert, locations, markers));
  } catch (error) {
    if (yield cancelled()) return yield put(alertDetailActions.fetchAlertCanceled());

    yield put(alertDetailActions.fetchAlertFailure());
    yield put(addError(error));
  }
}

/**
 * Updates the current alert detail object with the given fields and creates an update comment
 * on the alert as needed.
 * @param {UpdateAlertAction} action
 * @returns {SagaIterator}
 */
export function * updateAlert(action: alertDetailActions.UpdateAlertAction): SagaIterator {
  let update: AlertDetail | undefined;

  try {
    const request = checkAlertUpdate(action.payload.alert, action.payload.update);

    if (!request.valid) {
      yield put(alertDetailActions.addErrorMessage(request.errors));
      return yield put(alertDetailActions.updateAlertFailed());
    }

    const fields = modifyAlertUpdate(action.payload.alert, action.payload.update);
    const comment = createAlertUpdateComment(action.payload.alert, fields);

    update = yield call(alertEndpoint.updateAlert, action.payload.alert.id, fields);

    if (!comment) {
      yield put(alertDetailActions.updateAlertSuccess(update!));
      return yield put(alertDetailActions.closeErrorMessage());
    }

    update = yield call(alertEndpoint.addComment, action.payload.alert.id, comment);

    yield put(alertDetailActions.updateAlertSuccess(update!));
    yield put(alertDetailActions.closeErrorMessage());
  } catch (error) {
    if (update) yield put(alertDetailActions.updateAlertPartial(update));
    else yield put(alertDetailActions.updateAlertFailed());

    yield put(addError(error));
  } finally {
    if (yield cancelled()) yield put(alertDetailActions.updateAlertCanceled());
  }
}

/**
 * Creates a cancellable fork of the alert fetch saga.
 * @param {FetchAlertAction} action
 * @returns {SagaIterator}
 */
export function * forkAlertFetch(action: alertDetailActions.FetchAlertAction): SagaIterator {
  const task = yield fork(fetchAlert, action);

  // Cancel the fetch if the alert panel is closed.
  yield take(alertDetailActions.CLOSE_ALERT);
  yield cancel(task);
}

/**
 * Creates a cancellable fork of the update alert saga.
 * @param {UpdateAlertAction} action
 * @returns {SagaIterator}
 */
export function * forkAlertUpdate(action: alertDetailActions.UpdateAlertAction): SagaIterator {
  const task = yield fork(updateAlert, action);

  // Cancel the alert update if:
  yield race({
    // Request for a new alert is made.
    fetch: take(alertDetailActions.FETCH_ALERT),
    // The alert panel is closed.
    close: take(alertDetailActions.CLOSE_ALERT),
  });
  yield cancel(task);
}

/**
 * Root saga that runs all the alert detail sagas in parallel.
 * @returns {SagaIterator}
 */
export function * alertDetailSagas(): SagaIterator {
  yield all([
    takeLatest(alertDetailActions.FETCH_ALERT, forkAlertFetch),
    takeLatest(alertDetailActions.UPDATE_ALERT, forkAlertUpdate),
  ]);
}
