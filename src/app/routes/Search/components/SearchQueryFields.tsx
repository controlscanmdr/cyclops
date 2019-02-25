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
import * as classnames from 'classnames';

// Local
import { FieldParameter } from '~/services/search/types';
import { Collapsible } from '~/components/Collapsible';
import { ErrorIcon } from '~/components/ErrorIcon';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the SearchQueryFields component. */
interface Props {
  fields: FieldParameter[];
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays detailed information about the fields searched in a query.
 */
export class SearchQueryFields extends React.Component<Props, {}> {
  public render() {
    let containsErrors = false;
    const fields = this.props.fields.map((field) => {
      const classes = classnames('text--muted', {
        'alert-text--high': !!field.errors.length,
      });
      const errors = field.errors.map((error) => (
        <li className="alert-text--high">{error}</li>
      ));

      if (field.errors.length) { containsErrors = true; }

      return (
        <li className={classes}>
          {field.field_name} {field.operator} {field.value}
          {errors.length ? <ul className="list--unstyled list--bordered">{errors}</ul> : null}
        </li>
      );
    });
    const header = (
      <span>
        Fields {this.props.fields.length}{' '}
        {containsErrors ? <ErrorIcon /> : null}
      </span>
    );

    return (
      <Collapsible descriptor={header} open={containsErrors}>
        <ul className="list--unstyled">
          {fields}
        </ul>
      </Collapsible>
    );
  }
}
