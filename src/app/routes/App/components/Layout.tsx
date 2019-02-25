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
import { LocationDescriptor } from 'react-router';

// Local
import { Header } from './Header';
import { ErrorPopupContainer } from '../containers/ErrorPopupContainer';
import { VersionMatchError } from '~/routes/App/components/VersionMatchError';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties passed in from the parent component. */
export interface ValueProps {
  /** react-router location descriptor. */
  location: LocationDescriptor;
}

/** Properties that are functions. */
export interface FunctionProps {
  /** Activates chrome push notifications. */
  activateNotifications(): void;
}

/** Combined property interfaces. */
type Props = FunctionProps & ValueProps;

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Main page layout for the application.
 */
export class Layout extends React.Component<Props, {}> {
  public componentWillMount(): void {
    this.props.activateNotifications();
  }

  public render(): JSX.Element {
    return (
      <div className="flex-box flex-box--column">
        <div className="flex-item flex--shrink">
          <VersionMatchError />
          <Header location={this.props.location.pathname || ''} />
        </div>
        {this.props.children}

        <ErrorPopupContainer />
      </div>
    );
  }
}
