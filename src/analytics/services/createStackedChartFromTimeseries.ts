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
import * as moment from 'moment';

// Local
import { AlertLevelTimeseries } from '../../alerts/types/Alert';
import {
  StackedAreaChartValues,
  StackedAreaChartDataWithColor,
} from '../types/Chart';
import { LEVEL_OPTIONS } from '../../alerts/services/alertOptions';
import { Dictionary } from '../../common/types/object';

/**
 * Creates a list of stacked area chart data from the data of an
 * alerts level timeseries.
 * @param data Alert level timeseries.
 * @param capitalize If the title for the values should be capitalized.
 * @returns {StackedAreaChartDataWithColor[]}
 */
export function createStackedChartFromTimeseries(
  data: AlertLevelTimeseries,
  capitalize?: boolean,
): StackedAreaChartDataWithColor[] {
  const { date } = data;
  const levelValues = _.omit(data, ['date']);
  const formattedDates = date.map<number>(value => moment(value).unix());

  return Object.keys(levelValues).map<StackedAreaChartDataWithColor>((level) => {
    const values = (<Dictionary<number[]>> levelValues)[level];
    const chartData = values.map<StackedAreaChartValues>((value, index) => ({
      value,
      date: formattedDates[index],
    }));
    const key = capitalize ? _.capitalize(level) : level;

    return {
      key,
      color: <string> LEVEL_OPTIONS[level.toUpperCase()].hexColor,
      values: chartData,
    };
  });
}
