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
import { Result } from '../../common/types/result';
import { DistilleryNested } from '../../distilleries/types/Distillery';
import { JSONFormatter } from '../../common/components/JSONFormatter';
import { Field } from '../../cyphon/types/Response';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Data associated with the alert.
  result: Result;

  // Distillery associated with the alert.
  distillery: DistilleryNested;
}

// Component
// --------------------------------------------------------------------------

// Alert result data with a brief explanation of the fields present in the results container.
export class AlertData extends React.Component<Props, {}> {
  render() {
    const containerFieldElements = this.props
      .distillery
      .container
      .fields
      .map((field: Field) => (
        <div key={field.field_name} className="result-field">
          <div>{field.field_name}</div>
          <div className="result-field__type">{field.field_type}</div>
        </div>
      ));

    return (
      <div className="flex-box">
        <div className="result-modal__sidebar flex-item flex--shrink">
          <h3>
            {this.props.distillery.name}
          </h3>

          {containerFieldElements}
        </div>
        <div className="result-modal__content flex-item">
          <JSONFormatter json={this.props.result} />
        </div>
      </div>
    );
  }
}
