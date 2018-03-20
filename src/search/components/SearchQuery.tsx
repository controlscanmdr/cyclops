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

// Local
import * as React from 'react';

// Vendor
import { SearchQuery as SearchQueryInterface } from '../types/Search';
import { SearchQueryParameter } from './SearchQueryParameter';
import { CollapsibleHeader } from '../../common/components/CollapsibleHeader';
import './SearchQuery.scss';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Current search query.
  query: SearchQueryInterface;

  // If the search query is valid.
  valid: boolean;
}

// Container
// --------------------------------------------------------------------------

// Displays information about a search query.
export class SearchQuery extends React.Component<Props, {}> {
  render() {
    const errors = this.props.query.errors.map(error => (
      <p className="alert-text--high">{error}</p>
    ));
    const unknownParameters = this.props.query.unknown.length
      ? this.props.query.unknown.map(parameter => (
        <SearchQueryParameter
          parameter={parameter.parameter}
          value={''}
          errors={parameter.errors}
        />
      )) : null;
    const keywordParameterCount = this.props.query.keywords.length;
    const fieldParamterCount = this.props.query.fields.length;
    const distilleryCount = this.props.query.distilleries
      ? this.props.query.distilleries.distilleries.length
      : 0;
    const keywords = keywordParameterCount
      ? this.props.query.keywords.map(keyword => (
        <SearchQueryParameter
          value={keyword.keyword}
          errors={keyword.errors}
          parameter={keyword.parameter}
        />
      )) : '-';
    const fields = this.props.query.fields.length
      ? this.props.query.fields.map(parameter => (
        <SearchQueryParameter
          value={`${parameter.field_name} ${parameter.operator} ${parameter.value}`}
          errors={parameter.errors}
          parameter={parameter.parameter}
        />
      )) : '-';
    const collections = this.props.query.distilleries
      ? this.props.query.distilleries.distilleries.map(name => (
        <SearchQueryParameter value={name} parameter={name} errors={[]}/>
      )) : '-';
    const keywordBlock = keywordParameterCount
      ? (
        <div className="SearchQuery_ParameterBlock">
          <div className="SearchQuery__Title">Keywords {keywordParameterCount}</div>
          <div className="SearchQuery__Content">{keywords}</div>
        </div>
      ) : null;
    const fieldBlock = fieldParamterCount
      ? (
        <div>
          <div className="SearchQuery__Title">Fields {fieldParamterCount}</div>
          <div className="SearchQuery__Content">{fields}</div>
        </div>
      ) : null;
    const collectionBlock = distilleryCount
      ? (
        <div>
          <div className="SearchQuery__Title">Collections {distilleryCount}</div>
          <div className="SearchQuery__Content">{collections}</div>
        </div>
      ) : null;
    const unknownBlock = unknownParameters
      ? (
        <div>
          <div className="SearchQuery__Title">Unknown {unknownParameters.length}</div>
          <div className="SearchQuery__Content">{unknownParameters}</div>
        </div>
      ) : null;

    return (
      <CollapsibleHeader title="Parameters">
        <div className="well">
          <div className="well__content">
            {errors}
            {keywordBlock}
            {fieldBlock}
            {collectionBlock}
            {unknownBlock}
          </div>
        </div>
      </CollapsibleHeader>
    );
  }
}
