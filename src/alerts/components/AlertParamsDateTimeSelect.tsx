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
import { Popover, OverlayTrigger } from 'react-bootstrap';

// Local
import { AlertParamsDateSelect } from './AlertParamsDateSelect';
import { formatDate } from '../../common/services/dateUtils';
import { AlertTimeSearchParams } from '../types/Alert';

// Types
// --------------------------------------------------------------------------

interface Props {
  // If the time calendar panel is currently active.
  timePanelActive: boolean;

  // Time after to search for alerts.
  after?: string;

  // Time before to search for alerts.
  before?: string;

  // Opens the time calendar oanel.
  openTimePanel(): any;

  // Closes the time calendar panel.
  closeTimePanel(): any;

  // Sele */
  selectTime(time: AlertTimeSearchParams): any;
}

// Component
// --------------------------------------------------------------------------

// Displays options for selecting a time frame to search by.
export class AlertParamsDateTimeSelect extends React.Component<Props, {}> {
  /**
   * Popover element that displays a tooltip for analyzing alerts data.
   * @type {JSX.Element}
   */
  static clearTimePopover: JSX.Element = (
    <Popover id="alert-params-clear-time">Clear Filter</Popover>
  );

  /**
   * Popover element that displays a tooltop for close the alerts.
   * @type {JSX.Element}
   */
  static chooseTimePopover: JSX.Element = (
    <Popover id="alert-detail-choose-time">Expand Choices</Popover>
  );

  /**
   * Clears the currently filtered time.
   */
  clearTime = (): void => {
    this.props.selectTime({ after: undefined, before: undefined });
  };

  render() {
    const timeDisplay = this.props.after || this.props.before
      ? (
        <div className="alert-list-params__time-range">
          <div>{this.props.after ? formatDate(this.props.after) : 'Any'}</div>
          <div><b>-</b></div>
          <div>{this.props.before ? formatDate(this.props.before) : 'Any'}</div>
        </div>
      ) : null;
    const timePanelToggle = this.props.timePanelActive
      ? this.props.closeTimePanel
      : this.props.openTimePanel;

    return (
      <div className="alert-list-params__spacer alert-list-params__group">
        <h3 className="sub-title">Time</h3>
        <div className="flex-box form-group">
          <div className="flex-item">
            <AlertParamsDateSelect
              after={this.props.after}
              before={this.props.before}
              changeTime={this.props.selectTime}
            />
          </div>
          <div className="flex--shrink">
            <div className="alert-list-params__btn-group btn-group btn-group-alt">
              <OverlayTrigger
                overlay={AlertParamsDateTimeSelect.clearTimePopover}
                placement="bottom"
                animation={false}
              >
                <button
                  className="btn btn-alt"
                  onClick={this.clearTime}
                >
                  <i className="fa fa-times" />
                </button>
              </OverlayTrigger>
              <OverlayTrigger
                overlay={AlertParamsDateTimeSelect.chooseTimePopover}
                placement="bottom"
                animation={false}
              >
                <button
                  className="btn btn-alt"
                  onClick={timePanelToggle}
                >
                  <i className="fa fa-caret-right" />
                </button>
              </OverlayTrigger>
            </div>
          </div>
        </div>
        {timeDisplay}
      </div>
    );
  }
}
