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

import * as React from 'react';
import * as classnames from 'classnames';

import './Well.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {
  isLight?: boolean;
}

class Header extends React.Component<React.HTMLProps<HTMLDivElement>, {}> {
  public render() {
    const { className, ...props } = this.props;
    const classes = `Well__Header ${className}`;
    return <div className={classes} {...props}>{this.props.children}</div>;
  }
}

class Content extends React.Component<React.HTMLProps<HTMLDivElement>, {}> {
  public render() {
    const { className, ...props } = this.props;
    const classes = `Well__Content ${className}`;
    return <div className={classes} {...props}>{this.props.children}</div>;
  }
}

export class Well extends React.Component<Props, {}> {
  public static Header = Header;
  public static Content = Content;
  public render() {
    const { className, ...props } = this.props;
    const classes = classnames('Well', {
      'Well--light': this.props.isLight,
    }, className);

    return (
      <div className={classes} {...props}>{this.props.children}</div>
    );
  }
}