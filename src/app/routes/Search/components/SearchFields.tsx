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
import * as _ from 'lodash';

import { Field } from '~/services/cyphon/types';
import { SearchField } from '~/routes/Search/components/SearchField';
import './SearchFields.scss';

interface Props {
  fields: Field[];
}

export class SearchFields extends React.Component<Props, {}> {
  public render() {
    const sorted = _.sortBy(this.props.fields, (field) => field.field_name);
    const fields = sorted.map((field) => <SearchField field={field}/>);

    return (
      <div className="SearchFields well">
        {fields}
      </div>
    );
  }
}
