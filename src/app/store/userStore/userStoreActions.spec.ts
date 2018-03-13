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
import * as sinon from 'sinon';

// Local
import * as actions from './userStoreActions';
import * as userAPI from '../../services/users/api';

describe('UserStoreActions', () => {
  const user1: any = { id: 1 };
  const user2: any = { id: 2 };
  const users: any[] = [user1, user2];
  const normalized: any = {
    result: [user1.id, user2.id],
    entities: {
      users: {
        [user1.id]: user1,
        [user2.id]: user2,
      },
    },
  };

  describe('#storeUsers', () => {
    it('should return an action with the correct payload', () => {
      expect(actions.storeUsers(normalized)).toEqual({
        type: actions.STORE_USERS,
        payload: normalized,
        error: undefined,
      });
    });
  });

  describe('#fetchAllUsers', () => {
    let getAllUsers: sinon.SinonStub;
    let dispatch: sinon.SinonSpy;
    let getState: sinon.SinonSpy;
    let fetchAllUsers: () => Promise<void>;

    beforeEach(() => {
      dispatch = sinon.spy();
      getState = sinon.spy();
      getAllUsers = sinon.stub(userAPI, 'fetchAllUsers');
      fetchAllUsers = () => actions
        .fetchAllUsers()(dispatch, getState, undefined);

      getAllUsers.resolves(users);
    });

    afterEach(() => {
      getAllUsers.restore();
    });

    it('should call getAllUsers', () => {
      return fetchAllUsers().then(() => {
        expect(getAllUsers.called).toBe(true);
      });
    });

    it('should dispatch a STORE_USERS action on a successful call', () => {
      getAllUsers.resolves(users);

      return fetchAllUsers().then(() => {
        expect(dispatch.called).toBe(true);
        expect(dispatch.args[0][0]).toEqual({
          type: actions.STORE_USERS,
          payload: normalized,
          error: undefined,
        });
      });
    });
  });
});
