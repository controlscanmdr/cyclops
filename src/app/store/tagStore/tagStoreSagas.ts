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
import { put, takeEvery, call, all } from 'redux-saga/effects';

// Local
import * as actions from './tagStoreActions';
import { fetchAllTags } from '~/services/tags/services/tagAPI';
import { addError } from '~/store/errorModal';

/**
 * Saga that fetches the current list of all tags.
 * @returns {SagaIterator}
 */
export function * fetchTagListSaga(): SagaIterator {
  try {
    const tags = yield call(fetchAllTags);
    yield put(actions.fetchTagsSuccess(tags));
  } catch (error) {
    yield put(actions.fetchTagsFailure());
    yield put(addError(error));
  }
}

export function * tagStoreSagas(): SagaIterator {
  yield all([
    takeEvery(actions.FETCH_TAGS, fetchTagListSaga),
  ]);
}
