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
import { call, put, all, takeEvery } from 'redux-saga/effects';

// Local
import * as sagas from './alertDetailTagSagas';
import * as actions from '../actions/alertDetailTagActions';
import * as tagApi from '../../tags/services/tagAPI';
import { fetchAlert } from '../actions/alertDetailActions';
import { addError } from '../../errors/actions/errorModalActions';
import { fetchTags } from '../../tags/actions/tagStoreActions';

describe('alertDetailTagSagas', () => {
  describe('addTag()', () => {
    const alertId = 4;
    const tagId = 2;
    const userId = 6;
    const action = actions.addTag(alertId, tagId, userId);

    it('should walk through a successful API call', () => {
      const saga = sagas.addTagSaga(action);

      expect(saga.next().value).toEqual(
        call(tagApi.addTagRelation, 'alert', alertId, tagId, userId),
      );
      expect(saga.next().value).toEqual(put(fetchAlert(alertId)));
      expect(saga.next().value).toEqual(put(actions.addTagSuccess()));
      expect(saga.next().done).toBe(true);
    });

    it('should walk through a failed API call', () => {
      const saga = sagas.addTagSaga(action);
      const error = new Error('Something failed');

      expect(saga.next().value).toEqual(
        call(tagApi.addTagRelation, 'alert', alertId, tagId, userId),
      );
      expect(saga.throw!(error).value).toEqual(put(actions.addTagFailure()));
      expect(saga.next().value).toEqual(put(addError(error)));
      expect(saga.next().done).toBe(true);
    });
  });

  describe('removeTag()', () => {
    const alertId = 4;
    const tagId = 2;
    const action = actions.removeTag(alertId, tagId);

    it('should walk through a successful API call', () => {
      const saga = sagas.removeTagSaga(action);
      const relation = { id: 5 };

      expect(saga.next().value).toEqual(call(tagApi.findTagRelation, 'alert', alertId, tagId));
      expect(saga.next(relation).value).toEqual(call(tagApi.deleteTagRelation, 5));
      expect(saga.next().value).toEqual(put(fetchAlert(alertId)));
      expect(saga.next().value).toEqual(put(actions.removeTagSuccess()));
      expect(saga.next().done).toBe(true);
    });

    it('should walk through a failed API call', () => {
      const saga = sagas.removeTagSaga(action);
      const error = new Error('Something failed');

      expect(saga.next().value).toEqual(call(tagApi.findTagRelation, 'alert', alertId, tagId));
      expect(saga.throw!(error).value).toEqual(put(actions.removeTagFailed()));
      expect(saga.next().value).toEqual(put(addError(error)));
      expect(saga.next().done).toBe(true);
    });
  });

  describe('openTagPanelSaga()', () => {
    it('should make a call to fetch the tag list', () => {
      const saga = sagas.openTagPanelSaga();

      expect(saga.next().value).toEqual(put(fetchTags()));
      expect(saga.next().done).toBe(true);
    });
  });

  describe('alertDetailTagSagas()', () => {
    it('should start all this modules sagas in parallel', () => {
      const saga = sagas.alertDetailTagSagas();

      expect(saga.next().value).toEqual(all([
        takeEvery(actions.ADD_TAG, sagas.addTagSaga),
        takeEvery(actions.REMOVE_TAG, sagas.removeTagSaga),
        takeEvery(actions.OPEN_TAG_PANEL, sagas.openTagPanelSaga),
      ]));
      expect(saga.next().done).toEqual(true);
    });
  });
});
