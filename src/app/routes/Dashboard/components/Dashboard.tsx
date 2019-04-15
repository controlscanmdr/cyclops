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
import { Nav, NavItem } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Local
import { Loading } from '../../../components/Loading';
import { Map } from '../../../services/map/components/Map';
import {
  StackedAreaChartDataWithColor,
  PieChartDataWithColor,
} from '../../../services/chart/types';
import {
  AlertLocationResponse,
  AlertLocationPoint,
} from '../../../services/alerts/types';
import { PopupGenerator } from '../../../services/map/types';
import { PieChartTable } from '../../../services/chart/components/PieChartTable';
import { StackedAreaChart } from '../../../services/chart/components/StackedAreaChart';
import {
  DispatchToProps,
  StateToProps,
} from '../../../store/types';
import { fetchAlertStatistics } from '../../../store/dashboard/dashboardActions';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the Dashboard component that are values. */
export interface ValueProps {
  /** Number of days to search over. */
  days: number;
  /** The number of alerts created in the given time period. */
  totalAlerts: number;
  /** Level distribution of the alerts. */
  levelDistribution: PieChartDataWithColor[];
  /** If the level distribution is being fetched. */
  levelDistributionLoading: boolean;
  /** Status distribution of the alerts. */
  statusDistribution: PieChartDataWithColor[];
  /** If the status distribution is being fetched. */
  statusDistributionLoading: boolean;
  /** Collection distribution of the alerts. */
  collectionDistribution: PieChartDataWithColor[];
  /** If the collection distribution is being fetched. */
  collectionDistributionLoading: boolean;
  /** Location markers alerts with location data. */
  locations: AlertLocationResponse | null;
  /** How many alerts have location data. */
  locationFeatureCount: number;
  /** If the location data is currently being fetched. */
  locationsLoading: boolean;
  /** Level distribution of alerts per day over a given time period. */
  levelTimeseries: StackedAreaChartDataWithColor[];
  /** If the level timeseries information is being fetched. */
  levelTimeseriesLoading: boolean;
}

/** Properties of the dashboard component that are functions. */
export interface FunctionProps {
  /**
   * Retrieves alert statistics over a specified number of days.
   * @param days Days to search for statistics.
   */
  getAlertStatistics(days: number): any;
}

/** Combined property interfaces of the Dashboard component. */
type Props = ValueProps & FunctionProps;

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Dashboard displaying alert metrics.
 */
export class Dashboard extends React.Component<Props, {}> {
  /**
   * Options for the dashboard map.
   * @type {MapboxOptions}
   */
  public static MAP_OPTIONS: mapboxgl.MapboxOptions = { zoom: 1 };

  /**
   * Popup generator to display information on an alerts in a giant map
   * of alerts.
   * @param feature GeoJSON feature of the alerts.
   * @returns {string} Generated popup.
   */
  public static popupGenerator: PopupGenerator =
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

  /**
   * Fetches the alerts statistics when the component mounts.
   */
  public componentWillMount(): void {
    const { getAlertStatistics, days } = this.props;

    getAlertStatistics(days);
  }

  /**
   * Searches for alerts statistics in the past day.
   */
  public searchDay = (): void => {
    this.props.getAlertStatistics(0);
  };

  /**
   * Searches for alerts statistics over the past week.
   */
  public searchWeek = (): void => {
    this.props.getAlertStatistics(7);
  };

  /**
   * Searches for alerts statistics over the past month.
   */
  public searchMonth = (): void => {
    this.props.getAlertStatistics(30);
  };

  public render(): JSX.Element {
    const {
      days,
      totalAlerts,
      levelDistribution,
      levelDistributionLoading,
      statusDistribution,
      statusDistributionLoading,
      collectionDistribution,
      collectionDistributionLoading,
      locations,
      locationFeatureCount,
      locationsLoading,
      levelTimeseries,
      levelTimeseriesLoading,
    } = this.props;
    const { searchDay, searchWeek, searchMonth } = this;
    const { popupGenerator } = Dashboard;
    const isDay = days === 0;
    const isWeek = days === 7;
    const isMonth = days === 30;

    return (
      <div className="flex-item">
        <div className="dashboard__container flex-box">
          <div className="flex-item flex--shrink dashboard__sidebar">
            <div className="dashboard__header">
              <div className="dashboard__total">{totalAlerts}</div>
              <h1 className="dashboard__title">Alerts</h1>
              <Nav bsStyle="pills" className="dashboard__nav">
                <NavItem
                  eventKey="day"
                  active={isDay}
                  onClick={searchDay}
                >
                  Day
                </NavItem>
                <NavItem
                  eventKey="week"
                  active={isWeek}
                  onClick={searchWeek}
                >
                  Week
                </NavItem>
                <NavItem
                  eventKey="month"
                  active={isMonth}
                  onClick={searchMonth}
                >
                  Month
                </NavItem>
              </Nav>
            </div>
            <div className="dashboard__loading-container">
              <PieChartTable data={levelDistribution} title="Level"/>
              {levelDistributionLoading ? <Loading /> : null}
            </div>
            <div className="dashboard__loading-container">
              <PieChartTable data={statusDistribution} title="Status"/>
              {statusDistributionLoading ? <Loading /> : null}
            </div>
            <div className="dashboard__loading-container">
              <PieChartTable data={collectionDistribution} title="Collection"/>
              {collectionDistributionLoading ? <Loading /> : null}
            </div>
          </div>
          <div className="flex-item dashboard__main">
            <h3 className="dashboard__heading">
              Locations {locationFeatureCount}
            </h3>
            <div className="dashboard__map">
              <Map
                markers={locations}
                popupGenerator={popupGenerator}
                options={Dashboard.MAP_OPTIONS}
                cluster={true}
              />
              {locationsLoading ? <Loading /> : null}
            </div>
            <h3 className="dashboard__heading">
              Alerts Per Day
            </h3>
            <div className="dashboard__stacked-area-chart">
              <StackedAreaChart data={levelTimeseries}/>
              {levelTimeseriesLoading ? <Loading /> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
