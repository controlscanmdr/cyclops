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
import * as actions from './alertDetailOutcomeActions';

describe('AlertDetailOutcomeActions', () => {
  describe('openEditPanel()', () => {
    it('should create an action with the OPEN type', () => {
      const action = actions.openEditPanel();

      expect(action).toEqual({
        type: actions.OPEN_EDIT_PANEL,
        payload: undefined,
      });
    });
  });

  describe('closeEditPanel()', () => {
    it('should create an action with the CLOSE type', () => {
      const action = actions.closeEditPanel();

      expect(action).toEqual({
        type: actions.CLOSE_EDIT_PANEL,
        payload: undefined,
      });
    });
  });

  describe('submitOutcomeChange()', () => {
    it('should create an action with the correct action type and payload', () => {
      const outcome = 'completed';
      const notes = 'blah';
      const alert: any = {};
      const action = actions.submitOutcomeChange(alert, outcome, notes);

      expect(action).toEqual({
        type: actions.SUBMIT_OUTCOME_CHANGES,
        payload: { alert, outcome, notes },
      });
    });
  });

  describe('changeNotes()', () => {
    it('should create an action with the correct action type and payload', () => {
      const notes = 'completed';
      const action = actions.changeNotes(notes);

      expect(action).toEqual({
        type: actions.CHANGE_NOTES,
        payload: notes,
        error: undefined,
      });
    });
  });
});
