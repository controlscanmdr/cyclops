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
import { Distillery } from '../types/Distillery';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Title of the option group.
  title: string;

  // Distillery options to display.
  options: Distillery[];
}

// Component
// --------------------------------------------------------------------------

// Creates an option group of a list of distilleries.
export class DistillerySelectGroup extends React.Component<Props, {}> {
  render() {
    const options = this.props.options.map(distillery => (
      <option value={distillery.id} key={distillery.id}>
        {distillery.name}
      </option>
    ));

    return (
      <optgroup label={this.props.title}>
        {options}
      </optgroup>
    );
  }
}
