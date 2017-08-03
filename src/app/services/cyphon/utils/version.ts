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

import { getConfig, getVersion } from '~/config';
import { Dictionary } from '~/types/object';

export type SemanticVersion = [number, number, number];

export type SemanticVersionRange = [SemanticVersion, SemanticVersion];

const VERSION_WILDCARD = '*';

/**
 * Cyclops versions matched to the Cyphon versions that they work with.
 * @type {Dictionary<string>}
 */
export const VERSION_MATCHING: Dictionary<string> = {
  '0.0.0:0.4.1': '0.0.0:1.3.0',
  '0.4.2:*': '1.4.0:*',
};

/**
 * Parses the version number from a string. If there is none, or if the
 * number is a wildcard, it returns Infinity.
 * @param {string} versionNumberString
 * @returns {number} Parsed integer or infinity.
 */
function parseVersionNumber(versionNumberString: string | undefined): number {
  if (!versionNumberString || versionNumberString === VERSION_WILDCARD) {
    return Infinity;
  }

  return parseInt(versionNumberString, 10);
}

/**
 * Parses a semantic version object from a string representing a semantic
 * version.
 * @param {string} semanticVersionString
 * @returns {SemanticVersion}
 */
export function parseVersion(
  semanticVersionString: string,
  ): SemanticVersion {
  const splitVersionNumbers = semanticVersionString.split('.');
  const major = parseVersionNumber(splitVersionNumbers[0]);
  const minor = parseVersionNumber(splitVersionNumbers[1]);
  const patch = parseVersionNumber(splitVersionNumbers[2]);

  return [major, minor, patch];
}

/**
 * Parses a string that represents a range of semantic versions into an
 * array of those two versions.
 * @param {string} semanticVersionRangeString
 * @returns {SemanticVersionRange}
 */
function parseVersionRange(
  semanticVersionRangeString: string,
): SemanticVersionRange {
  const parsedVersionRepresentation = semanticVersionRangeString
    .split(':');
  const oldest = parseVersion(parsedVersionRepresentation[0]);
  const newest = parseVersion(parsedVersionRepresentation[1]);

  return [oldest, newest];
}

/**
 * Determines if a semantic version matches a version between two
 * semantic version ranges.
 * @param {number[]} version
 * @param {[number[], number[]]} range
 * @returns {boolean}
 */
function versionMatchesRange(
  version: number[],
  range: [number[], number[]],
): boolean {
  if (!version.length) { return true; }

  if (version[0] === range[0][0] || version[0] === range[1][0]) {
    return versionMatchesRange(
      version.slice(1),
      [range[0].slice(1), range[1].slice(1)],
    );
  }

  return version[0] > range[0][0] && version[0] < range[1][0];
}

/**
 * Returns the Cyphon semantic version range that matches a Cyclops
 * semantic version.
 * @param {SemanticVersion} cyclopsSemanticVersion
 * @returns {SemanticVersionRange}
 */
export function getCyphonVersionRange(
  cyclopsSemanticVersion: SemanticVersion,
  ): SemanticVersionRange | undefined {
  const matchingVersion = Object
    .keys(VERSION_MATCHING)
    .find((cyclopsVersionRangeString) => {
      const cyclopsVersionRange = parseVersionRange(cyclopsVersionRangeString);

      return versionMatchesRange(cyclopsSemanticVersion, cyclopsVersionRange);
    });

  return matchingVersion
    ? parseVersionRange(VERSION_MATCHING[matchingVersion])
    : undefined;
}

/**
 * Determines if the current Cyclops version matches the current Cyphon
 * version.
 * @returns {boolean}
 * @throws {TypeError} If the Cyclops version is missing.
 * @throws {TypeError} If the Cyphon version is missing.
 * @throws {TypeError} If there is no matching Cyphon version range for
 *   the current Cyclops version.
 */
export function cyclopsVersionMatchesCyphonVersion(): boolean {
  const configuration = getConfig();
  const version = getVersion();

  if (!version) {
    throw TypeError('Missing Cyclops version from configuration.');
  }

  if (!configuration.CYPHON_VERSION) {
    throw TypeError('Missing Cyphon version from configuration object.');
  }

  const cyclopsVersion = parseVersion(version);
  const cyphonVersionRange = getCyphonVersionRange(cyclopsVersion);

  if (!cyphonVersionRange) {
    throw new TypeError(
      `Could not find matching Cyphon version for Cyclops ` +
      `version ${version}.`,
    );
  }

  const cyphonVersion = parseVersion(configuration.CYPHON_VERSION);

  return versionMatchesRange(cyphonVersion, cyphonVersionRange);
}

/**
 * Convert a semantic version object to a string representation.
 * @param {SemanticVersion} version
 * @returns {string}
 */
export function versionToString(version: SemanticVersion): string {
  if (version[0] === Infinity) { return VERSION_WILDCARD; }

  if (version[1] === Infinity) { return `${version[0]}.${VERSION_WILDCARD}`; }

  if (version[2] === Infinity) {
    return `${version[0]}.${version[1]}.${VERSION_WILDCARD}`;
  }

  return `${version[0]}.${version[1]}.${version[2]}`;
}
