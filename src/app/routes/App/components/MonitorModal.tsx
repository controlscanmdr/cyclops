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
import { Modal } from 'react-bootstrap';

// Local
import { MonitorModalList } from './MonitorModalList';
import { NormalizedMonitorList } from '../../../services/monitors/types';
import { Loading } from '../../../components/Loading';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

export interface ValueProps {
  /** If the monitor list is currently loading. */
  loading: boolean;
  /** List of the current monitors. */
  monitors: NormalizedMonitorList | null;
  /** List of monitors that are currently up. */
  monitorsUp: string[];
  /** List of monitors that are currently down. */
  monitorsDown: string[];
  /** If the modal is currently active. */
  modalActive: boolean;
  /** Monitor to view detailed information on. */
  selectedMonitor: string | null;
}

export interface FunctionProps {
  /**
   * Selects a monitor to view detailed information on.
   * @param monitor ID of the monitor to view.
   */
  selectMonitor(monitor: string): any;
  /** Closes the monitor modal. */
  closeModal(): any;
}

type Props = ValueProps & FunctionProps;

/**
 * Displays a popup that contains data of the current list of monitors.
 */
export class MonitorModal extends React.Component<Props, {}> {
  public render(): JSX.Element {
    const modalList = this.props.monitors
      ? (
        <MonitorModalList
          monitors={this.props.monitors}
          monitorsUp={this.props.monitorsUp}
          monitorsDown={this.props.monitorsDown}
          selectMonitor={this.props.selectMonitor}
          selectedMonitor={this.props.selectedMonitor}
        />
      ) : null;
    const loadingIcon = this.props.loading ? <Loading /> : null;

    return (
      <Modal show={this.props.modalActive} onHide={this.props.closeModal}>
        <Modal.Header closeButton={true}>
          <Modal.Title className="text-white">
            Monitors
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="monitor-modal__body">
          {modalList}
          {loadingIcon}
        </Modal.Body>
      </Modal>
    );
  }
}
