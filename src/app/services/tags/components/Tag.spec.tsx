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
import { spy } from 'sinon';

// Local
import { Tag, Props, State } from './Tag';
import { Tag as TagType } from '~/services/tags/types';

describe('<Tag />', () => {
  const tag: TagType = {
    id: 1,
    name: 'Crackers',
    topic: {
      id: 1,
      name: 'Animal',
      url: '',
    },
  };
  const defaults: Props = { tag };
  const render = (props?: Partial<Props>) => enzyme.shallow((
    <Tag {...defaults} {...props} />
  ));

  it('should handle the passed down tag to the onClick property', () => {
    const onClick = spy();
    const component = render({ onClick });

    component.find('Button').simulate('click');
    expect(onClick.args[0]).toEqual([tag]);
  });
});