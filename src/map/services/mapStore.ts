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
import {
  MapStore,
  MapStoreItem,
  MapSetupOptions,
} from '../types/Map';
import { createMapStoreItem } from './createMapStoreItem';

const mapStore: MapStore = {};
const mapItemPromises: { [elementId: string]: Promise<MapStoreItem> } = {};

/**
 * Creates a mapItem and stores it onto the local mapItem store.
 * @param setupOptions Custom options used to setup the mapItem.
 * @param mapOptions Mapbox mapItem options specified by mapbox.
 * @returns {Promise<MapStoreItem>}
 */
export function createMapItem(
  setupOptions: MapSetupOptions,
  mapOptions?: mapboxgl.MapboxOptions,
): Promise<MapStoreItem> {
  const { elementId } = setupOptions;

  const promise = createMapStoreItem(setupOptions, mapOptions).then((mapItem) => {
    mapStore[elementId] = mapItem;
    delete mapItemPromises[elementId];
    return mapItem;
  });

  mapItemPromises[elementId] = promise;

  return promise;
}

/**
 * Gets a mapItem on the current mapItem store.
 * @param elementId Id of the element containing the map.
 * @returns {Promise<MapStoreItem | undefined>}
 */
export function getMapItem(elementId: string): Promise<MapStoreItem | undefined> {
  const promise = mapItemPromises[elementId];
  const mapItem = mapStore[elementId];

  if (mapItem) { return Promise.resolve(mapItem); }
  if (promise) { return Promise.resolve(promise); }

  return Promise.resolve(undefined);
}

/**
 * Removes a mapItem from the mapItem store.
 * @param elementId ID of the element containing the map.
 */
export function removeMapItem(elementId: string): void {
  if (mapStore[elementId]) { delete mapStore[elementId]; }
}
