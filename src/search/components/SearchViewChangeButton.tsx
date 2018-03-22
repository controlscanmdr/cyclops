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
import { SearchQueryView } from '../actions/searchQueryActions';

// Types
// --------------------------------------------------------------------------

interface Props {
  // View that the button will change to when clicked.
  view: SearchQueryView;

  // The currently active view.
  activeView: SearchQueryView;

  /**
   * Function run when the button button is clicked.
   * @param {SearchQueryView} view
   * @returns {any}
   */
  onClick(view: SearchQueryView): any;
}

// Component
// --------------------------------------------------------------------------

// Button that changes the results view of the search page.
export class SearchViewChangeButton extends React.Component<Props, {}> {
  // Handles the button click event.
  onClick = () => {
    this.props.onClick(this.props.view);
  };

  render() {
    const classes = classnames('btn-basic', 'pill', {
      'pill--active': this.props.view === this.props.activeView,
    });

    return (
      <button onClick={this.onClick} className={classes}>
        {this.props.children}
      </button>
    );
  }
}
