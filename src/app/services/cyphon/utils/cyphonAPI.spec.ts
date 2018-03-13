// Vendor
import * as sinon from 'sinon';

// Local
import * as cyphonAPI from './cyphonAPI';
import { cyphonAPI as api } from '../constants';

describe('cyphonAPI', () => {
  describe('getAll()', () => {
    let request: sinon.SinonStub;

    beforeEach(() => {
      request = sinon.stub(api, 'request');
    });

    afterEach(() => {
      request.restore();
    });

    it('should recursively fetch data from a url', () => {
      request.onCall(0).resolves({
        data: {
          next: 'http://cyphon.io/api/v1/monitors/enabled/?page=2',
          previous: null,
          count: 3,
          results: [1],
        },
      });

      request.onCall(1).resolves({
        data: {
          next: 'http://cyphon.io/api/v1/monitors/enabled/?page=3',
          previous: 'http://cyphon.io/api/v1/monitors/enabled/?page=1',
          count: 3,
          results: [2],
        },
      });

      request.onCall(2).resolves({
        data: {
          next: null,
          previous: 'http://cyphon.io/api/v1/monitors/enabled/?page=2',
          count: 3,
          results: [3],
        },
      });

      return cyphonAPI.getAll('/monitors/enabled/').then((response) => {
        expect(response).toEqual([1, 2, 3]);
        expect(request.callCount).toEqual(3);
        expect(request.args[0][0].url).toEqual('/monitors/enabled/');
        expect(request.args[1][0].url).toEqual('http://cyphon.io/api/v1/monitors/enabled/?page=2');
        expect(request.args[2][0].url).toEqual('http://cyphon.io/api/v1/monitors/enabled/?page=3');
      });
    });
  });
});