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
import * as api from '../../cyphon/services/cyphonAPI';
import * as contextAPI from './contextAPI';

describe('api.contexts.api', () => {
  describe('searchContext', () => {
    let get: sinon.SinonStub;

    beforeEach(() => {
      get = sinon.stub(api, 'get');
    });

    afterEach(() => {
      get.restore();
    });

    it('should call the correct url', () => {
      contextAPI.searchContext(4, {} as any);

      expect(get.called).toBe(true);
      expect(get.args[0][0]).toEqual('/contexts/4/related-data-by-id/');
    });

    it('should pass the params to the get options', () => {
      const params: any = {};

      contextAPI.searchContext(4, params);

      expect(get.called).toBe(true);
      expect(get.args[0][1]).toEqual({
        params,
        cancelToken: undefined,
      });
    });

    it('should pass the cancel token to the get options', () => {
      const params: any = {};
      const cancelToken: any = {};

      contextAPI.searchContext(4, params, cancelToken);

      expect(get.called).toBe(true);
      expect(get.args[0][1]).toEqual({
        params,
        cancelToken,
      });
    });
  });
});
