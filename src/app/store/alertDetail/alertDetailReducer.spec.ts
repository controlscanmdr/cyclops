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
import { alertDetail, INITIAL_STATE, REQUEST_ID } from './alertDetailReducer';
import * as actions from './alertDetailActions';
import * as requests from '~/services/cyphon/utils/requests';
import { CONTAINER_FIELDS } from '~/services/containers/constants';

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

  describe('CLOSE_ALERT', () => {
    it('should return the initial state', () => {
      const state = alertDetail({} as any, actions.closeAlert());

      chai.expect(state).to.deep.equal(INITIAL_STATE);
    });

    it('should cancel an active request', () => {
      alertDetail({} as any, actions.closeAlert());

      chai.expect(cancel.called).to.be.true;
      chai.expect(cancel.args[0][0]).to.equal(REQUEST_ID);
    });
  });

  describe('FETCH_ALERT_PENDING', () => {
    it('should update the state with the given payload', () => {
      const alertId = 1;
      const action = actions.fetchAlertPending(alertId, {} as any);
      const state = alertDetail({} as any, action);

      chai.expect(state).to.deep.equal({
        alertId: 1,
        loading: true,
      });
    });

    it('should cancel an active request', () => {
      alertDetail({} as any, actions.fetchAlertPending(1, {} as any));

      chai.expect(cancel.called).to.be.true;
      chai.expect(cancel.args[0][0]);
    });

    it('should set the cancel function of a new request', () => {
      const canceler: any = {};

      alertDetail({} as any, actions.fetchAlertPending(1, canceler));

      chai.expect(set.called).to.be.true;
      chai.expect(set.args[0][0]).to.equal(REQUEST_ID);
      chai.expect(set.args[0][1]).to.equal(canceler);
    });
  });

  describe('FETCH_ALERT_SUCCESS', () => {
    it('should update the state with the given payload data', () => {
      const alert: any = { id: 4 };
      const locations: any = { data: 'data' };
      const markers: any = { markers: 'markers' };
      const action = actions.fetchAlertSuccess(alert, locations, markers);
      const state = alertDetail({} as any, action);

      chai.expect(state).to.deep.equal({
        alert,
        loading: false,
        locations,
        markers,
      });
    });
  });

  describe('REQUEST_PENDING', () => {
    it('should update the state with the given payload', () => {
      const canceler: any = {};
      const action = actions.requestPending(canceler);
      const state = alertDetail({} as any, action);

      chai.expect(state).to.deep.equal({ loading: true });
    });

    it('should cancel an active request', () => {
      const action = actions.requestPending({} as any);

      alertDetail({} as any, action);

      chai.expect(cancel.called).to.be.true;
      chai.expect(cancel.args[0][0]).to.equal(REQUEST_ID);
    });

    it('should set the canceler for a new request', () => {
      const canceler: any = {};
      const action = actions.requestPending(canceler);

      alertDetail({} as any, action);

      chai.expect(set.called).to.be.true;
      chai.expect(set.args[0][0]).to.equal(REQUEST_ID);
      chai.expect(set.args[0][1]).to.equal(canceler);
    });
  });

  describe('REQUEST_FAILED', () => {
    it('should update the state with the given payload data', () => {
      const action = actions.requestFailed();
      const state = alertDetail({} as any, action);

      chai.expect(state).to.deep.equal({ loading: false });
    });
  });

  describe('UPDATE_ALERT_SUCCESS', () => {
    it('should update the state with the given payload data', () => {
      const alert: any = { id: 1 };
      const action = actions.updateAlertSuccess(alert);
      const state = alertDetail({} as any, action);

      chai.expect(state).to.deep.equal({
        alert,
        loading: false,
      });
    });

    it('should update the current alert', () => {
      const alert: any = { id: 1, level: 'MEDIUM' };
      const alertUpdated: any = { id: 1, level: 'HIGH' };
      const action = actions.updateAlertSuccess(alertUpdated);
      const state: any = { alert };
      const update = alertDetail(state, action);

      chai.expect(update.alert).to.deep.equal(alertUpdated);
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

      chai.expect(state).to.deep.equal({
        ipAddresses: result,
        modalActive: true,
      });
    });

    it('should return null ipaddresses if there aren\'t any', () => {
      const result: any = {};
      const container: any = { fields: [] };
      const action = actions.openDataModal(result, container);
      const state = alertDetail({} as any, action);

      chai.expect(state.ipAddresses).to.be.null;
    });
  });

  describe('CLOSE_DATA_MODAL', () => {
    it('should update the state with the given payload data', () => {
      const action = actions.closeDataModal();
      const state = alertDetail({} as any, action);

      chai.expect(state).to.deep.equal({ modalActive: false });
    });
  });

  describe('ADD_ERROR_MESSAGE', () => {
    it('should add the error message to the state', () => {
      const message = ['message'];
      const action = actions.addErrorMessage(message);
      const state = alertDetail({} as any, action);

      chai.expect(state).to.deep.equal({ error: message });
    });
  });

  describe('CLOSE_ERROR_MESSAGE', () => {
    it('should set the error message to an empty string', () => {
      const state = alertDetail({} as any, actions.closeErrorMessage());

      chai.expect(state).to.deep.equal({ error: [] });
    });
  });
});
