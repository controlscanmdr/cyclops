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
import * as actions from './tagModalActions';
import { TagModalView } from '~/services/tags/types/TagModalView';

describe('tagModalActions', () => {
  describe('openTagDetail()', () => {
    it('should create an OPEN_TAG_DETAIL action', () => {
      expect(actions.openTagDetail(3)).toEqual({
        type: actions.OPEN_TAG_DETAIL,
        payload: 3,
      });
    });
  });

  describe('openTagList()', () => {
    it('should create an OPEN_TAG_LIST action', () => {
      expect(actions.openTagList()).toEqual({
        type: actions.OPEN_TAG_LIST,
        payload: undefined,
      });
    });
  });

  describe('openTagCreate()', () => {
    it('should create an OPEN_TAG_CREATE action', () => {
      expect(actions.openTagCreate()).toEqual({
        type: actions.OPEN_TAG_CREATE,
        payload: undefined,
      });
    });
  });

  describe('fetchTagDetail()', () => {
    it('should create a FETCH_TAG_DETAIL action', () => {
      expect(actions.fetchTagDetail(4)).toEqual({
        type: actions.FETCH_TAG_DETAIL,
        payload: 4,
      });
    });
  });

  describe('fetchTagDetailSuccess()', () => {
    it('should create a FETCH_TAG_DETAIL_SUCCESS action', () => {
      const tag: any = { id: 1 };

      expect(actions.fetchTagDetailSuccess(tag)).toEqual({
        type: actions.FETCH_TAG_DETAIL_SUCCESS,
        payload: tag,
      });
    });
  });

  describe('fetchTagDetailFailure()', () => {
    it('should create a FETCH_TAG_DETAIL_FAILURE action', () => {
      expect(actions.fetchTagDetailFailure()).toEqual({
        type: actions.FETCH_TAG_DETAIL_FAILURE,
        payload: undefined,
      });
    });
  });

  describe('switchView()', () => {
    it('should create a SWITCH_VIEW action', () => {
      expect(actions.switchView(TagModalView.Create)).toEqual({
        type: actions.SWITCH_VIEW,
        payload: TagModalView.Create,
      });
    });
  });

  describe('closeModal()', () => {
    it('should create a CLOSE_MODAL action', () => {
      expect(actions.closeModal()).toEqual({
        type: actions.CLOSE_MODAL,
        payload: undefined,
      });
    });
  });
});
