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

// Vendor
import { schema } from 'normalizr';

// Constants for the alerts service.

/**
 * Normalizr schema for an alert category object.
 * @type {schema.Entity}
 */
export const CATEGORY_SCHEMA = new schema.Entity('categories');

/**
 * Normalizr schema for a list of alert categories.
 * @type {schema.Array}
 */
export const CATEGORY_LIST_SCHEMA = new schema.Array(CATEGORY_SCHEMA);
