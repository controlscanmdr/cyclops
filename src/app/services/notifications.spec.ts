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
import * as test from './notifications';
import * as cyphonAPI from '../../cyphon/services/cyphonAPI';

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

      expect(post.args[0][0]).toEqual('/notifications/subscribe/');
    });

    it('should pass the registration id from the subscription', () => {
      test.sendSubscriptionToServer(subscription);

      expect(post.args[0][1]).toEqual({
        registration_id: registrationId,
      });
    });
  });
});
