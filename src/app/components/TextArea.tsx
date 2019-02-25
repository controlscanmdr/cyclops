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
import { ButtonGroup, Button } from 'react-bootstrap';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the TextArea component. */
interface TextAreaProps {
  /** Text to fill the text area with. */
  text?: string;
  /** Function to run when the submit button is clicked. */
  onSubmit(value: string): any;
  /** Function to run when the cancel button is clicked. */
  onCancel?(): any;
}

/** Internal state of the TextArea component. */
interface TextAreaState {
  /** Current text of the text area. */
  text: string;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Creates a textarea that tracks changes to the content and allows the
 * user to perform an action with the content or cancel.
 */
export class TextArea extends React.Component<TextAreaProps, TextAreaState> {
  constructor(props: TextAreaProps) {
    super(props);

    this.state = { text: this.props.text || '' };
  }

  /**
   * Handles the text change of the textarea onChange event.
   * @param e React onChange event.
   */
  public handleTextChange = (
    e: React.SyntheticEvent<HTMLTextAreaElement>,
  ): void => {
    this.setState({ text: e.currentTarget.value });
  };

  /**
   * Submits the current text.
   */
  public handleSubmit = (): void => {
    this.props.onSubmit(this.state.text);
  };

  /**
   * Performs the passed in cancel function.
   */
  public handleCancel = (): void => {
    const { onCancel } = this.props;

    if (onCancel) { onCancel(); }
  };

  public render(): JSX.Element {
    const { handleCancel, handleSubmit } = this;

    return (
      <div>
        <textarea
          className="form-control text-area__input"
          onChange={this.handleTextChange}
          value={this.state.text}
        />
        <div>
          <ButtonGroup justified={true}>
            <ButtonGroup>
              <Button
                bsStyle="default"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button
                bsStyle="danger"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}
