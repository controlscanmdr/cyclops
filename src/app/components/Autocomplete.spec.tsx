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
import { shallow, ShallowWrapper } from 'enzyme';

// Local
import { Autocomplete, Props, State } from './Autocomplete';

describe('Autocomplete', () => {
  const items = [{ id: 1, name: 'George' }, { id: 2, name: 'Susan' }];
  const value = '';
  const getValue = (item: any) => item.name;
  const defaults: Props = { items, value, getValue };
  const render = (props: Partial<Props> = {}) => shallow(<Autocomplete {...defaults} {...props} />);

  // beforeAll(() => {
  //   getValue.mockImplementation(item => item.value);
  // });
  //
  // afterEach(() => {
  //   getValue.mockReset();
  // });

  describe('renderMenu()', () => {
    it('should render a menu with passed in props', () => {
      const items = [{ id: 1 }];
      const value = 'hello';
      const style = { color: '#fff' };
      const component = render();
      const instance = component.instance() as Autocomplete;
      const menu = shallow(instance.renderMenu(items, value, style));

      expect(menu).toHaveLength(1);
      expect(menu.props()).toEqual({
        style,
        children: items,
        className: 'Autocomplete__Menu',
      });
    });
  });

  it('should set an initial state from passed in props', () => {
    const component = render();
    const expected: State = { selected: value, value: '', filtered: items };

    expect(component.state()).toEqual(expected);
  });

  it('should set the state value to the selected value when the menu closes', () => {
    const component = render();
    const instance = component.instance() as Autocomplete;

    expect(component.state().value).toEqual('');
    instance.onMenuVisibilityChange(false);
    expect(component.state().value).toEqual(value);
  });

  it('should reset state when properties change', () => {
    const component = render();
    const initial: State = { selected: value, value: '', filtered: items };
    const nextItems = [{ id: 4, name: 'Tractor' }, { id: 5, name: 'Pat' }];
    const nextValue = 'Pat';
    const nextState: State = { selected: nextValue, value: nextValue, filtered: nextItems };

    expect(component.state()).toEqual(initial);
    component.setProps({ getValue, items: nextItems, value: nextValue });
    expect(component.state()).toEqual(nextState);
  });
});
