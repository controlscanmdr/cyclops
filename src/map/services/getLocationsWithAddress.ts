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
import { Result } from '../../common/types/result';
import { ContainerNested } from '../../containers/types/Container';
import { getFieldsOfType } from '../../containers/services/containerUtils';
import { CONTAINER_FIELDS } from '../../containers/services/containerSchema';
import {
  LocationFieldAddress,
  LocationField,
  Coordinates,
} from '../types/Map';
import { reverseLookup } from './reverseLookup';

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
  const pointFields = getFieldsOfType<Coordinates>(
    CONTAINER_FIELDS.POINT_FIELD,
    container,
    result,
  );

  // If there aren't any location fields, return an empty array.
  if (!pointFields.length) { return Promise.resolve([]); }

  const locationFields: LocationField[] = pointFields
    .filter(pointField => pointField.value && pointField.value.length)
    .map(pointField => ({
      field: pointField.field,
      coordinates: pointField.value,
    }));

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
