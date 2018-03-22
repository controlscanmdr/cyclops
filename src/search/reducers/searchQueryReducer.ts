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
import { SearchQuery } from '../types/Search';
import { createReducer, updateState } from '../../common/services/reduxHelperUtils';
import * as actions from '../actions/searchQueryActions';
import {
  PAGINATE_RESULTS_FAILED,
  PAGINATE_RESULTS_PENDING,
  PAGINATE_RESULTS_SUCCESS,
  PaginateResultsFailedAction,
  PaginateResultsPendingAction,
  PaginateResultsSuccessAction,
} from '../actions/searchResultsActions';
import {
  PAGINATE_ALERT_RESULTS_FAILED,
  PAGINATE_ALERT_RESULTS_PENDING,
  PAGINATE_ALERT_RESULTS_SUCCESS,
  PaginateAlertResultsFailedAction,
  PaginateAlertResultsPendingAction,
  PaginateAlertResultsSuccessAction,
} from '../actions/alertSearchResultsActions';

export interface SearchQueryState {
  query: string;
  queryObject?: SearchQuery;
  after?: string;
  before?: string;
  isLoading: boolean;
  isValid: boolean;
  promiseID: symbol;
  view: actions.SearchQueryView;
}

export const searchQuery = createReducer<SearchQueryState>({
  query: '',
  isLoading: false,
  isValid: true,
  promiseID: Symbol(),
  view: actions.SearchQueryView.Alerts,
}, {
  [actions.FETCH_RESULTS_PENDING]: (
    state: SearchQueryState,
    action: actions.FetchResultsPendingAction,
  ) => updateState(state, {
    isLoading: true,
    after: action.payload.after,
    before: action.payload.before,
    query: action.payload.query,
    promiseID: action.payload.promiseID,
  }),

  [actions.FETCH_RESULTS_SUCCESS]: (
    state: SearchQueryState,
    action: actions.FetchResultsSuccessAction,
  ) => updateState(state, {
    isLoading: false,
    isValid: true,
    queryObject: action.payload.query,
  }),

  [actions.FETCH_RESULTS_FAILED]: (
    state: SearchQueryState,
    action: actions.FetchResultsFailedAction,
  ) => updateState(state, {
    isLoading: false,
    isValid: false,
    queryObject: action.payload,
  }),

  [actions.CHANGE_VIEW]: (
    state: SearchQueryState,
    action: actions.ChangeViewAction,
  ) => updateState(state, {
    view: action.payload,
  }),

  [PAGINATE_RESULTS_PENDING]: (
    state: SearchQueryState,
    action: PaginateResultsPendingAction,
  ) => updateState(state, {
    isLoading: true,
    promiseID: action.payload,
  }),

  [PAGINATE_RESULTS_SUCCESS]: (
    state: SearchQueryState,
    action: PaginateResultsSuccessAction,
  ) => updateState(state, {
    isLoading: false,
  }),

  [PAGINATE_RESULTS_FAILED]: (
    state: SearchQueryState,
    action: PaginateResultsFailedAction,
  ) => updateState(state, {
    isLoading: false,
  }),

  [PAGINATE_ALERT_RESULTS_SUCCESS]: (
    state: SearchQueryState,
    action: PaginateAlertResultsSuccessAction,
  ) => updateState(state, {
    isLoading: false,
  }),

  [PAGINATE_ALERT_RESULTS_FAILED]: (
    state: SearchQueryState,
    action: PaginateAlertResultsFailedAction,
  ) => updateState(state, {
    isLoading: false,
  }),

  [PAGINATE_ALERT_RESULTS_PENDING]: (
    state: SearchQueryState,
    action: PaginateAlertResultsPendingAction,
  ) => updateState(state, {
    isLoading: true,
    promiseID: action.payload,
  }),
});
