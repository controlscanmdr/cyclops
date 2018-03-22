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
import * as cache from 'memory-cache';

// Local
import { APIConfig } from '../types/Response';
import { serializeUrl } from './URLParams';

/**
 * Caches an Promise.
 * @param config Configuration of the request.
 * @param promise Promise to be cached.
 * @returns {boolean} If the action was successful.
 */
export function set(config: APIConfig, promise: Promise<any>): void {
  const url = serializeUrl((config.url as string), config.params);

  cache.put(url, promise);
}

/**
 * Gets a cached Promise.
 * @param config Configuration used to make the cached request.
 * @returns {Promise<any> | undefined} Cached Promise.
 */
export function get<T>(config: APIConfig): Promise<T> | null {
  const url = serializeUrl((config.url as string), config.params);

  return cache.get(url);
}

/**
 * Remove a cached Promise.
 * @param config Configuration used to make the cached request.
 * @returns {boolean} If the action was successful.
 */
export function remove(config: APIConfig) {
  const url = serializeUrl((config.url as string), config.params);

  cache.del(url);
}
