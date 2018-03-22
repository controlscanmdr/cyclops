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
import * as actions from './tagStoreActions';

describe('tagStoreActions', () => {
  describe('fetchTagsPending()', () => {
    it('should create a FETCH_TAGS_PENDING action', () => {
      expect(actions.fetchTags()).toEqual({
        type: actions.FETCH_TAGS,
        payload: undefined,
      });
    });
  });

  describe('fetchTagsSuccess()', () => {
    it('should create a FETCH_TAGS_SUCCESS action', () => {
      const tags: any[] = [{ id: 1 }];

      expect(actions.fetchTagsSuccess(tags)).toEqual({
        type: actions.FETCH_TAGS_SUCCESS,
        payload: tags,
      });
    });
  });

  describe('fetchTagsFailure()', () => {
    it('should create a FETCH_TAGS_FAILURE action', () => {
      expect(actions.fetchTagsFailure()).toEqual({
        type: actions.FETCH_TAGS_FAILURE,
        payload: undefined,
      });
    });
  });
});
