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
import { AlertDetailComment } from './AlertDetailComment';
import { HiddenTextArea } from '~/components/HiddenTextArea';
import { CommentNested } from '~/types/comments';
import { currentUserIsStaff } from '~/services/users/utils/currentUserIsStaff';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertDetailComments component. */
interface Props {
  /** ID of the alert the comments are related to. */
  alertId: number;
  /** List of alerts comments. */
  comments: CommentNested[];
  /**
   * Adds a comment to the alert.
   * @param alertId ID of the alert to add the comment to.
   * @param comment Comment to add to the alert.
   */
  addComment(alertId: number, comment: string): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays the current comments of an alerts.
 */
export class AlertDetailComments extends React.Component<Props, {}> {
  /**
   * Submits the current value on the hidden text area.
   * @param value
   */
  public handleSubmit = (value: string): void => {
    this.props.addComment(this.props.alertId, value);
  };

  public render(): JSX.Element {
    const { comments } = this.props;
    const { handleSubmit } = this;
    const commentElements = comments.map((comment) => (
      <AlertDetailComment key={comment.id} comment={comment} />
    ));
    const addCommentButton = currentUserIsStaff()
      ? (
        <HiddenTextArea
          buttonText="Comment"
          onSubmit={handleSubmit}
        />
      ) : null;

    return (
      <div className="spacing-section">
        <h3 className="sub-title">
          Comments
          {' '}
          <span className="badge">{comments.length}</span>
        </h3>
        <div>
          {commentElements}
          {addCommentButton}
        </div>
      </div>
    );
  }
}
