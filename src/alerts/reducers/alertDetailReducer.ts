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
import { LocationFieldAddress, Markers } from '../../map/types/Map';
import { AlertDetail } from '../types/Alert';
import * as actions from '../actions/alertDetailActions';
import { ResultIPAdresses } from '../../common/types/result';
import * as requests from '../../cyphon/services/requests';
import * as alertDetailTagActions from '../actions/alertDetailTagActions';

// State shape of the alert detail reducer.
export interface AlertDetailState {
  // ID of the currently selected alerts.
  alertId: number | null;

  // Locations from the alerts data with their addresses.
  locations: LocationFieldAddress[] | null;

  // GeoJSON markers of the currently selected alerts.
  markers: Markers | null;

  // Currently selected alert.
  alert: AlertDetail | null;

  // If a loading icon should be shown.
  loading: boolean;

  // IP address fields related to the alert.
  ipAddresses: ResultIPAdresses | null;

  // If the data modal is active.
  modalActive: boolean;

  // Error message that doesn't require the error popup.
  error: string[];
}

// Initial state of the reducer.
export const INITIAL_STATE: AlertDetailState = {
  alert: null,
  alertId: null,
  ipAddresses: null,
  loading: false,
  locations: [],
  markers: null,
  modalActive: false,
  error: [],
};

// Unique identifier of the canceler function on the requests store.
export const REQUEST_ID = 'ALERT_DETAIL';

type Actions =
  actions.CloseAlertAction |
  actions.FetchAlertAction |
  actions.FetchAlertSuccessAction |
  actions.RequestPendingAction |
  actions.RequestFailedAction |
  actions.UpdateAlertAction |
  actions.UpdateAlertSuccessAction |
  actions.UpdateAlertFailedAction |
  actions.OpenDataModalAction |
  actions.CloseDataModalAction |
  actions.AddErrorMessageAction |
  actions.CloseErrorMessageAction |
  alertDetailTagActions.AddTagAction |
  alertDetailTagActions.AddTagSuccessAction |
  alertDetailTagActions.AddTagFailureAction |
  alertDetailTagActions.RemoveTagAction |
  alertDetailTagActions.RemoveTagSuccessAction |
  alertDetailTagActions.RemoveTagFailedAction;

// Reducer for the alert detail view.
export function alertDetail(
  state: AlertDetailState = INITIAL_STATE,
  action: Actions,
): AlertDetailState {
  switch (action.type) {

    case actions.CLOSE_ALERT:
      requests.cancel(REQUEST_ID);

      return { ...state, ...INITIAL_STATE };

    case actions.FETCH_ALERT:
      requests.cancel(REQUEST_ID);
      requests.set(REQUEST_ID, action.payload.canceler!);

      return {
        ...state,
        alertId: action.payload.alertID,
        loading: true,
      };

    case actions.FETCH_ALERT_SUCCESS:
      return {
        ...state,
        alert: action.payload.alert,
        loading: false,
        locations: action.payload.locations,
        markers: action.payload.markers,
      };

    case actions.REQUEST_PENDING:
      requests.cancel(REQUEST_ID);
      requests.set(REQUEST_ID, action.payload);

      return { ...state, loading: true };

    case actions.REQUEST_FAILED:
    case actions.UPDATE_ALERT_FAILED:
    case alertDetailTagActions.ADD_TAG_SUCCESS:
    case alertDetailTagActions.ADD_TAG_FAILURE:
    case alertDetailTagActions.REMOVE_TAG_SUCCESS:
    case alertDetailTagActions.REMOVE_TAG_FAILED:
      return { ...state, loading: false };

    case actions.UPDATE_ALERT_SUCCESS:
      return {
        ...state,
        loading: false,
        alert: {
          ...state.alert,
          ...action.payload,
        },
      };

    case actions.OPEN_DATA_MODAL:
      return {
        ...state,
        ipAddresses: action.payload,
        modalActive: true,
      };

    case actions.CLOSE_DATA_MODAL:
      return { ...state, modalActive: false };

    case actions.ADD_ERROR_MESSAGE:
      return { ...state, error: action.payload };

    case actions.CLOSE_ERROR_MESSAGE:
      return { ...state, error: [] };

    case actions.UPDATE_ALERT:
    case alertDetailTagActions.ADD_TAG:
    case alertDetailTagActions.REMOVE_TAG:
      return { ...state, loading: true };

    default:
      return state;
  }
}
