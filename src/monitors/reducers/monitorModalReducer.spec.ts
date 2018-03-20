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

// Local
import { monitorModal, INITIAL_STATE } from './monitorModalReducer';
import * as actions from '../actions/monitorModalActions';

describe('MonitorStatus reducer', () => {
  describe('FETCH_MONITORS_PENDING', () => {
    it('should set loading to true', () => {
      const action = actions.fetchMonitorsPending(true);

      expect(INITIAL_STATE.loading).toBe(false);

      const state = monitorModal(INITIAL_STATE, action);

      expect(state.loading).toBe(true);
    });
  });
});
