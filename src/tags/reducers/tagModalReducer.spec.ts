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
import { tagModalReducer, TagModalState, INITIAL_STATE } from './tagModalReducer';
import * as tagModalActions from '../actions/tagModalActions';
import { TagModalView } from '../types/TagModalView';

describe('tagModalReducer', () => {
  it('should return the initial state', () => {
    const state = tagModalReducer(undefined, { type: 'ACTION' } as any);

    expect(state).toEqual(INITIAL_STATE);
  });

  it('should respond to an OPEN_TAG_DETAIL action', () => {
    const id = 5;
    const action = tagModalActions.openTagDetail(id);
    const state = tagModalReducer(undefined, action);
    const expected: TagModalState = {
      ...INITIAL_STATE,
      modalIsActive: true,
      modalView: TagModalView.Detail,
      tagDetailId: id,
    };

    expect(state).toEqual(expected);
  });

  it('should respond to a(n) OPEN_TAG_LIST action', () => {
    const action = tagModalActions.openTagList();
    const state = tagModalReducer(undefined, action);
    const expected: TagModalState = {
      ...INITIAL_STATE,
      modalIsActive: true,
      modalView: TagModalView.Detail,
    };

    expect(state).toEqual(expected);
  });

  it('should respond to a(n) OPEN_TAG_CREATE action', () => {
    const action = tagModalActions.openTagCreate();
    const state = tagModalReducer(undefined, action);
    const expected: TagModalState = {
      ...INITIAL_STATE,
      modalIsActive: true,
      modalView: TagModalView.Create,
    };

    expect(state).toEqual(expected);
  });

  it('should respond to a(n) SWITCH_VIEW action', () => {
    const action = tagModalActions.switchView(TagModalView.Create);
    const state = tagModalReducer(undefined, action);
    const expected: TagModalState = {
      ...INITIAL_STATE,
      modalView: TagModalView.Create,
    };

    expect(state).toEqual(expected);
  });

  it('should respond to a(n) FETCH_TAG_DETAIL action', () => {
    const id = 4;
    const action = tagModalActions.fetchTagDetail(id);
    const state = tagModalReducer(undefined, action);
    const expected: TagModalState = {
      ...INITIAL_STATE,
      tagDetailIsLoading: true,
      tagDetailId: id,
    };

    expect(state).toEqual(expected);
  });

  it('should respond to a(n) FETCH_TAG_DETAIL_SUCCESS action', () => {
    const tag: any = { id: 5 };
    const action = tagModalActions.fetchTagDetailSuccess(tag);
    const initial: TagModalState = { ...INITIAL_STATE, tagDetailIsLoading: true };
    const state = tagModalReducer(initial, action);
    const expected: TagModalState = {
      ...INITIAL_STATE,
      tagDetailIsLoading: false,
      tagDetail: tag,
    };

    expect(state).toEqual(expected);
  });

  it('should respond to a(n) FETCH_TAG_DETAIL_FAILURE action', () => {
    const action = tagModalActions.fetchTagDetailFailure();
    const state = tagModalReducer(undefined, action);
    const expected: TagModalState = {
      ...INITIAL_STATE,
      tagDetailIsLoading: false,
      tagDetail: undefined,
      tagDetailError: true,
    };

    expect(state).toEqual(expected);
  });

  it('should respond to a(n) CLOSE_MODAL action', () => {
    const action = tagModalActions.closeModal();
    const state = tagModalReducer(undefined, action);
    const expected: TagModalState = { ...INITIAL_STATE };

    expect(state).toEqual(expected);
  });
});
