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
import { User } from '../../users/types/User';
import { currentUserIsStaff } from '../../users/services/currentUserIsStaff';

// Types
// --------------------------------------------------------------------------

interface Props {
  // User assigned to the alert.
  user: User | null;

  // Assigns the current user to the alert.
  assign(): void;
}

// Component
// --------------------------------------------------------------------------

/**
 * Displays a button that assigns an alert to the current user.
 */
export class AlertDetailSelfAssignButton extends React.Component<Props, {}> {
  /**
   * Popover for the assign to self button.
   * @type {JSX.Element}
   */
  static POPOVER = (
    <Popover id="alert-detail-assign-to-me-overlay">
      Assign to Self
    </Popover>
  );

  render() {
    if (!currentUserIsStaff() || !!this.props.user) { return null; }

    return (
      <OverlayTrigger
        overlay={AlertDetailSelfAssignButton.POPOVER}
        placement="top"
        animation={false}
      >
        <button
          className="alert-detail__assign-btn"
          onClick={this.props.assign}
        >
          <i className="fa fa-plus" />
        </button>
      </OverlayTrigger>
    );
  }
}
