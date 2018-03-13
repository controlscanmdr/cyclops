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
import { MonitorStatus } from './MonitorStatus';

describe('<MonitorStatus />', () => {
  const monitorsUp: any[] = [];
  const monitorsDown: any[] = [];
  let component: (props?: any) => enzyme.ShallowWrapper<any, any>;
  let fetchMonitors: sinon.SinonSpy;
  let openModal: sinon.SinonSpy;

  beforeEach(() => {
    fetchMonitors = sinon.spy();
    openModal = sinon.spy();
    component = (props) => {
      const defaults = {
        fetchMonitors,
        openModal,
        monitorsUp,
        monitorsDown,
      };
      const passed = Object.assign({}, defaults, props);

      return enzyme.shallow(<MonitorStatus {...passed} />);
    };
  });

  it('should call fetchMonitors when created', () => {
    component();

    expect(fetchMonitors.called).toBe(true);
    expect(fetchMonitors.args[0][0]).toEqual(false);
    expect(fetchMonitors.args[0][1]).toEqual(MonitorStatus.POLLING_DELAY);
    expect(fetchMonitors.args[0][2]).toEqual(undefined);
  });

  it('should open the modal when the link is clicked', () => {
    const link = component().find('a');

    expect(link.length).toEqual(1);

    link.first().simulate('click');

    expect(openModal.called).toBe(true);
  });

  it('should fetch monitors when the link is clicked', () => {
    const pollTimeoutID = 4;
    const link = component({ pollTimeoutID }).find('a');

    expect(link.length).toEqual(1);

    link.first().simulate('click');

    expect(fetchMonitors.args[1][0]).toEqual(true);
    expect(fetchMonitors.args[1][1]).toEqual(MonitorStatus.POLLING_DELAY);
    expect(fetchMonitors.args[1][2]).toEqual(pollTimeoutID);
  });
});
