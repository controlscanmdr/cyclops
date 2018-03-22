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
import * as arrayUtils from './arrayUtils';

describe('arrayUtils', () => {
  describe('toggleValue()', () => {
    it('should return the value if the target is undefined', () => {
      const value = 4;
      const target = undefined;
      const toggled = arrayUtils.toggleValue(target, value);

      expect(toggled).toEqual(value);
    });

    it('should return undefined if the value and target match', () => {
      const value = 4;
      const target = 4;
      const toggled = arrayUtils.toggleValue(target, value);

      expect(toggled).toBeUndefined();
    });

    it('should create an array of two values if the values don\'t match', () => {
      const value = 4;
      const target = 5;
      const toggled = arrayUtils.toggleValue(target, value);

      expect(toggled).toEqual([target, value]);
    });

    it(
      'should return a single value if there are two values in the array ' +
      'and the value to toggle is in the array',
      () => {
        const value = 5;
        const target = [4, 5];
        const toggled = arrayUtils.toggleValue(target, value);

        expect(toggled).toEqual(4);
      });

    it('should add a value to an array that doesn\'t contain that value', () => {
      const value = 6;
      const target = [4, 5];
      const toggled = arrayUtils.toggleValue(target, value);

      expect(toggled).toEqual([4, 5, 6]);
    });

    it('should remove a value from an array', () => {
      const value = 6;
      const target = [4, 5, 6];
      const toggled = arrayUtils.toggleValue(target, value);

      expect(toggled).toEqual([4, 5]);
    });
  });

  describe('includesOrEquals()', () => {
    it('should return true if the target includes the value', () => {
      const target = [4, 5];
      const value = 5;
      const contains = arrayUtils.includesOrEquals(target, value);

      expect(contains).toBe(true);
    });

    it('should return true if the target equals the value', () => {
      const target = 5;
      const value = 5;
      const contains = arrayUtils.includesOrEquals(target, value);

      expect(contains).toBe(true);
    });

    it('should return false if the target does not include the value', () => {
      const target = [4, 5];
      const value = 3;
      const contains = arrayUtils.includesOrEquals(target, value);

      expect(contains).toBe(false);
    });

    it('should return false if the target does not equal the value', () => {
      const target = 4;
      const value = 5;
      const contains = arrayUtils.includesOrEquals(target, value);

      expect(contains).toBe(false);
    });
  });
});
