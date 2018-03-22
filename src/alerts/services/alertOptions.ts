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
import * as _ from 'lodash';

// Local
import { AlertOption } from '../types/Alert';
import { Dictionary } from '../../common/types/object';

/**
 * The display options of the level choices.
 * @type {Dictionary<AlertOption>}
 */
export const LEVEL_OPTIONS: Dictionary<AlertOption> = {
  CRITICAL: {
    value: 'CRITICAL',
    name: 'Critical',
    icon: 'fire',
    textColor: 'alert-text--critical',
    bgColor: 'alert-bg--critical',
    hexColor: '#C168A6',
  },
  HIGH: {
    value: 'HIGH',
    name: 'High',
    icon: 'exclamation-triangle',
    textColor: 'alert-text--high',
    bgColor: 'alert-bg--high',
    hexColor: '#D6705C',
  },
  MEDIUM: {
    value: 'MEDIUM',
    name: 'Medium',
    icon: 'exclamation-circle',
    textColor: 'alert-text--medium',
    bgColor: 'alert-bg--medium',
    hexColor: '#FFC578',
  },
  LOW: {
    value: 'LOW',
    name: 'Low',
    icon: 'exclamation',
    textColor: 'alert-text--low',
    bgColor: 'alert-bg--low',
    hexColor: '#6CA887',
  },
  INFO: {
    value: 'INFO',
    name: 'Info',
    icon: 'info',
    textColor: 'alert-text--info',
    bgColor: 'alert-bg--info',
    hexColor: '#80B8D6',
  },
};

/**
 * The LEVEL_OPTIONS in an array form with the key set as 'value' on the
 * alerts option.
 * @type {AlertOption[]}
 */
export const LEVEL_OPTIONS_LIST: AlertOption[] = _.values(LEVEL_OPTIONS);

/**
 * The display options of the status choices.
 * @type {Dictionary<AlertOption>}
 */
export const STATUS_OPTIONS: Dictionary<AlertOption> = {
  NEW: {
    icon: 'circle-o',
    name: 'New',
    value: 'NEW',
  },
  BUSY: {
    icon: 'circle',
    name: 'Busy',
    value: 'BUSY',
  },
  DONE: {
    icon: 'check-circle',
    name: 'Done',
    value: 'DONE',
  },
};

/**
 * The STATUS_OPTIONS in an array form with the key set as 'value' on the
 * alerts option.
 * @type {AlertOption[]}
 */
export const STATUS_OPTIONS_LIST: AlertOption[] = _.values(STATUS_OPTIONS);

export const IP_ADDRESS_LOOKUPS = {
  'IP Void': 'http://www.ipvoid.com/',
  'Senderbase': 'https://www.senderbase.org/',
  'urlQuery.net': 'http://urlquery.net/',
  'Snort Rule Docs': 'https://snort.org/rule_docs',
  'Trend Micro Reputation Service': 'https://ers.trendmicro.com/reputations',
};
