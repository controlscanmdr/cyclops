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

// Vendor
import * as React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

// Local
import { DistilleryNested } from '~/services/distilleries/types';
import { CollapsibleHeader } from '~/components/CollapsibleHeader';
import { ContainerNested } from '~/services/containers/types';
import { Field } from '~/services/cyphon/types';
import { SearchBar } from './SearchBar';
import { SearchField } from '~/routes/Search/components/SearchField';
import { SearchDistillery } from '~/routes/Search/components/SearchDistillery';
import { SearchQuery } from '~/routes/Search/components/SearchQuery';
import { SearchQuery as SearchQueryInterface } from '~/services/search/types';
import { Loading } from '~/components/Loading';
import { SearchQueryView } from '~/store/searchQuery';
import { SearchFields } from '~/routes/Search/components/SearchFields';
import './SearchView.scss';
import { SearchResultsHeader } from '~/routes/Search/components/SearchResultsHeader';
import { SearchTimeFilterPanel } from '~/routes/Search/components/SearchTimeFilterPanel';

interface Props {
  /** List of all the current containers in Cyphon. */
  containers: ContainerNested[];
  /** List of all the current fields in Cyphon. */
  fields: Field[];
  /** List of all the current distilleries in Cyphon. */
  distilleries: DistilleryNested[];
  /** Object representation of the current string query. */
  initialQuery: string;
  queryObject?: SearchQueryInterface;
  alertResultCount: number;
  resultCount: number;
  view: SearchQueryView;
  after?: string;
  before?: string;
  relative?: string;
  /** If more results are currently being loaded. */
  isLoading: boolean;
  /** If the current search query string is valid. */
  isQueryValid: boolean;
  changeView(view: SearchQueryView): any;
  changeQuery(query: string): any;
  onAbsoluteTimeChange(after?: string, before?: string): any;
  onRelativeTimeChange(relative: string): any;
}

interface State {
  timePanelIsActive: boolean;
}

/**
 * Root component of the Search page.
 */
export class SearchView extends React.Component<Props, State> {
  public state: State = {
    timePanelIsActive: false,
  };

  public toggleTimePanel = () => {
    this.setState({ timePanelIsActive: !this.state.timePanelIsActive });
  };

  public onRelativeTimeChange = (relate: string) => {
    this.toggleTimePanel();
    this.props.onRelativeTimeChange(relate);
  };

  public onAbsoluteTimeChange = (after?: string, before?: string) => {
    this.toggleTimePanel();
    this.props.onAbsoluteTimeChange(after, before);
  };

  public render() {
    const fields = this.props.fields
      .filter((field) => field.field_name)
      .map((field) => <SearchField field={field} />);
    const distilleries = this.props.distilleries.map((distillery) => (
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
              style={{ 'border-top': 'solid 1px #3b3c41', 'border-bottom': 'solid 1px #2a2b2e'}}
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
