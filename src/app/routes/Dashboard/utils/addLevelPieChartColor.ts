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

// Local
import {
  PieChartData,
  PieChartDataWithColor,
} from '~/services/chart/types';
import { LEVEL_OPTIONS } from '../../AlertList/constants';
import {
  addColorPropertyProgrammatically,
} from '~/services/chart/utils/addColorProperty';
import { getRandomColor } from '~/services/chart/utils/getRandomColor';

/**
 * Add the color property to pie chart data that will be used to display
 * alerts level statistic data.
 * @param data List of pie chart data containing level numbers.
 * @returns {Array<PieChartData&ColorProperty>}
 */
export function addLevelPieChartColor(
  data: PieChartData[],
): PieChartDataWithColor[] {
  return addColorPropertyProgrammatically<PieChartData>(
    data, (value) => {
      return LEVEL_OPTIONS[value.label.toUpperCase()].hexColor ||
        getRandomColor();
    },
  );
}
