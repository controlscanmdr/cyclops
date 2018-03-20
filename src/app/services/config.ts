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
import { User } from '../../users/types/User';

// Cyclops application configuration.
interface AppConfig {
  // ID of the element that will contain the react application.
  APP_CONTAINER_ID: string;

  // User object of the currently authenticated user.
  CURRENT_USER: User;

  // URL of the Cyphon API proxy.
  API_URL: string;

  // Access token for mapbox services. Required for any map actions.
  MAPBOX_ACCESS_TOKEN: string;

  // Base URL for the react application. Used for routing purposes.
  APP_BASE_URL: string;

  // How long the react application should wait before a response to theCyphon API times out.
  API_TIMEOUT: number;

  // URL of the Cyphon Logo when accessed in a browser.
  CYPHON_LOGO_URL: string;

  // If chrome push notifications are enabled.
  NOTIFICATIONS_ENABLED: boolean;

  // Path of the notification service worker.
  NOTIFICATIONS_SERVICE_WORKER_URL: string;

  // URL of the cyphon admin page.
  ADMIN_URL: string;

  // Current version of Cyphon this instance of Cyclops is running on.
  CYPHON_VERSION?: string;
}

// Extended window object that includes the injected application configuration.
interface ExtendedWindow extends Window {
  CONFIG: AppConfig;
}

// Current Cyclops version.
const CYCLOPS_VERSION = '0.4.2';

/**
 * Returns the current Cyclops version. Created for mocking purposes.
 * @returns {string}
 */
export function getVersion(): string {
  return CYCLOPS_VERSION;
}

/**
 * Injected application configuration object from the parent template.
 * @type {AppConfig}
 */
const CONFIG = (window as ExtendedWindow).CONFIG || {};

/**
 * Function that returns the current application configuration. Stub this
 * function in tests to test different configurations.
 * @returns {AppConfig}
 */
export function getConfig(): AppConfig {
  return CONFIG;
}
