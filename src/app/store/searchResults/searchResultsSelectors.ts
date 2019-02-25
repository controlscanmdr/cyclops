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

// Local
import { SearchResultsState } from './';

const getResultList = (state: SearchResultsState) => state.results;
const getSelectedDistilleryID = (state: SearchResultsState) => state.selectedDistilleryID;
const getResultPages = (state: SearchResultsState) => state.pages;

export const getSelectedResults = createSelector(
  [getResultList, getSelectedDistilleryID],
  (results, distilleryID) => results && results[distilleryID]
    ? results[distilleryID].results
    : [],
);

export const getSelectedResultCount = createSelector(
  [getResultList, getSelectedDistilleryID],
  (results, distilleryID) => results && results[distilleryID]
    ? results[distilleryID].count
    : 0,
);

export const getSelectedResultsPage = createSelector(
  [getSelectedDistilleryID, getResultPages],
  (distilleryID, pages) => pages[distilleryID] || 1,
);

export const getSearchResultDistilleries = createSelector(
  [getResultList],
  (results) => results
    ? _.values(results).map((result) => result.distillery)
    : [],
);
