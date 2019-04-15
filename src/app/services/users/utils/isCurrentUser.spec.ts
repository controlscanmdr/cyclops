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
import { isCurrentUser } from './isCurrentUser';
import * as cyclops from '~/config';

describe('isCurrentUser()', () => {
  const user: any = { id: 1 };
  const config = { CURRENT_USER: user };
  let getConfig: sinon.SinonStub;

  beforeEach(() => {
    getConfig = sinon.stub(cyclops, 'getConfig').returns(config);
  });

  afterEach(() => {
    getConfig.restore();
  });

  it('should return true if it is the current user', () => {
    chai.expect(isCurrentUser({ id: 1 } as any)).to.be.true;
  });

  it('should return false if it is not the current user', () => {
    chai.expect(isCurrentUser({ id: 2 } as any)).to.be.false;
  });
});
