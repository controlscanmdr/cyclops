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
  // Initial value of the search bar when rendered.
  initialValue?: string;

  /**
   * Function run when a user submits the value.
   * @param {string} query
   */
  onSubmit(query: string): void;
}

interface State {
  // Current query string in the text input.
  query: string;
}

// Component
// --------------------------------------------------------------------------

// Wide text input with a submit button triggered by pressing enter.
export class SearchBar extends React.Component<Props, State> {
  state = {
    query: this.props.initialValue || '',
  };

  /**
   * Handles the change event from the input element.
   * @param {React.FormEvent<HTMLInputElement>} event
   */
  onChange: React.FormEventHandler<HTMLInputElement> = (event) => {
    this.setState({ query: event.currentTarget.value });
  };

  // Submits the query to the onSubmit property.
  submitQuery = () => {
    this.props.onSubmit(this.state.query);
  };

  /**
   * Handles the key press event from the input element.
   * @param {React.KeyboardEvent<HTMLInputElement>} event
   */
  onKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') { this.submitQuery(); }
  };

  // Handles the submit button click.
  onSubmit = () => {
    this.submitQuery();
  };

  render() {
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
          value={this.state.query}
        />
        <span>
          <button onClick={this.onSubmit}>Submit</button>
        </span>
      </div>
    );
  }
}
