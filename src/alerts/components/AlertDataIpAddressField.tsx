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
import * as copy from 'copy-to-clipboard';
import { Popover, OverlayTrigger } from 'react-bootstrap';

// Local
import { createRandomId } from '../../common/services/stringUtils';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Field in the alert data that contains the ip address.
  field: string;

  // The IP address value.
  ipAddress: string;
}

// Component
// --------------------------------------------------------------------------

// Table row that displays the field and address of an IpAddressField.
export class AlertDataIpAddressField extends React.Component<Props, {}> {
  /**
   * Popover that displays whenever the ipAddress is copied to the clipboard.
   * @type {JSX.Element}
   */
  copiedPopover: JSX.Element = (
    <Popover id={createRandomId()}>Copied</Popover>
  );

  // Copies the address to the users clipboard.
  copyAddress = () => {
    copy(this.props.ipAddress);
  };

  render(): JSX.Element {
    return (
      <tr key={this.props.field}>
        <td>{this.props.field}</td>
        <td>
          <OverlayTrigger
            trigger="click"
            placement="right"
            rootClose={true}
            overlay={this.copiedPopover}
          >
            <button className="btn btn-default" onClick={this.copyAddress}>
              {this.props.ipAddress}
            </button>
          </OverlayTrigger>
        </td>
      </tr>
    );
  }
}
