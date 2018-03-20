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
import { Select, SelectOption } from '../../common/components/Select';
import { NormalizedCategoryList } from '../types/Alert';
import { denormalizeCategories } from '../services/categoryUtils';

// Types
// --------------------------------------------------------------------------

interface Props {
  // List of all the current categories.
  categories: NormalizedCategoryList;

  // Currently selected category.
  currentCategory?: number;
  /**
   * Selects a category to filter alerts with.
   * @param category Category to filter alerts with.
   */
  selectCategory(category: number): any;
}

// Component
// --------------------------------------------------------------------------

// Displays options for filtering alerts by category.
export class AlertParamsCategorySelect extends React.Component<Props, {}> {
  /**
   * Category select option that selects all alert categories.
   * @type {any}
   */
  static ALL_CATEGORIES_OPTION: SelectOption = {
    name: 'All',
    value: 0,
  };

  /**
   * Handles the select on change event to select a category.
   * @param value Value from the select element onChange event.
   */
  onSelectChange = (value: string): void => {
    const category = parseInt(value, 10);

    this.props.selectCategory(category);
  };

  render() {
    const options: SelectOption[] = denormalizeCategories(this.props.categories)
      .map(category => ({ name: category.name, value: category.id }));

    options.unshift(AlertParamsCategorySelect.ALL_CATEGORIES_OPTION);

    return (
      <div className="alert-list-params__spacer alert-list-params__group">
        <h3 className="sub-title">Category</h3>
        <Select
          options={options}
          onChange={this.onSelectChange}
          value={this.props.currentCategory || 0}
        />
      </div>
    );
  }
}
