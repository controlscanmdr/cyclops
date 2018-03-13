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
import * as _ from 'lodash';

// Local
import { Tag } from '~/services/tags/types';
import { Autocomplete } from '~/components/Autocomplete';
import { getTagDisplayName } from '~/services/tags/services/tagUtils';

// Types
// --------------------------------------------------------------------------

export interface Props {
  // Tags to list in the autocomplete.
  tags: Tag[];

  // Tags to exclude from the autocomplete list.
  exclude?: Tag[];

  /**
   * Function run when the autocomplete selects a tag.
   * @param {Tag} tag
   */
  onSelect(tag: Tag): void;
}

export interface State {
  value: string;
}

// Component
// --------------------------------------------------------------------------

// Autocomplete element that lists and filters tag objects.
export class TagAutocomplete extends React.Component<Props, State> {
  state = { value: '' };
  /**
   * Determines if a tag should be shown in the dropdown list.
   * @param {Tag} tag
   * @returns {boolean}
   */
  shouldTagDisplay = (tag: Tag): boolean => {
    if (!this.props.exclude || !this.props.exclude.length) return true;

    const isInExcluded = Boolean(_.find(this.props.exclude, item => item.id === tag.id));

    return !isInExcluded;
  };

  /**
   * Sets the currently selected tag and triggers the onSelect property.
   * @param {Tag} tag
   */
  handleSelect = (tag: Tag): void => {
    this.props.onSelect(tag);
  };

  render() {
    return (
      <Autocomplete
        items={this.props.tags}
        value={this.state.value}
        getValue={getTagDisplayName}
        shouldItemDisplay={this.shouldTagDisplay}
        onSelect={this.handleSelect}
      />
    );
  }
}
