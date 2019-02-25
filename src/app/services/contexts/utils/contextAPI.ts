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
import { CancelToken } from 'axios';

// Local
import * as cyphonAPI from '../../cyphon/utils/cyphonAPI';
import { Context, ContextSearchParams, ContextFilter } from '../types';
import { Result } from '../../../types/result';
import { APIList } from '../../cyphon/types';

/**
 * Searches a context for results that match the given result ID.
 * @param contextId ID of the context to search.
 * @param params Parameters to search with.
 * @param cancelToken Cancel token to cancel the request with.
 * @returns {Promise<APIList<Result>>}
 */
export function searchContext(
  contextId: number,
  params: ContextSearchParams,
  cancelToken?: CancelToken,
): Promise<APIList<Result>> {
  return cyphonAPI.get(
    `/contexts/${contextId}/related-data-by-id/`,
    { params, cancelToken },
  );
}
