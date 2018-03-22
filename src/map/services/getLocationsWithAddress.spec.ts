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
import * as service from './getLocationsWithAddress';
import { Coordinates, ObjectCoordinates, PointField } from '../types/Map';
import { CONTAINER_FIELDS } from '../../containers/services/containerSchema';
import { FieldValue } from '../../containers/services/containerUtils';

describe('getLocationsWithAddress', () => {
  const container: any = {
    fields: [{
      field_type: CONTAINER_FIELDS.POINT_FIELD,
      target_type: '',
      field_name: 'coordinates',
    }],
  };

  describe('getPointFields()', () => {
    it('should return the point fields of a Coordinate type result', () => {
      const coordinates: Coordinates = [4, 5];
      const result: any = { coordinates };

      expect(service.getPointFields(container, result)).toEqual([{
        field: 'coordinates',
        value: coordinates,
      }]);
    });

    it('should return the point fields of an Object type result', () => {
      const coordinates: ObjectCoordinates = { lat: 4, lng: 5 };
      const result: any = { coordinates };

      expect(service.getPointFields(container, result)).toEqual([{
        field: 'coordinates',
        value: coordinates,
      }]);
    });
  });

  describe('isObjectCoordinates()', () => {
    it('should return true if the field value is of lat lng type', () => {
      const coordinates: ObjectCoordinates = { lat: 4, lng: 5 };
      const field: FieldValue<ObjectCoordinates> = { field: 'coordinates', value: coordinates };

      expect(service.isObjectCoordinates(field)).toBe(true);
    });
  });

  describe('isCoordinates()', () => {
    it('should return true if the field value is an array of lat lng', () => {
      const coordinates: Coordinates = [4, 5];
      const field: FieldValue<Coordinates> = { field: 'coordinates', value: coordinates };

      expect(service.isCoordinates(field)).toBe(true);
    });
  });

  describe('createLocationFields()', () => {
    it('should create location fields from both Coordinates and ObjectCoordinates', () => {
      const array: Coordinates = [5, 6];
      const object: ObjectCoordinates = { lat: 3, lng: 8 };
      const arrayResult: FieldValue<PointField> = {
        field: 'coordinates',
        value: array,
      };
      const objectResult: FieldValue<PointField> = {
        field: 'point',
        value: object,
      };
      const results = [arrayResult, objectResult];

      expect(service.createLocationFields(results)).toEqual([{
        field: 'coordinates',
        coordinates: array,
      }, {
        field: 'point',
        coordinates: [3, 8],
      }]);
    });
  });
});
