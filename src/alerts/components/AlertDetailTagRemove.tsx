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
import { Well, ButtonGroup, Button } from 'react-bootstrap';
import { Tag } from '../../tags/types/Tag';
import { getTagDisplayName } from '../../tags/services/tagUtils';

// Types
// --------------------------------------------------------------------------

export interface Props {
  // Tag to remove from the alert.
  tag: Tag;

  /**
   * Function to run when the user confirms the tag removal.
   * @param {Tag} tag
   */
  onRemove(tag: Tag): void;

  // Function ran when the user cancels the removal.
  onCancel(): void;
}

export interface State {}

// Component
// --------------------------------------------------------------------------

// Confirmation display asking the user if they wish to remove a tag from an alert.
export class AlertDetailTagRemove extends React.Component<Props, State> {
  // Fires the onRemove prop when the user confirms the tag removal.
  handleRemove = (): void => {
    this.props.onRemove(this.props.tag);
  };

  render() {
    return (
      <Well>
        <p>Are you sure you wish to remove tag {getTagDisplayName(this.props.tag)}?</p>
        <ButtonGroup justified={true}>
          <ButtonGroup>
            <Button onClick={this.handleRemove}>Remove</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button bsStyle="danger" onClick={this.props.onCancel}>Cancel</Button>
          </ButtonGroup>
        </ButtonGroup>
      </Well>
    );
  }
}
