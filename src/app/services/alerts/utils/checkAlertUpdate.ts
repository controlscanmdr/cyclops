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

// Vendor
import * as _ from 'lodash';

// Local
import {
  Alert,
  AlertUpdateRequest,
} from '../types';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Object containing information about the validity of an alert update. */
export interface AlertUpdateCheck {
  /** If the alert update is valid. */
  valid: boolean;
  /** Any errors about the requested alert update. */
  errors: string[];
}

/** Rule to check whenever attempting to update an alert. */
export interface AlertUpdateRule {
  /** Error message if the rule check doesn't pass. */
  message: string;
  /**
   * Checks to see if an alert update request passes this rule.
   * @param alert Alert object to update.
   * @param update Fields to update in the alert.
   * @returns {boolean} If the update is valid.
   */
  check(alert: Alert, update: AlertUpdateRequest): boolean;
}

// --------------------------------------------------------------------------
// Constants
// --------------------------------------------------------------------------

/**
 * Collection of rules to check when validating an alert update request.
 * @type {AlertUpdateRule[]}
 */
const RULES: AlertUpdateRule[] = [{
  message: 'Alert must be assigned before changing the status to Busy.',
  check: (alert, update) => {
    return !(update.status === 'BUSY' && !alert.assigned_user);
  },
}, {
  message: 'Alert cannot be reassigned once it has been resolved.',
  check: (alert, update) => {
    return !(update.assigned_user !== undefined && alert.status === 'DONE');
  },
}, {
  message: 'Analysis must be written before assigning an outcome.',
  check: (alert, update) => !(update.outcome && !alert.notes && !update.notes),
}, {
  message: 'Alert must be assigned before selecting an outcome.',
  check: (alert, update) => !(update.outcome && !alert.assigned_user),
}, {
  message: 'Alert level cannot be changed once it has be resolved.',
  check: (alert, update) => !(update.level && alert.status === 'DONE'),
}];

// --------------------------------------------------------------------------
// Method
// --------------------------------------------------------------------------

/**
 * Checks an alert update request against the alert to modify to see if it's
 * a valid update.
 * @param alert Alert to modify.
 * @param update Fields to modify on the alert.
 * @returns {AlertUpdateCheck} Object specifying if the request is valid.
 */
export function checkAlertUpdate(
  alert: Alert,
  update: AlertUpdateRequest,
): AlertUpdateCheck {
  const alertUpdate: AlertUpdateCheck = { valid: true, errors: [] };

  RULES.forEach((rule) => {
    const passed = rule.check(alert, update);

    if (!passed) {
      alertUpdate.valid = false;
      alertUpdate.errors.push(rule.message);
    }
  });

  return alertUpdate;
}
