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
import { Action } from '../../common/types/Redux';
import { AlertDetail, AlertOutcomeChoices } from '../types/Alert';

// OPEN
// --------------------------------------------------------------------------
// Panel that allows user to change the alert detail outcome opens.

export const OPEN_EDIT_PANEL = 'ALERT_DETAIL_OUTCOME:OPEN_EDIT_PANEL';
export type OpenEditPanelAction = Action<typeof OPEN_EDIT_PANEL, undefined>;
export function openEditPanel(): OpenEditPanelAction {
  return {
    type: OPEN_EDIT_PANEL,
    payload: undefined,
  };
}

// CLOSE
// --------------------------------------------------------------------------
// Panel that allows user to change the alert detail outcome closes.

export const CLOSE_EDIT_PANEL = 'ALERT_DETAIL_OUTCOME:CLOSE_EDIT_PANEL';
export type CloseEditPanelAction = Action<typeof CLOSE_EDIT_PANEL>;
export function closeEditPanel(): CloseEditPanelAction {
  return {
    type: CLOSE_EDIT_PANEL,
    payload: undefined,
  };
}

// OPEN_REMOVE_PANEL
// --------------------------------------------------------------------------
// Panel is presented to the user checking to make sure that they want to remove the
// outcome and the consequences of doing so.

export const OPEN_REMOVE_PANEL = 'ALERT_DETAIL_OUTCOME:OPEN_REMOVE_PANEL';
export type OpenRemovePanelAction = Action<typeof OPEN_REMOVE_PANEL>;
export function openRemovePanel(): OpenRemovePanelAction {
  return {
    type: OPEN_REMOVE_PANEL,
    payload: undefined,
  };
}

// CLOSE_REMOVE_PANEL
// --------------------------------------------------------------------------
// Alert detail outcome remove panel is closed.

export const CLOSE_REMOVE_PANEL = 'ALERT_DETAIL_OUTCOME:CLOSE_REMOVE_PANEL';
export type CloseRemovePanelAction = Action<typeof CLOSE_REMOVE_PANEL>;
export function closeRemovePanel(): CloseRemovePanelAction {
  return {
    type: CLOSE_REMOVE_PANEL,
    payload: undefined,
  };
}

// CHANGE_OUTCOME
// --------------------------------------------------------------------------
// User changed the alert detail outcome.

export const CHANGE_OUTCOME = 'ALERT_DETAIL_OUTCOME:CHANGE_OUTCOME';
export type ChangeOutcomeAction = Action<typeof CHANGE_OUTCOME, AlertOutcomeChoices>;
export function changeOutcome(outcome: AlertOutcomeChoices): ChangeOutcomeAction {
  return {
    type: CHANGE_OUTCOME,
    payload: outcome,
  };
}

// CHANGE_NOTES
// --------------------------------------------------------------------------
// User changed the notes for the current alert.

export const CHANGE_NOTES = 'ALERT_DETAIL_OUTCOME:CHANGE_NOTES';
export type ChangeNotesAction = Action<typeof CHANGE_NOTES, string>;
export function changeNotes(notes: string): ChangeNotesAction {
  return {
    type: CHANGE_NOTES,
    payload: notes,
  };
}

// SUBMIT_OUTCOME_CHANGE
// --------------------------------------------------------------------------

export const SUBMIT_OUTCOME_CHANGES = 'ALERT_DETAIL_OUTCOME:SUBMIT_OUTCOME_CHANGE';
export type SubmitOutcomeChangeAction = Action<typeof SUBMIT_OUTCOME_CHANGES, {
  alert: AlertDetail;
  outcome: AlertOutcomeChoices;
  notes: string;
}>;
export const submitOutcomeChange = (
  alert: AlertDetail,
  outcome: AlertOutcomeChoices,
  notes: string,
): SubmitOutcomeChangeAction => ({
  type: SUBMIT_OUTCOME_CHANGES,
  payload: { alert, outcome, notes },
});


// REMOVE_OUTCOME
// --------------------------------------------------------------------------

export const REMOVE_OUTCOME = 'ALERT_DETAIL_OUTCOME:REMOVE_OUTCOME';
export type RemoveOutcomeAction = Action<typeof REMOVE_OUTCOME, AlertDetail>;
export const removeOutcome = (alert: AlertDetail): RemoveOutcomeAction => ({
  type: REMOVE_OUTCOME,
  payload: alert,
});
