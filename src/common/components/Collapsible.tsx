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
import * as classnames from 'classnames';

// Local
import { FontAwesome } from './FontAwesome';
import './Collapsible.scss';
import { Button } from './Button';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Description of the data the component contains.
  descriptor: JSX.Element | string;

  // If the item should be open on initial render.
  open: boolean;
}

interface State {
  // If the component is open.
  open: boolean;
}

// Component
// --------------------------------------------------------------------------

/**
 * Creates a block of text with a descriptor that can be collapsed to
 * save screen real estate.
 */
export class Collapsible extends React.Component<Props, State> {
  state = { open: this.props.open };

  // Closes the component.
  close = () => {
    this.setState({ open: false });
  };

  // Opens the component.
  open = () => {
    this.setState({ open: true });
  };

  // Toggles the
  toggle = () => {
    if (this.state.open) this.close();
    else this.open();
  };

  render() {
    const content = this.state.open ? this.props.children : null;
    const caretClasses = classnames('fa', 'btn__caret', {
      'fa-caret-down': this.state.open,
      'fa-caret-right': !this.state.open,
    });
    const ellipsis = !this.state.open
      ? <i className="fa fa-ellipsis-h text--muted" />
      : null;

    return (
      <div>
        <div>
          <Button type="plain" onClick={this.toggle}>
            {this.props.descriptor}
            <FontAwesome
              icon={this.state.open ? 'caret-down' : 'caret-right'}
              className="Collapsible__Caret"
            />
            <i className={caretClasses} />
            {ellipsis}
          </Button>
        </div>
        {content}
      </div>
    );
  }
}
