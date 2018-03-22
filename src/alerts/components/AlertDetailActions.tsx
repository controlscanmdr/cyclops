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
import * as _ from 'lodash';
import * as React from 'react';

// Local
import { SubTitle } from '../../common/components/SubTitle';
import { SpacedSection } from '../../common/components/SpacedSection';
import { AlertDetailDispatch } from './AlertDetailDispatch';
import { DispatchNested } from '../../common/types/dispatches';
import { Action } from '../../actions/types/Action';
import { currentUserIsStaff } from '../../users/services/currentUserIsStaff';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Actions that can be performed on the alerts. */
  actions: Action[];

  // Previous actions performed on the alerts. */
  dispatches: DispatchNested[];

  /**
   * Performs an action on the given alert.
   * @param actionId ID of the action to perform.
   */
  onSubmit(actionId: number): any;
}

interface State {
  // Stores the id of the currently selected action.
  actionId: number | null;
}

// Component
// --------------------------------------------------------------------------

/**
 * Displays a list of actions the user can perform on an alerts, as well as
 * actions that have been performed in the past.
 */
export class AlertDetailActions extends React.Component<Props, State> {
  state = { actionId: null };

  /**
   * Selects an action.
   * @param event Event given off by the select element.
   */
  handleChange = (event: React.FormEvent<HTMLSelectElement>): void => {
    const value = parseInt(event.currentTarget.value, 10);
    const actionId = _.isEqual(value, 0) ? null : value;

    this.setState({ actionId });
  };

  /**
   * Performs the currently selected action.
   */
  handleClick = (): void => {
    if (this.state.actionId) this.props.onSubmit(this.state.actionId!);
  };

  renderDispatchList = (): JSX.Element[] | JSX.Element => {
    if (this.props.dispatches.length) {
      return this.props.dispatches.map(dispatch => (
        <AlertDetailDispatch dispatch={dispatch} />
      ));
    }

    return (
      <div className="well">
        <i>No previous actions performed</i>
      </div>
    );
  };

  renderSelectButton = (): JSX.Element | null => {
    if (!currentUserIsStaff()) return null;

    const actionOptions = this.props.actions.map(action => (
      <option value={action.id} key={action.id}>{action.name}</option>
    ));

    return (
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
    );
  };

  render(): JSX.Element {
    return (
      <SpacedSection>
        <SubTitle>Actions</SubTitle>
        <div>
          {this.renderDispatchList()}
          {this.renderSelectButton()}
        </div>
      </SpacedSection>
    );
  }
}
