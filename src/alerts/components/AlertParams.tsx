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

// Local
import { Distillery } from '../../distilleries/types/Distillery';
import {
  AlertSearchParams,
  AlertTimeSearchParams,
  NormalizedCategoryList,
} from '../types/Alert';
import { User } from '../../users/types/User';
import { AlertParamsLevelSelect } from './AlertParamsLevelSelect';
import { AlertParamsStatusSelect } from './AlertParamsStatusSelect';
import { AlertParamsUserSelect } from './AlertParamsUserSelect';
import { AlertParamsDistillerySelect } from './AlertParamsDistillerySelect';
import { AlertParamsDateCalendars } from './AlertParamsDateCalendars';
import { AlertParamsDateTimeSelect } from './AlertParamsDateTimeSelect';
import { AlertParamsCategorySelect } from './AlertParamsCategorySelect';

// Types
// --------------------------------------------------------------------------

interface Props {
  // List of all the distilleries that have alerts associated with them.
  distilleries: Distillery[];

  // Currently selected alerts list search parameters.
  params: AlertSearchParams;

  // Current list of all users.
  users: User[];

  // Current list of categories.
  categories: NormalizedCategoryList;
  /**
   * Changes the current alerts list search parameters.
   * @param params Parameters to change to.
   */
  changeParams(params: AlertSearchParams): any;
}

interface State {
  // If a panel that allows users to filter alerts by time is shown.
  timePanelActive: boolean;
}

// Component
// --------------------------------------------------------------------------

// Displays a sidebar of possible alerts search parameters.
export class AlertParams extends React.Component<Props, State> {
  state = { timePanelActive: false };

  /**
   * Selects the level to filter alerts by.
   * @param level
   */
  selectLevel = (level: string | string[] | undefined) => {
    this.props.changeParams({ level });
  };

  /**
   * Selects the status to filter alerts by.
   * @param status
   */
  selectStatus = (status: string | string[] | undefined) => {
    this.props.changeParams({ status });
  };

  /**
   * Selects the user to filter alerts by.
   * @param user
   */
  selectUser = (user: number | undefined): void => {
    this.props.changeParams({ assigned_user: user });
  };

  /**
   * Selects the distillery to filter alerts by.
   * @param distillery
   */
  selectDistillery = (distillery: number | undefined): void => {
    this.props.changeParams({ collection: distillery });
  };

  /**
   * Selects the time to filter alerts by.
   * @param timeObject
   */
  selectTime = (timeObject: AlertTimeSearchParams): void => {
    this.props.changeParams(timeObject);
  };

  /**
   * Selects the category to filter alerts by.
   * @param category
   */
  selectCategory = (category: number): void => {
    this.props.changeParams({ categories: category || undefined });
  };

  /**
   * Opens the time choice side panel.
   */
  openTimePanel = (): void => {
    this.setState({ timePanelActive: true });
  };

  /**
   * Closes the time choice side panel.
   */
  closeTimePanel = (): void => {
    this.setState({ timePanelActive: false });
  };

  render(): JSX.Element {
    const timePanel = this.state.timePanelActive
      ? (
        <AlertParamsDateCalendars
          after={this.props.params.after}
          before={this.props.params.before}
          selectDate={this.selectTime}
          close={this.closeTimePanel}
        />
      ) : null;

    return (
      <section className="alert-list-params flex-box flex-box--column flex--shrink">
        <div className="alert-list-params__container flex-item">
          <AlertParamsCategorySelect
            currentCategory={this.props.params.categories}
            categories={this.props.categories}
            selectCategory={this.selectCategory}
          />

          <AlertParamsLevelSelect
            currentLevel={this.props.params.level}
            selectLevel={this.selectLevel}
          />

          <AlertParamsStatusSelect
            currentStatus={this.props.params.status}
            selectStatus={this.selectStatus}
          />

          <AlertParamsDistillerySelect
            currentDistillery={this.props.params.collection}
            distilleries={this.props.distilleries}
            selectDistillery={this.selectDistillery}
          />

          <AlertParamsDateTimeSelect
            after={this.props.params.after}
            before={this.props.params.before}
            openTimePanel={this.openTimePanel}
            closeTimePanel={this.closeTimePanel}
            timePanelActive={this.state.timePanelActive}
            selectTime={this.selectTime}
          />

          <AlertParamsUserSelect
            users={this.props.users}
            currentUser={this.props.params.assigned_user}
            selectUser={this.selectUser}
          />
        </div>
        {timePanel}
      </section>
    );
  }
}
