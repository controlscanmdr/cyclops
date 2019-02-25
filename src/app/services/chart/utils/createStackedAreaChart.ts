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
import {
  addGraph,
  models,
  StackedAreaChart,
  utils,
} from 'nvd3';
import {
  select,
  time,
  format,
} from 'd3';

// Local
import {
  StackedAreaChartData,
  StackedAreaChartValues,
} from '../types';
import { chartColorPicker } from './chartColorPicker';

/** Maximum amount of X axis tick marks to show. */
const MAX_TICK_MARKS = 6;

/**
 * Creates am NVD3 stacked area chart.
 * @param selector ID selector of the HTML element.
 * @param data Data to place in the chart.
 */
export function createStackedAreaChart(
  selector: string,
  data: StackedAreaChartData[],
): void {
  addGraph<StackedAreaChart>(() => {
    const chart = models.stackedAreaChart()
      .x((d: StackedAreaChartValues) => d.date)
      .y((d: StackedAreaChartValues) => d.value)
      .useInteractiveGuideline(true)
      .showControls(true)
      .clipEdge(true)
      .color(chartColorPicker);

    chart.xAxis
      .tickFormat((d) => time.format('%x')(new Date(d * 1000)))
      .showMaxMin(false)
      .tickValues(data[0] ? createXAxisTickValues(data[0]) : []);

    chart.yAxis
      .tickFormat(format('d'))
      .showMaxMin(false);

    select(`#${selector}`)
      .datum(data)
      .transition()
      .duration(500)
      .call(chart);

    utils.windowResize(chart.update);

    return chart;
  });
}

/**
 * Creates the x axis tick values for a stacked area chart with date
 * values on the x axis.
 * @param data StackedAreaChart data to display.
 * @returns {number[]} Date tick marks in unix timestamp format.
 */
function createXAxisTickValues(data: StackedAreaChartData): number[] {
  const values = data.values.slice(1, -1);
  if (values.length <= MAX_TICK_MARKS) {
    return values.map((item) => item.date);
  }

  const tickValues: number[] = [];
  const skipEvery = Math.ceil(values.length / MAX_TICK_MARKS);

  values.forEach((item, index) => {
    const skipValue = (index + 1) % skipEvery !== 0;

    if (!skipValue) { tickValues.push(item.date); }
  });

  return tickValues;
}
