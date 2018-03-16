/**
 * The contents of this file are subject to the CYPHON Proprietary Non-
 * Commercial Registered User Use License Agreement (the "Agreement”). You
 * may not use this file except in compliance with the Agreement, a copy
 * of which may be found at https://github.com/dunbarcyber/cyclops/. The
 * developer of the CYPHON technology and platform is Dunbar Security
 * Systems, Inc.
 *
 * The CYPHON technology or platform are distributed under the Agreement on
 * an “AS IS” basis, WITHOUT WARRANTY OF ANY KIND, either express or
 * implied. See the Agreement for specific terms.
 *
 * Copyright (C) 2017 Dunbar Security Solutions, Inc. All Rights Reserved.
 *
 * Contributor/Change Made By: ________________. [Only apply if changes
 * are made]
 */

// Vendor
import { SagaIterator } from 'redux-saga';
import { put, call, all, takeEvery } from 'redux-saga/effects';

// Local
import * as actions from './alertDetailTagActions';
import * as tagApi from '~/services/tags/services/tagAPI';
import { fetchAlert } from '~/store/alertDetail';
import { addError } from '~/store/errorModal';
import { fetchTags } from '~/store/tagStore/tagStoreActions';
import { fetchTagListSaga } from '~/store/tagStore/tagStoreSagas';

/**
 * Adds a new tag to a specified alert.
 * @param {AddTagAction} action
 * @returns {SagaIterator}
 */
export function * addTagSaga(action: actions.AddTagAction): SagaIterator {
  const { alertId, tagId, userId } = action.payload;
  try {
    yield call(tagApi.addTagRelation, 'alert', alertId, tagId, userId);
    yield put(fetchAlert(alertId));
    yield put(actions.addTagSuccess());
  } catch (error) {
    yield put(actions.addTagFailure());
    yield put(addError(error));
  }
}

/**
 * Removes a tag from a specified alert.
 * @param {RemoveTagAction} action
 * @returns {SagaIterator}
 */
export function * removeTagSaga(action: actions.RemoveTagAction): SagaIterator {
  const { alertId, tagId } = action.payload;
  try {
    const relation = yield call(tagApi.findTagRelation, 'alert', alertId, tagId);
    yield call(tagApi.deleteTagRelation, relation.id);
    yield put(fetchAlert(alertId));
    yield put(actions.removeTagSuccess());
  } catch (error) {
    yield put(actions.removeTagFailed());
    yield put(addError(error));
  }
}

/**
 * Fetches the necessary resources for the tag panel.
 * @returns {SagaIterator}
 */
export function * openTagPanelSaga(): SagaIterator {
  yield put(fetchTags());
}

/**
 * Root saga that starts all the alert detail tag sagas in parallel.
 * @returns {SagaIterator}
 */
export function * alertDetailTagSagas(): SagaIterator {
  yield all([
    takeEvery(actions.ADD_TAG, addTagSaga),
    takeEvery(actions.REMOVE_TAG, removeTagSaga),
    takeEvery(actions.OPEN_TAG_PANEL, openTagPanelSaga),
  ]);
}
