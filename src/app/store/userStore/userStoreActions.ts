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

// Local
import { createAction } from '~/utils/reduxUtils';
import {
  ReduxAction,
  ThunkActionPromise,
  ThunkActionVoid,
} from '~/store/types';
import { NormalizedUserList } from '~/services/users/types';
import { fetchAllUsers as getAllUsers } from '~/services/users/api';
import { normalizeUsers } from '~/services/users/utils/normalizeUsers';
import { addError } from '~/store/errorModal/errorModalActions';

/**
 * Action type prefix for UserCache actions.
 * @type {string}
 */
const ACTION_PREFIX = 'USER_STORE';

// --------------------------------------------------------------------------
// STORE_USERS
// --------------------------------------------------------------------------

/**
 * Action Type: When the front end needs to cache a list of users.
 * @type {string}
 */
export const STORE_USERS = `${ACTION_PREFIX}/STORE_USERS`;

/** STORE_USERS payload type. */
export type StoreUsersPayload = NormalizedUserList;

/** STORE_USERS action type. */
export type StoreUsersAction = ReduxAction<StoreUsersPayload>;

/**
 * Creates a STORE_USERS action.
 * @returns {StoreUsersAction}
 */
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
