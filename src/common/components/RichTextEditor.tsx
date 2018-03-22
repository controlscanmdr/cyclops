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
import { Editor, EditorState, ContentState, convertFromHTML } from 'draft-js';

// Types
// --------------------------------------------------------------------------

export interface Props {
  // Initial value of the text editor.
  initial?: string;

  // If the editor should be read only.
  readonly?: boolean;
}

export interface State {
  state: EditorState;
}

// Component
// --------------------------------------------------------------------------

// Rich text editor.
export class RichTextEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    if (this.props.initial) this.setInitialState(this.props.initial);
    else this.setEmptyInitialState();
  }

  setEmptyInitialState = (): void => {
    this.state = { state: EditorState.createEmpty() };
  };

  setInitialState = (html: string): void => {
    const blocks = convertFromHTML(html);
    const state = ContentState.createFromBlockArray(blocks.contentBlocks, blocks.entityMap);

    this.state = { state: EditorState.createWithContent(state) };
  };

  handleChange = (state: EditorState): void => {
    this.setState({ state });
  };

  render() {
    return (
      <Editor
        editorState={this.state.state}
        onChange={this.handleChange}
      />
    );
  }
}
