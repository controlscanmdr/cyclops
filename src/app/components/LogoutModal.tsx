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
import { getUserFullName } from '../../users/services/getUserFullName';
import { getConfig } from '../services/config';

// Types
// --------------------------------------------------------------------------

interface Props {}

interface State {
  // If the logout modal is open.
  active: boolean;
}

// Component
// --------------------------------------------------------------------------

// Displays a button that opens a logout modal asking if the user wishes.
export class LogoutModal extends React.Component<Props, State> {
  state = { active: false };

  // Opens the logout modal.
  openModal = (): void => {
    this.setState({ active: true });
  };

  // Closes the logout modal.
  closeModal = (): void => {
    this.setState({ active: false });
  };

  render() {
    return (
      <div className="flex-box">
        <div className="flex-box flex-box--align-center flex--shrink text--emphasis header__user">
          {getUserFullName(getConfig().CURRENT_USER)}
        </div>
        <div className="flex-item flex--shrink">
          <a onClick={this.openModal} className="header__link header__logout">
            <i className="fa fa-sign-out" />
          </a>
        </div>
        <Modal show={this.state.active} onHide={this.closeModal} bsSize="small">
          <Modal.Header closeButton={true}>
            <Modal.Title>
              Logout
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to logout?
          </Modal.Body>
          <Modal.Footer>
            <a className="btn btn-default pull-left" onClick={this.closeModal}>Cancel</a>
            <a className="btn btn-danger" href="/logout">Logout</a>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
