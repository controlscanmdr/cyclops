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
import { alertDetailTagReducer, INITIAL_STATE, AlertDetailTagState } from './alertDetailTagReducer';
import * as actions from '../actions/alertDetailTagActions';

describe('alertDetailTagReducer()', () => {
  it('should respond to a OPEN_TAG_PANEL action', () => {
    const state = alertDetailTagReducer(undefined, actions.openTagPanel());
    const expected: AlertDetailTagState = { ...INITIAL_STATE, panelIsActive: true };

    expect(state).toEqual(expected);
  });

  it('should respond to a CLOSE_TAG_PANEL action', () => {
    const state = alertDetailTagReducer(undefined, actions.closeTagPanel());
    const expected: AlertDetailTagState = { ...INITIAL_STATE, panelIsActive: false };

    expect(state).toEqual(expected);
  });

  it('should responsd to a SHOW_REMOVAL_CONFIRMATION action', () => {
    const tag: any = { id: 1 };
    const state = alertDetailTagReducer(undefined, actions.showRemovalConfirmation(tag));
    const expected: AlertDetailTagState = {
      ...INITIAL_STATE,
      confirmationIsActive: true,
      tagToRemove: tag,
    };

    expect(state).toEqual(expected);
  });

  it('should respond to a CANCEL_TAG_REMOVAL action', () => {
    const initial: AlertDetailTagState = { ...INITIAL_STATE, confirmationIsActive: true };
    const state = alertDetailTagReducer(initial, actions.cancelTagRemoval());

    expect(state).toEqual(INITIAL_STATE);
  });

  it('should respond to a REMOVE_TAG_SUCCESS action', () => {
    const initial: AlertDetailTagState = { ...INITIAL_STATE, confirmationIsActive: true };
    const state = alertDetailTagReducer(initial, actions.removeTagSuccess());

    expect(state).toEqual(INITIAL_STATE);
  });


});
