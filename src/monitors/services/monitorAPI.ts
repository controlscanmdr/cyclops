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
import * as cyphonAPI from '../../cyphon/services/cyphonAPI';
import { MonitorNested } from '../types/Monitor';
import { APIList } from '../../cyphon/types/Response';

/**
 * Returns a list of current Monitors.
 * @return {Promise<APIList<MonitorNested>>}
 */
export function fetchMonitorList(): Promise<APIList<MonitorNested>> {
  return cyphonAPI.get('/monitors/enabled/');
}

/**
 * Fetches all the enabled monitors.
 * @returns {Promise<MonitorNested[]>}
 */
export function fetchAllMonitors(): Promise<MonitorNested[]> {
  return cyphonAPI.getAll('/monitors/enabled/');
}
