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
import axios from 'axios';

// Local
import * as alertsAPI from '../services/alertsAPI';
import * as actions from './alertDetailActions';
import * as errorActions from '../../errors/actions/errorModalActions';

describe('AlertDetailActions', () => {
  let addError: sinon.SinonStub;
  let isCancel: sinon.SinonStub;
  let dispatch: sinon.SinonSpy;
  let getState: sinon.SinonSpy;

  beforeEach(() => {
    dispatch = sinon.spy();
    getState = sinon.spy();
    isCancel = sinon.stub(axios, 'isCancel');
    addError = sinon.stub(errorActions, 'addError');
  });

  afterEach(() => {
    isCancel.restore();
    addError.restore();
  });

  describe('addErrorMessage()', () => {
    it('should return an ADD_ERROR_MESSAGE action', () => {
      const message = ['message'];

      expect(actions.addErrorMessage(message)).toEqual({
        type: actions.ADD_ERROR_MESSAGE,
        payload: message,
      });
    });
  });

  describe('closeErrorMessage()', () => {
    it('should return a CLOSE_ERROR_MESSAGE action', () => {
      expect(actions.closeErrorMessage()).toEqual({
        type: actions.CLOSE_ERROR_MESSAGE,
        payload: undefined,
      });
    });
  });

  describe('performAlertDetailAction()', () => {
    let performAction: sinon.SinonStub;
    let testAction: any;

    beforeEach(() => {
      performAction = sinon
        .stub(alertsAPI, 'performAction')
        .returns(Promise.resolve());
      testAction = (alertId: number, actionId: number) => {
        return actions
          .performAlertDetailAction(
            alertId,
            actionId,
          )(
            dispatch,
            getState,
            undefined,
          );
      };
    });

    afterEach(() => {
      performAction.restore();
    });

    it('should pass alertId and actionId to performAction', () => {
      const alertId = 1;
      const actionId = 2;

      testAction(alertId, actionId);

      expect(performAction.called).toBe(true);
      expect(performAction.args[0][0]).toEqual(actionId);
      expect(performAction.args[0][1]).toEqual(alertId);
    });
  });
});
