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
import { format } from 'd3';

// Local
import { PieChartData, PieChartOptions } from '../types/Chart';
import { PieChart } from './PieChart';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Data to fill the pie chart with.
  data: PieChartData[];

  // Short description of the data.
  title: string;
}

// Component
// --------------------------------------------------------------------------

// Creates a pie chart with a table displaying the contained information.
export class PieChartTable extends React.Component<Props> {
  /**
   * Default pie chart options for a pie chart table
   * @type {PieChartOptions}
   */
  static PIE_CHART_OPTIONS: PieChartOptions = {
    donut: true,
    donutRatio: .3,
    showLabels: false,
    showLegend: false,
    valueFormat: value => format('d')(value),
  };

  render(): JSX.Element {
    const pieChartOptions = PieChartTable.PIE_CHART_OPTIONS;
    const tableRows = this.props.data.map(value => (
      <tr key={String(value.label)}>
        <td
          className="pie-chart-table__color"
          style={{ backgroundColor: value.color }}
        />
        <td>{value.value}</td>
        <td className="pie-chart-table__label">{value.label}</td>
      </tr>
    ));

    return (
      <div className="pie-chart-table flex-box">
        <div className="pie-chart-table__chart flex-box flex--shrink">
          <PieChart data={this.props.data} options={pieChartOptions}/>
        </div>
        <div className="flex-item">
          <h3 className="pie-chart-table__header">{this.props.title}</h3>
          <div className="pie-chart-table__container">
            <table>
              {tableRows}
            </table>
          </div>
        </div>
      </div>
    );
  }
}
