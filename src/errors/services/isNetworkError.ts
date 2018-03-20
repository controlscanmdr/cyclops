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
import * as _ from 'lodash';
import { AxiosError } from 'axios';

// Local
import { isApiError } from './isApiError';

/**
 * Determines if the given error is a network error from axios.
 * @param {Error} error The error to check.
 * @return {Boolean} Whether the error is a network error.
 */
export function isNetworkError(error: Error | AxiosError): boolean {
  if (!isApiError(error)) { return false; }

  const responseIsUndefined = _.isEqual(
    (<AxiosError> error).response, undefined,
  );
  const hasNetworkErrorMessage = _.isEqual(
    (<AxiosError> error).message, 'Network Error',
  );

  return responseIsUndefined && hasNetworkErrorMessage;
}
