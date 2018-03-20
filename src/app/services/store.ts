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
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxSaga, { SagaIterator } from 'redux-saga';

// Local
import { AlertDetailState, alertDetail } from '../../alerts/reducers/alertDetailReducer';
import {
  AlertDataContextSearchState,
  alertDataContextSearch,
} from '../../alerts/reducers/alertDataContextSearchReducer';
import {
  AlertDetailOutcomeState,
  alertDetailOutcome,
} from '../../alerts/reducers/alertDetailOutcomeReducer';
import { AlertListState, alertList } from '../../alerts/reducers/alertListReducer';
import { CategoryStoreState, categoryStore } from '../../actions/state/categoryStoreReducer';
import { DashboardState, dashboard } from '../../analytics/reducers/dashboardReducer';
import { ErrorModalState, errorModal } from '../../errors/reducers/errorModalReducer';
import { MonitorModalState, monitorModal } from '../../monitors/reducers/monitorModalReducer';
import { UserStoreState, userStore } from '../../users/reducers/userStoreReducer';
import { SearchResultsState, searchResults } from '../../search/reducers/searchResultsReducer';
import { SearchQueryState, searchQuery } from '../../search/reducers/searchQueryReducer';
import {
  AlertSearchResultsState,
  alertSearchResults,
} from '../../search/reducers/alertSearchResultsReducer';
import {
  DistilleryStoreState,
  distilleryStore,
} from '../../distilleries/reducers/distilleryStoreReducer';
import { all, fork } from 'redux-saga/effects';
import { tagStoreSagas } from '../../tags/sagas/tagStoreSagas';
import { alertDetailSagas } from '../../alerts/sagas/alertDetailSagas';
import { alertDetailOutcomeSagas } from '../../alerts/sagas/alertDetailOutcomeSagas';
import { alertDetailTagSagas } from '../../alerts/sagas/alertDetailTagSagas';
import { tagStoreReducer, TagStoreState } from '../../tags/reducers/tagStoreReducer';
import {
  alertDetailTagReducer,
  AlertDetailTagState,
} from '../../alerts/reducers/alertDetailTagReducer';
import { tagModalReducer, TagModalState } from '../../tags/reducers/tagModalReducer';
import { tagModalSagas } from '../../tags/sagas/tagModalSagas';

// Shape of the redux store state. */
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
  tagModal: TagModalState;
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
  tagModal: tagModalReducer,
  tagStore: tagStoreReducer,
});

// Root store saga.
function * sagas(): SagaIterator {
  yield all([
    fork(alertDetailSagas),
    fork(alertDetailOutcomeSagas),
    fork(alertDetailTagSagas),
    fork(tagModalSagas),
    fork(tagStoreSagas),
  ]);
}

// Central redux store for the application.
export const store: Store<StoreState> = (() => {
  const sagaMiddlware = reduxSaga();
  const middleware = applyMiddleware(reduxThunk, sagaMiddlware);
  const middlewareWithDevTools = composeWithDevTools(middleware);
  const instance = createStore<StoreState>(reducer, middlewareWithDevTools);

  sagaMiddlware.run(sagas);

  return instance;
})();
