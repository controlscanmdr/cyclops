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
import { ContextNested } from '../../contexts/types/Context';
import { SpacedList } from '../../common/components/SpacedList';
import { SpacedSection } from '../../common/components/SpacedSection';
import { SubTitle } from '../../common/components/SubTitle';
import { AlertDataContextFilters } from './AlertDataContextFilters';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Context to display detailed information on.
  context: ContextNested;
}

// Component
// --------------------------------------------------------------------------

// Information about a selected context related to a piece of alert data.
export class AlertDataContextDetail extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        <SpacedSection>
          <SubTitle>Sources</SubTitle>
          <SpacedList>
            <dt>Primary Source:</dt>
            <dd>{this.props.context.primary_distillery.name}</dd>

            <dt>Related Source:</dt>
            <dd>{this.props.context.related_distillery.name}</dd>
          </SpacedList>
        </SpacedSection>

        <SpacedSection>
          <SubTitle>Time Frame</SubTitle>
          <SpacedList>
            <dt>Before:</dt>
            <dd>
              {this.props.context.before_time_interval}
              {this.props.context.before_time_unit}
            </dd>

            <dt>After:</dt>
            <dd>
              {this.props.context.after_time_interval}
              {this.props.context.after_time_unit}
            </dd>
          </SpacedList>
        </SpacedSection>

        <SpacedSection>
          <SubTitle>Field Filters</SubTitle>

          <AlertDataContextFilters
            filters={this.props.context.filters}
            filterLogic={this.props.context.filter_logic}
          />
        </SpacedSection>
      </div>
    );
  }
}
