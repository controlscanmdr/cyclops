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

import * as React from 'react';
import * as classnames from 'classnames';
import * as _ from 'lodash';

// Local
import './JSONTableRow.scss';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Data to display.
  data: any;

  // Field name of the data.
  field: string;
}

interface State {
  // If the data is too big for the data limiter element.
  isOverflowing: boolean;

  // If the data limiter is currently extended to view all the data.
  isOpen: boolean;
}

// Component
// --------------------------------------------------------------------------

export class JSONTableRow extends React.Component<Props, State> {
  // Regex that can check if a string is a url.
  static URL_MATCH_REGEX = /^https?:\/\//;

  // Maximum height of a limited data container.
  static MAX_DATA_HEIGHT = 250;

  static isURL = (data: any): boolean => {
    return _.isString(data) && JSONTableRow.URL_MATCH_REGEX.test(data);
  };

  state: State = {
    isOverflowing: false,
    isOpen: false,
  };

  // Reference to the data limiter element.
  dataContainer: HTMLDivElement;

  /**
   * Sets the data container variable to the element reference.
   * @param {HTMLDivElement} ref
   * @returns {HTMLDivElement}
   */
  setDataContainer = (ref: HTMLDivElement) => this.dataContainer = ref;

  // Handles the dropdown click action
  handleDropdownClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  componentDidMount() {
    this.setState({
      isOverflowing: this.dataContainer.offsetHeight >= JSONTableRow.MAX_DATA_HEIGHT,
    });
  }

  // Creates the button that allows any overflow content to be viewable.
  getOverflowVisibilityButton = (): JSX.Element | null => {
    if (!this.state.isOverflowing) { return null; }

    const classes = classnames('fa', {
      'fa-caret-down': !this.state.isOpen,
      'fa-caret-up': this.state.isOpen,
    });

    return (
      <button
        className="JSONTableRow__OverflowVisibilityButton"
        onClick={this.handleDropdownClick}
      >
        <i className={classes} />
      </button>
    );
  };

  // Returns the CSS styles of the parent container that limits the data view.
  getDataLimiterStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {};

    if (!this.state.isOpen) { styles.maxHeight = JSONTableRow.MAX_DATA_HEIGHT; }

    return styles;
  };

  // Formats a row of data if it's a link.
  formatData = (): JSX.Element => {
    return JSONTableRow.isURL(this.props.data)
      ? (
        <a
          className="JSONTableRow__Link"
          href={this.props.data}
          target="_blank"
        >
          {this.props.data}
        </a>
      )
      : this.props.data;
  };

  // Returns the main content of the table row.
  getRowContent = (): JSX.Element | JSX.Element[] => {
    if (this.state.isOpen) {
      return (
        <td colSpan={2}>
          <div className="JSONTableRow__Field JSONTableRow__FieldTitle">
            {this.props.field}
          </div>
          <div className="JSONTableRow__Data">{this.formatData()}</div>
          {this.getOverflowVisibilityButton()}
        </td>
      );
    }

    const cells: JSX.Element[] = [];

    cells.push(<td className="JSONTableRow__Field">{this.props.field}</td>);
    cells.push((
      <td className="JSONTableRow__Data">
        <div
          className="JSONTableRow__DataLimiter"
          style={this.getDataLimiterStyles()}
          ref={this.setDataContainer}
        >
          {this.formatData()}
        </div>
        {this.getOverflowVisibilityButton()}
      </td>
    ));

    return cells;
  };

  render() {
    return (
      <tr className="JSONTableRow">
        {this.getRowContent()}
      </tr>
    );
  }
}
