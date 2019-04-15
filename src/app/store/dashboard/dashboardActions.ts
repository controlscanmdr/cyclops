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
import axios, {
  CancelToken,
  Canceler,
} from 'axios';

// / Local
import { createAction } from '~/utils/reduxUtils';
import {
  ReduxAction,
  ThunkActionPromise,
  ThunkActionVoid,
  ReduxDispatch,
} from '~/store/types';
import {
  DistributionDataTypes,
  DashboardDataTypes,
} from '../../routes/Dashboard/types';
import {
  PieChartDataWithColor,
  StackedAreaChartDataWithColor,
} from '~/services/chart/types';
import { AlertLocationResponse } from '~/services/alerts/types';
import {
  fetchAlertLevelTimeseries,
  fetchAlertLocations,
  fetchAlertCollectionDistribution,
  fetchAlertStatusDistribution,
  fetchAlertLevelDistribution,
} from '~/services/alerts/utils/alertsAPI';
import { createStackedChartFromTimeseries } from '../../routes/Dashboard/utils/createStackedChartFromTimeseries';

import { getCancelTokenSource } from '~/services/cyphon/utils/cancelTokens';
import { addError } from '../errorModal/errorModalActions';
import { createPieChartDataFromObject } from '~/services/chart/utils/createPieChartData';
import { sortPieChartData } from '~/services/chart/utils/sortPieChartData';
import { createRandomId } from '~/utils/stringUtils';
import { getPieChartDataTotal } from '~/services/chart/utils/getPieChartDataTotal';
import { addLevelPieChartColor } from '../../routes/Dashboard/utils/addLevelPieChartColor';
import { addColorProperty } from '~/services/chart/utils/addColorProperty';

/**
 * Action type prefix for Dashboard actions.
 * @type {string}
 */
const ACTION_PREFIX = 'DASHBOARD';

/**
 * Seed used to create status distribution pie chart colors.
 * @type {string}
 */
const STATUS_DISTRIBUTION_COLOR_SEED = createRandomId();

/**
 * Seed used to create collection distribution pie chart colors.
 * @type {string}
 */
const COLLECTION_DISTRIBUTION_COLOR_SEED = createRandomId();

// --------------------------------------------------------------------------
// FETCH_DATA_PENDING
// --------------------------------------------------------------------------

/**
 * Action Type: When alert statistics data is being fetched.
 * @type {string}
 */
export const FETCH_DATA_PENDING = `${ACTION_PREFIX}/FETCH_DATA_PENDING`;

/** FETCH_DATA_PENDING payload type. */
export interface FetchDataPendingPayload {
  canceler: Canceler;
  days: number;
}

/** FETCH_DATA_PENDING action type. */
export type FetchDataPendingAction = ReduxAction<FetchDataPendingPayload>;

/**
 * Creates a FETCH_DATA_PENDING action.
 * @returns {ReduxAction<FetchDataPendingPayload>;
 */
export function fetchDataPending(
  days: number,
  canceler: Canceler,
): FetchDataPendingAction {
  return createAction(FETCH_DATA_PENDING, { canceler, days });
}

// --------------------------------------------------------------------------
// FETCH_DISTRIBUTION_DATA_SUCCESS
// --------------------------------------------------------------------------

/**
 * Action Type: When a request for distribution data is successful.
 * @type {string}
 */
export const FETCH_DISTRIBUTION_DATA_SUCCESS =
  `${ACTION_PREFIX}/FETCH_DISTRIBUTION_DATA_SUCCESS`;

/** FETCH_DISTRIBUTION_DATA_SUCCESS payload type. */
export interface FetchDistributionDataSuccessPayload {
  type: DistributionDataTypes;
  data: PieChartDataWithColor[];
  total: number;
}

/** FETCH_DISTRIBUTION_DATA_SUCCESS action type. */
export type FetchDistributionDataSuccessAction = ReduxAction<
  FetchDistributionDataSuccessPayload
>;

/**
 * Creates a FETCH_DISTRIBUTION_DATA_SUCCESS action.
 * @returns {ReduxAction<Payload>;
 */
export function fetchDistributionDataSuccess(
  type: DistributionDataTypes,
  data: PieChartDataWithColor[],
  total: number,
): FetchDistributionDataSuccessAction {
  return createAction(FETCH_DISTRIBUTION_DATA_SUCCESS, { type, data, total });
}

