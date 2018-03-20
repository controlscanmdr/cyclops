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
import { Alert, AlertUpdateRequest } from '../types/Alert';

/**
 * Function that modifies an update request based on the alert to modify
 * and the fields to update on the alert.
 * @param alert The alert object to modify.
 * @param test Fields to update on the alert.
 * @returns {AlertUpdateRequest}
 */
type AlertUpdateModification = (alert: Alert, update: AlertUpdateRequest) => AlertUpdateRequest;

/**
 * Collections of modifications to make to an alert update request before
 * it gets sent to the endpoint.
 * @type {AlertUpdateModification[]}
 */
const MODIFICATIONS: AlertUpdateModification[] = [
  // Change the status to busy when assigning a new alert to a user.
  (alert, update) => {
    if (!update.assigned_user) { return Object.assign({}, update); }
    if (alert.status !== 'NEW') { return Object.assign({}, update); }

    return Object.assign({}, update, { status: 'BUSY' });
  },

  // Change the status to new when unassigning an alert.
  (alert, update) => {
    if (update.assigned_user !== null || alert.status !== 'BUSY') {
      return Object.assign({}, update);
    }

    return Object.assign({}, update, { status: 'NEW' });
  },

  // Change the status to done if an outcome is selected.
  (alert, update) => {
    if (!update.outcome) { return Object.assign({}, update); }

    return Object.assign({}, update, { status: 'DONE' });
  },

  // Change the status to busy if an outcome is being removed.
  (alert, update) => {
    if (update.outcome === null && alert.status === 'DONE') {
      return Object.assign({}, update, { status: 'BUSY' });
    }

    return Object.assign({}, update);
  },

  // Remove the outcome if the status is being changed to busy.
  (alert, update) => {
    if (update.status === 'BUSY' && alert.outcome) {
      return Object.assign({}, update, { outcome: null });
    }

    return Object.assign({}, update);
  },
  (alert, update) => {
    if (update.status === 'NEW') {
      return Object.assign({}, update, { outcome: null, assigned_user: null });
    }

    return Object.assign({}, update);
  },
];

/**
 * Modifies an alert update request with certain fields based on the alert
 * to update.
 * @param alert Alert to update.
 * @param update Fields to update on the alert.
 * @returns {AlertUpdateRequest} Modified alert update request.
 */
export function modifyAlertUpdate(
  alert: Alert,
  update: AlertUpdateRequest,
): AlertUpdateRequest {
  let modifiedUpdate: AlertUpdateRequest = update;

  MODIFICATIONS.forEach((modification) => {
    modifiedUpdate = modification(alert, modifiedUpdate);
  });

  return modifiedUpdate;
}
