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

// Local
import * as test from './modifyAlertUpdate';

describe('modifyAlertUpdate', () => {

  it('should return the update if it does not have a user', () => {
    const update = {};
    const modification = test.modifyAlertUpdate({} as any, update);

    expect(modification).toEqual(update);
  });

  it('should return the update if the status is not NEW', () => {
    const update = { assigned_user: { id: 2 } as any };
    const modification = test.modifyAlertUpdate({ status: 'BUSY' } as any, update);

    expect(modification).toEqual(update);
  });

  it(
    'should add a BUSY status to the update if the alert is NEW and ' +
    'there is a user on the update',
    () => {
      const update = { assigned_user: { id: 2 } as any };
      const modification = test.modifyAlertUpdate({ status: 'NEW' } as any, update);
      expect(modification).toEqual({
        assigned_user: { id: 2 },
        status: 'BUSY',
      });
    });
});