// --------------------------------------------------------------------------
// FETCH_TIMSERIES_DATA_SUCCESS
// --------------------------------------------------------------------------

/**
 * Action Type: When a request for timeseries data is successful.
 * @type {string}
 */
export const FETCH_TIMSERIES_DATA_SUCCESS =
  `${ACTION_PREFIX}/FETCH_TIMSERIES_DATA_SUCCESS`;

/** FETCH_TIMSERIES_DATA_SUCCESS payload type. */
export type FetchTimeseriesDataSuccessPayload = StackedAreaChartDataWithColor[];

/** FETCH_TIMESERIESDATA_SUCCESS action type. */
export type FetchTimeseriesDataSuccessAction = ReduxAction<
  FetchTimeseriesDataSuccessPayload
>;

/**
 * Creates a FETCH_TIMSERIES_DATA_SUCCESS action.
 * @returns {ReduxAction<FetchTimeseriesDataSuccessPayload>;
 */
export function fetchTimeseriesDataSuccess(
  data: StackedAreaChartDataWithColor[],
): FetchTimeseriesDataSuccessAction {
  return createAction(FETCH_TIMSERIES_DATA_SUCCESS, data);
}

// --------------------------------------------------------------------------
// FETCH_LOCATION_DATA_SUCCESS
// --------------------------------------------------------------------------

/**
 * Action Type: When a requst for geojson data is successful.
 * @type {string}
 */
export const FETCH_LOCATION_DATA_SUCCESS =
  `${ACTION_PREFIX}/FETCH_LOCATION_DATA_SUCCESS`;

/**
 * FETCH_LOCATION_DATA_SUCCESS payload type.
 */
export type FetchLocationDataSuccessPayload = AlertLocationResponse;

/** FETCH_LOCATION_DATA_SUCCESS action type. */
export type FetchLocationDataSuccessAction = ReduxAction<
  FetchLocationDataSuccessPayload
>;

/**
 * Creates a FETCH_LOCATION_DATA_SUCCESS action.
 * @returns {ReduxAction<FetchLocationDataSuccessPayload>;
 */
export function fetchLocationDataSuccess(
  data: AlertLocationResponse,
): FetchLocationDataSuccessAction {
  return createAction(FETCH_LOCATION_DATA_SUCCESS, data);
}

// --------------------------------------------------------------------------
// FETCH_DATA_FAILURE
// --------------------------------------------------------------------------

/**
 * Action Type: When there is an error fetching dashboard data.
 * @type {string}
 */
export const FETCH_DATA_FAILURE = `${ACTION_PREFIX}/FETCH_DATA_FAILURE`;

/**
 * FETCH_DATA_FAILURE payload type.
 */
export type FetchDataFailurePayload = DashboardDataTypes;

/** FETCH_DATA_FAILURE action type. */
export type FetchDataFailureAction = ReduxAction<FetchDataFailurePayload>;

/**
 * Creates a FETCH_DATA_FAILURE action.
 * @returns {ReduxAction<FetchDataFailurePayload>;
 */
export function fetchDataFailure(
  type: DashboardDataTypes,
): FetchDataFailureAction {
  return createAction(FETCH_DATA_FAILURE, type);
}

// --------------------------------------------------------------------------
// Thunk Actions
// --------------------------------------------------------------------------

/**
 * Dispatches all actions the receive alert statistic information for the
 * dashboard.
 * @returns {ThunkActionPromise}
 */
export function fetchAlertStatistics(days: number): ThunkActionVoid {
  return (dispatch) => {
    const source = getCancelTokenSource();

    dispatch(fetchDataPending(days, source.cancel));

    dispatch(fetchLevelDistribution(days, source.token));
    dispatch(fetchStatusDistribution(days, source.token));
    dispatch(fetchCollectionDistribution(days, source.token));
    dispatch(fetchLocations(days, source.token));
    dispatch(fetchLevelTimeseries(days, source.token));
  };
}

/**
 * Retrieves the current alert level distribution over a period of days.
 * @param days Days to search over.
 * @param cancelToken Cancel token used to cancel the promise.
 * @returns {ThunkActionPromise}
 */
