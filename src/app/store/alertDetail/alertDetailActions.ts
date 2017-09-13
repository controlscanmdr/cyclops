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
import axios, { Canceler } from 'axios';
import * as _ from 'lodash';

// Local
import {
  ReduxAction,
  ThunkActionPromise,
  ReduxDispatch,
} from '~/store/types';
import { createAction } from '~/utils/reduxUtils';
import {
  Alert,
  AlertDetail,
  AlertUpdateRequest,
} from '~/services/alerts/types';
import { getCancelTokenSource } from '~/services/cyphon/utils/cancelTokens';
import {
  fetchAlert,
  updateAlert,
  performAction,
  addComment,
} from '~/services/alerts/utils/alertsAPI';
import { addError } from '../errorModal/errorModalActions';
import { getLocationsWithAddress } from '~/services/map/utils/getLocationsWithAddress';
import { createLocationGeoJSON } from '~/services/map/utils/createLocationGeoJSON';
import {
  LocationFieldAddress,
  Markers,
} from '~/services/map/types';
import {
  Result,
  ResultIPAdresses,
} from '~/types/result';
import { Container } from '~/services/containers/types';
import { getFieldsOfType } from '~/services/containers/utils/containerUtils';
import { CONTAINER_FIELDS } from '~/services/containers/constants';
import { Dictionary } from '~/types/object';
import { checkAlertUpdate } from '~/services/alerts/utils/checkAlertUpdate';
import { modifyAlertUpdate } from '~/services/alerts/utils/modifyAlertUpdate';
import { createAlertUpdateComment } from '~/routes/AlertDetail/utils/createAlertUpdateComment';

// --------------------------------------------------------------------------
// Helper Functions/Variables
// --------------------------------------------------------------------------

/**
 * Creates a function that handles an error from an API request for alert
 * detail actions.
 * @param dispatch
 * @returns {(error:any)=>void}
 */
function handleError(dispatch: ReduxDispatch) {
  return (error: any): void => {
    if (axios.isCancel(error)) { return; }

    dispatch(requestFailed());
    dispatch(addError(error));
  };
}

/**
 * Creates a function that takes an alert and updates the alert detail with
 * that alert.
 * @param dispatch
 * @returns {(alert:AlertDetail)=>void}
 */
function updateAlertDetailObject(dispatch: ReduxDispatch) {
  return (alert: AlertDetail): void => {
    dispatch(updateAlertSuccess(alert));
    dispatch(closeErrorMessage());
  };
}

/**
 * Prefix for all the action types in this module.
 * @type {string}
 */
const ACTION_PREFIX = 'ALERT_DETAIL';

/**
 * Alert fields that should include a comment whenever they are updated.
 * @type {string[]}
 */
const UPDATE_COMMENT_FIELDS = ['outcome', 'level', 'assigned_user'];

// --------------------------------------------------------------------------
// CLOSE_ALERT
// --------------------------------------------------------------------------

/**
 * Action Type: When the alerts detail is closed.
 * @type {string}
 */
export const CLOSE_ALERT = `${ACTION_PREFIX}/CLOSE_ALERT`;

/** CLOSE_ALERT payload type. */
export type CloseAlertPayload = undefined;

/** CLOSE_ALERT action type. */
export type CloseAlertAction = ReduxAction<CloseAlertPayload>;

/**
 * Creates a CLOSE_ALERT action.
 * @returns {ReduxAction<CloseAlertPayload>}
 */
export function closeAlert(): CloseAlertAction {
  return createAction(CLOSE_ALERT, undefined);
}

// --------------------------------------------------------------------------
// FETCH_ALERT_PENDING
// --------------------------------------------------------------------------

/**
 * Action Type: When a request for an alerts object for the alerts detail
 * is made.
 * @type {string}
 */
export const FETCH_ALERT_PENDING = `${ACTION_PREFIX}/FETCH_ALERT_PENDING`;

