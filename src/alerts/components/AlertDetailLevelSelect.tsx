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
import { AlertLevelIcon } from './AlertLevelIcon';
import { SubtleSelect } from '../../common/components/SubtleSelect';
import { LEVEL_OPTIONS, LEVEL_OPTIONS_LIST } from '../services/alertOptions';
import { currentUserIsStaff } from '../../users/services/currentUserIsStaff';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Alert to change the level for.
  currentLevel: string;

  /**
   * Changes the level on the current alerts.
   * @param level
   */
  selectLevel(level: string): any;
}

// Component
// --------------------------------------------------------------------------

// Selects a new level for an existing alerts.
export class AlertDetailLevelSelect extends React.Component<Props> {
  render(): JSX.Element {
    const { currentLevel } = this.props;
    const levelInfo = (
      <span>
        <AlertLevelIcon level={currentLevel}/>
        <span className="alert-icon-spacing">
          {LEVEL_OPTIONS[currentLevel].name}
        </span>
      </span>
    );

    if (!currentUserIsStaff()) { return levelInfo; }

    return (
      <SubtleSelect
        options={LEVEL_OPTIONS_LIST}
        currentValue={currentLevel}
        onSelect={this.props.selectLevel}
      >
        {levelInfo}
        {' '}
        <i className="caret" />
      </SubtleSelect>
    );
  }
}
