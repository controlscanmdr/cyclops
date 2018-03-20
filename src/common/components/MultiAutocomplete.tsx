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
import { Autocomplete } from './Autocomplete';
import { RemovableItem } from './RemovableItem';

// Types
// --------------------------------------------------------------------------

interface Props {
  items: any[];
  selected?: any[];
  placeholder?: string;
  getValue(value: any): any;
  getKey(item: any): any;
  isSelected(item: any, selected?: any[]): boolean;
  removeItem(item: any): void;
  onSelect?(item: any): void;
  filter?(item: any): boolean;
}

// Component
// --------------------------------------------------------------------------

/**
 * Displays an Autcomplete component that selects multiple items and
 * displays them as a list underneath the component.
 */
export class MultiAutocomplete extends React.Component<Props, {}> {
  /**
   * Returns the currently selected items from the item list.
   */
  getSelectedItems = (): any[] => {
    return this.props.items.filter((item) => {
      return this.props.isSelected(item, this.props.selected);
    });
  };

  filter = (item: any): boolean => {
    const isSelected = this.props.isSelected(item, this.props.selected);
    const isFiltered = this.props.filter
      ? this.props.filter(item)
      : false;

    return isSelected || isFiltered;
  };

  render() {
    const selected = this.getSelectedItems().map(item => (
      <RemovableItem
        key={this.props.getKey(item)}
        item={item}
        getValue={this.props.getValue}
        onClick={this.props.removeItem}
      />
    ));

    return (
      <div>
        {selected}
        <Autocomplete
          items={this.props.items}
          getValue={this.props.getValue}
          value={''}
          placeholder={this.props.placeholder}
          onSelect={this.props.onSelect}
          shouldItemDisplay={this.filter}
        />
      </div>
    );
  }
}
