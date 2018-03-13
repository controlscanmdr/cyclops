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
import FontAwesome = require('react-fontawesome');
import { TagRemove } from '~/services/tags/components/TagRemove';
import { AlertDetailTagEdit } from '~/routes/AlertDetail/components/AlertDetailTagEdit';
import { AlertDetailTagRemove } from '~/routes/AlertDetail/components/AlertDetailTagRemove';

// Types
// --------------------------------------------------------------------------

export interface Props {
  alertId: number;
  currentUserId: number;
  alertTags: TagType[];
  tagList: TagType[];
  showTagPanel: boolean;
  isLoadingTags: boolean;
  showRemovalConfirmation: boolean;
  tagToRemove?: TagType;
  dispatch: Dispatch<any>;
}

export interface State {}

// Component
// --------------------------------------------------------------------------

export class AlertDetailTags extends React.Component<Props, State> {
  static EDIT_POPOVER = <Popover id="alert-detail-edit-tags">Edit</Popover>;
  static renderTagName = (tag: TagType): JSX.Element => (
    <span><b>{tag.topic.name}:</b> {tag.name}</span>
  );

  renderAlertTagList = (): JSX.Element[] => {
    return this.props.alertTags.map(tag => <Tag key={tag.id} tag={tag}/>);
  };

  openTagPanel = (): void => {
    this.props.dispatch(alertDetailTagActions.openTagPanel());
  };

  closeTagPanel = (): void => {
    this.props.dispatch(alertDetailTagActions.closeTagPanel());
  };

  showRemovalConfirmation = (tag: TagType): void => {
    this.props.dispatch(alertDetailTagActions.showRemovalConfirmation(tag));
  };

  cancelTagRemoval = (): void => {
    this.props.dispatch(alertDetailTagActions.cancelTagRemoval());
  };

  removeTag = (tag: TagType): void => {
    const action = alertDetailTagActions.removeTag(this.props.alertId, tag.id);

    this.props.dispatch(action);
  };

  addTag = (tag: TagType): void => {
    const action = alertDetailTagActions.addTag(
      this.props.alertId,
      tag.id,
      this.props.currentUserId,
    );

    this.props.dispatch(action);
  };

  openTagModal = (): void => {};

  renderRemovalTagList = () => {
    return this.props.alertTags.map(tag => <TagRemove key={tag.id} tag={tag}/>);
  };

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

  renderTagList = (): JSX.Element => {
    return (
      <div>{this.renderAlertTagList()}</div>
    );
  };

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

  renderContent() {
    if (this.props.showRemovalConfirmation) return this.renderRemovalConfirmation();
    if (this.props.showTagPanel) return this.renderTagPanel();

    return this.renderTagList();
  }

  renderEditButton() {
    if (this.props.showTagPanel || this.props.showRemovalConfirmation) return null;

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
