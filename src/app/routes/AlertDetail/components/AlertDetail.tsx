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
import { Router } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as classnames from 'classnames';

// Local
import {
  Alert,
  AlertDetail as AlertDetailResponse,
  AlertOutcomeChoices,
  AlertUpdateRequest,
} from '../../../services/alerts/types';
import { Loading } from '../../../components/Loading';
import { AlertDetailComments } from './AlertDetailComments';
import { AlertDetailOverview } from './AlertDetailOverview';
import { AlertDetailActions } from './AlertDetailActions';
import { AlertDetailAnalysis } from './AlertDetailAnalysis';
import { AlertDetailHeader } from './AlertDetailHeader';
import { AlertDetailOutcomeContainer } from '../containers/AlertDetailOutcomeContainer';
import {
  LocationFieldAddress,
  Markers,
  PopupGenerator,
  LocationAddressPoint,
} from '../../../services/map/types';
import { SpacedSection } from '../../../components/SpacedSection';
import { SubTitle } from '../../../components/SubTitle';
import { Map } from '../../../services/map/components/Map';
import { JSONFormatter } from '../../../components/JSONFormatter';
import {
  StateToProps,
  DispatchToProps,
} from '../../../store/types';
import { User } from '../../../services/users/types';
import { AlertDataModal } from './AlertDataModal';
import { ResultIPAdresses, Result } from '../../../types/result';
import {
  addAlertDetailComment,
  closeAlert,
  openDataModal,
  performAlertDetailAction,
  updateAlertDetail,
  fetchAlertDetail,
  closeDataModal,
  addErrorMessage,
  closeErrorMessage,
} from '../../../store/alertDetail/alertDetailActions';
import { Action } from '../../../services/actions/types';
import { ContainerNested } from '../../../services/containers/types';
import { getConfig } from '~/config';

/** Properties of the AlertDetail component that are values. */
export interface ValueProps {
  /** Alert to display detailed info on. */
  alert: AlertDetailResponse | null;
  /** Current list of actions to perform on the alert. */
  actions: Action[];
  /** List of current users. */
  users: User[];
  /** If the current alerts is being fetched or altered. */
  loading: boolean;
  /** GeoJSON markers of the current alerts location. */
  markers: Markers | null;
  /** Alert location, field the location was found on, and the address. */
  locations: LocationFieldAddress[] | null;
  /** IP addresses of the alert data. */
  ipAddresses: ResultIPAdresses | null;
  /** If the alert data modal is active. */
  modalActive: boolean;
  /** Error message related to the alert detail. */
  error: string[];
  /** React router location. */
  location: Router.LocationDescriptor;
  /** React router route parameters. */
  routeParams: RouteParams;
  /** React router object. */
  router: Router.InjectedRouter;
}

/** Properties of the AlertDetail component that are functions. */
export interface FunctionProps {
  /**
   * Adds a comment to the alert.
   * @param alertId ID of the alert to add the comment to.
   * @param comment Comment to add to the alert.
   */
  addComment(alertId: number, comment: string): any;
  /** Closes the alert detail. */
  closeAlert(): any;
  /** Closes the modal used to analyze the alert data. */
  closeDataModal(): any;
  /** Closes any alert update error messages. */
  closeErrorMessage(): any;
  /**
   * Opens a modal used to analyze the alert data.
   * @param data Data to analyze.
   * @param container Related container to the data.
   */
  openDataModal(data: Result, container: ContainerNested): any;
  /**
   * Performs an action on the alert.
   * @param alertId ID of the alert to perform the action on.
   * @param actionId ID of the action to perform.
   */
  performAction(alertId: number, actionId: number): any;
  /**
   * Updates the fields of the alert.
   * @param alert Alert object to update the files of.
   * @param fields Fields to update.
   */
  updateAlert(alert: Alert, fields: AlertUpdateRequest): any;
  /**
   * Fetches the alerts from the API to display.
   * @param alertId
   */
  viewAlert(alertId: number): any;
}

/**
 * Properties of the AlertDetail component that are passed in from the
 * wrapped container object.
 */
interface OwnProps {
  /** React router location. */
  location: Router.LocationDescriptor;
  /** React router route parameters. */
  routeParams: RouteParams;
  /** React router object. */
  router: Router.InjectedRouter;
}

// Combined value and function properties of AlertDetail.
type Props = ValueProps & FunctionProps;

/**
 * URL parameters passed in from react-router
 */
interface RouteParams {
  /** ID of the alert to view. */
  alertId: string;
}

/**
 * Displays detailed alert information in a sidebar.
 */
export class AlertDetail extends React.Component<Props, {}> {
  /**
   * Popup generator for the map.
   * @param feature
   */
  public static popupGenerator: PopupGenerator = (
    feature: GeoJSON.Feature<LocationAddressPoint>,
  ) => (
    `<b>Field:</b> ${feature.properties.field}<br />` +
    `<b>Address:</b> ${feature.properties.address}`
  );

