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
import { addGraph, models, PieChart as NvPieChart, utils } from 'nvd3';
import { select } from 'd3';
import * as _ from 'lodash';

// Local
import { PieChartData, PieChartOptions } from '../types/Chart';
import { chartColorPicker } from './chartColorPicker';

/**
 * Creates an NVD3 pie chart.
 * @param selector ID of the svg element.
 * @param data Data to add into the pie chart.
 * @param options Display options of the pie chart.
 */
export function createPieChart(
  selector: string,
  data: PieChartData[],
  options?: PieChartOptions,
): void {
  const pieChartOptions = options || {};

  addGraph<NvPieChart>(() => {
    const chart = models.pieChart()
      .x((d: PieChartData) => d.label)
      .y((d: PieChartData) => d.value);

    chart.color(chartColorPicker);

    _.forEach(pieChartOptions, (value, option) => {
      const index = <string> option;
      const setup = (<any> chart)[index];

      setup(value);
    });

    select(`#${selector}`).datum(data).transition().duration(350).call(chart);

    utils.windowResize(chart.update);

    return chart;
  });
}
