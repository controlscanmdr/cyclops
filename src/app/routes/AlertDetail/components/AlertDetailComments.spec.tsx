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
import { AlertDetailComments } from './AlertDetailComments';
import * as utils from '~/services/users/utils/currentUserIsStaff';

describe('<AlertDetailComments />', () => {
  const alertId = 3;
  const comments: any[] = [
    { id: 2 },
    { id: 4 },
  ];
  let component: (props?: any) => enzyme.ShallowWrapper<any, any>;
  let onSubmit: sinon.SinonSpy;
  let currentUserIsStaff: sinon.SinonStub;

  beforeEach(() => {
    onSubmit = sinon.spy();
    currentUserIsStaff = sinon.stub(utils, 'currentUserIsStaff');
    component = (props) => {
      const defaults = { comments, onSubmit };
      const passed = Object.assign({}, defaults, props);

      return enzyme.shallow(<AlertDetailComments {...passed} />);
    };
  });

  afterEach(() => {
    currentUserIsStaff.restore();
  });

  it('should create a comment for each comment passed in', () => {
    const wrapper = component();
    const commentElements = wrapper.find('AlertDetailComment');

    expect(commentElements).toHaveLength(2);

    commentElements.forEach((comment, index) => {
      expect(comment.prop('comment')).toEqual(comments[index]);
    });
  });

  it('should show the amount of comments', () => {
    const wrapper = component();
    const badge = wrapper.find('.badge');

    expect(badge.text()).toEqual(String(comments.length));
  });

  it('should show a button to add a comment if the user is staff', () => {
    currentUserIsStaff.returns(true);

    const wrapper = component();

    expect(wrapper.find('HiddenTextArea')).toHaveLength(1);
  });

  it('should show not show a button to add a comment if the user is not staff', () => {
    currentUserIsStaff.returns(false);

    const wrapper = component();

    expect(wrapper.find('HiddenTextArea')).toHaveLength(0);
  });

  it('should call addComment with the passed in alertId', () => {
    const instance: any = component().instance();
    const value = 'comment';

    instance.handleSubmit(value);

    expect(onSubmit.called).toBe(true);
    expect(onSubmit.args[0]).toEqual([value]);
  });
});
