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
  AlertDetailOutcome,
} from '../components/AlertDetailOutcome';
import * as actions from '../../../store/alertDetailOutcome/alertDetailOutcomeActions';
import { AlertDetail } from '../../../services/alerts/types';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Container component properties. */
interface ContainerProps {
  /** Alert to modify. */
  alert: AlertDetail;
}

/** Function that maps the redux state to the wrapped component. */
type Values = StateToProps<ValueProps, ContainerProps>;

/** Function that maps redux dispatch functions to the wrapped component. */
type Functions = DispatchToProps<FunctionProps, ContainerProps>;

/** Container component class type. */
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
  active: state.alertDetailOutcome.active,
  alert: props.alert,
  notes: state.alertDetailOutcome.notes,
  outcome: state.alertDetailOutcome.outcome,
  showRemovePanel: state.alertDetailOutcome.showRemovePanel,
});

/**
 * Maps redux dispatch functions to wrapped component properties.
 * @param dispatch Dispatch function for the Redux store.
 */
const functions: Functions = (dispatch) => ({
  changeOutcome: bind(actions.changeOutcome, dispatch),
  changeNotes: bind(actions.changeNotes, dispatch),
  submit: bind(actions.submit, dispatch),
  open: bind(actions.open, dispatch),
  close: bind(actions.close, dispatch),
  removeOutcome: bind(actions.removeOutcome, dispatch),
  openRemovePanel: bind(actions.openRemovePanel, dispatch),
  closeRemovePanel: bind(actions.closeRemovePanel, dispatch),
});

// --------------------------------------------------------------------------
// Container
// --------------------------------------------------------------------------

/**
 * Container for the AlertDetailOutcome component.
 * @type {Container}
 */
export const AlertDetailOutcomeContainer: Container = connect(
  values,
  functions,
)(AlertDetailOutcome);
