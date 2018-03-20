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
import * as _ from 'lodash';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Description of the content.
  title: string;

  // Name of the action performed when an action is specified.
  actionName?: string;

  // If extra space should be placed around the component.
  spaced?: boolean;

  // If the item should initially render as open.
  open?: boolean;

  // Action to run when a button is clicked.
  action?(): any;
}

interface State {
  // If the content should be viewable.
  open: boolean;
}

// Component
// --------------------------------------------------------------------------

// Collapsible component as a header.
export class CollapsibleHeader extends React.Component<Props, State> {
  state = { open: _.defaultTo<boolean>(this.props.open, true) };

  // Closes the content.
  close = (): void => {
    this.setState({ open: false });
  };

  // Opens the content.
  open = (): void => {
    this.setState({ open: true });
  };

  // Toggles the visibility of the content.
  toggle = (): void => {
    (this.state.open ? this.close : this.open)();
  };

  render() {
    const caret = this.state.open
      ? <i className="fa fa-caret-down collapsible__caret" />
      : <i className="fa fa-caret-right collapsible__caret" />;
    const content = this.state.open
      ? this.props.children
      : null;
    const ellipsis = this.state.open
      ? null
      : <i className="fa fa-ellipsis-h collapsible__ellipsis" />;
    const action = this.props.action
      ? (
        <button className="btn-basic collapsible__action" onClick={this.props.action}>
          {this.props.actionName}
        </button>
      ) : null;
    const classes = classnames(
      'collapsible__title--spaced flex-box flex-box--align-center',
      { collapsible__spacer: this.props.spaced },
    );

    return (
      <div>
        <div className={classes}>
          <h3 className="collapsible__title flex-item flex--shrink">
            <button className="btn--plain" onClick={this.toggle}>
              {this.props.title}{caret}{ellipsis}
            </button>
          </h3>
          <div className="sub-title flex-item" />
          <div className="flex-item flex--shrink">
            {action}
          </div>
        </div>
        {content}
      </div>
    );
  }
}
