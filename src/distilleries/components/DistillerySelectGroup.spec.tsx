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
import * as enzyme from 'enzyme';

// Local
import { DistillerySelectGroup } from './DistillerySelectGroup';

describe('<DistillerySelectGroup />', () => {
  const distillery1: any = { id: 1, name: 'magic.magic' };
  const distillery2: any = { id: 2, name: 'blah.blah' };
  const distilleries: any[] = [distillery1, distillery2];
  const title = 'title';
  let wrapper: enzyme.ShallowWrapper<any, any>;

  beforeEach(() => {
    wrapper = enzyme.shallow(
      <DistillerySelectGroup title={title} options={distilleries} />,
    );
  });

  it('should create an option group', () => {
    const optGroup = wrapper.find('optgroup');

    expect(optGroup).toHaveLength(1);
    expect(optGroup.first().prop('label')).toEqual(title);
  });

  it('should create an option for each distillery', () => {
    const options = wrapper.find('option');

    expect(options).toHaveLength(2);

    options.forEach((option, index) => {
      const distillery = distilleries[index];

      expect(option.prop('value')).toEqual(distillery.id);
      expect(option.text()).toEqual(distillery.name);
    });
  });
});
