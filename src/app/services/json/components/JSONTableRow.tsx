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
import * as _ from 'lodash';

import './JSONTableRow.scss';

interface Props {
  data: any;
  field: string;
}

interface State {
  isOverflowing: boolean;
  isOpen: boolean;
}

const URL_MATCH_REGEX = /^https?:\/\//;
const MAX_DATA_HEIGHT = 250;

function isURL(data: any): boolean {
  return _.isString(data) && URL_MATCH_REGEX.test(data);
}

export class JSONTableRow extends React.Component<Props, State> {
  public state: State = {
    isOverflowing: false,
    isOpen: false,
  };

  public dataContainer: HTMLDivElement;

  public setDataContainer = (ref: HTMLDivElement) => this.dataContainer = ref;

  public handleDropdownClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  public componentDidMount() {
    this.setState({
      isOverflowing: this.dataContainer.offsetHeight >= MAX_DATA_HEIGHT,
    });
  }

  public getOverflowVisibilityButton = (): JSX.Element | null => {
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

  public getDataLimiterStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {};

    if (!this.state.isOpen) { styles.maxHeight = MAX_DATA_HEIGHT; }

    return styles;
  };

  public formatData = (): JSX.Element => {
    return isURL(this.props.data)
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

  public getRowContent = (): JSX.Element | JSX.Element[] => {
    return this.state.isOpen
      ? (
        <td colSpan={2}>
          <div className="JSONTableRow__Field JSONTableRow__FieldTitle">
            {this.props.field}
          </div>
          <div className="JSONTableRow__Data">{this.formatData()}</div>
          {this.getOverflowVisibilityButton()}
        </td>
      ) : [(
        <td className="JSONTableRow__Field">{this.props.field}</td>
      ), (
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
      )];
  };

  public render() {
    return (
      <tr className="JSONTableRow">
        {this.getRowContent()}
      </tr>
    );
  }
}
