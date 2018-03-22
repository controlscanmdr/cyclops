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

import { SagaIterator } from 'redux-saga';
import { put, race, take, all, takeEvery } from 'redux-saga/effects';

import * as actions from '../actions/alertDetailOutcomeActions';
import {
  UPDATE_ALERT_FAILED,
  UPDATE_ALERT_SUCCESS,
  updateAlert,
} from '../actions/alertDetailActions';

/**
 * Submits a change of the outcome and notes
 * @param {SubmitOutcomeChangeAction} action
 * @returns {SagaIterator}
 */
export function * submitChange(action: actions.SubmitOutcomeChangeAction): SagaIterator {
  const { alert, notes, outcome } = action.payload;

  yield put(updateAlert(alert, { notes, outcome }));

  const { success } = yield race({
    success: take(UPDATE_ALERT_SUCCESS),
    failed: take(UPDATE_ALERT_FAILED),
  });

  if (success) return yield put(actions.closeEditPanel());
}

/**
 * Removes the outcome on the currently selected alert detail.
 * @param {RemoveOutcomeAction} action
 * @returns {SagaIterator}
 */
export function * removeOutcome(action: actions.RemoveOutcomeAction): SagaIterator {
  yield put(updateAlert(action.payload, { notes: '', outcome: null }));

  const { success } = yield race({
    success: take(UPDATE_ALERT_SUCCESS),
    failed: take(UPDATE_ALERT_FAILED),
  });

  if (success) return yield put(actions.closeEditPanel());
}

/**
 * Runs all the alert detail outcome sagas in parallel.
 * @returns {SagaIterator}
 */
export function * alertDetailOutcomeSagas(): SagaIterator {
  yield all([
    takeEvery(actions.SUBMIT_OUTCOME_CHANGES, submitChange),
    takeEvery(actions.REMOVE_OUTCOME, removeOutcome),
  ]);
}
