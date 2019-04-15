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
import { AxiosResponse, AxiosRequestConfig } from 'axios';

/** Response data returned by an API call. */
export interface APIResponse<T> extends AxiosResponse {
  /** Body data of the response. */
  data: T;
}

/** Promise returned by any API calls. */
export type APIPromise<T> = Promise<APIResponse<T>>;

/** Data shape returned from an API list view */
export interface APIList<Results> {
  /** URI of the next page of results. */
  next: string | null;
  /** URI of the previous page of results */
  previous: string | null;
  /** Total number of results. */
  count: number;
  /** Returned list of results */
  results: Results[];
}

/** Request configuration for API calls. */
export interface APIConfig extends AxiosRequestConfig {
  /** If the response should be cached. */
  cache?: boolean;
}

/** Bottle and label field shared properties. */
export interface Field {
  /** Type of data present on the field. */
  field_type: string;
  /** Generic type of data on the field. */
  target_type: string;
  /** Name of the field on the raw data object. */
  field_name: string;
}
