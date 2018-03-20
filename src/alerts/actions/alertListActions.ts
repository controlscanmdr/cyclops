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
import axios from 'axios';

// Local
import { createAction } from '../../common/services/reduxUtils';
import {
  ReduxAction,
  ThunkActionPromise,
  ThunkActionVoid,
} from '../../common/types/Redux';
import { AlertSearchParams, AlertListItem } from '../types/Alert';
import { fetchAlertList } from '../services/alertsAPI';
import { addError } from '../../errors/actions/errorModalActions';
import { createRandomId } from '../../common/services/stringUtils';
import { StoreState } from '../../app/services/store';
import { DistilleryFlat } from '../../distilleries/types/Distillery';
import { Action } from '../../actions/types/Action';
import { User } from '../../users/types/User';
import { fetchAllUsers } from '../../users/services/userApi';
import { fetchAllActions } from '../../actions/services/actionApi';
import { fetchAllAlertDistilleries } from '../../distilleries/services/distilleryAPI';

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

// SEARCH_ALERTS_PENDING
// --------------------------------------------------------------------------

export const SEARCH_ALERTS_PENDING = `${ACTION_PREFIX}/SEARCH_ALERTS_PENDING`;
export interface SearchAlertsPendingPayload {
  params: AlertSearchParams;
  promiseId: string;
  poll: boolean;
}
export function searchAlertsPending(
  params: AlertSearchParams,
  poll: boolean,
  promiseId: string,
): ReduxAction<SearchAlertsPendingPayload> {
  return createAction(SEARCH_ALERTS_PENDING, { params, promiseId, poll });
}

// SEARCH_ALERTS_SUCCESS
// --------------------------------------------------------------------------

export const SEARCH_ALERTS_SUCCESS = `${ACTION_PREFIX}/SEARCH_ALERTS_SUCCESS`;
export interface SearchAlertsSuccessPayload {
  count: number;
  alerts: AlertListItem[];
  polling: boolean;
}
export function searchAlertsSuccess(
  alerts: AlertListItem[],
  count: number,
  polling: boolean,
): ReduxAction<SearchAlertsSuccessPayload> {
  return createAction(SEARCH_ALERTS_SUCCESS, { alerts, count, polling });
}

// SEARCH_ALERTS_FAILURE
// --------------------------------------------------------------------------

export const SEARCH_ALERTS_FAILURE = `${ACTION_PREFIX}/SEARCH_ALERTS_FAILURE`;
export type SearchAlertsFailurePayload = undefined;
export function searchAlertsFailure(): ReduxAction<SearchAlertsFailurePayload> {
  return createAction(SEARCH_ALERTS_FAILURE, undefined);
}

// POLL_ALERTS_PENDING
// --------------------------------------------------------------------------

export const POLL_ALERTS_PENDING = `${ACTION_PREFIX}/POLL_ALERTS_PENDING`;
export interface PollAlertsPendingPayload {
  params: AlertSearchParams;
  promiseId: string;
}
export function pollAlertsPending(
  params: AlertSearchParams,
  promiseId: string,
): ReduxAction<PollAlertsPendingPayload> {
  return createAction(POLL_ALERTS_PENDING, { params, promiseId });
}

// POLL_ALERTS_SUCCESS
// --------------------------------------------------------------------------

export const POLL_ALERTS_SUCCESS = `${ACTION_PREFIX}/POLL_ALERTS_SUCCESS`;
export interface PollAlertsSuccessPayload {
  alerts: AlertListItem[];
  count: number;
}
export function pollAlertsSuccess(
  alerts: AlertListItem[],
  count: number,
): ReduxAction<PollAlertsSuccessPayload> {
  return createAction(POLL_ALERTS_SUCCESS, { alerts, count });
}

// POLL_ALERTS_FAILURE
// --------------------------------------------------------------------------

export const POLL_ALERTS_FAILURE = `${ACTION_PREFIX}/POLL_ALERTS_FAILURE`;
export type PollAlertsFailurePayload = undefined;
export function pollAlertsFailure(): ReduxAction<PollAlertsFailurePayload> {
  return createAction(POLL_ALERTS_FAILURE, undefined);
}

// POLL_ALERTS_WAIT
// --------------------------------------------------------------------------

export const POLL_ALERTS_WAIT = `${ACTION_PREFIX}/POLL_ALERTS_WAIT`;
export interface PollAlertsWaitPayload {
  timeoutId: number;
  interval: number;
}
export function pollAlertsWait(
  timeoutId: number,
  interval: number,
): ReduxAction<PollAlertsWaitPayload> {
  return createAction(POLL_ALERTS_WAIT, { timeoutId, interval });
}

// STOP_POLLING
// --------------------------------------------------------------------------

export const STOP_POLLING = `${ACTION_PREFIX}/STOP_POLLING`;
export type StopPollingPayload = undefined;
export function stopPolling(): ReduxAction<StopPollingPayload> {
  return createAction(STOP_POLLING, undefined);
}

// DISABLE_POLLING
// --------------------------------------------------------------------------

export const DISABLE_POLLING = `${ACTION_PREFIX}/DISABLE_POLLING`;
export type DisablePollingPayload = undefined;
export function disablePolling(): ReduxAction<DisablePollingPayload> {
  return createAction(DISABLE_POLLING, undefined);
}

// FETCH_VIEW_RESOURCES_SUCCESS
// --------------------------------------------------------------------------

export const FETCH_VIEW_RESOURCES_SUCCESS = `${ACTION_PREFIX}/FETCH_VIEW_RESOURCES_SUCCESS`;
export interface FetchViewResourcesSuccessPayload {
  users: User[];
  actions: Action[];
  distilleries: DistilleryFlat[];
}
export type FetchViewResourcesSuccessAction = ReduxAction<FetchViewResourcesSuccessPayload>;
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
      const timeoutId = window.setTimeout(
        () => {
          if (isValidPromise(promiseId, getState())) {
            dispatch(pollAlerts(params, interval));
          }
        },
        interval);

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
