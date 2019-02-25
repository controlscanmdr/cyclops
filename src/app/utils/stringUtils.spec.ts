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

import { addCommas, createRandomId } from './stringUtils';

describe('createRandomId', () => {
  it('should return a string', () => {
    const id = createRandomId();

    chai.expect(id).to.be.a('string');
  });

  it('should return a string that starts with id', () => {
    const id = createRandomId();
    const chars = id.slice(0, 2);

    chai.expect(chars).to.equal('id');
  });
});

describe('addCommas()', () => {
  it('should not add commas for any numbers less than 3', () => {
    expect(addCommas(1)).to.equal('1');
    expect(addCommas(12)).to.equal('12');
    expect(addCommas(123)).to.equal('123');
  });

  it('should add one comma for any numbers less than a million', () => {
    expect(addCommas(1234)).to.equal('1,234');
    expect(addCommas(12345)).to.equal('12,345');
    expect(addCommas(123456)).to.equal('123,456');
  });

  it('should add two more more commas for numbers more than a million', () => {
    expect(addCommas(1234567)).to.equal('1,234,567');
  });
});
