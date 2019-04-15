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
import {
  AlertDetail,
  AlertUpdateRequest,
} from '~/services/alerts/types';
import { getLevelDisplayName } from '~/services/alerts/utils/getLevelDisplayName';
import { Dictionary } from '~/types/object';
import { getOutcomeDisplayName } from '~/services/alerts/utils/getOutcomeDisplayName';
import { getUserFullName } from '~/services/users/utils/getUserFullName';
import { isCurrentUser } from '~/services/users/utils/isCurrentUser';

/** Function that creates a comment describing an alert update. */
type CommentCreator = (
  alert: AlertDetail,
  update: AlertUpdateRequest,
) => string;

/**
 * Functions that create comments describing the alert update. The keys are
 * the fields of the alert the returned comment will explain.
 * @type {Dictionary<CommentCreator>}
 */
const creators: Dictionary<CommentCreator> = {
  /**
   * Creates a comment explaining that the alert level was changed.
   * @param alert Alert to update.
   * @param update Fields to update.
   * @returns {string} Update comment.
   */
  level: (alert, update) => {
    if (!update.level || update.level === alert.level) { return ''; }

    return `Changed level from ${getLevelDisplayName(alert.level)} to ` +
      `${getLevelDisplayName(update.level)}.`;
  },
  /**
   * Creates a comment explaining that the alert outcome was changed.
   * @param alert Alert to update.
   * @param update Fields to update.
   * @returns {string} Update comment.
   */
  outcome: (alert, update) => {
    if (update.outcome === undefined) { return ''; }

    const after = getOutcomeDisplayName(update.outcome) || 'none';

    if (!alert.outcome) { return `Changed outcome to ${after}.`; }

    const before = getOutcomeDisplayName(alert.outcome);

    if (after === before) { return ''; }

    return `Changed outcome from ${before} to ${after}.`;
  },
  /**
   * Creates a comment explaining that the alert has been reassigned.
   * @param alert Alert to update.
   * @param update Fields to update.
   * @returns {string} Update comment.
   */
  assigned_user: (alert, update) => {
    if (update.assigned_user === undefined) { return ''; }

    const fromUserIsSelf = alert.assigned_user
      ? isCurrentUser(alert.assigned_user)
      : false;
    const fromUser = fromUserIsSelf
      ? 'self'
      : alert.assigned_user ? getUserFullName(alert.assigned_user) : 'none';

    if (update.assigned_user === null) {
      return `Unassigned from ${fromUser}.`;
    }

    const toUserIsSelf = isCurrentUser(update.assigned_user);
    const toUser = toUserIsSelf
      ? 'self'
      : getUserFullName(update.assigned_user);

    if (!alert.assigned_user) { return `Assigned to ${toUser}.`; }
    if (toUser === fromUser) { return ''; }

    return `Assigned from ${fromUser} to ${toUser}.`;
  },
};

/**
 * Creates an alert comment based on the current alert and the fields to
 * update on the alert.
 * @param alert Alert to update.
 * @param update Fields to update.
 * @returns {string} Comment describing the alert update.
 */
export const createAlertUpdateComment: CommentCreator = (alert, update): string => {
  const comments: string[] = [];

  Object.keys(update).forEach((field) => {
    if (creators[field]) {
      const comment = creators[field](alert, update);

      if (comment) { comments.push(comment); }
    }
  });

  return comments.join('\n');
};
