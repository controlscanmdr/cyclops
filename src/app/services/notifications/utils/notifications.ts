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
import { getConfig } from '~/config';
import { post } from '~/services/cyphon/utils/cyphonAPI';

/**
 * Unsubscribe from push notifications
 * @param subscription
 * @returns {Promise<any>}
 */
export function unsubscribe(subscription: any): Promise<any> {
  return subscription.unsubscribe();
}

/**
 * Registers the notification service worker with this application.
 * @returns {Promise<any>}
 */
export function registerServiceWorker(): Promise<any> {
  return (navigator as any)
    .serviceWorker
    .register(getConfig().NOTIFICATIONS_SERVICE_WORKER_URL);
}

/**
 * Subscribes the user to push notifications.
 * @param registration
 * @returns {Promise<PushSubscription>}
 */
export function subscribeToPushManager(
  registration: any,
): Promise<any> {
  return registration.pushManager.subscribe({ userVisibleOnly: true });
}

/**
 * Gets the registration id of the push messaging subscription.
 * @param subscription
 * @returns {string}
 */
export function getRegistrationId(subscription: any): string {
  const urlSplit = subscription.endpoint.split('/');

  return urlSplit[urlSplit.length - 1];
}

/**
 * Sends the subscription information to the Cyphon server.
 * @param subscription
 * @returns {Promise<any>}
 */
export function sendSubscriptionToServer(subscription: any): Promise<any> {
  const postData = { registration_id: getRegistrationId(subscription) };

  return post('/notifications/subscribe/', postData);
}

/**
 * Checks if service workers are supported.
 * @returns {boolean} If service workers are supported.
 */
export function serviceWorkersAreSupported(): boolean {
  return 'serviceWorker' in navigator;
}

/**
 * Checks if push messaging is supported.
 * @returns {boolean} If push messaging is supported.
 */
export function pushMessagingIsSupported(): boolean {
  return 'PushManager' in window;
}

/**
 * Checks if notifications are supported.
 * @returns {boolean}
 */
export function notificationsAreSupported(): boolean {
  return 'showNotification' in ServiceWorkerRegistration.prototype;
}

/**
 * Gets the registration object associated with a service worker.
 * @returns {Promise<any>}
 */
export function getServiceWorkerRegistration(): Promise<any> {
  return (navigator as any).serviceWorker.ready;
}

/**
 * Check if notifications are denied by the user.
 * @returns {boolean}
 */
export function notificationsAreDenied(): boolean {
  return (Notification as any).permission === 'denied';
}

/**
 * Gets the push notification subscription from a service worker
 * registration.
 * @param registration Service worker registration.
 * @returns {Promise<any>} Push notification subscription.
 */
export function getRegistrationSubscription(registration: any): Promise<any> {
  return registration.pushManager.getSubscription();
}

/**
 * Sends any necessary information necessary for retrieving push notifications
 * to the service worker.
 * @param subscription
 */
export function setWorkerVariables(subscription: any): void {
  const registrationId = getRegistrationId(subscription);

  (navigator as any).serviceWorker.controller.postMessage({
    notificationUrl:
      `${getConfig().API_URL}/notifications/` +
      `?registration_id=${registrationId}`,
  });
}
