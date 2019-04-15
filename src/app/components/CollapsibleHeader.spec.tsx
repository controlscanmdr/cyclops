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
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as enzyme from 'enzyme';

// Local
import { CollapsibleHeader } from './CollapsibleHeader';

describe('<CollapsibleHeader />', () => {
  const title = 'title';
  let component: (props?: any) => enzyme.ShallowWrapper<any, any>;
  let action: sinon.SinonSpy;

  beforeEach(() => {
    action = sinon.spy();
    component = (props) => {
      const defaults = { title };
      const passed = Object.assign({}, defaults, props);

      return enzyme.shallow(<CollapsibleHeader {...passed} />);
    };
  });

  it('should display the title in a header', () => {
    const text = component().find('button').first().text();

    expect(text).to.include(title);
  });

  it('should toggle the state between open and closed with the header ' +
    'is clicked', () => {
    const wrapper = component();
    const button = wrapper.find('button').first();

    expect(wrapper.state('open')).to.be.true;

    button.simulate('click');

    expect(wrapper.state('open')).to.be.false;

    button.simulate('click');

    expect(wrapper.state('open')).to.be.true;
  });

  it('should display an action button if one is given', () => {
    const name = 'Action';
    const wrapper = component({ action, actionName: name });
    const button = wrapper.find('.collapsible__action');

    expect(button.length).to.equal(1);

    expect(button.text()).to.equal(name);

    button.simulate('click');

    expect(action.called).to.be.true;
  });
});
