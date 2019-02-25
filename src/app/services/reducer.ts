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
import { combineReducers } from 'redux';

// Local
import {
  NotificationsState as NotificationsState,
  NotificationsReducer as NotificationsReducer,
} from './notifications/reducers/notificationReducer';
import {
  UsersReducer,
  UsersState,
} from '~/services/users/reducer';
import {
  AlertServiceReducerState,
  alertServiceReducer,
} from './alerts';

/** Redux state shape for services. */
export interface ServicesReducerState {
  alerts: AlertServiceReducerState;
  notifications: NotificationsState;
  users: UsersState;
}

/** Redux reducer for services. */
export const servicesReducer = combineReducers<ServicesReducerState>({
  alerts: alertServiceReducer,
  notifications: NotificationsReducer,
  users: UsersReducer,
});
