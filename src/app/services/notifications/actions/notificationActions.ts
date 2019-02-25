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
import { createAction } from '~/utils/reduxUtils';
import {
  ReduxAction,
  ThunkActionPromise,
} from '~/store/types';
import * as notifications from '../utils/notifications';
import { addError } from '~/store/errorModal/errorModalActions';

/**
 * Action type prefix for Notification actions.
 * @type {string}
 */
const ACTION_PREFIX = 'NOTIFICATIONS';

// --------------------------------------------------------------------------
// NOTIFICATIONS_ENABLED
// --------------------------------------------------------------------------

/**
 * Action Type: Notifies if notifications have been enabled or disabled.
 * @type {string}
 */
export const NOTIFICATIONS_ENABLED = `${ACTION_PREFIX}/NOTIFICATIONS_ENABLED`;

/**
 * NOTIFICATIONS_ENABLED payload type.
 */
export type NotificationsEnabledPayload = boolean;

/**
 * NOTIFICATIONS_ENABLED action type.
 */
export type NotificationsEnabledAction = ReduxAction<NotificationsEnabledPayload>;

/**
 * Creates a NOTIFICATIONS_ENABLED action.
 * @returns {NotificationsEnabledAction}
 */
export function notificationsEnabled(
  enabled: boolean,
): NotificationsEnabledAction {
  return createAction(NOTIFICATIONS_ENABLED, enabled);
}

// --------------------------------------------------------------------------
// NOTIFICATIONS_NOT_SUPPORTED
// --------------------------------------------------------------------------

/**
 * Action Type: Notifies that application that notifications are not supported.
 * @type {string}
 */
export const NOTIFICATIONS_NOT_SUPPORTED =
  `${ACTION_PREFIX}/NOTIFICATIONS_NOT_SUPPORTED`;

/**
 * NOTIFICATIONS_NOT_SUPPORTED payload type.
 */
export type NotificationsNotSupportedPayload = undefined;

/**
 * NOTIFICATIONS_NOT_SUPPORTED action type.
 */
export type NotificationsNotSupportedAction = ReduxAction<
  NotificationsNotSupportedPayload
>;

/**
 * Creates a NOTIFICATIONS_NOT_SUPPORTED action.
 * @returns {NotificationsNotSupportedAction}
 */
export function notificationsNotSupported(): NotificationsNotSupportedAction {
  return createAction(NOTIFICATIONS_NOT_SUPPORTED, undefined);
}

// --------------------------------------------------------------------------
// NOTIFICATIONS_ALLOWED
// --------------------------------------------------------------------------

/**
 * Action Type: Notifies the application if notifications are allowed by
 * the user.
 * @type {string}
 */
export const NOTIFICATIONS_ALLOWED = `${ACTION_PREFIX}/NOTIFICATIONS_ALLOWED`;

/**
 * NOTIFICATIONS_ALLOWED payload type.
 */
export type NotificationsAllowedPayload = boolean;

/**
 * NOTIFICATIONS_ALLOWED action type.
 */
export type NotificationsAllowedAction = ReduxAction<
  NotificationsAllowedPayload
>;

/**
 * Creates a NOTIFICATIONS_ALLOWED action.
 * @returns {NotificationsAllowedAction}
 */
export function notificationsAllowed(
  allowed: boolean,
): NotificationsAllowedAction {
  return createAction(NOTIFICATIONS_ALLOWED, allowed);
}

// --------------------------------------------------------------------------
// PUSH_MESSAGING_NOT_SUPPORTED
// --------------------------------------------------------------------------

/**
 * Action Type: Notifies the application that push messaging is not supported
 * in this browser.
 * @type {string}
 */
export const PUSH_MESSAGING_NOT_SUPPORTED =
  `${ACTION_PREFIX}/PUSH_MESSAGING_NOT_SUPPORTED`;

/**
 * PUSH_MESSAGING_NOT_SUPPORTED payload type.
 */
