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

// Local
import {
  MapSetupOptions,
  MapStoreItem,
  MapFeatures,
} from '../types';
import { createMapboxMap } from './createMapboxMap';
import { createMarkerSource } from './createMarkerSource';
import { createMarkerLayer } from './createMarkerLayer';
import { createClusterLayers } from './createClusterLayers';
import { addHoverPopup } from './popupUtils';
import { Deferred } from '../../../utils/Deferred';

/**
 * Creates a mapItem store item to place onto a mapItem store.
 * @param setupOptions
 * @param mapOptions
 * @returns {Promise<MapStoreItem>}
 */
export function createMapStoreItem(
  setupOptions: MapSetupOptions,
  mapOptions?: mapboxgl.MapboxOptions,
): Promise<MapStoreItem> {
  const { markerLayerId, markerSourceId, elementId} = setupOptions;
  const features: MapFeatures = setupOptions.features || {};
  const { cluster, controls, popup } = features;
  const map = createMapboxMap(elementId, mapOptions);
  const markerSource = createMarkerSource({ cluster });
  const markerLayer: mapboxgl.Layer = createMarkerLayer(markerLayerId, markerSourceId);
  const clusterLayers: mapboxgl.Layer[] | undefined = cluster ?
    createClusterLayers(markerSourceId) : undefined;
  const deferred = new Deferred<MapStoreItem>();

  map.on('load', () => {
    map.addSource(markerSourceId, markerSource);
    map.addLayer(markerLayer);

    let markerSourceObject = map.getSource(markerSourceId);

    markerSourceObject = (<mapboxgl.GeoJSONSource> markerSourceObject);

    if (clusterLayers) {
      clusterLayers.forEach((layer) => map.addLayer(layer));
    }
    if (controls) { map.addControl(new mapboxgl.NavigationControl()); }
    if (popup) { addHoverPopup(map, [markerLayerId], popup); }

    deferred.resolve({
      elementId,
      map,
      markerSource: markerSourceObject,
      markerSourceId,
      markerLayerId,
      features,
    });
  });

  return deferred.promise;
}
