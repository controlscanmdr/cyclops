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

// Local
import { AlertDetail } from '~/services/alerts/types';
import { DistilleryMinimal } from '~/services/distilleries/types';

export interface SearchParameter {
  parameter: string;
  index: number;
  type: string;
  errors: string[];
}

export interface KeywordParameter extends SearchParameter {
  keyword: string;
}

export interface FieldParameter extends SearchParameter {
  field_name: string;
  operator: string;
  value: string;
  errors: string[];
}

export interface DistilleryFilterParameter extends SearchParameter {
  filter: string;
  collection: string;
  warehouse: string;
  distilleries: string[];
}

export interface SearchQuery {
  errors: string[];
  keywords: KeywordParameter[];
  fields: FieldParameter[];
  distilleries: DistilleryFilterParameter | null;
  unknown: SearchParameter[];
}

export interface SearchResults {
  count: number;
  next: string | null;
  previous: string | null;
  results: any[];
}

export interface AlertSearchResults extends SearchResults {
  results: AlertDetail[];
}

export interface DistillerySearchResults extends SearchResults {
  distillery: DistilleryMinimal;
}

export interface DistilleryListSearchResults {
  count: number;
  results: DistillerySearchResults[];
}

export interface CombinedSearchResults {
  count: number;
  alerts: AlertSearchResults;
  distilleries: DistilleryListSearchResults;
}

export interface SearchEndpoint<T> {
  query: SearchQuery;
  results: T;
}
