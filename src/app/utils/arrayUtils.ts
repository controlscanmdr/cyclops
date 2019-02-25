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
import * as _ from 'lodash';

/**
 * Toggles a value on an array or returns the single value.
 * @param target The target reference to alter.
 * @param value Value to add or remove from the array.
 * @return {T | T[] | undefined}
 */
export function toggleValue<T>(target: any, value: any): T | T[] | undefined {
  // If there is no target, return the given value.
  if (!target) { return value; }
  if (_.isArray(target)) {
    // Check to see if the value is already in the array.
    if (_.includes(target, value)) {
      // Remove the value from the current array.
      const newValue = _.without(target, value);

      // If the length of the new array is only one, return the value
      // of the one element.
      if (newValue.length === 1) { return newValue[0]; }

      return newValue;
    }

    // Add the value to the current target array.
    return _.concat<T>((<T[]> target), value);
  }

  // If the target is already equal to the value, return undefined.
  if (target === value) { return undefined; }

  // Create a new array out of the target and the value.
  return _.concat([], target, value);
}

/**
 * Determines if a value is included in the target value if the target
 * is an array, or if it equals if it is not an array.
 * @param target
 * @param value
 * @return {boolean}
 */
export function includesOrEquals(target: any | any[], value: any): boolean {
  return _.includes(target, value) || _.isEqual(target, value);
}
