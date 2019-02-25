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
import { ListGroup } from 'react-bootstrap';

// Local
import { MonitorDetail } from './MonitorModalDetail';
import { NormalizedMonitorList } from '../../../services/monitors/types';
import {
  denormalizeMonitors,
  denormalizeMonitor,
} from '../../../services/monitors/utils/monitorUtils';
import { MonitorModalListItem } from './MonitorModalListItem';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the MonitorModalList component. */
interface Props {
  /** List of current monitors. */
  monitors: NormalizedMonitorList;
  /** Monitor names that are currently up. */
  monitorsUp: string[];
  /** Monitor names that are currently down. */
  monitorsDown: string[];
  /** Name of the currently selected monitor. */
  selectedMonitor: string | null;
  /**
   * Selects a monitor to view more detailed information on.
   * @param monitor
   */
  selectMonitor(monitor: string): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * List of the current monitors sorted by their status.
 */
export class MonitorModalList extends React.Component<Props, {}> {
  public render(): JSX.Element {
    const monitorsUpList = denormalizeMonitors(
      this.props.monitors,
      this.props.monitorsUp,
    );
    const monitorsDownList = denormalizeMonitors(
      this.props.monitors,
      this.props.monitorsDown,
    );
    const selectedMonitorObject = this.props.selectedMonitor
      ? denormalizeMonitor(this.props.selectedMonitor, this.props.monitors)
      : null;
    const monitorsDownElements = monitorsDownList.map((monitor) => (
      <MonitorModalListItem
        monitor={monitor}
        selectedMonitor={this.props.selectedMonitor}
        selectMonitor={this.props.selectMonitor}
      />
    ));
    const monitorsUpElements = monitorsUpList.map((monitor) => (
      <MonitorModalListItem
        monitor={monitor}
        selectedMonitor={this.props.selectedMonitor}
        selectMonitor={this.props.selectMonitor}
      />
    ));
    const monitorDetail = selectedMonitorObject ? (
      <MonitorDetail monitor={selectedMonitorObject}/>
    ) : (
      <h4 className="text-center">No Monitor Selected</h4>
    );

    return (
      <div className="flex-box">
        <div className="flex-item flex--shrink monitor-sidebar">
          <div className="monitor-sidebar__heading">
            <i className="fa fa-arrow-down" />
            {' ' + this.props.monitorsDown.length} Down
          </div>
          <ListGroup>
            {monitorsDownElements}
          </ListGroup>

          <div className="monitor-sidebar__heading">
            <i className="fa fa-arrow-up" />
            {' ' + this.props.monitorsUp.length} Up
          </div>
          <ListGroup>
            {monitorsUpElements}
          </ListGroup>
        </div>
        <div className="flex-item">
          {monitorDetail}
        </div>
      </div>
    );
  };
}
