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
import { AlertDetailTagEdit, Props, State } from './AlertDetailTagEdit';
import { Tag } from '~/services/tags/types';

describe('<AlertDetailTagEdit />', () => {
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
  const tag3: Tag = {
    id: 3,
    name: 'Blah',
    topic: {
      id: 1,
      name: 'Animal',
      url: '',
    },
  };
  const alertTagList = [tag1];
  const tagList = [tag1, tag2, tag3];
  const onAdd = spy();
  const onRemove = spy();
  const isFetchingTags = false;
  const defaults: Props = { alertTagList, tagList, onAdd, onRemove, isFetchingTags };
  const render = (props?: Partial<Props>) => enzyme.shallow((
    <AlertDetailTagEdit {...defaults} {...props} />
  ));

  afterEach(() => {
    onAdd.reset();
    onRemove.reset();
  });

  it('should render a TagAutocomplete', () => {
    const component = render();
    const autocomplete = component.find('TagAutocomplete');
    const instance = component.instance() as AlertDetailTagEdit;

    expect(autocomplete.exists()).toBe(true);
    expect(autocomplete.props()).toEqual({
      tags: tagList,
      exclude: alertTagList,
      onSelect: instance.handleSelect,
      isLoading: false,
    });
  });

  it('should render a TagAutocomplete with a loading icon when tags are fetching', () => {
    const component = render({ isFetchingTags: true });
    const autocomplete = component.find('TagAutocomplete');
    const instance = component.instance() as AlertDetailTagEdit;

    expect(autocomplete.exists()).toBe(true);
    expect(autocomplete.props()).toEqual({
      tags: tagList,
      exclude: alertTagList,
      onSelect: instance.handleSelect,
      isLoading: true,
    });
  });

  it('should pass the selected tag to the onAdd property', () => {
    const component = render({ isFetchingTags: true });
    const instance = component.instance() as AlertDetailTagEdit;

    instance.handleSelect(tag1);
    expect(onAdd.args[0]).toEqual([tag1]);
  });
});
