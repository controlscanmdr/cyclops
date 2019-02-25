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

import { JSONTableRow } from '~/services/json/components/JSONTableRow';
import { Dictionary } from '~/types/object';
import './JSONTable.scss';

interface Props {
  data: Dictionary<any>;
}

export class JSONTable extends React.Component<Props, {}> {
  public static createRows = (
    data: any,
    field: string = '',
  ): JSX.Element[] => {
    let rows: JSX.Element[] = [];

    if (_.isPlainObject(data)) {
      const keys = _.keys(data).sort();

      keys.forEach((key: string) => {
        const prefixed: string = field ? `${field}.${key}` : key;

        rows = [...rows, ...JSONTable.createRows(data[key], prefixed)];
      });

      return rows;
    }
    if (_.isArray(data)) {
      _.forEach(data, (item: any, index: number) => {
        rows = [...rows, ...JSONTable.createRows(item, `${field}[${index}]`)];
      });

      return rows;
    }

    return [<JSONTableRow key={field} data={data} field={field}/>];
  };

  public render() {
    return (
      <table className="JSONTable">
        <tbody>
          {JSONTable.createRows(this.props.data)}
        </tbody>
      </table>
    );
  }
}
