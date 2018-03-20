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

import { normalize, denormalize, schema } from 'normalizr';
import {
  DistilleryNested,
  NormalizedDistilleryEntities,
  NormalizedDistilleryList,
} from '../types/Distillery';
import { distillerySchema } from './distillerySchema';

/**
 * Normalizes a list of distilleries.
 * @param {DistilleryNested} distilleries
 * @returns {NormalizedDistilleryList}
 */
export const normalizeDistilleries = (
  distilleries: DistilleryNested[],
): NormalizedDistilleryList => normalize(distilleries, [distillerySchema]);

/**
 * Denormalizes a list of distilleries.
 * @param {NormalizedDistilleryEntities} entities
 * @param distilleryIDs
 * @returns {DistilleryNested}
 */
export const denormalizeDistilleries = (
  distilleryIDs: number[] | string[],
  entities: NormalizedDistilleryEntities,
): DistilleryNested[] => denormalize(
  distilleryIDs,
  [distillerySchema],
  entities,
);
