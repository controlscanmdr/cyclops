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

/** Data used to create pie charts. */
export interface PieChartData {
  /** Display name for the data. */
  label: string;
  /** Numerical value of the data. */
  value: number;
  /** Hex color of the pie chart piece. */
  color?: string;
}

/** Pie chart data that has a color property. */
export interface PieChartDataWithColor extends PieChartData {
  /** Hex color of the pie chart piece. */
  color: string;
}

/** Object that has a color property. */
export interface ColorProperty {
  /** Hex color. */
  color: string;
  [key: string]: any;
}

/** Data used to create a stacked area chart. */
export interface StackedAreaChartData {
  /** Description of the data set. */
  key: string;
  /** Values used create the area chart. */
  values: StackedAreaChartValues[];
  /** Hex color of the data. */
  color?: string;
}

/** Value/Date pair of a related set of stacked area chart data. */
export type StackedAreaChartValues = {
  /** Date of the value. */
  date: number;
  /** Numerical value of the data. */
  value: number;
};

/** Stacked area chart data with a color property. */
export interface StackedAreaChartDataWithColor extends StackedAreaChartData {
  /** Hex color of the data. */
  color: string;
}

export interface PieChartOptions {
  /** If the pie chart should be a donut. */
  donut?: boolean;
  /** Ratio of the pie chart donut. */
  donutRatio?: number;
  /** If the pie chart pieces should grow when hovered over. */
  growOnHover?: boolean;
  /** Height of the pie chart. */
  height?: number;
  /** If the labels for each piece of pie chart data should be shown. */
  showLabels?: boolean;
  /** If the pie chart legend should be shown. */
  showLegend?: boolean;
  /** Width of the pie chart. */
  width?: number;
  /**
   * Function that takes a piece of data and creates a pie chart label from it.
   * @param data Pie chart data to create a label for.
   */
  labelFormat?(data: PieChartData): string;
  /**
   * Determines the value display format of the pie chart value.
   * @param data Pie chart value to format.
   */
  valueFormat?(data: number): string;
}

/** Function used to create a color property from a piece of data.  */
export type ColorPropertyGenerator<T> = (value: T, index: number) => string;
