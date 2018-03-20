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
import { Tag as TagType } from '../types/Tag';
import { Button } from '../../common/components/Button';

// Types
// --------------------------------------------------------------------------

export interface Props {
  // Tag object to display.
  tag: TagType;

  // Function to run on tag click.
  onClick?(tag: TagType): void;
}

export interface State {}

// Component
// --------------------------------------------------------------------------

// Name of a tag object in a label.
export class Tag extends React.Component<Props, State> {
  handleClick = () => {
    if (this.props.onClick) this.props.onClick(this.props.tag);
  };

  render() {
    return (
      <Button type="unstyled" className="tag" onClick={this.handleClick}>
        <span><b>{this.props.tag.topic.name}</b>: {this.props.tag.name}</span>
      </Button>
    );
  }
}
