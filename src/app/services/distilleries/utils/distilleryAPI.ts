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
import { getAll } from '../../cyphon/utils/cyphonAPI';
import { DistilleryFlat, DistilleryNested } from '../types';

/**
 * Returns a list of all distilleries objects that have alerts
 * associated with them.
 * @returns {Promise<DistilleryFlat[]>}
 */
export function fetchAllAlertDistilleries(): Promise<DistilleryFlat[]> {
  return getAll<DistilleryFlat>('/alerts/distilleries/');
}

export function fetchAllDistilleries(): Promise<DistilleryNested[]> {
  return getAll<DistilleryNested>('/distilleries/');
}
