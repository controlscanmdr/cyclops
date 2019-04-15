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
import * as React from 'react';
import { AxiosError } from 'axios';

// Local
import { JSONFormatter } from '../../../components/JSONFormatter';
import { getErrorType } from '../utils/getErrorType';
import {
  RUNTIME_ERROR,
  API_ERROR,
  NETWORK_ERROR,
  UNKNOWN_ERROR,
} from '../constants';
import { ErrorPopupAPIError } from './ErrorPopupAPIError';
import { StoredError } from '../types';
import { Dictionary } from '../../../types/object';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the ErrorPopupContent component. */
interface Props {
  /** Error to display. */
  error: StoredError;
}

type ErrorDisplay = (error: StoredError) => JSX.Element;

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays the content of an error that occurred in the program.
 */
export class ErrorPopupContent extends React.Component<Props, {}>  {
  /**
   * List of JSX elements that correspond to different error types.
   * @type {Dictionary<ErrorDisplay>}
   */
  public static ERROR_DISPLAYS: Dictionary<ErrorDisplay> = {
    // Network error displaying that the user has lost connection to Cyphon.
    [NETWORK_ERROR]: (error) => (
      <div>
        <h3 className="error-modal__header">Lost connection to Cyphon</h3>
        <p>
          The server may have been restarted or shut down. If you
          keep receiving this error, please try again later.
        </p>
      </div>
    ),

    // Error that occurred during runtime that wasn't caught.
    [RUNTIME_ERROR]: (error) => (
      <div>
        <h3 className="error-modal__header">Runtime Error</h3>
        <p>{error.message}</p>
        <div className="sub-title">Stack Trace</div>
        <p className="text--pre-line">{error.stack}</p>
      </div>
    ),

    // When the Cyphon API returns an error.
    [API_ERROR]: (error) => (
      <ErrorPopupAPIError error={error as AxiosError} />
    ),

    // If the error returned does not fall under any of the previous
    // categories.
    [UNKNOWN_ERROR]: (error) => (
      <div>
        <h3 className="error-modal__header">Unknown Error</h3>
        <JSONFormatter json={error} />
      </div>
    ),
  };

  public render(): JSX.Element {
    const errorType = getErrorType(this.props.error);
    const display = ErrorPopupContent.ERROR_DISPLAYS[errorType];

    return (
      <div>{display ? display(this.props.error) : null}</div>
    );
  }
}
