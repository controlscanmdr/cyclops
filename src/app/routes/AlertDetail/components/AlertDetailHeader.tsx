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
import * as classNames from 'classnames';
import {
  ButtonGroup,
  Button,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';

// Local
import { Result } from '../../../types/result';
import { ContainerNested } from '../../../services/containers/types';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/**
 * Properties of the AlertDetailHeader component.
 */
interface Props {
  /** The selected alerts level. */
  alertLevel: string;
  /** The selected alerts ID. */
  alertId: number;
  /** The selected alerts data. */
  alertData: Result;
  /** Container associated with the alert. */
  alertContainer?: ContainerNested;
  /**
   * Opens a modal to analyze the alert data.
   * @param data Data of the alert to analyze.
   * @param container Container related to the alert data.
   */
  openDataModal(data: Result, container: ContainerNested): any;
  /** Closes the alert detail. */
  closeAlert(): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays the ID of the currently selected alerts and allows the user
 * to dismiss the currently selected alerts.
 */
export class AlertDetailHeader extends React.Component<Props, {}> {
  /**
   * Popover element that displays a tooltip for analyzing alerts data.
   * @type {JSX.Element}
   */
  public static analyzePopover: JSX.Element = (
    <Popover id="alert-detail-header-analyze">Analyze</Popover>
  );

  /**
   * Popover element that displays a tooltop for close the alerts.
   * @type {JSX.Element}
   */
  public static closeAlertPopover: JSX.Element = (
    <Popover id="alert-detail-header-close">Close</Popover>
  );

  /**
   * Analyzes the current alerts data.
   */
  public analyzeAlert = (): void => {
    if (this.props.alertContainer) {
      this.props.openDataModal(
        this.props.alertData,
        this.props.alertContainer,
      );
    }
  };

  /**
   * Closes the current alerts detail.
   */
  public closeAlert = (): void => {
    this.props.closeAlert();
  };

  public render(): JSX.Element {
    const headerClasses = classNames(
      'flex-item',
      'flex--shrink',
      'clearfix',
      'alert-detail-header',
      `alert-detail-header--${this.props.alertLevel.toLowerCase()}`,
    );

    return (
      <div className={headerClasses}>
        <div className="flex-box flex-box--align-center">
          <div className="flex-item alert-detail-header__title">
            Alert {this.props.alertId}
          </div>
          <div className="flex-item flex--shrink">
            <ButtonGroup className="btn-group-alt pull-right">
              <OverlayTrigger
                overlay={AlertDetailHeader.analyzePopover}
                placement="bottom"
                animation={false}
              >
                <button
                  className="btn btn-alt"
                  disabled={!this.props.alertContainer}
                  onClick={this.analyzeAlert}
                >
                  <i className="fa fa-flask" />
                </button>
              </OverlayTrigger>
              <OverlayTrigger
                overlay={AlertDetailHeader.closeAlertPopover}
                placement="bottom"
                animation={false}
              >
                <Button onClick={this.closeAlert}>
                  <i className="fa fa-close"/>
                </Button>
              </OverlayTrigger>
            </ButtonGroup>
          </div>
        </div>
      </div>
    );
  }
}
