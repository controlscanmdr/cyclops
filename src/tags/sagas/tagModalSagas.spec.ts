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
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

// Local
import * as sagas from './tagModalSagas';
import * as tagModalActions from '../actions/tagModalActions';
import { fetchTag } from '../services/tagAPI';
import { addError } from '../../errors/actions/errorModalActions';
import { fetchTags } from '../actions/tagStoreActions';

describe('tagModalSagas', () => {
  describe('fetchTagDetailSaga()', () => {
    const id = 5;
    let saga: SagaIterator;

    beforeEach(() => {
      saga = sagas.fetchTagDetailSaga(tagModalActions.fetchTagDetail(id));
    });

    it('should walk through a successful saga', () => {
      const tag: any = { id };

      expect(saga.next().value).toEqual(call(fetchTag, id));
      expect(saga.next(tag).value).toEqual(put(tagModalActions.fetchTagDetailSuccess(tag)));
      expect(saga.next().done).toBe(true);
    });

    it('should walk through an unsuccessful saga', () => {
      const error = new Error('Error');

      expect(saga.next().value).toEqual(call(fetchTag, id));
      expect(saga.throw!(error).value).toEqual(put(addError(error)));
      expect(saga.next().value).toEqual(put(tagModalActions.fetchTagDetailFailure()));
      expect(saga.next().done).toBe(true);
    });
  });

  describe('openTagDetailSaga()', () => {
    it('should call FETCH_TAG_DETAIL', () => {
      const id = 5;
      const action = tagModalActions.openTagDetail(id);
      const saga = sagas.openTagDetailSaga(action);

      expect(saga.next().value).toEqual(put(tagModalActions.fetchTagDetail(id)));
      expect(saga.next().value).toEqual(put(fetchTags()));
      expect(saga.next().done).toBe(true);
    });
  });

  describe('tagModalSagas()', () => {
    it('should start all the tag modal sagas', () => {
      const saga = sagas.tagModalSagas();

      expect(saga.next().value).toEqual(all([
        takeEvery(tagModalActions.FETCH_TAG_DETAIL, sagas.fetchTagDetailSaga),
        takeEvery(tagModalActions.OPEN_TAG_DETAIL, sagas.openTagDetailSaga),
      ]));
      expect(saga.next().done).toBe(true);
    });
  });
});
