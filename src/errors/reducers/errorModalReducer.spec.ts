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
import { errorModal, ErrorModalState } from './errorModalReducer';
import * as actions from '../actions/errorModalActions';

describe('ErrorPopup reducer', () => {
  let state: ErrorModalState;

  beforeEach(() => {
    state = {
      current: 0,
      errors: [],
    };
  });

  describe('VIEW_ERROR', () => {
    it('should change the current index', () => {
      const index = 3;
      const action = actions.viewError(index);
      const updatedState = errorModal(state, action);

      expect(updatedState.current).toEqual(index);
    });
  });

  describe('CLEAR_ERRORS', () => {
    it('should clear the list of errors', () => {
      state = {
        current: 0,
        errors: [{} as any, {} as any],
      };

      expect(state.errors.length).toEqual(2);

      const action = actions.clearErrors();
      const updatedState = errorModal(state, action);

      expect(updatedState.errors.length).toEqual(0);
    });
  });
});
