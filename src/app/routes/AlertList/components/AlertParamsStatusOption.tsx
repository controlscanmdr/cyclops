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
import { ListGroupItem } from 'react-bootstrap';

// Local
import {
  AlertStatusParam,
  AlertOption,
} from '~/services/alerts/types';
import { toggleValue, includesOrEquals } from '~/utils/arrayUtils';
import { AlertStatusIcon } from '~/services/alerts/components/AlertStatusIcon';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertParamsStatusOption component */
interface Props {
  /** Status option to display. */
  status: AlertOption;
  /**  Currently selected alert status. */
  currentStatus?: AlertStatusParam;
  /**
   * Selects a new status to filer alerts by.
   * @param status Status to filter alerts by.
   */
  selectStatus(status?: AlertStatusParam): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays a list group item of a status that allows the option value to
 * be toggled when clicked.
 */
export class AlertParamsStatusOption extends React.Component<Props, {}> {
  /**
   * Toggles this status option into the currently selected statuses.
   */
  public toggleStatus = (): void => {
    const newStatus = toggleValue<string>(
      this.props.currentStatus,
      this.props.status.value,
    );

    this.props.selectStatus(newStatus);
  };

  public render() {
    const { currentStatus } = this.props;
    const statusIcon = this.props.status.value
      ? <AlertStatusIcon status={this.props.status.value} />
      : null;

    return (
      <ListGroupItem
        active={includesOrEquals(currentStatus, this.props.status.value)}
        onClick={this.toggleStatus}
        key={this.props.status.value}
      >
        <div className="flex-box">
          <div className="flex-item">
            {this.props.status.name}
          </div>
          <div className="flex-item flex--shrink text-right">
            {statusIcon}
          </div>
        </div>
      </ListGroupItem>
    );
  }
}
