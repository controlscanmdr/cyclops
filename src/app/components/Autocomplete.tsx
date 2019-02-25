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

import * as React from 'react';
import * as _ from 'lodash';
import Complete = require('react-autocomplete');
import * as classnames from 'classnames';

interface Props {
  items: any[];
  value: string;
  placeholder?: string;
  getValue(value: any): any;
  onSelect?(item: any): void;
  filter?(item: any): boolean;
}

interface State {
  selected: string;
  value: string;
  filtered: any[];
}

/** Input element that allows for text autocomplete. */
export class Autocomplete extends React.Component<Props, Partial<State>> {
  /** Base component properties for the react-autocomplete input element. */
  public static INPUT_PROPS = {
    className: 'form-control',
  };

  /** Base component properties for the react-autocomplete wrapper element. */
  public static WRAPPER_PROPS = {
    className: 'form-group',
  };

  public static renderMenu = (
    items: any[],
    value: string,
    styles: any,
  ): JSX.Element => (
    <div className="AutoComplete__Menu" style={styles} children={items} />
  );

  public state = {
    selected: this.props.value || '',
    value: '',
    filtered: this.props.items || [],
  };

  public componentWillReceiveProps(nextProps: Props): void {
    const filtered = this.filterItems(nextProps.items, this.state.value || '');
    const selected = nextProps.value;
    const value = selected !== this.state.selected
      ? selected
      : this.state.value;

    this.setState({ filtered, selected, value });
  }

  public onMenuVisibilityChange = (open: boolean): void => {
    if (!open) { this.setState({ value: this.state.selected }); }
  };

  public getInputProps = (): any => {
    return {
      ...Autocomplete.INPUT_PROPS,
      placeholder: this.props.placeholder,
    };
  };

  public filterItems = (items: any[], value: string): any[] => {
    const filtered: any[] = [];

    items.forEach((item) => {
      const text = this.props.getValue(item);
      const includesText = _.includes(text.toLowerCase(), value.toLowerCase());
      const passesCustomFilter = this.props.filter
        ? !this.props.filter(item)
        : true;

      if (includesText && passesCustomFilter) { filtered.push({ ...item }); }
    });

    return filtered;
  };

  public renderItem = (item: any, active: boolean): JSX.Element => {
    const classes = classnames('AutoComplete__MenuItem', {
      'AutoComplete__MenuItem--active': active,
    });

    return <div className={classes}>{this.props.getValue(item)}</div>;
  };

  public handleSelect = (value: string, item: any): void => {
    if (this.props.onSelect) { this.props.onSelect(item); }
  };

  public handleChange = (
    event: React.SyntheticEvent<HTMLInputElement>,
    value: string,
  ) => {
    const filtered = this.filterItems(this.props.items, value);

    this.setState({ value, filtered });
  };

  public render() {
    return (
      <Complete
        items={this.state.filtered || []}
        getItemValue={this.props.getValue}
        renderItem={this.renderItem}
        inputProps={this.getInputProps()}
        onMenuVisibilityChange={this.onMenuVisibilityChange}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        value={this.state.value}
        renderMenu={Autocomplete.renderMenu}
        wrapperProps={Autocomplete.WRAPPER_PROPS}
      />
    );
  }
}
