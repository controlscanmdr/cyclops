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
import FontAwesome = require('react-fontawesome');

// Local
import { Tag } from '../types/Tag';
import { Button } from '../../common/components/Button';
import './TagRemove.scss';

// Types
// --------------------------------------------------------------------------

export interface Props {
  // Tag to remove.
  tag: Tag;

  /**
   * Function run when the X button is clicked.
   * @param {Tag} tag
   */
  onClick?(tag: Tag): void;
}

export interface State {}

// Component
// --------------------------------------------------------------------------

// Displays a tag with a remove button.
export class TagRemove extends React.Component<Props, State> {
  handleClick = () => {
    if (this.props.onClick) this.props.onClick(this.props.tag);
  };

  render() {
    return (
      <span className="tag">
        <span><b>{this.props.tag.topic.name}</b>: {this.props.tag.name}</span>
        <span className="TagRemove__Button">
          {' | '}
          <Button type="plain" onClick={this.handleClick}>
            <FontAwesome name="close" />
          </Button>
        </span>
      </span>
    );
  }
}
