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

// Local
import { User } from '../../users/types/User';
import { getUserFullName } from '../../users/services/getUserFullName';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Current list of all users.
  users: User[];

  // Currently selected user.
  currentUser?: number;

  /**
   * Selects a new user to filter alerts with..
   * @param user ID of the user to filter alerts with.
   */
  selectUser(user?: number): any;
}

// Component
// --------------------------------------------------------------------------

/**
 * Displays a select element that allows the user to select a new user
 * to filter alerts by.
 */
export class AlertParamsUserSelect extends React.Component<Props, {}> {
  /**
   * Handle the event emitted whenever the select value changes by
   * running the passed in selectUser function.
   * @param event
   */
  handleSelect = (event: React.FormEvent<HTMLSelectElement>): void => {
    const value = parseInt(event.currentTarget.value, 10);
    const user = (value === 0) ? undefined : value;

    this.props.selectUser(user);
  };

  render(): JSX.Element {
    const userOptions = this.props.users.map(user => (
      <option value={user.id} key={user.id}>
        {getUserFullName(user)}
      </option>
    ));

    return (
      <div className="alert-list-params__spacer alert-list-params__group">
        <h3 className="sub-title">Assigned</h3>
        <div className="form-group">
          <select
            className="form-control"
            value={this.props.currentUser}
            onChange={this.handleSelect}
          >
            <option value={0}>All</option>
            {userOptions}
          </select>
        </div>
      </div>
    );
  }
}
