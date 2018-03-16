// Vendor
import * as sinon from 'sinon';
import MockAdapter from 'axios-mock-adapter';

// Local
import * as api from './tagAPI';
import { cyphonAPI } from '~/services/cyphon/constants';
import { TagRelation } from '~/services/tags/types/TagRelation';

describe('tagAPI', () => {
  let mockAPI: MockAdapter;

  beforeAll(() => {
    mockAPI = new MockAdapter(cyphonAPI);
  });

  afterAll(() => {
    mockAPI.restore();
  });

  afterEach(() => {
    mockAPI.reset();
  });

  describe('addTagRelation()', () => {
    const url = /\/tagrelations\/$/;

    it('should send a post request', async () => {
      mockAPI.onPost(url).reply(200);

      await api.addTagRelation('alert', 1, 3);
    });

    it('should send a request with the correct post body', async () => {
      const contentType = 'alert';
      const objectID = 1;
      const tagID = 4;
      const userID = 3;

      mockAPI.onPost(url, {
        content_type: contentType,
        object_id: objectID,
        tag: tagID,
        tagged_by: userID,
      }).reply(200);

      await api.addTagRelation(contentType, objectID, tagID, userID);
    });
  });

  describe('deleteTagRelation()', () => {
    it('should send a DELETE request to the correct url', async () => {
      mockAPI.onDelete('/tagrelations/7/').reply(200);

      await api.deleteTagRelation(7);
    });
  });

  describe('findTagRelation()', () => {
    const contentType = 'alert';
    const objectId = 4;
    const tagId = 6;
    const params = {
      content_type: contentType,
      object_id: objectId,
      tag: tagId,
    };

    it('should send a GET request to the correct url', async () => {
      const relations = [{ id: 1 }];

      mockAPI.onGet('/tagrelations/', { params }).reply(200, {
        count: 1,
        results: relations,
      });

      const result = await api.findTagRelation(contentType, objectId, tagId);

      expect(result).toEqual(relations[0]);
    });

    it('should throw an error if the API returns more than one result', async () => {
      const relations = [{ id: 1 }, { id: 2 }];

      mockAPI.onGet('/tagrelations/', { params }).reply(200, {
        results: relations,
      });

      try {
        await api.findTagRelation(contentType, objectId, tagId);
      } catch (error) {
        expect(error).toEqual(Error('API call expected one result but received 2'));
      }
    });
  });

  describe('fetchAllTags()', () => {
    it('should fetch all tags by pagination', async () => {
      const tag1 = { id: 1 };
      const tag2 = { id: 2 };
      const tag3 = { id: 3 };

      mockAPI.onGet('/tags/').reply(200, {
        count: 3,
        next: '/tags/?page=2',
        previous: null,
        results: [tag1],
      });
      mockAPI.onGet('/tags/?page=2').reply(200, {
        count: 3,
        next: '/tags/?page=3',
        previous: '/tags/',
        results: [tag2],
      });
      mockAPI.onGet('/tags/?page=3').reply(200, {
        count: 3,
        next: null,
        previous: '/tags/?page=2',
        results: [tag3],
      });

      const results = await api.fetchAllTags();

      expect(results).toEqual([tag1, tag2, tag3]);
    });
  });

  describe('fetchTag()', () => {
    const tag: any = { id: 1 };

    it('should send a GET request to the correct url', async () => {
      mockAPI.onGet('/tags/3/').reply(200, tag);

      expect(await api.fetchTag(3)).toEqual(tag);
    });
  });
});
