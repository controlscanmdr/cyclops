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
import { Canceler } from 'axios';
import {
  ReducerMap,
  handleActions,
} from 'redux-actions';
import * as _ from 'lodash';

// Local
import { Result } from '~/types/result';
import * as actions from './alertDataContextSearchActions';
import {
  CLOSE_DATA_MODAL,
  CloseDataModalAction,
} from '../alertDetail/alertDetailActions';
import * as requests from '~/services/cyphon/utils/requests';

/**
 * State shape of the ContextSearch reducer.
 */
export interface AlertDataContextSearchState {
  /** If the results for a search are currently loading. */
  loading: boolean;
  /** Current page number of the context search results. */
  page: number | null;
  /** Number of results per page. */
  pageSize: number;
  /** Total number of results from a search. */
  resultCount: number | null;
  /** Current list of viewable results. */
  results: Result[];
  /** ID of the currently selected context to search through. */
  selectedContext: number | null;
}

/**
 * Initial state of the AlertDataContextSearch reducer.
 * @type {State}
 */
export const INITIAL_STATE: AlertDataContextSearchState = {
  loading: false,
  page: null,
  pageSize: 25,
  resultCount: null,
  results: [],
  selectedContext: null,
};

/**
 * Object that will contain a map of reducer functions that handle actions
 * modifying the AlertDataContextSearch reducer state.
 * @type {ReducerMap<State, any>}
 */
const reducers: ReducerMap<AlertDataContextSearchState, any> = {};

/**
 * Unique identifier for context search requests.
 * @type {string}
 */
export const REQUEST_ID = 'ALERT_DATA_CONTEXT_SEARCH';

/**
 * Updates the ContextSearch reducer based on a(n) SELECT_CONTEXT action.
 * @param state Current ContextSearch reducer state.
 * @param action SELECT_CONTEXT action.
 * @returns {State} Updated ContextSearch reducer state.
 */
reducers[actions.SELECT_CONTEXT] = (
  state: AlertDataContextSearchState,
  action: actions.SelectContextAction,
): AlertDataContextSearchState => {
  const update: Partial<AlertDataContextSearchState> = {
    selectedContext: action.payload,
  };

  return _.assign({}, state, update);
};

/**
 * Updates the ContextSearch reducer based on a(n)
 * SEARCH_CONTEXT_PENDING action.
 * @param state Current ContextSearch reducer state.
 * @param action SEARCH_CONTEXT_PENDING action.
 * @returns {State} Updated ContextSearch reducer state.
 */
reducers[actions.SEARCH_CONTEXT_PENDING] = (
  state: AlertDataContextSearchState,
  action: actions.SearchContextPendingAction,
): AlertDataContextSearchState => {
  const update: Partial<AlertDataContextSearchState> = { loading: true };

  requests.cancel(REQUEST_ID);
  requests.set(REQUEST_ID, action.payload);

  return _.assign({}, state, update);
};

/**
 * Updates the ContextSearch reducer based on a(n)
 * SEARCH_CONTEXT_SUCCESS action.
 * @param state Current ContextSearch reducer state.
 * @param action SEARCH_CONTEXT_SUCCESS action.
 * @returns {State} Updated ContextSearch reducer state.
 */
reducers[actions.SEARCH_CONTEXT_SUCCESS] = (
  state: AlertDataContextSearchState,
  action: actions.SearchContextSuccessAction,
): AlertDataContextSearchState => {
  const update: Partial<AlertDataContextSearchState> = {
    loading: false,
    page: action.payload.page,
    pageSize: action.payload.pageSize,
    resultCount: action.payload.resultCount,
    results: action.payload.results,
  };

  return _.assign({}, state, update);
};

/**
 * Updates the ContextSearch reducer based on a(n)
 * SEARCH_CONTEXT_FAILURE action.
 * @param state Current ContextSearch reducer state.
 * @param action SEARCH_CONTEXT_FAILURE action.
 * @returns {State} Updated ContextSearch reducer state.
 */
reducers[actions.SEARCH_CONTEXT_FAILURE] = (
  state: AlertDataContextSearchState,
  action: actions.SearchContextFailureAction,
): AlertDataContextSearchState => {
  const update: Partial<AlertDataContextSearchState> = { loading: false };

  return _.assign({}, state, update);
};

/**
 * Updates the ContextSearch reducer based on a(n) CLOSE_DATA_MODAL action.
 * @param state Current ContextSearch reducer state.
 * @param action CLOSE_DATA_MODAL action.
 * @returns {State} Updated ContextSearch reducer state.
 */
reducers[CLOSE_DATA_MODAL] = (
  state: AlertDataContextSearchState,
  action: CloseDataModalAction,
): AlertDataContextSearchState => {
  requests.cancel(REQUEST_ID);

  return _.assign({}, state, INITIAL_STATE);
};

/**
 * ContextSearch reducer.
 * @type {Reducer<State, any>}
 */
export const alertDataContextSearch = handleActions<
  AlertDataContextSearchState,
  any
>(
  reducers,
  INITIAL_STATE,
);
