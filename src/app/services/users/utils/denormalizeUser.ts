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
import { denormalize } from 'normalizr';

// Local
import {
  NormalizedUserList,
  User,
} from '../types';
import { USER_SCHEMA } from '../constants';

/**
 * Denormalizes a user object from a list of user objects.
 * @param users Normalized user list.
 * @param user ID of the user to retrieve.
 * @returns {User | undefined} User object or undefined.
 */
export function denormalizeUser(
  users: NormalizedUserList,
  user: number,
): User | undefined {
  return denormalize(user, USER_SCHEMA, users.entities);
}
