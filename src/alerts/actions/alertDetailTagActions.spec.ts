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
import * as actions from './alertDetailTagActions';
import { Tag } from '../../tags/types/Tag';

describe('alertDetailTagActions', () => {
  describe('addTag()', () => {
    it('should create an ADD_TAG action', () => {
      const alertId = 1;
      const tagId = 5;
      const userId = 3;

      expect(actions.addTag(alertId, tagId, userId)).toEqual({
        type: actions.ADD_TAG,
        payload: { alertId, tagId, userId },
      });
    });
  });

  describe('addTagSuccess()', () => {
    it('should create an ADD_TAG_SUCCESS action', () => {
      expect(actions.addTagSuccess()).toEqual({
        type: actions.ADD_TAG_SUCCESS,
        payload: undefined,
      });
    });
  });

  describe('addTagFailure()', () => {
    it('should create an ADD_TAG_FAILURE action', () => {
      expect(actions.addTagFailure()).toEqual({
        type: actions.ADD_TAG_FAILURE,
        payload: undefined,
      });
    });
  });

  describe('openPanel()', () => {
    it('should create an OPEN_PANEL action', () => {
      expect(actions.openTagPanel()).toEqual({
        type: actions.OPEN_TAG_PANEL,
        payload: undefined,
      });
    });
  });

  describe('cancelModifications()', () => {
    it('should create a CANCEL_MODIFICATIONS action', () => {
      expect(actions.closeTagPanel()).toEqual({
        type: actions.CLOSE_TAG_PANEL,
        payload: undefined,
      });
    });
  });

  describe('showRemovalConfirmation()', () => {
    it('should create a SHOW_REMOVAL_CONFIRMATION action', () => {
      const tag: Tag = {
        id: 1,
        name: 'George',
        topic: {
          id: 2,
          name: 'Super',
          url: '',
        },
      };

      expect(actions.showRemovalConfirmation(tag)).toEqual({
        type: actions.SHOW_REMOVAL_CONFIRMATION,
        payload: tag,
      });
    });
  });

  describe('cancelTagRemoval()', () => {
    it('should create a CANCEL_TAG_REMOVAL action', () => {
      expect(actions.cancelTagRemoval()).toEqual({
        type: actions.CANCEL_TAG_REMOVAL,
        payload: undefined,
      });
    });
  });

  describe('removeTag()', () => {
    it('should create a REMOVE_TAG action', () => {
      const alertId = 10;
      const tagId = 3;

      expect(actions.removeTag(alertId, tagId)).toEqual({
        type: actions.REMOVE_TAG,
        payload: { alertId, tagId },
      });
    });
  });

  describe('removeTagSuccess()', () => {
    it('should create a REMOVE_TAG_SUCCESS action', () => {
      expect(actions.removeTagSuccess()).toEqual({
        type: actions.REMOVE_TAG_SUCCESS,
        payload: undefined,
      });
    });
  });

  describe('removeTagFailed()', () => {
    it('should should create a REMOVE_TAG_FAILED action', () => {
      expect(actions.removeTagFailed()).toEqual({
        type: actions.REMOVE_TAG_FAILED,
        payload: undefined,
      });
    });
  });
});
