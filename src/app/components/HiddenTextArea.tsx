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

import { TextArea } from './TextArea';

interface Props {
  /** Text to fill the textarea with when it's shown. */
  text?: string;
  /** Text to put in the button. */
  buttonText?: string;
  /**
   * Function to perform when the submit button
   * @param value
   */
  onSubmit(value: string): any;
}

interface State {
  /** If the text area should be shown. */
  active: boolean;
}

/**
 * Text area that is hidden until the user clicks a button.
 */
export class HiddenTextArea extends React.Component<Props, State> {
  public state = { active: false };

  /**
   * Passes the current string value in the text area to the given function
   * that handles the value.
   * @param value String value to submit.
   * @return {Promise<undefined>}
   */
  public handleSubmit = (value: string): Promise<void> => {
    return Promise.resolve(this.props.onSubmit(value))
      .then(() => this.hideTextArea());
  };

  public hideTextArea = (): void => {
    this.setState({ active: false });
  };

  public showTextArea = (): void => {
    this.setState({ active: true });
  };

  public render(): JSX.Element {
    const textAreaOrButton = this.state.active
      ? (
        <TextArea
          text={this.props.text}
          onSubmit={this.handleSubmit}
          onCancel={this.hideTextArea}
        />
      ) : (
        <button
          className="btn btn-default btn-block"
          onClick={this.showTextArea}
        >
          {this.props.buttonText}
        </button>
      );

    return (
      <div>{textAreaOrButton}</div>
    );
  }
}
