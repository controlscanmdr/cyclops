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

// Types
// --------------------------------------------------------------------------

interface Props {
  // Current value of the select element.
  value?: string | number;
  // Options to display in the select drop down.
  options: SelectOption[];
  /**
   * Function that's run whenever the select element changes.
   * @param value Selected value in the select element.
   */
  onChange(value: string): any;
}

// Object used to create a select option element.
export interface SelectOption {
  // Display value of the option element.
  name: string;
  // Value of the option element.
  value: string | number;
}

// Component
// --------------------------------------------------------------------------

// Select drop down that handles an onChange event.
export class Select extends React.Component<Props, {}> {
  /**
   * Handles the onChange event from the select element by passing the
   * value to the onChange property function.
   * @param event Select onChange event.
   */
  handleChange: React.FormEventHandler<HTMLSelectElement> = (event): void => {
    this.props.onChange(event.currentTarget.value);
  };

  /**
   * Renders the current drop down list items.
   * @returns {JSX.Element[]}
   */
  renderOptions = (): JSX.Element[] => {
    return this.props.options.map(option => (
      <option key={option.value} value={option.value}>{option.name}</option>
    ));
  };

  render() {
    return (
      <div className="form-group">
        <select className="form-control" onChange={this.handleChange} value={this.props.value}>
          {this.renderOptions()}
        </select>
      </div>
    );
  }
}
