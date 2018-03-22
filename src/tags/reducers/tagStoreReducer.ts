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
import * as tagStoreActions from '../actions/tagStoreActions';
import { Tag } from '../types/Tag';

export interface TagStoreState {
  // List of all the current tags.
  tags: Tag[];

  // If the tags are currently being fetched from the REST API.
  isFetching: boolean;
}

export const INITIAL_STATE: TagStoreState = {
  tags: [],
  isFetching: false,
};

type Actions =
  tagStoreActions.FetchTagsAction |
  tagStoreActions.FetchTagsSuccessAction |
  tagStoreActions.FetchTagsFailureAction;

/**
 * Reducer that stores a list of all the current tags.
 * @param {TagStoreState} state
 * @param {Actions} action
 * @returns {TagStoreState}
 */
export function tagStoreReducer(
  state: TagStoreState = INITIAL_STATE,
  action: Actions,
): TagStoreState {
  switch (action.type) {
    case tagStoreActions.FETCH_TAGS:
      return { ...state, isFetching: true };

    case tagStoreActions.FETCH_TAGS_SUCCESS:
      return { ...state, isFetching: false, tags: action.payload };

    case tagStoreActions.FETCH_TAGS_FAILURE:
      return { ...state, isFetching: false };

    default:
      return state;
  }
}
