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
import { PopupGenerator } from '../types/Map';
import { createPopup } from './mapConstructors';

/**
 * Adds popups that show whenever a point is hovered over.
 * @param map Map object to add the hover ability to.
 * @param layers Names of the layers to add the hover for.
 * @param popupGenerator Function that creates the HTML whenever the user
 *   hovers over marker.
 */
export function addHoverPopup(
  map: mapboxgl.Map,
  layers: string[],
  popupGenerator: PopupGenerator,
): void {
  const popup = createPopup({ closeButton: false, closeOnClick: false });

  map.on('mousemove', (event: mapboxgl.MapMouseEvent) => {
    const features = map.queryRenderedFeatures(event.point, { layers });

    map.getCanvas().style.cursor = features.length ? 'pointer' : '';

    if (!features.length) {
      popup.remove();
      return;
    }

    const feature = features[0];

    popup.setLngLat(feature.geometry.coordinates);
    popup.setHTML(popupGenerator(feature));
    popup.addTo(map);
  });
}
