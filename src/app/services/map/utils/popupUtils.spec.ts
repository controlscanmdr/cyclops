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
import * as sinon from 'sinon';
import * as chai from 'chai';

// Local
import { addHoverPopup } from './popupUtils';
import * as constructors from './mapConstructors';

describe('addHoverPopup()', () => {
  const canvas = { style: { cursor: undefined } };
  const coordinates = [4, 5];
  const feature = { geometry: { coordinates } };
  const layers: any[] = [];
  const point: any = {};
  const event = { point };
  let createPopup: sinon.SinonStub;
  let features: any;
  let popup: any;
  let map: any;
  let mousemove: any;
  let popupGenerator: sinon.SinonSpy;

  beforeEach(() => {
    popup = {
      remove: sinon.spy(),
      setLngLat: sinon.spy(),
      setHTML: sinon.spy(),
      addTo: sinon.spy(),
    };
    createPopup = sinon.stub(constructors, 'createPopup').returns(popup);
    popupGenerator = sinon.spy();
    features = [feature];
    map = {
     on: sinon.stub().callsFake((eve, func) => {
       mousemove = func;
     }),
     getCanvas: sinon.stub().returns(canvas),
     queryRenderedFeatures: sinon.stub().returns(features),
    };
  });

  afterEach(() => {
    createPopup.restore();
  });

  it('should create a popup object', () => {
    addHoverPopup(map, layers, popupGenerator);

    mousemove(event);

    chai.expect(popup.setLngLat.called).to.be.true;
  });
});
