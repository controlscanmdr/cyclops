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
import { JSONTableRow } from '~/services/json/components/JSONTableRow';
import { Dictionary } from '~/types/object';
import './JSONTable.scss';

// Types
// --------------------------------------------------------------------------

interface Props {
  // JSON data to display.
  data: Dictionary<any>;
}

// Component
// --------------------------------------------------------------------------

// Displays JSON data in a table format.
export class JSONTable extends React.Component<Props, {}> {
  /**
   * Creates a list of table rows for each key in an object.
   * @param data
   * @param {string} field
   * @returns {JSX.Element[]}
   */
  static createObjectRows(data: any, field: string = ''): JSX.Element[] {
    let rows: JSX.Element[] = [];
    const keys = _.keys(data).sort();

    keys.forEach((key: string) => {
      const prefixed: string = field ? `${field}.${key}` : key;

      rows = [...rows, ...JSONTable.createRows(data[key], prefixed)];
    });

    return rows;
  }

  /**
   * Creates an list of table rows for each item in an array.
   * @param data
   * @param {string} field
   * @returns {JSX.Element[]}
   */
  static createArrayRows(data: any[], field: string = ''): JSX.Element[] {
    let rows: JSX.Element[] = [];

    _.forEach(data, (item: any, index: number) => {
      rows = [...rows, ...JSONTable.createRows(item, `${field}[${index}]`)];
    });

    return rows;
  }

  /**
   * Creates the JSON table rows based on the passed in data type.
   * @param data
   * @param {string} field
   * @returns {JSX.Element[]}
   */
  static createRows(data: any, field: string = ''): JSX.Element[] {
    if (_.isPlainObject(data)) return JSONTable.createObjectRows(data, field);
    if (_.isArray(data)) return JSONTable.createArrayRows(data, field);

    return [<JSONTableRow key={field} data={data} field={field}/>];
  }

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
