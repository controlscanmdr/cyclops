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

interface Props {
  initialValue?: string;
  onSubmit(query: string): void;
}

interface State {
  query: string;
}

// Wide text input with a submit button triggered by pressing enter.
export class SearchBar extends React.Component<Props, State> {
  public state = {
    query: this.props.initialValue || '',
  };

  public onChange: React.FormEventHandler<HTMLInputElement> = (event) => {
    this.setState({ query: event.currentTarget.value });
  };

  public submitQuery = () => {
    this.props.onSubmit(this.state.query);
  };

  public onKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') { this.submitQuery(); }
  };

  public onSubmit = () => {
    this.submitQuery();
  };

  public render() {
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
