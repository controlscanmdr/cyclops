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
import * as randomcolor from 'randomcolor';
import * as _ from 'lodash';

/**
 *
 * @type {RandomColorOptions}
 */
const BASE_COLOR_CONFIG: randomcolor.RandomColorOptions = {
  luminosity: 'light',
};

/**
 * Returns a random hex color.
 * @returns {string}
 */
export function getRandomColor(): string {
  return <string> randomcolor(BASE_COLOR_CONFIG);
}

/**
 * Gets a list of random hex color values.
 * @param count Number of colors to create.
 * @param seed String used to create the color values. If given, it will
 *   return the same colors each time.
 * @returns {string[]}
 */
export function getRandomColorList(count: number, seed?: string): string[] {
  const extendedColorConfig: randomcolor.RandomColorOptions = seed ?
    { seed, count } : { count };
  const colorConfig: randomcolor.RandomColorOptions = _.assign(
    {},
    BASE_COLOR_CONFIG,
    extendedColorConfig,
  );

  return <string[]> randomcolor(colorConfig);
}
