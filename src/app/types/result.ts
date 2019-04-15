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

/**
 * Information related to where the result data is stored on the
 * backend.
 */
export interface ResultRawData {
  /** Backend the result is stored in. */
  backend: string;
  /** Collection the result is stored in. */
  collection: string;
  /** Database the result is stored in. */
  database: string;
  /** Unique identifier of the result. */
  doc_id: string;
}

/**
 * Data associated with an alert.
 */
export interface Result {
  /** ID of the distillery that stored the result. */
  _distillery: number;
  /** Unique identifier of the result. */
  _id: string;
  /** Date the result was stored. */
  _saved_date: string;
  /** Location information of the raw data that created the result. */
  _raw_data: ResultRawData;
}

/**
 * IP address object generated from a result.
 */
export interface ResultIPAdresses {
  [field: string]: string;
}
