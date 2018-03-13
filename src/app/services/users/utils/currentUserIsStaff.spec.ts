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
import { currentUserIsStaff } from './currentUserIsStaff';
import * as config from '~/config';

describe('currentUserIsStaff()', () => {
  let getConfig: sinon.SinonStub;

  beforeEach(() => {
    getConfig = sinon.stub(config, 'getConfig');
  });

  afterEach(() => {
    getConfig.restore();
  });

  it('should return true if the current user is staff', () => {
    getConfig.returns({ CURRENT_USER: { is_staff: true } });
    expect(currentUserIsStaff()).toBe(true);
  });

  it('should return false if the current user is not staff', () => {
    getConfig.returns({ CURRENT_USER: { is_staff: false } });
    expect(currentUserIsStaff()).toBe(false);
  });
});
