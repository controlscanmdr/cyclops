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

import * as _ from 'lodash';

// Local
import { ColorPropertyGenerator, ColorProperty } from '../types/Chart';
import { getRandomColorList } from './getRandomColor';

/**
 * Adds a color property to each of the objects in an array based on a seed.
 * @param data List of objects to modify.
 * @param seed String used to create random colors.
 * @returns {(T&ColorProperty)[]} Updated objects.
 */
export function addColorProperty<T>(
  data: T[],
  seed: string,
): Array<T & ColorProperty> {
  const colors = getRandomColorList(data.length, seed);

  return data.map<T & ColorProperty>((value, index) => {
    return _.assign({}, value, { color: colors[index] });
  });
}

/**
 * Adds a color property to each of the objects in an array using the
 * passed in color generator function.
 * @param data List of objects to add a color property to.
 * @param color Function used to generate the color property for each object.
 * @returns {(T&ColorProperty)[]} Updated objects with color property.
 */
export function addColorPropertyProgrammatically<T>(
  data: T[], color: ColorPropertyGenerator<T>,
): Array<T & ColorProperty> {
  return data.map<T & ColorProperty>((value, index) => {
    return _.assign({}, value, { color: color(value, index) });
  });
}
