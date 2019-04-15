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

// Local
import { TextArea } from './TextArea';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the SubtleTextArea component. */
interface Props {
  /** Text to fill the text area with. */
  text?: string;
  /**
   * Function that runs when the submit button is clicked.
   * @param value Value that was selected.
   */
  onSubmit(value: string): any;
}

/** Internal state of the SubtleTextArea component. */
interface State {
  /** If the text area is visible. */
  active: boolean;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Creates a clickable box of text that opens a textarea allowing the user
 * to make changes to the text.
 */
export class SubtleTextArea extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { active: false };

    this.closeTextArea = this.closeTextArea.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showTextArea = this.showTextArea.bind(this);
  }

  /**
   * Handle the submit action and closes the text area once it completes.
   * @param value Current contents of the text area.
   * @returns {Promise<void>}
   */
  public handleSubmit = (value: string): void => {
    Promise
      .resolve(this.props.onSubmit(value))
      .then(() => this.closeTextArea());
  };

  /**
   * Hides the text area.
   */
  public closeTextArea = (): void => {
    this.setState({ active: false });
  };

  /**
   * Shows the text area.
   */
  public showTextArea = (): void => {
    this.setState({ active: true });
  };

  public render(): JSX.Element {
    const { text } = this.props;
    const { active } = this.state;
    const { showTextArea, closeTextArea, handleSubmit } = this;
    const textAreaElement = active ? (
      <TextArea
        text={text}
        onSubmit={handleSubmit}
        onCancel={closeTextArea}
      />
    ) : (
      <div className="subtle-text-area__button" onClick={showTextArea}>
        {text || 'None'}
      </div>
    );

    return (<div>{textAreaElement}</div>);
  }
}
