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

import * as React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  useRouterHistory,
} from 'react-router';
import { createHistory } from 'history';
import { Provider } from 'react-redux';

import { getConfig } from './config';
import { store } from './store';
import * as routes from './routes';

const browserHistory = useRouterHistory(createHistory)({
  // Use base URL given by the parent template.
  basename: getConfig().APP_BASE_URL,
});

// Root application component.
export const App = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={routes.AppRouteComponent}>
        <IndexRoute component={routes.DashboardRouteComponent}/>
        <Route path="alerts" component={routes.AlertListRouteComponent}>
          <Route path=":alertId" component={routes.AlertDetailRouteComponent}/>
        </Route>
        <Route path="search" component={routes.SearchRouteComponent}/>
      </Route>
    </Router>
  </Provider>
);
