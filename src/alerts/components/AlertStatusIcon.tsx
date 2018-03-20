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

import * as React from 'react';

import { Dictionary } from '../../common/types/object';
import { FontAwesome } from '../../common/components/FontAwesome';
import './AlertStatusIcon.scss';

interface Props {
  status: string;
}

const STATUS_ICONS: Dictionary<string> = {
  NEW: 'circle-o',
  BUSY: 'circle',
  DONE: 'check-circle',
};

// Icon associated with an alert status.
export class AlertStatusIcon extends React.Component<Props, {}> {
  render(): JSX.Element {
    const lowercase = this.props.status.toLowerCase();

    return (
      <FontAwesome
        icon={STATUS_ICONS[this.props.status]}
        className={`AlertStatusIcon AlertStatusIcon--${lowercase}`}
      />
    );
  }
}
