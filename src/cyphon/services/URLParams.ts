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
import { stringify } from 'qs';

/**
 * Parameter serializer for the API request handler.
 * @param params Parameters to serialize into a string.
 * @returns {string} Serialized parameters.
 */
export function paramsSerializer(params: any): string {
  return stringify(params, { arrayFormat: 'repeat' });
}

/**
 * Serializes a url with the given parameters. If no parameters are given,
 * it returns the given url.
 * @param url Url to add parameters to.
 * @param params Parameters to add to the url.
 * @returns {string} Serialized url.
 */
export function serializeUrl(url: string, params: any): string {
  if (params) { return `${url}?${paramsSerializer(params)}`; }

  return url;
}
