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
import * as sinon from 'sinon';


// Local
import * as actions from './notificationActions';
import * as notifications from '../utils/notifications';
import { addError } from '~/store/errorModal/errorModalActions';

describe('notificationActions', () => {
  describe('notificationsEnabled()', () => {
    it('should create an action with the correct type and payload', () => {
      const enabled = false;
      const action = actions.notificationsEnabled(enabled);

      expect(action).toEqual({
        type: actions.NOTIFICATIONS_ENABLED,
        error: undefined,
        payload: enabled,
      });
    });
  });

  describe('notificationsNotSupported()', () => {
    it('should create an action with the correct type and payload', () => {
      const action = actions.notificationsNotSupported();

      expect(action).toEqual({
        type: actions.NOTIFICATIONS_NOT_SUPPORTED,
        error: undefined,
        payload: undefined,
      });
    });
  });

  describe('notificationsAllowed()', () => {
    it('should create an action with the correct type and payload', () => {
      const allowed = true;
      const action = actions.notificationsAllowed(allowed);

      expect(action).toEqual({
        type: actions.NOTIFICATIONS_ALLOWED,
        error: undefined,
        payload: allowed,
      });
    });
  });

  describe('pushMessagingNotSupported()', () => {
    it('should create an action with the correct type and payload', () => {
      const action = actions.pushMessagingNotSupported();

      expect(action).toEqual({
        type: actions.PUSH_MESSAGING_NOT_SUPPORTED,
        error: undefined,
        payload: undefined,
      });
    });
  });

  describe('serviceWorkersNotSupported()', () => {
    it('should create an action with the correct type and payload', () => {
      const action = actions.serviceWorkersNotSupported();

      expect(action).toEqual({
        type: actions.SERVICE_WORKERS_NOT_SUPPORTED,
        error: undefined,
        payload: undefined,
      });
    });
  });

  describe('serviceWorkerRegistered()', () => {
    it('should create an action with the correct type and payload', () => {
      const action = actions.serviceWorkerRegistered();

      expect(action).toEqual({
        type: actions.SERVICE_WORKER_REGISTERED,
        error: undefined,
        payload: undefined,
      });
    });
  });

  describe('THUNKS', () => {
    let dispatch: sinon.SinonSpy;
    let getState: sinon.SinonSpy;

    beforeEach(() => {
      dispatch = sinon.spy();
      getState = sinon.spy();
    });

    describe('setupNotifications()', () => {
      const serviceWorkerRegistration: any = {};
      const subscription: any = {};
      let serviceWorkersAreSupported: sinon.SinonStub;
      let registerServiceWorker: sinon.SinonStub;
      let notificationsAreSupported: sinon.SinonStub;
      let notificationsAreDenied: sinon.SinonStub;
      let pushMessagingIsSupported: sinon.SinonStub;
      let getServiceWorkerRegistration: sinon.SinonStub;
      let subscribeToPushManager: sinon.SinonStub;
      let sendSubscriptionToServer: sinon.SinonStub;
      let setWorkerVariables: sinon.SinonStub;
      let thunk: () => Promise<any>;

      beforeEach(() => {
        thunk = () => actions.setupNotifications()(dispatch, getState, undefined);

        serviceWorkersAreSupported = sinon.stub(
          notifications,
          'serviceWorkersAreSupported',
        ).returns(true);
        registerServiceWorker = sinon.stub(
          notifications,
          'registerServiceWorker',
        ).resolves();
        notificationsAreSupported = sinon.stub(
          notifications,
          'notificationsAreSupported',
        ).returns(true);
        notificationsAreDenied = sinon.stub(
          notifications,
          'notificationsAreDenied',
        ).returns(false);
        pushMessagingIsSupported = sinon.stub(
          notifications,
          'pushMessagingIsSupported',
        ).returns(true);
        getServiceWorkerRegistration = sinon.stub(
          notifications,
          'getServiceWorkerRegistration',
        ).resolves(serviceWorkerRegistration);
        subscribeToPushManager = sinon.stub(
          notifications,
          'subscribeToPushManager',
        ).resolves(subscription);
        sendSubscriptionToServer = sinon.stub(
          notifications,
          'sendSubscriptionToServer',
        ).resolves();
        setWorkerVariables = sinon.stub(
          notifications,
          'setWorkerVariables',
        );
      });

      afterEach(() => {
        serviceWorkersAreSupported.restore();
        registerServiceWorker.restore();
        notificationsAreSupported.restore();
        notificationsAreDenied.restore();
        pushMessagingIsSupported.restore();
        getServiceWorkerRegistration.restore();
        subscribeToPushManager.restore();
        sendSubscriptionToServer.restore();
        setWorkerVariables.restore();
      });

      it('should dispatch that service workers aren\'t supported' , () => {
        serviceWorkersAreSupported.returns(false);

        return thunk().then(() => {
          const action = actions.serviceWorkersNotSupported();

          expect(dispatch.args[0][0]).toEqual(action);
        });
      });

      it('should register the service worker if they are supported', () => {
        return thunk().then(() => {
          const action = actions.serviceWorkerRegistered();

          expect(registerServiceWorker.called).toBe(true);
          expect(dispatch.args[0][0]).toEqual(action);
        });
      });

      it('should dispatch that notifications are not supported', () => {
        notificationsAreSupported.returns(false);

        return thunk().then(() => {
          const supported = actions.notificationsNotSupported();
          const enabled = actions.notificationsEnabled(false);

          expect(dispatch.args[1][0]).toEqual(supported);
          expect(dispatch.args[2][0]).toEqual(enabled);
        });
      });

      it('should dispatch that notifications are denied', () => {
        notificationsAreDenied.returns(true);

        return thunk().then(() => {
          const allowed = actions.notificationsAllowed(false);
          const enabled = actions.notificationsEnabled(false);

          expect(dispatch.args[1][0]).toEqual(allowed);
          expect(dispatch.args[2][0]).toEqual(enabled);
        });
      });

      it('should dispatch that push messenging is not supported', () => {
        pushMessagingIsSupported.returns(false);

        return thunk().then(() => {
          const supported = actions.pushMessagingNotSupported();
          const enabled = actions.notificationsEnabled(false);

          expect(dispatch.args[1][0]).toEqual(supported);
          expect(dispatch.args[2][0]).toEqual(enabled);
        });
      });

      it('should get the service worker registration', () => {
        return thunk().then(() => {
          expect(getServiceWorkerRegistration.called).toBe(true);
        });
      });

      it('should subscribe the registration to the push manager', () => {
        return thunk().then(() => {
          expect(subscribeToPushManager.called).toBe(true);
          expect(subscribeToPushManager.args[0][0]).toEqual(
            serviceWorkerRegistration,
          );
        });
      });

      it('should not send the subscription to the server if ther is none', () => {
        subscribeToPushManager.resolves();

        return thunk().then(() => {
          expect(sendSubscriptionToServer.called).toBe(false);
        });
      });

      it('should send the subscription to server', () => {
        return thunk().then(() => {
          expect(sendSubscriptionToServer.called).toBe(true);
          expect(sendSubscriptionToServer.args[0][0]).toEqual(
            subscription,
          );
        });
      });

      it('should set the worker variables of the subscription', () => {
        return thunk().then(() => {
          expect(setWorkerVariables.called).toBe(true);
          expect(setWorkerVariables.args[0][0]).toEqual(
            subscription,
          );
        });
      });

      it('should dispatch that notifications are enabled', () => {
        return thunk().then(() => {
          const action = actions.notificationsEnabled(true);

          expect(dispatch.args[1][0]).toEqual(action);
        });
      });

      it('should dispatch that notifications are disabled if the ' +
        'subscription could not be sent to the server and display ' +
        'an error', () => {
        const error: any = {};

        sendSubscriptionToServer.rejects(error);

        return thunk().then(() => {
          const enabled = actions.notificationsEnabled(false);
          const errorAction = addError(error);

          expect(dispatch.args[1][0]).toEqual(enabled);
          expect(dispatch.args[2][0]).toEqual(errorAction);
        });
      });
    });
  });
});
