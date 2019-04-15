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
import { createAction } from '~/utils/reduxUtils';
import {
  ReduxAction,
  ThunkActionPromise,
  ThunkActionVoid,
} from '~/store/types';
import {
  Category,
  NormalizedCategoryList,
} from '~/services/alerts/types';
import { normalizeCategories } from '~/services/alerts/utils/categoryUtils';
import { fetchAllCategories as getCategories } from '../../services/alerts/utils/alertsAPI';
import { addError } from '~/store/errorModal/errorModalActions';

/**
 * Action type prefix for Alert actions.
 * @type {string}
 */
const ACTION_PREFIX = 'ALERT';

// --------------------------------------------------------------------------
// FETCH_CATEGORIES_SUCCESS
// --------------------------------------------------------------------------

/**
 * Redux Action Type: When a request to retrieve all the alert categories
 * is successful.
 * @type {string}
 */
export const FETCH_CATEGORIES_SUCCESS = `${ACTION_PREFIX}/FETCH_CATEGORIES_SUCCESS`;

/** FETCH_CATEGORIES_SUCCESS payload type. */
export type FetchCategoriesSuccessPayload = NormalizedCategoryList;

/** FETCH_CATEGORIES_SUCCESS action type. */
export type FetchCategoriesSuccessAction = ReduxAction<FetchCategoriesSuccessPayload>;

/**
 * Creates a(n) FETCH_CATEGORIES_SUCCESS action.
 * @returns {FetchCategoriesSuccessAction}
 */
export function fetchCategoriesSuccess(
  categories: Category[],
): FetchCategoriesSuccessAction {
  return createAction(
    FETCH_CATEGORIES_SUCCESS,
    normalizeCategories(categories),
  );
}

// --------------------------------------------------------------------------
// Thunk Actions
// --------------------------------------------------------------------------

/**
 * Fetches a list of all the current categories.
 * @returns {ThunkActionPromise}
 */
export function fetchAllCategories(): ThunkActionPromise {
  return (dispatch) => {
    return getCategories()
      .then((categories) => {
        dispatch(fetchCategoriesSuccess(categories));
      })
      .catch((error) => {
        dispatch(addError(error));
      });
  };
}
