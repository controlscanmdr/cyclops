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
import { ThunkActionPromise, Action } from '../../common/types/Redux';
import * as notifications from '../services/notifications';
import { addError } from '../../errors/actions/errorModalActions';

// NOTIFICATIONS_ENABLED
// --------------------------------------------------------------------------

export const NOTIFICATIONS_ENABLED = 'NOTIFICATIONS:NOTIFICATIONS_ENABLED';
export type NotificationsEnabledAction = Action<typeof NOTIFICATIONS_ENABLED, boolean>;
export const notificationsEnabled = (enabled: boolean): NotificationsEnabledAction => ({
  type: NOTIFICATIONS_ENABLED,
  payload: enabled,
});

// NOTIFICATIONS_NOT_SUPPORTED
// --------------------------------------------------------------------------

export const NOTIFICATIONS_NOT_SUPPORTED = 'NOTIFICATIONS:NOTIFICATIONS_NOT_SUPPORTED';
export type NotificationsNotSupportedAction = Action<
  typeof NOTIFICATIONS_NOT_SUPPORTED,
  undefined>;
export const notificationsNotSupported = (): NotificationsNotSupportedAction => ({
  type: NOTIFICATIONS_NOT_SUPPORTED,
  payload: undefined,
});

// NOTIFICATIONS_ALLOWED
// --------------------------------------------------------------------------

export const NOTIFICATIONS_ALLOWED = 'NOTIFICATIONS:NOTIFICATIONS_ALLOWED';
export type NotificationsAllowedAction = Action<typeof NOTIFICATIONS_ALLOWED, boolean>;
export const notificationsAllowed = (allowed: boolean): NotificationsAllowedAction => ({
  type: NOTIFICATIONS_ALLOWED,
  payload: allowed,
});

// PUSH_MESSAGING_NOT_SUPPORTED
// --------------------------------------------------------------------------

export const PUSH_MESSAGING_NOT_SUPPORTED = 'NOTIFICATIONS:PUSH_MESSAGING_NOT_SUPPORTED';
export type PushMessagingNotSupportedAction = Action<
  typeof PUSH_MESSAGING_NOT_SUPPORTED,
  undefined>;
export const pushMessagingNotSupported = (): PushMessagingNotSupportedAction => ({
  type: PUSH_MESSAGING_NOT_SUPPORTED,
  payload: undefined,
});

// SERVICE_WORKERS_NOT_SUPPORTED
// --------------------------------------------------------------------------

export const SERVICE_WORKERS_NOT_SUPPORTED = 'NOTIFICATIONS:SERVICE_WORKERS_NOT_SUPPORTED';
export type ServiceWorkersNotSupportedAction = Action<
  typeof SERVICE_WORKERS_NOT_SUPPORTED,
  undefined>;
export const serviceWorkersNotSupported = (): ServiceWorkersNotSupportedAction => ({
  type: SERVICE_WORKERS_NOT_SUPPORTED,
  payload: undefined,
});

// SERVICE_WORKER_REGISTERED
// --------------------------------------------------------------------------

export const SERVICE_WORKER_REGISTERED = 'NOTIFICATIONS:SERVICE_WORKER_REGISTERED';
export type ServiceWorkerRegisteredAction = Action<typeof SERVICE_WORKER_REGISTERED, undefined>;
export const serviceWorkerRegistered = (): ServiceWorkerRegisteredAction => ({
  type: SERVICE_WORKER_REGISTERED,
  payload: undefined,
});

// --------------------------------------------------------------------------
// Thunk Actions
// --------------------------------------------------------------------------

/**
 * Sets up the application for push notifications.
 * @returns {ThunkActionPromise}
 */
export function setupNotifications(): ThunkActionPromise {
  return (dispatch) => {
    if (notifications.serviceWorkersAreSupported()) {
      return notifications.registerServiceWorker().then(() => {
        dispatch(serviceWorkerRegistered());

        if (!notifications.notificationsAreSupported()) {
          dispatch(notificationsNotSupported());
          dispatch(notificationsEnabled(false));
          return;
        }

        if (notifications.notificationsAreDenied()) {
          dispatch(notificationsAllowed(false));
          dispatch(notificationsEnabled(false));
          return;
        }

        if (!notifications.pushMessagingIsSupported()) {
          dispatch(pushMessagingNotSupported());
          dispatch(notificationsEnabled(false));
          return;
        }

        return notifications.getServiceWorkerRegistration()
          .then(notifications.subscribeToPushManager)
          .then((subscription) => {
            if (subscription) {
              notifications.sendSubscriptionToServer(subscription)
                .then(() => {
                  notifications.setWorkerVariables(subscription);
                  dispatch(notificationsEnabled(true));
                })
                .catch((error) => {
                  dispatch(notificationsEnabled(false));
                  dispatch(addError(error));
                });
            }
          });
      });
    }

    dispatch(serviceWorkersNotSupported());

    return Promise.resolve();
  };
}
