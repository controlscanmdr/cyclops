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
import { bindActionCreators as bind } from 'redux';
import { connect } from 'react-redux';

// Local
import { DispatchToProps, StateToProps } from '../../common/types/Redux';
import { SearchAlertResults } from '../components/SearchAlertResults';
import { AlertDetail } from '../../alerts/types/Alert';
import { InjectedRouter, LocationDescriptor } from 'react-router';
import { paginateAlertResults } from '../actions/alertSearchResultsActions';
import { withRouter } from 'react-router';

interface ContainerProps {
  router: InjectedRouter;
  location: LocationDescriptor;
}

interface ValueProps {
  page: number;
  count: number;
  query: string;
  after?: string;
  before?: string;
  results: AlertDetail[];
  router: InjectedRouter;
}

interface FunctionProps {
  paginateResults(
    query: string,
    page: number,
    after?: string,
    before?: string,
  ): any;
}

type Props = ValueProps & FunctionProps;

class Container extends React.Component<Props> {
  onAlertClick = (alertID: number) => {
    this.props.router.push({ pathname: `/alerts/${alertID}/` });
  };

  onPaginate = (page: number) => {
    if (!this.props.query) { return; }

    this.props.paginateResults(
      this.props.query,
      page,
      this.props.after,
      this.props.before,
    );
  };

  render() {
    return (
      <SearchAlertResults
        page={this.props.page}
        count={this.props.count}
        results={this.props.results}
        onAlertClick={this.onAlertClick}
        onPaginate={this.onPaginate}
      />
    );
  }
}

const values: StateToProps<ValueProps, ContainerProps> = (state, props) => ({
  page: state.alertSearchResults.page,
  count: state.alertSearchResults.count,
  results: state.alertSearchResults.results,
  after: state.searchQuery.after,
  before: state.searchQuery.before,
  router: props.router,
  query: state.searchQuery.query,
});

const functions: DispatchToProps<FunctionProps, ContainerProps> = (dispatch) => ({
  paginateResults: bind(paginateAlertResults, dispatch),
});

export const SearchAlertResultsContainer: React.ComponentClass<{}> = (
  withRouter(connect(values, functions)(Container))
);
