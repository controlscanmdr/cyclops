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

// Vendor
import { CancelToken } from 'axios';

// Local
import * as api from '../../cyphon/services/cyphonAPI';
import { getConfig } from '../../app/services/config';
import { APIList } from '../../cyphon/types/Response';
import {
  AlertSearchParams,
  AlertUpdateRequest,
  AlertLevelTimeseries,
  AlertLocationResponse,
  AlertDetail,
  AlertListItem,
  Category,
} from '../types/Alert';
import { Dictionary } from '../../common/types/object';

/**
 * Returns an alerts that matches the ID.
 * @param alertId The ID of the alerts.
 * @param cancelToken Cancel token to use to cancel the request.
 * @return {Promise<AlertDetail>}
 */
export function fetchAlert(
  alertId: number,
  cancelToken?: CancelToken,
): Promise<AlertDetail> {
  return api.get(`/alerts/${alertId}/`, { cancelToken });
}

/**
 * Gets an array of alerts that match the given parameters.
 * @param params Search parameters to filter alerts with.
 * @param cancelToken Cancel token to use to cancel the request.
 * @return {Promise<APIList<AlertDetail>>}
 */
export function fetchAlertList(
  params: AlertSearchParams,
  cancelToken?: CancelToken,
): Promise<APIList<AlertListItem>> {
  return api.get('/alerts/', { params, cancelToken });
}

/**
 * Performs an action on a certain alerts.
 * @param actionId ID of the action to perform.
 * @param alertId ID of the alerts to perform the action on.
 * @param cancelToken Cancel token used to cancel the request.
 * @return {Promise<any>}
 */
export const performAction = (
  actionId: number,
  alertId: number,
  cancelToken?: CancelToken,
): Promise<AlertDetail> => {
  const params = { alert: alertId };

  return api.post(`/actions/${actionId}/run/`, params, { cancelToken })
    .then(() => fetchAlert(alertId, cancelToken));
};

/**
 * Updates fields on an alerts with new fields.
 * @param alertId Id of the alerts to modify.
 * @param fields Fields to modify on the alerts.
 * @param cancelToken Cancel token to use to cancel the request.
 * @return {Promise<AlertDetail>}
 */
export function updateAlert(
  alertId: number,
  fields: AlertUpdateRequest,
  cancelToken?: CancelToken,
): Promise<AlertDetail> {
  const assignedUser = fields.assigned_user;
  let modifiedFields;

  if (assignedUser) {
    modifiedFields = Object.assign(
      {},
      fields,
      { assigned_user: assignedUser.id },
    );
  } else {
    modifiedFields = Object.assign({}, fields);
  }

  return api.patch(`/alerts/${alertId}/`, modifiedFields, { cancelToken });
}

/**
 * Adds a comment to an alerts.
 * @param alertId The ID of the alerts to attach the comment to.
 * @param comment The content of the comment.
 * @param cancelToken Cancel token used to cancel the request.
 * @return {Promise<AlertDetail>}
 */
export function addComment(
  alertId: number,
  comment: string,
  cancelToken?: CancelToken,
): Promise<AlertDetail> {
  const userId = getConfig().CURRENT_USER.id;
  const commentObject = { alert: alertId, user: userId, content: comment };

  return api.post('/comments/', commentObject, { cancelToken })
    .then(() => fetchAlert(alertId, cancelToken));
}

/**
 * Get the number of alerts sorted by level over a specified number of days.
 * @param days Number of days to search over.
 * @param cancelToken Cancel token used to cancel the promise.
 * @returns {Promise<Dictionary<number>>}
 */
export function fetchAlertLevelDistribution(
  days: number,
  cancelToken?: CancelToken,
): Promise<Dictionary<number>> {
  const params = { days };

  return api.get('/alerts/levels/', { params, cancelToken });
}

/**
 * Get the number of alerts sorted by status over a specified number of days.
 * @param days Number of days to search over.
 * @param cancelToken Cancel token used to cancel the promise.
 * @returns {Promise<Dictionary<number>>}
 */
export function fetchAlertStatusDistribution(
  days: number,
  cancelToken?: CancelToken,
): Promise<Dictionary<number>> {
  const params = { days };

  return api.get('/alerts/statuses/', { params, cancelToken });
}

/**
 * Gets the number of alerts sorted by collection over a specified number of
 * days.
 * @param days Number of days to search over.
 * @param cancelToken Cancel token used to cancel the promise.
 * @returns {Promise<Dictionary<number>>}
 */
export function fetchAlertCollectionDistribution(
  days: number,
  cancelToken?: CancelToken,
): Promise<Dictionary<number>> {
  const params = { days };

  return api.get('/alerts/collections/', { params, cancelToken });
}

/**
 * Fetches the distribution of alerts per day over a number of days.
 * @param days Number of days to search over.
 * @param cancelToken Cancel token used to cancel the promise.
 * @returns {Promise<AlertLevelTimeseries>}
 */
export function fetchAlertLevelTimeseries(
  days: number,
  cancelToken?: CancelToken,
): Promise<AlertLevelTimeseries> {
  const params = { days };

  return api.get('/alerts/level-timeseries/', { params, cancelToken });
}

/**
 * Gets the alert location geojson of alerts over a specified number of days.
 * @param days Number of days to search over.
 * @param cancelToken Cancel token used to cancel the promise.
 * @returns {Promise<AlertLocationResponse>}
 */
export function fetchAlertLocations(
  days: number,
  cancelToken?: CancelToken,
): Promise<AlertLocationResponse> {
  const params = { days };

  return api.get('/alerts/locations/', { params, cancelToken });
}

/**
 * Gets the categories that some alerts are grouped into.
 * @returns {Promise<Category[]>}
 */
export function fetchAllCategories(): Promise<Category[]> {
  return api.getAll('/categories/');
}
