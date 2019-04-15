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

// Local
import { TagWithTopic } from '~/services/tags/types';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

interface Props {
  tag: TagWithTopic;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Name of a tag object in a label.
 */
export class TagLabel extends React.Component<Props, {}> {
  public render() {
    return (
      <div className="tag">
        <b>{this.props.tag.topic.name}:</b>
        {' '}
        {this.props.tag.name}
      </div>
    );
  }
}
