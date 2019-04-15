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

import { ContainerNested } from '../types';
import { Result } from '~/types/result';

export interface FieldValue<T> {
  field: string;
  value: T;
}

/**
 * Gets the fields of a certain field type and returns them in an object.
 * @param type Field type to search for.
 * @param container Container object related to the result object.
 * @param result Result to pull fields from.
 * @returns {Map<string, T>} Returned fields that match the given type.
 */
export function getFieldsOfType<T>(
  type: string,
  container: ContainerNested,
  result: Result,
): Array<FieldValue<T>> {
  return container.fields
    .filter((field) => field.field_type === type)
    .map((field) => ({
      field: field.field_name,
      value: _.get<T>(result, field.field_name),
    }));
}
