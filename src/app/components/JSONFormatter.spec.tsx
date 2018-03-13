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
import { JSONFormatter } from './JSONFormatter';

describe('<JSONFormatter />', () => {
  let render: (props?: any) => enzyme.ReactWrapper<any, any>;

  beforeEach(() => {
    render = (props = {}) => {
      const defaults = {};
      const passed = { ...defaults, ...props };

      return enzyme.mount(<JSONFormatter {...passed} />);
    };
  });

  it('should render', () => {
    const component = render();

    expect(component.find('div')).toHaveLength(1);
  });
});
