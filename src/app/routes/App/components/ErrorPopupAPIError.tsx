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
import * as _ from 'lodash';
import { AxiosError } from 'axios';

// Local
import { JSONFormatter } from '../../../components/JSONFormatter';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the ErrorPopupAPIError component. */
interface Props {
  /** Error to display. */
  error: AxiosError;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays the contents of an APIError.
 */
export class ErrorPopupAPIError extends React.Component<Props, {}> {
  public render(): JSX.Element {
    const { error } = this.props;
    const method = error.config.method || '';
    const requestData = error.config.data;
    const requestDataIsString = _.isString(requestData);
    const requestDataElement = requestDataIsString
      ? requestData
      : <JSONFormatter json={requestData} open={0}/>;
    const response = error.response ? error.response : undefined;
    const responseStatus = response ? response.status : '';
    const responseText = response ? response.statusText : '';
    const responseData = response ? response.data : {};
    const responseDataIsString = _.isString(responseData);
    const responseDataElement = responseDataIsString
      ? responseData
      : <JSONFormatter json={responseData} open={0}/>;

    return (
      <div>
        <h3 className="error-modal__header">API Error</h3>
        <p>{error.message}</p>

        <h4 className="sub-title">Request</h4>
        <dl className="dl-horizontal">
          <dt>URL:</dt>
          <dd>{error.config.url}</dd>

          <dt>Method:</dt>
          <dd>{method.toUpperCase()}</dd>

          <dt>Parameters:</dt>
          <dd><JSONFormatter json={error.config.params} open={0}/></dd>

          <dt>Data:</dt>
          <dd>{requestDataElement}</dd>
        </dl>

        <h4 className="sub-title">Response</h4>
        <dl className="dl-horizontal">
          <dt>Status:</dt>
          <dd>{responseStatus} {responseText}</dd>

          <dt>Data:</dt>
          <dd>{responseDataElement}</dd>
        </dl>

        <h4 className="sub-title">Error Object</h4>
        <JSONFormatter json={error} open={0}/>
      </div>
    );
  };
}
