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

import { User } from '~/services/users/types';

/**
 * Dispatch object from the Cyphon API.
 */
export interface Dispatch {
  /** Unique identifier of the dispatch object. */
  id: number;
  /** JSON data associated with the dispatch response. */
  data: any;
  /** Message of the dispatch response. */
  response_msg: string;
  /** HTTP status code of the response.' */
  status_code: string;
  /** Short description of the dispatch. */
  title: string;
  /** User who issued to the dispatch. */
  issued_by: User | number | null;
}

/**
 * Dispatch object with related entities placed onto the object.
 */
export interface DispatchNested extends Dispatch {
  /** User object who issued the dispatch. */
  issued_by: User | null;
}

/**
 * Dispatch object with related entities represented by their id's.
 */
export interface DispatchFlat extends Dispatch {
  /** ID of the user who issued the dispatch. */
  issued_by: number | null;
}