/** FETCH_ALERT_PENDING payload type. */
export interface FetchAlertPendingPayload {
  alertId: number;
  canceler: Canceler;
}

/** FETCH_ALERT_PENDING action type. */
export type FetchAlertPendingAction = ReduxAction<FetchAlertPendingPayload>;

/**
 * Creates a FETCH_ALERT_PENDING action and cancels any other requests
 * that have been made prior to this action.
 * @param alertId ID of the alerts being fetched.
 * @param canceler Function that cancels the promise making the request.
 * @returns {ReduxAction<{alertId: number, canceler: Canceler}>}
 */
export function fetchAlertPending(alertId: number, canceler: Canceler):
  FetchAlertPendingAction {
  return createAction(FETCH_ALERT_PENDING, { alertId, canceler });
}

// --------------------------------------------------------------------------
// FETCH_ALERT_SUCCESS
// --------------------------------------------------------------------------

/**
 * Action Type: When a request for an alert object is successful.
 * @type {string}
 */
export const FETCH_ALERT_SUCCESS = `${ACTION_PREFIX}/FETCH_ALERT_SUCCESS`;

/** FETCH_ALERT_SUCCESS payload type. */
export interface FetchAlertSuccessPayload {
  alert: AlertDetail;
  locations: LocationFieldAddress[] | null;
  markers: Markers | null;
}

/** FETCH_ALERT_SUCCESS action type. */
export type FetchAlertSuccessAction = ReduxAction<FetchAlertSuccessPayload>;

/**
 * Creates a FETCH_ALERT_SUCCESS action.
 * @returns {Action<FetchAlertSuccessPayload>;
 */
export function fetchAlertSuccess(
  alert: AlertDetail,
  locations: LocationFieldAddress[] | null,
  markers: Markers | null,
): FetchAlertSuccessAction {
  return createAction(FETCH_ALERT_SUCCESS, { alert, locations, markers });
}

// --------------------------------------------------------------------------
// REQUEST_PENDING
// --------------------------------------------------------------------------

/**
 * Action Type: When a request to the alert detail API is sent.
 * @type {string}
 */
export const REQUEST_PENDING = `${ACTION_PREFIX}/REQUEST_PENDING`;

/**
 * REQUEST_PENDING payload type.
 */
export type RequestPendingPayload = Canceler;

/**
 * REQUEST_PENDING action type.
 */
export type RequestPendingAction = ReduxAction<RequestPendingPayload>;

/**
 * Creates a REQUEST_PENDING action.
 * @returns {Action<RequestPendingPayload>;
 */
export function requestPending(canceler: Canceler): RequestPendingAction {
  return createAction(REQUEST_PENDING, canceler);
}

// --------------------------------------------------------------------------
// UPDATE_ALERT_SUCCESS
// --------------------------------------------------------------------------

/**
 * Action Type: When the alerts in the alerts detail is updated successfully.
 * @type {string}
 */
export const UPDATE_ALERT_SUCCESS = `${ACTION_PREFIX}/UPDATE_ALERT_SUCCESS`;

/**
 * UPDATE_ALERT_SUCCESS payload type.
 */
export type UpdateAlertSuccessPayload = AlertDetail;

/**
 * UPDATE_ALERT_SUCCESS action type.
 */
export type UpdateAlertSuccessAction = ReduxAction<UpdateAlertSuccessPayload>;

/**
 * Creates a UPDATE_ALERT_SUCCESS action.
 * @param alert
 * @returns {ReduxAction<AlertDetail>}
 */
export function updateAlertSuccess(
  alert: AlertDetail,
): UpdateAlertSuccessAction {
  return createAction(UPDATE_ALERT_SUCCESS, alert);
}

// --------------------------------------------------------------------------
// ADD_ERROR_MESSAGE
// --------------------------------------------------------------------------

/**
 * Action Type: When an error message should be displayed over the alert detail.
 * @type {string}
 */
export const ADD_ERROR_MESSAGE = `${ACTION_PREFIX}/ADD_ERROR_MESSAGE`;

