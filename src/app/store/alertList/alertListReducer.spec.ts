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
import { alertList } from './alertListReducer';
import * as actions from './alertListActions';
import { updateAlertSuccess } from '../alertDetail/alertDetailActions';

describe('alertList', () => {
  describe('SEARCH_ALERTS_PENDING', () => {
    const params = { level: 'HIGH' };
    const promiseId = 'meh';

    it('should update the state with the action payload', () => {
      const action = actions.searchAlertsPending(params, true, promiseId);
      const state = alertList({} as any, action);

      chai.expect(state).to.deep.equal({
        loading: true,
        params,
        polling: false,
        pollingEnabled: true,
        promiseId,
      });
    });

    it('should call clearTimeout if there is a timeout on state', () => {
      const action = actions.searchAlertsPending(params, true, promiseId);
      const state: any = { timeout: 5 };
      const clearTimeout = sinon.stub(window, 'clearTimeout');

      alertList(state, action);

      chai.expect(clearTimeout.called).to.be.true;
      chai.expect(clearTimeout.args[0][0]).to.equal(state.timeout);

      clearTimeout.restore();
    });
  });

  describe('SEARCH_ALERTS_SUCCESS', () => {
    it('should update the state with the payload action', () => {
      const alerts: any[] = [];
      const count = 4;
      const polling = true;
      const action = actions.searchAlertsSuccess(alerts, count, polling);
      const state = alertList({} as any, action);

      chai.expect(state).to.deep.equal({
        alerts,
        count,
        loading: false,
        polling,
      });
    });
  });

  describe('SEARCH_ALERTS_FAILURE', () => {
    it('should update the state with the payload action', () => {
      const action = actions.searchAlertsFailure();
      const state = alertList({} as any, action);

      chai.expect(state).to.deep.equal({
        loading: false,
        polling: false,
      });
    });
  });

  describe('POLL_ALERTS_PENDING', () => {
    it('should update the state with the payload action', () => {
      const promiseId = 'meh';
      const action = actions.pollAlertsPending({} as any, promiseId);
      const state = alertList({} as any, action);

      chai.expect(state).to.deep.equal({
        promiseId,
        polling: true,
        pollingEnabled: true,
      });
    });
  });

  describe('POLL_ALERTS_SUCCESS', () => {
    it('should update the state with the payload action', () => {
      const alerts: any[] = [];
      const count = 4;
      const action = actions.pollAlertsSuccess(alerts, count);
      const state = alertList({} as any, action);

      chai.expect(state).to.deep.equal({
        alerts,
        count,
      });
    });
  });

  describe('POLL_ALERTS_FAILURE', () => {
    it('should update the state with the payload action', () => {
      const action = actions.pollAlertsFailure();
      const state = alertList({} as any, action);

      chai.expect(state).to.deep.equal({
        polling: false,
      });
    });
  });

  describe('POLL_ALERTS_WAIT', () => {
    it('should update the state with the payload action', () => {
      const timeout = 1;
      const interval = 3;
      const action = actions.pollAlertsWait(timeout, interval);
      const state = alertList({} as any, action);

      chai.expect(state).to.deep.equal({
        interval,
        timeout,
      });
    });
  });

  describe('STOP_POLLING', () => {
    it('should update the state with the payload action', () => {
      const action = actions.stopPolling();
      const state = alertList({} as any, action);

      chai.expect(state).to.deep.equal({
        polling: false,
        timeout: null,
      });
    });

    it('should call clearTimeout if there is a timeout on state', () => {
      const clearTimeout = sinon.stub(window, 'clearTimeout');
      const action = actions.stopPolling();
      const timeout = 5;
      const state = { timeout };

      alertList(state as any, action);

      chai.expect(clearTimeout.called).to.be.true;
      chai.expect(clearTimeout.args[0][0]).to.equal(timeout);

      clearTimeout.restore();
    });
  });

  describe('DISABLE_POLLING', () => {
    it('should update the state with the payload action', () => {
      const action = actions.disablePolling();
      const state = alertList({} as any, action);

      chai.expect(state).to.deep.equal({
        polling: false,
        pollingEnabled: false,
        timeout: null,
      });
    });

    it('should call clearTimeout if there is a timeout on state', () => {
      const clearTimeout = sinon.stub(window, 'clearTimeout');
      const action = actions.disablePolling();
      const timeout = 5;
      const state = { timeout };

      alertList(state as any, action);

      chai.expect(clearTimeout.called).to.be.true;
      chai.expect(clearTimeout.args[0][0]).to.equal(timeout);

      clearTimeout.restore();
    });
  });

  describe('UPDATE_ALERT_SUCCESS', () => {
    it('should return the original state if it can\'t find the id of the ' +
      'alert in the reducer state', () => {
      const alert: any = { id: 1 };
      const state: any = { alerts: [] };
      const action = updateAlertSuccess(alert);
      const update = alertList(state, action);

      chai.expect(update).to.equal(state);
    });

    it('should update the alert in the list based on the updated alert', () => {
      const alert1: any = { id: 1 };
      const alert2: any = { id: 2, level: 'HIGH' };
      const alert2Updated: any = { id: 2, level: 'MEDIUM' };
      const action = updateAlertSuccess(alert2Updated);
      const state: any = { alerts: [alert1, alert2] };
      const update = alertList(state, action);

      chai.expect(update).to.deep.equal({
        alerts: [alert1, alert2Updated],
      });
    });
  });

  describe('FETCH_VIEW_RESOURCES_SUCCESS', () => {
    it('should update the state with the payload action', () => {
      const actionList: any[] = [];
      const distilleries: any[] = [];
      const users: any[] = [];
      const action = actions.fetchViewResourcesSuccess(users, distilleries, actionList);
      const state = alertList({} as any, action);

      chai.expect(state).to.deep.equal({
        actions: actionList,
        distilleries,
        users,
      });
    });
  });
});
