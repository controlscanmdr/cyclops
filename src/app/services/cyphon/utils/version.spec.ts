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
import * as sinon from 'sinon';

// Local
import * as version from './version';
import * as config from '~/config';
import { versionToString } from '~/services/cyphon/utils/version';
import { getVersion } from '~/config';

describe('version', () => {
  describe('parseVersion()', () => {
    it('should correctly parse a semantic version object from a ' +
      'string that contains major, minor, and patch info', () => {
      const semantic = version.parseVersion('1.2.3');

      expect(semantic[0]).toEqual(1);
      expect(semantic[1]).toEqual(2);
      expect(semantic[2]).toEqual(3);
    });

    it('should use Infinity when no version number is given', () => {
      const semantic = version.parseVersion('1.2');

      expect(semantic[0]).toEqual(1);
      expect(semantic[1]).toEqual(2);
      expect(semantic[2]).toEqual(Infinity);
    });

    it('should use Infinity if a wildcard is used', () => {
      const semantic = version.parseVersion('*');

      expect(semantic[0]).toEqual(Infinity);
      expect(semantic[1]).toEqual(Infinity);
      expect(semantic[2]).toEqual(Infinity);
    });
  });
  describe('getCyphonVersionRange()', () => {
    it('should return the range that matches a specified start and ' +
      'end point', () => {
      const cyclopsVersion = version.parseVersion('0.1.0');
      const range = version.getCyphonVersionRange(cyclopsVersion);

      expect((range as version.SemanticVersionRange)[0][0]).toEqual(1);
      expect((range as version.SemanticVersionRange)[0][1]).toEqual(0);
      expect((range as version.SemanticVersionRange)[0][2]).toEqual(0);
      expect((range as version.SemanticVersionRange)[1][0]).toEqual(1);
      expect((range as version.SemanticVersionRange)[1][1]).toEqual(1);
      expect((range as version.SemanticVersionRange)[1][2]).toEqual(3);
    });

    it('should return the range that matches a specified start and ' +
      'infinite end point', () => {
      const cyclopsVersion = version.parseVersion('0.5');
      const range = version.getCyphonVersionRange(cyclopsVersion);

      expect((range as version.SemanticVersionRange)[0][0]).toEqual(1);
      expect((range as version.SemanticVersionRange)[0][1]).toEqual(4);
      expect((range as version.SemanticVersionRange)[0][2]).toEqual(0);
      expect((range as version.SemanticVersionRange)[1][0]).toEqual(Infinity);
      expect((range as version.SemanticVersionRange)[1][1]).toEqual(Infinity);
      expect((range as version.SemanticVersionRange)[1][2]).toEqual(Infinity);
    });
  });

  describe('cyclopsVersionMatchesCyphonVersion()', () => {
    let getConfig: sinon.SinonStub;
    let getVersion: sinon.SinonStub;

    beforeEach(() => {
      getConfig = sinon.stub(config, 'getConfig').returns({});
      getVersion = sinon.stub(config, 'getVersion').returns('');
    });

    afterEach(() => {
      getConfig.restore();
      getVersion.restore();
    });

    it('should throw a TypeError if the Cyclops version isn\'t set', () => {
      expect(() => { version.cyclopsVersionMatchesCyphonVersion(); }).toThrowError(
        'Missing Cyclops version from configuration.',
      );
    });

    it('should throw a TypeError if the Cyphon version isnt set', () => {
      getVersion.returns('0.3.2');

      expect(() => { version.cyclopsVersionMatchesCyphonVersion(); }).toThrowError(
        'Missing Cyphon version from configuration object',
      );
    });

    it('should throw a TypeError if the matching Cyphon version isnt ' +
      'present', () => {
      getVersion.returns('-1.0.0');
      getConfig.returns({ CYPHON_VERSION: '1.0.0' });

      expect(() => { version.cyclopsVersionMatchesCyphonVersion(); }).toThrowError(
        'Could not find matching Cyphon version for Cyclops' +
        ' version -1.0.0.',
      );
    });

    it('should return false if the two versions dont match', () => {
      getVersion.returns('0.1.0');
      getConfig.returns({ CYPHON_VERSION: '1.6' });

      expect(version.cyclopsVersionMatchesCyphonVersion()).toBe(false);
    });

    it('should return true of the two versions match', () => {
      getVersion.returns('0.1.0');
      getConfig.returns({ CYPHON_VERSION: '1.1.3'});

      expect(version.cyclopsVersionMatchesCyphonVersion()).toBe(true);

      getVersion.returns('0.4.1');
      getConfig.returns({ CYPHON_VERSION: '1.3.0'});

      expect(version.cyclopsVersionMatchesCyphonVersion()).toBe(true);
    });
  });

  describe('versionToString()', () => {
    it('should return a wildcard for a major version that equals Infinity', () => {
      const versionNumber = versionToString([Infinity, Infinity, Infinity]);

      expect(versionNumber).toEqual('*');
    });

    it('should return a wildcard for the minor version if it equals ' +
      'infinity', () => {
      const versionNumber = versionToString([2, Infinity, Infinity]);

      expect(versionNumber).toEqual('2.*');
    });

    it('should return a wildcard for the patch version if it equals ' +
      'infinity', () => {
      const versionNumber = versionToString([2, 5, Infinity]);

      expect(versionNumber).toEqual('2.5.*');
    });

    it('should return the full version number', () => {
      const versionNumber = versionToString([2, 5, 12]);

      expect(versionNumber).toEqual('2.5.12');
    });
  });
});
