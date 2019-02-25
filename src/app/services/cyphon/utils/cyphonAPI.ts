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
import { AxiosRequestConfig } from 'axios';

// Local
import { APIList } from '../types';
import { cyphonAPI } from '../constants';

/**
 * Makes a request to the CyphonAPI using an APIConfig object, creates a
 * function that can cancel the request, sets that function onto the
 * requests index, and caches the return promise if the cache flag is
 * set to true in the APIConfig object.
 * @param config Request configuration.
 * @returns {Promise<T>}
 */
export function request<T>(config: AxiosRequestConfig): Promise<T> {
  return cyphonAPI.request(config).then<T>((response) => response.data);
}

/**
 * Make a GET request to the Cyphon API.
 * @param url Request url.
 * @param config Request configuration.
 * @returns {Promise<T>}
 */
export function get<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
  return request<T>({ ...config, url, method: 'get' });
}

/**
 * Recursively gets all the results from an get response that returns an
 * APIList response by paginating.
 * @param url Base url of the get request.
 * @param results Previous results to add new results onto.
 * @returns {Promise<T[]>} Combined results.
 */
export function getAll<T>(
  url: string,
  results: T[] = [],
): Promise<T[]> {
  const config: AxiosRequestConfig = {};

  if (results.length) { config.baseURL = ''; }

  return get<APIList<T>>(url, config).then((response) => {
    const combinedResults = [...results, ...response.results];

    if (!response.next) { return Promise.resolve(combinedResults); }

    return getAll(response.next, combinedResults);
  });
}

/**
 * Makes a POST request to the CyphonAPI.
 * @param url Request url.
 * @param data Data to send with the POST.
 * @param config Request configuration.
 * @returns {Promise<T>}
 */
export function post<T>(
  url: string,
  data?: any,
  config: AxiosRequestConfig = {},
): Promise<T> {
  return request<T>({ ...config, url, data, method: 'post' });
}

/**
 * Makes a PUT request to the CyphonAPI.
 * @param url Request url.
 * @param data Data to send with the PUT.
 * @param config Request configuration.
 * @returns {Promise<T>}
 */
export function put<T>(
  url: string,
  data?: any,
  config: AxiosRequestConfig = {},
): Promise<T> {
  return request<T>({ ...config, url, data, method: 'put' });
}

/**
 * Makes a PATCH request to the CyphonAPI.
 * @param url Request url.
 * @param data Data to send with the PATCH.
 * @param config Request configuration.
 * @returns {Promise<T>}
 */
export function patch<T>(
  url: string,
  data?: any,
  config: AxiosRequestConfig = {},
): Promise<T> {
  return request<T>({ ...config, url, data, method: 'patch' });
}
