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
import './LoadingLine.scss';

// Types
// --------------------------------------------------------------------------

export interface Props {
  // If the icon should be shown.
  show: boolean;
  overlay?: boolean;
}

export interface State {}

// Component
// --------------------------------------------------------------------------

// Displays a loading icon with three dots.
export class LoadingLine extends React.Component<Props, State> {
  render() {
    if (!this.props.show) return null;

    const classes = classnames('LoadingLine', {
      'LoadingLine--overlay': this.props.overlay,
    });

    return (
      <div className={classes}>
        <div className="LoadingLine__Circle LoadingLine__Circle1" />
        <div className="LoadingLine__Circle LoadingLine__Circle2" />
        <div className="LoadingLine__Circle" />
      </div>
    );
  }
}