  /**
   * Retrieves the alerts data of the currently selected alerts.
   */
  public componentWillMount(): void {
    this.props.viewAlert(this.getAlertId());
  }

  /**
   * Compares the current alerts elementId with the previous alerts
   * elementId and fetches a new alert if the two don't match.
   * @param {Object} nextProps The next passed in properties.
   */
  public componentWillReceiveProps(nextProps: Props) {
    const currentAlertId = this.getAlertId();
    const newAlertId = parseInt(nextProps.routeParams.alertId, 10);

    if (currentAlertId !== newAlertId) { this.props.viewAlert(newAlertId); }
  }

  /**
   * Removes the current alerts information from the redux store when
   * the component unmounts.
   */
  public componentWillUnmount() {
    this.props.closeAlert();
  }

  /**
   * Gets the alert ID based on the current route parameters.
   */
  public getAlertId = (): number => {
    return parseInt(this.props.routeParams.alertId, 10);
  };

  /**
   * Changes the url to the base alerts list url with the current
   * alerts search parameters in the url.
   */
  public dismissAlert = (): void => {
    this.props.router.push({
      pathname: '/alerts/',
      query: this.props.location.query,
    });
  };

  /**
   * Updates the notes property on the alert with new notes.
   * @param notes
   */
  public updateNotes = (notes: string): void => {
    if (this.props.alert) {
      this.props.updateAlert(this.props.alert, { notes });
    }
  };

  /**
   * Changes the alert outcome and notes.
   * @param outcome Alert outcome to change to.
   * @param notes Notes describing the reason behind the outcome.
   */
  public selectOutcome = (
    outcome: AlertOutcomeChoices,
    notes: string,
  ): void => {
    if (this.props.alert) {
      this.props.updateAlert(this.props.alert, { outcome, notes });
    }
  };

  /**
   * Renders an HTML element based on the current properties.
   */
  public render() {
    const {
      addComment,
      alert,
      loading,
      openDataModal,
      performAction,
      markers,
      users,
      locations,
      ipAddresses,
      closeDataModal,
      modalActive,
      actions,
      error,
    } = this.props;
    const { updateNotes } = this;
    const popupGenerator = AlertDetail.popupGenerator;

    const map = markers ? (
      <SpacedSection>
        <SubTitle>
          Locations
          <span className="text--base"> {markers.features.length}</span>
        </SubTitle>
        <Map
          controls={true}
          markers={markers}
          options={{ scrollZoom: false }}
          popupGenerator={popupGenerator}
        />
      </SpacedSection>
    ) : null;
    const alertHeaderElement = alert ? (
      <AlertDetailHeader
        alertContainer={alert.distillery ? alert.distillery.container : undefined}
        alertId={alert.id}
        alertLevel={alert.level}
        closeAlert={this.dismissAlert}
        alertData={alert.data}
        openDataModal={openDataModal}
      />
    ) : null;
    const alertDetailErrorClasses = classnames(
      'flex-item',
      'flex--shrink',
      'alert-detail__errors',
      `alert-detail__errors--${alert ? alert.level.toLowerCase() : ''}`,
      { 'alert-detail__errors--open': !!this.props.error.length },
    );
    const errors = this.props.error.map((detailError, index) => (
      <p key={index}>{detailError}</p>
    ));
    const errorsTitle = this.props.error.length
      ? (
        <h3>
          Errors
          <button
            className="btn-close"
            onClick={this.props.closeErrorMessage}
          >
            <i className="fa fa-close " />
          </button>
        </h3>
      ) : null;
    const alertDetailErrors = alert
      ? (
        <div className={alertDetailErrorClasses}>
          {errorsTitle}
          {errors}
        </div>
      ) : null;
    const comments = alert && getConfig().CURRENT_USER.is_staff
      ? (
        <AlertDetailComments
          alertId={alert.id}
          comments={alert.comments}
          addComment={addComment}
        />
      ) : null;
    const alertDetailElement = alert ? (
      <div className="flex-item content">
        <div className="spacing-section">
          <h3 className="sub-title">Title</h3>
          <div>{alert.title}</div>
        </div>

        <AlertDetailOverview
          alert={alert}
          updateAlert={this.props.updateAlert}
          users={users}
        />

        {map}

        <AlertDetailOutcomeContainer alert={alert} />

        {comments}

        <AlertDetailActions
          alertId={alert.id}
          actions={actions}
          dispatches={alert.dispatches}
          performAction={performAction}
        />

        <SpacedSection>
          <SubTitle>Data</SubTitle>
          <JSONFormatter json={alert.data} open={5} />
        </SpacedSection>

        <AlertDataModal
          alert={alert}
          active={modalActive}
          locations={locations}
          ipAddresses={ipAddresses}
          markers={markers}
          closeModal={closeDataModal}
        />

      </div>
    ) : null;

    return (
      <section className="alert-detail flex-box flex-box--column flex--shrink">
        {alertHeaderElement}
        {alertDetailErrors}
        {alertDetailElement}
        {loading ? <Loading /> : null}
      </section>
    );
  }
}
