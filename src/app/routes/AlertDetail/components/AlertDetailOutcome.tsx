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
import * as React from 'react';

// Local
import {
  Alert,
  AlertDetail,
  AlertOutcomeChoices,
} from '../../../services/alerts/types';
import { AlertDetailOutcomeForm } from './AlertDetailOutcomeForm';
import { AlertDetailOutcomeDisplay } from './AlertDetailOutcomeDisplay';
import { AlertDetailOutcomeRemove } from './AlertDetailOutcomeRemove';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Value properties of the AlertDetailOutcome component. */
export interface ValueProps {
  alert: AlertDetail;
  /** If the form to change the outcome should be shown. */
  active: boolean;
  /** Current alert notes. */
  notes: string;
  /** Current alert outcome. */
  outcome: AlertOutcomeChoices;
  /** If a panel warning the user about removing an outcome should be shown. */
  showRemovePanel: boolean;
}

/** Function properties of the AlertDetailOutcome component. */
export interface FunctionProps {
  /**
   * Function that runs whenever the outcome is changed.
   * @param outcome Selected outcome.
   */
  changeOutcome(outcome: AlertOutcomeChoices): any;
  /**
   * Function that runs whenever the alert analysis changes.
   * @param notes Written notes.
   */
  changeNotes(notes: string): any;
  /** Closes the alert detail outcome form. */
  close(): any;
  /**
   * Submits the changes to the alert outcome and notes.
   * @param alert Alert to change.
   * @param outcome Outcome to change to.
   * @param notes Notes to change to.
   */
  submit(alert: Alert, outcome: AlertOutcomeChoices, notes: string): any;
  /**
   * Removes the outcome from an alert.
   * @param alert Alert to remove the outcome from.
   */
  removeOutcome(alert: Alert): any;
  open(outcome: AlertOutcomeChoices, notes: string): any;
  openRemovePanel(): any;
  closeRemovePanel(): any;
}

/** All properties of the AlertDetailOutcome component. */
export type Props = ValueProps & FunctionProps;

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays a subtle select that allows the user to change the outcome
 * of an alert.
 */
export class AlertDetailOutcome extends React.Component<Props, {}> {

  public submit = (): void => {
    this.props.submit(this.props.alert, this.props.outcome, this.props.notes);
  };

  /**
   * Selects the new outcome whenever it's changed in the SubtleSelect.
   * @param outcome Select onChange event.
   */
  public handleSelect = (outcome: string): void => {
    this.props.changeOutcome(outcome as AlertOutcomeChoices);
  };

  public open = (): void => {
    this.props.open(this.props.alert.outcome, this.props.alert.notes);
  };

  public remove = (): void => {
    this.props.removeOutcome(this.props.alert);
  };

  public render(): JSX.Element {
    let display = (
      <AlertDetailOutcomeDisplay
        notes={this.props.alert.notes}
        outcome={this.props.alert.outcome}
        editOutcome={this.open}
        showRemovePanel={this.props.openRemovePanel}
      />
    );

    if (this.props.showRemovePanel) {
      display = (
        <AlertDetailOutcomeRemove
          remove={this.remove}
          close={this.props.closeRemovePanel}
        />
      );
    }

    if (this.props.active) {
      display = (
        <AlertDetailOutcomeForm
          alert={this.props.alert}
          outcome={String(this.props.outcome)}
          notes={this.props.notes}
          changeOutcome={this.handleSelect}
          changeNotes={this.props.changeNotes}
          submit={this.submit}
          cancel={this.props.close}
        />
      );
    }

    return (
      <div className="spacing-section">
        <h3 className="sub-title">Outcome</h3>
        {display}
      </div>
    );
  }
}
