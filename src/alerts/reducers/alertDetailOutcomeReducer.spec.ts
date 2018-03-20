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
import { alertDetailOutcome, INITIAL_STATE } from './alertDetailOutcomeReducer';
import * as actions from '../actions/alertDetailOutcomeActions';

describe('alertDetailOutcome', () => {
  describe('OPEN', () => {
    it('should update the state with the given payload data', () => {
      const action = actions.openEditPanel();
      const state = alertDetailOutcome({} as any, action);

      expect(state).toEqual({
        active: true,
      });
    });
  });

  describe('CLOSE', () => {
    it('should return the initial state', () => {
      const action = actions.closeEditPanel();
      const state = alertDetailOutcome({} as any, action);

      expect(state).toEqual(INITIAL_STATE);
    });
  });

  describe('OPEN_REMOVE_PANEL', () => {
    it('should update the state with the given payload data', () => {
      const action = actions.openRemovePanel();
      const state = alertDetailOutcome({} as any, action);

      expect(state).toEqual({
        showRemovePanel: true,
      });
    });
  });

  describe('CLOSE_REMOVE_PANEL', () => {
    it('should update the state with the given payload data', () => {
      const action = actions.closeRemovePanel();
      const state = alertDetailOutcome({} as any, action);

      expect(state).toEqual({
        showRemovePanel: false,
      });
    });
  });
});
