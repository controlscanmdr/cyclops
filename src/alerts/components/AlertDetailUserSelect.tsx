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
import * as _ from 'lodash';

// Local
import { SubtleSelect, SelectOption } from '../../common/components/SubtleSelect';
import { User } from '../../users/types/User';
import { getUserFullName } from '../../users/services/getUserFullName';
import { currentUserIsStaff } from '../../users/services/currentUserIsStaff';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Alert to select a new user for.
  currentUser: User | null;

  // List of users to pick from.
  users: User[];

  // Picks the new user.
  selectUser(user: User | null): any;
}

// Component
// --------------------------------------------------------------------------

// Selects a new assigned user for an alerts.
export class AlertDetailUserSelect extends React.Component<Props, {}> {
  /**
   * Option that unassigns the alert from anyone.
   * @type {SelectOption}
   */
  static UNASSIGN_OPTION: SelectOption = {
    name: 'None',
    value: 0,
  };

  /**
   * Handles selecting a new user for an alert.
   * @param userId
   */
  handleSelect = (userId: string): void => {
    const parsedUserId = parseInt(userId, 10);

    if (parsedUserId > 0) {
      const user = _.find(this.props.users, { id: parsedUserId });
      if (user) { this.props.selectUser(user); }
    }
    else { this.props.selectUser(null); }
  };

  render(): JSX.Element {
    const currentUserName = this.props.currentUser
      ? getUserFullName(this.props.currentUser)
      : 'None';
    const userInfo = <span>{currentUserName}</span>;

    // Hide user select if the current user isn't staff
    if (!currentUserIsStaff()) { return userInfo; }

    const currentUserId = this.props.currentUser
      ? this.props.currentUser.id
      : 0;
    const userOptions = this.props.users.map(user => ({
      name: getUserFullName(user),
      value: user.id,
    }));
    const options = [AlertDetailUserSelect.UNASSIGN_OPTION].concat(userOptions);

    return (
      <SubtleSelect
        options={options}
        currentValue={currentUserId}
        onSelect={this.handleSelect}
      >
        <span>
          {currentUserName}
        </span>
        {' '}
        <i className="caret" />
      </SubtleSelect>
    );
  }
}
