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
import { HiddenTextArea } from './HiddenTextArea';
import { TextArea } from './TextArea';

describe('<HiddenTextArea />', () => {
  let wrapper: enzyme.ShallowWrapper<any, any>;
  let onSubmit: sinon.SinonSpy;

  beforeEach(() => {
    onSubmit = sinon.spy();
  });

  it('should display a button once rendered', () => {
    wrapper = enzyme.shallow(<HiddenTextArea onSubmit={onSubmit}/>);
    expect(wrapper.find('button')).toHaveLength(1);
    expect(wrapper.state().active).toBe(false);
  });

  it('should display a TextArea once the button is clicked', () => {
    wrapper = enzyme.shallow(<HiddenTextArea onSubmit={onSubmit}/>);
    wrapper.find('button').simulate('click');
    expect(wrapper.find(TextArea)).toHaveLength(1);
    expect(wrapper.state().active).toBe(true);
  });

  it('should display the passed in button text prop', () => {
    const text = 'click';

    wrapper = enzyme.shallow((
      <HiddenTextArea onSubmit={onSubmit} buttonText={text} />
    ));
    expect(wrapper.find('button').prop('children')).toEqual(text);
  });

  it('should prepopulate the text area with the passed in text', () => {
    const text = 'click';

    wrapper = enzyme.shallow(<HiddenTextArea text={text} onSubmit={onSubmit}/>);
    wrapper.find('button').simulate('click');
    expect(wrapper.find(TextArea).first().prop('text')).toEqual(text);
  });
});
