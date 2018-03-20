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
import * as _ from 'lodash';

// Local
import { PieChartData } from '../types/Chart';

/**
 * Gets the summed values of a list of pie chart data.
 * @param data Pie chart data values.
 * @returns {number} Total summed value.
 */
export function getPieChartDataTotal(data: PieChartData[]) {
  return _.reduce<PieChartData, number>(data, (sum: number, n: PieChartData) => sum + n.value, 0);
}
