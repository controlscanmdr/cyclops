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
import * as _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Router } from 'react-router';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Local
import { AlertList } from './AlertList';
import { AlertParams } from './AlertParams';
import {
  AlertSearchParams,
  AlertListItem,
  NormalizedCategoryList,
} from '~/services/alerts/types';
import { Distillery } from '~/services/distilleries/types';
import { User } from '~/services/users/types';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertView component that are values. */
export interface ValueProps {
  /** Alert list to display. */
  alerts: AlertListItem[];
  /** Categories to filter alerts with. */
  categories: NormalizedCategoryList;
  /** Distilleries that have alerts associated with them. */
  distilleries: Distillery[];
  /** List of all the current users. */
  users: User[];
  /** Total number of alerts matching the search parameters. */
  count: number;
  /** If alerts are loading. */
  loading: boolean;
  /** If the alerts are currently being polled. */
  polling: boolean;
  /** Polling interval. */
  interval: number;
  /** ID of the currently selected alert. */
  selectedAlert: number | null;
  /** If polling is currently enabled for the view. */
  pollingEnabled: boolean;
  /** React Router location object. */
  location: Router.LocationDescriptor;
  /** React Router injected router object. */
  router: Router.InjectedRouter;
}

/** Properties of the AlertView component that are functions. */
export interface FunctionProps {
  /**
   * Starts polling for alerts that match a set of search parameters.
   * @param params Search parameters to use.
   * @param interval Interval in ms to poll.
   */
  startPolling(
    params: AlertSearchParams,
    interval: number,
  ): any;
  /** Stops polling for alerts. */
  stopPolling(): any;
  /** Disables polling for alerts. */
  disablePolling(): any;
  /**
   * Searchs for alerts that match a set of search parameters.
   * @param params Search parameters to use.
   * @param poll If the search should be polled after it's completed.
   * @param interval Interval to poll alerts for.
   */
  searchAlerts(
    params: AlertSearchParams,
    poll?: boolean,
    interval?: number,
  ): any;
  /** Fetches the resources needed for the alert view. */
  fetchViewResources(): any;
  fetchAllCategories(): any;
}

/** Combined prop interfaces for AlertView component. */
type Props = ValueProps & FunctionProps;

// --------------------------------------------------------------------------
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
  public static SEARCH_PARAM_FIELDS = [
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
  public static getAlertViewParams(
    location: Router.LocationDescriptor,
  ): AlertSearchParams {
    const params: AlertSearchParams = _.pick(
      location.query as AlertSearchParams,
      AlertView.SEARCH_PARAM_FIELDS,
    );

    return _.assign({}, { limit: 30, offset: 0 }, params);
  };

  /**
   * Gets the current page value from a LocationDescriptor object.
   * @param location LocationDescriptor object.
   * @returns {number} Current page number.
   */
  public static getCurrentPage(location: Router.LocationDescriptor): number {
    const params = AlertView.getAlertViewParams(location);

    return ((params.offset as number) / (params.limit as number)) + 1;
  }

  /**
   * Retrieves the current user list, the current distillery list,
   * and searches for alerts based on the parameters in the url.
   */
  public componentWillMount(): void {
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
  public componentWillReceiveProps(nextProps: Props): void {
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
  public componentWillUnmount(): void {
    this.removeWindowListeners();
    this.props.stopPolling();
  }

  /**
   * Adds listeners to the window that handles blur and focus events.
   */
  public addWindowListeners = (): void => {
    window.addEventListener('blur', this.handleBlur);
    window.addEventListener('focus', this.handleFocus);
  };

  /**
   * Removes listeners on the window that handles blur and focus events.
   */
  public removeWindowListeners = (): void => {
    window.removeEventListener('blur', this.handleBlur);
    window.removeEventListener('focus', this.handleFocus);
  };

  /**
   * Handles when the window loses focus on this view.
   */
  public handleBlur = (): void => {
    const { pollingEnabled } = this.props;

    if (pollingEnabled) { this.props.stopPolling(); }
  };

  /**
   * Handles when the user focuses on this window.
   */
  public handleFocus = (): void => {
    const { pollingEnabled } = this.props;

    if (pollingEnabled) { this.startPollingWithViewParams(); }
  };

  /**
   * Updates the search parameters in the url.
   * @param newParams The new search parameters to search with.
   */
  public updateQuery = (newParams: AlertSearchParams): void => {
    const { router, location } = this.props;
    const currentParams = AlertView.getAlertViewParams(location);
    const query = _.assign({}, currentParams, newParams);

    router.push({ pathname: location.pathname, query });
  };

  /**
   * Updates the url to view the alerts detail view.
   */
  public viewAlert = (alertId: number): void => {
    this.props.router.push({
      pathname: `/alerts/${alertId}/`,
      query: this.props.location.query,
    });
  };

  /**
   * Updates the url query with a new content query parameter.
   * @param content String to change the content parameter to.
   */
  public searchContent = (content?: string) => {
    this.updateQuery({ content });
  };

  /**
   * Updates the url with a new page query parameter.
   * @param page Number to change the page parameter to.
   */
  public changePage = (page: number): void => {
    const params = AlertView.getAlertViewParams(this.props.location);
    const offset = (params.limit as number) * (page - 1);
    this.updateQuery({ offset });
  };

  /**
   * Updates the url with new query parameters.
   * @param params
   */
  public changeParams = (params: AlertSearchParams): void => {
    const query = _.assign({}, params, { offset: 0 });
    this.updateQuery(query);
  };

  /**
   * Starts a poller for alert items matching the current search parameters.
   */
  public startPollingWithViewParams = (): void => {
    const { startPolling, interval, location } = this.props;
    const params = AlertView.getAlertViewParams(location);

    startPolling(params, interval);
  };

  public render(): JSX.Element {
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
