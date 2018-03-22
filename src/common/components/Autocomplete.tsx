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
import Complete = require('react-autocomplete');
import * as classnames from 'classnames';

// Local
import './AutoComplete.scss';
import { LoadingLine } from './LoadingLine';

// Types
// --------------------------------------------------------------------------

export interface Props {
  // Items included in the autocomplete.
  items: any[];

  // Initial value of the input element.
  value: string;

  // Placeholder value of the input element.
  placeholder?: string;

  // If a loading icon should be shown.
  isLoading?: boolean;

  /**
   * Returns the display value of an item.
   * @param value
   * @returns {any}
   */
  getValue(value: any): any;

  /**
   * Function run when the user selects one of the items.
   * @param item
   */
  onSelect?(item: any): void;

  /**
   * Function that determines if a particular item should be displayed.
   * @param item
   * @returns {boolean}
   */
  shouldItemDisplay?(item: any): boolean;
}

export interface State {
  // Currently selected item.
  selected: string;

  // Current value in the input element.
  value: string;

  // Currently filtered items.
  filtered: any[];
}

// Component
// --------------------------------------------------------------------------

// Input element that allows for text autocomplete.
export class Autocomplete extends React.Component<Props, Partial<State>> {
  // Base component properties for the react-autocomplete input element.
  static INPUT_PROPS = {
    className: 'form-control',
  };

  // Base component properties for the react-autocomplete wrapper element.
  static WRAPPER_PROPS = {
    className: 'Autocomplete__Wrapper',
  };

  static WRAPPER_STYLE = {
    display: 'block',
  };

  /**
   * Renders the autocomplete menu.
   * @param {any[]} items
   * @param {string} value
   * @param styles
   * @returns {JSX.Element}
   */
  renderMenu = (items: any[], value: string, styles: any): JSX.Element => {
    const list = items.length
      ? items
      : <div className="Autocomplete__MenuItem"><i>Empty</i></div>;

    return <div className="Autocomplete__Menu" style={styles} children={list} />;
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      selected: this.props.value,
      value: '',
      filtered: this.filterItems(this.props.items, this.props.value),
    };
  }

  componentWillReceiveProps(nextProps: Props): void {
    const filtered = this.filterItems(nextProps.items, this.state.value || '');
    const selected = nextProps.value;
    const value = selected !== this.state.selected
      ? selected
      : this.state.value;

    this.setState({ filtered, selected, value });
  }

  /**
   * Function that runs when the visibility of the autocomplete menu changes.
   * @param {boolean} open
   */
  onMenuVisibilityChange = (open: boolean): void => {
    if (!open) this.setState({ value: this.state.selected });
  };

  /**
   * Creates the passed down props to the Autocomplete input element.
   * @returns {any}
   */
  getInputProps = (): any => {
    return {
      ...Autocomplete.INPUT_PROPS,
      placeholder: this.props.placeholder,
    };
  };

  /**
   * Filters the autocomplete items based on the current value of the input element
   * and a custom filter passed in from the properties.
   * @param {any[]} items
   * @param {string} value
   * @returns {any[]}
   */
  filterItems = (items: any[], value: string): any[] => {
    const filtered: any[] = [];

    items.forEach((item) => {
      const text = this.props.getValue(item);
      const includesText = _.includes(text.toLowerCase(), value.toLowerCase());
      const passesFilter = this.props.shouldItemDisplay
        ? this.props.shouldItemDisplay(item)
        : true;

      if (includesText && passesFilter) filtered.push({ ...item });
    });

    return filtered;
  };

  /**
   * Renders an item in an autocomplete drop down.
   * @param item Object to render.
   * @param {boolean} active If the current item is highlighted.
   * @returns {JSX.Element}
   */
  renderItem = (item: any, active: boolean): JSX.Element => {
    const classes = classnames('Autocomplete__MenuItem', {
      'Autocomplete__MenuItem--active': active,
    });

    return <div className={classes}>{this.props.getValue(item)}</div>;
  };

  /**
   * Handles the select action when an item is selected.
   * @param {string} value
   * @param item
   */
  handleSelect = (value: string, item: any): void => {
    if (this.props.onSelect) { this.props.onSelect(item); }
  };

  /**
   * Handles when the use changes the inputs value.
   * @param {React.SyntheticEvent<HTMLInputElement>} event Event emitted from the input element.
   * @param {string} value Selected value.
   */
  handleChange = (event: React.SyntheticEvent<HTMLInputElement>, value: string): void => {
    const filtered = this.filterItems(this.props.items, value);

    this.setState({ value, filtered });
  };

  render() {
    return (
      <div className="Autocomplete">
        <Complete
          items={this.state.filtered || []}
          getItemValue={this.props.getValue}
          renderItem={this.renderItem}
          inputProps={this.getInputProps()}
          onMenuVisibilityChange={this.onMenuVisibilityChange}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          value={this.state.value}
          renderMenu={this.renderMenu}
          wrapperProps={Autocomplete.WRAPPER_PROPS}
          wrapperStyle={Autocomplete.WRAPPER_STYLE}
        />
        <LoadingLine show={Boolean(this.props.isLoading)} overlay={true} />
      </div>
    );
  }
}
