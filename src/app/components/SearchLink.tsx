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
import { connect } from 'react-redux';
import { Link, LocationDescriptor } from 'react-router';

// Local
import { MapStateToProps } from '../../common/types/MapStateToProps';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Current search page query parameters.
  query: string;
}

// Component
// --------------------------------------------------------------------------

// Wrapper to react routers link that uses the previous search query for the search page.
class SearchLink extends React.Component<Props> {
  render() {
    const location: LocationDescriptor = {
      pathname: '/search/',
      query: { query: this.props.query || undefined },
    };

    return (
      <Link className="header__link" to={location} activeClassName="header__link--active">
        Search
      </Link>
    );
  }
}

// Container
// --------------------------------------------------------------------------

interface Container {}

const mapStateToProps: MapStateToProps<Props, Container> = state => ({
  query: state.searchQuery.query,
});

export default connect(mapStateToProps)(SearchLink) as React.ComponentClass<Container>;
