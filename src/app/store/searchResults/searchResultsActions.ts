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
import { searchDistillery } from '~/services/search/utils/searchAPI';
import { StoreState } from '~/store';
import { addError } from '../errorModal';
import { TimeQuery } from '~/routes/Search/types';

const ACTION_PREFIX = 'SEARCH_RESULTS';

function isValidPromise(promiseID: symbol, state: StoreState): boolean {
  // TODO: Change to correct state variable once connected to store.
  return state.searchQuery.promiseID === promiseID;
}

function resultsExist(distilleryID: number, state: StoreState): boolean {
  // TODO: Change to correct state variable once connected to store.
  return !!state.searchResults.results;
}

// -- SELECT_DISTILLERY --
// User selects the list of distillery results to view.

export const SELECT_DISTILLERY = `${ACTION_PREFIX}/SELECT_DISTILLERY`;
export type SelectDistilleryAction = ReduxAction<number>;
export function selectDistillery(distilleryID: number): SelectDistilleryAction {
  return { type: SELECT_DISTILLERY, payload: distilleryID };
}

// -- PAGINATE_RESULTS_PENDING --
// Request for another page of results is made.

export const PAGINATE_RESULTS_PENDING = `${ACTION_PREFIX}/PAGINATE_RESULTS_PENDING`;
export type PaginateResultsPendingAction = ReduxAction<symbol>;
export function paginateResultsPending(
  promiseID: symbol,
): PaginateResultsPendingAction {
  return { type: PAGINATE_RESULTS_PENDING, payload: promiseID };
}

// -- PAGINATE_RESULTS_SUCCESS --
// Request for another page of results is successful.

export const PAGINATE_RESULTS_SUCCESS = `${ACTION_PREFIX}/PAGINATE_RESULTS_SUCCESS`;
export type PaginateResultsSuccessAction = ReduxAction<{
  distilleryID: number;
  page: number;
  results: any[];
}>;
export function paginateResultsSuccess(
  distilleryID: number,
  page: number,
  results: any[],
): PaginateResultsSuccessAction {
  return {
    type: PAGINATE_RESULTS_SUCCESS,
    payload: { page, results, distilleryID },
  };
}

// -- PAGINATE_RESULTS_FAILED --
// Request for another page of results failed

export const PAGINATE_RESULTS_FAILED = `${ACTION_PREFIX}/PAGINATE_RESULTS_FAILED`;
export type PaginateResultsFailedAction = ReduxAction<undefined>;
export function paginateResultsFailed(): PaginateResultsFailedAction {
  return { type: PAGINATE_RESULTS_FAILED, payload: undefined };
}

export function paginateResults(
  distilleryID: number,
  query: string,
  page: number,
  after?: string,
  before?: string,
): ThunkActionPromise {
  return (dispatch, getState) => {
    // TODO: Add rejected reason string.
    if (!resultsExist(distilleryID, getState())) { return Promise.reject(''); }

    const promiseID = Symbol();

    dispatch(paginateResultsPending(promiseID));

    return searchDistillery(distilleryID, query, page, undefined, after, before)
      .then((response) => {
        if (!isValidPromise(promiseID, getState())) { return; }
        if (!resultsExist(distilleryID, getState())) { return; }

        dispatch(paginateResultsSuccess(distilleryID, page, response.results.results));
      })
      .catch((error) => {
        dispatch(addError(error));

        if (isValidPromise(promiseID, getState())) {
          dispatch(paginateResultsFailed());
        }
      });
  };
}
