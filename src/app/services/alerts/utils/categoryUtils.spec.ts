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


// Local
import * as categories from './categoryUtils';

describe('categoryUtils', () => {
  const category1: any = { id: 1, name: 'category' };
  const category2: any = { id: 2, name: 'blah' };
  const list: any[] = [category1, category2];
  const normalized: any = {
    result: [category1.id, category2.id],
    entities: {
      categories: {
        [category1.id]: category1,
        [category2.id]: category2,
      },
    },
  };

  describe('normalizeCategories()', () => {
    it('should normalize a list of categories', () => {
      const result = categories.normalizeCategories(list);

      expect(result).toEqual(normalized);
    });
  });

  describe('denormalizeCategories()', () => {
    it('should denormalize a list of normalized categories', () => {
      const result = categories.denormalizeCategories(normalized);

      expect(result).toEqual(list);
    });
  });

  describe('denormalizeCategory()', () => {
    it('should return a single category object from a list of ' +
      'normalized categories', () => {
      const result = categories.denormalizeCategory(category1.id, normalized);

      expect(result).toEqual(category1);
    });

    it('should return undefined if the given category id is not found', () => {
      const result = categories.denormalizeCategory(4, normalized);

      expect(result).toBeUndefined();
    });
  });
});
