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

// Local
import { ReduxAction, ThunkActionPromise } from '../../common/types/Redux';
import { MonitorNested, NormalizedMonitorList } from '../types/Monitor';
import { sortMonitorsByStatus, normalizeMonitors } from '../services/monitorUtils';
import { fetchAllMonitors } from '../services/monitorAPI';
import { addError } from '../../errors/actions/errorModalActions';

/**
 * Action type prefix for MonitorStatus actions.
 * @type {string}
 */
const ACTION_PREFIX = 'MONITOR_STATUS';

// FETCH_MONITORS_PENDING
// --------------------------------------------------------------------------

export const FETCH_MONITORS_PENDING = `${ACTION_PREFIX}/FETCH_MONITORS_PENDING`;
export type FetchMonitorsPendingPayload = boolean;
export type FetchMonitorsPendingAction = ReduxAction<FetchMonitorsPendingPayload>;
export function fetchMonitorsPending(loading: boolean): FetchMonitorsPendingAction {
  return {
    type: FETCH_MONITORS_PENDING,
    payload: loading,
  };
}

// FETCH_MONITORS_SUCCESS
// --------------------------------------------------------------------------

export const FETCH_MONITORS_SUCCESS = `${ACTION_PREFIX}/FETCH_MONITORS_SUCCESS`;
export interface FetchMonitorsSuccessPayload {
  monitors: NormalizedMonitorList;
  monitorsUp: string[];
  monitorsDown: string[];
}
export type FetchMonitorsSuccessAction = ReduxAction<FetchMonitorsSuccessPayload>;
export function fetchMonitorsSuccess(monitors: MonitorNested[]): FetchMonitorsSuccessAction {
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

// SELECT_MONITOR
// --------------------------------------------------------------------------

export const SELECT_MONITOR = `${ACTION_PREFIX}/SELECT_MONITOR`;
export type SelectMonitorPayload = string;
export type SelectMonitorAction = ReduxAction<SelectMonitorPayload>;
export function selectMonitor(monitor: string): SelectMonitorAction {
  return {
    type: SELECT_MONITOR,
    payload: monitor,
  };
}

// OPEN_MODAL
// --------------------------------------------------------------------------

export const OPEN_MODAL = `${ACTION_PREFIX}/OPEN_MODAL`;
export type OpenModalPayload = undefined;
export type OpenModalAction = ReduxAction<OpenModalPayload>;
export function openModal(): OpenModalAction {
  return {
    type: OPEN_MODAL,
    payload: undefined,
  };
}

// CLOSE_MODAL
// --------------------------------------------------------------------------

export const CLOSE_MODAL = `${ACTION_PREFIX}/CLOSE_MODAL`;
export type CloseModalPayload = undefined;
export type CloseModalAction = ReduxAction<CloseModalPayload>;
export function closeModal(): CloseModalAction {
  return {
    type: CLOSE_MODAL,
    payload: undefined,
  };
}

// POLL_MONITORS_WAIT
// --------------------------------------------------------------------------

export const POLL_MONITORS_WAIT = `${ACTION_PREFIX}/POLL_MONITORS_WAIT`;
export type PollMonitorsWaitPayload = number;
export type PollMonitorsWaitAction = ReduxAction<PollMonitorsWaitPayload>;
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

        const ID = window.setTimeout(
          () => { dispatch(fetchMonitors(false, delay)); },
          delay,
        );

        dispatch(pollMonitorsWait(ID));
      })
      .catch((error) => {
        dispatch(addError(error));
      });
  };
}
