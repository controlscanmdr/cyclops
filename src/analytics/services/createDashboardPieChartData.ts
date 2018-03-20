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

// Local
import { Dictionary } from '../../common/types/object';
import { PieChartDataWithColor } from '../types/Chart';
import { createPieChartDataFromObject } from './createPieChartData';
import { sortPieChartData } from './sortPieChartData';
import { addColorProperty } from './addColorProperty';

/**
 * Creates pie chart data for the dashboard view.
 * @param data Data to turn into pie chart data.
 * @param seed Seed used to create colors for the pie chart data.
 * @returns {PieChartDataWithColor[]}
 */
export function createDashboardPieChartData(
  data: Dictionary<number>,
  seed: string,
): PieChartDataWithColor[] {
  const pieChartData = createPieChartDataFromObject(data);
  const sortedPieChartData = sortPieChartData(pieChartData);

  return addColorProperty(sortedPieChartData, seed);
}
