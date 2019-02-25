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
import { parse } from 'geojson';

// Local
import { CLUSTER_OPTIONS } from '../constants';
import { Markers } from '../types';

/**
 * Options for creating a marker source.
 */
export interface MarkerSourceOptions {
  /** Markers to place on the source. */
  markers?: Markers;
  /** If the markers should be clustered. */
  cluster?: boolean;
}

/**
 * Creates a mapbox marker source.
 * @param options Options for the marker source.
 * @returns {GeoJSONSourceRaw}
 */
export function createMarkerSource(
  options?: MarkerSourceOptions,
): mapboxgl.GeoJSONSourceRaw {
  const sourceOptions = options ? options : {};
  const clusterOptions = sourceOptions.cluster
    ? _.assign({ cluster: true }, CLUSTER_OPTIONS)
    : {};

  return _.assign<mapboxgl.GeoJSONSourceRaw>(
    {},
    clusterOptions,
    {
      // If there are no markers, return an empty FeatureCollection.
      data: sourceOptions.markers || parse([], { Point: 'coordinates' }),
      type: 'geojson',
    },
  );
}
