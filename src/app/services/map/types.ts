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

export interface ClusterLayer {
  markerMinimum: number;
  color: string;
}

export interface ObjectCoordinates {
  lng: number;
  lat: number;
}

export type Coordinates = [number, number];

export type PointField = Coordinates | ObjectCoordinates;

export interface LocationField {
  field: string;
  coordinates: Coordinates;
}

export interface LocationFieldAddress extends LocationField {
  address: string;
}

export interface LocationAddressPoint extends GeoJSON.Point {
  properties: { field: string, address: string };
}

export type Markers = GeoJSON.FeatureCollection<GeoJSON.Point>;

export interface PopupGenerator {
  (feature: GeoJSON.Feature<GeoJSON.GeometryObject>): string;
}

export interface MapFeatures {
  cluster?: boolean;
  controls?: boolean;
  popup?: PopupGenerator;
}

export interface MapSetupOptions {
  elementId: string;
  markerSourceId: string;
  markerLayerId: string;
  features?: MapFeatures;
}

export interface MapStoreItem {
  elementId: string;
  map: mapboxgl.Map;
  markerSource: mapboxgl.GeoJSONSource;
  markerSourceId: string;
  markerLayerId: string;
  features?: MapFeatures;
}

export interface MapStore {
  [elementId: string]: MapStoreItem;
}
