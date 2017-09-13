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
import * as axios from 'axios';

// Local
import { reverseLookup } from './reverseLookup';

describe('reverseLookup()', () => {
  const placeName = 'costa rica';
  const address = {
    features: [{
      place_name: placeName,
    }],
  };

  let get: sinon.SinonStub;

  beforeEach(() => {
    get = sinon.stub(axios, 'get').resolves(address);
  });

  afterEach(() => {
    get.restore();
  });

  it('should return undefined if there are no coordinates', () => {
    return reverseLookup(undefined as any).then((value) => {
      expect(value).to.be.undefined;
    });
  });

  it('should return undefined if there is an empty array', () => {
    return reverseLookup([] as any).then((value) => {
      expect(value).to.be.undefined;
    });
  });
});
