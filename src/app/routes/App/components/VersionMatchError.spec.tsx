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
import * as chai from 'chai';
import * as enzyme from 'enzyme';

// Local
import { VersionMatchError } from './VersionMatchError';
import * as config from '~/config';

describe('<VersionMatchError />', () => {
  let getConfig: sinon.SinonStub;
  let getVersion: sinon.SinonStub;
  let component: (props?: any) => enzyme.ShallowWrapper<any, any>;

  beforeEach(() => {
    getConfig = sinon.stub(config, 'getConfig').returns({});
    getVersion = sinon.stub(config, 'getVersion').returns('');

    component = (props) => {
      const defaults = {};
      const passed = Object.assign({}, defaults, props);

      return enzyme.shallow(<VersionMatchError {...passed} />);
    };
  });

  afterEach(() => {
    getConfig.restore();
    getVersion.restore();
  });

  it('should display an error message if the Cyclops version is not ' +
    'found', () => {
    const element = component().find('div').first();

    expect(element.text()).to.equal('Could not find Cyclops version number.');
  });

  it('should display an error message if the Cyphon version is not ' +
    'found', () => {
    getVersion.returns('0.3');

    const element = component().find('div').first();

    expect(element.text()).to.equal('Could not find Cyphon version number.');
  });

  it('should display an error message if the Cyphon version range is not ' +
    'found', () => {
    getVersion.returns('-1.0.0');
    getConfig.returns({ CYPHON_VERSION: '1.2.0' });

    const element = component().find('div').first();

    expect(element.text()).to.equal(
      'Could not find matching Cyphon version range.',
    );
  });

  it('should display an error message explaining that the versions ' +
    'are not compatible', () => {
    getVersion.returns('0.5.0');
    getConfig.returns({ CYPHON_VERSION: '1.2.0' });
    const element = component().find('div').first();

    expect(element.text()).to.equal(
      'You\'re running Cyclops version 0.5.0 with Cyphon version 1.2.0, ' +
      'which are not compatible. This version of Cyclops is compatible with' +
      ' Cyphon versions 1.4.0 to *.',
    );
  });
});
