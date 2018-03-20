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
import axios, { Canceler } from 'axios';

// Local
import { ThunkActionPromise, Action } from '../../common/types/Redux';
import { Result } from '../../common/types/result';
import { ContextSearchParams } from '../../contexts/types/Context';
import { getCancelTokenSource } from '../../cyphon/services/cancelTokens';
import { searchContext } from '../../contexts/services/contextAPI';
import { addError } from '../../errors/actions/errorModalActions';

// SELECT_CONTEXT
// --------------------------------------------------------------------------

export const SELECT_CONTEXT = 'ALERT_DATA_CONTEXT_SEARCH:SELECT_CONTEXT';
export type SelectContextAction = Action<typeof SELECT_CONTEXT, number>;
export const selectContext = (contextId: number): SelectContextAction => ({
  type: SELECT_CONTEXT,
  payload: contextId,
});

// SEARCH_CONTEXT_PENDING
// --------------------------------------------------------------------------

export const SEARCH_CONTEXT_PENDING = `ALERT_DATA_CONTEXT_SEARCH:SEARCH_CONTEXT_PENDING`;
export type SearchContextPendingAction = Action<typeof SEARCH_CONTEXT_PENDING, Canceler>;
export const searchContextPending = (canceler: Canceler): SearchContextPendingAction => ({
  type: SEARCH_CONTEXT_PENDING,
  payload: canceler,
});

// SEARCH_CONTEXT_SUCCESS
// --------------------------------------------------------------------------

export const SEARCH_CONTEXT_SUCCESS = `ALERT_DATA_CONTEXT_SEARCH:SEARCH_CONTEXT_SUCCESS`;
export interface SearchContextSuccessPayload {
  page: number;
  pageSize: number;
  resultCount: number;
  results: Result[];
}
export type SearchContextSuccessAction = Action<
  typeof SEARCH_CONTEXT_SUCCESS,
  SearchContextSuccessPayload>;
export const searchContextSuccess = (
  payload: SearchContextSuccessPayload,
): SearchContextSuccessAction => ({
  payload,
  type: SEARCH_CONTEXT_SUCCESS,
});

// SEARCH_CONTEXT_FAILURE
// --------------------------------------------------------------------------

export const SEARCH_CONTEXT_FAILURE = `ALERT_DATA_CONTEXT_SEARCH:SEARCH_CONTEXT_FAILURE`;
export type SearchContextFailureAction = Action<typeof SEARCH_CONTEXT_FAILURE, undefined>;
export const searchContextFailure = (): SearchContextFailureAction => ({
  type: SEARCH_CONTEXT_FAILURE,
  payload: undefined,
});

// Thunk Actions
// --------------------------------------------------------------------------

/**
 * Searches a context and dispatches the results, or logs the error.
 * @param searchParams Search parameters of the search.
 * @param contextId ID of the context to search.
 * @returns {ThunkActionPromise}
 */
export function searchAlertDataContext(
  contextId: number,
  searchParams: ContextSearchParams,
): ThunkActionPromise {
  return (dispatch) => {
    const source = getCancelTokenSource();

    dispatch(searchContextPending(source.cancel));

    return searchContext(contextId, searchParams, source.token)
      .then((response) => {
        dispatch(searchContextSuccess({
          page: searchParams.page,
          pageSize: searchParams.page_size,
          resultCount: response.count,
          results: response.results,
        }));
      })
      .catch((error) => {
        if (axios.isCancel(error)) { return; }

        dispatch(searchContextFailure());
        dispatch(addError(error));
      });
  };
}
