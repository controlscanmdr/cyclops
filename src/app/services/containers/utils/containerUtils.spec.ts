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
import * as sinon from 'sinon';


// Local
import * as utils from './containerUtils';
import { Field } from '~/services/cyphon/types';
import { CONTAINER_FIELDS } from '~/services/containers/constants';

describe('containerUtils', () => {
  describe('getFieldsOfType()', () => {
    it('should return the field/value pairs of a certain type', () => {
      const container: any = {
        fields: [{
          field_name: 'coordinates',
          field_type: CONTAINER_FIELDS.POINT_FIELD,
        }] as Field[],
      };
      const result: any = {
        coordinates: [4, 5],
        key: 'value',
      };
      const fields = utils.getFieldsOfType(
        CONTAINER_FIELDS.POINT_FIELD,
        container,
        result,
      );

      expect(fields.length).toEqual(1);
      expect(fields[0]).toEqual({
        field: 'coordinates',
        value: [4, 5],
      });
    });
  });
});
