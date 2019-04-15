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

// Local
import { ContextFilter } from '../../../services/contexts/types';
import { SpacedList } from '../../../components/SpacedList';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertDataContextFilters component. */
interface Props {
  /** List of context filters related to the alert data. */
  filters: ContextFilter[];
  /** Logic used when search the context the filters are related to. */
  filterLogic: string;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Display a list of context filters related to the alert data.
 */
export class AlertDataContextFilters extends React.Component<Props, {}> {
  public render() {
    const filterDetails = this.props.filters.map((filter: ContextFilter) => (
      <SpacedList key={filter.id} className="border-light-bottom">
        <dt>Related Field:</dt>
        <dd>{filter.search_field}</dd>

        <dt>Operator:</dt>
        <dd>{filter.operator_text}</dd>

        <dt>Primary Field:</dt>
        <dd>{filter.value_field}</dd>
      </SpacedList>
    ));

    return (
      <div>
        {filterDetails}
        <SpacedList>
          <dt>Filter Logic:</dt>
          <dd>{this.props.filterLogic}</dd>
        </SpacedList>
      </div>
    );
  }
}
