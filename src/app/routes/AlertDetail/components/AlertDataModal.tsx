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
import {
  Tab,
  Modal,
  Nav,
  NavItem,
} from 'react-bootstrap';

// Local
import { ResultIPAdresses } from '../../../types/result';

import {
  LocationFieldAddress,
  Markers,
} from '../../../services/map/types';
import { AlertDataIpAddresses } from './AlertDataIpAddresses';
import { AlertDataLocationMap } from './AlertDataLocationMap';
import { AlertData } from './AlertData';
import { Close } from '../../../components/Close';
import { AlertDetail } from '../../../services/alerts/types';
import { AlertDataContextSearchContainer } from './AlertDataContextSearch';
import { normalizeContexts } from '../../../services/contexts/utils/contextNormalizr';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertDataModal component. */
interface Props {
  /** Alert with data to view. */
  alert: AlertDetail;
  /** If the modal is active. */
  active: boolean;
  /** Locations associated with the alert. */
  locations: LocationFieldAddress[] | null;
  /** IP address fields from the alert data. */
  ipAddresses: ResultIPAdresses | null;
  /** GeoJSON markers generated from the alert data. */
  markers: Markers | null;
  /** Close the AlertDataModal. */
  onClose(): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays options to analyze alerts data.
 */
export class AlertDataModal extends React.Component<Props, {}> {
  /**
   * Event keys for the tabs in the result modal.
   * @type {{data: string, context: string, locations: string, ipaddresses: string}}
   */
  public static EVENT_KEYS = {
    data: 'data',
    context: 'contexts',
    locations: 'locations',
    ipaddresses: 'ipaddresses',
  };

  /**
   * Close the modal when it unmounts and moves to a different route.
   */
  public componentWillUnmount() {
    this.props.onClose();
  }

  public closeModalButton = (): void => {
    this.props.onClose();
  };

  public render() {
    const {
      alert,
      ipAddresses,
      active,
      markers,
    } = this.props;
    const { closeModalButton } = this;
    const ipAddressElement = ipAddresses ?
      <AlertDataIpAddresses ipAddresses={ipAddresses} /> : null;
    const mapElement = markers ?
      <AlertDataLocationMap markers={markers} /> : null;
    const contexts = alert.distillery ? alert.distillery.contexts : null;
    const alertData = alert.distillery
      ? (
        <AlertData
          result={alert.data}
          distillery={alert.distillery}
        />
      ) : <h2>Alert missing distillery</h2>;
    const alertContextSearch = alert.distillery
      ? (
        <AlertDataContextSearchContainer
          resultId={alert.doc_id}
          contexts={normalizeContexts(alert.distillery.contexts)}
        />
      ) : <h2>Alert missing distillery</h2>;

    return (
      <Modal show={active} bsSize="lg" onHide={closeModalButton}>
        <Modal.Body className="result-modal__body">
          <Tab.Container
            id="result-modal-tab-container"
            defaultActiveKey="data"
          >
            <div>
              <div className="flex-box flex-box--align-center result-modal__header">
                <div className="flex-item">
                  <Nav bsStyle="pills" className="result-nav">
                    <NavItem eventKey={AlertDataModal.EVENT_KEYS.data}>Data</NavItem>
                    <NavItem
                      eventKey={AlertDataModal.EVENT_KEYS.context}
                      disabled={contexts ? !contexts.length : true}
                    >
                      Related Data
                    </NavItem>
                    <NavItem
                      eventKey={AlertDataModal.EVENT_KEYS.locations}
                      disabled={!markers}
                    >
                      Locations
                    </NavItem>
                    <NavItem
                      eventKey={AlertDataModal.EVENT_KEYS.ipaddresses}
                      disabled={!ipAddresses}
                    >
                      IP Addresses
                    </NavItem>
                  </Nav>
                </div>
                <div className="flex-item flex--shrink">
                  <Close close={closeModalButton}/>
                </div>
              </div>

              <Tab.Content animation={false}>
                <Tab.Pane eventKey={AlertDataModal.EVENT_KEYS.data}>
                  {alertData}
                </Tab.Pane>

                <Tab.Pane eventKey={AlertDataModal.EVENT_KEYS.context}>
                  {alertContextSearch}
                </Tab.Pane>

                <Tab.Pane
                  eventKey={AlertDataModal.EVENT_KEYS.locations}
                  unmountOnExit={true}
                >
                  {mapElement}
                </Tab.Pane>

                <Tab.Pane eventKey={AlertDataModal.EVENT_KEYS.ipaddresses}>
                  {ipAddressElement}
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
        </Modal.Body>
      </Modal>
    );
  }
}
