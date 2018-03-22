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
import {
  ComponentClass,
  connect,
} from 'react-redux';
import {
  InjectedRouter,
  LocationDescriptor,
  withRouter,
} from 'react-router';

// Local
import { SearchView } from '../components/SearchView';
import { changeView, fetchResults } from '../actions/searchQueryActions';
import {
  getNestedContainers,
  getNestedDistilleries,
  getFields,
} from '../../distilleries/reducers/distilleryStoreSelectors';
import {
  DispatchToProps,
  StateToProps,
} from '../../common/types/Redux';
import { fetchDistilleries } from '../../distilleries/actions/distilleryStoreActions';
import { ContainerNested } from '../../containers/types/Container';
import { DistilleryNested } from '../../distilleries/types/Distillery';
import { Field } from '../../cyphon/types/Response';
import { SearchQueryView } from '../actions/searchQueryActions';
import { SearchAlertResultsContainer } from './SearchAlertResultsContainer';
import { SearchRouteURLQuery } from '../types/Time';
import { SearchResultsContainer } from './SearchResultsContainer';
import { SearchQuery } from '../types/Search';
import { RELATIVE_TIME_OPTIONS } from '../services/relativeTimeOptions';

interface ContainerProps {
  location: LocationDescriptor;
  router: InjectedRouter;
}

interface ValueProps {
  containers: ContainerNested[];
  distilleries: DistilleryNested[];
  fields: Field[];
  query?: SearchQuery;
  location: LocationDescriptor;
  alertResultCount: number;
  resultCount: number;
  view: SearchQueryView;
  isLoading: boolean;
  isQueryValid: boolean;
  router: InjectedRouter;
}

interface FunctionProps {
  fetchContainerResources(): any;
  search(query: string, after?: string, before?: string): any;
  changeView(view: SearchQueryView): any;
}

type Props = ValueProps & FunctionProps;

class Container extends React.Component<Props> {
  static VIEWS = {
    [SearchQueryView.Alerts]: <SearchAlertResultsContainer />,
    [SearchQueryView.Data]: <SearchResultsContainer />,
  };

  componentWillMount() {
    const urlQuery = this.props.location.query as SearchRouteURLQuery;

    this.props.fetchContainerResources();

    let after = urlQuery.after;
    let before = urlQuery.before;

    if (urlQuery.query) {
      if (urlQuery.relative) {
        const time = RELATIVE_TIME_OPTIONS[urlQuery.relative]();

        after = time.after;
        before = time.before;
      } else if (!before && !after) {
        const time = RELATIVE_TIME_OPTIONS['past-hour']();

        after = time.after;
        before = time.before;
      }
      this.props.search(urlQuery.query, after, before);
    }
  }

  componentWillReceiveProps(props: Props) {
    const nextURLQuery = props.location.query as SearchRouteURLQuery;

    if (!nextURLQuery.query) { return; }

    const currentURLQuery = this.props.location.query as SearchRouteURLQuery;
    let after = nextURLQuery.after;
    let before = nextURLQuery.before;

    if (
      currentURLQuery.query !== nextURLQuery.query ||
      nextURLQuery.after !== currentURLQuery.after ||
      nextURLQuery.before !== currentURLQuery.before ||
      nextURLQuery.relative !== currentURLQuery.relative
    ) {
      if (nextURLQuery.relative) {
        const time = RELATIVE_TIME_OPTIONS[nextURLQuery.relative]();

        after = time.after;
        before = time.before;
      } else if (!before && !after) {
        const time = RELATIVE_TIME_OPTIONS['past-hour']();

        after = time.after;
        before = time.before;
      }

      this.props.search(nextURLQuery.query, after, before);
    }
  }

  /**
   * Changes the current search query in the URL parameters.
   * @param {string} query
   */
  changeSearchQuery = (query: string): void => {
    const params = this.props.location.query as SearchRouteURLQuery;

    this.props.router.push({
      pathname: this.props.location.pathname,
      query: {
        query,
        after: params.after,
        before: params.before,
        relative: params.relative,
      },
    });
  };

  /**
   * Changes the current time filter parameters in the url parameters.
   * @param {string} after
   * @param {string} before
   */
  changeAbsoluteTime = (after?: string, before?: string) => {
    const query = (this.props.location.query as SearchRouteURLQuery).query;

    this.props.router.push({
      pathname: this.props.location.pathname,
      query: { after, before, query },
    });
  };

  changeRelativeTime = (relative: string) => {
    const query = (this.props.location.query as SearchRouteURLQuery).query;

    this.props.router.push({
      pathname: this.props.location.pathname,
      query: { query, relative },
    });
  };

  render() {
    const query = this.props.location.query as SearchRouteURLQuery;
    const relative = !query.after && !query.before && !query.relative
      ? 'past-hour'
      : query.relative;

    return (
      <SearchView
        containers={this.props.containers}
        distilleries={this.props.distilleries}
        initialQuery={query.query || ''}
        fields={this.props.fields}
        alertResultCount={this.props.alertResultCount}
        resultCount={this.props.resultCount}
        view={this.props.view}
        after={query.after}
        before={query.before}
        relative={relative}
        isLoading={this.props.isLoading}
        queryObject={this.props.query}
        isQueryValid={this.props.isQueryValid}
        changeQuery={this.changeSearchQuery}
        changeView={this.props.changeView}
        onAbsoluteTimeChange={this.changeAbsoluteTime}
        onRelativeTimeChange={this.changeRelativeTime}
      >
        {Container.VIEWS[this.props.view]}
      </SearchView>
    );
  }
}

// --------------------------------------------------------------------------
// Container
// --------------------------------------------------------------------------

const values: StateToProps<ValueProps, ContainerProps> = (state, props) => ({
  containers: getNestedContainers(state.distilleryStore),
  distilleries: getNestedDistilleries(state.distilleryStore),
  fields: getFields(state.distilleryStore),
  query: state.searchQuery.queryObject,
  alertResultCount: state.alertSearchResults.count,
  resultCount: state.searchResults.count,
  view: state.searchQuery.view,
  isQueryValid: state.searchQuery.isValid,
  isLoading: state.searchQuery.isLoading,
  total: state.alertSearchResults.count + state.searchResults.count,
  location: props.location,
  router: props.router,
});

const functions: DispatchToProps<FunctionProps, ContainerProps> = dispatch => ({
  fetchContainerResources: () => dispatch(fetchDistilleries()),
  search: (query: string, after?: string, before?: string) => {
    return dispatch(fetchResults(query, after, before));
  },
  changeView: (view: SearchQueryView) => dispatch(changeView(view)),
});

export const SearchViewContainer: ComponentClass<ContainerProps> = withRouter(
  connect(values, functions)(Container),
);
