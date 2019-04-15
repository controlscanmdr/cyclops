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
import { AlertDetailActions } from './AlertDetailActions';
import * as userUtils from '~/services/users/utils/currentUserIsStaff';

describe('<AlertDetailActions />', () => {
  const defaults: any = {
    alertId: 3,
    actions: [],
    dispatches: [],
  };
  let component: (props?: any) => enzyme.ShallowWrapper<any, any>;
  let currentUserIsStaff: sinon.SinonStub;

  beforeEach(() => {
    currentUserIsStaff = sinon
      .stub(userUtils, 'currentUserIsStaff')
      .returns(true);
    component = (props) => {
      const passed = Object.assign({}, defaults, props);

      return enzyme.shallow(<AlertDetailActions {...passed} />);
    };
  });

  afterEach(() => {
    currentUserIsStaff.restore();
  });

  it('should display a button if the user is staff', () => {
    chai.expect(component().find('button')).to.have.length(1);
  });

  it('should not display a button if the user is not staff', () => {
    currentUserIsStaff.returns(false);
    chai.expect(component().find('button')).to.have.length(0);
  });
});
