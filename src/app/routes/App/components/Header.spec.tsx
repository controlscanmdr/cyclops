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
import { Header } from './Header';
import * as config from '~/config';

describe('<Header />', () => {
  let wrapper: enzyme.ShallowWrapper<any, any>;
  let getConfig: sinon.SinonStub;
  let header: any;

  beforeEach(() => {
    getConfig = sinon.stub(config, 'getConfig').returns({ ADMIN_URL: '' });
    header = (location: string = '') => <Header location={location} />;
  });

  afterEach(() => {
    getConfig.restore();
  });

  it('should not display an admin link if ADMIN_URL is not present', () => {
    wrapper = enzyme.shallow(header());

    const adminLink = wrapper.find('#admin-link');

    chai.expect(adminLink).to.have.length(0);
  });

  it('should display an admin link if ADMIN_URL is present in the config', () => {
    const adminUrl = 'url';

    getConfig.returns({ ADMIN_URL: adminUrl });
    wrapper = enzyme.shallow(header());

    const adminLink = wrapper.find('#admin-link');

    chai.expect(adminLink).to.have.length(1);
    chai.expect(adminLink.first().prop('href')).to.equal(adminUrl);
  });
});
