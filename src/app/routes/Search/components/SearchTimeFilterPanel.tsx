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
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';

// Local
import { RELATIVE_TIME_OPTIONS } from '~/routes/Search/constants';
import { capitalizeKebabCase } from '~/utils/capitalizeKebabCase';
import { DateTimeSelect } from '~/components/DateTimeSelect';
import './SearchTimeFilterPanel.scss';

interface Props {
  relative?: string;
  after?: string;
  before?: string;
  onRelativeTimeChange(relative: string): any;
  onAbsoluteTimeChange(after?: string, before?: string): any;
}

interface State {
  after?: string;
  before?: string;
}

export class SearchTimeFilterPanel extends React.Component<Props, State> {
  public state: State = {
    after: this.props.after,
    before: this.props.before,
  };

  constructor(props: Props) {
    super(props);
    console.log(props);
    this.state = {
      after: this.props.after,
      before: this.props.before,
    };
  }

  public componentWillReceiveProps(props: Props) {
    if (props.after !== this.state.after) {
      this.setState({ after: props.after });
    }

    if (props.before !== this.state.before) {
      this.setState({ before: props.before });
    }
  }

  public onAfterChange = (value?: string) => {
    this.setState({ after: value });
  };

  public onBeforeChange = (value?: string) => {
    this.setState({ before: value });
  };

  public handleFilterClick = () => {
    this.props.onAbsoluteTimeChange(this.state.after, this.state.before);
  };

  public render() {
    const relativeTimeOptions = Object.keys(RELATIVE_TIME_OPTIONS).map((option) => (
      <ListGroupItem
        key={option}
        active={this.props.relative === option}
        onClick={() => this.props.onRelativeTimeChange(option)}
      >
        {capitalizeKebabCase(option)}
      </ListGroupItem>
    ));

    return (
      <div className="flex-box flex--shrink SearchTimeFilterPanel">
        <div className="flex-item flex--shrink">
          <ListGroup>{relativeTimeOptions}</ListGroup>
        </div>
        <div className="flex-item flex--shrink SearchTimeFilterPanel__DateTimeContainer">
          <div className="text--emphasis"><b>After:</b></div>
          <DateTimeSelect
            value={this.state.after}
            onChange={this.onAfterChange}
          />
        </div>
        <div className="flex-item flex--shrink SearchTimeFilterPanel__DateTimeContainer">
          <div className="text--emphasis"><b>Before:</b></div>
          <DateTimeSelect
            value={this.state.before}
            onChange={this.onBeforeChange}
          />
        </div>
        <div className="flex-item SearchTimeFilterPanel__FilterButton">
          <Button onClick={this.handleFilterClick}>Filter</Button>
        </div>
      </div>
    );
  }
}
