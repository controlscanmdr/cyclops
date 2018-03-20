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
import { createReducer, updateState } from '../../common/services/reduxHelperUtils';
import * as actions from '../actions/distilleryStoreActions';
import { NormalizedDistilleryList } from '../types/Distillery';
import { normalizeDistilleries } from '../services/distilleryNormalizr';

export type DistilleryStoreState = NormalizedDistilleryList;

export const distilleryStore = createReducer<DistilleryStoreState>({
  result: [],
  entities: {
    distilleries: {},
    containers: {},
    fields: {},
    contexts: {},
  },
}, {
  [actions.FETCH_DISTILLERIES_SUCCESS]: (
    state: DistilleryStoreState,
    action: actions.FetchDistilleriesSuccessAction,
  ) => action.payload.length
    ? updateState(state, normalizeDistilleries(action.payload))
    : state,
});
