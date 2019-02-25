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
import * as _ from 'lodash';
import { ListGroup } from 'react-bootstrap';

// Local
import { ResultIPAdresses } from '../../../types/result';
import { AlertDataIpAddressField } from './AlertDataIpAddressField';
import { IP_ADDRESS_LOOKUPS } from '../../AlertList/constants';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertDataIpAddresses component. */
interface Props {
  /** IP Address fields to display. */
  ipAddresses: ResultIPAdresses;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays a list of IpAddressFields and a list of IP address lookup
 * websites.
 */
export class AlertDataIpAddresses extends React.Component<Props, {}> {
  public render(): JSX.Element {
    const ipAddressElements: JSX.Element[] = [];
    const ipAddressLookups: JSX.Element[] = [];

    _.forEach(this.props.ipAddresses, (ipAddress: string, field: string) => {
      ipAddressElements.push((
        <AlertDataIpAddressField field={field} ipAddress={ipAddress}/>
      ));
    });

    _.forEach(IP_ADDRESS_LOOKUPS, (address, name) => {
      ipAddressLookups.push((
        <a
          href={address}
          target="_blank"
          className="list-group-item"
          key={name}
        >
          {name}
        </a>
      ));
    });

    return (
      <div className="flex-box">
        <div className="result-modal__sidebar result-ipaddress__sidebar">
          <ListGroup>
            {ipAddressLookups}
          </ListGroup>
        </div>
        <div className="result-modal__content">
          <table className="result-ipaddress__table">
            <tbody>
              <tr>
                <th>Field</th>
                <th>IP Address</th>
              </tr>
              {ipAddressElements}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
