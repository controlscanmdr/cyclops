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
import { Pagination } from 'react-bootstrap';

// Local
import { SearchAlertResult } from './SearchAlertResult';
import { AlertDetail } from '../../alerts/types/Alert';
import { SearchQueryInstructions } from './SearchQueryInstructions';
import './SearchAlertResults.scss';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Current page of alert results.
  page: number;

  // Total number of alert results.
  count: number;

  // Current page of alert results.
  results: AlertDetail[];

  /**
   * Function run when one of the alert results is clicked.
   * @param {number} alertId
   */
  onAlertClick(alertId: number): void;

  /**
   * Function run when a user wants to navigate to a new page of results.
   * @param {number} page
   */
  onPaginate(page: number): void;
}

// Component
// --------------------------------------------------------------------------

// Displays the alert results returned from a search query.
export class SearchAlertResults extends React.Component<Props, {}> {

  // Handles the pagination select event.
  onSelect = (eventKey: any) => {
    this.props.onPaginate(eventKey);
  };

  render() {
    const results = this.props.results
      ? this.props.results.map(result => (
        <SearchAlertResult
          onClick={this.props.onAlertClick}
          alert={result}
          key={result.id}
        />
      ))
      : null;
    const paginationItems = this.props.results
      ? Math.ceil(this.props.count / 10)
      : 1;

    return results && results.length
      ? (
        <div className="flex-box flex-box--column">
          <div className="flex-item SearchAlertResults__Container">
            {results}
          </div>
          <div
            className="flex-item flex--shrink text-center content"
            style={{ 'border-top': 'solid 1px #3b3c41' }}
          >
            <Pagination
              items={paginationItems}
              activePage={this.props.page}
              onSelect={this.onSelect}
              maxButtons={5}
              next="Next"
              prev="Prev"
              first="First"
              last="Last"
            />
          </div>
        </div>
      ) : (
        <div className="flex-item content">
          <h1 className="text-center text--muted">No Results</h1>
          <SearchQueryInstructions />
        </div>
      );
  }
}
