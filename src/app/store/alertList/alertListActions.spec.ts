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
import * as AlertViewActions from './alertListActions';

describe('AlertViewActions', () => {
  describe('searchAlertsPending()', () => {
    it('should return an action with the correct type and payload', () => {
      const params: any = {};
      const promiseId = 'promise';
      const poll = true;
      const action = AlertViewActions.searchAlertsPending(
        params,
        poll,
        promiseId,
      );

      expect(action).toEqual({
        type: AlertViewActions.SEARCH_ALERTS_PENDING,
        error: undefined,
        payload: { params, promiseId, poll },
      });
    });
  });

  describe('searchAlertsSuccess()', () => {
    it('should return an action with the correct type and payload', () => {
      const alerts: any[] = [];
      const count = 4;
      const polling = true;
      const action = AlertViewActions.searchAlertsSuccess(alerts, count, polling);

      expect(action).toEqual({
        type: AlertViewActions.SEARCH_ALERTS_SUCCESS,
        error: undefined,
        payload: { alerts, count, polling },
      });
    });
  });

  describe('searchAlertsFailure()', () => {
    it('should return an action with the correct type and payload', () => {
      const action = AlertViewActions.searchAlertsFailure();

      expect(action).toEqual({
        type: AlertViewActions.SEARCH_ALERTS_FAILURE,
        error: undefined,
        payload: undefined,
      });
    });
  });

  describe('pollAlertsPending()', () => {
    it('should return an action with the correct type and payload', () => {
      const params: any = {};
      const promiseId = 'promise';
      const action = AlertViewActions.pollAlertsPending(params, promiseId);

      expect(action).toEqual({
        type: AlertViewActions.POLL_ALERTS_PENDING,
        error: undefined,
        payload: { params, promiseId },
      });
    });
  });

  describe('pollAlertsSuccess()', () => {
    it('should return an action with the correct type and payload', () => {
      const alerts: any[] = [];
      const count = 4;
      const action = AlertViewActions.pollAlertsSuccess(alerts, count);

      expect(action).toEqual({
        type: AlertViewActions.POLL_ALERTS_SUCCESS,
        error: undefined,
        payload: { alerts, count },
      });
    });
  });

  describe('pollAlertsFailure()', () => {
    it('should return an action with the correct type and payload', () => {
      const action = AlertViewActions.pollAlertsFailure();

      expect(action).toEqual({
        type: AlertViewActions.POLL_ALERTS_FAILURE,
        error: undefined,
        payload: undefined,
      });
    });
  });

  describe('pollAlertsWait()', () => {
    it('should return an action with the correct type and payload', () => {
      const timeoutId = 4;
      const interval = 49043904;
      const action = AlertViewActions.pollAlertsWait(timeoutId, interval);

      expect(action).toEqual({
        type: AlertViewActions.POLL_ALERTS_WAIT,
        error: undefined,
        payload: { timeoutId, interval },
      });
    });
  });

  describe('stopPolling()', () => {
    it('should return an action with the correct type and payload', () => {
      const action = AlertViewActions.stopPolling();

      expect(action).toEqual({
        type: AlertViewActions.STOP_POLLING,
        error: undefined,
        payload: undefined,
      });
    });
  });

  describe('disablePolling()', () => {
    it('should return an action with the correct type and payload', () => {
      const action = AlertViewActions.disablePolling();

      expect(action).toEqual({
        type: AlertViewActions.DISABLE_POLLING,
        error: undefined,
        payload: undefined,
      });
    });
  });
});
