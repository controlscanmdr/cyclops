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

// Local
import { SearchViewChangeButton } from './SearchViewChangeButton';
import { addCommas } from '../../common/services/stringUtils';
import { SearchQueryView } from '../actions/searchQueryActions';
import { SearchTimeFilterButton } from './SearchTimeFilterButton';
import './SearchResultsHeader.scss';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Number of alerts matching search query.
  alertResultCount: number;

  // Number of data results matching search query.
  resultCount: number;

  // Current result view.
  view: SearchQueryView;

  // Time after filter used to search data.
  after?: string;

  // Time before filter used to search data.
  before?: string;

  // Relative time used to search data.
  relative?: string;

  // Function used to change the current result view.
  changeView(view: SearchQueryView): any;

  // Function to run when the time filter display button is clicked.
  onTimeClick(): any;
}

// Component
// --------------------------------------------------------------------------

// Header of the current search results.
export class SearchResultsHeader extends React.Component<Props, {}> {
  render() {
    return (
      <div className="flex-box flex--shrink">
        <div className="flex-box SearchResultsHeader__Container">
          <div className="flex-item">
            <span className="text--emphasis">
              {addCommas(this.props.alertResultCount + this.props.resultCount)}
            </span>
            {' '}
            <span className="SearchResultsHeader__CountTitle">Results</span>
            <SearchViewChangeButton
              view={SearchQueryView.Alerts}
              onClick={this.props.changeView}
              activeView={this.props.view}
            >
              {addCommas(this.props.alertResultCount)} Alerts
            </SearchViewChangeButton>
            <SearchViewChangeButton
              view={SearchQueryView.Data}
              onClick={this.props.changeView}
              activeView={this.props.view}
            >
              {addCommas(this.props.resultCount)} Data
            </SearchViewChangeButton>
          </div>
          <div className="flex-item flex--shrink">
            <SearchTimeFilterButton
              onClick={this.props.onTimeClick}
              after={this.props.after}
              before={this.props.before}
              relative={this.props.relative}
            />
          </div>
        </div>
      </div>
    );
  }
}
