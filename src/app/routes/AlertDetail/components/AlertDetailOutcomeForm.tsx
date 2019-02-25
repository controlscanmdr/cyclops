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
import {
  Select,
  SelectOption,
} from '../../../components/Select';
import { TextAreaPlain } from '../../../components/TextAreaPlain';
import { AlertDetail } from '../../../services/alerts/types';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertDetailOutcomeForm component. */
interface Props {
  /** Current alert outcome. */
  outcome: string;
  /** Current alert notes. */
  notes: string;
  /** Alert to modify. */
  alert: AlertDetail;
  /**
   * Function that runs whenever the outcome is changed.
   * @param outcome Selected outcome.
   */
  changeOutcome(outcome: string): any;
  /**
   * Function that runs whenever the alert analysis changes.
   * @param notes Written notes.
   */
  changeNotes(notes: string): any;
  /**
   * Submits the changes to the alert outcome and notes.
   */
  submit(): any;
  cancel(): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays a form to change an alert's outcome and notes.
 */
export class AlertDetailOutcomeForm extends React.Component<Props, {}> {
  /**
   * Outcome options for the select drop down.
   * @type {SelectOption[]}
   */
  public static OUTCOME_OPTIONS: SelectOption[] = [{
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

  public render() {
    return (
      <div>
        <Select
          options={AlertDetailOutcomeForm.OUTCOME_OPTIONS}
          value={String(this.props.outcome)}
          onChange={this.props.changeOutcome}
        />
        <TextAreaPlain
          value={this.props.notes}
          onChange={this.props.changeNotes}
        />
        <div className="btn-group btn-group-justified">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-default"
              disabled={!this.props.notes || !this.props.outcome}
              onClick={this.props.submit}
            >
              Submit
            </button>
          </div>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.props.cancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}
