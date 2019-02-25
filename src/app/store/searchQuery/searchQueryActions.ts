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
import {
  ReduxAction,
  ThunkActionPromise,
} from '~/store/types';
import { StoreState } from '~/store';
import { search } from '~/services/search/utils/searchAPI';
import {
  CombinedSearchResults,
  SearchEndpoint,
  SearchQuery,
} from '~/services/search/types';
import { addError } from '~/store/errorModal';
import { TimeQuery } from '~/routes/Search/types';

/**
 * Determines if a promise is still valid based on the given promiseID.
 * @param {symbol} promiseID
 * @param {StoreState} state
 * @returns {boolean}
 */
function isValidPromise(promiseID: symbol, state: StoreState): boolean {
  return state.searchQuery.promiseID === promiseID;
}

const ACTION_PREFIX = 'SEARCH_QUERY';

export enum SearchQueryView {
  Alerts,
  Data,
}

// -- FETCH_RESULTS_PENDING --
// Request for alerts and data matching a search query was successful.

export const FETCH_RESULTS_PENDING = `${ACTION_PREFIX}/FETCH_RESULTS_PENDING`;
export type FetchResultsPendingAction = ReduxAction<{
  query: string;
  after?: string;
  before?: string;
  promiseID: symbol;
}>;
export function fetchResultsPending(
  query: string,
  promiseID: symbol,
  after?: string,
  before?: string,
): FetchResultsPendingAction {
  return {
    type: FETCH_RESULTS_PENDING,
    payload: { query, promiseID, after, before },
  };
}

// -- FETCH_RESULTS_SUCCESS --
// Request for alerts and data matching a search query was successful.

export const FETCH_RESULTS_SUCCESS = `${ACTION_PREFIX}/FETCH_RESULTS_SUCCESS`;
export type FetchResultsSuccessAction = (
  ReduxAction<SearchEndpoint<CombinedSearchResults>>
);
export function fetchResultsSuccess(
  results: SearchEndpoint<CombinedSearchResults>,
): FetchResultsSuccessAction {
  return { type: FETCH_RESULTS_SUCCESS, payload: results };
}

// -- FETCH_RESULTS_FAILED --
// Request for alerts and data matching a search query has failed.

export const FETCH_RESULTS_FAILED = `${ACTION_PREFIX}/FETCH_RESULTS_FAILED`;
export type FetchResultsFailedAction = ReduxAction<SearchQuery>;
export function fetchResultsFailed(
  query: SearchQuery,
): FetchResultsFailedAction {
  return { type: FETCH_RESULTS_FAILED, payload: query };
}

// -- CHANGE_VIEW --
// User requests for the data view to change.

export const CHANGE_VIEW = `${ACTION_PREFIX}/CHANGE_VIEW`;
export type ChangeViewAction = ReduxAction<SearchQueryView>;
export function changeView(view: SearchQueryView): ChangeViewAction {
  return { type: CHANGE_VIEW, payload: view };
}

/**
 * Retrieves alerts and data matching the search query.
 * @param {string} query
 * @param after Time to search for results after.
 * @param before Time to search for results before.
 * @returns {ThunkActionPromise}
 */
export function fetchResults(
  query: string,
  after?: string,
  before?: string,
): ThunkActionPromise {
  return (dispatch, getState) => {
    const promiseID = Symbol();

    dispatch(fetchResultsPending(query, promiseID, after, before));

    return search(query, undefined, undefined, after, before)
      .then((results) => {
        if (!isValidPromise(promiseID, getState())) { return; }

        dispatch(fetchResultsSuccess(results));
      })
      .catch((error) => {
        if (
          isValidPromise(promiseID, getState()) &&
          error.response.status === 400 &&
          error.response.data.query
        ) {
          dispatch(fetchResultsFailed(error.response.data.query));
        } else {
          dispatch(addError(error));
        }
      });
  };
}
