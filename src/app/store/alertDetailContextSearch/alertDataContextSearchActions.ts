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
import axios, { Canceler } from 'axios';

// Local
import { createAction } from '../../utils/reduxUtils';
import {
  ReduxAction,
  ThunkActionPromise,
} from '../types';
import { Result } from '../../types/result';
import { ContextSearchParams } from '../../services/contexts/types';
import { getCancelTokenSource } from '../../services/cyphon/utils/cancelTokens';
import { searchContext } from '../../services/contexts/utils/contextAPI';
import { addError } from '../errorModal/errorModalActions';

/**
 * Action type prefix for AlertDataContextSearch actions.
 * @type {string}
 */
const ACTION_PREFIX = 'ALERT_DATA_CONTEXT_SEARCH';

// --------------------------------------------------------------------------
// SELECT_CONTEXT
// --------------------------------------------------------------------------

/**
 * Action Type: When a context related to alert data is selected to
 * view more info on and to potentially be searched through.
 * @type {string}
 */
export const SELECT_CONTEXT = `${ACTION_PREFIX}/SELECT_CONTEXT`;

/** SELECT_CONTEXT payload type. */
export type SelectContextPayload = number;

/** SELECT_CONTEXT action type. */
export type SelectContextAction = ReduxAction<SelectContextPayload>;

/**
 * Creates a SELECT_CONTEXT action.
 * @returns {Action<SelectContextPayload>;
 */
export function selectContext(contextId: number): SelectContextAction {
  return createAction(SELECT_CONTEXT, contextId);
}

// --------------------------------------------------------------------------
// SEARCH_CONTEXT_PENDING
// --------------------------------------------------------------------------

/**
 * Action Type: When a request to search a context has been made.
 * @type {string}
 */
export const SEARCH_CONTEXT_PENDING = `${ACTION_PREFIX}/SEARCH_CONTEXT_PENDING`;

/** SEARCH_CONTEXT_PENDING payload type. */
export type SearchContextPendingPayload = Canceler;

/** SEARCH_CONTEXT_PENDING action type. */
export type SearchContextPendingAction = ReduxAction<SearchContextPendingPayload>;

/**
 * Creates a SEARCH_CONTEXT_PENDING action.
 * @returns {Action<SearchContextPendingPayload>;
 */
export function searchContextPending(
  canceler: Canceler,
): SearchContextPendingAction {
  return createAction(SEARCH_CONTEXT_PENDING, canceler);
}

// --------------------------------------------------------------------------
// SEARCH_CONTEXT_SUCCESS
// --------------------------------------------------------------------------

/**
 * Action Type: When a request to search a context is successful.
 * @type {string}
 */
export const SEARCH_CONTEXT_SUCCESS = `${ACTION_PREFIX}/SEARCH_CONTEXT_SUCCESS`;

/** SEARCH_CONTEXT_SUCCESS payload type. */
export interface SearchContextSuccessPayload {
  page: number;
  pageSize: number;
  resultCount: number;
  results: Result[];
}

/** SEARCH_CONTEXT_SUCCESS action type. */
export type SearchContextSuccessAction = ReduxAction<SearchContextSuccessPayload>;

/**
 * Creates a SEARCH_CONTEXT_SUCCESS action.
 * @returns {Action<SearchContextSuccessPayload>;
 */
export function searchContextSuccess(
  payload: SearchContextSuccessPayload,
): SearchContextSuccessAction {
  return createAction(SEARCH_CONTEXT_SUCCESS, payload);
}

// --------------------------------------------------------------------------
// SEARCH_CONTEXT_FAILURE
// --------------------------------------------------------------------------

/**
 * Action Type: When a request to search a context fails.
 * @type {string}
 */
export const SEARCH_CONTEXT_FAILURE = `${ACTION_PREFIX}/SEARCH_CONTEXT_FAILURE`;

/** SEARCH_CONTEXT_FAILURE payload type. */
export type SearchContextFailurePayload = undefined;

/** SEARCH_CONTEXT_FAILURE action type. */
export type SearchContextFailureAction = ReduxAction<SearchContextFailurePayload>;

/**
 * Creates a SEARCH_CONTEXT_FAILURE action.
 * @returns {Action<SearchContextFailurePayload>;
 */
export function searchContextFailure(): SearchContextFailureAction {
  return createAction(SEARCH_CONTEXT_FAILURE, undefined);
}

// --------------------------------------------------------------------------
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
