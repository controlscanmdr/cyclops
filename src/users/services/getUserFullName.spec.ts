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
import * as utils from './getUserFullName';

describe('api.users.utils', () => {
  describe('getUserFullName', () => {
    it('should combine the first_name and last_name of a user', () => {
      const user: any = {
        first_name: 'Bob',
        last_name: 'Saget',
      };

      expect(utils.getUserFullName(user)).toEqual('Bob Saget');
    });

    it('should return None if there is no user', () => {
      const user: any = undefined;

      expect(utils.getUserFullName(user)).toEqual('None');
    });
  });
});
