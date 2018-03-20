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
import {
  alertDataContextSearch,
  REQUEST_ID,
} from './alertDataContextSearchReducer';
import * as actions from '../actions/alertDataContextSearchActions';
import * as requests from '../../cyphon/services/requests';

describe('AlertDatatContextSearchReducer', () => {
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

  describe('SELECT_CONTEXT', () => {
    it('should update the state with the given payload data', () => {
      const context = 1;
      const action = actions.selectContext(context);
      const state = alertDataContextSearch({} as any, action);

      expect(state).toEqual({
        selectedContext: context,
      });
    });
  });

  describe('SEARCH_CONTEXT_PENDING', () => {
    it('should update the state with the given payload data', () => {
      const action = actions.searchContextPending({} as any);
      const state = alertDataContextSearch({} as any, action);

      expect(state).toEqual({ loading: true });
    });

    it('should cancel any active request', () => {
      const action = actions.searchContextPending({} as any);

      alertDataContextSearch({} as any, action);

      expect(cancel.called).toBe(true);
      expect(cancel.args[0][0]).toEqual(REQUEST_ID);
    });

    it('should set the cancel function for a new request', () => {
      const canceler: any = {};
      const action = actions.searchContextPending(canceler);

      alertDataContextSearch({} as any, action);

      expect(set.called).toBe(true);
      expect(set.args[0][0]).toEqual(REQUEST_ID);
      expect(set.args[0][1]).toEqual(canceler);
    });
  });

  describe('SEARCH_CONTEXT_SUCCESS', () => {
    it('should update the state with the given payload data', () => {
      const page = 1;
      const pageSize = 25;
      const resultCount = 100;
      const results: any[] = [];
      const action = actions.searchContextSuccess({
        page,
        pageSize,
        resultCount,
        results,
      });
      const state = alertDataContextSearch({} as any, action);

      expect(state).toEqual({
        page,
        pageSize,
        resultCount,
        results,
        loading: false,
      });
    });
  });
});
