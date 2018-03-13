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
import * as classNames from 'classnames';
import {
  ButtonGroup,
  Button,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';

// Local
import { AlertLevelChoices } from '~/services/alerts/types';

// Types
// --------------------------------------------------------------------------

interface Props {
  // The selected alerts level.
  level: AlertLevelChoices;

  // The selected alert ID.
  alertId: number;

  // If the analyze button should be disabled.
  disableAnalyzeButton: boolean;

  // Function run when the analyze button is clicked.
  onAnalyze(): any;

  // Function run when the close button is clicked
  onClose(): any;
}

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
  static analyzePopover: JSX.Element = (
    <Popover id="alert-detail-header-analyze">Analyze</Popover>
  );

  /**
   * Popover element that displays a tooltop for close the alerts.
   * @type {JSX.Element}
   */
  static closeAlertPopover: JSX.Element = (
    <Popover id="alert-detail-header-close">Close</Popover>
  );

  render(): JSX.Element {
    const headerClasses = classNames(
      'flex-item',
      'flex--shrink',
      'clearfix',
      'alert-detail-header',
      `alert-detail-header--${this.props.level.toLowerCase()}`,
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
                  disabled={this.props.disableAnalyzeButton}
                  onClick={this.props.onAnalyze}
                >
                  <i className="fa fa-flask" />
                </button>
              </OverlayTrigger>
              <OverlayTrigger
                overlay={AlertDetailHeader.closeAlertPopover}
                placement="bottom"
                animation={false}
              >
                <Button onClick={this.props.onClose}>
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
