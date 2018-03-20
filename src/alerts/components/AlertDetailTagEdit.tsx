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
import { Tag } from '../../tags/types/Tag';
import { TagAutocomplete } from '../../tags/components/TagAutocomplete';
import { TagRemove } from '../../tags/components/TagRemove';
import './AlertDetailTagEdit.scss';

// Types
// --------------------------------------------------------------------------

export interface Props {
  // Tags associated with the current alert.
  alertTagList: Tag[];

  // List of all the current tags.
  tagList: Tag[];

  // If the tag list is currently being fetched.
  isFetchingTags: boolean;

  /**
   * Function run when a tag is selected for removal.
   * @param {Tag} tag
   */
  onRemove(tag: Tag): void;

  /**
   * Function run when a tag is selected to be added to the alert.
   * @param {Tag} tag
   */
  onAdd(tag: Tag): void;
}

export interface State {
  // Tag selected to add to the current alert.
  selected?: Tag;
}

// Component
// --------------------------------------------------------------------------

export class AlertDetailTagEdit extends React.Component<Props, State> {
  /**
   * Renders the current alert tag list in a bunch of tag removal elements.
   * @returns {JSX.Element[]}
   */
  renderAlertTagList = (): JSX.Element[] => {
    return this.props.alertTagList.map(tag => (
      <TagRemove key={tag.id} tag={tag} onClick={this.props.onRemove}/>
    ));
  };

  /**
   * Sets the tag to be added to the current alert.
   * @param {Tag} tag
   */
  handleSelect = (tag: Tag): void => {
    this.props.onAdd(tag);
  };

  renderAutoComplete = (): JSX.Element => {

    return (
      <TagAutocomplete
        tags={this.props.tagList}
        exclude={this.props.alertTagList}
        onSelect={this.handleSelect}
        isLoading={this.props.isFetchingTags}
      />
    );
  };

  render() {
    return (
      <div>
        <div className="AlertDetailTagEdit__list">
          {this.renderAlertTagList()}
        </div>
        {this.renderAutoComplete()}
      </div>
    );
  }
}
