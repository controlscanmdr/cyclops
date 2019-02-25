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
import * as React from 'react';
import {
  Link,
  IndexLink,
} from 'react-router';

// Local
import { getConfig } from '~/config';
import { MonitorStatusContainer } from '../containers/MonitorStatusContainer';
import { LogoutModal } from './LogoutModal';
import { SearchLinkContainer } from '../containers/SearchLinkContainer';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the Header component. */
interface HeaderProps {
  /** Current url location. */
  location: string;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Header component that controls page navigation and site-wide information.
 * @param {HeaderProps} props
 */
export class Header extends React.Component<HeaderProps, {}> {
  public render(): JSX.Element {
    const adminLink = getConfig().ADMIN_URL
      ? (
        <div className="flex-item flex--shrink">
          <a
            id="admin-link"
            className="header__link"
            target="_blank"
            href={getConfig().ADMIN_URL}
          >
            Admin
          </a>
        </div>
      ) : null;

    return (
      <nav className="flex-box header">
        <div className="flex-box flex-box--align-center flex--shrink">
          <img className="header__logo" src={getConfig().CYPHON_LOGO_URL} alt="Cyphon"/>
        </div>

        <div className="flex-box">
          <div className="flex-item flex--shrink">
            <IndexLink
              className="header__link"
              to="/"
              activeClassName="header__link--active"
            >
              Dashboard
            </IndexLink>
          </div>
          <div className="flex-item flex--shrink">
            <Link
              className="header__link"
              to="/alerts/"
              activeClassName="header__link--active"
            >
              Alerts
            </Link>
          </div>
          <div className="flex-item flex--shrink">
            <SearchLinkContainer/>
          </div>
        </div>
        <div className="flex-box flex--shrink">
          {adminLink}
          <MonitorStatusContainer />
          <LogoutModal />
        </div>
      </nav>
    );
  }
}
