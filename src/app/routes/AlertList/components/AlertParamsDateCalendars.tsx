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

// Local
import { Close } from '~/components/Close';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertParamsDateCalendars component. */
interface Props {
  /** Date in string format to search after for alerts. */
  after?: string;
  /** Date in string format to search before for alerts. */
  before?: string;
  /** Closes the date select panel.  */
  close(): any;
  /**
   * Change the time frame to search for alerts.
   * @param time Time frame to search for alerts.
   */
  selectDate(time: { after?: string, before?: string }): any;
}

/** Internal state of the AlertParamsDateCalendars component. */
interface State {
  /** Date to search after for alerts. */
  after?: Date;
  /** Date to search before for alerts. */
  before?: Date;
}

/** Date properties of the state. */
type DateProperties = 'after' | 'before';

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays a slide out panel that allows user to search alerts by date.
 */
export class AlertParamsDateCalendars extends React.Component<Props, State> {
  /**
   * Creates a date from a date time string.
   * @param date Date time string to convert.
   * @returns {Date | undefined} Date or undefined if there is no given string.
   */
  public static createDate(date?: string): Date | undefined {
    return date ? new Date(date) : undefined;
  }

  /**
   * Determines if two dates match.
   * @param date1 First date to compare
   * @param date2 Second date to compare.
   * @returns {boolean} If the two dates match.
   */
  public static datesEqual(date1?: Date, date2?: Date): boolean {
    if (date1 && date2) { return date1.getTime() === date2.getTime(); }

    return !date1 && !date2;
  }

  constructor(props: Props) {
    super(props);

    const after = AlertParamsDateCalendars.createDate(props.after);
    const before = AlertParamsDateCalendars.createDate(props.before);

    this.state = { after, before };
  }

  /**
   * Changes the current before and after internal dates if the
   * current properties don't match.
   * @param props New properties the component will receive.
   */
  public componentWillReceiveProps(props: Props): void {
    const after = AlertParamsDateCalendars.createDate(props.after);
    const before = AlertParamsDateCalendars.createDate(props.before);

    this.updateDate('after', after);
    this.updateDate('before', before);
  }

  /**
   * Updates a date property on the state.
   * @param property Name of the date property to update.
   * @param date Date to update with.
   */
  public updateDate = (property: DateProperties, date?: Date): void => {
    if (!AlertParamsDateCalendars.datesEqual(this.state[property], date)) {
      return this.setState({ [property]: date });
    }
  };

  /**
   * Changes the currently set after date.
   * @param value New date to set to.
   */
  public handleAfterChange = (value: moment.Moment | string): void => {
    if (_.isString(value)) { return; }

    this.setState({ after: value.toDate() });
    this.props.selectDate({
      after: value.format(),
      before: this.state.before ? moment(this.state.before).format() : undefined,
    });
  };

  /**
   * Changes the currently set before date.
   * @param value New date to set to.
   */
  public handleBeforeChange = (value: moment.Moment | string): void => {
    if (_.isString(value)) { return; }

    this.setState({ before: value.toDate() });
    this.props.selectDate({
      after: this.state.after ? moment(this.state.after).format() : undefined,
      before: value.format(),
    });
  };

  /**
   * Renders the component.
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
      <div className="alert-list-params__extender">
        <div className="alert-list-params__extender-close pull-right">
          <Close close={this.props.close} />
        </div>
        <h3 className="sub-title">After</h3>
        <DateTime
          value={this.state.after}
          onChange={this.handleAfterChange}
        />

        <h3 className="sub-title">Before</h3>
        <DateTime
          value={this.state.before}
          onChange={this.handleBeforeChange}
        />
      </div>
    );
  }
}
