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
import * as chai from 'chai';

// Local
import * as update from './checkAlertUpdate';

describe('checkAlertUpdate()', () => {
  const check = update.checkAlertUpdate;

  it('should return true if there is no update status', () => {
    chai.expect(check({} as any, {}).valid).to.be.true;
  });

  it('should return true if the update status does not include BUSY or DONE', () => {
    chai.expect(check({} as any, { status: 'NEW' }).valid).to.be.true;
  });

  it('should return true if there is an assigned user', () => {
    const passed = check(
      { assigned_user: true } as any,
      { status: 'BUSY' },
    ).valid;

    chai.expect(passed).to.be.true;
  });

  it('should return false if there is no assigned user and the status ' +
    'is being changed to BUSY', () => {
    const message = 'Alert must be assigned before changing the status to Busy.';
    let request = check({} as any, { status: 'BUSY' });

    chai.expect(request.valid).to.be.false;
    chai.expect(request.errors).to.deep.equal([message]);
  });

  it('should return true if there is no assigned user', () => {
    chai.expect(check({} as any, {}).valid).to.be.true;
  });

  it('should return false if the alert status is DONE and there is ' +
    'a user in the update request', () => {
    const message = 'Alert cannot be reassigned once it has been resolved.';
    let request = check({ status: 'DONE' } as any, { assigned_user: { id: 1 } as any });

    chai.expect(request.valid).to.be.false;
    chai.expect(request.errors).to.deep.equal([message]);
  });
});
