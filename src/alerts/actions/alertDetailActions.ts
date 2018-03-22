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
import { ThunkActionPromise, ReduxDispatch, Action } from '../../common/types/Redux';
import { AlertDetail, AlertUpdateRequest } from '../types/Alert';
import { getCancelTokenSource } from '../../cyphon/services/cancelTokens';
import * as alertAPI from '../services/alertsAPI';
import { addError } from '../../errors/actions/errorModalActions';
import { LocationFieldAddress, Markers } from '../../map/types/Map';
import { Result, ResultIPAdresses } from '../../common/types/result';
import { ContainerNested } from '../../containers/types/Container';
import { getFieldsOfType } from '../../containers/services/containerUtils';
import { CONTAINER_FIELDS } from '../../containers/services/containerSchema';
import { Dictionary } from '../../common/types/object';

/**
 * Creates a function that handles an error from an API request for alert
 * detail actions.
 * @param dispatch
 * @returns {(error:any)=>void}
 */
function handleError(dispatch: ReduxDispatch) {
  return (error: any): void => {
    if (axios.isCancel(error)) return;

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

// CLOSE_ALERT
// --------------------------------------------------------------------------
// Close the alert detail panel.

export const CLOSE_ALERT = 'ALERT_DETAIL:CLOSE_ALERT';
export type CloseAlertAction = Action<typeof CLOSE_ALERT, undefined>;
export const closeAlert = (): CloseAlertAction => ({
  type: CLOSE_ALERT,
  payload: undefined,
});

// FETCH_ALERT
// --------------------------------------------------------------------------
// Request to fetch an alert detail was made.

export const FETCH_ALERT = 'ALERT_DETAIL:FETCH_ALERT';
export type FetchAlertPayload = { alertID: number; canceler?: Canceler };
export type FetchAlertAction = Action<typeof FETCH_ALERT, FetchAlertPayload>;
export const fetchAlert = (alertID: number, canceler?: Canceler): FetchAlertAction => ({
  type: FETCH_ALERT,
  payload: { alertID, canceler },
});

// FETCH_ALERT_SUCCESS
// --------------------------------------------------------------------------
// Request to fetch an alert detail was successful.

export const FETCH_ALERT_SUCCESS = 'ALERT_DETAIL:FETCH_ALERT_SUCCESS';
export type FetchAlertSuccessAction = Action<typeof FETCH_ALERT_SUCCESS, {
  alert: AlertDetail;
  locations: LocationFieldAddress[] | null;
  markers: Markers | null;
}>;
export const fetchAlertSuccess = (
  alert: AlertDetail,
  locations: LocationFieldAddress[] | null,
  markers: Markers | null,
): FetchAlertSuccessAction => ({
  type: FETCH_ALERT_SUCCESS,
  payload: { alert, locations, markers },
});

// FETCH_ALERT_FAILURE
// --------------------------------------------------------------------------
// Request to fetch an alert detail failed.

export const FETCH_ALERT_FAILURE = 'ALERT_DETAIL:FETCH_ALERT_FAILURE';
export type FetchAlertFailureAction = Action<typeof FETCH_ALERT_FAILURE, undefined>;
export const fetchAlertFailure = (): FetchAlertFailureAction => ({
  type: FETCH_ALERT_FAILURE,
  payload: undefined,
});

// FETCH_ALERT_CANCELED
// --------------------------------------------------------------------------
// Request to fetch an alert detail was canceled.

export const FETCH_ALERT_CANCELED = 'ALERT_DETAIL:FETCH_ALERT_CANCELED';
export type FetchAlertCanceledAction = Action<typeof FETCH_ALERT_CANCELED, undefined>;
export const fetchAlertCanceled = (): FetchAlertCanceledAction => ({
  type: FETCH_ALERT_CANCELED,
  payload: undefined,
});

// REQUEST_PENDING
// --------------------------------------------------------------------------

export const REQUEST_PENDING = 'ALERT_DETAIL:REQUEST_PENDING';
export type RequestPendingAction = Action<typeof REQUEST_PENDING, Canceler>;
export const requestPending = (canceler: Canceler): RequestPendingAction => ({
  type: REQUEST_PENDING,
  payload: canceler,
});



// ADD_ERROR_MESSAGE
// --------------------------------------------------------------------------
// Add error to the alert detail panel.

export const ADD_ERROR_MESSAGE = 'ALERT_DETAIL:ADD_ERROR_MESSAGE';
export type AddErrorMessageAction = Action<typeof ADD_ERROR_MESSAGE, string[]>;
export const addErrorMessage = (message: string[]): AddErrorMessageAction => ({
  type: ADD_ERROR_MESSAGE,
  payload: message,
});

// CLOSE_ERROR_MESSAGE
// --------------------------------------------------------------------------
// Close the alert detail panel messages.

export const CLOSE_ERROR_MESSAGE = 'ALERT_DETAIL:CLOSE_ERROR_MESSAGE';
export type CloseErrorMessageAction = Action<typeof CLOSE_ERROR_MESSAGE, undefined>;
export const closeErrorMessage = (): CloseErrorMessageAction => ({
  type: CLOSE_ERROR_MESSAGE,
  payload: undefined,
});

// REQUEST_FAILED
// --------------------------------------------------------------------------
//

export const REQUEST_FAILED = 'ALERT_DETAIL_REQUEST_FAILED';
export type RequestFailedAction = Action<typeof REQUEST_FAILED, undefined>;
export const requestFailed = (): RequestFailedAction => ({
  type: REQUEST_FAILED,
  payload: undefined,
});

// UPDATE_ALERT
// --------------------------------------------------------------------------
// Request to update the alert was made.

export const UPDATE_ALERT = 'ALERT_DETAIL:UPDATE_ALERT';
export type UpdateAlertAction = Action<typeof UPDATE_ALERT, {
  alert: AlertDetail;
  update: AlertUpdateRequest;
}>;
export const updateAlert = (alert: AlertDetail, update: AlertUpdateRequest): UpdateAlertAction => ({
  type: UPDATE_ALERT,
  payload: { alert, update },
});

// UPDATE_ALERT_PARTIAL
// --------------------------------------------------------------------------
// Update to the alert detail was attempted, but not completed.

export const UPDATE_ALERT_PARTIAL = 'ALERT_DETAIL:UPDATE_ALERT_PARTIAL';
export type UpdateAlertPartialAction = Action<typeof UPDATE_ALERT_PARTIAL, AlertDetail>;
export const updateAlertPartial = (alert: AlertDetail): UpdateAlertPartialAction => ({
  type: UPDATE_ALERT_PARTIAL,
  payload: alert,
});



// UPDATE_ALERT_SUCCESS
// --------------------------------------------------------------------------
// Request to update the alert was successful.

export const UPDATE_ALERT_SUCCESS = 'ALERT_DETAIL:UPDATE_ALERT_SUCCESS';
export type UpdateAlertSuccessAction = Action<typeof UPDATE_ALERT_SUCCESS, AlertDetail>;
export const updateAlertSuccess = (alert: AlertDetail): UpdateAlertSuccessAction => ({
  type: UPDATE_ALERT_SUCCESS,
  payload: alert,
});

// UPDATE_ALERT_FAILED
// --------------------------------------------------------------------------
// Request to update the alert failed.

export const UPDATE_ALERT_FAILED = 'ALERT_DETAIL:UPDATE_ALERT_FAILED';
export type UpdateAlertFailedAction = Action<typeof UPDATE_ALERT_FAILED, AlertDetail | undefined>;
export const updateAlertFailed = (alert?: AlertDetail): UpdateAlertFailedAction => ({
  type: UPDATE_ALERT_FAILED,
  payload: alert,
});

// UPDATE_ALERT_CANCELED
// --------------------------------------------------------------------------
// Request to update the alert was canceled.

export const UPDATE_ALERT_CANCELED = 'ALERT_DETAIL:UPDATE_ALERT_CANCELED';
export type UpdateAlertCanceldAction = Action<typeof UPDATE_ALERT_CANCELED, undefined>;
export const updateAlertCanceled = (): UpdateAlertCanceldAction => ({
  type: UPDATE_ALERT_CANCELED,
  payload: undefined,
});

// OPEN_DATA_MODAL
// --------------------------------------------------------------------------

export const OPEN_DATA_MODAL = 'ALERT_DETAIL:OPEN_DATA_MODAL';
export type OpenDataModalAction = Action<typeof OPEN_DATA_MODAL, ResultIPAdresses | null>;
export const openDataModal = (data: Result, container: ContainerNested): OpenDataModalAction => {
  const ipAddresses = getFieldsOfType<string | null>(CONTAINER_FIELDS.IP_ADDRESS, container, data);

  if (!ipAddresses.length) return { type: OPEN_DATA_MODAL, payload: null };

  const nonNullIPS: Dictionary<string> = {};

  ipAddresses
    .filter(ipAddress => ipAddress !== null)
    .forEach((ipAddress) => {
      nonNullIPS[ipAddress.field] = ipAddress.value as string;
    });

  if (_.isEmpty(nonNullIPS)) return { type: OPEN_DATA_MODAL, payload: null };

  return { type: OPEN_DATA_MODAL, payload: nonNullIPS };
};

// CLOSE_DATA_MODAL
// --------------------------------------------------------------------------

export const CLOSE_DATA_MODAL = 'ALERT_DETAIL:CLOSE_DATA_MODAL';
export type CloseDataModalAction = Action<typeof CLOSE_DATA_MODAL, undefined>;
export const closeDataModal = (): CloseDataModalAction => ({
  type: CLOSE_DATA_MODAL,
  payload: undefined,
});

// --------------------------------------------------------------------------
// Thunk Actions
// --------------------------------------------------------------------------

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

    return alertAPI.performAction(actionId, alertId, source.token)
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

    return alertAPI.addComment(alertId, comment, source.token)
      .then(updateAlertDetailObject(dispatch))
      .catch(handleError(dispatch));
  };
}
