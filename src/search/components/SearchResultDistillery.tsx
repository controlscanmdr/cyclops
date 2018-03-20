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
import { ListGroupItem } from 'react-bootstrap';

// Local
import { DistilleryMinimal } from '../../distilleries/types/Distillery';
import { addCommas } from '../../common/services/stringUtils';

// Types
// --------------------------------------------------------------------------

interface Props {
  // If this distillery view is currently active.
  isActive: boolean;

  // Distillery related to the search results.
  distillery: DistilleryMinimal;

  // Total number of distillery search results.
  resultCount: number;

  /**
   * Function run when the user clicks the distillery element.
   * @param {number} distilleryID
   * @returns {any}
   */
  onSelect(distilleryID: number): any;
}

// Component
// --------------------------------------------------------------------------

export class SearchResultDistillery extends React.Component<Props, {}> {
  // Handles the click element of the root element.
  onClick = () => {
    this.props.onSelect(this.props.distillery.id);
  };

  render() {
    return (
      <ListGroupItem
        active={this.props.isActive}
        onClick={this.onClick}
        key={this.props.distillery.id}
      >
        {this.props.distillery.name}
        {' '}
        <span className="text--muted">({addCommas(this.props.resultCount)})</span>
      </ListGroupItem>
    );
  }
}
