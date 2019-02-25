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

/** Action that can be performed on an external API. */
export interface Action {
  /** Identifier of the action object. */
  id: number;
  /** Class that performs the action. */
  api_class: string;
  /** Module the class lives in. */
  api_module: string;
  /** Name of the action. */
  name: string;
  /** @TODO: Write platform description. */
  platform: string;
  /** URI of the action. */
  url: string;
  /** @TODO: Write visa_required description. */
  visa_required: boolean;
}
