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
import { SagaIterator } from 'redux-saga';
import { all, call, put, takeEvery } from 'redux-saga/effects';

// Local
import * as tagModalActions from './tagModalActions';
import { fetchTag } from '~/services/tags/services/tagAPI';
import { addError } from '~/store/errorModal';
import { fetchTags } from '~/store/tagStore/tagStoreActions';

/**
 * Fetches defailed information on a specific tag.
 * @returns {SagaIterator}
 */
export function * fetchTagDetailSaga(action: tagModalActions.FetchTagDetailAction): SagaIterator {
  try {
    const tag = yield call(fetchTag, action.payload);

    yield put(tagModalActions.fetchTagDetailSuccess(tag));
  } catch (error) {
    yield put(addError(error));
    yield put(tagModalActions.fetchTagDetailFailure());
  }
}

/**
 * Triggers a fetch tag detail action.
 * @param {OpenTagDetailAction} action
 * @returns {SagaIterator}
 */
export function * openTagDetailSaga(action: tagModalActions.OpenTagDetailAction): SagaIterator {
  yield put(tagModalActions.fetchTagDetail(action.payload));
  yield put(fetchTags());
}

/**
 * Saga that starts all the tag modal sagas.
 * @returns {SagaIterator}
 */
export function * tagModalSagas(): SagaIterator {
  yield all([
    takeEvery(tagModalActions.FETCH_TAG_DETAIL, fetchTagDetailSaga),
    takeEvery(tagModalActions.OPEN_TAG_DETAIL, openTagDetailSaga),
  ]);
}
