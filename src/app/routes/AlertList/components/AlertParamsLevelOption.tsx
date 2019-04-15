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
import { ListGroupItem } from 'react-bootstrap';

// Local
import {
  AlertOption,
  AlertLevelParam,
} from '~/services/alerts/types';
import {
  toggleValue,
  includesOrEquals,
} from '~/utils/arrayUtils';
import { AlertLevelIcon } from '~/services/alerts/components/AlertLevelIcon';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties for the AlertParamsLevelOption component. */
interface Props {
  /** Level option to display. */
  level: AlertOption;
  /** Currently selected level from alert list search parameters. */
  currentLevel?: AlertLevelParam;
  /**
   * Changes the current alert list search parameter.
   * @param level
   */
  selectLevel(level?: AlertLevelParam): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays a list group item showing a level choice that can be toggled
 * in the current alert list parameters.
 */
export class AlertParamsLevelOption extends React.Component<Props, {}> {
  /**
   * Toggles this level option into the currently selected levels.
   */
  public toggleLevel = (): void => {
    const newLevel = toggleValue<string>(
      this.props.currentLevel,
      this.props.level.value,
    );

    this.props.selectLevel(newLevel);
  };

  public render(): JSX.Element {
    const { level, currentLevel } = this.props;
    const { toggleLevel } = this;
    const levelIcon = level.value ? <AlertLevelIcon level={level.value} /> : null;

    return (
      <ListGroupItem
        active={includesOrEquals(currentLevel, level.value)}
        onClick={toggleLevel}
        key={level.value}
      >
        <div className="flex-box">
          <div className="flex-item">
            {level.name}
          </div>
          <div className="flex-item flex--shrink text-right">
            {levelIcon}
          </div>
        </div>
      </ListGroupItem>
    );
  }
}
