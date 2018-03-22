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
import axios, { AxiosInstance } from 'axios';
import * as Cookies from 'js-cookie';

// Local
import { getConfig } from '../../app/services/config';
import { paramsSerializer } from './URLParams';

// Axios instance that connects to Cyphon API.
export const cyphonAPI: AxiosInstance = axios.create({
  paramsSerializer,
  baseURL: getConfig().API_URL,
  timeout: getConfig().API_TIMEOUT,
  headers: { 'X-CSRFToken': Cookies.get('csrftoken') },
});
