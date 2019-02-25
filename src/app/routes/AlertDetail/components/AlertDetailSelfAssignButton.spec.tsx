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
import { AlertDetailSelfAssignButton } from './AlertDetailSelfAssignButton';
import * as userUtils from '~/services/users/utils/currentUserIsStaff';

describe('<AlertDetailSelfAssignButton />', () => {
  let component: (props?: any) => enzyme.ShallowWrapper<any, any>;
  let assign: sinon.SinonSpy;
  let currentUserIsStaff: sinon.SinonStub;

  beforeEach(() => {
    assign = sinon.spy();
    currentUserIsStaff = sinon
      .stub(userUtils, 'currentUserIsStaff')
      .returns(true);
    component = (props) => {
      const defaults = { assign };
      const passed = Object.assign({}, defaults, props);

      return enzyme.shallow(<AlertDetailSelfAssignButton {...passed} />);
    };
  });

  afterEach(() => {
    currentUserIsStaff.restore();
  });

  it('should display a button if the current user is staff and there ' +
    'is no currently assigned user', () => {
    chai.expect(component().find('button')).to.have.length(1);
  });

  it('should not display a button if the user is not staff', () => {
    currentUserIsStaff.returns(false);
    chai.expect(component().find('button')).to.have.length(0);
  });

  it('should run assign when the button is clicked', () => {
    component().find('button').simulate('click');
    chai.expect(assign.called).to.be.true;
  });
});
