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
import { stub, SinonStub } from 'sinon';
import { shallow, ShallowWrapper } from 'enzyme';

// Local
import { AlertDetailUnassignButton } from './AlertDetailUnassignButton';
import * as userUtils from '../../users/services/currentUserIsStaff';
import * as otherUtils from '../../users/services/isCurrentUser';

describe('<AlertDetailUnassignButton />', () => {
  const user: any = { id: 1 };
  let component: (props?: any) => ShallowWrapper<any, any>;
  let currentUserIsStaff: SinonStub;
  let isCurrentUser: SinonStub;

  beforeEach(() => {
    currentUserIsStaff = stub(userUtils, 'currentUserIsStaff').returns(true);
    isCurrentUser = stub(otherUtils, 'isCurrentUser').returns(true);
    component = (props) => {
      const defaults = { user };
      const passed = Object.assign({}, defaults, props);

      return shallow(<AlertDetailUnassignButton {...passed} />);
    };
  });

  afterEach(() => {
    currentUserIsStaff.restore();
    isCurrentUser.restore();
  });

  it('should not display a button if the user is not staff', () => {
    currentUserIsStaff.returns(false);
    expect(component().find('button')).toHaveLength(0);
  });

  it('should display a button if the user is staff', () => {
    expect(component().find('button')).toHaveLength(1);
  });
});
