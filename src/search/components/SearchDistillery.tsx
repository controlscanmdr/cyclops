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
import * as classnames from 'classnames';

// Local
import { DistilleryNested } from '../../distilleries/types/Distillery';
import { SearchFields } from './SearchFields';
import './SearchDistillery.scss';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Distillery info to display.
  distillery: DistilleryNested;
}

interface State {
  // If the distillery information is currently viewable.
  active: boolean;
}

// Displays field and container information about a distillery.
export class SearchDistillery extends React.Component<Props, State> {
  state: State = { active: false };

  handleClick = () => {
    this.setState({ active: !this.state.active });
  };

  render() {
    const classes = classnames('SearchDistillery__Distillery', {
      'SearchDistillery__Distillery--active': this.state.active,
    });
    const iconClasses = classnames('SearchDistillery__Icon fa', {
      'fa-caret-down': !this.state.active,
      'fa-caret-up': this.state.active,
    });
    const fields = this.state.active
      ? (
        <div className="SearchDistillery__SearchFields">
          <SearchFields fields={this.props.distillery.container.fields}/>
        </div>
      ) : null;

    return (
      <div className="SearchDistillery">
        <button
          className={classes}
          onClick={this.handleClick}
        >
          {this.props.distillery.name}
          {' '}
          <i className={iconClasses} />
        </button>
        {fields}
      </div>
    );
  }
}
