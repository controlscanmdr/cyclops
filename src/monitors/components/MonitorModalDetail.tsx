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
import { pascalize } from 'humps';

// Local
import { formatDate } from '../../common/services/dateUtils';
import { MonitorNested } from '../types/Monitor';

// Types
// --------------------------------------------------------------------------

interface MonitorDetailProps {
  // Monitor object to display.
  monitor: MonitorNested;
}

// Component
// --------------------------------------------------------------------------

// Displays detailed information about a monitor.
export class MonitorDetail extends React.Component<MonitorDetailProps, {}> {
  render(): JSX.Element {
    const lastActiveDistillery = this.props.monitor.last_active_distillery;
    const distilleryNameElements = this.props.monitor.distilleries.map(distillery => (
      <li key={distillery.id}>{distillery.name}</li>
    ));

    return (
      <div className="content">
        <h4 className="sub-title">Details</h4>
        <dl className="dl-horizontal">
          <dt>Name:</dt>
          <dd>{this.props.monitor.name}</dd>

          <dt>Status:</dt>
          <dd>{this.props.monitor.status}</dd>

          <dt>Active:</dt>
          <dd>{this.props.monitor.enabled.toString()}</dd>

          <dt>Interval:</dt>
          <dd>{this.props.monitor.interval}</dd>

          <dt>Alerts Enabled:</dt>
          <dd>{this.props.monitor.alerts_enabled.toString()}</dd>

          <dt>Alert Level:</dt>
          <dd>{pascalize(this.props.monitor.alert_level.toLowerCase())}</dd>
        </dl>

        <h4 className="sub-title">Dates</h4>
        <dl className="dl-horizontal">
          <dt>Last Updated:</dt>
          <dd>{formatDate(this.props.monitor.last_active)}</dd>

          <dt>Last Healthy:</dt>
          <dd>{formatDate(this.props.monitor.last_healthy)}</dd>
        </dl>

        <h4 className="sub-title">Sources</h4>
        <dl className="dl-horizontal">
          <dt>Most Recent:</dt>
          <dd>{lastActiveDistillery ? lastActiveDistillery.name : 'None'}</dd>

          <dt>All Sources:</dt>
          <dd>
            <ul className="list-unstyled">
              {distilleryNameElements}
            </ul>
          </dd>
        </dl>
      </div>
    );
  }
}
