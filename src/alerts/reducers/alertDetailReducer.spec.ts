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
import { alertDetail, INITIAL_STATE, REQUEST_ID } from './alertDetailReducer';
import * as actions from '../actions/alertDetailActions';
import * as requests from '../../cyphon/services/requests';
import { CONTAINER_FIELDS } from '../../containers/services/containerSchema';
import * as alertDetailTagActions from '../actions/alertDetailTagActions';

describe('alertDetail', () => {
  let cancel: sinon.SinonStub;
  let set: sinon.SinonStub;

  beforeEach(() => {
    cancel = sinon.stub(requests, 'cancel');
    set = sinon.stub(requests, 'set');
  });

  afterEach(() => {
    cancel.restore();
    set.restore();
  });

  it('should return the initial state', () => {
    expect(alertDetail(undefined, { type: 'NONE' } as any)).toEqual(INITIAL_STATE);
  });

  it('should response to a CLOSE_ALERT action', () => {
    const state = alertDetail({} as any, actions.closeAlert());

    expect(state).toEqual(INITIAL_STATE);
    expect(cancel.called).toBe(true);
    expect(cancel.args[0][0]).toEqual(REQUEST_ID);
  });

  it('should response to a FETCH_ALERT_PENDING action', () => {
    const alertID = 1;
    const canceler: any = {};
    const action = actions.fetchAlert(alertID, canceler);
    const state = alertDetail({} as any, action);

    expect(state).toEqual({
      alertId: 1,
      loading: true,
    });
    expect(cancel.called).toBe(true);
    expect(cancel.args[0][0]);
    expect(set.called).toBe(true);
    expect(set.args[0][0]).toEqual(REQUEST_ID);
    expect(set.args[0][1]).toEqual(canceler);
  });

  it('should respond to a FETCH_ALERT_SUCCESS action', () => {
    const alert: any = { id: 4 };
    const locations: any = { data: 'data' };
    const markers: any = { markers: 'markers' };
    const action = actions.fetchAlertSuccess(alert, locations, markers);
    const state = alertDetail({} as any, action);

    expect(state).toEqual({
      alert,
      locations,
      markers,
      loading: false,
    });
  });

  it('should response to a REQUEST_PENDING action', () => {
    const canceler: any = {};
    const action = actions.requestPending(canceler);
    const state = alertDetail({} as any, action);

    expect(state).toEqual({ loading: true });
    expect(cancel.called).toBe(true);
    expect(cancel.args[0][0]).toEqual(REQUEST_ID);
    expect(set.called).toBe(true);
    expect(set.args[0][0]).toEqual(REQUEST_ID);
    expect(set.args[0][1]).toEqual(canceler);
  });

  it('should respond to a REQUEST_FAILED action', () => {
    const action = actions.requestFailed();
    const state = alertDetail({} as any, action);

    expect(state).toEqual({ loading: false });
  });

  it('should response to an UPDATE_ALERT_SUCCESS action', () => {
    const alert: any = { id: 1, level: 'MEDIUM' };
    const alertUpdated: any = { id: 1, level: 'HIGH' };
    const action = actions.updateAlertSuccess(alertUpdated);
    const state: any = { alert };
    const update = alertDetail(state, action);

    expect(update).toEqual({
      loading: false,
      alert: alertUpdated,
    });
  });

  describe('OPEN_DATA_MODAL', () => {
    it('should update the state with the given payload data', () => {
      const result: any = {
        ip: '124.567.323.432',
      };
      const container: any = {
        fields: [{
          field_type: CONTAINER_FIELDS.IP_ADDRESS,
          field_name: 'ip',
        }],
      };
      const action = actions.openDataModal(result, container);
      const state = alertDetail({} as any, action);

      expect(state).toEqual({
        ipAddresses: result,
        modalActive: true,
      });
    });

    it('should return null ipaddresses if there aren\'t any', () => {
      const result: any = {};
      const container: any = { fields: [] };
      const action = actions.openDataModal(result, container);
      const state = alertDetail({} as any, action);

      expect(state.ipAddresses).toBeNull();
    });
  });

  describe('CLOSE_DATA_MODAL', () => {
    it('should update the state with the given payload data', () => {
      const action = actions.closeDataModal();
      const state = alertDetail({} as any, action);

      expect(state).toEqual({ modalActive: false });
    });
  });

  describe('ADD_ERROR_MESSAGE', () => {
    it('should add the error message to the state', () => {
      const message = ['message'];
      const action = actions.addErrorMessage(message);
      const state = alertDetail({} as any, action);

      expect(state).toEqual({ error: message });
    });
  });

  describe('CLOSE_ERROR_MESSAGE', () => {
    it('should set the error message to an empty string', () => {
      const state = alertDetail({} as any, actions.closeErrorMessage());

      expect(state).toEqual({ error: [] });
    });
  });

  it('should respond to an ADD_TAG_SUCCESS action', () => {
    const state = alertDetail({} as any, alertDetailTagActions.addTagSuccess());

    expect(state).toEqual({ loading: false });
  });

  it('should respond to an ADD_TAG_FAILURE action', () => {
    const state = alertDetail({} as any, alertDetailTagActions.addTagFailure());

    expect(state).toEqual({ loading: false });
  });

  it('should respond to an REMOVE_TAG_FAILED action', () => {
    const state = alertDetail({} as any, alertDetailTagActions.removeTagFailed());

    expect(state).toEqual({ loading: false });
  });

  it('should respond to an REMOVE_TAG_SUCCESS action', () => {
    const state = alertDetail({} as any, alertDetailTagActions.removeTagSuccess());

    expect(state).toEqual({ loading: false });
  });

  it('should respond to an ADD_TAG action', () => {
    const state = alertDetail({} as any, alertDetailTagActions.addTag(1, 1, 1));

    expect(state).toEqual({ loading: true });
  });

  it('should respond to an REMOVE_TAG action', () => {
    const state = alertDetail({} as any, alertDetailTagActions.removeTag(1, 1));

    expect(state).toEqual({ loading: true });
  });
});
