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
import * as React from 'react';

// Local
import { AlertDetail, AlertOutcomeChoices } from '../types/Alert';
import { AlertDetailOutcomeForm } from './AlertDetailOutcomeForm';
import { AlertDetailOutcomeDisplay } from './AlertDetailOutcomeDisplay';
import { AlertDetailOutcomeRemove } from './AlertDetailOutcomeRemove';
import * as actions from '../actions/alertDetailOutcomeActions';
import { connect, Dispatch } from 'react-redux';
import { MapStateToProps } from '../../common/types/MapStateToProps';

// Types
// --------------------------------------------------------------------------

export interface Props {
  // If the form to change the outcome should be shown.
  showEditPanel: boolean;

  // Currently selected alert detail.
  alert: AlertDetail;

  // If a panel warning the user about removing an outcome should be shown.
  showRemovePanel: boolean;

  // Redux dispatch function.
  dispatch: Dispatch<any>;
}

// Component
// --------------------------------------------------------------------------

/**
 * Displays a subtle select that allows the user to change the outcome
 * of an alert.
 */
export class AlertDetailOutcome extends React.Component<Props, {}> {
  // Opens the outcome edit panel.
  openEditPanel = (): void => {
    this.props.dispatch(actions.openEditPanel());
  };

  // Opens the outcome remove panel.
  openRemovePanel = (): void => {
    this.props.dispatch(actions.openRemovePanel());
  };

  // Cancels outcome removal.
  cancelOutcomeRemoval = (): void => {
    this.props.dispatch(actions.closeRemovePanel());
  };

  // Removes the current outcome.
  removeOutcome = (): void => {
    this.props.dispatch(actions.removeOutcome(this.props.alert));
  };

  // Changes the current outcome.
  changeOutcome = (outcome: AlertOutcomeChoices, notes: string): void => {
    this.props.dispatch(actions.submitOutcomeChange(this.props.alert, outcome, notes));
  };

  // Cancels editing the current outcome.
  cancelOutcomeEdit = (): void => {
    this.props.dispatch(actions.closeEditPanel());
  };

  // Renders the outcome display component.
  renderOutcomeDisplay = (): JSX.Element => (
    <AlertDetailOutcomeDisplay
      notes={this.props.alert.notes}
      outcome={this.props.alert.outcome}
      onEditClick={this.openEditPanel}
      onRemoveClick={this.openRemovePanel}
    />
  );

  // Renders the outcome remove component.
  renderOutcomeRemove = (): JSX.Element => (
    <AlertDetailOutcomeRemove
      onRemoveClick={this.removeOutcome}
      onCancelClick={this.cancelOutcomeRemoval}
    />
  );

  // Renders the outcome edit component.
  renderOutcomeForm = (): JSX.Element => (
    <AlertDetailOutcomeForm
      outcome={this.props.alert.outcome}
      notes={this.props.alert.notes}
      onSubmit={this.changeOutcome}
      onCancelClick={this.cancelOutcomeEdit}
    />
  );

  // Renders the main content of the component.
  renderContent = (): JSX.Element => {
    if (this.props.showRemovePanel) return this.renderOutcomeRemove();
    if (this.props.showEditPanel) return this.renderOutcomeForm();

    return this.renderOutcomeDisplay();
  };

  render(): JSX.Element {
    return (
      <div className="spacing-section">
        <h3 className="sub-title">Outcome</h3>
        {this.renderContent()}
      </div>
    );
  }
}

// Container
// --------------------------------------------------------------------------

interface Container {
  // Alert to modify.
  alert: AlertDetail;
}

const mapStateToProps: MapStateToProps<Props, Container> = state => ({
  showEditPanel: state.alertDetailOutcome.active,
  showRemovePanel: state.alertDetailOutcome.showRemovePanel,
});

export default connect(mapStateToProps)(AlertDetailOutcome) as React.ComponentClass<Container>;

