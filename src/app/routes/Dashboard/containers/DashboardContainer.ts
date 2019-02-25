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
import { bindActionCreators as bind } from 'redux';
import {
  ComponentClass,
  connect,
} from 'react-redux';

// Local
import {
  DispatchToProps,
  StateToProps,
} from '../../../store/types';
import {
  ValueProps,
  FunctionProps,
  Dashboard,
} from '../components/Dashboard';
import * as actions from '../../../store/dashboard/dashboardActions';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Container properties. */
interface ContainerProps {}

/** Function that maps the redux state to the wrapped component. */
type Values = StateToProps<ValueProps, ContainerProps>;

/** Function that maps redux dispatch functions to the wrapped component. */
type Functions = DispatchToProps<FunctionProps, ContainerProps>;

/** Container type. */
type Container = ComponentClass<ContainerProps>;

// --------------------------------------------------------------------------
// Property Mapping
// --------------------------------------------------------------------------

/**
 * Maps the redux state to wrapped component properties.
 * @param state Redux state.
 * @param props Container properties.
 */
const values: Values = (state, props) => ({
  days: state.dashboard.days,
  totalAlerts: state.dashboard.total,
  levelDistribution: state.dashboard.levelDistributionData,
  levelDistributionLoading: state.dashboard.levelDistributionLoading,
  statusDistribution: state.dashboard.statusDistributionData,
  statusDistributionLoading: state.dashboard.statusDistributionLoading,
  collectionDistribution: state.dashboard.collectionDistributionData,
  collectionDistributionLoading: state.dashboard.collectionDistributionLoading,
  levelTimeseries: state.dashboard.levelTimeseriesData,
  levelTimeseriesLoading: state.dashboard.levelTimeseriesLoading,
  locations: state.dashboard.locations,
  locationFeatureCount: state.dashboard.locationFeatureCount,
  locationsLoading: state.dashboard.locationsLoading,
});

/**
 * Maps redux dispatch functions to wrapped component properties.
 * @param dispatch Dispatch function for the redux store.
 */
const functions: Functions = (dispatch) => ({
  getAlertStatistics: bind(actions.fetchAlertStatistics, dispatch),
});

// --------------------------------------------------------------------------
// Container
// --------------------------------------------------------------------------

/**
 * Container for the Dashboard component.
 * @type {Container}
 */
export const DashboardContainer: Container = connect(
  values,
  functions,
)(Dashboard);
