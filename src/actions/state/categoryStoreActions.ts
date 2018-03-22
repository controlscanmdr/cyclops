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
import { ThunkActionPromise, Action } from '../../common/types/Redux';
import { Category, NormalizedCategoryList } from '../../alerts/types/Alert';
import { normalizeCategories } from '../../alerts/services/categoryUtils';
import { fetchAllCategories as getCategories } from '../../alerts/services/alertsAPI';
import { addError } from '../../errors/actions/errorModalActions';

// FETCH_CATEGORIES_SUCCESS
// --------------------------------------------------------------------------

export const FETCH_CATEGORIES_SUCCESS = 'CATEGORY_STORE/FETCH_CATEGORIES_SUCCESS';
export type FetchCategoriesSuccessAction = Action<
  typeof FETCH_CATEGORIES_SUCCESS,
  NormalizedCategoryList>;
export const fetchCategoriesSuccess = (categories: Category[]): FetchCategoriesSuccessAction => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: normalizeCategories(categories),
});

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
