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


// Local
import {
  categoryStore,
  INITIAL_STATE,
} from './categoryStoreReducer';
import * as actions from './categoryStoreActions';

describe('categoryStore', () => {
  const category1: any = { id: 1, name: 'category' };
  const category2: any = { id: 2, name: 'blah' };
  const list: any[] = [category1, category2];
  const normalized: any = {
    result: [category1.id, category2.id],
    entities: {
      categories: {
        [category1.id]: category1,
        [category2.id]: category2,
      },
    },
  };

  describe('FETCH_CATEGORIES_SUCCESS', () => {
    it('should update an empty list of normalized categories', () => {
      const action = actions.fetchCategoriesSuccess(list);
      const state = categoryStore(INITIAL_STATE, action);

      expect(state).toEqual(normalized);
    });
  });
});
