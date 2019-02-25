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
import {
  Reducer,
  ReducerMap,
  handleActions,
} from 'redux-actions';

// Local
import * as actions from './userStoreActions';
import { NormalizedUserList } from '~/services/users/types';
import { updateNormalizedList } from '~/utils/normalizrUtils';

/** State shape of the userStore. */
export type UserStoreState = NormalizedUserList;

/** Partial state of the UserStore. Used to type check updates to the store. */
type PartialState = Partial<UserStoreState>;

/**
 * Initial state of the userStore.
 * @type {State}
 */
const INITIAL_STATE: UserStoreState = {
  result: [],
  entities: {
    users: {},
  },
};

/**
 * Reducer map for the userStore.
 * @type {ReducerMap<State, any>}
 */
const reducers: ReducerMap<UserStoreState, any> = {};

/**
 * Updates the userStore based on a(n) STORE_USERS action.
 * @param state Current userStore state.
 * @param action STORE_USERS action.
 * @returns {State} Updated userStore state.
 */
reducers[actions.STORE_USERS] = (
  state: UserStoreState,
  action: actions.StoreUsersAction,
): UserStoreState => {
  const update: PartialState = updateNormalizedList(state, action.payload);

  return Object.assign({}, state, update);
};

/**
 * userStore.
 * @type {Reducer<State, any>}
 */
export const userStore = handleActions<UserStoreState, any>(
  reducers,
  INITIAL_STATE,
);
