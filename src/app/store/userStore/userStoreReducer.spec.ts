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
import * as chai from 'chai';

// Local
import * as actions from './userStoreActions';
import * as test from './userStoreReducer';
import { normalizeUsers } from '~/services/users/utils/normalizeUsers';

describe('userStore', () => {
  const user1: any = { id: 1, name: 'George' };
  const user2: any = { id: 2, name: 'Bob' };
  const initial = {
    result: [],
    entities: {
      users: {},
    },
  };

  it('should update the user list with a list of users', () => {
    const users = normalizeUsers([user1, user2]);
    const action = actions.storeUsers(users);
    const state = test.userStore(initial, action);

    chai.expect(state).to.deep.equal({
      result: [1, 2],
      entities: {
        users: {
          1: user1,
          2: user2,
        },
      },
    });
  });
});
