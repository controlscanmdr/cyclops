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
import { Canceler } from 'axios';
import * as _ from 'lodash';

// Local
import * as actions from './dashboardActions';
import {
  PieChartDataWithColor,
  StackedAreaChartDataWithColor,
} from '../../services/chart/types';
import { AlertLocationResponse } from '../../services/alerts/types';

/**
 * State shape of the Dashboard reducer.
 */
export interface DashboardState {
  days: number;
  total: number;
  levelDistributionLoading: boolean;
  levelDistributionData: PieChartDataWithColor[];
  statusDistributionLoading: boolean;
  statusDistributionData: PieChartDataWithColor[];
  collectionDistributionLoading: boolean;
  collectionDistributionData: PieChartDataWithColor[];
  levelTimeseriesLoading: boolean;
  levelTimeseriesData: StackedAreaChartDataWithColor[];
  locations: AlertLocationResponse | null;
  locationsLoading: boolean;
  locationFeatureCount: number;
}

/**
 * Initial state of the Dashboard reducer.
 * @type {State}
 */
const INITIAL_STATE: DashboardState = {
  days: 0,
  total: 0,
  levelDistributionLoading: false,
  levelDistributionData: [],
  statusDistributionLoading: false,
  statusDistributionData: [],
  collectionDistributionLoading: false,
  collectionDistributionData: [],
  levelTimeseriesLoading: false,
  levelTimeseriesData: [],
  locations: null,
  locationsLoading: false,
  locationFeatureCount: 0,
};

/**
 * Object used to map reducer functions to action types modifying the
 * Dashboard reducer state.
 * @type {ReducerMap<State, any>}
 */
const reducers: ReducerMap<DashboardState, any> = {};

/**
 * Function that cancels a pending request.
 */
let requestCanceler: Canceler;

/**
 * Cancels a pending request related to the Dashboard view and replaces
 * the requestCanceler function with a new one.
 * @param canceler Function that cancels a request.
 */
function cancelRequest(canceler?: Canceler): void {
  if (requestCanceler) { requestCanceler(); }
  if (canceler) { requestCanceler = canceler; }
}

/**
 * Updates the Dashboard reducer based on a(n) FETCH_DATA_PENDING action.
 * @param state Current Dashboard reducer state.
 * @param action FETCH_DATA_PENDING action.
 * @returns {State} Updated Dashboard reducer state.
 */
reducers[actions.FETCH_DATA_PENDING] = (
  state: DashboardState,
  action: actions.FetchDataPendingAction,
): DashboardState => {
  const update: Partial<DashboardState> = {
    collectionDistributionLoading: true,
    days: action.payload.days,
    levelDistributionLoading: true,
    levelTimeseriesLoading: true,
    locationsLoading: true,
    statusDistributionLoading: true,
  };

  // Cancel any current requests.
  cancelRequest(action.payload.canceler);

  return _.assign({}, state, update);
};

/**
 * Updates the Dashboard reducer based on a(n)
 * FETCH_DISTRIBUTION_DATA_SUCCESS action.
 * @param state Current Dashboard reducer state.
 * @param action FETCH_DISTRIBUTION_DATA_SUCCESS action.
 * @returns {State} Updated Dashboard reducer state.
 */
reducers[actions.FETCH_DISTRIBUTION_DATA_SUCCESS] = (
  state: DashboardState,
  action: actions.FetchDistributionDataSuccessAction,
): DashboardState => {
  const update: Partial<DashboardState> = {
    [`${action.payload.type}DistributionData`]: action.payload.data,
    [`${action.payload.type}DistributionLoading`]: false,
    total: action.payload.total,
  };

  return _.assign({}, state, update);
};

/**
 * Updates the Dashboard reducer based on a(n)
 * FETCH_TIMESERIES_DATA_SUCCESS action.
 * @param state Current Dashboard reducer state.
 * @param action FETCH_TIMESERIES_DATA_SUCCESS action.
 * @returns {State} Updated Dashboard reducer state.
 */
reducers[actions.FETCH_TIMSERIES_DATA_SUCCESS] = (
  state: DashboardState,
  action: actions.FetchTimeseriesDataSuccessAction,
): DashboardState => {
  const update: Partial<DashboardState> = {
    levelTimeseriesData: action.payload,
    levelTimeseriesLoading: false,
  };

  return _.assign({}, state, update);
};

/**
 * Updates the Dashboard reducer based on a(n) FETCH_LOCATION_DATA_SUCCESS action.
 * @param state Current Dashboard reducer state.
 * @param action FETCH_LOCATION_DATA_SUCCESS action.
 * @returns {State} Updated Dashboard reducer state.
 */
reducers[actions.FETCH_LOCATION_DATA_SUCCESS] = (
  state: DashboardState,
  action: actions.FetchLocationDataSuccessAction,
): DashboardState => {
  const update: Partial<DashboardState> = {
    locationFeatureCount: action.payload.features.length,
    locations: action.payload,
    locationsLoading: false,
  };

  return _.assign({}, state, update);
};

/**
 * Updates the Dashboard reducer based on a(n) FETCH_DATA_FAILURE action.
 * @param state Current Dashboard reducer state.
 * @param action FETCH_DATA_FAILURE action.
 * @returns {State} Updated Dashboard reducer state.
 */
reducers[actions.FETCH_DATA_FAILURE] = (
  state: DashboardState,
  action: actions.FetchDataFailureAction,
): DashboardState => {
  const update: Partial<DashboardState> = {
    // Sets loading to false for the failed widget.
    [`${action.payload}Loading`]: false,
  };

  return _.assign({}, state, update);
};

/**
 * Dashboard reducer.
 * @type {Reducer<State, any>}
 */
export const dashboard = handleActions<DashboardState, any>(
  reducers,
  INITIAL_STATE,
);
