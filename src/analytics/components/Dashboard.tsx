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
import { Nav, NavItem } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Local
import { Loading } from '../../common/components/Loading';
import { Map } from '../../map/components/Map';
import {
  StackedAreaChartDataWithColor,
  PieChartDataWithColor,
} from '../types/Chart';
import {
  AlertLocationResponse,
  AlertLocationPoint,
} from '../../alerts/types/Alert';
import { PopupGenerator } from '../../map/types/Map';
import { PieChartTable } from './PieChartTable';
import { StackedAreaChart } from './StackedAreaChart';
import { fetchAlertStatistics } from '../actions/dashboardActions';
import { MapStateToProps } from '../../common/types/MapStateToProps';
import { MapDispatchToProps } from '../../common/types/MapDispatchToProps';

// Types
// --------------------------------------------------------------------------

export interface Props {
  // Number of days to search over.
  days: number;

  // The number of alerts created in the given time period.
  totalAlerts: number;

  // Level distribution of the alerts.
  levelDistribution: PieChartDataWithColor[];

  // If the level distribution is being fetched.
  levelDistributionLoading: boolean;

  // Status distribution of the alerts.
  statusDistribution: PieChartDataWithColor[];

  // If the status distribution is being fetched.
  statusDistributionLoading: boolean;

  // Collection distribution of the alerts.
  collectionDistribution: PieChartDataWithColor[];

  // If the collection distribution is being fetched.
  collectionDistributionLoading: boolean;

  // Location markers alerts with location data.
  locations: AlertLocationResponse | null;

  // How many alerts have location data.
  locationFeatureCount: number;

  // If the location data is currently being fetched.
  locationsLoading: boolean;

  // Level distribution of alerts per day over a given time period.
  levelTimeseries: StackedAreaChartDataWithColor[];

  // If the level timeseries information is being fetched.
  levelTimeseriesLoading: boolean;

  /**
   * Retrieves alert statistics over a specified number of days.
   * @param days Days to search for statistics.
   */
  getAlertStatistics(days: number): any;
}

// Component
// --------------------------------------------------------------------------

// Dashboard displaying alert metrics.
export class Dashboard extends React.Component<Props, {}> {
  /**
   * Options for the dashboard map.
   * @type {MapboxOptions}
   */
  static MAP_OPTIONS: mapboxgl.MapboxOptions = { zoom: 1 };

  /**
   * Popup generator to display information on an alerts in a giant map
   * of alerts.
   * @param feature GeoJSON feature of the alerts.
   * @returns {string} Generated popup.
   */
  static popupGenerator: PopupGenerator =
    (feature: GeoJSON.Feature<AlertLocationPoint>) => {
      const { properties } = feature;
      const { level, pk, title, incidents } = properties;

      return (
        `<b>Id:</b> ${pk}<br />` +
        `<b>Title:</b> ${title}<br />` +
        `<b>Level:</b> ${level}<br />` +
        `<b>Incidents:</b> ${incidents}`
      );
    };

  // Fetches the alerts statistics when the component mounts.
  componentWillMount(): void {
    const { getAlertStatistics, days } = this.props;

    getAlertStatistics(days);
  }

  // Searches for alerts statistics in the past day.
  searchDay = (): void => {
    this.props.getAlertStatistics(0);
  };

  // Searches for alerts statistics over the past week.
  searchWeek = (): void => {
    this.props.getAlertStatistics(7);
  };

  // Searches for alerts statistics over the past month.
  searchMonth = (): void => {
    this.props.getAlertStatistics(30);
  };

  render(): JSX.Element {
    const isDay = this.props.days === 0;
    const isWeek = this.props.days === 7;
    const isMonth = this.props.days === 30;

    return (
      <div className="flex-item">
        <div className="dashboard__container flex-box">
          <div className="flex-item flex--shrink dashboard__sidebar">
            <div className="dashboard__header">
              <div className="dashboard__total">{this.props.totalAlerts}</div>
              <h1 className="dashboard__title">Alerts</h1>
              <Nav bsStyle="pills" className="dashboard__nav">
                <NavItem eventKey="day" active={isDay} onClick={this.searchDay}>
                  Day
                </NavItem>
                <NavItem eventKey="week" active={isWeek} onClick={this.searchWeek}>
                  Week
                </NavItem>
                <NavItem eventKey="month" active={isMonth} onClick={this.searchMonth}>
                  Month
                </NavItem>
              </Nav>
            </div>
            <div className="dashboard__loading-container">
              <PieChartTable data={this.props.levelDistribution} title="Level"/>
              {this.props.levelDistributionLoading ? <Loading /> : null}
            </div>
            <div className="dashboard__loading-container">
              <PieChartTable data={this.props.statusDistribution} title="Status"/>
              {this.props.statusDistributionLoading ? <Loading /> : null}
            </div>
            <div className="dashboard__loading-container">
              <PieChartTable data={this.props.collectionDistribution} title="Collection"/>
              {this.props.collectionDistributionLoading ? <Loading /> : null}
            </div>
          </div>
          <div className="flex-item dashboard__main">
            <h3 className="dashboard__heading">
              Locations {this.props.locationFeatureCount}
            </h3>
            <div className="dashboard__map">
              <Map
                markers={this.props.locations}
                popupGenerator={Dashboard.popupGenerator}
                options={Dashboard.MAP_OPTIONS}
                cluster={true}
              />
              {this.props.locationsLoading ? <Loading /> : null}
            </div>
            <h3 className="dashboard__heading">
              Alerts Per Day
            </h3>
            <div className="dashboard__stacked-area-chart">
              <StackedAreaChart data={this.props.levelTimeseries}/>
              {this.props.levelTimeseriesLoading ? <Loading /> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Container
// --------------------------------------------------------------------------

interface Container {}

const mapStateToProps: MapStateToProps<Props, Container> = state => ({
  days: state.dashboard.days,
  totalAlerts: state.dashboard.total,
  levelDistribution: state.dashboard.levelDistributionData,
  levelDistributionLoading: state.dashboard.levelDistributionLoading,
  statusDistribution: state.dashboard.statusDistributionData,
  statusDistributionLoading: state.dashboard.statusDistributionLoading,
  collectionDistribution: state.dashboard.collectionDistributionData,
  collectionDistributionLoading: state.dashboard.collectionDistributionLoading,
  levelTimeseries: state.dashboard.levelTimeseriesData,
  levelTimeseriesLoading: state.dashboard.levelTimeseriesLoading,
  locations: state.dashboard.locations,
  locationFeatureCount: state.dashboard.locationFeatureCount,
  locationsLoading: state.dashboard.locationsLoading,
});

const mapDispatchToProps: MapDispatchToProps<Props, Container> = dispatch => ({
  getAlertStatistics: bindActionCreators(fetchAlertStatistics, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
