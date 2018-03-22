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
import { RequestCanceler } from './RequestCanceler';

describe('RequestCanceler', () => {
  let requestCanceler: RequestCanceler;
  let canceler: sinon.SinonSpy;

  beforeEach(() => {
    requestCanceler = new RequestCanceler();
    canceler = sinon.spy();
  });

  describe('set()', () => {
    it('should set the canceler function', () => {
      requestCanceler.set(canceler);

      expect(requestCanceler.canceler).toEqual(canceler);
    });
  });

  describe('cancel()', () => {
    it('should run the canceler function', () => {
      requestCanceler.set(canceler);
      requestCanceler.cancel();

      expect(canceler.called).toBe(true);
    });
  });
});
