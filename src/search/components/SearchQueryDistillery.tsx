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
import { Collapsible } from '../../common/components/Collapsible';
import { DistilleryFilterParameter } from '../types/Search';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Distilleries to display.
  distilleries: DistilleryFilterParameter | null;
}

// Component
// --------------------------------------------------------------------------

export class SearchQueryDistilleries extends React.Component<Props, {}> {
  render() {
    const distilleries = this.props.distilleries
      ? this.props.distilleries.distilleries.map(distillery => (
        <li>{distillery}</li>
      ))
      : <li>None</li>;
    const count = this.props.distilleries
      ? this.props.distilleries.distilleries.length
      : 0;

    return (
      <Collapsible
        descriptor={`Collections ${count}`}
        open={false}
      >
        <ul className="list--unstyled">{distilleries}</ul>
      </Collapsible>
    );
  }
}
