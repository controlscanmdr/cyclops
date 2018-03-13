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

// Vendor

import * as sinon from 'sinon';

// Local
import { errorModal, ErrorModalState } from './errorModalReducer';
import * as actions from './errorModalActions';

describe('ErrorPopup reducer', () => {
  let assign: sinon.SinonStub;
  let state: ErrorModalState;

  beforeEach(() => {
    state = {
      current: 0,
      errors: [],
    };
  });

  // describe('ADD_ERROR', () => {
  //   it('should add an error', () => {
  //     const error: any = { error: 'error' };
  //     const action = actions.addError(error);
  //     const updatedState = reducer(state, action);
  //
  //     expect(updatedState).toEqual({
  //       current: 0,
  //       errors: [error],
  //     });
  //   });
  //
  //   it('should add any new errors onto the end of the existing error array', () => {
  //     const error1: any = { error: 'error' };
  //     const action1 = actions.addError(error1);
  //     const updatedState1 = reducer(state, action1);
  //
  //     expect(updatedState1).toEqual({
  //       current: 0,
  //       errors: [error1],
  //     });
  //
  //     const error2: any = { error: 'error' };
  //     const action2 = actions.addError(error2);
  //     const updatedState2 = reducer(updatedState1, action2);
  //
  //     expect(updatedState2).toEqual({
  //       current: 0,
  //       errors: [error1, error2],
  //     });
  //   });
  //
  //   it('should call Object.assign', () => {
  //     const error: any = { error: 'error' };
  //     const action = actions.addError(error);
  //
  //     assign = sinon.stub(Object, 'assign');
  //
  //     reducer(state, action);
  //
  //     expect(assign.called).toBe(true);
  //     expect(assign.args[0][0]).toEqual({});
  //     expect(assign.args[0][1]).toEqual(state);
  //     expect(assign.args[0][2]).toEqual({
  //       errors: [error],
  //     });
  //     assign.restore();
  //   });
  // });

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
