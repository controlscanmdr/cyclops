/**
 * The contents of this file are subject to the CYPHON Proprietary Non-
 * Commercial Registered User Use License Agreement (the "Agreement”). You
 * may not use this file except in compliance with the Agreement, a copy
 * of which may be found at https://github.com/dunbarcyber/cyclops/. The
 * developer of the CYPHON technology and platform is ControlScan, Inc.
 *
 * The CYPHON technology or platform are distributed under the Agreement on
 * an “AS IS” basis, WITHOUT WARRANTY OF ANY KIND, either express or
 * implied. See the Agreement for specific terms.
 *
 * Copyright (C) 2017 ControlScan, Inc. All Rights Reserved.
 *
 * Contributor/Change Made By: ________________. [Only apply if changes
 * are made]
 */

// Vendor
import axios from 'axios';

// Local
import { createAction } from '~/utils/reduxUtils';
import {
  ReduxAction,
  ThunkActionPromise,
  ThunkActionVoid,
} from '~/store/types';
import {
  AlertSearchParams,
  AlertListItem,
} from '~/services/alerts/types';
import { fetchAlertList } from '~/services/alerts/utils/alertsAPI';
import { addError } from '../errorModal/errorModalActions';
import { createRandomId } from '~/utils/stringUtils';
import { StoreState } from '~/store/index';
import { DistilleryFlat } from '~/services/distilleries/types';
import { Action } from '~/services/actions/types';
import { User } from '~/services/users/types';
import { fetchAllUsers } from '~/services/users/api';
import { fetchAllActions } from '~/services/actions/api';
import { fetchAllAlertDistilleries } from '~/services/distilleries/utils/distilleryAPI';

/**
 * Action type prefix for AlertList actions.
 * @type {string}
 */
const ACTION_PREFIX = 'ALERT_LIST';

/**
 * Determines if a promise is valid based on the current store state.
 * @param promiseId ID of the promise that was returned.
 * @param state Current redux store state.
 * @returns {boolean} If the promise is valid.
 */
function isValidPromise(promiseId: string, state: StoreState): boolean {
  return promiseId === state.alertList.promiseId;
}

// --------------------------------------------------------------------------
// SEARCH_ALERTS_PENDING
// --------------------------------------------------------------------------

/**
 * Action Type: When a request for alerts matching a set of search
 * parameters is made.
 * @type {string}
 */
export const SEARCH_ALERTS_PENDING = `${ACTION_PREFIX}/SEARCH_ALERTS_PENDING`;

/**
 * SEARCH_ALERTS_PENDING payload type.
 */
export interface SearchAlertsPendingPayload {
  params: AlertSearchParams;
  promiseId: string;
  poll: boolean;
}

/**
 * Creates a SEARCH_ALERTS_PENDING action.
 * @returns {ReduxAction<SearchAlertsPendingPayload>;
 */
export function searchAlertsPending(
  params: AlertSearchParams,
  poll: boolean,
  promiseId: string,
): ReduxAction<SearchAlertsPendingPayload> {
  return createAction(SEARCH_ALERTS_PENDING, { params, promiseId, poll });
}

// --------------------------------------------------------------------------
// SEARCH_ALERTS_SUCCESS
// --------------------------------------------------------------------------

/**
 * Action Type: When a request for alerts matching a set of search parameters
 * @type {string}
 */
export const SEARCH_ALERTS_SUCCESS = `${ACTION_PREFIX}/SEARCH_ALERTS_SUCCESS`;

/**
 * SEARCH_ALERTS_SUCCESS payload type.
 */
export interface SearchAlertsSuccessPayload {
  count: number;
  alerts: AlertListItem[];
  polling: boolean;
}

/**
 * Creates a SEARCH_ALERTS_SUCCESS action.
 * @returns {ReduxAction<SearchAlertsSuccessPayload>;
 */
export function searchAlertsSuccess(
  alerts: AlertListItem[],
  count: number,
  polling: boolean,
): ReduxAction<SearchAlertsSuccessPayload> {
  return createAction(SEARCH_ALERTS_SUCCESS, { alerts, count, polling });
}

// --------------------------------------------------------------------------
// SEARCH_ALERTS_FAILURE
// --------------------------------------------------------------------------

/**
 * Action Type: When a request for alerts matching a set of search
 * @type {string}
 */
export const SEARCH_ALERTS_FAILURE = `${ACTION_PREFIX}/SEARCH_ALERTS_FAILURE`;

/**
 * SEARCH_ALERTS_FAILURE payload type.
 */
export type SearchAlertsFailurePayload = undefined;

/**
 * Creates a SEARCH_ALERTS_FAILURE action.
 * @returns {ReduxAction<SearchAlertsFailurePayload>;
 */
