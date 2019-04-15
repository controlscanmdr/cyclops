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
import { connect } from 'react-redux';
import { Link, LocationDescriptor } from 'react-router';

// Local
import { StateToProps } from '~/store/types';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

interface ValueProps {
  query: string;
}

type Props = ValueProps & {};

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

class Container extends React.Component<Props> {
  public render() {
    const location: LocationDescriptor = {
      pathname: '/search/',
      query: { query: this.props.query || undefined },
    };

    return (
      <Link
        className="header__link"
        to={location}
        activeClassName="header__link--active"
      >
        Search
      </Link>
    );
  }
}

// --------------------------------------------------------------------------
// Container
// --------------------------------------------------------------------------

const values: StateToProps<ValueProps, {}> = (state, props) => ({
  query: state.searchQuery.query,
});

export const SearchLinkContainer: React.ComponentClass<{}> = (
  connect(values, () => ({}))(Container)
);
