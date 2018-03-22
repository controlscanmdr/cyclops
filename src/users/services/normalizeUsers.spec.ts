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
import { normalizeUsers } from './normalizeUsers';
import { User } from '../types/User';

describe('normalizeUsers()', () => {
  const user1: User = {
    id: 1,
    company: 1,
    email: 'mail@gmail.com',
    first_name: 'Bob',
    last_name: 'Saget',
    is_staff: false,
  };
  const user2: User = {
    id: 2,
    company: 1,
    email: 'mail@gmail.com',
    first_name: 'George',
    last_name: 'Costanza',
    is_staff: true,
  };

  it('should create a normalized list of users from an array of user objects', () => {
    const users: User[] = [user1, user2];
    const normalized = normalizeUsers(users);

    expect(normalized).toEqual({
      result: [1, 2],
      entities: {
        users: {
          1: user1,
          2: user2,
        },
      },
    });
  });
});
