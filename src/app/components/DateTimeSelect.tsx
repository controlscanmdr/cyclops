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
import * as DateTime from 'react-datetime';
import * as moment from 'moment';
import * as _ from 'lodash';

interface Props {
  value?: string;
  onChange(value?: string): any;
}

interface State {
  value?: Date;
}

export class DateTimeSelect extends React.Component<Props, State> {
  public static createDate = (value?: string): Date | undefined => {
    return value ? new Date(value) : undefined;
  };

  public static datesEqual(date1?: Date, date2?: Date): boolean {
    if (date1 && date2) { return date1.getTime() === date2.getTime(); }

    return !date1 && !date2;
  }

  public state: State = { value: DateTimeSelect.createDate(this.props.value) };

  public componentWillReceiveProps(props: Props) {
    const date = DateTimeSelect.createDate(props.value);

    if (!DateTimeSelect.datesEqual(date, this.state.value)) {
      this.setState({ value: date });
    }
  }

  public handleChange = (value: moment.Moment | string) => {
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

  public render() {
    return (
      <DateTime onChange={this.handleChange} value={this.state.value} />
    );
  }
}
