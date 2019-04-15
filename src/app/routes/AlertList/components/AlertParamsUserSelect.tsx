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
import { User } from '../../../services/users/types';
import { getUserFullName } from '~/services/users/utils/getUserFullName';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/**
 * Properties of the AlertParamsUserSelect component.
 */
interface Props {
  /** Current list of all users. */
  users: User[];
  /** Currently selected user. */
  currentUser: number | undefined;
  /**
   * Selects a new user to filter alerts with..
   * @param user ID of the user to filter alerts with.
   */
  selectUser(user?: number): any;
}

// --------------------------------------------------------------------------
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
  public handleSelect = (event: React.FormEvent<HTMLSelectElement>): void => {
    const value = parseInt(event.currentTarget.value, 10);
    const user = (value === 0) ? undefined : value;

    this.props.selectUser(user);
  };

  public render(): JSX.Element {
    const { currentUser, users } = this.props;
    const { handleSelect } = this;
    const userOptions = users.map((user) => (
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
            value={currentUser}
            onChange={handleSelect}
          >
            <option value={0}>All</option>
            {userOptions}
          </select>
        </div>
      </div>
    );
  }
}
