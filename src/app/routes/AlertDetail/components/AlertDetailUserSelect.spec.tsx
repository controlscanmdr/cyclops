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
import { User } from '~/services/users/types';
import * as config from '~/config';
import { AlertDetailUserSelect } from './AlertDetailUserSelect';

describe('<AlertDetailUserSelect />', () => {
  let wrapper: enzyme.ShallowWrapper<any, any>;
  let selectUser: sinon.SinonSpy;
  let user: User;

  beforeEach(() => {
    selectUser = sinon.spy();
    user = {
      id: 1,
      company: 1,
      email: 'bob.saget@gmail.com',
      first_name: 'Bob',
      last_name: 'Saget',
      is_staff: true,
    };
  });

  describe('render', () => {
    it('should not show a SubtleSelect if the current user is not staff', () => {
      const getConfig = sinon
        .stub(config, 'getConfig')
        .returns({ CURRENT_USER: { is_staff: false } });

      wrapper = enzyme.shallow((
        <AlertDetailUserSelect
          currentUser={user}
          users={[]}
          selectUser={selectUser}
        />
      ));

      expect(wrapper.find('SubtleSelect').length).toEqual(0);

      const span = wrapper.find('span');

      expect(span.length).toEqual(1);
      expect(span.text()).toEqual('Bob Saget');

      getConfig.restore();
    });
  });
});
