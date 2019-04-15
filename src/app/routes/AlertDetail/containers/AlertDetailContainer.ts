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
  AlertDetail,
} from '../components/AlertDetail';
import * as actions from '../../../store/alertDetail/alertDetailActions';
import { AlertDetailRouteParams } from '~/routes/AlertDetail/types';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Container properties. */
interface ContainerProps {
  /** React router location. */
  location: LocationDescriptor;
  /** React router route parameters. */
  routeParams: AlertDetailRouteParams;
  /** React router object. */
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
  actions: state.alertList.actions,
  alert: state.alertDetail.alert,
  error: state.alertDetail.error,
  ipAddresses: state.alertDetail.ipAddresses,
  loading: state.alertDetail.loading,
  location: props.location,
  locations: state.alertDetail.locations,
  markers: state.alertDetail.markers,
  modalActive: state.alertDetail.modalActive,
  routeParams: props.routeParams,
  router: props.router,
  users: state.alertList.users,
});

/**
 * Maps redux dispatch functions to wrapped component properties.
 * @param dispatch Dispatch function for the redux store.
 */
const functions: Functions = (dispatch) => ({
  addComment: bind(actions.addAlertDetailComment, dispatch),
  addErrorMessage: bind(actions.addErrorMessage, dispatch),
  closeAlert: bind(actions.closeAlert, dispatch),
  closeDataModal: bind(actions.closeDataModal, dispatch),
  openDataModal: bind(actions.openDataModal, dispatch),
  openResultModal: bind(actions.openDataModal, dispatch),
  performAction: bind(actions.performAlertDetailAction, dispatch),
  updateAlert: bind(actions.updateAlertDetail, dispatch),
  viewAlert: bind(actions.fetchAlertDetail, dispatch),
  closeErrorMessage: bind(actions.closeErrorMessage, dispatch),
});

// --------------------------------------------------------------------------
// Container
// --------------------------------------------------------------------------

/**
 * Container for the AlertDetail component.
 * @type {Container}
 */
export const AlertDetailContainer: Container = withRouter(
  connect(
    values,
    functions,
  )(AlertDetail),
);
