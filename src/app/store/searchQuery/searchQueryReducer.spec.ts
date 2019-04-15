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
import { searchQuery, SearchQueryState } from './searchQueryReducer';
import * as searchQueryActions from './searchQueryActions';
import { paginateResultsPending } from '~/store/searchResults';

describe('searchQueryReducer', () => {
  const initial: SearchQueryState = {
    query: '',
    isLoading: false,
    isValid: true,
    promiseID: Symbol(),
    view: searchQueryActions.SearchQueryView.Alerts,
  };

  describe('SEARCH_QUERY/FETCH_RESULTS_PENDING', () => {
    it('should update state correctly', () => {
      const query = 'meh';
      const promiseID = Symbol();
      const update = searchQuery(
        initial,
        searchQueryActions.fetchResultsPending(query, promiseID),
      );

      expect(update).to.deep.equal({
        ...initial,
        query,
        after: undefined,
        before: undefined,
        promiseID,
        isLoading: true,
      });
    });
  });

  describe('SEARCH_QUERY/FETCH_RESULTS_SUCCESS', () => {
    it('should update state correctly', () => {
      const results: any = { query: { hello: 'hello' } };
      const update = searchQuery(
        { ...initial, isLoading: true },
        searchQueryActions.fetchResultsSuccess(results),
      );

      expect(update).to.deep.equal({
        ...initial,
        queryObject: results.query,
        isLoading: false,
      });
    });
  });

  describe('SEARCH_QUERY/FETCH_RESULTS_FAILED', () => {
    it('should update state correctly', () => {
      const query: any = { hello: 'hello' };
      const update = searchQuery(
        initial,
        searchQueryActions.fetchResultsFailed(query),
      );

      expect(update).to.deep.equal({
        ...initial,
        isLoading: false,
        isValid: false,
        queryObject: query,
      });
    });
  });

  describe('SEARCH_QUERY/CHANGE_VIEW', () => {
    it('should update state correctly', () => {
      const view = searchQueryActions.SearchQueryView.Data;
      const update = searchQuery(
        initial,
        searchQueryActions.changeView(view),
      );

      expect(update).to.deep.equal({ ...initial, view });
    });
  });

  describe('SEARCH_RESULTS/PAGINATE_RESULTS_PENDING', () => {
    it('should update state correctly', () => {
      const promiseID = Symbol();
      const update = searchQuery(initial, paginateResultsPending(promiseID));

      expect(update).to.deep.equal({
        ...initial,
        promiseID,
        isLoading: true,
      });
    });
  });
});
