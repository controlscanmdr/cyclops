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
import { User } from '~/services/users/types';

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
    // it('should not show a SubtleSelect if the current user is not staff', () => {
    //   CONFIG.CURRENT_USER.is_staff = false;
    //
    //   wrapper = enzyme.shallow((
    //     <AlertDetailUserSelect
    //       currentUser={user}
    //       users={[]}
    //       selectUser={selectUser}
    //     />
    //   ));
    //
    //   chai.expect(wrapper.find('SubtleSelect').length).to.equal(0);
    //
    //   const span = wrapper.find('span');
    //
    //   chai.expect(span.length).to.equal(1);
    //   chai.expect(span.text()).to.equal('Bob Saget');
    //
    //   CONFIG.CURRENT_USER.is_staff = true;
    // });
  });
});
