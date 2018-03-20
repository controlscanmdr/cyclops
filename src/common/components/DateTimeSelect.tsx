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
import * as DateTime from 'react-datetime';
import * as moment from 'moment';
import * as _ from 'lodash';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Initial date value.
  value?: string;

  /**
   * Function run whenever the date changes.
   * @param {string} value
   * @returns {any}
   */
  onChange(value?: string): any;
}

interface State {
  // Current stored date.
  value?: Date;
}

// Component
// --------------------------------------------------------------------------

// Date/time select calendar to select date and time.
export class DateTimeSelect extends React.Component<Props, State> {
  /**
   * Creates a date from a string value.
   * @param {string} value
   * @returns {Date | undefined}
   */
  static createDate = (value?: string): Date | undefined => value ? new Date(value) : undefined;

  /**
   * Determines if two dates are equal.
   * @param {Date} date1
   * @param {Date} date2
   * @returns {boolean}
   */
  static datesEqual = (date1?: Date, date2?: Date): boolean => date1 && date2
    ? date1.getTime() === date2.getTime()
    : !date1 && !date2;

  state: State = { value: DateTimeSelect.createDate(this.props.value) };

  componentWillReceiveProps(props: Props) {
    const date = DateTimeSelect.createDate(props.value);

    if (!DateTimeSelect.datesEqual(date, this.state.value)) this.setState({ value: date });
  }

  /**
   * Handles the change event of the DateTime component.
   * @param {moment.Moment | string} value
   */
  handleChange = (value: moment.Moment | string) => {
    if (_.isString(value)) {
      if (value === '') {
        this.setState({ value: undefined });
        this.props.onChange(undefined);
      }
      return;
    }

    this.setState({ value: value.toDate() });
    this.props.onChange(value.format());
  };

  render() {
    return <DateTime onChange={this.handleChange} value={this.state.value} />;
  }
}
