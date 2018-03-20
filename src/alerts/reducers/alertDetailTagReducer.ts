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
import * as actions from '../actions/alertDetailTagActions';
import { Tag, TagDetail } from '../../tags/types/Tag';
import { CLOSE_ALERT, CloseAlertAction } from '../actions/alertDetailActions';

export interface AlertDetailTagState {
  // If the modification panel for tags is currently active.
  panelIsActive: boolean;

  // If a confirmation to remove a tag is currently active.
  confirmationIsActive: boolean;

  // If the modal that displays tag information is active.
  modalIsActive: boolean;

  // If the current tag information is being fetched.
  tagDetailIsLoading: boolean;

  // Id of the tag detail
  tagDetailId?: number;

  // If there was an error fetching the tag detail.
  tagDetailError: boolean;

  // The currently displayed tag detail.
  tagDetail?: TagDetail;

  // Tag the user wishes to remove.
  tagToRemove?: Tag;
}

// Initial state of this reducer.
export const INITIAL_STATE: AlertDetailTagState = {
  panelIsActive: false,
  confirmationIsActive: false,
  tagDetailError: false,
  tagDetailIsLoading: false,
  modalIsActive: false,
};

// Action types accepted in this reducer.
type Actions =
  actions.OpenTagPanelAction |
  actions.CloseTagePanelAction |
  actions.ShowRemovalConfirmationAction |
  actions.CancelTagRemovalAction |
  actions.RemoveTagSuccessAction |
  actions.OpenTagDetailAction |
  actions.OpenTagCreateAction |
  actions.FetchTagDetailAction |
  actions.FetchTagDetailSuccessAction |
  actions.FetchTagDetailFailureAction |
  CloseAlertAction;

/**
 * Reducer containing information on the alert detail tag edit panel.
 * @param {AlertDetailTagState} state
 * @param {Actions} action
 * @returns {AlertDetailTagState}
 */
export function alertDetailTagReducer(
  state: AlertDetailTagState = INITIAL_STATE,
  action: Actions,
): AlertDetailTagState {
  switch (action.type) {
    case actions.OPEN_TAG_PANEL:
      return { ...state, panelIsActive: true };

    case actions.CLOSE_TAG_PANEL:
    case CLOSE_ALERT:
      return INITIAL_STATE;

    case actions.SHOW_REMOVAL_CONFIRMATION:
      return {
        ...state,
        confirmationIsActive: true,
        tagToRemove: action.payload,
      };

    case actions.OPEN_TAG_DETAIL:
      return { ...state, modalIsActive: true };

    case actions.FETCH_TAG_DETAIL:
      return { ...state, tagDetailIsLoading: true, tagDetailId: action.payload };

    case actions.FETCH_TAG_DETAIL_SUCCESS:
      return { ...state, tagDetailIsLoading: false, tagDetail: action.payload };

    case actions.FETCH_TAG_DETAIL_FAILURE:
      return { ...state, tagDetailIsLoading: false, tagDetailError: true };

    case actions.CANCEL_TAG_REMOVAL:
    case actions.REMOVE_TAG_SUCCESS:
      return {
        ...state,
        confirmationIsActive: false,
        tagToRemove: undefined,
      };

    default:
      return state;
  }
}