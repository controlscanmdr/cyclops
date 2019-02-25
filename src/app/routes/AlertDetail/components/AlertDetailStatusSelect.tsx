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
import { AlertStatusIcon } from '~/services/alerts/components/AlertStatusIcon';
import { SubtleSelect } from '~/components/SubtleSelect';
import { STATUS_OPTIONS, STATUS_OPTIONS_LIST } from '~/routes/AlertList/constants';
import { AlertStatusChoices } from '~/services/alerts/types';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertDetailStatusSelect component. */
interface Props {
  /** Current status of the alert. */
  currentStatus: AlertStatusChoices;
  /**
   * Changes the status of the alert.
   * @param status
   */
  selectStatus(status: string): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Shows a subtle select that allows the user to change the current alerts
 * status.
 */
export class AlertDetailStatusSelect extends React.Component<Props, {}> {
  public render() {
    return (
      <SubtleSelect
        options={STATUS_OPTIONS_LIST}
        currentValue={this.props.currentStatus}
        onSelect={this.props.selectStatus}
      >
        <AlertStatusIcon status={this.props.currentStatus}/>
        <span className="alert-icon-spacing">
          {STATUS_OPTIONS[this.props.currentStatus].name}
        </span>
      </SubtleSelect>
    );
  }
}
