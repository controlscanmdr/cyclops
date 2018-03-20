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
import { RouteComponentProps, Router, withRouter } from 'react-router';
import * as classnames from 'classnames';

// Local
import { AlertDetail as AlertDetailResponse, AlertUpdateRequest } from '../types/Alert';
import { Loading } from '../../common/components/Loading';
import { AlertDetailComments } from './AlertDetailComments';
import { AlertDetailOverview } from './AlertDetailOverview';
import { AlertDetailActions } from './AlertDetailActions';
import { AlertDetailHeader } from './AlertDetailHeader';
import AlertDetailOutcome from './AlertDetailOutcome';
import {
  LocationFieldAddress,
  Markers,
  PopupGenerator,
  LocationAddressPoint,
} from '../../map/types/Map';
import { SpacedSection } from '../../common/components/SpacedSection';
import { SubTitle } from '../../common/components/SubTitle';
import { Map } from '../../map/components/Map';
import { JSONFormatter } from '../../common/components/JSONFormatter';
import { User } from '../../users/types/User';
import { AlertDataModal } from './AlertDataModal';
import { ResultIPAdresses } from '../../common/types/result';
import { Action } from '../../actions/types/Action';
import { ContainerNested } from '../../containers/types/Container';
import { currentUserIsStaff } from '../../users/services/currentUserIsStaff';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../actions/alertDetailActions';
import { MapStateToProps } from '../../common/types/MapStateToProps';
import { StoreState } from '../../app/services/store';

// Types
// --------------------------------------------------------------------------

interface RouteParams {
  // ID of the alert to view.
  alertId: string;
}

export interface Props extends RouteComponentProps<{}, RouteParams>  {
  // Alert to display detailed info on.
  alert: AlertDetailResponse | null;

  // Current list of actions to perform on the alert.
  actions: Action[];

  // List of current users.
  users: User[];

  // If the current alerts is being fetched or altered.
  loading: boolean;

  // GeoJSON markers of the current alerts location.
  markers: Markers | null;

  // Alert location, field the location was found on, and the address.
  locations: LocationFieldAddress[] | null;

  // IP addresses of the alert data.
  ipAddresses: ResultIPAdresses | null;

  // If the alert data modal is active.
  modalActive: boolean;

  // Error message related to the alert detail.
  error: string[];

  // React router object.
  router: Router.InjectedRouter;

  // Redux dispatch function.
  dispatch: Dispatch<StoreState>;
}

// Component
// --------------------------------------------------------------------------

// Alert detail information contained in a right sidebar.
export class AlertDetail extends React.Component<Props, {}> {
  /**
   * Popup generator for the map.
   * @param feature
   */
  static popupGenerator: PopupGenerator = (feature: GeoJSON.Feature<LocationAddressPoint>) => (
    `<b>Field:</b> ${feature.properties.field}<br />` +
    `<b>Address:</b> ${feature.properties.address}`
  );

  /**
   * Retrieves the alerts data of the currently selected alerts.
   */
  componentWillMount(): void {
    this.fetchAlert(this.getAlertId());
  }

  /**
   * Compares the current alerts elementId with the previous alerts
   * elementId and fetches a new alert if the two don't match.
   * @param {Object} nextProps The next passed in properties.
   */
  componentWillReceiveProps(nextProps: Props) {
    const currentAlertId = this.getAlertId();
    const newAlertId = parseInt(nextProps.routeParams!.alertId, 10);

    if (currentAlertId !== newAlertId) { this.fetchAlert(newAlertId); }
  }

  /**
   * Removes the current alerts information from the redux store when
   * the component unmounts.
   */
  componentWillUnmount() {
    this.closeAlert();
  }

  /**
   * Clears the currently selected alert from the redux store.
   */
  closeAlert = (): void => {
    this.props.dispatch(actions.closeAlert());
  };

  /**
   * Fetches the current alert to view.
   * @param {number} alertId
   */
  fetchAlert = (alertId: number): void => {
    this.props.dispatch(actions.fetchAlert(alertId));
  };

  /**
   * Adds a comment to the currently selected alert.
   * @param {string} comment
   */
  addComment = (comment: string): void => {
    this.props.dispatch(actions.addAlertDetailComment(this.getAlertId(), comment));
  };

  /**
   * Closes the alert detail data modal.
   */
  closeDataModal = (): void => {
    this.props.dispatch(actions.closeDataModal());
  };

  /**
   * Performs an action on the currently selected alert detail.
   * @param {number} actionId
   */
  performAction = (actionId: number) => {
    this.props.dispatch(actions.performAlertDetailAction(this.getAlertId(), actionId));
  };

  /**
   * Closes the error messages related to the alert detail.
   */
  closeErrorMessage = () => {
    this.props.dispatch(actions.closeErrorMessage());
  };

  /**
   * Updates the currently selected alert detail.
   * @param {AlertUpdateRequest} update
   */
  updateAlert = (update: AlertUpdateRequest): void => {
    if (!this.props.alert) return;

    this.props.dispatch(actions.updateAlert(this.props.alert, update));
  };

  /**
   * Gets the alert ID based on the current route parameters.
   */
  getAlertId = (): number => {
    return parseInt(this.props.routeParams!.alertId, 10);
  };

