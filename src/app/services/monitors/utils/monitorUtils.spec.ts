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


// Local
import * as test from './monitorUtils';

describe('Monitor Utilities', () => {
  const monitor1: any = { name: 'monitor', status: 'GREEN' };
  const monitor2: any = { name: 'yay', status: 'RED' };
  const monitors: any[] = [monitor1, monitor2];
  const normalized: any = {
    result: [monitor1.name, monitor2.name],
    entities: {
      monitors: {
        [monitor1.name]: monitor1,
        [monitor2.name]: monitor2,
      },
    },
  };

  describe('normalizeMonitors()', () => {
    it('should normalize a list of monitors', () => {
      expect(test.normalizeMonitors(monitors)).toEqual(normalized);
    });
  });

  describe('denormalizeMonitors()', () => {
    it('should denormalize a list of monitors', () => {
      expect(test.denormalizeMonitors(normalized)).toEqual(monitors);
    });
  });

  describe('denormalizeMonitor()', () => {
    it('should return a monitor object matching the name', () => {
      const monitor = test.denormalizeMonitor(monitor1.name, normalized);
      expect(monitor).toEqual(monitor1);
    });
  });

  describe('sortMonitorsByStatus()', () => {
    it('should sort monitors by up and down', () => {
      const sorted = test.sortMonitorsByStatus(monitors);

      expect(sorted).toEqual({
        up: [monitor1.name],
        down: [monitor2.name],
      });
    });
  });
});
