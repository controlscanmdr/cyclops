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

// Local
import { Field } from '../../cyphon/types/Response';
import './SearchField.scss';

// Types
// --------------------------------------------------------------------------

interface Props {
  field: Field;
}

// Container
// --------------------------------------------------------------------------

// Displays the name of a search field to create a search filter from.
export class SearchField extends React.Component<Props, {}> {
  render() {
    return (
      <div className="SearchField">
        <span className="SearchField__Field">
          {this.props.field.field_name}
        </span>
        {' '}
        <i className="SearchField__FieldType">{this.props.field.field_type}</i>
      </div>
    );
  }
}
