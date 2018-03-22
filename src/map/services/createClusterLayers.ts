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
import { CLUSTER_LAYERS } from './mapOptions';
import { ClusterLayer } from '../types/Map';

/**
 * Creates a collection of cluster layers for the given mapbox source.
 * @param sourceId Unique identifier of the source.
 * @returns {Mapboxgl.Layer[]}
 */
export function createClusterLayers(sourceId: string): mapboxgl.Layer[] {
  const layers: mapboxgl.Layer[] = [];

  CLUSTER_LAYERS.forEach((layer: ClusterLayer, index: number) => {
    layers.push({
      id: sourceId + '-cluster-' + index,
      type: 'circle',
      source: sourceId,
      paint: {
        'circle-color': layer.color as any,
        'circle-radius': 18,
      },
      filter: index === 0
        ? ['>=', 'point_count', layer.markerMinimum]
        : [
          'all',
          ['>=', 'point_count', layer.markerMinimum],
          ['<', 'point_count', (<ClusterLayer[]> CLUSTER_LAYERS)[index - 1].markerMinimum],
        ],
    });
  });

  const layout: mapboxgl.SymbolLayout = {
    'text-field': '{point_count}',
    'text-size': 12,
  };

  layers.push({
    layout,
    id: sourceId + '-cluster-count',
    source: sourceId,
    type: 'symbol',
  });

  return layers;
}
