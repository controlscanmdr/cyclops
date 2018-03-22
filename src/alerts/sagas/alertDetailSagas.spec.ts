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
import MockAdapter from 'axios-mock-adapter';

// Local
import { cyphonAPI } from '../../cyphon/services/axiosInstance';
import { RunSagaOptions } from 'redux-saga';
import * as effects from 'redux-saga/effects';
import * as alertDetailSagas from './alertDetailSagas';
import * as alertDetailActions from '../actions/alertDetailActions';
import * as alertApi from '../services/alertsAPI';
import { Action } from '../../common/types/Redux';
import { AlertDetail } from '../types/Alert';
import { addError } from '../../errors/actions/errorModalActions';


describe('alertDetailSagas', () => {
  let mock: MockAdapter;
  let dispatched: Action<any, any>[];
  let options: RunSagaOptions<Action<any, any>, any>;

  beforeAll(() => {
    mock = new MockAdapter(cyphonAPI);
  });

  beforeEach(() => {
    dispatched = [];
    options = { dispatch: action => dispatched.push(action) };
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  describe('updateAlert()', () => {
    it('should walk through a successful request that sends an update comment', () => {
      const alert: Partial<AlertDetail> = { id: 1, level: 'HIGH' };
      const update: Partial<AlertDetail> = { level: 'MEDIUM' };
      const partial: Partial<AlertDetail> = { id: 1, level: 'MEDIUM' };
      const complete: Partial<AlertDetail> = { id: 1, level: 'MEDIUM', comments: [] };
      const action = alertDetailActions.updateAlert(alert as AlertDetail, update);
      const saga = alertDetailSagas.updateAlert(action);

      expect(saga.next().value).toEqual(effects.call(alertApi.updateAlert, 1, update));
      expect(saga.next(partial).value).toEqual(
        effects.call(alertApi.addComment, 1, 'Changed level from High to Medium.'),
      );
      expect(saga.next(complete).value).toEqual(
        effects.put(alertDetailActions.updateAlertSuccess(complete as AlertDetail)),
      );
      expect(saga.next().value).toEqual(effects.put(alertDetailActions.closeErrorMessage()));
    });

    it('should walk through a request that does not send an update comment', () => {
      const alert: Partial<AlertDetail> = { id: 1, level: 'HIGH' };
      const update: Partial<AlertDetail> = { level: 'HIGH' };
      const complete: Partial<AlertDetail> = { id: 1, level: 'HIGH', comments: [] };
      const action = alertDetailActions.updateAlert(alert as AlertDetail, update);
      const saga = alertDetailSagas.updateAlert(action);

      expect(saga.next().value).toEqual(effects.call(alertApi.updateAlert, 1, update));
      expect(saga.next(complete).value).toEqual(
        effects.put(alertDetailActions.updateAlertSuccess(complete as AlertDetail)),
      );
      expect(saga.next().value).toEqual(effects.put(alertDetailActions.closeErrorMessage()));
    });

    it('should walk through a request that failed on the first update API call', () => {
      const alert: Partial<AlertDetail> = { id: 1, level: 'HIGH' };
      const update: Partial<AlertDetail> = { level: 'HIGH' };
      const action = alertDetailActions.updateAlert(alert as AlertDetail, update);
      const saga = alertDetailSagas.updateAlert(action);
      const error = new Error('Request failed with status 400');

      expect(saga.next().value).toEqual(effects.call(alertApi.updateAlert, 1, update));
      expect(saga.throw!(error).value).toEqual(effects.put(alertDetailActions.updateAlertFailed()));
      expect(saga.next().value).toEqual(effects.put(addError(error)));
    });

    it('should walk through a request that failed on the alert update comment API call', () => {
      const alert: Partial<AlertDetail> = { id: 1, level: 'HIGH' };
      const update: Partial<AlertDetail> = { level: 'MEDIUM' };
      const partial: Partial<AlertDetail> = { id: 1, level: 'MEDIUM' };
      const action = alertDetailActions.updateAlert(alert as AlertDetail, update);
      const saga = alertDetailSagas.updateAlert(action);
      const error = new Error('Request failed with status 400');

      expect(saga.next().value).toEqual(effects.call(alertApi.updateAlert, 1, update));
      expect(saga.next(partial).value).toEqual(
        effects.call(alertApi.addComment, 1, 'Changed level from High to Medium.'),
      );
      expect(saga.throw!(error).value).toEqual(
        effects.put(alertDetailActions.updateAlertPartial(partial as AlertDetail)),
      );
      expect(saga.next().value).toEqual(effects.put(addError(error)));
    });
  });
});
