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
import { AlertDetailUnassignButton } from './AlertDetailUnassignButton';
import * as userUtils from '~/services/users/utils/currentUserIsStaff';
import * as otherUtils from '~/services/users/utils/isCurrentUser';

describe('<AlertDetailUnassignButton />', () => {
  const user: any = { id: 1 };
  let component: (props?: any) => enzyme.ShallowWrapper<any, any>;
  let currentUserIsStaff: sinon.SinonStub;
  let isCurrentUser: sinon.SinonStub;

  beforeEach(() => {
    currentUserIsStaff = sinon
      .stub(userUtils, 'currentUserIsStaff')
      .returns(true);
    isCurrentUser = sinon.stub(otherUtils, 'isCurrentUser').returns(true);
    component = (props) => {
      const defaults = { user };
      const passed = Object.assign({}, defaults, props);

      return enzyme.shallow(<AlertDetailUnassignButton {...passed} />);
    };
  });

  afterEach(() => {
    currentUserIsStaff.restore();
    isCurrentUser.restore();
  });

  it('should not display a button if the user is not staff', () => {
    currentUserIsStaff.returns(false);
    chai.expect(component().find('button')).to.have.length(0);
  });

  it('should display a button if the user is staff', () => {
    chai.expect(component().find('button')).to.have.length(1);
  });
});
