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
import { createAlertUpdateComment } from './createAlertUpdateComment';
import * as cyclops from '~/config';

describe('createAlertUpdateComment()', () => {
  const self: any = { id: 1 };
  const user1: any = { id: 2, first_name: 'George', last_name: 'Costanza' };
  const user2: any = { id: 2, first_name: 'Bob', last_name: 'Bob' };
  const fakeConfig = { CURRENT_USER: self };
  let getConfig: sinon.SinonStub;

  beforeEach(() => {
    getConfig = sinon.stub(cyclops, 'getConfig').returns(fakeConfig);
  });

  afterEach(() => {
    getConfig.restore();
  });

  it('should add a comment about changed levels', () => {
    const alert: any = { level: 'HIGH' };
    const update: any = { level: 'MEDIUM' };
    const comment = createAlertUpdateComment(alert, update);

    chai.expect(comment).to.equal('Changed level from High to Medium.');
  });

  it('should not add a comment if the levels are the same', () => {
    const alert: any = { level: 'MEDIUM' };
    const update: any = { level: 'MEDIUM' };
    const comment = createAlertUpdateComment(alert, update);

    chai.expect(comment).to.equal('');
  });

  it('should create a comment explaining an assigned outcome', () => {
    const alert: any = {};
    const update: any = { outcome: 'completed' };
    const comment = createAlertUpdateComment(alert, update);

    chai.expect(comment).to.equal('Changed outcome to Completed.');
  });

  it('should create a comment explaining a changed outcome', () => {
    const alert: any = { outcome: 'false positive' };
    const update: any = { outcome: 'completed' };
    const comment = createAlertUpdateComment(alert, update);

    chai.expect(comment).to.equal(
      'Changed outcome from False positive to Completed.',
    );
  });

  it('should not create a comment if the outcomes are the same', () => {
    const alert: any = { outcome: 'completed' };
    const update: any = { outcome: 'completed' };
    const comment = createAlertUpdateComment(alert, update);

    chai.expect(comment).to.equal('');
  });

  it('should return an empty string if any empty update level is given', () => {
    const alert: any = {};
    const update: any = { level: '' };
    const comment = createAlertUpdateComment(alert, update);

    chai.expect(comment).to.equal('');
  });

  it('should return an empty string if any empty outcome is given', () => {
    const alert: any = {};
    const update: any = { outcome: undefined };
    const comment = createAlertUpdateComment(alert, update);

    chai.expect(comment).to.equal('');
  });

  it('should return an empty string the assigned_user is undefined', () => {
      const alert: any = {};
      const update: any = { assigned_user: undefined };
      const comment = createAlertUpdateComment(alert, update);

      chai.expect(comment).to.equal('');
  });

  it('should report that a user assigned an alert to them', () => {
    const alert: any = {};
    const update: any = { assigned_user: self };
    const comment = createAlertUpdateComment(alert, update);

    chai.expect(comment).to.equal('Assigned to self.');
  });

  it('should report that an alert was assigned to a specific user', () => {
    const alert: any = {};
    const update: any = { assigned_user: user1 };
    const comment = createAlertUpdateComment(alert, update);

    chai.expect(comment).to.equal('Assigned to George Costanza.');
  });

  it('should comment that users were changed', () => {
    const alert: any = { assigned_user: user1 };
    const update: any = { assigned_user: user2 };
    const comment = createAlertUpdateComment(alert, update);

    chai.expect(comment).to.equal('Assigned from George Costanza to Bob Bob.');
  });

  it('should comment that an alert was assigned from the current user ' +
    'to a new user', () => {
    const alert: any = { assigned_user: self };
    const update: any = { assigned_user: user1 };
    const comment = createAlertUpdateComment(alert, update);

    chai.expect(comment).to.equal('Assigned from self to George Costanza.');
  });

  it('should comment that an alert was assigned from a user to self', () => {
    const alert: any = { assigned_user: user1 };
    const update: any = { assigned_user: self };
    const comment = createAlertUpdateComment(alert, update);

    chai.expect(comment).to.equal('Assigned from George Costanza to self.');
  });

  it('should not comment if both assigned_users are the same', () => {
    let alert: any = { assigned_user: self };
    let update: any = { assigned_user: self };
    let comment = createAlertUpdateComment(alert, update);

    chai.expect(comment).to.equal('');

    alert = { assigned_user: user1 };
    update = { assigned_user: user1 };
    comment = createAlertUpdateComment(alert, update);

    chai.expect(comment).to.equal('');
  });

  it('should comment that an alert was unassigned from self', () => {
    const alert: any = { assigned_user: self };
    const update: any = { assigned_user: null };
    const comment = createAlertUpdateComment(alert, update);

    chai.expect(comment).to.equal('Unassigned from self.');
  });

  it('should comment that an alert was unassigned from a user', () => {
    const alert: any = { assigned_user: user1 };
    const update: any = { assigned_user: null };
    const comment = createAlertUpdateComment(alert, update);

    chai.expect(comment).to.equal('Unassigned from George Costanza.');
  });

  it('should create multiline comments', () => {
    const alert: any = { assigned_user: user1, level: 'HIGH' };
    const update: any = { assigned_user: null, level: 'MEDIUM' };
    const comment = createAlertUpdateComment(alert, update);

    chai.expect(comment).to.equal(
      'Unassigned from George Costanza.\n' +
      'Changed level from High to Medium.',
    );
  });

  it('should allow null outcomes', () => {
    const alert: any = {};
    const update: any = { outcome: null };
    const comment = createAlertUpdateComment(alert, update);

    chai.expect(comment).to.equal('Changed outcome to none.');
  });
});
