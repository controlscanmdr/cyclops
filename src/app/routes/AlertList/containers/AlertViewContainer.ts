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
import {
  LocationDescriptor,
  InjectedRouter,
  withRouter,
} from 'react-router';

// Local
import {
  DispatchToProps,
  StateToProps,
} from '~/store/types';
import {
  ValueProps,
  FunctionProps,
  AlertView,
} from '../components/AlertView';
import * as actions from '../../../store/alertList/alertListActions';
import { fetchAllCategories } from '~/store/categoryStore/categoryStoreActions';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Container properties. */
interface ContainerProps {
  location: LocationDescriptor;
  router: InjectedRouter;
}

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
  alerts: state.alertList.alerts,
  categories: state.categoryStore,
  count: state.alertList.count,
  distilleries: state.alertList.distilleries,
  interval: state.alertList.interval,
  loading: state.alertList.loading,
  location: props.location,
  polling: state.alertList.polling,
  pollingEnabled: state.alertList.pollingEnabled,
  router: props.router,
  selectedAlert: state.alertDetail.alertId,
  users: state.alertList.users,
});

/**
 * Maps redux dispatch functions to wrapped component properties.
 * @param dispatch Dispatch function for the redux store.
 */
const functions: Functions = (dispatch) => ({
  fetchAllCategories: bind(fetchAllCategories, dispatch),
  disablePolling: bind(actions.disablePolling, dispatch),
  fetchViewResources: bind(actions.fetchViewResources, dispatch),
  searchAlerts: bind(actions.searchAlerts, dispatch),
  startPolling: bind(actions.pollAlerts, dispatch),
  stopPolling: bind(actions.stopPolling, dispatch),
});

// --------------------------------------------------------------------------
// Container
// --------------------------------------------------------------------------

/**
 * Container for the AlertView component.
 * @type {Container}
 */
export const AlertViewContainer: Container = withRouter(
  connect(
    values,
    functions,
  )(AlertView),
);
