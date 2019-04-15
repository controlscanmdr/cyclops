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

// Vendor
import * as React from 'react';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertListSearchBar component. */
interface Props {
  /** Current content of the search bar. */
  content: string | undefined;
  /**
   * Performs a search on the current alert list with the content in the
   * search bar.
   * @param content Content to search for.
   */
  searchContent(content?: string): any;
}

/** Internal state of the AlertListSearchBar component. */
interface State {
  /** Current content in the search bar. */
  content: string | undefined;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays an alerts search bar that searches alerts that contain the
 * specified content.
 */
export class AlertListSearchBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { content: undefined };
  }

  /**
   * Make sure the internal content and external content match when the
   * element is first loaded.
   */
  public componentWillMount(): void {
    if (this.state.content !== this.props.content) {
      this.setState({ content: this.props.content });
    }
  }

  /**
   * Handles the text change from the input element.
   * @param event
   */
  public handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const value = event.currentTarget.value;

    if (!value) { this.setState({ content: undefined }); }
    else { this.setState({ content: value }); }
  };

  /**
   * Ensures that when a user presses enter while in the text area, it will
   * create a search.
   * @param event
   */
  public handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key === 'Enter') { this.search(); }
  };

  /**
   * Searches alerts matching the given content string.
   */
  public search = (): void => {
    this.props.searchContent(this.state.content);
  };

  public render(): JSX.Element {
    return (
      <div className="alert-list__search-bar">
        <input
          type="text"
          placeholder="Search"
          value={this.state.content}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <span>
          <button onClick={this.search}>Submit</button>
        </span>
      </div>
    );
  }
}
