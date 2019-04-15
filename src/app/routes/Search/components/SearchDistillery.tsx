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
import * as classnames from 'classnames';

import { DistilleryNested } from '~/services/distilleries/types';
import './SearchDistillery.scss';
import { SearchFields } from '~/routes/Search/components/SearchFields';

interface Props {
  distillery: DistilleryNested;
}

interface State {
  active: boolean;
}

/**
 * Displays field and container information about a distillery.
 */
export class SearchDistillery extends React.Component<Props, State> {
  public state: State = { active: false };

  public handleClick = () => {
    this.setState({ active: !this.state.active });
  };

  public render() {
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
