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
import { Modal } from 'react-bootstrap';

// Local
import { MonitorModalList } from './MonitorModalList';
import { NormalizedMonitorList } from '../types/Monitor';
import { Loading } from '../../common/components/Loading';
import * as actions from '../actions/monitorModalActions';
import { MapStateToProps } from '../../common/types/MapStateToProps';
import { MapDispatchToProps } from '../../common/types/MapDispatchToProps';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Types
// --------------------------------------------------------------------------

export interface ValueProps {
  // If the monitor list is currently loading.
  loading: boolean;

  // List of the current monitors.
  monitors: NormalizedMonitorList | null;

  // List of monitors that are currently up.
  monitorsUp: string[];

  // List of monitors that are currently down.
  monitorsDown: string[];

  // If the modal is currently active.
  modalActive: boolean;

  // Monitor to view detailed information on.
  selectedMonitor: string | null;
}

export interface FunctionProps {
  /**
   * Selects a monitor to view detailed information on.
   * @param monitor ID of the monitor to view.
   */
  selectMonitor(monitor: string): any;

  // Closes the monitor modal.
  closeModal(): any;
}

type Props = ValueProps & FunctionProps;

// Component
// --------------------------------------------------------------------------

// Displays a popup that contains data of the current list of monitors.
export class MonitorModal extends React.Component<Props, {}> {
  render(): JSX.Element {
    const modalList = this.props.monitors
      ? (
        <MonitorModalList
          monitors={this.props.monitors}
          monitorsUp={this.props.monitorsUp}
          monitorsDown={this.props.monitorsDown}
          selectMonitor={this.props.selectMonitor}
          selectedMonitor={this.props.selectedMonitor}
        />
      )
      : null;
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

// Container
// --------------------------------------------------------------------------

interface Container {}

const mapStateToProps: MapStateToProps<Props, Container> = state => ({
  loading: state.monitorModal.loading,
  monitors: state.monitorModal.monitors,
  monitorsUp: state.monitorModal.monitorsUp,
  monitorsDown: state.monitorModal.monitorsDown,
  modalActive: state.monitorModal.modalActive,
  selectedMonitor: state.monitorModal.selectedMonitor,
});

const mapDispatchToProps: MapDispatchToProps<Props, Container> = dispatch => ({
  selectMonitor: bindActionCreators(actions.selectMonitor, dispatch),
  closeModal: bindActionCreators(actions.closeModal, dispatch),
});

const container = connect(mapStateToProps, mapDispatchToProps)(MonitorModal);

export default container as React.ComponentClass<Container>;
