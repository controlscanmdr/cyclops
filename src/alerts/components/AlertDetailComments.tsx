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
import { AlertDetailComment } from './AlertDetailComment';
import { HiddenTextArea } from '../../common/components/HiddenTextArea';
import { CommentNested } from '../../common/types/comments';
import { currentUserIsStaff } from '../../users/services/currentUserIsStaff';

// Types
// --------------------------------------------------------------------------

interface Props {
  // List of alerts comments.
  comments: CommentNested[];

  /**
   * Adds a comment to the alert.
   * @param comment Comment to add to the alert.
   */
  onSubmit(comment: string): any;
}

// Component
// --------------------------------------------------------------------------

// Displays the current comments of an alerts.
export class AlertDetailComments extends React.Component<Props, {}> {
  /**
   * Submits the current value on the hidden text area.
   * @param value
   */
  handleSubmit = (value: string): void => {
    this.props.onSubmit(value);
  };

  render(): JSX.Element {
    const commentElements = this.props.comments.map(comment => (
      <AlertDetailComment key={comment.id} comment={comment} />
    ));
    const addCommentButton = currentUserIsStaff() ? (
      <HiddenTextArea
        buttonText="Comment"
        onSubmit={this.handleSubmit}
      />
    ) : null;

    return (
      <div className="spacing-section">
        <h3 className="sub-title">
          Comments
          {' '}
          <span className="badge">{this.props.comments.length}</span>
        </h3>
        <div>
          {commentElements}
          {addCommentButton}
        </div>
      </div>
    );
  }
}
