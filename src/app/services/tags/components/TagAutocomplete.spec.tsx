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
import * as sinon from 'sinon';

// Local
import { TagAutocomplete, Props, State } from './TagAutocomplete';
import { Tag } from '~/services/tags/types';
import { Autocomplete } from '~/components/Autocomplete';

describe('<TagAutocomplete />', () => {
  const tag1: Tag = {
    id: 1,
    name: 'Crackers',
    topic: {
      id: 1,
      name: 'Animal',
      url: '',
    },
  };
  const tag2: Tag = {
    id: 2,
    name: 'Soup',
    topic: {
      id: 1,
      name: 'Animal',
      url: '',
    },
  };
  const tags: Tag[] = [tag1, tag2];
  const onSelect = sinon.spy();
  const defaults: Props = { tags, onSelect };
  const render = (props: Partial<Props> = {}) => enzyme.shallow((
    <TagAutocomplete {...defaults} {...props} />
  ));

  afterEach(() => {
    onSelect.reset();
  });

  it('should render an autocomplete component', () => {
    const component = render();

    expect(component.find(Autocomplete)).toHaveLength(1);
  });

  it('should filter excluded tags', () => {
    const component = render({ exclude: [tag1] });
    const instance = component.instance() as TagAutocomplete;

    expect(instance.shouldTagDisplay(tag1)).toEqual(false);
  });

  it('should skip the filter if there are no excluded tags', () => {
    const component = render();
    const instance = component.instance() as TagAutocomplete;

    expect(instance.shouldTagDisplay(tag1)).toEqual(true);
  });

  it('should not filter tags that are not excluded', () => {
    const component = render({ exclude: [tag1] });
    const instance = component.instance() as TagAutocomplete;

    expect(instance.shouldTagDisplay(tag2)).toEqual(true);
  });

  it('should pass a selected tag to the onSelect handler', () => {
    const component = render();
    const instance = component.instance() as TagAutocomplete;

    instance.handleSelect(tag1);
    expect(onSelect.args[0]).toEqual([tag1]);
  });
});
