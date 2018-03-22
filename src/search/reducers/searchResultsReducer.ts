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
import * as _ from 'lodash';

// Local
import { createReducer, updateState } from '../../common/services/reduxHelperUtils';
import * as actions from '../actions/searchResultsActions';
import { DistillerySearchResults } from '../types/Search';
import {
  FETCH_RESULTS_SUCCESS,
  FetchResultsSuccessAction,
} from '../actions/searchQueryActions';
import { Dictionary } from '../../common/types/object';

export interface SearchResultsState {
  results?: Dictionary<DistillerySearchResults>;
  selectedDistilleryID: number;
  count: number;
  pages: Dictionary<number>;
  isLoading: boolean;
}

export const searchResults = createReducer<SearchResultsState>({
  selectedDistilleryID: 0,
  pages: {},
  count: 0,
  isLoading: false,
}, {
  [FETCH_RESULTS_SUCCESS]: (
    state: SearchResultsState,
    action: FetchResultsSuccessAction,
  ) => {
    const results = action.payload.results.distilleries.results;

    if (!results.length) {
      return updateState(state, {
        results: {},
        selectedDistilleryID: 0,
        pages: {},
        count: 0,
      });
    }

    const resultsByID = _.keyBy(results, 'distillery.id');
    const pages: Dictionary<number> = {};

    results.forEach((result) => {
      pages[result.distillery.id] = 1;
    });

    return updateState(state, {
      results: resultsByID,
      selectedDistilleryID: 0,
      pages,
      count: action.payload.results.distilleries.count,
    });
  },

  [actions.SELECT_DISTILLERY]: (
    state: SearchResultsState,
    action: actions.SelectDistilleryAction,
  ) => updateState(state, {
    selectedDistilleryID: action.payload,
  }),

  [actions.PAGINATE_RESULTS_PENDING]: (
    state: SearchResultsState,
    action: actions.PaginateResultsPendingAction,
  ) => updateState(state, {
    isLoading: true,
  }),

  [actions.PAGINATE_RESULTS_SUCCESS]: (
    state: SearchResultsState,
    action: actions.PaginateResultsSuccessAction,
  ) => {
    if (!state.results) { return state; }

    const distilleryResults = state.results[action.payload.distilleryID];

    if (!distilleryResults) { return state; }

    return updateState(state, {
      results: {
        ...state.results,
        [action.payload.distilleryID]: {
          ...distilleryResults,
          results: action.payload.results,
        },
      },
      pages: {
        ...state.pages,
        [action.payload.distilleryID]: action.payload.page,
      },
    });
  },

  [actions.PAGINATE_RESULTS_FAILED]: (
    state: SearchResultsState,
    action: actions.PaginateResultsFailedAction,
  ) => updateState(state, {
    isLoading: false,
  }),
});
