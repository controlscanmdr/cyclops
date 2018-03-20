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
import { ListGroupItem } from 'react-bootstrap';

// Local
import { AlertOption, AlertLevelParam } from '../types/Alert';
import { toggleValue, includesOrEquals } from '../../common/services/arrayUtils';
import { AlertLevelIcon } from './AlertLevelIcon';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Level option to display.
  level: AlertOption;

  // Currently selected level from alert list search parameters.
  currentLevel?: AlertLevelParam;

  /**
   * Changes the current alert list search parameter.
   * @param level
   */
  selectLevel(level?: AlertLevelParam): any;
}

// Component
// --------------------------------------------------------------------------

/**
 * Displays a list group item showing a level choice that can be toggled
 * in the current alert list parameters.
 */
export class AlertParamsLevelOption extends React.Component<Props, {}> {
  // Toggles this level option into the currently selected levels.
  toggleLevel = (): void => {
    const newLevel = toggleValue<string>(
      this.props.currentLevel,
      this.props.level.value,
    );

    this.props.selectLevel(newLevel);
  };

  render(): JSX.Element {
    const levelIcon = this.props.level.value
      ? <AlertLevelIcon level={this.props.level.value} />
      : null;

    return (
      <ListGroupItem
        active={includesOrEquals(this.props.currentLevel, this.props.level.value)}
        onClick={this.toggleLevel}
        key={this.props.level.value}
      >
        <div className="flex-box">
          <div className="flex-item">
            {this.props.level.name}
          </div>
          <div className="flex-item flex--shrink text-right">
            {levelIcon}
          </div>
        </div>
      </ListGroupItem>
    );
  }
}
