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
import * as React from 'react';
import * as sinon from 'sinon';

import * as enzyme from 'enzyme';

// Local
import { AlertParamsCategorySelect } from './AlertParamsCategorySelect';
import {
  Category,
  NormalizedCategoryList,
} from '~/services/alerts/types';

describe('<AlertParamsCategorySelect />', () => {
  const category1: Category = { id: 1, name: 'Category1' };
  const category2: Category = { id: 2, name: 'Category2' };
  const normalized: NormalizedCategoryList = {
    result: [category1.id, category2.id],
    entities: {
      categories: {
        [category1.id]: category1,
        [category2.id]: category2,
      },
    },
  };
  const defaultProps = {
    categories: normalized,
  };
  let selectCategory: sinon.SinonSpy;
  let render: (props?: any) => enzyme.ShallowWrapper<any, any>;

  beforeEach(() => {
    selectCategory = sinon.spy();
    render = (props) => {
      const properties = Object.assign({}, defaultProps, props);
      return enzyme.shallow(
        <AlertParamsCategorySelect
          {...properties}
          selectCategory={selectCategory}
        />);
    };
  });

  it('should display the options of a normalized category list', () => {
    const select = render().find('Select');

    expect(select).toHaveLength(1);
    expect(select.first().prop('options')).toEqual([
      AlertParamsCategorySelect.ALL_CATEGORIES_OPTION,
      { name: category1.name, value: category1.id },
      { name: category2.name, value: category2.id },
    ]);
  });

  it('should pass 0 as the selected category if there is none', () => {
    const select = render().find('Select');

    expect(select).toHaveLength(1);
    expect(select.first().prop('value')).toEqual(0);
  });

  it('should pass the currently selected category to the select element', () => {
    const selected = 1;
    const select = render({ currentCategory: selected }).find('Select');

    expect(select).toHaveLength(1);
    expect(select.first().prop('value')).toEqual(1);
  });

  describe('onSelectChange', () => {
    it('should parse an integer value from a string and pass that ' +
      'to selectCategory', () => {
      const component: any = render().instance();

      component.onSelectChange('4');

      expect(selectCategory.called).toBe(true);
      expect(selectCategory.args[0][0]).toEqual(4);
    });
  });
});
