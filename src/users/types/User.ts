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
import {
  NormalizedList,
  NormalizedEntity,
} from '../../common/types/normalizr';

// User object from the cyphon API.
export interface User {
  // Unique identifier of the user object.
  id: number;

  // Company the user is associated with.
  company: number;

  // Email of the user.
  email: string;

  // First name of the user.
  first_name: string;

  // Last name of the user.
  last_name: string;

  // If the user has access to staff functionality.
  is_staff: boolean;
}

// Normalized user entity.
export interface NormalizedUserEntity {
  users: NormalizedEntity<User>;
}

// Normalized list of user entities.
export type NormalizedUserList = NormalizedList<number, NormalizedUserEntity>;
