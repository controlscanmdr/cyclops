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
import { createAction } from './reduxUtils';

describe('createAction', () => {
  it('should create an action with a type and payload', () => {
    const type = 'type';
    const payload = 'payload';
    const action = createAction(type, payload);

    chai.expect(action).to.deep.equal({ type, payload, error: undefined });
  });

  it('should create an action with an error', () => {
    const type = 'type';
    const payload = 'payload';
    const action = createAction(type, payload, true);

    chai.expect(action).to.deep.equal({ type, payload, error: true });
  });
});
