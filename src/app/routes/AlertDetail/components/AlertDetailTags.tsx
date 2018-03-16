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
import { Popover, OverlayTrigger } from 'react-bootstrap';

// Local
import { Tag as TagType } from '~/services/tags/types';
import { Tag } from '~/services/tags/components/Tag';
import { Button } from '~/components/Button';
import { AlertDetail } from '~/services/alerts/types';
import { MapStateToProps } from '~/types/MapStateToProps';
import { getCurrentUserId } from '~/services/users/utils/currentUserIsStaff';
import { connect, Dispatch } from 'react-redux';
import * as alertDetailTagActions from '~/store/alertDetailTag/alertDetailTagActions';
import { openTagDetail } from '~/store/tagModal/tagModalActions';
import FontAwesome = require('react-fontawesome');
import { AlertDetailTagEdit } from '~/routes/AlertDetail/components/AlertDetailTagEdit';
import { AlertDetailTagRemove } from '~/routes/AlertDetail/components/AlertDetailTagRemove';
import TagModal from '~/services/tags/components/TagModal';

// Types
// --------------------------------------------------------------------------

export interface Props {
  // Id of the alert containing the tags.
  alertId: number;

  // Id of the currently authenticated user.
  currentUserId: number;

  // List of tags associated with the alert.
  alertTags: TagType[];

  // List of all the current tags.
  tagList: TagType[];

  // If the edit tag panel should be shown.
  showTagPanel: boolean;

  // If the current tag list is loading
  isLoadingTags: boolean;

  // If a removal confirmation box should be shown.
  showRemovalConfirmation: boolean;

  // Tag that is being requested for removal.
  tagToRemove?: TagType;

  // Redux dispatch function.
  dispatch: Dispatch<any>;
}

export interface State {}

// Component
// --------------------------------------------------------------------------

export class AlertDetailTags extends React.Component<Props, State> {
  // Popover hinting that the button opens the edit panel.
  static EDIT_POPOVER = <Popover id="alert-detail-edit-tags">Edit</Popover>;

  // Popover hinting that  the button closes the edit panel.
  static CLOSE_POPOVER = <Popover id="alert-detail-close-tags">Close</Popover>;

  // Renders the current tag list.
  renderAlertTagList = (): JSX.Element[] => {
    return this.props.alertTags.map(tag => (
      <Tag key={tag.id} tag={tag} onClick={this.openTagDetail} />
    ));
  };

  // Opens the edit tag panel.
  openTagPanel = (): void => {
    this.props.dispatch(alertDetailTagActions.openTagPanel());
  };

  // Closes the edit tag panel.
  closeTagPanel = (): void => {
    this.props.dispatch(alertDetailTagActions.closeTagPanel());
  };

  /**
   * Shows a removal confirmation for a certain tag.
   * @param {Tag} tag Tag to remove.
   */
  showRemovalConfirmation = (tag: TagType): void => {
    this.props.dispatch(alertDetailTagActions.showRemovalConfirmation(tag));
  };

  // Cancels the tag removal.
  cancelTagRemoval = (): void => {
    this.props.dispatch(alertDetailTagActions.cancelTagRemoval());
  };

  /**
   * Removes the selected tag from the alert.
   * @param {Tag} tag
   */
  removeTag = (tag: TagType): void => {
    const action = alertDetailTagActions.removeTag(this.props.alertId, tag.id);

    this.props.dispatch(action);
  };

  /**
   * Adds the selected tag to the alert.
   * @param {Tag} tag
   */
  addTag = (tag: TagType): void => {
    const action = alertDetailTagActions.addTag(
      this.props.alertId,
      tag.id,
      this.props.currentUserId,
    );

    this.props.dispatch(action);
  };

  /**
   * Opens the tag modal detail view.
   * @param {Tag} tag
   */
  openTagDetail = (tag: TagType): void => {
    this.props.dispatch(openTagDetail(tag.id));
  };

  // Renders the edit tag panel.
  renderTagPanel = (): JSX.Element => {
    return (
      <AlertDetailTagEdit
        alertTagList={this.props.alertTags}
        tagList={this.props.tagList}
        onRemove={this.showRemovalConfirmation}
        onAdd={this.addTag}
        isFetchingTags={this.props.isLoadingTags}
      />
    );
  };

  // Renders the current tag list.
  renderTagList = (): JSX.Element => {
    return (
      <div>{this.renderAlertTagList()}</div>
    );
  };

  // Renders the removal confirmation box.
  renderRemovalConfirmation = (): JSX.Element | null => {
    if (!this.props.tagToRemove) return null;

    return (
      <AlertDetailTagRemove
        tag={this.props.tagToRemove}
        onRemove={this.removeTag}
        onCancel={this.cancelTagRemoval}
      />
    );
  };

  // Renders the main content of the alert tag list.
  renderContent() {
    if (this.props.showRemovalConfirmation) return this.renderRemovalConfirmation();
    if (this.props.showTagPanel) return this.renderTagPanel();

    return this.renderTagList();
  }

  // Renders the edit button next to the section title.
  renderEditButton() {
    if (this.props.showRemovalConfirmation) return null;
    if (this.props.showTagPanel) {
      return (
        <OverlayTrigger
          overlay={AlertDetailTags.CLOSE_POPOVER}
          placement="top"
          animation={false}
        >
          <Button type="unstyled" onClick={this.closeTagPanel}>
            <FontAwesome name="close" />
          </Button>
        </OverlayTrigger>
      );
    }

    return (
      <OverlayTrigger
        overlay={AlertDetailTags.EDIT_POPOVER}
        placement="top"
        animation={false}
      >
        <Button type="unstyled" onClick={this.openTagPanel}>
          <FontAwesome name="pencil"/>
        </Button>
      </OverlayTrigger>
    );
  }

  render() {
    return (
      <div className="spacing-section">
        <h3 className="sub-title">Tags {this.renderEditButton()}</h3>
        {this.renderContent()}
        <TagModal />
      </div>
    );
  }
}

// Container
// --------------------------------------------------------------------------

interface Container {
  alert: AlertDetail;
}

const mapStateToProps: MapStateToProps<Props, Container> = (state, props) => ({
  alertId: props.alert.id,
  currentUserId: getCurrentUserId(),
  alertTags: props.alert.tags,
  tagList: state.tagStore.tags,
  showTagPanel: state.alertDetailTag.panelIsActive,
  showRemovalConfirmation: state.alertDetailTag.confirmationIsActive,
  tagToRemove: state.alertDetailTag.tagToRemove,
  isLoadingTags: state.tagStore.isFetching,
});

export default connect(mapStateToProps)(AlertDetailTags);
