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

// Local
import {
  ReduxAction,
  ThunkActionPromise,
} from '~/store/types';
import {
  MonitorNested,
  NormalizedMonitorList,
} from '~/services/monitors/types';
import {
  sortMonitorsByStatus,
  normalizeMonitors,
} from '~/services/monitors/utils/monitorUtils';
import { fetchAllMonitors } from '~/services/monitors/utils/monitorAPI';
import { addError } from '../errorModal/errorModalActions';

/**
 * Action type prefix for MonitorStatus actions.
 * @type {string}
 */
const ACTION_PREFIX = 'MONITOR_STATUS';

// --------------------------------------------------------------------------
// FETCH_MONITORS_PENDING
// --------------------------------------------------------------------------

/**
 * Action Type: When a current list of monitor objects is requested.
 * @type {string}
 */
export const FETCH_MONITORS_PENDING = `${ACTION_PREFIX}/FETCH_MONITORS_PENDING`;

/**
 * FETCH_MONITORS_PENDING payload type.
 */
export type FetchMonitorsPendingPayload = boolean;

/**
 * FETCH_MONITORS_PENDING action type.
 */
export type FetchMonitorsPendingAction = ReduxAction<FetchMonitorsPendingPayload>;

/**
 * Creates a FETCH_MONITORS_PENDING action.
 * @returns {Action<FetchMonitorsPendingPayload>}
 */
export function fetchMonitorsPending(
  loading: boolean,
): FetchMonitorsPendingAction {
  return {
    type: FETCH_MONITORS_PENDING,
    payload: loading,
  };
}

// --------------------------------------------------------------------------
// FETCH_MONITORS_SUCCESS
// --------------------------------------------------------------------------

/**
 * Action Type: When a request for a current list of monitor objects
 * is successful.
 * @type {string}
 */
export const FETCH_MONITORS_SUCCESS = `${ACTION_PREFIX}/FETCH_MONITORS_SUCCESS`;

/**
 * FETCH_MONITORS_SUCCESS payload type.
 */
export interface FetchMonitorsSuccessPayload {
  monitors: NormalizedMonitorList;
  monitorsUp: string[];
  monitorsDown: string[];
}

/**
 * FETCH_MONITORS_SUCCESS action type.
 */
export type FetchMonitorsSuccessAction = ReduxAction<FetchMonitorsSuccessPayload>;

/**
 * Creates a FETCH_MONITORS_SUCCESS action.
 * @returns {Action<FetchMonitorsSuccessPayload>}
 */
export function fetchMonitorsSuccess(
  monitors: MonitorNested[],
): FetchMonitorsSuccessAction {
  const sortedMonitorsByStatus = sortMonitorsByStatus(monitors);

  return {
    type: FETCH_MONITORS_SUCCESS,
    payload: {
      monitors: normalizeMonitors(monitors),
      monitorsUp: sortedMonitorsByStatus.up,
      monitorsDown: sortedMonitorsByStatus.down,
    },
  };
}

// --------------------------------------------------------------------------
// SELECT_MONITOR
// --------------------------------------------------------------------------

/**
 * Action Type: When a monitor is selected to view detailed information on.
 * @type {string}
 */
export const SELECT_MONITOR = `${ACTION_PREFIX}/SELECT_MONITOR`;

/**
 * SELECT_MONITOR payload type.
 */
export type SelectMonitorPayload = string;

/**
 * SELECT_MONITOR action type.
 */
export type SelectMonitorAction = ReduxAction<SelectMonitorPayload>;

/**
 * Creates a SELECT_MONITOR action.
 * @param monitor Monitor name to select.
 * @returns {ReduxAction<string>}
 */
export function selectMonitor(monitor: string): SelectMonitorAction {
  return {
    type: SELECT_MONITOR,
    payload: monitor,
  };
}

// --------------------------------------------------------------------------
// OPEN_MODAL
// --------------------------------------------------------------------------

/**
 * Action Type: When the monitor status modal is opened.
 * @type {string}
 */
export const OPEN_MODAL = `${ACTION_PREFIX}/OPEN_MODAL`;

/**
 * OPEN_MODAL payload type.
 */
export type OpenModalPayload = undefined;

/**
 * OPEN_MODAL action type.
 */
export type OpenModalAction = ReduxAction<OpenModalPayload>;

/**
 * Signifies that the monitor status modal should open and that it should
 * fetch a new list of monitors.
 * @returns {ThunkActionPromise}
 */
export function openModal(): OpenModalAction {
  return {
    type: OPEN_MODAL,
    payload: undefined,
  };
}

// --------------------------------------------------------------------------
// CLOSE_MODAL
// --------------------------------------------------------------------------

/**
 * Action Type: When the monitor status modal is closed.
 * @type {string}
 */
export const CLOSE_MODAL = `${ACTION_PREFIX}/CLOSE_MODAL`;

/**
 * CLOSE_MODAL payload type.
 */
export type CloseModalPayload = undefined;

/**
 * CLOSE_MODAL action type.
 */
export type CloseModalAction = ReduxAction<CloseModalPayload>;

/**
 * Creates a CLOSE_MODAL action.
 * @returns {Action<CloseModalPayload>;
 */
export function closeModal(): CloseModalAction {
  return {
    type: CLOSE_MODAL,
    payload: undefined,
  };
}

// --------------------------------------------------------------------------
// POLL_MONITORS_WAIT
// --------------------------------------------------------------------------

/**
 * Redux Action Type: When a timeout to poll monitors has been set.
 * @type {string}
 */
export const POLL_MONITORS_WAIT = `${ACTION_PREFIX}/POLL_MONITORS_WAIT`;

/** POLL_MONITORS_WAIT payload type. */
export type PollMonitorsWaitPayload = number;

/** POLL_MONITORS_WAIT action type. */
export type PollMonitorsWaitAction = ReduxAction<PollMonitorsWaitPayload>;

/**
 * Creates a(n) POLL_MONITORS_WAIT action.
 * @returns {PollMonitorsWaitAction}
 */
export function pollMonitorsWait(timeoutID: number): PollMonitorsWaitAction {
  return {
    type: POLL_MONITORS_WAIT,
    payload: timeoutID,
  };
}

// --------------------------------------------------------------------------
// Thunk Actions
// --------------------------------------------------------------------------

/**
 * Fetches a current list of monitor objects and signifies that the objects
 * were received or failed.
 * @returns {ThunkActionPromise}
 */
export function fetchMonitors(
  loading: boolean,
  delay: number,
  timeoutID?: number,
): ThunkActionPromise {
  return (dispatch) => {
    if (timeoutID) { window.clearTimeout(timeoutID); }

    dispatch(fetchMonitorsPending(loading));

    return fetchAllMonitors()
      .then((monitors) => {
        dispatch(fetchMonitorsSuccess(monitors));

        const ID = window.setTimeout(() => {
          dispatch(fetchMonitors(false, delay));
        }, delay);

        dispatch(pollMonitorsWait(ID));
      })
      .catch((error) => {
        dispatch(addError(error));
      });
  };
}
