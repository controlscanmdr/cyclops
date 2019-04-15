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
import * as _ from 'lodash';

// Local
import { Dictionary } from '~/types/object';

/**
 * Orders an objects keys in alphabetical order.
 * @param object
 * @return {object}
 */
export function orderKeys(object: Dictionary<any>): Dictionary<any> {
  const objectKeys = _.sortBy(_.keys(object));
  const ordered: any = {};

  _.forEach(objectKeys, (key) => {
    const orderedKey = ordered[key] = object[key];

    if (_.isPlainObject(orderedKey)) { ordered[key] = orderKeys(orderedKey); }
  });

  return ordered;
}
