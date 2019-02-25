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

// Local
import { DateTimeSelect } from '~/components/DateTimeSelect';
import './SearchViewTimeFilter.scss';

interface Props {
  after?: string;
  before?: string;
  onChange(time: State): any;
}

interface State {
  after?: string;
  before?: string;
}

/**
 * Time filter that toggles the search time frame results are given.
 */
export class SearchViewTimeFilter extends React.Component<Props, {}> {
  public state: State = {
    after: this.props.after,
    before: this.props.before,
  };

  public componentWillReceiveProps(props: Props) {
    if (props.after !== this.state.after) {
      this.setState({ after: props.after });
    }
    if (props.before !== this.state.before) {
      this.setState({ before: props.before });
    }
  }

  public handleAfterChange = (time: string) => {
    this.setState({ after: time });
  };

  public handleBeforeChange = (time: string) => {
    this.setState({ before: time });
  };

  public handleFilterButtonClick = () => {
    this.props.onChange(this.state);
  };

  public render() {
    return (
      <div>
        <p className="SearchViewTimeFilter__description">
          Defaults to the past 30 minutes.
        </p>
        <h3 className="sub-title">After</h3>
        <DateTimeSelect
          onChange={this.handleAfterChange}
          value={this.state.after}
        />
        <h3 className="sub-title">Before</h3>
        <DateTimeSelect
          onChange={this.handleBeforeChange}
          value={this.state.before}
        />
        <button
          className="btn btn-block btn-default SearchViewTimeFilter__FilterButton"
          onClick={this.handleFilterButtonClick}
        >
          Filter
        </button>
      </div>
    );
  }
}
