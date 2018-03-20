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
import { Pagination, ListGroup } from 'react-bootstrap';

// Local
import { Result } from '../../common/types/result';
import { SearchQueryInstructions } from './SearchQueryInstructions';
import { JSONTable } from '../../common/components/JSONTable';
import { Well } from '../../common/components/Well';
import './SearchResults.scss';

// Types
// --------------------------------------------------------------------------

interface Props {
  // List of search results.
  results: Result[];

  // Total number of search results.
  count: number;

  // Current page of results.
  page: number;

  // Distilleries that have search results.
  distilleries: JSX.Element[];

  /**
   * Function fired when the current page number changes.
   * @param {number} page
   * @returns {any}
   */
  onPaginate(page: number): any;
}

// Component
// --------------------------------------------------------------------------

// List of results from distillery stores that match the current query.
export class SearchResults extends React.Component<Props> {
  /**
   * Handles the change event from the pagination element.
   * @param eventKey
   */
  changePage = (eventKey: any) => {
    this.props.onPaginate(eventKey);
  };

  render() {
    if (!this.props.distilleries.length) {
      return (
        <div className="flex-box">
          <div className="flex-item content">
            <h1 className="text-center text--muted">No Results</h1>
            <SearchQueryInstructions />
          </div>
        </div>
      );
    }
    const results = this.props.results.map((result) => (
      <Well key={result._id} isLight={true}>
        <Well.Content>
          <JSONTable data={result}/>
        </Well.Content>
      </Well>
    ));

    return (
      <div className="flex-box">
        <div className="flex-box flex--shrink">
          <div className="flex-item SearchResults__Sidebar">
            <ListGroup>
              {this.props.distilleries}
            </ListGroup>
          </div>
        </div>
        <div className="flex-box flex-box--column">
          <div className="flex-box">
            <div className="flex-item SearchResults__Results">
              {results}
            </div>
          </div>
          <div className="flex-box flex--shrink">
            <div className="flex-item SearchResults__Pagination">
              <Pagination
                items={Math.ceil(this.props.count / 10)}
                activePage={this.props.page}
                onSelect={this.changePage}
                maxButtons={5}
                next="Next"
                prev="Prev"
                first="First"
                last="Last"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
