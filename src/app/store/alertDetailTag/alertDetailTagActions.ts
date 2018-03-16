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
import { Action } from '~/store/types';
import { Tag, TagDetail } from '~/services/tags/types';

// ADD_TAG
// --------------------------------------------------------------------------

export const ADD_TAG = 'ALERT_DETAIL_TAG:ADD_TAG';
export type AddTagAction = Action<typeof ADD_TAG, {
  alertId: number;
  tagId: number;
  userId: number;
}>;
export const addTag = (alertId: number, tagId: number, userId: number): AddTagAction => ({
  type: ADD_TAG,
  payload: { alertId, tagId, userId },
});

// ADD_TAG_SUCCESS
// --------------------------------------------------------------------------

export const ADD_TAG_SUCCESS = 'ALERT_DETAIL_TAG:ADD_TAG_SUCCESS';
export type AddTagSuccessAction = Action<typeof ADD_TAG_SUCCESS, undefined>;
export const addTagSuccess = (): AddTagSuccessAction => ({
  type: ADD_TAG_SUCCESS,
  payload: undefined,
});

// ADD_TAG_FAILURE
// --------------------------------------------------------------------------

export const ADD_TAG_FAILURE = 'ALERT_DETAIL_TAG:ADD_TAG_FAILURE';
export type AddTagFailureAction = Action<typeof ADD_TAG_FAILURE, undefined>;
export const addTagFailure = (): AddTagFailureAction => ({
  type: ADD_TAG_FAILURE,
  payload: undefined,
});

// OPEN_TAG_PANEL
// --------------------------------------------------------------------------

export const OPEN_TAG_PANEL = 'ALERT_DETAIL_TAG:OPEN_TAG_PANEL';
export type OpenTagPanelAction = Action<typeof OPEN_TAG_PANEL, undefined>;
export const openTagPanel = (): OpenTagPanelAction => ({
  type: OPEN_TAG_PANEL,
  payload: undefined,
});

// CLOSE_TAG_PANEL
// --------------------------------------------------------------------------

export const CLOSE_TAG_PANEL = 'ALERT_DETAIL_TAG:CLOSE_TAG_PANEL';
export type CloseTagePanelAction = Action<typeof CLOSE_TAG_PANEL, undefined>;
export const closeTagPanel = (): CloseTagePanelAction => ({
  type: CLOSE_TAG_PANEL,
  payload: undefined,
});

// SHOW_REMOVAL_CONFIRMATION
// --------------------------------------------------------------------------

export const SHOW_REMOVAL_CONFIRMATION = 'ALERT_DETAIL_TAG:SHOW_REMOVAL_CONFIRMATION';
export type ShowRemovalConfirmationAction = Action<typeof SHOW_REMOVAL_CONFIRMATION, Tag>;
export const showRemovalConfirmation = (tag: Tag): ShowRemovalConfirmationAction => ({
  type: SHOW_REMOVAL_CONFIRMATION,
  payload: tag,
});

// CANCEL_TAG_REMOVAL
// --------------------------------------------------------------------------

export const CANCEL_TAG_REMOVAL = 'ALERT_DETAIL_TAG:CANCEL_TAG_REMOVAL';
export type CancelTagRemovalAction = Action<typeof CANCEL_TAG_REMOVAL, undefined>;
export const cancelTagRemoval = (): CancelTagRemovalAction => ({
  type: CANCEL_TAG_REMOVAL,
  payload: undefined,
});

// REMOVE_TAG
// --------------------------------------------------------------------------

export const REMOVE_TAG = 'ALERT_DETAIL_TAG:REMOVE_TAG';
export type RemoveTagAction = Action<typeof REMOVE_TAG, { alertId: number, tagId: number }>;
export const removeTag = (alertId: number, tagId: number): RemoveTagAction => ({
  type: REMOVE_TAG,
  payload: { alertId, tagId },
});

// REMOVE_TAG_SUCCESS
// --------------------------------------------------------------------------

export const REMOVE_TAG_SUCCESS = 'ALERT_DETAIL_TAG:REMOVE_TAG_SUCCESS';
export type RemoveTagSuccessAction = Action<typeof REMOVE_TAG_SUCCESS, undefined>;
export const removeTagSuccess = (): RemoveTagSuccessAction => ({
  type: REMOVE_TAG_SUCCESS,
  payload: undefined,
});

// REMOVE_TAG_FAILED
// --------------------------------------------------------------------------

export const REMOVE_TAG_FAILED = 'ALERT_DETAIL_TAG:REMOVE_TAG_FAILED';
export type RemoveTagFailedAction = Action<typeof REMOVE_TAG_FAILED, undefined>;
export const removeTagFailed = (): RemoveTagFailedAction => ({
  type: REMOVE_TAG_FAILED,
  payload: undefined,
});

// OPEN_TAG_DETAIL
// --------------------------------------------------------------------------

export const OPEN_TAG_DETAIL = 'ALERT_DETAIL_TAG:OPEN_TAG_DETAIL';
export type OpenTagDetailAction = Action<typeof OPEN_TAG_DETAIL, number>;
export const openTagDetail = (tagId: number): OpenTagDetailAction => ({
  type: OPEN_TAG_DETAIL,
  payload: tagId,
});

// OPEN_TAG_CREATE
// --------------------------------------------------------------------------

export const OPEN_TAG_CREATE = 'ALERT_DETAIL_TAG:OPEN_TAG_CREATE';
export type OpenTagCreateAction = Action<typeof OPEN_TAG_CREATE, undefined>;
export const openTagCreate = (): OpenTagCreateAction => ({
  type: OPEN_TAG_CREATE,
  payload: undefined,
});

// FETCH_TAG_DETAIL
// --------------------------------------------------------------------------

export const FETCH_TAG_DETAIL = 'ALERT_DETAIL_TAG:FETCH_TAG_DETAIL';
export type FetchTagDetailAction = Action<typeof FETCH_TAG_DETAIL, number>;
export const fetchTagDetail = (tagId: number): FetchTagDetailAction => ({
  type: FETCH_TAG_DETAIL,
  payload: tagId,
});

// FETCH_TAG_DETAIL_SUCCESS
// --------------------------------------------------------------------------

export const FETCH_TAG_DETAIL_SUCCESS = 'ALERT_DETAIL_TAG:FETCH_TAG_DETAIL_SUCCESS';
export type FetchTagDetailSuccessAction = Action<typeof FETCH_TAG_DETAIL_SUCCESS, TagDetail>;
export const fetchTagDetailSuccess = (tag: TagDetail): FetchTagDetailSuccessAction => ({
  type: FETCH_TAG_DETAIL_SUCCESS,
  payload: tag,
});

// FETCH_TAG_DETAIL_FAILURE
// --------------------------------------------------------------------------

export const FETCH_TAG_DETAIL_FAILURE = 'ALERT_DETAIL_TAG:FETCH_TAG_DETAIL_FAILURE';
export type FetchTagDetailFailureAction = Action<typeof FETCH_TAG_DETAIL_FAILURE, undefined>;
export const fetchTagDetailFailure = (): FetchTagDetailFailureAction => ({
  type: FETCH_TAG_DETAIL_FAILURE,
  payload: undefined,
});
