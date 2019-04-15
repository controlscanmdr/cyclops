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
import * as React from 'react';
import { SinonSpy, spy } from 'sinon';
import { shallow, ShallowWrapper } from 'enzyme';

// Local
import { SearchBar } from './SearchBar';

describe('<SearchBar />', () => {
  let render: (props?: any) => ShallowWrapper<any, any>;
  let onSubmit: SinonSpy;

  beforeEach(() => {
    onSubmit = spy();
    render = (props) => {
      const defaults = { onSubmit };
      const passed = { ...defaults, ...props };

      return shallow(<SearchBar {...passed} />);
    };
  });

  it('should place the initial value on state', () => {
    const initialValue = 'test';
    const component = render({ initialValue });

    expect(component.state('query')).to.equal(initialValue);
  });

  it('should update the state when the input value changes', () => {
    const component = render();
    const input = component.find('input');

    input.simulate('change', { currentTarget: { value: 'test' } });

    expect(component.state('query')).to.equal('test');
  });

  it('should submit the query when the user presses enter', () => {
    const component = render();
    const input = component.find('input');

    component.setState({ query: 'test' });
    input.simulate('keypress', { key: 'Enter' });

    expect(onSubmit.called).to.be.true;
    expect(onSubmit.args[0][0]).to.equal('test');
  });

  it('should submit the query when the user presses the submit button', () => {
    const component = render();
    const button = component.find('button');

    component.setState({ query: 'test' });
    button.simulate('click');

    expect(onSubmit.called).to.be.true;
    expect(onSubmit.args[0][0]).to.equal('test');
  });
});
