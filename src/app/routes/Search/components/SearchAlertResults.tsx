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
import { Pagination } from 'react-bootstrap';

import { SearchAlertResult } from '~/routes/Search/components/SearchAlertResult';
import { AlertDetail } from '~/services/alerts/types';
import { SearchQueryInstructions } from '~/routes/Search/components/SearchQueryInstructions';
import './SearchAlertResults.scss';

interface Props {
  page: number;
  count: number;
  results: AlertDetail[];
  onAlertClick(alertID: number): void;
  onPaginate(page: number): void;
}

/**
 * Displays the alert results returned from a search query.
 */
export class SearchAlertResults extends React.Component<Props, {}> {
  public onSelect = (eventKey: any) => {
    this.props.onPaginate(eventKey);
  };

  public render() {
    const results = this.props.results
      ? this.props.results.map((result) => (
        <SearchAlertResult
          onClick={this.props.onAlertClick}
          alert={result}
          key={result.id}
        />
      )) : null;
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
