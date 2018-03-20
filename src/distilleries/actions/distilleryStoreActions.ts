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

// Local
import { ReduxAction, ThunkActionPromise } from '../../common/types/Redux';
import { DistilleryNested } from '../types/Distillery';
import { fetchAllDistilleries } from '../services/distilleryAPI';
import { addError } from '../../errors/actions/errorModalActions';

const ACTION_PREFIX = 'DISTILLERY_STORE';

// -- FETCH_DISTILLERIES_SUCCESS --
// Request to get all distilleries was successful.

export const FETCH_DISTILLERIES_SUCCESS = `${ACTION_PREFIX}/FETCH_DISTILLERIES_SUCCESS`;
export type FetchDistilleriesSuccessAction = ReduxAction<DistilleryNested[]>;
export function fetchDistilleriesSuccess(
  distilleries: DistilleryNested[],
): FetchDistilleriesSuccessAction {
  return {
    type: FETCH_DISTILLERIES_SUCCESS,
    payload: distilleries,
  };
}

export function fetchDistilleries(): ThunkActionPromise {
  return (dispatch) => {
    return fetchAllDistilleries()
      .then((distilleries) => {
        dispatch(fetchDistilleriesSuccess(distilleries));
      })
      .catch((error) => {
        dispatch(addError(error));
      });
  };
}
