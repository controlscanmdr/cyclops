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
import * as test from './notifications';
import * as cyphonAPI from '~/services/cyphon/utils/cyphonAPI';
import * as config from '~/config';

describe('notifications', () => {
  const registrationId = '12345';
  const subscription: any = { endpoint: `url/${registrationId}` };

  describe('sendSubscriptionToServer()', () => {
    let post: sinon.SinonStub;

    beforeEach(() => {
      post = sinon.stub(cyphonAPI, 'post');
    });

    afterEach(() => {
      post.restore();
    });

    it('should reach out to the correct url', () => {
      test.sendSubscriptionToServer(subscription);

      chai.expect(post.args[0][0]).to.equal('/notifications/subscribe/');
    });

    it('should pass the registration id from the subscription', () => {
      test.sendSubscriptionToServer(subscription);

      chai.expect(post.args[0][1]).to.deep.equal({
        registration_id: registrationId,
      });
    });
  });

  describe('setWorkerVariables()', () => {
    const API_URL = '/api';
    let postMessage: sinon.SinonSpy;
    let getConfig: sinon.SinonStub;
    let hold: any;

    beforeEach(() => {
      hold = navigator;
      postMessage = sinon.spy();
      navigator = ({
        serviceWorker: {
          controller: { postMessage },
        },
      } as any);
      getConfig = sinon.stub(config, 'getConfig').returns({ API_URL });
    });

    afterEach(() => {
      getConfig.restore();
      navigator = hold;
    });

    it('should push the correct notification url', () => {
      test.setWorkerVariables(subscription);

      chai.expect(postMessage.args[0][0]).to.deep.equal({
        notificationUrl: '/api/notifications/?registration_id=12345',
      });
    });
  });
});