export function fetchLevelDistribution(
  days: number,
  cancelToken: CancelToken,
): ThunkActionPromise {
  return (dispatch) => {
    return fetchAlertLevelDistribution(days, cancelToken)
      .then((distribution) => {
        const pieChartData = createPieChartDataFromObject(distribution, true);
        const sortedPieChartData = sortPieChartData(pieChartData);
        const data: PieChartDataWithColor[] =
          addLevelPieChartColor(sortedPieChartData);
        const total = getPieChartDataTotal(data);

        dispatch(fetchDistributionDataSuccess('level', data, total));
      }).catch(broadcastError(dispatch, 'levelDistribution'));
  };
}

/**
 * Retrieves the current alert status distribution over a period of days.
 * @param days Days to search over.
 * @param cancelToken Cancel token used to cancel the promise.
 * @returns {(dispatch:any)=>Promise<void>}
 */
export function fetchStatusDistribution(
  days: number,
  cancelToken: CancelToken,
): ThunkActionPromise {
  return (dispatch) => {
    return fetchAlertStatusDistribution(days, cancelToken)
      .then((distribution) => {
        const pieChartData = createPieChartDataFromObject(distribution, true);
        const sortedPieChartData = sortPieChartData(pieChartData);
        const data = addColorProperty(
          sortedPieChartData,
          STATUS_DISTRIBUTION_COLOR_SEED,
        );
        const total = getPieChartDataTotal(data);

        dispatch(fetchDistributionDataSuccess('status', data, total));
      }).catch(broadcastError(dispatch, 'statusDistribution'));
  };
}

/**
 * Retrieves the current alert collection distribution over a period of days.
 * @param days Days to search over.
 * @param cancelToken Cancel token used to cancel the promise.
 * @returns {ThunkActionPromise}
 */
export function fetchCollectionDistribution(
  days: number,
  cancelToken: CancelToken,
): ThunkActionPromise {
  return (dispatch) => {
    return fetchAlertCollectionDistribution(days, cancelToken)
      .then((distribution) => {
        const pieChartData = createPieChartDataFromObject(distribution);
        const sortedPieChartData = sortPieChartData(pieChartData);
        const data = addColorProperty(
          sortedPieChartData,
          COLLECTION_DISTRIBUTION_COLOR_SEED,
        );
        const total = getPieChartDataTotal(data);

        dispatch(fetchDistributionDataSuccess('collection', data, total));
      }).catch(broadcastError(dispatch, 'collectionDistribution'));
  };
}

/**
 * Retrieves the current alert locations over a period of days.
 * @param days Days to search over.
 * @param cancelToken Cancel token used to cancel the promise.
 * @returns {ThunkActionPromise}
 */
export function fetchLocations(
  days: number,
  cancelToken: CancelToken,
): ThunkActionPromise {
  return (dispatch) => {
    return fetchAlertLocations(days, cancelToken)
      .then((featureCollection) => {
        dispatch(fetchLocationDataSuccess(featureCollection));
      }).catch(broadcastError(dispatch, 'locations'));
  };
}

/**
 * Retrieves the distribution of levels per day over a period of days.
 * @param days Days to search over.
 * @param cancelToken Cancel token used to cancel the promise.
 * @returns {ThunkActionPromise}
 */
export function fetchLevelTimeseries(
  days: number,
  cancelToken: CancelToken,
): ThunkActionPromise {
  return (dispatch) => {
    const timePeriod = days >= 7 ? days : 7;

    return fetchAlertLevelTimeseries(timePeriod, cancelToken)
      .then((timeseries) => {
        const data = createStackedChartFromTimeseries(timeseries, true);

        dispatch(fetchTimeseriesDataSuccess(data));
      }).catch(broadcastError(dispatch, 'levelTimeseries'));
  };
}

// --------------------------------------------------------------------------
// Private Methods
// --------------------------------------------------------------------------

/**
 * Broadcasts a dashboard data fetch error and adds the error to the
 * error popup. Ignores canceled requests.
 * @param dispatch Redux dispatch function.
 * @param type Type of data that failed.
 * @returns {(error:any)=>void}
 */
function broadcastError(dispatch: ReduxDispatch, type: DashboardDataTypes) {
  return (error: any): void => {
    if (axios.isCancel(error)) { return; }

    dispatch(fetchDataFailure(type));
    dispatch(addError(error));
  };
}