/** ADD_ERROR_MESSAGE payload type. */
export type AddErrorMessagePayload = string[];

/** ADD_ERROR_MESSAGE action type. */
export type AddErrorMessageAction = ReduxAction<AddErrorMessagePayload>;

/**
 * Creates a ADD_ERROR_MESSAGE action.
 * @returns {AddErrorMessageAction}
 */
export function addErrorMessage(message: string[]): AddErrorMessageAction {
  return createAction(ADD_ERROR_MESSAGE, message);
}

// --------------------------------------------------------------------------
// CLOSE_ERROR_MESSAGE
// --------------------------------------------------------------------------

/**
 * Action Type: When the alert detail error message is requested to be cleared.
 * @type {string}
 */
export const CLOSE_ERROR_MESSAGE = `${ACTION_PREFIX}/CLOSE_ERROR_MESSAGE`;

/**
 * CLOSE_ERROR_MESSAGE payload type.
 */
export type CloseErrorMessagePayload = undefined;

/**
 * CLOSE_ERROR_MESSAGE action type.
 */
export type CloseErrorMessageAction = ReduxAction<CloseErrorMessagePayload>;

/**
 * Creates a CLOSE_ERROR_MESSAGE action.
 * @returns {CloseErrorMessageAction}
 */
export function closeErrorMessage(): CloseErrorMessageAction {
  return createAction(CLOSE_ERROR_MESSAGE, undefined);
}

// --------------------------------------------------------------------------
// REQUEST_FAILED
// --------------------------------------------------------------------------

/**
 * Action Type: When any request made to the alert detail api fails.
 * @type {string}
 */
export const REQUEST_FAILED = `${ACTION_PREFIX}/REQUEST_FAILED`;

/**
 * REQUEST_FAILED payload type.
 */
export type RequestFailedPayload = undefined;

/**
 * REQUEST_FAILED action type.
 */
export type RequestFailedAction = ReduxAction<RequestFailedPayload>;

/**
 * Creates a REQUEST_FAILED action.
 * @returns {Action<RequestFailedPayload>;
 */
export function requestFailed(): RequestFailedAction {
  return createAction(REQUEST_FAILED, undefined);
}

// --------------------------------------------------------------------------
// OPEN_DATA_MODAL
// --------------------------------------------------------------------------

/**
 * Action Type: When a modal is opened to analyze the alert detail data.
 * @type {string}
 */
export const OPEN_DATA_MODAL = `${ACTION_PREFIX}/OPEN_DATA_MODAL`;

/**
 * OPEN_DATA_MODAL payload type.
 */
export type OpenDataModalPayload = ResultIPAdresses | null;

/**
 * OPEN_DATA_MODAL action type.
 */
export type OpenDataModalAction = ReduxAction<OpenDataModalPayload>;

/**
 * Creates a OPEN_DATA_MODAL action.
 * @returns {Action<OpenDataModalPayload>;
 */
export function openDataModal(
  data: Result,
  container: Container,
): OpenDataModalAction {
  const IPAddresses = getFieldsOfType<string | null>(
    CONTAINER_FIELDS.IP_ADDRESS, container, data,
  );

  if (!IPAddresses.length) { return createAction(OPEN_DATA_MODAL, null); }

  const nonNullIPS: Dictionary<string> = {};

  IPAddresses.filter((IPAddress) => IPAddress !== null)
    .forEach((IPAddress) => {
      nonNullIPS[IPAddress.field] = IPAddress.value as string;
    });

  if (_.isEmpty(nonNullIPS)) { return createAction(OPEN_DATA_MODAL, null); }

  return createAction(OPEN_DATA_MODAL, nonNullIPS);
}

// --------------------------------------------------------------------------
// CLOSE_DATA_MODAL
// --------------------------------------------------------------------------

/**
 * Action Type: When a modal display the alert data is closed.
 * @type {string}
 */
