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
import * as tagModalActions from '../actions/tagModalActions';
import { TagDetail } from '../types/Tag';
import { TagModalView } from '../types/TagModalView';

export interface TagModalState {
  tagDetailId?: number;
  tagDetail?: TagDetail;
  tagDetailIsLoading: boolean;
  tagDetailError: boolean;
  modalIsActive: boolean;
  modalView: TagModalView;
}

export const INITIAL_STATE: TagModalState = {
  tagDetailIsLoading: false,
  tagDetailError: false,
  modalIsActive: false,
  modalView: TagModalView.Detail,
};

type Actions =
  tagModalActions.OpenTagDetailAction |
  tagModalActions.OpenTagListAction |
  tagModalActions.OpenTagCreateAction |
  tagModalActions.SwitchViewAction |
  tagModalActions.FetchTagDetailAction |
  tagModalActions.FetchTagDetailSuccessAction |
  tagModalActions.FetchTagDetailFailureAction |
  tagModalActions.CloseModalAction;

/**
 * Reducer that contains data on tags displayed in the tag modal.
 * @param {TagModalState} state
 * @param {Actions} action
 * @returns {TagModalState}
 */
export function tagModalReducer(
  state: TagModalState = INITIAL_STATE,
  action: Actions,
): TagModalState {
  switch (action.type) {
    case tagModalActions.OPEN_TAG_DETAIL:
      return {
        ...state,
        modalIsActive: true,
        modalView: TagModalView.Detail,
        tagDetailId: action.payload,
      };

    case tagModalActions.OPEN_TAG_LIST:
      return {
        ...state,
        modalIsActive: true,
        modalView: TagModalView.Detail,
      };

    case tagModalActions.OPEN_TAG_CREATE:
      return {
        ...state,
        modalIsActive: true,
        modalView: TagModalView.Create,
      };

    case tagModalActions.SWITCH_VIEW:
      return { ...state, modalView: action.payload };

    case tagModalActions.FETCH_TAG_DETAIL:
      return {
        ...state,
        tagDetailIsLoading: true,
        tagDetailId: action.payload,
      };

    case tagModalActions.FETCH_TAG_DETAIL_SUCCESS:
      return {
        ...state,
        tagDetailError: false,
        tagDetailIsLoading: false,
        tagDetail: action.payload,
      };

    case tagModalActions.FETCH_TAG_DETAIL_FAILURE:
      return {
        ...state,
        tagDetailIsLoading: false,
        tagDetail: undefined,
        tagDetailError: true,
      };

    case tagModalActions.CLOSE_MODAL:
      return {
        ...state,
        ...INITIAL_STATE,
        tagDetailId: undefined,
        tagDetail: undefined,
      };

    default:
      return state;
  }
}
