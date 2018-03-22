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

// Pagination range of a set of results.
export interface PaginationRange {
  // Index of the starting element.
  start: number;

  // Index of the ending element.
  end: number;
}

/**
 * Gets the currently shown result number indexes in a paginated view.
 * @param currentPage Current page that the pagination is on.
 * @param pageSize Pagination size.
 * @param totalResults Total number of results.
 */
export function getResultPaginationRange(
  currentPage: number,
  pageSize: number,
  totalResults: number,
):
  PaginationRange {
  const noResults = totalResults === 0;
  const topIndex = currentPage * pageSize;
  const isEndPage = topIndex >= totalResults;
  const start = noResults ? 0 : (topIndex) - (pageSize) + 1;
  const end = noResults ? 0 : (isEndPage ? totalResults : topIndex);

  return { start, end };
}
