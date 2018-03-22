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
import * as React from 'react';
import * as _ from 'lodash';
import * as classnames from 'classnames';

// Local
import { createRandomId } from '../../common/services/stringUtils';
import { Markers, PopupGenerator, MapFeatures, MapStoreItem } from '../types/Map';
import { createMapItem, getMapItem, removeMapItem } from '../services/mapStore';
import { getConfig } from '../../app/services/config';

// Types
// --------------------------------------------------------------------------

// Properties of the Map component.
interface Props {
  // Markers to display on the map.
  markers?: Markers | null;

  // Display options of the map.
  options?: mapboxgl.MapboxOptions;

  // If the map should display controls.
  controls?: boolean;

  // If the map should cluster together markers.
  cluster?: boolean;

  // Popup generator for marker popups.
  popupGenerator?: PopupGenerator;
}

// Component
// --------------------------------------------------------------------------

/**
 * Displays a mapbox map with optional popups, controls, and clusters.
 */
export class Map extends React.Component<Props, {}> {
  // Element ID of the map.
  id: string = createRandomId();
  markerLayerId: string = 'marker-layer';
  markerSourceId: string = 'marker-source';

  /**
   * Updates the map with new markers or options.
   * @param props
   */
  componentWillReceiveProps(props: Props): void {
    const nextMarkers = props.markers;

    if (!_.isEqual(nextMarkers, this.props.markers) && nextMarkers) {
      getMapItem(this.id).then((mapItem) => {
        if (mapItem) { mapItem.markerSource.setData(nextMarkers); }
      });
    }
  }

  /**
   * Creates the map element.
   */
  componentDidMount(): void {
    const features: MapFeatures = {
      cluster: this.props.cluster,
      controls: this.props.controls,
      popup: this.props.popupGenerator,
    };
    const mapItemConfig = {
      features,
      elementId: this.id,
      markerLayerId: this.markerLayerId,
      markerSourceId: this.markerSourceId,
    };

    if (getConfig().MAPBOX_ACCESS_TOKEN) {
      createMapItem(
        mapItemConfig,
        this.props.options,
      ).then((mapItem: MapStoreItem) => {
        if (this.props.markers) {
          mapItem.markerSource.setData(this.props.markers);
        }
      });
    }
  }

  /**
   * Removes the map element from the tracked map elements.
   */
  componentWillUnmount(): void {
    if (getConfig().MAPBOX_ACCESS_TOKEN) { removeMapItem(this.id); }
  }

  render(): JSX.Element {
    const missingMapboxToken = getConfig().MAPBOX_ACCESS_TOKEN
      ? null
      : (
        <strong>
          Can't display map. Missing CYCLOPS.MAPBOX_ACCESS_TOKEN
          in Cyphon configuration.
        </strong>
      );
    const classes = classnames({
      'mapbox--missing': !!missingMapboxToken,
    });

    return (
      <div id={this.id} className={classes}>
        {missingMapboxToken}
      </div>
    );
  }
}
