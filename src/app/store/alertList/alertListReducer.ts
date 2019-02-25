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
import { ReducerMap, handleActions } from 'redux-actions';
import * as _ from 'lodash';

// Local
import { ReduxAction } from '../types';
import * as actions from './alertListActions';
import {
  UPDATE_ALERT_SUCCESS,
  UpdateAlertSuccessPayload,
} from '../alertDetail/alertDetailActions';
import {
  AlertListItem,
  AlertSearchParams,
} from '../../services/alerts/types';
import { User } from '../../services/users/types';
import { Distillery } from '../../services/distilleries/types';
import { Action } from '../../services/actions/types';

/** State shape of the AlertList reducer. */
export interface AlertListState {
  /** Total number of alerts matching the search parameters. */
  count: number;
  /** List of alerts matching search parameters. */
  alerts: AlertListItem[];
  /** If the list of alerts is being fetched. */
  loading: boolean;
  /** Search parameters used to search for alerts. */
  params: AlertSearchParams;
  /** String value in the search bar. */
  search: string;
  /** If the alert list is currently polling for alerts. */
  polling: boolean;
  /** Time in milliseconds of the interval the poller will use. */
  interval: number;
  /** Timeout ID of the poller timeout. */
  timeout: number | null;
  /** If polling is currently enabled. */
  pollingEnabled: boolean;
  /** Promise ID of the request. */
  promiseId: string | null;
  /** Current list of users. */
  users: User[];
  /** List of distilleries that have alerts associated with them. */
  distilleries: Distillery[];
  /** Current list of actions that can be performed on an alert. */
  actions: Action[];
}

/**
 * Initial state of the AlertList reducer.
 * @type {State}
 */
const INITIAL_STATE: AlertListState = {
  alerts: [],
  count: 0,
  interval: 5000,
  loading: false,
  params: {},
  polling: true,
  search: '',
  timeout: null,
  pollingEnabled: true,
  promiseId: null,
  actions: [],
  distilleries: [],
  users: [],
};

/**
 * Mapped reducer functions that make up the AlertList AlertDetailReducer.
 * @type {ReducerMap<State, any>}
 */
const reducers: ReducerMap<AlertListState, any> = {};

/**
 * Fields to update when the alert detail is updated.
 * @type {string[]}
 */
const ALERT_UPDATE_FIELDS = ['level', 'status', 'assigned_user'];

/**
 * Updates the AlertList reducer based on a(n) SEARCH_ALERTS_PENDING action.
 * @param state Current AlertList reducer state.
 * @param action SEARCH_ALERTS_PENDING action.
 * @returns {State} Updated AlertList reducer state.
 */
reducers[actions.SEARCH_ALERTS_PENDING] = (
  state: AlertListState,
  action: ReduxAction<actions.SearchAlertsPendingPayload>,
): AlertListState => {
  const update: Partial<AlertListState> = {
    loading: true,
    params: action.payload.params,
    polling: false,
    pollingEnabled: action.payload.poll,
    promiseId: action.payload.promiseId,
  };

  // Cancel the timeout for polling alerts.
  if (state.timeout) { window.clearTimeout(state.timeout); }

  return Object.assign({}, state, update);
};

/**
 * Updates the AlertList reducer based on a(n) SEARCH_ALERTS_SUCCESS action.
 * @param state Current AlertList reducer state.
 * @param action SEARCH_ALERTS_SUCCESS action.
 * @returns {State} Updated AlertList reducer state.
 */
reducers[actions.SEARCH_ALERTS_SUCCESS] = (
  state: AlertListState,
  action: ReduxAction<actions.SearchAlertsSuccessPayload>,
): AlertListState => {
  const update: Partial<AlertListState> = {
    alerts: action.payload.alerts,
    count: action.payload.count,
    loading: false,
    polling: action.payload.polling,
  };

  return Object.assign({}, state, update);
};

/**
 * Updates the AlertList reducer based on a(n) SEARCH_ALERTS_FAILURE action.
 * @param state Current AlertList reducer state.
 * @param action SEARCH_ALERTS_FAILURE action.
 * @returns {State} Updated AlertList reducer state.
 */
reducers[actions.SEARCH_ALERTS_FAILURE] = (
  state: AlertListState,
  action: ReduxAction<actions.SearchAlertsFailurePayload>,
): AlertListState => {
  const update: Partial<AlertListState> = {
    loading: false,
    polling: false,
  };

  return Object.assign({}, state, update);
};

/**
 * Updates the AlertList reducer based on a(n) POLL_ALERTS_PENDING action.
 * @param state Current AlertList reducer state.
 * @param action POLL_ALERTS_PENDING action.
 * @returns {State} Updated AlertList reducer state.
 */
reducers[actions.POLL_ALERTS_PENDING] = (
  state: AlertListState,
  action: ReduxAction<actions.PollAlertsPendingPayload>,
): AlertListState => {
  const update: Partial<AlertListState> = {
    promiseId: action.payload.promiseId,
    polling: true,
    pollingEnabled: true,
  };

  return Object.assign({}, state, update);
};

