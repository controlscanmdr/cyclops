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
import * as _ from 'lodash';
import { InjectedRouter, LocationDescriptor, Router, withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Local
import { AlertList } from './AlertList';
import { AlertParams } from './AlertParams';
import {
  AlertSearchParams,
  AlertListItem,
  NormalizedCategoryList,
} from '../types/Alert';
import { Distillery } from '../../distilleries/types/Distillery';
import { User } from '../../users/types/User';
import { MapDispatchToProps } from '../../common/types/MapDispatchToProps';
import { fetchAllCategories } from '../../actions/state/categoryStoreActions';
import * as actions from '../actions/alertListActions';
import { MapStateToProps } from '../../common/types/MapStateToProps';

// Types
// --------------------------------------------------------------------------

export interface Props {
  // Alert list to display.
  alerts: AlertListItem[];

  // Categories to filter alerts with.
  categories: NormalizedCategoryList;

  // Distilleries that have alerts associated with them.
  distilleries: Distillery[];

  // List of all the current users.
  users: User[];

  // Total number of alerts matching the search parameters.
  count: number;

  // If alerts are loading.
  loading: boolean;

  // If the alerts are currently being polled.
  polling: boolean;

  // Polling interval.
  interval: number;

  // ID of the currently selected alert.
  selectedAlert: number | null;

  // If polling is currently enabled for the view.
  pollingEnabled: boolean;

  // React Router location object.
  location: Router.LocationDescriptor;

  // React Router injected router object.
  router: Router.InjectedRouter;

  /**
   * Starts polling for alerts that match a set of search parameters.
   * @param params Search parameters to use.
   * @param interval Interval in ms to poll.
   */
  startPolling(params: AlertSearchParams, interval: number): any;

  // Stops polling for alerts.
  stopPolling(): any;

  // Disables polling for alerts.
  disablePolling(): any;

  /**
   * Searchs for alerts that match a set of search parameters.
   * @param params Search parameters to use.
   * @param poll If the search should be polled after it's completed.
   * @param interval Interval to poll alerts for.
   */
  searchAlerts(params: AlertSearchParams, poll?: boolean, interval?: number): any;

  // Fetches the resources needed for the alert view.
  fetchViewResources(): any;
  fetchAllCategories(): any;
}

// Component
// --------------------------------------------------------------------------

/**
 * Main alerts view with alerts searching and detail view.
 */
export class AlertView extends React.Component<Props, {}> {
  /**
   * Search fields found in the route parameters.
   * @type {string[]}
   */
  static SEARCH_PARAM_FIELDS = [
    'categories',
    'level',
    'status',
    'assigned_user',
    'collection',
    'content',
    'limit',
    'offset',
    'before',
    'after',
  ];

  /**
   * Get the alert view url parameters from a LocationDescriptor object.
   * @param location LocationDescriptor object.
   * @returns {AlertSearchParams}
   */
  static getAlertViewParams(location: Router.LocationDescriptor): AlertSearchParams {
    const params: AlertSearchParams = _.pick(
      location.query as AlertSearchParams,
      AlertView.SEARCH_PARAM_FIELDS,
    );

    return _.assign({}, { limit: 30, offset: 0 }, params);
  }

  /**
   * Gets the current page value from a LocationDescriptor object.
   * @param location LocationDescriptor object.
   * @returns {number} Current page number.
   */
  static getCurrentPage(location: Router.LocationDescriptor): number {
    const params = AlertView.getAlertViewParams(location);

    return ((params.offset as number) / (params.limit as number)) + 1;
  }

  /**
   * Retrieves the current user list, the current distillery list,
   * and searches for alerts based on the parameters in the url.
   */
  componentWillMount(): void {
    const query = AlertView.getAlertViewParams(this.props.location);

    this.addWindowListeners();
    this.props.fetchViewResources();
    this.props.fetchAllCategories();
    this.props.searchAlerts(
      query,
      this.props.pollingEnabled,
      this.props.interval,
    );
  }

  /**
   * Searches for new alerts if the url query has changed.
   * @param {Object} nextProps The next props being passed in.
   */
  componentWillReceiveProps(nextProps: Props): void {
    const currentParams = AlertView.getAlertViewParams(this.props.location);
    const newQuery = AlertView.getAlertViewParams(nextProps.location);

    if (!_.isEqual(currentParams, newQuery)) {
      this.props.searchAlerts(
        newQuery,
        this.props.pollingEnabled,
        this.props.interval,
      );
    }
  }

  /**
   * Removes window listeners and stops aler list polling.
   */
  componentWillUnmount(): void {
    this.removeWindowListeners();
    this.props.stopPolling();
  }

  /**
   * Adds listeners to the window that handles blur and focus events.
   */
  addWindowListeners = (): void => {
    window.addEventListener('blur', this.handleBlur);
    window.addEventListener('focus', this.handleFocus);
  };

  /**
   * Removes listeners on the window that handles blur and focus events.
   */
  removeWindowListeners = (): void => {
    window.removeEventListener('blur', this.handleBlur);
    window.removeEventListener('focus', this.handleFocus);
  };

  /**
   * Handles when the window loses focus on this view.
   */
  handleBlur = (): void => {
    const { pollingEnabled } = this.props;

    if (pollingEnabled) { this.props.stopPolling(); }
  };

  /**
   * Handles when the user focuses on this window.
   */
  handleFocus = (): void => {
    const { pollingEnabled } = this.props;

    if (pollingEnabled) { this.startPollingWithViewParams(); }
  };

  /**
   * Updates the search parameters in the url.
   * @param newParams The new search parameters to search with.
   */
  updateQuery = (newParams: AlertSearchParams): void => {
    const { router, location } = this.props;
    const currentParams = AlertView.getAlertViewParams(location);
    const query = _.assign({}, currentParams, newParams);

    router.push({ query, pathname: location.pathname });
  };

  /**
   * Updates the url to view the alerts detail view.
   */
  viewAlert = (alertId: number): void => {
    this.props.router.push({
      pathname: `/alerts/${alertId}/`,
      query: this.props.location.query,
    });
  };

  /**
   * Updates the url query with a new content query parameter.
   * @param content String to change the content parameter to.
   */
  searchContent = (content?: string) => {
    this.updateQuery({ content });
  };

  /**
   * Updates the url with a new page query parameter.
   * @param page Number to change the page parameter to.
   */
  changePage = (page: number): void => {
    const params = AlertView.getAlertViewParams(this.props.location);
    const offset = (params.limit as number) * (page - 1);
    this.updateQuery({ offset });
  };

  /**
   * Updates the url with new query parameters.
   * @param params
   */
  changeParams = (params: AlertSearchParams): void => {
    const query = _.assign({}, params, { offset: 0 });
    this.updateQuery(query);
  };

  /**
   * Starts a poller for alert items matching the current search parameters.
   */
  startPollingWithViewParams = (): void => {
    const { startPolling, interval, location } = this.props;
    const params = AlertView.getAlertViewParams(location);

    startPolling(params, interval);
  };

  render(): JSX.Element {
    const currentPage = AlertView.getCurrentPage(this.props.location);
    const params = AlertView.getAlertViewParams(this.props.location);

    return (
      <div className="flex-box">
        <AlertParams
          params={params}
          categories={this.props.categories}
          users={this.props.users}
          distilleries={this.props.distilleries}
          changeParams={this.changeParams}
        />

        <AlertList
          alerts={this.props.alerts}
          count={this.props.count}
          content={params.content}
          limit={params.limit || 30}
          loading={this.props.loading}
          pollingEnabled={this.props.polling}
          selectedAlert={this.props.selectedAlert}
          startPoller={this.startPollingWithViewParams}
          stopPoller={this.props.disablePolling}
          changePage={this.changePage}
          page={currentPage}
          searchContent={this.searchContent}
          viewAlert={this.viewAlert}
        />

        {this.props.children}
      </div>
    );
  }
}

// Container
// --------------------------------------------------------------------------

interface Container {
  location: LocationDescriptor;
  router: InjectedRouter;
}

const mapStateToProps: MapStateToProps<Props, Container> = (state, props) => ({
  alerts: state.alertList.alerts,
  categories: state.categoryStore,
  count: state.alertList.count,
  distilleries: state.alertList.distilleries,
  interval: state.alertList.interval,
  loading: state.alertList.loading,
  location: props.location,
  polling: state.alertList.polling,
  pollingEnabled: state.alertList.pollingEnabled,
  router: props.router,
  selectedAlert: state.alertDetail.alertId,
  users: state.alertList.users,
});

const mapDispatchToProps: MapDispatchToProps<Props, Container> = dispatch => ({
  fetchAllCategories: bindActionCreators(fetchAllCategories, dispatch),
  disablePolling: bindActionCreators(actions.disablePolling, dispatch),
  fetchViewResources: bindActionCreators(actions.fetchViewResources, dispatch),
  searchAlerts: bindActionCreators(actions.searchAlerts, dispatch),
  startPolling: bindActionCreators(actions.pollAlerts, dispatch),
  stopPolling: bindActionCreators(actions.stopPolling, dispatch),
});

const container = withRouter(connect(mapStateToProps, mapDispatchToProps)(AlertView));

export default container as React.ComponentClass<Container>;
