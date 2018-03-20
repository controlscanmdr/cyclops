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
import './Well.scss';

// Types
// --------------------------------------------------------------------------

interface Props extends React.HTMLProps<HTMLDivElement> {
  // If the well should have a lighter tone.
  isLight?: boolean;
}

// Component
// --------------------------------------------------------------------------

// Well header component.
class Header extends React.Component<React.HTMLProps<HTMLDivElement>, {}> {
  render() {
    const { className, ...props } = this.props;
    const classes = `Well__Header ${className}`;
    return <div className={classes} {...props}>{this.props.children}</div>;
  }
}

// Well content component.
class Content extends React.Component<React.HTMLProps<HTMLDivElement>, {}> {
  render() {
    const { className, ...props } = this.props;
    const classes = `Well__Content ${className}`;
    return <div className={classes} {...props}>{this.props.children}</div>;
  }
}

export class Well extends React.Component<Props, {}> {
  static Header = Header;
  static Content = Content;

  render() {
    const { className, ...props } = this.props;
    const classes = classnames('Well', className, { 'Well--light': this.props.isLight });

    return (
      <div className={classes} {...props}>{this.props.children}</div>
    );
  }
}