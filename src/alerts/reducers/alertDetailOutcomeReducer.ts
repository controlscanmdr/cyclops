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
import { Reducer, ReducerMap, handleActions } from 'redux-actions';

// Local
import * as actions from '../actions/alertDetailOutcomeActions';

// State shape of the alert detail outcome reducer.
export interface AlertDetailOutcomeState {
  // If the outcome form is shown.
  active: boolean;

  // If the remove outcome warning panel should be shown.
  showRemovePanel: boolean;
}

/**
 * Initial state of the alert detail outcome reducer.
 * @type {State}
 */
export const INITIAL_STATE: AlertDetailOutcomeState = {
  active: false,
  showRemovePanel: false,
};

/**
 * Reducer map for the alert detail outcome reducer.
 * @type {ReducerMap<State, any>}
 */
const reducers: ReducerMap<AlertDetailOutcomeState, any> = {};

/**
 * Updates the alertDetailOutcome based on a(n) OPEN action.
 * @param state Current alertDetailOutcome state.
 * @returns {State} Updated alertDetailOutcome state.
 */
reducers[actions.OPEN_EDIT_PANEL] = (
  state: AlertDetailOutcomeState,
): AlertDetailOutcomeState => {
  const update: Partial<AlertDetailOutcomeState> = {
    active: true,
  };

  return Object.assign({}, state, update);
};

/**
 * Updates the alertDetailOutcome based on a(n) CLOSE action.
 * @param state Current alertDetailOutcome state.
 * @returns {State} Updated alertDetailOutcome state.
 */
reducers[actions.CLOSE_EDIT_PANEL] = (
  state: AlertDetailOutcomeState,
): AlertDetailOutcomeState => {
  return Object.assign({}, state, INITIAL_STATE);
};

/**
 * Updates the alertDetailOutcome based on a(n)  action.
 * @param state Current alertDetailOutcome state.
 * @returns {State} Updated alertDetailOutcome state.
 */
reducers[actions.OPEN_REMOVE_PANEL] = (
  state: AlertDetailOutcomeState,
): AlertDetailOutcomeState => {
  const update: Partial<AlertDetailOutcomeState> = {
    showRemovePanel: true,
  };

  return Object.assign({}, state, update);
};

/**
 * Updates the alertDetailOutcome based on a(n) CLOSE_REMOVE_PANEL action.
 * @param state Current alertDetailOutcome state.
 * @returns {State} Updated alertDetailOutcome state.
 */
reducers[actions.CLOSE_REMOVE_PANEL] = (
  state: AlertDetailOutcomeState,
): AlertDetailOutcomeState => {
  const update: Partial<AlertDetailOutcomeState> = {
    showRemovePanel: false,
  };

  return Object.assign({}, state, update);
};

/**
 * AlertDetailOutcome reducer.
 * @type {Reducer<State, any>}
 */
export const alertDetailOutcome = handleActions<AlertDetailOutcomeState, any>(
  reducers,
  INITIAL_STATE,
);
