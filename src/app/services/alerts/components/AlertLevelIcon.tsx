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

import * as React from 'react';

import { Dictionary } from '~/types/object';
import { FontAwesome } from '~/components/FontAwesome';
import './AlertLevelIcon.scss';

interface Props {
  level: string;
}

const LEVEL_ICONS: Dictionary<string> = {
  CRITICAL: 'fire',
  HIGH: 'exclamation-triangle',
  MEDIUM: 'exclamation-circle',
  LOW: 'exclamation',
  INFO: 'info',
};

// Shows the icon related to the an alert level.
export class AlertLevelIcon extends React.Component<Props, {}> {
  public render() {
    const lowercase = this.props.level.toLowerCase();

    return (
      <FontAwesome
        icon={LEVEL_ICONS[this.props.level]}
        className={`AlertLevelIcon AlertLevelIcon--${lowercase}`}
      />
    );
  }
}
