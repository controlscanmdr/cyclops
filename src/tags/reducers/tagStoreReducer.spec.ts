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
import { tagStoreReducer, TagStoreState, INITIAL_STATE } from './tagStoreReducer';
import * as tagStoreActions from '../actions/tagStoreActions';

describe('tagStoreReducer', () => {
  it('should return the initial state', () => {
    const state = tagStoreReducer(undefined, { type: 'ACTION' } as any);

    expect(state).toEqual(INITIAL_STATE);
  });

  it('should respond to a FETCH_TAGS action', () => {
    const state = tagStoreReducer(undefined, tagStoreActions.fetchTags());
    const expected: TagStoreState = { ...INITIAL_STATE, isFetching: true };

    expect(state).toEqual(expected);
  });

  it('should respond to a FETCH_TAGS_SUCCESS action', () => {
    const initial = { ...INITIAL_STATE, isFetching: true };
    const tags: any[] = [{ id: 4 }];
    const state = tagStoreReducer(initial, tagStoreActions.fetchTagsSuccess(tags));
    const expected: TagStoreState = { ...INITIAL_STATE, tags, isFetching: false };

    expect(state).toEqual(expected);
  });
});
