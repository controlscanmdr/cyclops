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
import {
  NormalizedList,
  NormalizedEntity,
} from '../../common/types/normalizr';
import { DistilleryFlat } from '../../distilleries/types/Distillery';

// Context filter object from the cyphon API.
export interface ContextFilter {
  // Identifier of the context filter object.
  id: number;

  // ID of the context the filter is related to.
  context: number;

  // Field of the related distillery this filter compares with.
  search_field: string;

  // Kind of comparison operator the context uses to search objects.
  operator: string;

  // Human readable representation of the operator.
  operator_text: string;

  // Filed of the primary distillery this filter compares with.
  value_field: string;
}

// Context object from the cyphon API that excludes any related object properties.
export interface Context {
  // Identifier of the context object.
  id: number;

  // Name of the context.
  name: string;

  // Amount of time after the current time the context searches for data.
  after_time_interval: number;

  // Time unit used on the after_time_interval.
  after_time_unit: string;

  // Time before the current time the context searches for related items.
  before_time_interval: number;

  // Time unit used on the before_time_interval.
  before_time_unit: string;

  // Logic it uses to tie the context filter search data together.
  filter_logic: string;

  // Context filter objects related to the context.
  filters: ContextFilter[] | number[];

  // Distillery object this context uses as it's base comparison.
  primary_distillery: DistilleryFlat | number;

  // Related distillery object this context searches in.
  related_distillery: DistilleryFlat | number;
}

// Nested context object.
export interface ContextNested extends Context {
  // Context filter objects related to the context.
  filters: ContextFilter[];

  // Distillery object this context uses as it's base comparison.
  primary_distillery: DistilleryFlat;

  // Related distillery object this context searches in.
  related_distillery: DistilleryFlat;
}

// Flat context object.
export interface ContextFlat extends Context {
  // ID's of related context filter objects.
  filters: number[];

  // ID of this contexts primary distillery.
  primary_distillery: number;

  // ID of this contexts related distillery.
  related_distillery: number;
}

// Normalized context object.
interface NormalizedContextEntity {
  contexts: NormalizedEntity<ContextFlat>;
  contextFilters: NormalizedEntity<ContextFilter>;
}

// Normalized context object list.
export type NormalizedContextList = NormalizedList<number, NormalizedContextEntity>;

// Search parameters used to search a context object.
export interface ContextSearchParams {
  // ID of the result to search against.
  id: string;

  // Page number of search results to retrieve.
  page: number;

  // Number of results per page.
  page_size: number;

  // Keyword to search for.
  keyword: string;
}