  /**
   * Changes the url to the base alerts list url with the current
   * alerts search parameters in the url.
   */
  dismissAlert = (): void => {
    this.props.router.push({
      pathname: '/alerts/',
      query: this.props.location!.query,
    });
  };

  /**
   * Render a map that shows the alert detail locations.
   * @returns {JSX.Element | null}
   */
  renderMap = (): JSX.Element | null => {
    return this.props.markers ? (
      <SpacedSection>
        <SubTitle>
          Locations
          <span className="text--base"> {this.props.markers.features.length}</span>
        </SubTitle>
        <Map
          controls={true}
          markers={this.props.markers}
          options={{ scrollZoom: false }}
          popupGenerator={AlertDetail.popupGenerator}
        />
      </SpacedSection>
    ) : null;
  };

  /**
   * Renders the alert detail comments.
   * @returns {JSX.Element | null}
   */
  renderComments = (): JSX.Element | null => {
    return this.props.alert && currentUserIsStaff() ? (
      <AlertDetailComments
        comments={this.props.alert.comments}
        onSubmit={this.addComment}
      />
    ) : null;
  };

  /**
   * Gets the container from the alert detail.
   * @returns {ContainerNested | undefined}
   */
  getAlertContainer = (): ContainerNested | undefined => {
    if (!this.props.alert) return;

    return this.props.alert.distillery
      ? this.props.alert.distillery.container
      : undefined;
  };

  /**
   * Opens the alert detail data modal.
   */
  openDataModal = (): void => {
    if (!this.props.alert) return;

    const container = this.getAlertContainer();

    if (!container) return;

    this.props.dispatch(actions.openDataModal(this.props.alert.data, container));
  };

  /**
   * Renders the alert detail header.
   * @returns {JSX.Element | null}
   */
  renderHeader = (): JSX.Element | null => {
    if (!this.props.alert) return null;

    const container = this.getAlertContainer();

    return this.props.alert ? (
      <AlertDetailHeader
        alertId={this.props.alert.id}
        disableAnalyzeButton={!container}
        level={this.props.alert.level}
        onClose={this.dismissAlert}
        onAnalyze={this.openDataModal}
      />
    ) : null;
  };

  /**
   * Renders the main alert detail content.
   * @returns {JSX.Element | null}
   */
  renderContent = (): JSX.Element | null => {
    return this.props.alert ? (
      <div className="flex-item content">
        <div className="spacing-section">
          <h3 className="sub-title">Title</h3>
          <div>{this.props.alert.title}</div>
        </div>

        <AlertDetailOverview
          alert={this.props.alert}
          onUpdate={this.updateAlert}
          users={this.props.users}
        />

        {this.renderMap()}

        <AlertDetailOutcome alert={this.props.alert} />

        {this.renderComments()}

        <AlertDetailActions
          actions={this.props.actions}
          dispatches={this.props.alert.dispatches}
          onSubmit={this.performAction}
        />

        <SpacedSection>
          <SubTitle>Data</SubTitle>
          <JSONFormatter json={this.props.alert.data} open={5} />
        </SpacedSection>

        <AlertDataModal
          alert={this.props.alert}
          active={this.props.modalActive}
          locations={this.props.locations}
          ipAddresses={this.props.ipAddresses}
          markers={this.props.markers}
          onClose={this.closeDataModal}
        />

      </div>
    ) : null;
  };

  /**
   * Renders any alert detail specific errors.
   * @returns {JSX.Element | null}
   */
  renderErrors = (): JSX.Element | null => {
    if (!this.props.error.length) return null;

    const classes = classnames(
      'flex-item',
      'flex--shrink',
      'alert-detail__errors',
      `alert-detail__errors--${this.props.alert ? this.props.alert.level.toLowerCase() : ''}`,
      { 'alert-detail__errors--open': !!this.props.error.length },
    );
    const errors = this.props.error.map((detailError, index) => (
      <p key={index}>{detailError}</p>
    ));

    return this.props.error.length ? (
      <div className={classes}>
        <h3>
          Errors
          <button className="btn-close" onClick={this.closeErrorMessage}>
            <i className="fa fa-close " />
          </button>
        </h3>
        {errors}
      </div>
    ) : null;
  };

  render() {
    return (
      <section className="alert-detail flex-box flex-box--column flex--shrink">
        {this.renderHeader()}
        {this.renderErrors()}
        {this.renderContent()}
        {this.props.loading ? <Loading /> : null}
      </section>
    );
  }
}

// Container
// --------------------------------------------------------------------------

interface Container extends RouteComponentProps<{}, RouteParams> {
  // React router object.
  router: Router.InjectedRouter;
}

const mapStateToProps: MapStateToProps<Props, Container> = (state, props) => ({
  actions: state.alertList.actions,
  alert: state.alertDetail.alert,
  error: state.alertDetail.error,
  ipAddresses: state.alertDetail.ipAddresses,
  loading: state.alertDetail.loading,
  location: props.location,
  locations: state.alertDetail.locations,
  markers: state.alertDetail.markers,
  modalActive: state.alertDetail.modalActive,
  users: state.alertList.users,
});

export default withRouter(connect(mapStateToProps)(AlertDetail));

