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
import { SearchParameter } from '~/services/search/types';
import { Collapsible } from '~/components/Collapsible';
import { ErrorIcon } from '~/components/ErrorIcon';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the SearchQueryUnknown component. */
interface Props {
  parameters: SearchParameter[];
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 *
 */
export class SearchQueryUnknown extends React.Component<Props, {}> {
  public render() {
    const parameters = this.props.parameters.map((parameter) => (
      <li className="alert-text--high">{parameter.parameter}</li>
    ));

    return (
      <Collapsible descriptor={<span>Unknown <ErrorIcon/></span>} open={true}>
        <ul className="list--unstyled">
          {parameters}
        </ul>
      </Collapsible>
    );
  }
}
