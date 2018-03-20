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
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { shallow, ShallowWrapper } from 'enzyme';

// Local
import { Close } from './Close';

describe('<Close />', () => {
  let wrapper: ShallowWrapper<any, any>;
  let close: sinon.SinonSpy;

  beforeEach(() => {
    close = sinon.spy();
    wrapper = shallow(<Close close={close} />);
  });

  it('should create an overlay trigger', () => {
    const overlayTriggers = wrapper.find(OverlayTrigger);

    expect(overlayTriggers).toHaveLength(1);

    const props = overlayTriggers.first().props();

    expect(props.overlay.type).toEqual(Popover);
    expect(props.placement).toEqual('bottom');
    expect(props.animation).toEqual(false);
  });

  it('should attach the close function to the button', () => {
    expect(wrapper.find('button').first().prop('onClick')).toEqual(close);
  });

  it('should run the close function on click', () => {
    wrapper.find('button').simulate('click');
    expect(close.called).toBe(true);
  });
});
