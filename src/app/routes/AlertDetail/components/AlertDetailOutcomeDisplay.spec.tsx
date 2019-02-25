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
import { AlertDetailOutcomeDisplay } from './AlertDetailOutcomeDisplay';
import * as config from '~/config';

describe('<AlertDetailOutcomeDisplay />', () => {
  const notes = 'notes';
  const outcome = 'completed';
  let component: (props?: any) => enzyme.ShallowWrapper<any, any>;
  let editOutcome: sinon.SinonSpy;
  let showRemovePanel: sinon.SinonSpy;
  let getConfig: sinon.SinonStub;

  beforeEach(() => {
    getConfig = sinon
      .stub(config, 'getConfig')
      .returns({ CURRENT_USER: { is_staff: true } });
    showRemovePanel = sinon.spy();
    editOutcome = sinon.spy();
    component = (props) => {
      const defaults = { notes, outcome, showRemovePanel, editOutcome };
      const passed = Object.assign({}, defaults, props);

      return enzyme.shallow(<AlertDetailOutcomeDisplay {...passed} />);
    };
  });

  afterEach(() => {
    getConfig.restore();
  });

  it('should show the remove outcome button if there is an outcome and ' +
    'the user is staff', () => {
    chai.expect(component().find('#alert-remove-outcome')).to.have.length(1);
  });

  it('should not show the remove outcome button if there is an outcome and ' +
    'the user is staff', () => {
    getConfig.returns({ CURRENT_USER: { is_staff: false } });
    chai.expect(component().find('#alert-remove-outcome')).to.have.length(0);
  });

  it('should show the edit outcome button if the user is staff', () => {
    chai.expect(component().find('#alert-edit-outcome')).to.have.length(1);
  });

  it('should not show the remove outcome button if the user is not staff', () => {
    getConfig.returns({ CURRENT_USER: { is_staff: false } });
    chai.expect(component().find('#alert-edit-outcome')).to.have.length(0);
  });

  it('should run showRemovePanel prop when clicking remove outcome button', () => {
    component().find('#alert-remove-outcome').simulate('click');

    chai.expect(showRemovePanel.called).to.be.true;
  });

  it('should run editOutcome prop when clicking remove outcome button', () => {
    component().find('#alert-remove-outcome').simulate('click');

    chai.expect(showRemovePanel.called).to.be.true;
  });

  it('should run editOutcome prop when clicking remove outcome button', () => {
    component().find('#alert-edit-outcome').simulate('click');

    chai.expect(editOutcome.called).to.be.true;
  });
});
