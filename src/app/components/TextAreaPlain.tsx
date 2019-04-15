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

/** Properties of the TextAreaPlain component. */
interface Props {
  /** Current text to place in the text area. */
  value?: string;
  /**
   * Function to run whenever the text changes.
   * @param value Current text in the text area.
   */
  onChange(value: string): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays a text area that handles the onChange event.
 */
export class TextAreaPlain extends React.Component<Props, {}> {
  /**
   * Handles the onChange event from a text area.
   * @param event Text area onChange event.
   */
  public handleChange: React.FormEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    this.props.onChange(event.currentTarget.value);
  };

  public render() {
    return (
      <div className="form-group">
        <textarea
          className="form-control"
          rows={8}
          onChange={this.handleChange}
          value={this.props.value}
        />
      </div>
    );
  }
}
