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
import { LocationDescriptor } from 'react-router';

// Local
import { Header } from './Header';
import ErrorPopup from '../../errors/components/ErrorPopup';
import { VersionMatchError } from '../../errors/components/VersionMatchError';
import { setupNotifications } from '../actions/notificationActions';
import { MapStateToProps } from '../../common/types/MapStateToProps';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

// Types
// --------------------------------------------------------------------------

export interface Props {
  // react-router location descriptor.
  location: LocationDescriptor;

  // Redux dispatch function.
  dispatch: Dispatch<any>;
}

// Component
// --------------------------------------------------------------------------

// Main page layout for the application.
export class Layout extends React.Component<Props, {}> {
  componentWillMount(): void {
    this.props.dispatch(setupNotifications());
  }

  render(): JSX.Element {
    return (
      <div className="flex-box flex-box--column">
        <div className="flex-item flex--shrink">
          <VersionMatchError />
          <Header location={this.props.location.pathname || ''} />
        </div>

        {this.props.children}

        <ErrorPopup />
      </div>
    );
  }
}

// Container
// --------------------------------------------------------------------------

interface Container {
  // react-router location descriptor.
  location: LocationDescriptor;
}

const mapStateToProps: MapStateToProps<Props, Container> = (state, props) => ({
  location: props.location,
});

export default connect(mapStateToProps)(Layout) as React.ComponentClass<Container>;
