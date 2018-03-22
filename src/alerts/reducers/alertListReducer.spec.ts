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
import { alertList } from './alertListReducer';
import * as actions from '../actions/alertListActions';
import { updateAlertSuccess } from '../actions/alertDetailActions';

describe('alertList', () => {
  describe('SEARCH_ALERTS_PENDING', () => {
    const params = { level: 'HIGH' };
    const promiseId = 'meh';

    it('should update the state with the action payload', () => {
      const action = actions.searchAlertsPending(params, true, promiseId);
      const state = alertList({} as any, action);

      expect(state).toEqual({
        params,
        promiseId,
        loading: true,
        polling: false,
        pollingEnabled: true,
      });
    });

    it('should call clearTimeout if there is a timeout on state', () => {
      const action = actions.searchAlertsPending(params, true, promiseId);
      const state: any = { timeout: 5 };
      const clearTimeout = sinon.stub(window, 'clearTimeout');

      alertList(state, action);

      expect(clearTimeout.called).toBe(true);
      expect(clearTimeout.args[0][0]).toEqual(state.timeout);

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

      expect(state).toEqual({
        alerts,
        count,
        polling,
        loading: false,
      });
    });
  });

  describe('SEARCH_ALERTS_FAILURE', () => {
    it('should update the state with the payload action', () => {
      const action = actions.searchAlertsFailure();
      const state = alertList({} as any, action);

      expect(state).toEqual({
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

      expect(state).toEqual({
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

      expect(state).toEqual({
        alerts,
        count,
      });
    });
  });

  describe('POLL_ALERTS_FAILURE', () => {
    it('should update the state with the payload action', () => {
      const action = actions.pollAlertsFailure();
      const state = alertList({} as any, action);

      expect(state).toEqual({
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

      expect(state).toEqual({
        interval,
        timeout,
      });
    });
  });

  describe('STOP_POLLING', () => {
    it('should update the state with the payload action', () => {
      const action = actions.stopPolling();
      const state = alertList({} as any, action);

      expect(state).toEqual({
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

      expect(clearTimeout.called).toBe(true);
      expect(clearTimeout.args[0][0]).toEqual(timeout);

      clearTimeout.restore();
    });
  });

  describe('DISABLE_POLLING', () => {
    it('should update the state with the payload action', () => {
      const action = actions.disablePolling();
      const state = alertList({} as any, action);

      expect(state).toEqual({
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

      expect(clearTimeout.called).toBe(true);
      expect(clearTimeout.args[0][0]).toEqual(timeout);

      clearTimeout.restore();
    });
  });

  describe('UPDATE_ALERT_SUCCESS', () => {
    it(
      'should return the original state if it can\'t find the id of the ' +
      'alert in the reducer state',
      () => {
        const alert: any = { id: 1 };
        const state: any = { alerts: [] };
        const action = updateAlertSuccess(alert);
        const update = alertList(state, action);

        expect(update).toEqual(state);
      });

    it('should update the alert in the list based on the updated alert', () => {
      const alert1: any = { id: 1 };
      const alert2: any = { id: 2, level: 'HIGH' };
      const alert2Updated: any = { id: 2, level: 'MEDIUM' };
      const action = updateAlertSuccess(alert2Updated);
      const state: any = { alerts: [alert1, alert2] };
      const update = alertList(state, action);

      expect(update).toEqual({
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

      expect(state).toEqual({
        distilleries,
        users,
        actions: actionList,
      });
    });
  });
});
