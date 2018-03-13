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
import { AlertDetailOutcomeDisplay } from './AlertDetailOutcomeDisplay';
import * as config from '~/config';

describe('<AlertDetailOutcomeDisplay />', () => {
  const notes = 'notes';
  const outcome = 'completed';
  let component: (props?: any) => enzyme.ShallowWrapper<any, any>;
  let onEditClick: sinon.SinonSpy;
  let onRemoveClick: sinon.SinonSpy;
  let getConfig: sinon.SinonStub;

  beforeEach(() => {
    getConfig = sinon
      .stub(config, 'getConfig')
      .returns({ CURRENT_USER: { is_staff: true } });
    onRemoveClick = sinon.spy();
    onEditClick = sinon.spy();
    component = (props) => {
      const defaults = { notes, outcome, onRemoveClick, onEditClick };
      const passed = Object.assign({}, defaults, props);

      return enzyme.shallow(<AlertDetailOutcomeDisplay {...passed} />);
    };
  });

  afterEach(() => {
    getConfig.restore();
  });

  it(
    'should show the remove outcome button if there is an outcome and ' +
    'the user is staff',
    () => {
      expect(component().find('#alert-remove-outcome')).toHaveLength(1);
    });

  it(
    'should not show the remove outcome button if there is an outcome and ' +
    'the user is staff',
    () => {
      getConfig.returns({ CURRENT_USER: { is_staff: false } });
      expect(component().find('#alert-remove-outcome')).toHaveLength(0);
    });

  it('should show the edit outcome button if the user is staff', () => {
    expect(component().find('#alert-edit-outcome')).toHaveLength(1);
  });

  it('should not show the remove outcome button if the user is not staff', () => {
    getConfig.returns({ CURRENT_USER: { is_staff: false } });
    expect(component().find('#alert-edit-outcome')).toHaveLength(0);
  });

  it('should run showRemovePanel prop when clicking remove outcome button', () => {
    component().find('#alert-remove-outcome').simulate('click');

    expect(onRemoveClick.called).toBe(true);
  });

  it('should run editOutcome prop when clicking remove outcome button', () => {
    component().find('#alert-remove-outcome').simulate('click');

    expect(onRemoveClick.called).toBe(true);
  });

  it('should run editOutcome prop when clicking remove outcome button', () => {
    component().find('#alert-edit-outcome').simulate('click');

    expect(onEditClick.called).toBe(true);
  });
});
