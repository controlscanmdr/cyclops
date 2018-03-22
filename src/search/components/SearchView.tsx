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
import { DistilleryNested } from '../../distilleries/types/Distillery';
import { CollapsibleHeader } from '../../common/components/CollapsibleHeader';
import { ContainerNested } from '../../containers/types/Container';
import { Field } from '../../cyphon/types/Response';
import { SearchBar } from './SearchBar';
import { SearchField } from './SearchField';
import { SearchDistillery } from './SearchDistillery';
import { SearchQuery } from './SearchQuery';
import { SearchQuery as SearchQueryInterface } from '../types/Search';
import { Loading } from '../../common/components/Loading';
import { SearchQueryView } from '../actions/searchQueryActions';
import { SearchFields } from './SearchFields';
import { SearchResultsHeader } from './SearchResultsHeader';
import { SearchTimeFilterPanel } from './SearchTimeFilterPanel';
import './SearchView.scss';

// Types
// --------------------------------------------------------------------------

interface Props {
  // List of all the current containers in Cyphon.
  containers: ContainerNested[];

  // List of all the current fields in Cyphon.
  fields: Field[];

  // List of all the current distilleries in Cyphon.
  distilleries: DistilleryNested[];

  // String representation of the current query.
  initialQuery: string;

  // Object representation of the current string query.
  queryObject?: SearchQueryInterface;

  // Total number of alert results.
  alertResultCount: number;

  // Total number of raw data results.
  resultCount: number;

  // Current active result view.
  view: SearchQueryView;

  // Current time to search for results after.
  after?: string;

  // Current time to search for results before.
  before?: string;

  // Current relative time search.
  relative?: string;

  // If more results are currently being loaded.
  isLoading: boolean;

  // If the current search query string is valid.
  isQueryValid: boolean;

  /**
   * Changes the current results view.
   * @param {SearchQueryView} view
   * @returns {any}
   */
  changeView(view: SearchQueryView): any;

  /**
   * Changes the current search query.
   * @param {string} query
   * @returns {any}
   */
  changeQuery(query: string): any;

  /**
   * Function fired whenever there's an absolute time change.
   * @param {string} after
   * @param {string} before
   * @returns {any}
   */
  onAbsoluteTimeChange(after?: string, before?: string): any;

  /**
   * Function fired whenever there's a relative time change.
   * @param {string} relative
   * @returns {any}
   */
  onRelativeTimeChange(relative: string): any;
}

interface State {
  // If the time filter panel is currently viewable.
  timePanelIsActive: boolean;
}

// Component
// --------------------------------------------------------------------------

// Root component of the Search page.
export class SearchView extends React.Component<Props, State> {
  state: State = {
    timePanelIsActive: false,
  };

  // Toggles if the time panel is currently viewable.
  toggleTimePanel = () => {
    this.setState({ timePanelIsActive: !this.state.timePanelIsActive });
  };

  /**
   * Handles when there's a relative time change.
   * @param {string} relate
   */
  onRelativeTimeChange = (relate: string) => {
    this.toggleTimePanel();
    this.props.onRelativeTimeChange(relate);
  };

  /**
   * Handles when there's an absolute time change.
   * @param {string} after
   * @param {string} before
   */
  onAbsoluteTimeChange = (after?: string, before?: string) => {
    this.toggleTimePanel();
    this.props.onAbsoluteTimeChange(after, before);
  };

  render() {
    const fields = this.props.fields
      .filter(field => field.field_name)
      .map(field => <SearchField key={field.field_name} field={field} />);
    const distilleries = this.props.distilleries.map(distillery => (
      <SearchDistillery distillery={distillery}/>
    ));
    const query = this.props.queryObject
      ? (
        <SearchQuery
          query={this.props.queryObject}
          valid={this.props.isQueryValid}
        />
      ) : null;
    const timeFilterPanel = this.state.timePanelIsActive
      ? (
        <SearchTimeFilterPanel
          after={this.props.after}
          before={this.props.before}
          relative={this.props.relative}
          onRelativeTimeChange={this.onRelativeTimeChange}
          onAbsoluteTimeChange={this.onAbsoluteTimeChange}
        />
      ) : null;
    const loading = this.props.isLoading ? <Loading /> : null;

    return (
      <div className="flex-box flex-box--column">
        <div className="flex-box flex--shrink SearchView__Banner">
          <SearchBar
            initialValue={this.props.initialQuery}
            onSubmit={this.props.changeQuery}
          />
        </div>
        <div className="flex-box">
          <div className="flex-box flex--shrink sidebar sidebar--large">
            <div className="flex-item content">
              {query}
              <CollapsibleHeader
                title={`Collections ${distilleries.length}`}
                open={false}
              >
                {distilleries}
              </CollapsibleHeader>
              <CollapsibleHeader
                title={`Fields ${fields.length}`}
                open={false}
              >
                <SearchFields fields={this.props.fields}/>
              </CollapsibleHeader>
            </div>
          </div>
          <div className="flex-box flex-box--column">
            <SearchResultsHeader
              alertResultCount={this.props.alertResultCount}
              resultCount={this.props.resultCount}
              after={this.props.after}
              before={this.props.before}
              relative={this.props.relative}
              view={this.props.view}
              changeView={this.props.changeView}
              onTimeClick={this.toggleTimePanel}
            />
            {timeFilterPanel}
            <div
              className="flex-box"
              style={{ 'border-top': 'solid 1px #3b3c41', 'border-bottom': 'solid 1px #2a2b2e' }}
            >
              {this.props.children}
            </div>
            {loading}
          </div>
        </div>
      </div>
    );
  }
}
