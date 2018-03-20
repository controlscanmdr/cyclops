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
import { Tab, Modal, Nav, NavItem } from 'react-bootstrap';

// Local
import { ResultIPAdresses } from '../../common/types/result';
import { LocationFieldAddress, Markers } from '../../map/types/Map';
import { AlertDataIpAddresses } from './AlertDataIpAddresses';
import { AlertDataLocationMap } from './AlertDataLocationMap';
import { AlertData } from './AlertData';
import { Close } from '../../common/components/Close';
import { AlertDetail } from '../types/Alert';
import AlertDataContextSearch from './AlertDataContextSearch';
import { normalizeContexts } from '../../contexts/services/contextNormalizr';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Alert with data to view.
  alert: AlertDetail;

  // If the modal is active.
  active: boolean;

  // Locations associated with the alert.
  locations: LocationFieldAddress[] | null;

  // IP address fields from the alert data.
  ipAddresses: ResultIPAdresses | null;

  // GeoJSON markers generated from the alert data.
  markers: Markers | null;

  // Close the AlertDataModal.
  onClose(): any;
}

// Component
// --------------------------------------------------------------------------

// Options to analyze alerts data.
export class AlertDataModal extends React.Component<Props, {}> {
  // Event key for the IP address tab.
  static IP_ADDRESS_EVENT = 'ipaddresses';

  // Event key for the data tab.
  static DATA_EVENT = 'data';

  // Event key for the context search tab.
  static CONTEXT_EVENT = 'context';

  // Event key for the location tab.
  static LOCATION_EVENT = 'locations';

  // Close the modal when it unmounts and moves to a different route.
  componentWillUnmount() {
    this.props.onClose();
  }

  render() {
    const ipAddressElement = this.props.ipAddresses
      ? <AlertDataIpAddresses ipAddresses={this.props.ipAddresses} />
      : null;
    const mapElement = this.props.markers
      ? <AlertDataLocationMap markers={this.props.markers} />
      : null;
    const contexts = this.props.alert.distillery ? this.props.alert.distillery.contexts : null;
    const alertData = this.props.alert.distillery
      ? (
        <AlertData
          result={this.props.alert.data}
          distillery={this.props.alert.distillery}
        />
      )
      : <h2>Alert missing distillery</h2>;
    const alertContextSearch = this.props.alert.distillery
      ? (
        <AlertDataContextSearch
          resultId={this.props.alert.doc_id}
          contexts={normalizeContexts(this.props.alert.distillery.contexts)}
        />
      )
      : <h2>Alert missing distillery</h2>;

    return (
      <Modal show={this.props.active} bsSize="lg" onHide={this.props.onClose}>
        <Modal.Body className="result-modal__body">
          <Tab.Container id="result-modal-tab-container" defaultActiveKey="data">
            <div>
              <div className="flex-box flex-box--align-center result-modal__header">
                <div className="flex-item">
                  <Nav bsStyle="pills" className="result-nav">
                    <NavItem eventKey={AlertDataModal.DATA_EVENT}>Data</NavItem>
                    <NavItem
                      eventKey={AlertDataModal.CONTEXT_EVENT}
                      disabled={contexts ? !contexts.length : true}
                    >
                      Related Data
                    </NavItem>
                    <NavItem
                      eventKey={AlertDataModal.LOCATION_EVENT}
                      disabled={!this.props.markers}
                    >
                      Locations
                    </NavItem>
                    <NavItem
                      eventKey={AlertDataModal.IP_ADDRESS_EVENT}
                      disabled={!this.props.ipAddresses}
                    >
                      IP Addresses
                    </NavItem>
                  </Nav>
                </div>
                <div className="flex-item flex--shrink">
                  <Close close={this.props.onClose}/>
                </div>
              </div>

              <Tab.Content animation={false}>
                <Tab.Pane eventKey={AlertDataModal.DATA_EVENT}>{alertData}</Tab.Pane>
                <Tab.Pane eventKey={AlertDataModal.CONTEXT_EVENT}>{alertContextSearch}</Tab.Pane>
                <Tab.Pane eventKey={AlertDataModal.LOCATION_EVENT} unmountOnExit={true}>
                  {mapElement}
                </Tab.Pane>
                <Tab.Pane eventKey={AlertDataModal.IP_ADDRESS_EVENT}>{ipAddressElement}</Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
        </Modal.Body>
      </Modal>
    );
  }
}
