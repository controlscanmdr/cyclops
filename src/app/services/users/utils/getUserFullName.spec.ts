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
import * as utils from './getUserFullName';

describe('api.users.utils', () => {
  describe('getUserFullName', () => {
    it('should combine the first_name and last_name of a user', () => {
      const user: any = {
        first_name: 'Bob',
        last_name: 'Saget',
      };

      chai.expect(utils.getUserFullName(user)).to.equal('Bob Saget');
    });
  });
});
