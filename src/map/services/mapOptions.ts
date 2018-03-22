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
import { ClusterLayer } from '../types/Map';

/**
 * Default options for creating mapbox maps.
 * @type {{style: string}}
 */
export const DEFAULT_MAP_OPTIONS: mapboxgl.MapboxOptions = {
  style: 'mapbox://styles/mapbox/dark-v9',
};

/**
 * Layer options to use to make cluster layers.
 */
export const CLUSTER_LAYERS: ClusterLayer[] = [
  { markerMinimum: 50, color: '#f28cb1' },
  { markerMinimum: 25, color: '#f1f075' },
  { markerMinimum: 0, color: '#51bbd6' },
];

/**
 * Options for clustering markers.
 */
export const CLUSTER_OPTIONS = {
  clusterMaxZoom: 14,
  clusterRadius: 50,
};
