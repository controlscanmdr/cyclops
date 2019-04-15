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
import { OverlayTrigger, Popover } from 'react-bootstrap';

// Local
import { AlertOutcomeChoices } from '../../../services/alerts/types';
import { createRandomId } from '../../../utils/stringUtils';
import { getOutcomeDisplayName } from '~/services/alerts/utils/getOutcomeDisplayName';
import { currentUserIsStaff } from '~/services/users/utils/currentUserIsStaff';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertDetailOutcomeDisplay component. */
interface Props {
  /** Current alert notes. */
  notes: string;
  /** Current alert outcome. */
  outcome: AlertOutcomeChoices;
  /** Opens the alert outcome form. */
  editOutcome(): any;
  /** Removes the current alert outcome. */
  showRemovePanel(): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays information about an alert detail outcome and it's analysis.
 */
export class AlertDetailOutcomeDisplay extends React.Component<Props, {}> {
  /**
   * Popover explaining that a button triggers the ability for the user
   * to edit the outcome.
   * @type {any}
   */
  public editPopover: JSX.Element = (
    <Popover id={createRandomId()}>Edit</Popover>
  );

  /**
   * Popover explaining that a button triggers the ability for the user
   * to remove the current outcome.
   * @type {any}
   */
  public removePopover: JSX.Element = (
    <Popover id={createRandomId()}>Remove</Popover>
  );

  public render() {
    const outcome =
      getOutcomeDisplayName(this.props.outcome) ||
      <i>No outcome selected</i>;
    const notes = this.props.notes || <i>No analysis written</i>;
    const isStaff = currentUserIsStaff();
    const removeOutcomeButton = this.props.outcome && isStaff
      ? (
        <OverlayTrigger
          overlay={this.removePopover}
          placement="top"
          animation={false}
        >
          <button
            id="alert-remove-outcome"
            className="btn-basic pull-right alert-detail-outcome__remove"
            onClick={this.props.showRemovePanel}
          >
            <i className="fa fa-close" />
          </button>
        </OverlayTrigger>
      ) : null;
    const editOutcome = isStaff
      ? (
        <OverlayTrigger
          overlay={this.editPopover}
          placement="top"
          animation={false}
        >
          <button
            id="alert-edit-outcome"
            className="btn-basic pull-right"
            onClick={this.props.editOutcome}
          >
            <i className="fa fa-pencil" />
          </button>
        </OverlayTrigger>
      ) : null;

    return (
      <div className="well alert-detail-outcome__well">
        <div className="well__header">
          {outcome}
          {removeOutcomeButton}
          {editOutcome}
        </div>
        <p className="well__content text--pre-line">{notes}</p>
      </div>
    );
  }
}
