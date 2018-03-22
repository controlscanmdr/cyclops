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
import { Select, SelectOption } from '../../common/components/Select';
import { TextAreaPlain } from '../../common/components/TextAreaPlain';
import { AlertOutcomeChoices } from '../types/Alert';

// Interfaces/Types
// --------------------------------------------------------------------------

interface Props {
  // Current alert outcome.
  outcome: AlertOutcomeChoices;

  // Current alert notes.
  notes: string;

  /**
   * Submits the alert changes.
   * @param {AlertOutcomeChoices} outcome
   * @param {string} notes
   * @returns {any}
   */
  onSubmit(outcome: AlertOutcomeChoices, notes: string): any;

  // Cancels the current form.
  onCancelClick(): any;
}

interface State {
  notes: string;
  outcome: AlertOutcomeChoices;
}

// Component
// --------------------------------------------------------------------------

// Form that changes an alert outcome or notes.
export class AlertDetailOutcomeForm extends React.Component<Props, State> {
  state: State = {
    notes: this.props.notes,
    outcome: this.props.outcome,
  };

  // Outcome options for the select dropdown.
  static OUTCOME_OPTIONS: SelectOption[] = [{
    name: 'Select Outcome',
    value: '',
  }, {
    name: 'Completed',
    value: 'completed',
  }, {
    name: 'Duplicate',
    value: 'duplicate',
  }, {
    name: 'False Positive',
    value: 'false positive',
  }, {
    name: 'N/A',
    value: 'N/A',
  }];

  /**
   * Changes the currently selected outcome.
   * @param {string} value
   */
  handleOutcomeChange = (value: string) => {
    const outcome = value ? value as AlertOutcomeChoices : null;

    this.setState({ outcome });
  };

  /**
   * Changes the current notes.
   * @param {string} notes
   */
  handleNotesChange = (notes: string) => {
    this.setState({ notes });
  };

  // Submits the outcome and note changes.
  handleSubmit = () => {
    this.props.onSubmit(this.state.outcome, this.state.notes);
  };

  render() {
    return (
      <div>
        <Select
          options={AlertDetailOutcomeForm.OUTCOME_OPTIONS}
          value={String(this.state.outcome)}
          onChange={this.handleOutcomeChange}
        />
        <TextAreaPlain value={this.state.notes} onChange={this.handleNotesChange} />
        <div className="btn-group btn-group-justified">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-default"
              disabled={!this.state.notes || !this.state.outcome}
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </div>
          <div className="btn-group">
            <button type="button" className="btn btn-danger" onClick={this.props.onCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}
