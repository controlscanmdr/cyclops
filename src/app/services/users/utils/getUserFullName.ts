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
 * Contributor/Change Made By: Adam Stauffer.
 */

// Local
import { User } from '../types';

/**
 * Gets the full name of a user.
 * @param user
 * @returns {string}
 */
export function getUserFullName(user?: User | null): string {
  if (!user) { return 'None'; }
  if (!user.first_name || !user.last_name) { return user.email; }
  return `${user.first_name} ${user.last_name}`;
}
