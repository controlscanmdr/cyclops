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
import * as moment from 'moment';

// Local
import { AlertParamsDateCalendars } from './AlertParamsDateCalendars';

describe('<AlertParamsDateCalendars />', () => {
  const after = '2017-05-23T14:25:41Z';
  const before = '2017-05-24T15:47:45Z';
  const afterDate = new Date(after);
  const beforeDate = new Date(before);
  const afterMoment = moment(afterDate);
  const beforeMoment = moment(beforeDate);
  let component: (props?: any) => enzyme.ShallowWrapper<any, any>;
  let close: sinon.SinonSpy;
  let selectDate: sinon.SinonSpy;

  beforeEach(() => {
    close = sinon.spy();
    selectDate = sinon.spy();
    component = (props) => {
      const defaults = { close, selectDate };
      const passed = Object.assign({}, defaults, props);

      return enzyme.shallow(<AlertParamsDateCalendars {...passed} />);
    };
  });

  it('should set the after and before props as dates on the state', () => {
    const wrapper = component({ after, before });

    chai.expect(wrapper.state()).to.deep.equal({
      after: afterDate,
      before: beforeDate,
    });
  });

  it('should set after and before on the state as undefined if the props are', () => {
    const wrapper = component();

    chai.expect(wrapper.state()).to.deep.equal({
      after: undefined,
      before: undefined,
    });
  });

  it('should update the state variables with the dates', () => {
    const wrapper = component();

    chai.expect(wrapper.state()).to.deep.equal({
      after: undefined,
      before: undefined,
    });

    wrapper.setProps({ after, before });

    chai.expect(wrapper.state()).to.deep.equal({
      after: afterDate,
      before: beforeDate,
    });
  });

  it('should not update the state variables if they are the same', () => {
    const wrapper = component({ after, before });
    const state = wrapper.state();

    chai.expect(state).to.deep.equal({
      after: afterDate,
      before: beforeDate,
    });

    wrapper.setProps({ after, before });

    const newState = wrapper.state();

    chai.expect(newState.after).to.equal(state.after);
    chai.expect(newState.before).to.equal(state.before);
  });

  describe('handleAfterChange()', () => {
    let instance: any;
    let wrapper: enzyme.ShallowWrapper<any, any>;

    beforeEach(() => {
      wrapper = component();
      instance = wrapper.instance();
    });

    it('should ignore any string values', () => {
      instance.handleAfterChange('');

      chai.expect(selectDate.called).to.be.false;
    });

    it('should set the after variable to the moment date', () => {
      instance.handleAfterChange(afterMoment);

      chai.expect(wrapper.state()).to.deep.equal({
        after: afterMoment.toDate(),
        before: undefined,
      });
    });

    it('should call selectDate with the new values', () => {
      instance.handleAfterChange(afterMoment);

      chai.expect(selectDate.called).to.be.true;
      chai.expect(selectDate.args[0][0]).to.deep.equal({
        after: afterMoment.format(),
        before: undefined,
      });
    });

    it('should create a moment object from the before date when passing ' +
      'the value to selectDate', () => {
      const beforeFormat = moment(beforeDate).format();
      wrapper = component({ before });
      instance = wrapper.instance();

      instance.handleAfterChange(afterMoment);
      chai.expect(selectDate.called).to.be.true;
      chai.expect(selectDate.args[0][0]).to.deep.equal({
        after: afterMoment.format(),
        before: beforeFormat,
      });
    });
  });

  describe('handleBeforeChange()', () => {
    let instance: any;
    let wrapper: enzyme.ShallowWrapper<any, any>;

    beforeEach(() => {
      wrapper = component();
      instance = wrapper.instance();
    });

    it('should ignore any string values', () => {
      instance.handleBeforeChange('');

      chai.expect(selectDate.called).to.be.false;
    });

    it('should set the after variable to the moment date', () => {
      instance.handleBeforeChange(beforeMoment);

      chai.expect(wrapper.state()).to.deep.equal({
        after: undefined,
        before: beforeMoment.toDate(),
      });
    });

    it('should call selectDate with the new values', () => {
      instance.handleBeforeChange(beforeMoment);

      chai.expect(selectDate.called).to.be.true;
      chai.expect(selectDate.args[0][0]).to.deep.equal({
        after: undefined,
        before: beforeMoment.format(),
      });
    });

    it('should create a moment object from the after date when passing ' +
      'the value to selectDate', () => {
      const afterFormat = moment(afterDate).format();
      wrapper = component({ after });
      instance = wrapper.instance();

      instance.handleBeforeChange(beforeMoment);
      chai.expect(selectDate.called).to.be.true;
      chai.expect(selectDate.args[0][0]).to.deep.equal({
        after: afterFormat,
        before: beforeMoment.format(),
      });
    });
  });
});
