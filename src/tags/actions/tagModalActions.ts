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
import { Action } from '../../common/types/Redux';
import { TagDetail } from '../types/Tag';
import { TagModalView } from '../types/TagModalView';

// OPEN_TAG_DETAIL
// --------------------------------------------------------------------------

export const OPEN_TAG_DETAIL = 'TAG_MODAL:OPEN_TAG_DETAIL';
export type OpenTagDetailAction = Action<typeof OPEN_TAG_DETAIL, number>;
export const openTagDetail = (tagId: number): OpenTagDetailAction => ({
  type: OPEN_TAG_DETAIL,
  payload: tagId,
});

// OPEN_TAG_LIST
// --------------------------------------------------------------------------

export const OPEN_TAG_LIST = 'TAG_MODAL:OPEN_TAG_LIST';
export type OpenTagListAction = Action<typeof OPEN_TAG_LIST, undefined>;
export const openTagList = (): OpenTagListAction => ({
  type: OPEN_TAG_LIST,
  payload: undefined,
});

// OPEN_TAG_CREATE
// --------------------------------------------------------------------------

export const OPEN_TAG_CREATE = 'TAG_MODAL:OPEN_TAG_CREATE';
export type OpenTagCreateAction = Action<typeof OPEN_TAG_CREATE, undefined>;
export const openTagCreate = (): OpenTagCreateAction => ({
  type: OPEN_TAG_CREATE,
  payload: undefined,
});

// FETCH_TAG_DETAIL
// --------------------------------------------------------------------------

export const FETCH_TAG_DETAIL = 'TAG_MODAL:FETCH_TAG_DETAIL';
export type FetchTagDetailAction = Action<typeof FETCH_TAG_DETAIL, number>;
export const fetchTagDetail = (tagId: number): FetchTagDetailAction => ({
  type: FETCH_TAG_DETAIL,
  payload: tagId,
});

// FETCH_TAG_DETAIL_SUCCESS
// --------------------------------------------------------------------------

export const FETCH_TAG_DETAIL_SUCCESS = 'TAG_MODAL:FETCH_TAG_DETAIL_SUCCESS';
export type FetchTagDetailSuccessAction = Action<typeof FETCH_TAG_DETAIL_SUCCESS, TagDetail>;
export const fetchTagDetailSuccess = (tag: TagDetail): FetchTagDetailSuccessAction => ({
  type: FETCH_TAG_DETAIL_SUCCESS,
  payload: tag,
});

// FETCH_TAG_DETAIL_FAILURE
// --------------------------------------------------------------------------

export const FETCH_TAG_DETAIL_FAILURE = 'TAG_MODAL:FETCH_TAG_DETAIL_FAILURE';
export type FetchTagDetailFailureAction = Action<typeof FETCH_TAG_DETAIL_FAILURE, undefined>;
export const fetchTagDetailFailure = (): FetchTagDetailFailureAction => ({
  type: FETCH_TAG_DETAIL_FAILURE,
  payload: undefined,
});

// SWITCH_VIEW
// --------------------------------------------------------------------------

export const SWITCH_VIEW = 'TAG_MODAL:SWITCH_VIEW';
export type SwitchViewAction = Action<typeof SWITCH_VIEW, TagModalView>;
export const switchView = (view: TagModalView): SwitchViewAction => ({
  type: SWITCH_VIEW,
  payload: view,
});

// CLOSE_MODAL
// --------------------------------------------------------------------------

export const CLOSE_MODAL = 'TAG_MODAL:CLOSE_MODAL';
export type CloseModalAction = Action<typeof CLOSE_MODAL, undefined>;
export const closeModal = (): CloseModalAction => ({
  type: CLOSE_MODAL,
  payload: undefined,
});
