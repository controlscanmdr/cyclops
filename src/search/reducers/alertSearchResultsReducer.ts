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
import { createReducer, updateState } from '../../common/services/reduxHelperUtils';
import { AlertDetail } from '../../alerts/types/Alert';
import * as actions from '../actions/alertSearchResultsActions';
import { FETCH_RESULTS_SUCCESS, FetchResultsSuccessAction } from '../actions/searchQueryActions';

export interface AlertSearchResultsState {
  results: AlertDetail[];
  count: number;
  page: number;
  isLoading: boolean;
}

export const alertSearchResults = createReducer<AlertSearchResultsState>({
  results: [],
  count: 0,
  page: 1,
  isLoading: false,
}, {
  [FETCH_RESULTS_SUCCESS]: (
    state: AlertSearchResultsState,
    action: FetchResultsSuccessAction,
  ) => updateState(state, {
    results: action.payload.results.alerts.results,
    count: action.payload.results.alerts.count,
    page: 1,
  }),

  [actions.PAGINATE_ALERT_RESULTS_PENDING]: (
    state: AlertSearchResultsState,
  ) => updateState(state, {
    isLoading: true,
  }),

  [actions.PAGINATE_ALERT_RESULTS_SUCCESS]: (
    state: AlertSearchResultsState,
    action: actions.PaginateAlertResultsSuccessAction,
  ) => updateState(state, {
    isLoading: false,
    results: action.payload.results,
    count: action.payload.count,
    page: action.payload.page,
  }),

  [actions.PAGINATE_ALERT_RESULTS_FAILED]: (
    state: AlertSearchResultsState,
  ) => updateState(state, {
    isLoading: false,
  }),
});
