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
import { FontAwesome } from '../../common/components/FontAwesome';
import { capitalizeKebabCase } from '../../common/services/capitalizeKebabCase';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Time after to search for data.
  after?: string;
  // Time before to search for data.
  before?: string;
  // Relative time searching for data.
  relative?: string;
  onClick(): any;
}

// Component
// --------------------------------------------------------------------------

// Shows the time filter used to search for data.
export class SearchTimeFilterButton extends React.Component<Props, {}> {
  getTitleDisplay = (): string => {
    if (this.props.after || this.props.before) {
      return `${this.props.after || '*'} to ${this.props.before || '*'}`;
    }

    if (this.props.relative) {
      return capitalizeKebabCase(this.props.relative);
    }

    return 'None';
  };

  render() {
    return (
      <button className="btn btn-basic" onClick={this.props.onClick}>
        <FontAwesome icon="clock-o" />
        {' '}
        {this.getTitleDisplay()}
      </button>
    );
  }
}