export function searchAlertsFailure(): ReduxAction<SearchAlertsFailurePayload> {
  return createAction(SEARCH_ALERTS_FAILURE, undefined);
}

// --------------------------------------------------------------------------
// POLL_ALERTS_PENDING
// --------------------------------------------------------------------------

/**
 * Action Type: When the alert list sends out a request polling for new
 * alerts that match the current search parameters.
 * @type {string}
 */
export const POLL_ALERTS_PENDING = `${ACTION_PREFIX}/POLL_ALERTS_PENDING`;

/**
 * POLL_ALERTS_PENDING payload type.
 */
export interface PollAlertsPendingPayload {
  params: AlertSearchParams;
  promiseId: string;
}

/**
 * Creates a POLL_ALERTS_PENDING action.
 * @returns {ReduxAction<PollAlertsPendingPayload>;
 */
export function pollAlertsPending(
  params: AlertSearchParams,
  promiseId: string,
): ReduxAction<PollAlertsPendingPayload> {
  return createAction(POLL_ALERTS_PENDING, { params, promiseId });
}

// --------------------------------------------------------------------------
// POLL_ALERTS_SUCCESS
// --------------------------------------------------------------------------

/**
 * Action Type: When a request polling for new alerts matchign the current
 * search parameters returns successfully.
 * @type {string}
 */
export const POLL_ALERTS_SUCCESS = `${ACTION_PREFIX}/POLL_ALERTS_SUCCESS`;

/**
 * POLL_ALERTS_SUCCESS payload type.
 */
export interface PollAlertsSuccessPayload {
  alerts: AlertListItem[];
  count: number;
}

/**
 * Creates a POLL_ALERTS_SUCCESS action.
 * @returns {ReduxAction<PollAlertsSuccessPayload>;
 */
export function pollAlertsSuccess(
  alerts: AlertListItem[],
  count: number,
): ReduxAction<PollAlertsSuccessPayload> {
  return createAction(POLL_ALERTS_SUCCESS, { alerts, count });
}

// --------------------------------------------------------------------------
// POLL_ALERTS_FAILURE
// --------------------------------------------------------------------------

/**
 * Action Type: When a request polling for new alerts matching the current
 * @type {string}
 */
export const POLL_ALERTS_FAILURE = `${ACTION_PREFIX}/POLL_ALERTS_FAILURE`;

/**
 * POLL_ALERTS_FAILURE payload type.
 */
export type PollAlertsFailurePayload = undefined;

/**
 * Creates a POLL_ALERTS_FAILURE action.
 * @returns {ReduxAction<PollAlertsFailurePayload>;
 */
export function pollAlertsFailure(): ReduxAction<PollAlertsFailurePayload> {
  return createAction(POLL_ALERTS_FAILURE, undefined);
}

// --------------------------------------------------------------------------
// POLL_ALERTS_WAIT
// --------------------------------------------------------------------------

/**
 * Action Type: When the poller has set a timeout and is waiting for it
 * to finish.
 * @type {string}
 */
export const POLL_ALERTS_WAIT = `${ACTION_PREFIX}/POLL_ALERTS_WAIT`;

/**
 * POLL_ALERTS_WAIT payload type.
 */
export interface PollAlertsWaitPayload {
  timeoutId: number;
  interval: number;
}

/**
 * Creates a POLL_ALERTS_WAIT action.
 * @returns {ReduxAction<PollAlertsWaitPayload>;
 */
export function pollAlertsWait(
  timeoutId: number,
  interval: number,
): ReduxAction<PollAlertsWaitPayload> {
  return createAction(POLL_ALERTS_WAIT, { timeoutId, interval });
}

// --------------------------------------------------------------------------
// STOP_POLLING
// --------------------------------------------------------------------------

/**
 * Action Type: When there is a request for the alert list to stop polling.
 * @type {string}
 */
export const STOP_POLLING = `${ACTION_PREFIX}/STOP_POLLING`;

/**
 * STOP_POLLING payload type.
 */
export type StopPollingPayload = undefined;

/**
 * Creates a STOP_POLLING action.
 * @returns {ReduxAction<StopPollingPayload>;
 */
export function stopPolling(): ReduxAction<StopPollingPayload> {
  return createAction(STOP_POLLING, undefined);
}

// --------------------------------------------------------------------------
// DISABLE_POLLING
// --------------------------------------------------------------------------

/**
 * Action Type: When a user disables alert list polling
 * @type {string}
 */
export const DISABLE_POLLING = `${ACTION_PREFIX}/DISABLE_POLLING`;

/**
 * DISABLE_POLLING payload type.
 */
export type DisablePollingPayload = undefined;

/**
 * Creates a DISABLE_POLLING action.
 * @returns {ReduxAction<DisablePollingPayload>;
 */
