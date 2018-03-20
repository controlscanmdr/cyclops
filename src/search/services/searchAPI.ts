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
import { get } from '../../cyphon/services/cyphonAPI';
import {
  AlertSearchResults,
  CombinedSearchResults,
  DistillerySearchResults,
  SearchEndpoint,
} from '../types/Search';

/**
 * Searches a given search endpoint and returns the results.
 * @param url URL of a search endpoint.
 * @param query SearchQueryStore query used to look for results.
 * @param page Page number of results to return.
 * @param pageSize Number of results to return per page.
 * @param after Time to search for results after.
 * @param before Time to search for results before.
 * @returns {Promise<SearchEndpoint<any>>}
 */
function getSearchResults(
  url: string,
  query: string,
  page?: number,
  pageSize?: number,
  after?: string,
  before?: string,
): Promise<SearchEndpoint<any>> {
  const params = {
    query,
    page,
    after,
    before,
    page_size: pageSize,
  };

  return get(url, { params });
}

/**
 * Searches alerts and distilleries from Cyphon to see if it has any records
 * matching the search query.
 * @param query SearchQueryStore query used to look for results.
 * @param page Page number of results to return.
 * @param pageSize Number of results to return per page.
 * @param after Time to search for results after.
 * @param before Time to search for results before.
 * @returns {Promise<SearchEndpoint<CombinedSearchResults>>}
 */
export function search(
  query: string,
  page?: number,
  pageSize?: number,
  after?: string,
  before?: string,
): Promise<SearchEndpoint<CombinedSearchResults>> {
  return getSearchResults('/search/', query, page, pageSize, after, before);
}

/**
 * Searches alerts from Cyphon to see if any of them match the search query.
 * @param query SearchQueryStore query used to look for results.
 * @param page Page number of results to return.
 * @param pageSize Number of results to return per page.
 * @param after Time to search for results after.
 * @param before Time to search for results before.
 * @returns {Promise<SearchEndpoint<AlertSearchResults>>}
 */
export function searchAlerts(
  query: string,
  page?: number,
  pageSize?: number,
  after?: string,
  before?: string,
): Promise<SearchEndpoint<AlertSearchResults>> {
  return getSearchResults(
    '/search/alerts/',
    query,
    page,
    pageSize,
    after,
    before,
  );
}

/**
 * Searches data from Cyphon to see if anything matches the search query.
 * @param id ID of the distillery to search.
 * @param query SearchQueryStore query used to look for results.
 * @param page Page number of results to return.
 * @param pageSize Number of results to return per page.
 * @param after Time to search for results after.
 * @param before Time to search for results before.
 * @returns {Promise<SearchEndpoint<any>>}
 */
export function searchDistillery(
  id: number,
  query: string,
  page?: number,
  pageSize?: number,
  after?: string,
  before?: string,
): Promise<SearchEndpoint<DistillerySearchResults>> {
  return getSearchResults(
    `/search/distilleries/${id}/`,
    query,
    page,
    pageSize,
    after,
    before,
  );
}
