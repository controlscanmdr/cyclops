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
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';

// Local
import { RELATIVE_TIME_OPTIONS } from '../services/relativeTimeOptions';
import { capitalizeKebabCase } from '../../common/services/capitalizeKebabCase';
import { DateTimeSelect } from '../../common/components/DateTimeSelect';
import './SearchTimeFilterPanel.scss';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Relative time search for date.
  relative?: string;

  // Time to search for results after.
  after?: string;

  // Time to search for alerts before.
  before?: string;

  /**
   * Function triggered When the relative time changes.
   * @param {string} relative
   * @returns {any}
   */
  onRelativeTimeChange(relative: string): any;

  /**
   * Function triggered when the absolute time changes.
   * @param {string} after
   * @param {string} before
   * @returns {any}
   */
  onAbsoluteTimeChange(after?: string, before?: string): any;
}

interface State {
  // Time to search after.
  after?: string;

  // Time to search before.
  before?: string;
}

// Component
// --------------------------------------------------------------------------

// Panel that allows user to determine relative and absolute times to limit searches to.
export class SearchTimeFilterPanel extends React.Component<Props, State> {
  state: State = {
    after: this.props.after,
    before: this.props.before,
  };

  componentWillReceiveProps(props: Props) {
    if (props.after !== this.state.after) {
      this.setState({ after: props.after });
    }

    if (props.before !== this.state.before) {
      this.setState({ before: props.before });
    }
  }

  /**
   * Handles when the after value changes for time filtering.
   * @param {string} value
   */
  onAfterChange = (value?: string) => {
    this.setState({ after: value });
  };

  /**
   * Handles when the before value changes for time filtering.
   * @param {string} value
   */
  onBeforeChange = (value?: string) => {
    this.setState({ before: value });
  };

  // Handles when the filter action is clicked.
  handleFilterClick = () => {
    this.props.onAbsoluteTimeChange(this.state.after, this.state.before);
  };

  render() {
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
