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
import * as chai from 'chai';

// Local
import { updateNormalizedList } from './normalizrUtils';

describe('updateNormalizedData()', () => {
  const user1 = { id: 1, name: 'George' };
  const user2 = { id: 2, name: 'Bob' };
  const user3 = { id: 3, name: 'Stacy' };
  const userUpdate1 = { id: 1, name: 'Coffee' };
  const userUpdate2 = { id: 2, name: 'Eagle' };
  const normalized1 = {
    result: [1, 2],
    entities: {
      users: {
        1: user1,
        2: user2,
      },
    },
  };
  const normalized2 = {
    result: [1, 2, 3],
    entities: {
      users: {
        1: userUpdate1,
        2: userUpdate2,
        3: user3,
      },
    },
  };
  const correctUpdate = {
    result: [1, 2, 3],
    entities: {
      users: {
        1: userUpdate1,
        2: userUpdate2,
        3: user3,
      },
    },
  };

  it('should update a normalized list with another normalized list', () => {
    const update = updateNormalizedList(normalized1, normalized2);

    chai.expect(update).to.deep.equal(correctUpdate);
  });
});
