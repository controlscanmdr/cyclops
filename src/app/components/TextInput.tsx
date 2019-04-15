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

/** Properties of the TextInput component. */
interface Props {
  /** Placeholder text to use on the input element. */
  placeholder?: string;
  /**
   * Function run whenever there is a change made to the input.
   * @param text The new text in the input.
   */
  updateText(text: string): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays an input element that displays and makes changes to a string.
 */
export class TextInput extends React.Component<Props, {}> {
  /**
   * Handles the change event emitted from the input element.
   * @param event
   */
  public handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const value = event.currentTarget.value;

    this.props.updateText(value);
  };

  public render(): JSX.Element {
    return (
      <input
        type="text"
        className="form-control"
        onChange={this.handleChange}
        placeholder={this.props.placeholder}
      />
    );
  }
}
