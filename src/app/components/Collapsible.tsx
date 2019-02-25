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
import * as classnames from 'classnames';

import { FontAwesome } from '~/components/FontAwesome';
import './Collapsible.scss';
import { Button, ButtonType } from '~/components/Button';

interface Props {
  descriptor: JSX.Element | string;
  open: boolean;
}

interface State {
  open: boolean;
}

/**
 * Creates a block of text with a descriptor that can be collapsed to
 * save screen real estate.
 */
export class Collapsible extends React.Component<Props, State> {
  public state = { open: this.props.open };

  public close = () => {
    this.setState({ open: false });
  };

  public open = () => {
    this.setState({ open: true });
  };

  public toggle = () => {
    if (this.state.open) { this.close(); }
    else { this.open(); }
  };

  public render() {
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
          <Button type={ButtonType.Plain} onClick={this.toggle}>
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
