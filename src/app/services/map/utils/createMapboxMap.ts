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

// Local
import { DEFAULT_MAP_OPTIONS } from '../constants';
import { getConfig } from '~/config';

/**
 * Creates a mapbox mapItem object with.
 * @param container ID or element that will hold the mapItem.
 * @param options Mapbox options.
 * @returns {mapboxgl.Map}
 */
export function createMapboxMap(
  container: string | Element,
  options?: mapboxgl.MapboxOptions,
): mapboxgl.Map {
  (mapboxgl as any).accessToken = getConfig().MAPBOX_ACCESS_TOKEN;
  return new mapboxgl.Map(
    _.assign({}, DEFAULT_MAP_OPTIONS, options, { container }),
  );
}
