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
import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import sagaMiddleware, { SagaIterator } from 'redux-saga';

// Local
import { AlertDetailState, alertDetail } from './alertDetail';
import { AlertDataContextSearchState, alertDataContextSearch } from './alertDetailContextSearch';
import { AlertDetailOutcomeState, alertDetailOutcome } from './alertDetailOutcome';
import { AlertListState, alertList } from './alertList';
import { CategoryStoreState, categoryStore } from './categoryStore';
import { DashboardState, dashboard } from './dashboard';
import { ErrorModalState, errorModal } from './errorModal';
import { MonitorModalState, monitorModal } from './monitorModal';
import { UserStoreState, userStore } from './userStore';
import { SearchResultsState, searchResults } from './searchResults';
import { SearchQueryState, searchQuery } from './searchQuery';
import { AlertSearchResultsState, alertSearchResults } from './alertSearchResults';
import { DistilleryStoreState, distilleryStore } from './distilleryStore';
import { all, fork } from 'redux-saga/effects';
import { tagStoreSagas } from '~/store/tagStore/tagStoreSagas';
import { alertDetailSagas } from '~/store/alertDetail/alertDetailSagas';
import { alertDetailOutcomeSagas } from '~/store/alertDetailOutcome/alertDetailOutcomeSagas';
import { alertDetailTagSagas } from '~/store/alertDetailTag/alertDetailTagSagas';
import { tagStoreReducer, TagStoreState } from '~/store/tagStore/tagStoreReducer';
import {
  alertDetailTagReducer,
  AlertDetailTagState
} from '~/store/alertDetailTag/alertDetailTagReducer';

/** Shape of the redux store state. */
export interface StoreState {
  alertDetail: AlertDetailState;
  alertDataContextSearch: AlertDataContextSearchState;
  alertDetailOutcome: AlertDetailOutcomeState;
  alertDetailTag: AlertDetailTagState;
  alertList: AlertListState;
  alertSearchResults: AlertSearchResultsState;
  categoryStore: CategoryStoreState;
  dashboard: DashboardState;
  distilleryStore: DistilleryStoreState;
  errorModal: ErrorModalState;
  monitorModal: MonitorModalState;
  searchQuery: SearchQueryState;
  searchResults: SearchResultsState;
  tagStore: TagStoreState;
  userStore: UserStoreState;
}
// Main redux store reducer. Tie all other reducers back into this one.
const reducer = combineReducers<StoreState>({
  alertDetail,
  alertDataContextSearch,
  alertDetailOutcome,
  alertList,
  alertSearchResults,
  categoryStore,
  dashboard,
  distilleryStore,
  errorModal,
  monitorModal,
  searchQuery,
  searchResults,
  userStore,
  alertDetailTag: alertDetailTagReducer,
  tagStore: tagStoreReducer,
});

function * sagas(): SagaIterator {
  yield all([
    fork(alertDetailSagas),
    fork(alertDetailOutcomeSagas),
    fork(alertDetailTagSagas),
    fork(tagStoreSagas),
  ]);
}

/** Central redux store for the application */
export const store: Store<StoreState> = (() => {
  const sagaMiddlware = sagaMiddleware();
  const middleware = applyMiddleware(thunkMiddleware, sagaMiddlware);
  const middlewareWithDevTools = composeWithDevTools(middleware);
  const instance = createStore<StoreState>(reducer, middlewareWithDevTools);

  sagaMiddlware.run(sagas);

  return instance;
})();
