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

import * as moment from 'moment';
import { Dictionary } from '../../common/types/object';
import { RelativeTimeOption } from '../types/Time';

export const RELATIVE_TIME_OPTIONS: Dictionary<() => RelativeTimeOption> = {
  'past-hour': () => ({
    after: moment().subtract(1, 'hours').format(),
    before: moment().format(),
  }),
  'today': () => ({
    after: moment().startOf('day').format(),
    before: moment().format(),
  }),
  'this-week': () => ({
    after: moment().startOf('week').format(),
    before: moment().endOf('week').format(),
  }),
  'last-week': () => ({
    after: moment().subtract(1, 'weeks').startOf('week').format(),
    before: moment().subtract(1, 'weeks').endOf('week').format(),
  }),
  'this-month': () => ({
    after: moment().startOf('month').format(),
    before: moment().endOf('month').format(),
  }),
  'last-month': () => ({
    after: moment().subtract(1, 'months').startOf('month').format(),
    before: moment().subtract(1, 'months').endOf('month').format(),
  }),
};
