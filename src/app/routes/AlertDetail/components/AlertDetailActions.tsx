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
import * as _ from 'lodash';
import * as React from 'react';
import { Button, FormControl } from 'react-bootstrap';

// Local
import { SubTitle } from '../../../components/SubTitle';
import { SpacedSection } from '../../../components/SpacedSection';
import { AlertDetailDispatch } from './AlertDetailDispatch';
import { DispatchNested } from '../../../types/dispatches';
import { Action } from '../../../services/actions/types';
import { currentUserIsStaff } from '~/services/users/utils/currentUserIsStaff';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of AlertDetailActions component. */
interface Props {
  /** ID of the alert to display actinons for. */
  alertId: number;
  /** Actions that can be performed on the alerts. */
  actions: Action[];
  /** Previous actions performed on the alerts. */
  dispatches: DispatchNested[];
  /**
   * Performs an action on the given alert.
   * @param alertId ID of the alert to perform the action on.
   * @param actionId ID of the action to perform.
   */
  performAction(alertId: number, actionId: number): any;
}

/** Internal state of AlertDetailActions component. */
interface State {
  /** Stores the id of the currently selected action. */
  actionId: number | null;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays a list of actions the user can perform on an alerts, as well as
 * actions that have been performed in the past.
 */
export class AlertDetailActions extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { actionId: null };
  }

  /**
   * Selects an action.
   * @param event Event given off by the select element.
   */
  public handleChange = (
    event: React.FormEvent<HTMLSelectElement>,
  ): void => {
    const value = parseInt(event.currentTarget.value, 10);
    const actionId = _.isEqual(value, 0) ? null : value;

    this.setState({ actionId });
  };

  /**
   * Performs the currently selected action.
   */
  public handleClick = (): void => {
    const { performAction, alertId } = this.props;
    const { actionId } = this.state;

    if (actionId) { performAction(alertId, actionId); }
  };

  public render(): JSX.Element {
    const { actions, dispatches } = this.props;
    const dispatchList = dispatches.length
      ? dispatches.map((dispatch) => (
        <AlertDetailDispatch dispatch={dispatch} />
      )) : (
        <div className="well">
          <i>No previous actions performed</i>
        </div>
      );
    const actionOptions = actions.map((action) => (
      <option value={action.id} key={action.id}>{action.name}</option>
    ));
    const selectActionButton = currentUserIsStaff()
      ? (
        <div className="flex-box flex-box--spaced">
          <div className="flex-item">
            <select
              onChange={this.handleChange}
              className="form-control alert-action__select"
            >
              <option value={0}>Select Action</option>
              {actionOptions}
            </select>
          </div>
          <div className="flex-item flex--shrink">
            <button
              className="btn btn-alt"
              disabled={!this.state.actionId}
              onClick={this.handleClick}
            >
              <i className="fa fa-check" />
            </button>
          </div>
        </div>
      ) : null;

    return (
      <SpacedSection>
        <SubTitle>Actions</SubTitle>
        <div>
          {dispatchList}
          {selectActionButton}
        </div>
      </SpacedSection>
    );
  }
}