export const CLOSE_DATA_MODAL = `${ACTION_PREFIX}/CLOSE_DATA_MODAL`;

/**
 * CLOSE_DATA_MODAL payload type.
 */
export type CloseDataModalPayload = undefined;

/**
 * CLOSE_DATA_MODAL action type.
 */
export type CloseDataModalAction = ReduxAction<CloseDataModalPayload>;

/**
 * Creates a CLOSE_DATA_MODAL action.
 * @returns {Action<CloseDataModalPayload>;
 */
export function closeDataModal(): CloseDataModalAction {
  return createAction(CLOSE_DATA_MODAL, undefined);
}

// --------------------------------------------------------------------------
// Thunk Actions
// --------------------------------------------------------------------------

/**
 * Fetchs an alert object for the alert detail view.
 * @returns {ThunkActionPromise}
 */
export function fetchAlertDetail(alertId: number): ThunkActionPromise {
  return (dispatch) => {
    const source = getCancelTokenSource();
    let nestedAlert: AlertDetail;

    dispatch(fetchAlertPending(alertId, source.cancel));

    return fetchAlert(alertId, source.token)
      .then((alert) => {
        nestedAlert = alert;

        if (alert.distillery) {
          const { container } = alert.distillery;
          const { data } = alert;
          const { token } = source;

          return getLocationsWithAddress(container, data, token)
            .then((locations) => {
              const markers = locations.length
                ? createLocationGeoJSON(locations)
                : null;

              dispatch(fetchAlertSuccess(nestedAlert, locations, markers));
            });
        }

        dispatch(fetchAlertSuccess(nestedAlert, null, null));
      })
      .catch(handleError(dispatch));
  };
}

/**
 * Updates the alert detail object with new fields.
 * @param alert Alert object to update.
 * @param fields Fields to update the alert with.
 * @returns {ThunkActionPromise}
 */
export function updateAlertDetail(
  alert: AlertDetail,
  fields: AlertUpdateRequest,
): ThunkActionPromise {
  return (dispatch) => {
    const request = checkAlertUpdate(alert, fields);

    if (request.valid) {
      const modifiedFields = modifyAlertUpdate(alert, fields);
      const source = getCancelTokenSource();

      dispatch(requestPending(source.cancel));

      return updateAlert(alert.id, modifiedFields, source.token)
        .then((update) => {
          const comment = createAlertUpdateComment(alert, fields);

          if (comment) {
            return addComment(alert.id, comment, source.token)
              .then(updateAlertDetailObject(dispatch))
              .catch((error) => {
                updateAlertDetailObject(dispatch)(update);
                handleError(dispatch)(error);
              });
          }

          updateAlertDetailObject(dispatch)(update);
        })
        .catch(handleError(dispatch));
    }

    dispatch(addErrorMessage(request.errors));

    return Promise.reject('Alert update request invalid');
  };
}

/**
 * Performs an action on the alert in the alert detail and then updates
 * the alert detail object.
 * @param alertId ID of the alert to perform the action on.
 * @param actionId ID of the action to perform.
 * @returns {ThunkActionPromise}
 */
export function performAlertDetailAction(
  alertId: number,
  actionId: number,
): ThunkActionPromise {
  return (dispatch) => {
    const source = getCancelTokenSource();

    dispatch(requestPending(source.cancel));

    return performAction(actionId, alertId, source.token)
      .then(updateAlertDetailObject(dispatch))
      .catch(handleError(dispatch));
  };
}

/**
 * Adds a new comment to the alert detail object.
 * @param alertId ID of the alert to add the comment to
 * @param comment Content of the comment.
 * @returns {ThunkActionPromise}
 */
export function addAlertDetailComment(
  alertId: number,
  comment: string,
): ThunkActionPromise {
  return (dispatch) => {
    const source = getCancelTokenSource();

    dispatch(requestPending(source.cancel));

    return addComment(alertId, comment, source.token)
      .then(updateAlertDetailObject(dispatch))
      .catch(handleError(dispatch));
  };
}