export function disablePolling(): ReduxAction<DisablePollingPayload> {
  return createAction(DISABLE_POLLING, undefined);
}

// --------------------------------------------------------------------------
// FETCH_VIEW_RESOURCES_SUCCESS
// --------------------------------------------------------------------------

/**
 * Action Type:
 * @type {string}
 */
export const FETCH_VIEW_RESOURCES_SUCCESS =
  `${ACTION_PREFIX}/FETCH_VIEW_RESOURCES_SUCCESS`;

/** FETCH_VIEW_RESOURCES_SUCCESS payload type. */
export interface FetchViewResourcesSuccessPayload {
  users: User[];
  actions: Action[];
  distilleries: DistilleryFlat[];
}

/** FETCH_VIEW_RESOURCES_SUCCESS action type. */
export type FetchViewResourcesSuccessAction = ReduxAction<
  FetchViewResourcesSuccessPayload
  >;

/**
 * Creates a FETCH_VIEW_RESOURCES_SUCCESS action.
 * @returns {ReduxAction<Payload>;
 */
export function fetchViewResourcesSuccess(
  users: User[],
  actions: Action[],
  distilleries: DistilleryFlat[],
): FetchViewResourcesSuccessAction {
  return createAction(
    FETCH_VIEW_RESOURCES_SUCCESS,
    { users, actions, distilleries },
  );
}

// --------------------------------------------------------------------------
// Thunk Actions
// --------------------------------------------------------------------------

/**
 * Searchs alerts with the given search parameters and kicks off a polling
 * interval if poll and interval are set.
 * @param params Search parameters to search alerts with.
 * @param poll If the results should be polled after a successful search.
 * @param interval Interval to poll alerts with.
 * @returns {ThunkActionPromise}
 */
export function searchAlerts(
  params: AlertSearchParams,
  poll: boolean,
  interval: number,
): ThunkActionPromise {
  return (dispatch, getState) => {
    const promiseId = createRandomId();

    dispatch(searchAlertsPending(params, poll, promiseId));

    return fetchAlertList(params)
      .then((response) => {
        if (isValidPromise(promiseId, getState())) {
          dispatch(searchAlertsSuccess(response.results, response.count, poll));

          if (poll) { dispatch(pollAlertsTimeout(params, interval, promiseId)); }
        }
      })
      .catch((error) => {
        if (isValidPromise(promiseId, getState())) {
          dispatch(searchAlertsFailure());
          dispatch(addError(error));
        }
      });
  };
}

/**
 * Polls for alerts using the given search parameters and interval time.
 * @param params Search parameters to search alerts with.
 * @param interval Interval time to poll alerts with.
 * @returns {(dispatch:any, getState:any)=>Promise<R>}
 */
export function pollAlerts(
  params: AlertSearchParams,
  interval: number,
): ThunkActionPromise {
  return (dispatch, getState) => {
    const promiseId = createRandomId();

    dispatch(pollAlertsPending(params, promiseId));

    return fetchAlertList(params)
      .then((response) => {
        if (isValidPromise(promiseId, getState())) {
          dispatch(pollAlertsSuccess(response.results, response.count));
          dispatch(pollAlertsTimeout(params, interval, promiseId));
        }
      })
      .catch((error) => {
        if (isValidPromise(promiseId, getState())) {
          dispatch(pollAlertsFailure());
          dispatch(addError(error));
        }
      });
  };
}

/**
 * Sets the timeout function to poll for alerts.
 * @param params Search parameters for searching alerts.
 * @param interval Interval in milliseconds to poll for alerts.
 * @param promiseId
 * @return {ThunkActionPromise}
 */
export function pollAlertsTimeout(
  params: AlertSearchParams,
  interval: number,
  promiseId: string,
): ThunkActionVoid {
  return (dispatch, getState) => {
    if (isValidPromise(promiseId, getState())) {
      const timeoutId = window.setTimeout(() => {
        if (isValidPromise(promiseId, getState())) {
          dispatch(pollAlerts(params, interval));
        }
      }, interval);

      dispatch(pollAlertsWait(timeoutId, interval));
    }
  };
}

/**
 * Fetches the resources for the alert view.
 * @returns {ThunkActionPromise}
 */
export function fetchViewResources(): ThunkActionPromise {
  return (dispatch) => {
    const promises = [
      fetchAllUsers(),
      fetchAllActions(),
      fetchAllAlertDistilleries(),
    ];
    const spread = axios.spread<any, any>((
      users: User[],
      actions: Action[],
      distilleries: DistilleryFlat[],
    ) => {
      dispatch(fetchViewResourcesSuccess(users, actions, distilleries));
    });

    return axios.all<any>(promises).then(spread);
  };
}