export type PushMessagingNotSupportedPayload = undefined;

/**
 * PUSH_MESSAGING_NOT_SUPPORTED action type.
 */
export type PushMessagingNotSupportedAction = ReduxAction<
  PushMessagingNotSupportedPayload
  >;

/**
 * Creates a PUSH_MESSAGING_NOT_SUPPORTED action.
 * @returns {PushMessagingNotSupportedAction}
 */
export function pushMessagingNotSupported(): PushMessagingNotSupportedAction {
  return createAction(PUSH_MESSAGING_NOT_SUPPORTED, undefined);
}

// --------------------------------------------------------------------------
// SERVICE_WORKERS_NOT_SUPPORTED
// --------------------------------------------------------------------------

/**
 * Action Type: Notifies the application that service workers are not
 * supported in this browser.
 * @type {string}
 */
export const SERVICE_WORKERS_NOT_SUPPORTED =
  `${ACTION_PREFIX}/SERVICE_WORKERS_NOT_SUPPORTED`;

/**
 * SERVICE_WORKERS_NOT_SUPPORTED payload type.
 */
export type ServiceWorkersNotSupportedPayload = undefined;

/**
 * SERVICE_WORKERS_NOT_SUPPORTED action type.
 */
export type ServiceWorkersNotSupportedAction = ReduxAction<
  ServiceWorkersNotSupportedPayload
>;

/**
 * Creates a SERVICE_WORKERS_NOT_SUPPORTED action.
 * @returns {ServiceWorkersNotSupportedAction}
 */
export function serviceWorkersNotSupported(): ServiceWorkersNotSupportedAction {
  return createAction(SERVICE_WORKERS_NOT_SUPPORTED, undefined);
}

// --------------------------------------------------------------------------
// SERVICE_WORKER_REGISTERED
// --------------------------------------------------------------------------

/**
 * Action Type: Notifies the application that the service worker handling
 * @type {string}
 */
export const SERVICE_WORKER_REGISTERED =
  `${ACTION_PREFIX}/SERVICE_WORKER_REGISTERED`;

/**
 * SERVICE_WORKER_REGISTERED payload type.
 */
export type ServiceWorkerRegisteredPayload = undefined;

/**
 * SERVICE_WORKER_REGISTERED action type.
 */
export type ServiceWorkerRegisteredAction = ReduxAction<
  ServiceWorkerRegisteredPayload
>;

/**
 * Creates a SERVICE_WORKER_REGISTERED action.
 * @returns {ServiceWorkerRegisteredAction}
 */
export function serviceWorkerRegistered(): ServiceWorkerRegisteredAction {
  return createAction(SERVICE_WORKER_REGISTERED, undefined);
}

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

// /**
//  * Enables push notifications
//  * @returns {ThunkActionPromise}
//  */
// export function enableNotifications(): ThunkActionPromise {
//   return (dispatch) => {
//     return notifications.getServiceWorkerRegistration()
//       .then(notifications.subscribeToPushManager)
//       .then((subscription) => {
//         notifications.setWorkerVariables(subscription);
//
//         return notifications.sendSubscriptionToServer(subscription);
//       })
//       .then(() => {
//         dispatch(notificationsEnabled(true));
//       })
//       .catch((error) => {
//         dispatch(notificationsEnabled(false));
//         dispatch(addError(error));
//       });
//   };
// }
//
// /**
//  * Disables push notifications.
//  * @returns {ThunkActionPromise}
//  */
// export function disableNotifications(): ThunkActionPromise {
//   return (dispatch) => {
//     return notifications.getServiceWorkerRegistration()
//       .then(notifications.getRegistrationSubscription)
//       .then((subscription) => {
//         if (subscription) { return notifications.unsubscribe(subscription); }
//       })
//       .then(() => {
//         dispatch(notificationsEnabled(false));
//       })
//       .catch((error) => {
//         dispatch(addError(error));
//       });
//   };
// }
