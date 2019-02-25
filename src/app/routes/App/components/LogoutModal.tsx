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
import { Modal, NavDropdown, MenuItem } from 'react-bootstrap';

// Local
import { getUserFullName } from '~/services/users/utils/getUserFullName';
import { getConfig } from '~/config';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Internal state of the LogoutModal component. */
interface State {
  /** If the logout modal is open. */
  active: boolean;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays a button that opens a logout modal asking if the user wishes
 * to logout.
 */
export class LogoutModal extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = { active: false };
  }

  /**
   * Opens the logout modal.
   */
  public openModal = (): void => {
    this.setState({ active: true });
  };

  /**
   * Closes the logout modal.
   */
  public closeModal = (): void => {
    this.setState({ active: false });
  };

  /**
   * Renders the component.
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
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
        <Modal
          show={this.state.active}
          onHide={this.closeModal}
          bsSize="small"
        >
          <Modal.Header closeButton={true}>
            <Modal.Title>
              Logout
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to logout?
          </Modal.Body>
          <Modal.Footer>
            <a
              className="btn btn-default pull-left"
              onClick={this.closeModal}
            >
              Cancel
            </a>
            <a className="btn btn-danger" href="/logout">Logout</a>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
