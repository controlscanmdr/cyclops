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

// Local
import { Field } from '~/services/cyphon/types';

/** Field of a bottle object. */
export interface BottleField extends Field {
  /** Identifier of the bottle field. */
  id: number;
  /** Bottle that is used as an embedded document for this field. */
  embedded_doc: number | null;
  /** URI of this bottle field. */
  url: string;
  /** Bottles that use this bottle field. */
  bottles: Bottle[] | number[];
}

/** Bottle object from the cyphon API. */
export interface Bottle {
  /** Identifier of the bottle. */
  id: number;
  /** Name of the bottle. */
  name: string;
  /** Field types on the bottle. */
  fields: BottleField[] | number[];
  /** URI of the bottle. */
  url: string;
}

/** Bottle object with related objects nested on the bottle. */
export interface BottleNested extends Bottle {
  /** Field objects related to the bottle. */
  fields: BottleField[];
}

/** Bottle object with related objects represented by their ID's */
export interface BottleFlat extends Bottle {
  /** ID's of fields related to the bottle. */
  fields: number[];
}
