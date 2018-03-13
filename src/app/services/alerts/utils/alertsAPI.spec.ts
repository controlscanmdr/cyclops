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
import * as api from '~/services/cyphon/utils/cyphonAPI';
import * as alertsAPI from './alertsAPI';
import * as config from '~/config';

describe('alertsAPI', () => {
  let get: sinon.SinonStub;
  let post: sinon.SinonStub;

  beforeEach(() => {
    get = sinon.stub(api, 'get').resolves();
    post = sinon.stub(api, 'post').resolves();
  });

  afterEach(() => {
    get.restore();
    post.restore();
  });

  describe('fetchAlert', () => {
    it('should call get with the correct url', () => {
      const alertId = 1;

      alertsAPI.fetchAlert(alertId);

      expect(get.called).toBe(true);
      expect(get.args[0][0]).toEqual('/alerts/1/');
    });

    it('should pass the cancel token to the get options', () => {
      const alertId = 1;
      const cancelToken: any = 'token';

      alertsAPI.fetchAlert(alertId, cancelToken);

      expect(get.called).toBe(true);
      expect(get.args[0][1]).toEqual({ cancelToken });
    });
  });

  describe('fetchAlertList', () => {
    it('should call get with the correct url', () => {
      alertsAPI.fetchAlertList({} as any);

      expect(get.called).toBe(true);
      expect(get.args[0][0]).toEqual('/alerts/');
    });

    it('should pass the parameters to the get options', () => {
      const params: any = {};

      alertsAPI.fetchAlertList(params);

      expect(get.called).toBe(true);
      expect(get.args[0][1]).toEqual({
        params,
        cancelToken: undefined,
      });
    });

    it('should pass the cancel token to the get options', () => {
      const params: any = {};
      const cancelToken: any = {};

      alertsAPI.fetchAlertList(params, cancelToken);

      expect(get.called).toBe(true);
      expect(get.args[0][1]).toEqual({
        params,
        cancelToken,
      });
    });
  });

  describe('performAction()', () => {
    const actionId = 1;
    const alertId = 2;
    let fetchAlert: sinon.SinonStub;

    beforeEach(() => {
      post.resolves();
    });

    it('should post to the correct url', () => {
      return alertsAPI.performAction(actionId, alertId).then(() => {
        expect(post.called).toBe(true);
        expect(post.args[0][0]).toEqual('/actions/1/run/');
      });
    });

    it('should post the alertId as the post data', () => {
      return alertsAPI.performAction(actionId, alertId).then(() => {
        expect(post.called).toBe(true);
        expect(post.args[0][1]).toEqual({ alert: alertId });
      });
    });

    it('should pass the cancel token', () => {
      const cancelToken: any = {};

      return alertsAPI.performAction(actionId, alertId, cancelToken).then(() => {
        expect(post.called).toBe(true);
        expect(post.args[0][2]).toEqual({ cancelToken });
      });
    });

    it('should call fetchAlert on a successful call', () => {
      return alertsAPI.performAction(actionId, alertId).then(() => {
        expect(get.called).toBe(true);
        expect(get.args[0]).toEqual(['/alerts/2/', { cancelToken: undefined }]);
      });
    });
  });

  describe('updateAlert()', () => {
    const alertId = 5;
    const fields: any = {};
    let patch: sinon.SinonStub;

    beforeEach(() => {
      patch = sinon.stub(api, 'patch').resolves();
    });

    afterEach(() => {
      patch.restore();
    });

    it('should call the correct url', () => {
      return alertsAPI.updateAlert(alertId, fields).then(() => {
        expect(patch.called).toBe(true);
        expect(patch.args[0][0]).toEqual('/alerts/5/');
      });
    });

    it('should pass the fields to patch', () => {
      return alertsAPI.updateAlert(alertId, fields).then(() => {
        expect(patch.called).toBe(true);
        expect(patch.args[0][1]).toEqual(fields);
      });
    });

    it('should modify the assigned_user field to be the id', () => {
      const userFields: any = {
        assigned_user: { id: 3 },
      };
      return alertsAPI.updateAlert(alertId, userFields).then(() => {
        expect(patch.called).toBe(true);
        expect(patch.args[0][1]).toEqual({
          assigned_user: 3,
        });
      });
    });

    it('should pass through the cancel token', () => {
      const cancelToken: any = {};

      return alertsAPI.updateAlert(alertId, fields, cancelToken).then(() => {
        expect(patch.called).toBe(true);
        expect(patch.args[0][2]).toEqual({ cancelToken });
      });
    });
  });

  describe('addComment()', () => {
    const userId = 5;
    const alertId = 3;
    const comment = 'comment';
    let getConfig: sinon.SinonStub;

    beforeEach(() => {
      getConfig = sinon
        .stub(config, 'getConfig')
        .returns({ CURRENT_USER: { id: userId } });
    });

    afterEach(() => {
      getConfig.restore();
    });

    it('should call the correct url', () => {
      return alertsAPI.addComment(alertId, comment).then(() => {
        expect(post.called).toBe(true);
        expect(post.args[0][0]).toEqual('/comments/');
      });
    });

    it('should post a comment object to the url based on the args', () => {
      const expected = { alert: alertId, user: userId, content: comment };

      return alertsAPI.addComment(alertId, comment).then(() => {
        expect(post.called).toBe(true);
        expect(post.args[0][1]).toEqual(expected);
      });
    });

    it('should pass through the cancelToken', () => {
      const cancelToken: any = {};

      return alertsAPI.addComment(alertId, comment, cancelToken).then(() => {
        expect(post.called).toBe(true);
        expect(post.args[0][2]).toEqual({ cancelToken });
      });
    });

    it('should call fetchAlert after a successfull call', () => {
      const cancelToken: any = {};
      return alertsAPI.addComment(alertId, comment, cancelToken).then(() => {
        expect(get.called).toBe(true);
        expect(get.args[0][0]).toEqual('/alerts/3/');
        expect(get.args[0][1]).toEqual({ cancelToken });
      });
    });
  });

  describe('fetchAllCategories()', () => {
    let getAll: sinon.SinonStub;

    beforeEach(() => {
      getAll = sinon.stub(api, 'getAll');
    });

    afterEach(() => {
      getAll.restore();
    });

    it('should call the correct url', () => {
      alertsAPI.fetchAllCategories();

      expect(getAll.called).toBe(true);
      expect(getAll.args[0][0]).toEqual('/categories/');
    });
  });

  describe('fetchAlertLevelDistribution()', () => {
    const days = 4;

    it('should call the correct url', () => {
      alertsAPI.fetchAlertLevelDistribution(days);
      expect(get.args[0][0]).toEqual('/alerts/levels/');
    });

    it('should pass the days parameter to the get params', () => {
      alertsAPI.fetchAlertLevelDistribution(days);
      expect(get.args[0][1]).toEqual({
        params: { days },
        cancelToken: undefined,
      });
    });

    it('should pass the cancelToken to the configuration', () => {
      const cancelToken: any = {};
      alertsAPI.fetchAlertLevelDistribution(days, cancelToken);
      expect(get.args[0][1]).toEqual({
        params: { days },
        cancelToken,
      });
    });
  });

  describe('fetchAlertStatusDistribution()', () => {
    const days = 6;

    it('should call the correct url', () => {
      alertsAPI.fetchAlertStatusDistribution(days);

      expect(get.args[0][0]).toEqual('/alerts/statuses/');
    });

    it('should pass the days parameter to the get params', () => {
      alertsAPI.fetchAlertStatusDistribution(days);

      expect(get.args[0][1]).toEqual({
        params: { days: 6 },
        cancelToken: undefined,
      });
    });

    it('should pass the cancelToken to the configuration', () => {
      const cancelToken: any = {};

      alertsAPI.fetchAlertStatusDistribution(days, cancelToken);

      expect(get.args[0][1]).toEqual({
        params: { days: 6 },
        cancelToken,
      });
    });
  });

  describe('fetchAlertCollectionDistribution()', () => {
    const days = 9;

    it('should call the correct url', () => {
      alertsAPI.fetchAlertCollectionDistribution(days);

      expect(get.args[0][0]).toEqual('/alerts/collections/');
    });

    it('should pass the days parameter to the get params', () => {
      alertsAPI.fetchAlertCollectionDistribution(days);

      expect(get.args[0][1]).toEqual({
        params: { days: 9 },
        cancelToken: undefined,
      });
    });

    it('should pass the cancelToken to the configuration', () => {
      const cancelToken: any = {};

      alertsAPI.fetchAlertCollectionDistribution(days, cancelToken);

      expect(get.args[0][1]).toEqual({
        params: { days: 9 },
        cancelToken,
      });
    });
  });

  describe('fetchAlertLevelTimeseries()', () => {
    const days = 9;

    it('should call the correct url', () => {
      alertsAPI.fetchAlertLevelTimeseries(days);

      expect(get.args[0][0]).toEqual('/alerts/level-timeseries/');
    });

    it('should pass the days parameter to the get params', () => {
      alertsAPI.fetchAlertLevelTimeseries(days);

      expect(get.args[0][1]).toEqual({
        params: { days: 9 },
        cancelToken: undefined,
      });
    });

    it('should pass the cancelToken to the configuration', () => {
      const cancelToken: any = {};

      alertsAPI.fetchAlertLevelTimeseries(days, cancelToken);

      expect(get.args[0][1]).toEqual({
        params: { days: 9 },
        cancelToken,
      });
    });
  });

  describe('fetchAlertLocations()', () => {
    const days = 9;

    it('should call the correct url', () => {
      alertsAPI.fetchAlertLocations(days);

      expect(get.args[0][0]).toEqual('/alerts/locations/');
    });

    it('should pass the days parameter to the get params', () => {
      alertsAPI.fetchAlertLocations(days);

      expect(get.args[0][1]).toEqual({
        params: { days },
        cancelToken: undefined,
      });
    });

    it('should pass the cancelToken to the configuration', () => {
      const cancelToken: any = {};

      alertsAPI.fetchAlertLocations(days, cancelToken);

      expect(get.args[0][1]).toEqual({
        params: { days },
        cancelToken,
      });
    });
  });
});
