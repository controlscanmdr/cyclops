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
import * as _ from 'lodash';
import { createSelector } from 'reselect';

import { StoreState } from '~/store';
import { denormalizeContainers } from '~/services/containers/utils/containerNormalizr';
import { denormalizeDistilleries } from '~/services/distilleries/utils/distilleryNormalizr';
import { DistilleryStoreState } from '~/store/distilleryStore';

const getNormalizedEntities = (state: DistilleryStoreState) => state.entities;
const getResultList = (state: DistilleryStoreState) => state.result;

export const getNestedContainers = createSelector(
  [getNormalizedEntities],
  (entities) => denormalizeContainers(Object.keys(entities.containers), entities),
);

export const getNestedDistilleries = createSelector(
  [getNormalizedEntities, getResultList],
  (entities, result) => denormalizeDistilleries(result, entities),
);

export const getFields = createSelector(
  [getNormalizedEntities],
  (entities) => _.values(entities.fields),
);
