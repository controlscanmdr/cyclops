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
import { normalize, denormalize } from 'normalizr';

// Local
import { CATEGORY_LIST_SCHEMA, CATEGORY_SCHEMA } from './categorySchema';
import { Category, NormalizedCategoryList } from '../types/Alert';

/**
 * Normalizes a list of category objects.
 * @param categories Category objects to normalize.
 * @returns {NormalizedCategoryList}
 */
export function normalizeCategories(categories: Category[]): NormalizedCategoryList {
  return normalize(categories, CATEGORY_LIST_SCHEMA);
}

/**
 * Denormalizes a list of category objects.
 * @param categories Normalized category objects to denormalize.
 * @returns {Category[]}
 */
export function denormalizeCategories(categories: NormalizedCategoryList): Category[] {
  return denormalize(
    categories.result,
    CATEGORY_LIST_SCHEMA,
    categories.entities,
  );
}

/**
 * Denormalizes a category object in a normalized list of categories.
 * @param category ID of the category to retrieve.
 * @param categories Normalized category objects to retrieve category from.
 * @returns {Category | undefined} Category matching the id or undefined.
 */
export function denormalizeCategory(
  category: number,
  categories: NormalizedCategoryList,
): Category | undefined {
  return denormalize(category, CATEGORY_SCHEMA, categories.entities);
}
