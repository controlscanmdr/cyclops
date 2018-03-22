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

// Local
import { createAction } from '../../common/services/reduxUtils';
import { ReduxAction, ThunkActionPromise } from '../../common/types/Redux';
import { NormalizedUserList } from '../types/User';
import { fetchAllUsers as getAllUsers } from '../services/userApi';
import { normalizeUsers } from '../services/normalizeUsers';
import { addError } from '../../errors/actions/errorModalActions';

/**
 * Action type prefix for UserCache actions.
 * @type {string}
 */
const ACTION_PREFIX = 'USER_STORE';

// STORE_USERS
// --------------------------------------------------------------------------

export const STORE_USERS = `${ACTION_PREFIX}/STORE_USERS`;
export type StoreUsersPayload = NormalizedUserList;
export type StoreUsersAction = ReduxAction<StoreUsersPayload>;
export function storeUsers(users: NormalizedUserList): StoreUsersAction {
  return createAction(STORE_USERS, users);
}

// --------------------------------------------------------------------------
// Thunk Actions
// --------------------------------------------------------------------------

/**
 * Gets a list of all current users and stores them on the frontend.
 * @returns {ThunkActionPromise}
 */
export function fetchAllUsers(): ThunkActionPromise {
  return (dispatch) => {
    return getAllUsers()
      .then((users) => {
        dispatch(storeUsers(normalizeUsers(users)));
      })
      .catch((error) => {
        dispatch(addError(error));
      });
  };
}
