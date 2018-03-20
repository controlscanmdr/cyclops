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
import { TextArea } from './TextArea';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Text to fill the text area with.
  text?: string;

  /**
   * Function that runs when the submit button is clicked.
   * @param value Value that was selected.
   */
  onSubmit(value: string): any;
}

interface State {
  // If the text area is visible.
  active: boolean;
}

// Component
// --------------------------------------------------------------------------

/**
 * Creates a clickable box of text that opens a textarea allowing the user
 * to make changes to the text.
 */
export class SubtleTextArea extends React.Component<Props, State> {
  state = { active: false };

  /**
   * Handle the submit action and closes the text area once it completes.
   * @param value Current contents of the text area.
   * @returns {Promise<void>}
   */
  handleSubmit = (value: string): void => {
    Promise
      .resolve(this.props.onSubmit(value))
      .then(() => this.closeTextArea());
  };

  // Hides the text area.
  closeTextArea = (): void => {
    this.setState({ active: false });
  };

  // Shows the text area.
  showTextArea = (): void => {
    this.setState({ active: true });
  };

  render(): JSX.Element {
    const textAreaElement = this.state.active ? (
      <TextArea
        text={this.props.text}
        onSubmit={this.handleSubmit}
        onCancel={this.closeTextArea}
      />
    ) : (
      <div className="subtle-text-area__button" onClick={this.showTextArea}>
        {this.props.text || 'None'}
      </div>
    );

    return (<div>{textAreaElement}</div>);
  }
}
