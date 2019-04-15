/**
 * The contents of this file are subject to the CYPHON Proprietary Non-
 * Commercial Registered User Use License Agreement (the "Agreement”). You
 * may not use this file except in compliance with the Agreement, a copy
 * of which may be found at https://github.com/dunbarcyber/cyclops/. The
 * developer of the CYPHON technology and platform is ControlScan, Inc.
 *
 * The CYPHON technology or platform are distributed under the Agreement on
 * an “AS IS” basis, WITHOUT WARRANTY OF ANY KIND, either express or
 * implied. See the Agreement for specific terms.
 *
 * Copyright (C) 2017 ControlScan, Inc. All Rights Reserved.
 *
 * Contributor/Change Made By: ________________. [Only apply if changes
 * are made]
 */

// Vendor
import * as sinon from 'sinon';
import * as chai from 'chai';

// Local
import * as actions from './alertDetailOutcomeActions';
import * as detail from '../alertDetail/alertDetailActions';

describe('AlertDetailOutcomeActions', () => {
  describe('open()', () => {
    it('should create an action with the OPEN type', () => {
      const outcome = 'N/A';
      const notes = 'blah';
      const action = actions.open(outcome, notes);

      chai.expect(action).to.deep.equal({
        type: actions.OPEN,
        payload: { outcome, notes },
        error: undefined,
      });
    });
  });

  describe('close()', () => {
    it('should create an action with the CLOSE type', () => {
      const action = actions.close();

      chai.expect(action).to.deep.equal({
        type: actions.CLOSE,
        payload: undefined,
        error: undefined,
      });
    });
  });

  describe('changeOutcome()', () => {
    it('should create an action with the correct action type and payload', () => {
      const outcome = 'completed';
      const action = actions.changeOutcome(outcome);

      chai.expect(action).to.deep.equal({
        type: actions.CHANGE_OUTCOME,
        payload: outcome,
        error: undefined,
      });
    });
  });

  describe('changeNotes()', () => {
    it('should create an action with the correct action type and payload', () => {
      const notes = 'completed';
      const action = actions.changeNotes(notes);

      chai.expect(action).to.deep.equal({
        type: actions.CHANGE_NOTES,
        payload: notes,
        error: undefined,
      });
    });
  });

  describe('submit()', () => {
    const alert: any  = {};
    const outcome = 'N/A';
    let updateAlertDetail: sinon.SinonStub;
    let dispatch: sinon.SinonStub;
    let promise: Promise<any>;
    let submit: any;

    beforeEach(() => {
      updateAlertDetail = sinon.stub(detail, 'updateAlertDetail');
      dispatch = sinon.stub().callsFake((action) => action);
      promise = Promise.resolve();

      submit = (notes: string, pass: boolean) => {
        if (pass) { promise = Promise.resolve(); }
        else { promise = Promise.reject(''); }

        updateAlertDetail.returns(promise);

        return actions.submit(alert, outcome, notes)(dispatch, {} as any, undefined);
      };
    });

    afterEach(() => {
      updateAlertDetail.restore();
    });

    it('should call close() if the update is successful', () => {
      const action = actions.close();

      return submit('meh', true).then(() => {
        chai.expect(dispatch.called).to.be.true;
        chai.expect(dispatch.args[1][0]).to.deep.equal(action);
      });
    });

    it('should not call close() if the update is unsuccessful', () => {
      return submit('meh', false).catch(() => {
        chai.expect(dispatch.callCount).to.equal(1);
      });
    });
  });
});
