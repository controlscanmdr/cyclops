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
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';

// Local
import { User } from '~/services/users/types';
import { AlertStatusChoices } from '~/services/alerts/types';
import { getConfig } from '~/config';
import { currentUserIsStaff } from '~/services/users/utils/currentUserIsStaff';
import { isCurrentUser } from '~/services/users/utils/isCurrentUser';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertDetailUnassignButton component. */
interface Props {
  /** User assigned to the alert. */
  user: User | null;
  /** Alert status. */
  status: AlertStatusChoices;
  /** Unassigns the alert. */
  unassign(): void;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays an unassign button based on the current alert user and status.
 */
export class AlertDetailUnassignButton extends React.Component<Props, {}> {
  /**
   * Popover for the unassign button.
   * @type {JSX.Element}
   */
  public static unassignOverlay = (
    <Popover id="alert-detail-unassign-overlay">
      Unassign
    </Popover>
  );

  public render() {
    const isDone = this.props.status === 'DONE';
    const isAssigned = !!this.props.user;
    const currentUser = this.props.user
      ? isCurrentUser(this.props.user)
      : false;

    if (!currentUserIsStaff() || !isAssigned || !currentUser || isDone) {
      return null;
    }

    return (
      <OverlayTrigger
        overlay={AlertDetailUnassignButton.unassignOverlay}
        placement="top"
        animation={false}
      >
        <button
          className="alert-detail__assign-btn"
          onClick={this.props.unassign}
        >
          <i className="fa fa-minus" />
        </button>
      </OverlayTrigger>
    );
  }
}
