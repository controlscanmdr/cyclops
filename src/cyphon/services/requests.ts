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
import { Canceler } from 'axios';

// Local
import { Dictionary } from '../../common/types/object';

/**
 * Cancel functions for axios requests mapped to unique identifiers.
 * @type {Dictionary<Canceler>}
 */
const requests: Dictionary<Canceler> = {};

/**
 * Cancels a request with a cancel function.
 * @param requestID Unique identifier of the request.
 * @returns {boolean} If the request was successfully canceled.
 */
export function cancel(requestID: string): boolean {
  const request = requests[requestID];

  if (!request) { return false; }

  request();

  return true;
}

/**
 * Sets the cancel function for a request.
 * @param requestID Unique identifier of the request.
 * @param canceler The cancel function to store.
 */
export function set(requestID: string, canceler: Canceler): void {
  requests[requestID] = canceler;
}
