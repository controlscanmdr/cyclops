// Vendor
import * as React from 'react';
import * as sinon from 'sinon';
import * as enzyme from 'enzyme';
import * as _ from 'lodash';

// Local
import { AlertDataContextSearch } from './AlertDataContextSearch';

/**
 * Creates a specified number of fake result objects in an array.
 * @param amount Number of fake results to make.
 * @returns {any}
 */
const createResults = (amount: number): any[] => {
  const results: any = [];

  _.times(amount, (index) => {
    results.push({ _id: index + 1 });
  });

  return results;
};

describe('<AlertDataContextSearch />', () => {
  /** Default properties when shallow rendering. */
  const defaultProps = {
    page: null,
    pageSize: 25,
    selectedContext: null,
    loading: false,
    results: [],
    resultCount: 0,
    contexts: {},
  };
  let createWrapper: (options?: any) => enzyme.ShallowWrapper<any, any>;
  let selectContext: sinon.SinonSpy;
  let searchContext: sinon.SinonSpy;

  beforeEach(() => {
    selectContext = sinon.spy();
    searchContext = sinon.spy();
    createWrapper = (options) => {
      const props = Object.assign({}, defaultProps, options);
      return enzyme.shallow((
        <AlertDataContextSearch
          selectedContext={props.selectedContext}
          page={props.page}
          pageSize={props.pageSize}
          loading={props.loading}
          results={props.results}
          resultCount={props.resultCount}
          resultId={props.resultId}
          contexts={props.contexts}
          searchContext={searchContext}
          selectContext={selectContext}
        />
      ));
    };
  });

  it('should open the JSON objects to JSON_OPEN_LEVEL', () => {
    const result = {
      _id: 1,
    };
    const wrapper = createWrapper({
      results: [result],
      resultCount: 1,
      page: 1,
    });
    const formatter = wrapper.find('JSONFormatter');

    expect(formatter).toHaveLength(1);
    expect(formatter.props()).toEqual({
      json: result,
      open: AlertDataContextSearch.JSON_OPEN_LEVEL,
    });
  });

  it('should show a loading icon on the search button when loading', () => {
    const wrapper = createWrapper({
      loading: true,
    });
    const button = wrapper.find('Button');

    expect(button).toHaveLength(1);
    expect(button.find('.fa .fa-spinner .fa-spin')).toHaveLength(1);
  });

  it('should show the current pagination range', () => {
    let wrapper = createWrapper({
      results: createResults(30),
      resultCount: 30,
      page: 1,
    });
    let paginationContainer = wrapper
      .find('.result-context-search__header')
      .find('span');

    expect(paginationContainer).toHaveLength(1);
    expect(paginationContainer.text()).toEqual('Showing 1 - 25 of 30');

    wrapper = createWrapper({
      results: createResults(30),
      resultCount: 30,
      page: 2,
    });
    paginationContainer = wrapper
      .find('.result-context-search__header')
      .find('span');

    expect(paginationContainer).toHaveLength(1);
    expect(paginationContainer.text()).toEqual('Showing 26 - 30 of 30');
  });

  it('should not show the current pagination range if there are no results', () => {
    const wrapper = createWrapper();

    let paginationContainer = wrapper
      .find('.result-context-search__header')
      .find('span');

    expect(paginationContainer).toHaveLength(0);
  });
});
