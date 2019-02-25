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
import * as actions from './categoryStoreActions';
import * as api from '../../services/alerts/utils/alertsAPI';
import * as errorActions from '~/store/errorModal/errorModalActions';

describe('categoryActions', () => {
  const category1: any = { id: 1, name: 'category' };
  const category2: any = { id: 2, name: 'blah' };
  const list: any[] = [category1, category2];
  const normalized: any = {
    result: [category1.id, category2.id],
    entities: {
      categories: {
        [category1.id]: category1,
        [category2.id]: category2,
      },
    },
  };
  let dispatch: sinon.SinonSpy;

  beforeEach(() => {
    dispatch = sinon.spy();
  });

  describe('fetchCategoriesSuccess()', () => {
    it('should make a FETCH_CATEGORIES_SUCCESS action with a normalized ' +
      'category list as the payload', () => {
      const action = actions.fetchCategoriesSuccess(list);

      chai.expect(action).to.deep.equal({
        type: actions.FETCH_CATEGORIES_SUCCESS,
        payload: normalized,
        error: undefined,
      });
    });
  });

  describe('fetchAllCategories()', () => {
    const addErrorAction: any = {};
    let fetchAllCategories: sinon.SinonStub;
    let addError: sinon.SinonStub;
    let action: () => Promise<any>;

    beforeEach(() => {
      fetchAllCategories = sinon.stub(api, 'fetchAllCategories').resolves(list);
      addError = sinon.stub(errorActions, 'addError').returns(addErrorAction);
      action = () => actions.fetchAllCategories()(dispatch, {} as any, undefined);
    });

    afterEach(() => {
      fetchAllCategories.restore();
      addError.restore();
    });

    it('should call the cyphon api', () => {
      return action().then(() => {
        chai.expect(fetchAllCategories.called).to.be.true;
      });
    });

    it('should dispatch a successful request', () => {
      return action().then(() => {
        chai.expect(dispatch.called).to.be.true;
        chai.expect(dispatch.args[0][0]).to.deep.equal({
          type: actions.FETCH_CATEGORIES_SUCCESS,
          payload: normalized,
          error: undefined,
        });
      });
    });

    it('should dispatch an error', () => {
      const error = {};

      fetchAllCategories.rejects(error);

      return action().then(() => {
        chai.expect(addError.called).to.be.true;
        chai.expect(addError.args[0][0]).to.equal(error);
        chai.expect(dispatch.called).to.be.true;
        chai.expect(dispatch.args[0][0]).to.equal(addErrorAction);
      });
    });
  });
});