/**
 * Updates the AlertList reducer based on a POLL_ALERTS_SUCCESS action.
 * @param state Current AlertList reducer state.
 * @param action POLL_ALERTS_SUCCESS action.
 * @returns {State} Updated AlertList reducer state.
 */
reducers[actions.POLL_ALERTS_SUCCESS] = (
  state: AlertListState,
  action: ReduxAction<actions.PollAlertsSuccessPayload>,
): AlertListState => {
  const update: Partial<AlertListState> = {
    alerts: action.payload.alerts,
    count: action.payload.count,
  };

  return Object.assign({}, state, update);
};

/**
 * Updates the AlertList reducer based on a(n) POLL_ALERTS_FAILURE action.
 * @param state Current AlertList reducer state.
 * @param action POLL_ALERTS_FAILURE action.
 * @returns {State} Updated AlertList reducer state.
 */
reducers[actions.POLL_ALERTS_FAILURE] = (
  state: AlertListState,
  action: ReduxAction<actions.PollAlertsFailurePayload>,
): AlertListState => {
  const update: Partial<AlertListState> = {
    polling: false,
  };

  return Object.assign({}, state, update);
};

/**
 * Updates the AlertList reducer based on a(n) POLL_ALERTS_WAIT action.
 * @param state Current AlertList reducer state.
 * @param action POLL_ALERTS_WAIT action.
 * @returns {State} Updated AlertList reducer state.
 */
reducers[actions.POLL_ALERTS_WAIT] = (
  state: AlertListState,
  action: ReduxAction<actions.PollAlertsWaitPayload>,
): AlertListState => {
  const update: Partial<AlertListState> = {
    interval: action.payload.interval,
    timeout: action.payload.timeoutId,
  };

  return Object.assign({}, state, update);
};

/**
 * Updates the AlertList reducer based on a(n) STOP_POLLING action.
 * @param state Current AlertList reducer state.
 * @param action STOP_POLLING action.
 * @returns {State} Updated AlertList reducer state.
 */
reducers[actions.STOP_POLLING] = (
  state: AlertListState,
  action: ReduxAction<actions.StopPollingPayload>,
): AlertListState => {
  const update: Partial<AlertListState> = {
    polling: false,
    timeout: null,
  };

  if (state.timeout) { window.clearTimeout(state.timeout); }

  return Object.assign({}, state, update);
};

/**
 * Updates the AlertList reducer based on a(n) DISABLE_POLLING action.
 * @param state Current AlertList reducer state.
 * @param action DISABLE_POLLING action.
 * @returns {State} Updated AlertList reducer state.
 */
reducers[actions.DISABLE_POLLING] = (
  state: AlertListState,
  action: ReduxAction<actions.DisablePollingPayload>,
): AlertListState => {
  const update: Partial<AlertListState> = {
    polling: false,
    pollingEnabled: false,
    timeout: null,
  };

  if (state.timeout) { window.clearTimeout(state.timeout); }

  return Object.assign({}, state, update);
};

/**
 * Updates the AlertList reducer based on a(n) UPDATE_ALERT_SUCCESS action.
 * @param state Current AlertList reducer state.
 * @param action UPDATE_ALERT_SUCCESS action.
 * @returns {State} Updated AlertList reducer state.
 */
reducers[UPDATE_ALERT_SUCCESS] = (
  state: AlertListState,
  action: ReduxAction<UpdateAlertSuccessPayload>,
): AlertListState => {
  // Find array index of alert.
  const alertIndex = _.findIndex(
    state.alerts,
    (alert: AlertListItem) => alert.id === action.payload.id,
  );

  // If no index, return the current state.
  if (alertIndex === -1) { return state; }

  // Copy alert array.
  const copiedAlerts = state.alerts.slice();
  // Take out only the fields to update.
  const fields = _.pick(action.payload, ALERT_UPDATE_FIELDS);

  // Assign new fields to alert object and place at the array index.
  copiedAlerts[alertIndex] = Object.assign(
    {},
    copiedAlerts[alertIndex],
    fields,
  );

  // Type check state update.
  const update: Partial<AlertListState> = { alerts: copiedAlerts };

  return Object.assign({}, state, update);
};

/**
 * Updates the AlertList reducer based on a(n)  action.
 * @param state Current AlertList reducer state.
 * @param action  action.
 * @returns {State} Updated AlertList reducer state.
 */
reducers[actions.FETCH_VIEW_RESOURCES_SUCCESS] = (
  state: AlertListState,
  action: actions.FetchViewResourcesSuccessAction,
): AlertListState => {
  const update: Partial<AlertListState> = {
    actions: action.payload.actions,
    distilleries: action.payload.distilleries,
    users: action.payload.users,
  };

  return _.assign({}, state, update);
};

/**
 * AlertList reducer.
 * @type {Reducer<State, any>}
 */
export const alertList = handleActions<AlertListState, any>(
  reducers,
  INITIAL_STATE,
);
