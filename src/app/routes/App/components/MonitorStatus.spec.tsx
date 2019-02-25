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

    chai.expect(fetchMonitors.called).to.be.true;
    chai.expect(fetchMonitors.args[0][0]).to.equal(false);
    chai.expect(fetchMonitors.args[0][1]).to.equal(MonitorStatus.POLLING_DELAY);
    chai.expect(fetchMonitors.args[0][2]).to.equal(undefined);
  });

  it('should open the modal when the link is clicked', () => {
    const link = component().find('a');

    chai.expect(link.length).to.equal(1);

    link.first().simulate('click');

    chai.expect(openModal.called).to.be.true;
  });

  it('should fetch monitors when the link is clicked', () => {
    const pollTimeoutID = 4;
    const link = component({ pollTimeoutID }).find('a');

    chai.expect(link.length).to.equal(1);

    link.first().simulate('click');

    chai.expect(fetchMonitors.args[1][0]).to.equal(true);
    chai.expect(fetchMonitors.args[1][1]).to.equal(MonitorStatus.POLLING_DELAY);
    chai.expect(fetchMonitors.args[1][2]).to.equal(pollTimeoutID);
  });
});
