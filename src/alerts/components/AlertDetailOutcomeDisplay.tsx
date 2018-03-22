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
import { OverlayTrigger, Popover } from 'react-bootstrap';

// Local
import { AlertOutcomeChoices } from '../types/Alert';
import { createRandomId } from '../../common/services/stringUtils';
import { getOutcomeDisplayName } from '../services/getOutcomeDisplayName';
import { currentUserIsStaff } from '../../users/services/currentUserIsStaff';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Current alert notes.
  notes: string;

  // Current alert outcome.
  outcome: AlertOutcomeChoices;

  // Opens the alert outcome form.
  onEditClick(): any;

  // Removes the current alert outcome.
  onRemoveClick(): any;
}

interface State {}

// Component
// --------------------------------------------------------------------------

// Information about an alert detail outcome and it's analysis
export class AlertDetailOutcomeDisplay extends React.Component<Props, State> {
  /**
   * Popover explaining that a button triggers the ability for the user
   * to edit the outcome.
   */
  editPopover: JSX.Element = (
    <Popover id={createRandomId()}>Edit</Popover>
  );

  /**
   * Popover explaining that a button triggers the ability for the user
   * to remove the current outcome.
   */
  removePopover: JSX.Element = (
    <Popover id={createRandomId()}>Remove</Popover>
  );

  /**
   * Renders the button that allows outcome edits.
   * @returns {JSX.Element | null}
   */
  renderEditButton = (): JSX.Element | null => {
    return currentUserIsStaff() ? (
      <OverlayTrigger overlay={this.editPopover} placement="top" animation={false}>
        <button
          id="alert-edit-outcome"
          className="btn-basic pull-right"
          onClick={this.props.onEditClick}
        >
          <i className="fa fa-pencil" />
        </button>
      </OverlayTrigger>
    ) : null;
  };

  /**
   * Renders the button that allows outcome removal.
   * @returns {JSX.Element | null}
   */
  renderRemoveButton = (): JSX.Element | null => {
    return this.props.outcome && currentUserIsStaff() ? (
      <OverlayTrigger overlay={this.removePopover} placement="top" animation={false}>
        <button
          id="alert-remove-outcome"
          className="btn-basic pull-right alert-detail-outcome__remove"
          onClick={this.props.onRemoveClick}
        >
          <i className="fa fa-close" />
        </button>
      </OverlayTrigger>
    ) : null;
  };

  render() {
    return (
      <div className="well alert-detail-outcome__well">
        <div className="well__header">
          {getOutcomeDisplayName(this.props.outcome) || <i>No outcome selected</i>}
          {this.renderRemoveButton()}
          {this.renderEditButton()}
        </div>
        <p className="well__content text--pre-line">
          {this.props.notes || <i>No analysis written</i>}
        </p>
      </div>
    );
  }
}
