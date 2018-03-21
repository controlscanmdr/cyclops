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
import { CancelToken } from 'axios';

// Local
import { Result } from '~/types/result';
import { ContainerNested } from '../../containers/types';
import { FieldValue, getFieldsOfType } from '../../containers/utils/containerUtils';
import { CONTAINER_FIELDS } from '../../containers/constants';
import {
  LocationFieldAddress,
  LocationField,
  PointField,
  Coordinates,
  ObjectCoordinates,
} from '../types';
import { reverseLookup } from './reverseLookup';

/**
 * Returns the point fields of a result
 * @param {ContainerNested} container Container object related to the result.
 * @param {Result} result Raw result data.
 * @returns {PointField}
 */
export function getPointFields(
  container: ContainerNested,
  result: Result,
): Array<FieldValue<PointField>> {
  return getFieldsOfType<PointField>(CONTAINER_FIELDS.POINT_FIELD, container, result);
}

/**
 * Determines if a PointField is an ObjectCoordinates
 * @param {PointField} field
 * @returns {boolean}
 */
export function isObjectCoordinates(field: FieldValue<PointField>): field is FieldValue<ObjectCoordinates> {
  return _.isObjectLike(field.value);
}

/**
 * Determines if a PointField is a Coordinates.
 * @param {PointField} field
 * @returns {boolean}
 */
export function isCoordinates(field: FieldValue<PointField>): field is FieldValue<Coordinates> {
  return _.isArrayLike(field.value);
}

/**
 * Createa a location field from an ObjectCoordinate.
 * @param {FieldValue<ObjectCoordinates>} point
 * @returns {LocationField}
 */
export const createLocationFieldFromObject = (
  point: FieldValue<ObjectCoordinates>,
): LocationField => ({
  field: point.field,
  coordinates: [point.value.lat, point.value.lng],
});

/**
 * Creates a location field from a Coordinate.
 * @param {FieldValue<Coordinates>} point
 * @returns {LocationField}
 */
export const createLocationFieldFromArray = (point: FieldValue<Coordinates>): LocationField => ({
  field: point.field,
  coordinates: point.value,
});

/**
 * Creates location fields from an array of PointField FieldValue's.
 * @param {Array<FieldValue<PointField>>} fields
 * @returns {LocationField[]}
 */
export function createLocationFields(fields: Array<FieldValue<PointField>>): LocationField[] {
  return fields
    .filter((field) => {
      if (!field.value) return true;

      if (isCoordinates(field)) return true;
      if (isObjectCoordinates(field)) return true;

      return false;
    })
    .map((field) => {
      if (isCoordinates(field)) return createLocationFieldFromArray(field);

      return createLocationFieldFromObject(field as FieldValue<ObjectCoordinates>);
    });
}

/**
 * Creates a list of LocationFieldAddress by extracting the coordinate
 * values of a given Result using it's Container to specify which fields
 * contain the coordinates.
 * @param container Container related to the result.
 * @param result Data to extract coordinate values from.
 * @param cancelToken Token used to cancel to the promise.
 * @returns {AxiosPromise<LocationFieldAddress[]>}
 */
export function getLocationsWithAddress(
  container: ContainerNested,
  result: Result,
  cancelToken?: CancelToken,
): Promise<LocationFieldAddress[]> {
  const pointFields = getPointFields(container, result);

  // If there aren't any location fields, return an empty array.
  if (!pointFields.length) return Promise.resolve([]);

  const locationFields = createLocationFields(pointFields);

  // If the location coordinates were blank, return an empty array
  if (!locationFields.length) { return Promise.resolve([]); }

  const reverseLookupPromises: Array<Promise<string | undefined>> = [];

  // Lookup the address for each location.
  locationFields.forEach((locationField: LocationField) => {
    reverseLookupPromises.push(reverseLookup(locationField.coordinates, cancelToken));
  });

  return Promise.all(reverseLookupPromises)
    .then((addresses: string[]) => {
      return addresses.map<LocationFieldAddress>
        ((address: string, index: number) => {
          return _.assign({}, locationFields[index], { address });
        });
    });
}
