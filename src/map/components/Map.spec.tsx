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
import * as React from 'react';
import * as sinon from 'sinon';
import * as enzyme from 'enzyme';

// Local
import { Map } from './Map';
import * as mapStore from '../services/mapStore';
import * as config from '../../app/services/config';

describe('<Map />', () => {
  let setDataSpy: sinon.SinonSpy;
  let createMapItemStub: sinon.SinonStub;
  let getMapItemStub: sinon.SinonStub;
  let removeMapItemStub: sinon.SinonStub;
  let mapStoreItemPromise: Promise<any>;
  let mapStoreItem: any;
  let getConfig: sinon.SinonStub;

  beforeEach(() => {
    setDataSpy = sinon.spy();
    mapStoreItem = { markerSource: { setData: setDataSpy } };

    mapStoreItemPromise = Promise.resolve(mapStoreItem);

    createMapItemStub = sinon
      .stub(mapStore, 'createMapItem')
      .returns(mapStoreItemPromise);

    getMapItemStub = sinon
      .stub(mapStore, 'getMapItem')
      .returns(mapStoreItemPromise);

    removeMapItemStub = sinon.stub(mapStore, 'removeMapItem');
    getConfig = sinon.stub(config, 'getConfig').returns({
      MAPBOX_ACCESS_TOKEN: 'blah',
    });
  });

  afterEach(() => {
    createMapItemStub.restore();
    getMapItemStub.restore();
    removeMapItemStub.restore();
    getConfig.restore();
  });

  it('should create a div with a random id', () => {
    const wrapper = enzyme.shallow(<Map />);
    const id = wrapper.prop('id');

    expect(wrapper.type()).toEqual('div');
    expect(typeof id).toBe('string');
    expect(id.slice(0, 2)).toEqual('id');
  });

  it('should pass the markers to the map', () => {
    const markers: any = {};

    enzyme.mount(<Map markers={markers} />);
    return mapStoreItemPromise.then(() => {
      expect(setDataSpy.args[0][0]).toEqual(markers);
    });
  });

  it('should pass in the map options to the map', () => {
    const options: any = {};

    enzyme.mount(<Map options={options} />);
    expect(createMapItemStub.args[0][1]).toEqual(options);
  });
});
