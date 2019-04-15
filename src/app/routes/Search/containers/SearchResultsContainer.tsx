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
import { bindActionCreators as bind } from 'redux';
import { LocationDescriptor } from 'react-router';
import { withRouter } from 'react-router';

// Local
import { DispatchToProps, StateToProps } from '~/store/types';
import { SearchResults } from '../components/SearchResults';
import { SearchRouteURLQuery } from '~/routes/Search/types';
import { DistilleryMinimal } from '~/services/distilleries/types';
import { SearchResultDistilleryContainer } from './SearchResultDistilleryContainer';
import {
  getSelectedResults,
  getSelectedResultCount,
  getSelectedResultsPage,
  getSearchResultDistilleries,
  paginateResults,
} from '~/store/searchResults';

interface ValueProps {
  results: any[];
  count: number;
  page: number;
  query: string;
  after?: string;
  before?: string;
  selectedDistilleryID: number;
  distilleries: DistilleryMinimal[];
}

interface FunctionProps {
  paginateResults(
    distilleryID: number,
    query: string,
    page: number,
    after?: string,
    before?: string,
  ): any;
}

type Props = ValueProps & FunctionProps;

class Container extends React.Component<Props> {
  public changePage = (page: number) => {
    if (!this.props.query) { return; }

    this.props.paginateResults(
      this.props.selectedDistilleryID,
      this.props.query,
      page,
      this.props.after,
      this.props.before,
    );
  };

  public render() {
    const distilleries = this.props.distilleries.map((distillery) => (
      <SearchResultDistilleryContainer distillery={distillery} />
    ));

    return (
      <SearchResults
        results={this.props.results}
        count={this.props.count}
        page={this.props.page}
        onPaginate={this.changePage}
        distilleries={distilleries}
      />
    );
  }
}

const values: StateToProps<ValueProps, {}> = (state, props) => ({
  results: getSelectedResults(state.searchResults),
  count: getSelectedResultCount(state.searchResults),
  page: getSelectedResultsPage(state.searchResults),
  after: state.searchQuery.after,
  before: state.searchQuery.before,
  distilleries: getSearchResultDistilleries(state.searchResults),
  selectedDistilleryID: state.searchResults.selectedDistilleryID,
  query: state.searchQuery.query,
});

const functions: DispatchToProps<FunctionProps, {}> = (dispatch) => ({
  paginateResults: bind(paginateResults, dispatch),
});

export const SearchResultsContainer: React.ComponentClass<{}> = (
  connect(values, functions)(Container)
);
