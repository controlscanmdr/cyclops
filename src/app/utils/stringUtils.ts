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

/**
 * Creates a random ID for a DOM element.
 * @return {string}
 */
export function createRandomId(): string {
  return 'id' + Math.random().toString(36).substr(2, 10);
}

/**
 * Add comma delimiters to a number value for easier reading.
 * @param {number} num
 * @returns {string}
 */
export function addCommas(num: number): string {
  const stringified = num.toString();

  if (stringified.length <= 3) { return stringified; }

  const converted: string[] = [];

  stringified.split('').reverse().forEach((letter, index) => {
    const place = index + 1;

    converted.push(letter);

    if (place % 3 === 0 && place !== stringified.length) {
      converted.push(',');
    }
  });

  return converted.reverse().join('');
}
