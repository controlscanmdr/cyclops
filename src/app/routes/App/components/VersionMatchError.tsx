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

// Local
import {
  cyclopsVersionMatchesCyphonVersion,
  getCyphonVersionRange,
  parseVersion,
  SemanticVersionRange,
  versionToString,
} from '~/services/cyphon/utils/version';
import { getConfig, getVersion } from '~/config';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the VersionMatchError component. */
interface Props {}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays an error message explaining that the current Cyclops version
 * doesn't match the Cyphon version.
 */
export class VersionMatchError extends React.Component<Props, {}> {
  public versionsMatch: boolean;
  public cyphonVersionRange?: SemanticVersionRange;
  public cyclopsVersion?: string;
  public cyphonVersion?: string;

  constructor(props: Props) {
    super(props);

    this.cyclopsVersion = getVersion();
    this.cyphonVersion = getConfig().CYPHON_VERSION;
    try {
      this.versionsMatch = cyclopsVersionMatchesCyphonVersion();
    } catch (TypeError) {
      this.versionsMatch = false;
    }
    this.cyphonVersionRange = getCyphonVersionRange(
      parseVersion(this.cyclopsVersion || ''),
    );
  }

  public render() {
    if (this.versionsMatch) { return null; }

    if (!this.cyclopsVersion) {
      return (
        <div className="text-center text--emphasis alert-bg--high content">
          Could not find Cyclops version number.
        </div>
      );
    }

    if (!this.cyphonVersion) {
      return (
        <div className="text-center text--emphasis alert-bg--high content">
          Could not find Cyphon version number.
        </div>
      );
    }

    if (!this.cyphonVersionRange) {
      return (
        <div className="text-center text--emphasis alert-bg--high content">
          Could not find matching Cyphon version range.
        </div>
      );
    }

    const oldestCyphonVersion = this.cyphonVersionRange[0];
    const newestCyphonVersion = this.cyphonVersionRange[1];
    const oldestVersionNumber = versionToString(oldestCyphonVersion);
    const newestVersionNumber = versionToString(newestCyphonVersion);

    return (
      <div className="text-center text--emphasis alert-bg--high content">
        You're running Cyclops version {this.cyclopsVersion} with Cyphon
        version {this.cyphonVersion}, which are not compatible. This version
        of Cyclops is compatible with Cyphon versions {oldestVersionNumber} to
        {' ' + newestVersionNumber}.
      </div>
    );
  }
}
