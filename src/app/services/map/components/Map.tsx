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
import * as React from 'react';
import * as _ from 'lodash';
import * as classnames from 'classnames';

// Local
import { createRandomId } from '~/utils/stringUtils';
import {
  Markers,
  PopupGenerator,
  MapFeatures,
  MapStoreItem,
} from '../types';
import {
  createMapItem,
  getMapItem,
  removeMapItem,
} from '../utils/mapStore';
import { getConfig } from '~/config';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the Map component. */
interface Props {
  /** Markers to display on the map. */
  markers?: Markers | null;
  /** Display options of the map. */
  options?: mapboxgl.MapboxOptions;
  /** If the map should display controls. */
  controls?: boolean;
  // If the map should cluster together markers.
  cluster?: boolean;
  /** Popup generator for marker popups. */
  popupGenerator?: PopupGenerator;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays a mapbox map with optional popups, controls, and clusters.
 */
export class Map extends React.Component<Props, {}> {
  /** Element ID of the map. */
  public id: string;
  public markerLayerId: string = 'marker-layer';
  public markerSourceId: string = 'marker-source';

  constructor(props: Props) {
    super(props);
    this.id = createRandomId();
  }

  /**
   * Updates the map with new markers or options.
   * @param props
   */
  public componentWillReceiveProps(props: Props): void {
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
  public componentDidMount(): void {
    const features: MapFeatures = {
      cluster: this.props.cluster,
      controls: this.props.controls,
      popup: this.props.popupGenerator,
    };
    const mapItemConfig = {
      elementId: this.id,
      markerLayerId: this.markerLayerId,
      markerSourceId: this.markerSourceId,
      features,
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
  public componentWillUnmount(): void {
    if (getConfig().MAPBOX_ACCESS_TOKEN){ removeMapItem(this.id); }
  }

  public render(): JSX.Element {
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
