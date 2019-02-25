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
import { MonitorModalContainer } from '../containers/MonitorModalContainer';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Value properties of the MonitorStatus component. */
export interface ValueProps {
  /** Monitors that are currently running. */
  monitorsUp: string[];
  /** Monitors that are currently down. */
  monitorsDown: string[];
  /** Timeout ID of the monitor polling. */
  pollTimeoutID: number | null;
}

/** Function properties of the MonitorStatus component. */
export interface FunctionProps {
  /**
   * Selects a monitor from the list.
   * @param monitor ID of the monitor to select.
   */
  selectMonitor(monitor: string): any;
  /** Closes the monitor modal. */
  closeModal(): any;
  /** Opens the monitor modal. */
  openModal(): any;
  /** Gets the current list of monitors. */
  fetchMonitors(loading: boolean, delay: number, timeoutID?: number): any;
}

/** Combined property interfaces for the MonitorStatus component. */
type Props = ValueProps & FunctionProps;

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays two icons that show how many monitors are up and down, and once
 * clicked displays a modal with the information of all the monitors.
 */
export class MonitorStatus extends React.Component<Props, {}> {
  /** Time to wait before polling for new monitors in milliseconds. */
  public static POLLING_DELAY = 60000;

  public componentWillMount(): void {
    this.fetchMonitors(false);
  }

  /**
   * Fetches the current list of monitors and starts the monitor poll.
   * @param loading If a loading icon should be shown on the monitor modal.
   * @param timeoutID ID of the polling timeout.
   */
  public fetchMonitors = (loading: boolean, timeoutID?: number): void => {
    this.props.fetchMonitors(
      loading,
      MonitorStatus.POLLING_DELAY,
      timeoutID,
    );
  };

  /** Fetches the monitors and opens the modal. */
  public openModal = (): void => {
    this.fetchMonitors(true, this.props.pollTimeoutID || undefined);
    this.props.openModal();
  };

  public render(): JSX.Element {
    return (
      <div className="flex-item flex--shrink">
        <a className="header__link" onClick={this.openModal}>
          {this.props.monitorsUp.length + ' '} <i className="fa fa-arrow-up" />
          {' '}
          {this.props.monitorsDown.length + ' '} <i className="fa fa-arrow-down" />

          <MonitorModalContainer />
        </a>
      </div>
    );
  }
}
