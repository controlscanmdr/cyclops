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

// Local
import { ContextFilter, ContextNested } from '../types/Context';
import { DistilleryFlat } from '../../distilleries/types/Distillery';
import * as utils from './contextNormalizr';

describe('api.contexts.utils', () => {
  const distillery: DistilleryFlat = {
    id: 1,
    name: 'distillery',
    container: 1,
    contexts: [],
    url: '',
  };
  const filter: ContextFilter = {
    id: 1,
    context: 1,
    search_field: 'field',
    operator: 'eq',
    operator_text: 'equals',
    value_field: 'field',
  };
  const context = {
    id: 1,
    name: 'Context',
    after_time_interval: 1,
    after_time_unit: 'm',
    before_time_interval: 1,
    before_time_unit: 'm',
    filter_logic: 'AND',
    filters: [filter],
    primary_distillery: distillery,
    related_distillery: distillery,
  };
  const contexts: ContextNested[] = [context];

  describe('normalizeContexts', () => {
    it('should create a normalized list of contexts', () => {
      expect(utils.normalizeContexts(contexts)).toEqual({
        result: [1],
        entities: {
          contexts: {
            1: Object.assign({}, context, {
              filters: [1],
              primary_distillery: 1,
              related_distillery: 1,
            }),
          },
          contextFilters: {
            1: filter,
          },
          distilleries: {
            1: distillery,
          },
        },
      });
    });
  });

  describe('denormalizeContexts', () => {
    it('should denormalize a list of normalizedContexts', () => {
      const normalized = utils.normalizeContexts(contexts);

      expect(utils.denormalizeContexts(normalized)).toEqual(contexts);
    });
  });

  describe('denormalizeContext', () => {
    it('should denormalize a single context from normalized contexts', () => {
      const normalized = utils.normalizeContexts(contexts);

      expect(utils.denormalizeContext(1, normalized)).toEqual(context);
    });
  });
});
