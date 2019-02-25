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

// Vendor
import { Dispatch, Action, ThunkAction } from 'redux';

// Local
import { StoreState } from './index';

/** Redux dispatch function configured with this redux store state. */
export type ReduxDispatch = Dispatch<StoreState>;

/**
 * Local interface of react-redux functions that map the redux state to
 * a react component properties.
 */
export type StateToProps<R, P> = (state: StoreState, ownProps: P) => R;

/**
 * Local interface of react-redux function that maps redux dispatch actions
 * to a react component properties.
 */
export type DispatchToProps<R, P> = (
  dispatch: ReduxDispatch,
  ownProps: P,
) => R;

/** Flux standard action with specified paylaod type. */
export interface ReduxAction<Payload> extends Action {
  /** Type of action. */
  type: string;
  /** Data passed with the action. */
  payload: Payload;
  /** If the action is an error type. */
  error?: boolean;
}

/** Thunk action that returns a promise that returns undefined. */
export type ThunkActionPromise = ThunkAction<
  Promise<void>,
  StoreState,
  undefined
>;

/** Thunk action that returns undefined. */
export type ThunkActionVoid = ThunkAction<void, StoreState, undefined>;

export type Reducer<State> = (state: State, action: ReduxAction<any>) => State;

export interface ReducerMap<State> {
  [action: string]: Reducer<State>;
}
