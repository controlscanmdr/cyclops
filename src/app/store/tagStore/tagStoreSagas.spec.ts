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
import { call, put } from 'redux-saga/effects';

// Local
import * as sagas from './tagStoreSagas';
import * as actions from './tagStoreActions';
import { fetchAllTags } from '~/services/tags/services/tagAPI';
import { addError } from '~/store/errorModal';

describe('tagStoreSagas', () => {
  describe('fetchTagListSaga()', () => {
    it('should perform a successful api call', () => {
      const saga = sagas.fetchTagListSaga();
      const tags: any[] = [{ id: 1 }];

      expect(saga.next().value).toEqual(call(fetchAllTags));
      expect(saga.next(tags).value).toEqual(put(actions.fetchTagsSuccess(tags)));
      expect(saga.next().done).toBe(true);
    });

    it('should perform a failed api call', () => {
      const saga = sagas.fetchTagListSaga();
      const error = new Error('Request failed with status code 400');

      expect(saga.next().value).toEqual(call(fetchAllTags));
      expect(saga.throw!(error).value).toEqual(put(actions.fetchTagsFailure()));
      expect(saga.next().value).toEqual(put(addError(error)));
      expect(saga.next().done).toBe(true);
    });
  });
});