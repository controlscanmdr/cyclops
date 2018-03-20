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

// Local
import { createRandomId } from '../../common/services/stringUtils';
import {
  PieChartData,
  PieChartOptions,
} from '../types/Chart';
import { createPieChart } from '../services/createPieChart';
import { getPieChartDataTotal } from '../services/getPieChartDataTotal';

// Types
// --------------------------------------------------------------------------

// Properties of the PieChart component.
interface Props {
  // Pie chart data to display.
  data: PieChartData[];
  // Options for the NVD3 pie chart.
  options?: PieChartOptions;
}

// Component
// --------------------------------------------------------------------------

/**
 * Creates an nvd3 donut chart.
 */
export class PieChart extends React.Component<Props, {}> {
  /**
   * Determines if the data is empty. If it is, then it returns a pie chart
   * data that uses a black background. Otherwise it returns the given
   * pie chart data.
   * @param data Pie chart data to check.
   * @returns {PieChartData[]}
   */
  static emptyData(data: PieChartData[]): PieChartData[] {
    const total = getPieChartDataTotal(data);

    if (!data.length || total === 0) {
      return [{
        color: '#2a2b2e',
        label: 'None',
        value: 1,
      }];
    }

    return data;
  }

  // ID of the element.
  private id: string;

  constructor(props: Props) {
    super(props);

    this.id = createRandomId();
  }

  /**
   * Update the chart with new data if the new data is different from the
   * previous data.
   */
  componentDidUpdate(prevProps: Props): void {
    if (!_.isEqual(prevProps.data, this.props.data)) {
      const data = PieChart.emptyData(this.props.data);

      createPieChart(this.id, data, this.props.options);
    }
  }

  /**
   * Create the initial donut chart.
   */
  componentDidMount(): void {
    const data = PieChart.emptyData(this.props.data);

    createPieChart(this.id, data, this.props.options);
  }

  render() {
    return (<svg id={this.id} />);
  }
}
