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
import { ListGroup } from 'react-bootstrap';

// Local
import { LEVEL_OPTIONS_LIST } from '../constants';
import { AlertLevelParam } from '../../../services/alerts/types';
import { AlertParamsLevelOption } from './AlertParamsLevelOption';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertParamsLevelSelct component. */
interface Props {
  /** Currently selected level. */
  currentLevel?: AlertLevelParam;
  /**
   * Changes the current alert list search parameter.
   * @param level Level to change to.
   */
  selectLevel(level?: AlertLevelParam): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays a list group of alert levels to filter alerts with.
 */
export class AlertParamsLevelSelect extends React.Component<Props, {}> {
  public render(): JSX.Element {
    const levelOptions = LEVEL_OPTIONS_LIST.map((level) => (
      <AlertParamsLevelOption
        level={level}
        currentLevel={this.props.currentLevel}
        selectLevel={this.props.selectLevel}
        key={String(level.value)}
      />
    ));

    return (
      <div>
        <div className="alert-list-params__spacer">
          <h3 className="sub-title">Level</h3>
        </div>
        <ListGroup>
          {levelOptions}
        </ListGroup>
      </div>
    );
  }
}
