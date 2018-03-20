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
import * as React from 'react';
import * as classnames from 'classnames';

// Local
import { ErrorIcon } from '../../common/components/ErrorIcon';
import './SearchQueryParameter.scss';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Value of the parameter.
  value: string;

  // Parameter field.
  parameter: string;

  // Error messages.
  errors: string[];
}

// Component
// --------------------------------------------------------------------------

export class SearchQueryParameter extends React.Component<Props, {}> {
  render() {
    const classes = classnames('SearchQueryParameter', {
      'SearchQueryParameter--error': !!this.props.errors.length,
    });
    const displayValue = this.props.errors.length
      ? this.props.parameter
      : this.props.value;
    const errors = this.props.errors.map((error) => (
      <div className="SearchQueryParameter__Error flex-box">
        <div className="flex-item flex--shrink"><ErrorIcon /></div>
        <div className="flex-item alert-icon-spacing">{error}</div>
      </div>
    ));

    return (
      <div className={classes}>{displayValue} {errors}</div>
    );
  }
}
