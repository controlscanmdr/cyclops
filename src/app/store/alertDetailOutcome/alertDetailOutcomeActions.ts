/**
 * The contents of this file are subject to the CYPHON Proprietary Non-
 * Commercial Registered User Use License Agreement (the "Agreement”). You
 * may not use this file except in compliance with the Agreement, a copy
 * of which may be found at https://github.com/dunbarcyber/cyclops/. The
 * developer of the CYPHON technology and platform is ControlScan, Inc.
 *
 * The CYPHON technology or platform are distributed under the Agreement on
 * an “AS IS” basis, WITHOUT WARRANTY OF ANY KIND, either express or
 * implied. See the Agreement for specific terms.
 *
 * Copyright (C) 2017 ControlScan, Inc. All Rights Reserved.
 *
 * Contributor/Change Made By: ________________. [Only apply if changes
 * are made]
 */

// Local
import { createAction } from '../../utils/reduxUtils';
import {
  ReduxAction,
  ThunkActionPromise,
  ThunkActionVoid,
} from '../types';
import {
  Alert,
  AlertDetail,
  AlertOutcomeChoices,
} from '../../services/alerts/types';
import { updateAlertDetail } from '../alertDetail/alertDetailActions';

/**
 * Action type prefix for AlertDetailOutcome actions.
 * @type {string}
 */
const ACTION_PREFIX = 'ALERT_DETAIL_OUTCOME';

// --------------------------------------------------------------------------
// OPEN
// --------------------------------------------------------------------------

/**
 * Action Type: When the user wants to open the form allowing them to change
 * @type {string}
 */
export const OPEN = `${ACTION_PREFIX}/OPEN`;

/**
 * OPEN payload type.
 */
export type OpenPayload = {
  outcome: AlertOutcomeChoices;
  notes: string;
};

/**
 * OPEN action type.
 */
export type OpenAction = ReduxAction<OpenPayload>;

/**
 * Creates a OPEN action.
 * @returns {OpenAction}
 */
export function open(outcome: AlertOutcomeChoices, notes: string): OpenAction {
  return createAction(OPEN, { outcome, notes });
}

// --------------------------------------------------------------------------
// CLOSE
// --------------------------------------------------------------------------

/**
 * Action Type: When the user wants to close the form that allows them to
 * @type {string}
 */
export const CLOSE = `${ACTION_PREFIX}/CLOSE`;

/**
 * CLOSE payload type.
 */
export type ClosePayload = undefined;

/**
 * CLOSE action type.
 */
export type CloseAction = ReduxAction<ClosePayload>;

/**
 * Creates a CLOSE action.
 * @returns {CloseAction}
 */
export function close(): CloseAction {
  return createAction(CLOSE, undefined);
}

// --------------------------------------------------------------------------
// OPEN_REMOVE_PANEL
// --------------------------------------------------------------------------

/**
 * Action Type: When a panel is presented to the user checking to make sure
 * that they want to remove the outcome and the consequences of doing so.
 * @type {string}
 */
export const OPEN_REMOVE_PANEL = `${ACTION_PREFIX}/OPEN_REMOVE_PANEL`;

/**
 * OPEN_REMOVE_PANEL payload type.
 */
export type OpenRemovePanelPayload = undefined;

/**
 * OPEN_REMOVE_PANEL action type.
 */
export type OpenRemovePanelAction = ReduxAction<OpenRemovePanelPayload>;

/**
 * Creates a OPEN_REMOVE_PANEL action.
 * @returns {OpenRemovePanelAction}
 */
export function openRemovePanel(): OpenRemovePanelAction {
  return createAction(OPEN_REMOVE_PANEL, undefined);
}

// --------------------------------------------------------------------------
// CLOSE_REMOVE_PANEL
// --------------------------------------------------------------------------

/**
 * Action Type: When the remove panel is closed.
 * @type {string}
 */
export const CLOSE_REMOVE_PANEL = `${ACTION_PREFIX}/CLOSE_REMOVE_PANEL`;

/**
 * CLOSE_REMOVE_PANEL payload type.
 */
export type CloseRemovePanelPayload = undefined;

/**
 * CLOSE_REMOVE_PANEL action type.
 */
export type CloseRemovePanelAction = ReduxAction<CloseRemovePanelPayload>;

/**
 * Creates a CLOSE_REMOVE_PANEL action.
 * @returns {CloseRemovePanelAction}
 */
export function closeRemovePanel(): CloseRemovePanelAction {
  return createAction(CLOSE_REMOVE_PANEL, undefined);
}

// --------------------------------------------------------------------------
// CHANGE_OUTCOME
// --------------------------------------------------------------------------

/**
 * Action Type: When the user changes the outcome they want to change the
 * current alert to.
 * @type {string}
 */
export const CHANGE_OUTCOME = `${ACTION_PREFIX}/CHANGE_OUTCOME`;

/**
 * CHANGE_OUTCOME payload type.
 */
export type ChangeOutcomePayload = AlertOutcomeChoices;

/**
 * CHANGE_OUTCOME action type.
 */
export type ChangeOutcomeAction = ReduxAction<ChangeOutcomePayload>;

/**
 * Creates a CHANGE_OUTCOME action.
 * @returns {ChangeOutcomeAction}
 */
export function changeOutcome(
  outcome: AlertOutcomeChoices,
): ChangeOutcomeAction {
  return createAction(CHANGE_OUTCOME, outcome);
}

// --------------------------------------------------------------------------
// CHANGE_NOTES
// --------------------------------------------------------------------------

/**
 * Action Type: When the user changes the notes for the current alert.
 * @type {string}
 */
export const CHANGE_NOTES = `${ACTION_PREFIX}/CHANGE_NOTES`;

/**
 * CHANGE_NOTES payload type.
 */
export type ChangeNotesPayload = string;

/**
 * CHANGE_NOTES action type.
 */
export type ChangeNotesAction = ReduxAction<ChangeNotesPayload>;

/**
 * Creates a CHANGE_NOTES action.
 * @returns {ChangeNotesAction}
 */
export function changeNotes(notes: string): ChangeNotesAction {
  return createAction(CHANGE_NOTES, notes);
}

// --------------------------------------------------------------------------
// Thunk Actions
// --------------------------------------------------------------------------

/**
 * Submits an update to the alert detail's outcome and notes.
 * @param alert Alert to update.
 * @param outcome Outcome to change to.
 * @param notes Notes to change to.
 * @returns {ThunkActionPromise}
 */
export function submit(
  alert: AlertDetail,
  outcome: AlertOutcomeChoices,
  notes: string,
): ThunkActionPromise {
  return (dispatch) => {
    return dispatch(updateAlertDetail(alert, { outcome, notes })).then(() => {
      dispatch(close());
    });
  };
}

/**
 * Removes the current alert outcome.
 * @returns {ThunkActionPromise}
 */
export function removeOutcome(alert: AlertDetail): ThunkActionPromise {
  return (dispatch) => {
    const update = { outcome: null, notes: '' };

    return dispatch(updateAlertDetail(alert, update)).then(() => {
      dispatch(closeRemovePanel());
    });
  };
}
