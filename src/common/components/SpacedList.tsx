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

// Types
// --------------------------------------------------------------------------

interface Props {
  // Classes to include on the spaced list.
  className?: string;
}

// Component
// --------------------------------------------------------------------------

// Displays list items with a title and content in a standardized tabbed format.
export class SpacedList extends React.Component<Props, {}> {
  render() {
    const classes = this.props.className
      ? `dl-horizontal ${this.props.className}`
      : 'dl-horizontal';

    return (
      <dl className={classes}>
        {this.props.children}
      </dl>
    );
  }
}
