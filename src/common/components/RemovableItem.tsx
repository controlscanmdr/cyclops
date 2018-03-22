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

// Types
// --------------------------------------------------------------------------

interface Props {
  // Item to display.
  item: any;

  /**
   * Returns the display value of the item.
   * @param item Item currently displayed.
   */
  getValue(item: any): any;

  /**
   * Function run when the close button is clicked.
   * @param item Item currently displayed.
   */
  onClick(item: any): void;
}

// Component
// --------------------------------------------------------------------------

/**
 * Displays an string value of an item with a close button that
 * performs a specified action.
 */
export class RemovableItem extends React.Component<Props, {}> {
  // Passes the item value to the onClick function.
  onClick = () => {
    this.props.onClick(this.props.item);
  };

  render() {
    return (
      <div className="removable-item">
        <div className="removable-item__content">
          {this.props.getValue(this.props.item)}
        </div>
        <button className="removable-item__button" onClick={this.onClick}>
          <i className="fa fa-close" />
        </button>
      </div>
    );
  }
}
