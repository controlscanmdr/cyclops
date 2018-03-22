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
import { parse } from 'geojson';

// Local
import { LocationFieldAddress } from '../types/Map';

/**
 * GeoJSON point with location address information contained in the
 * properties property.
 */
export interface LocationAddressPoint extends GeoJSON.Point {
  // Custom properties on the GeoJSON point.
  properties: { field: string, address: string };
}

/**
 * Creates a GeoJSON feature collection from an array of
 * LocationFieldAddresses.
 * @param locations Locations to turn into GeoJSON.
 * @returns {GeoJSON.FeatureCollection<LocationAddressPoint>}
 */
export function createLocationGeoJSON(
  locations: LocationFieldAddress[],
): GeoJSON.FeatureCollection<LocationAddressPoint> {
  return parse<LocationAddressPoint>(locations, {
    Point: 'coordinates',
    include: ['field', 'address'],
  });
}
