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
import axios, { CancelToken } from 'axios';
import * as _ from 'lodash';

// Local
import { getConfig } from '../../app/services/config';

/**
 * Looks up the address from a pair of lat, lng coordinates.
 * @param coordinates Lat, Lng coordinates to look up the address of.
 * @param cancelToken Token to used that cancels the promise.
 * @returns {Promise<string | undefined>} Address of the coordinates.
 */
export function reverseLookup(
  coordinates: [number, number],
  cancelToken?: CancelToken,
): Promise<string | undefined> {
  if (!coordinates || coordinates.length !== 2) {
    return Promise.resolve(undefined);
  }

  const coordinatesString = coordinates.join(',');
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/` +
    `${coordinatesString}.json?access_token=${getConfig().MAPBOX_ACCESS_TOKEN}`;

  return axios.get(url, { cancelToken })
    .then((data) => {
      return _.get<string>(data, 'features[0].place_name');
    });
}
