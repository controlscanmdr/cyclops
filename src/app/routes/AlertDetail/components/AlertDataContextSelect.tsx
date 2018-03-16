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
import * as _ from 'lodash';

// Local
import {
  NormalizedContextList,
  ContextNested,
} from '../../../services/contexts/types';
import { denormalizeContexts } from '../../../services/contexts/utils/contextNormalizr';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Normalized list of context associated with the alert data.
  contexts: NormalizedContextList;

  // ID of the currently selected context.
  selectedContext: number | null;

  /**
   * Selects a context from a list of contexts.
   * @param contextId ID of the context to select.
   */
  selectContext(contextId: number): any;
}

// Component
// --------------------------------------------------------------------------

// Select dropdown that allows the user to select a new context to view information on.
export class AlertDataContextSelect extends React.Component<Props, {}> {
  /**
   * Handles the change event from the select element containing the list
   * of contexts.
   * @param event Event from the select element.
   */
  handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const contextId = _.toNumber(event.currentTarget.value);

    if (contextId > 0) this.props.selectContext(contextId);
  };

  render(): JSX.Element {
    const contextList: ContextNested[] = this.props.contexts
      ? denormalizeContexts(this.props.contexts)
      : [];
    const selectedContextId = this.props.selectedContext || 0;
    const options = contextList.map((context: ContextNested) => (
      <option value={context.id} key={context.id}>{context.name}</option>
    ));

    return (
      <select
        className="form-control result-context__select"
        onChange={this.handleChange}
        value={selectedContextId}
      >
        <option value={0} key={0}>Select Context</option>
        {options}
      </select>
    );
  }
}
