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
import { createAction } from '../../common/services/reduxUtils';
import { ReduxAction } from '../../common/types/Redux';
import { StoredError } from '../types/StoredError';

/**
 * Action type prefix for ErrorPopup actions.
 * @type {string}
 */
const ACTION_PREFIX = 'ERROR_POPUP';

// ADD_ERROR
// --------------------------------------------------------------------------

export const ADD_ERROR = `${ACTION_PREFIX}/ADD_ERROR`;
export type AddErrorAction = ReduxAction<StoredError>;
export function addError(error: StoredError): AddErrorAction {
  return createAction(ADD_ERROR, error);
}

// VIEW_ERROR
// --------------------------------------------------------------------------

export const VIEW_ERROR = `${ACTION_PREFIX}/VIEW_ERROR`;
export type ViewErrorAction = ReduxAction<number>;

/**
 * Creates a VIEW_ERROR action.
 * @returns {ReduxAction<ViewErrorPayload>;
 */
export function viewError(index: number): ViewErrorAction {
  return createAction(VIEW_ERROR, index);
}

// --------------------------------------------------------------------------
// CLEAR_ERRORS
// --------------------------------------------------------------------------

/**
 * Action Type: When the user wants to clear all the currently stored errors.
 * @type {string}
 */
export const CLEAR_ERRORS = `${ACTION_PREFIX}/CLEAR_ERRORS`;

/**
 * CLEAR_ERRORS payload type.
 */
export type ClearErrorsPayload = undefined;

/**
 * CLEAR_ERRORS action type.
 */
export type ClearErrorsAction = ReduxAction<ClearErrorsPayload>;

/**
 * Creates a CLEAR_ERRORS action.
 * @returns {ReduxAction<ClearErrorsPayload>;
 */
export function clearErrors(): ClearErrorsAction {
  return createAction(CLEAR_ERRORS, undefined);
}
