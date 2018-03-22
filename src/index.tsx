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
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHistory } from 'history';

// Local
import { getConfig } from './app/services/config';
import Dashboard from './analytics/components/Dashboard';
import { SearchViewContainer } from './search/containers/SearchViewContainer';
import AlertView from './alerts/components/AlertView';
import { store } from './app/services/store';
import Layout from './app/components/Layout';
import AlertDetail from './alerts/components/AlertDetail';

// CSS
import '../node_modules/nvd3/build/nv.d3.css';
import './styles/app.scss';
import '../node_modules/draft-js/dist/Draft.css';

const browserHistory = useRouterHistory(createHistory)({
  // Use base URL given by the parent template.
  basename: getConfig().APP_BASE_URL,
});

// Root application component.
const app = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Dashboard}/>
        <Route path="alerts" component={AlertView}>
          <Route path=":alertId" component={AlertDetail}/>
        </Route>
        <Route path="search" component={SearchViewContainer}/>
      </Route>
    </Router>
  </Provider>
);

render(app, document.getElementById(getConfig().APP_CONTAINER_ID));
