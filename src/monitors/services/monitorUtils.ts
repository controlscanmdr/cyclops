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
import { normalize, denormalize } from 'normalizr';

// Local
import { MonitorNested, NormalizedMonitorList, Monitor } from '../types/Monitor';
import { MONITOR_LIST_SCHEMA, MONITOR_SCHEMA } from './monitorSchema';

// Monitor names sorted by if they're currently active.
interface SortedMonitors {
  // Monitors that are currently active.
  down: string[];

  // Monitors that are currently inactive.
  up: string[];
}

/**
 * Normalize a list of monitors.
 * @param monitors Monitor objects to normalize.
 * @returns {NormalizedMonitorList}
 */
export function normalizeMonitors(
  monitors: MonitorNested[],
): NormalizedMonitorList {
  return normalize(monitors, MONITOR_LIST_SCHEMA);
}

/**
 * Denormalize a list of normalized monitors.
 * @param monitors Normalized list of monitors.
 * @param monitorIds List of monitor ids to pull.
 * @returns {MonitorNested[]}
 */
export function denormalizeMonitors(
  monitors: NormalizedMonitorList,
  monitorIds?: string[],
): MonitorNested[] {
  if (monitorIds) {
    return denormalize(monitorIds, MONITOR_LIST_SCHEMA, monitors.entities);
  }

  return denormalize(monitors.result, MONITOR_LIST_SCHEMA, monitors.entities);
}

/**
 * Extracts a monitor object from a list of normalized monitors.
 * @param monitor Normalized list of monitors.
 * @param monitors Name of monitor to extract.
 * @returns {MonitorNested | undefined}
 */
export function denormalizeMonitor(
  monitor: string,
  monitors: NormalizedMonitorList,
): MonitorNested | undefined {
  return denormalize(monitor, MONITOR_SCHEMA, monitors.entities);
}

/**
 * Sorts monitors by name based on if their currently up or down.
 * @param monitors List of monitors to sort.
 * @returns {{up: string[], down: string[]}}
 */
export function sortMonitorsByStatus(monitors: Monitor[]): SortedMonitors {
  const up: string[] = [];
  const down: string[] = [];

  monitors.forEach((monitor) => {
    if (monitor.status === 'GREEN') { up.push(monitor.name); }
    else { down.push(monitor.name); }
  });

  return { up, down };
}
