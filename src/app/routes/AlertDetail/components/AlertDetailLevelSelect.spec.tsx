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
import { AlertDetailLevelSelect } from './AlertDetailLevelSelect';
import * as config from '~/config';

describe('<AlertDetailLevelSelect />', () => {
  const currentLevel = 'HIGH';
  let component: (props?: any) => enzyme.ShallowWrapper<any, any>;
  let selectLevel: sinon.SinonSpy;
  let getConfig: sinon.SinonStub;

  beforeEach(() => {
    selectLevel = sinon.spy();
    getConfig = sinon.stub(config, 'getConfig');
    component = (props) => {
      const defaults = { currentLevel, selectLevel };
      const passed = Object.assign({}, defaults, props);

      return enzyme.shallow(<AlertDetailLevelSelect {...passed} />);
    };
  });

  afterEach(() => {
    getConfig.restore();
  });

  it('should show a SubtleSelect if the current user is staff', () => {
    getConfig.returns({ CURRENT_USER: { is_staff: true } });
    chai.expect(component().find('SubtleSelect')).to.have.length(1);
  });

  it('should not show a SubtleSelect if the current user is not staff', () => {
    getConfig.returns({ CURRENT_USER: { is_staff: false } });
    chai.expect(component().find('SubtleSelect')).to.have.length(0);
  });
});
