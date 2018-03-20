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
import { AlertDetailTags, Props } from './AlertDetailTags';
import { Tag } from '../../tags/types/Tag';
import * as alertDetailTagActions from '../actions/alertDetailTagActions';

describe('<AlertDetailTags />', () => {
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
  const alertId = 4;
  const currentUserId = 3;
  const alertTags = [tag1];
  const tagList = [tag1, tag2, tag3];
  const showTagPanel = false;
  const isLoadingTags = false;
  const showRemovalConfirmation = false;
  const dispatch = spy();
  const defaults: Props = {
    alertId,
    currentUserId,
    alertTags,
    tagList,
    showTagPanel,
    isLoadingTags,
    showRemovalConfirmation,
    dispatch,
  };
  const render = (props: Partial<Props> = {}) => enzyme.shallow((
    <AlertDetailTags {...defaults} {...props} />
  ));

  afterEach(() => {
    dispatch.reset();
  });

  it('should render the alert tags if all flags are false', () => {
    const component = render();
    const tags = component.find('Tag');
    const instance = component.instance() as AlertDetailTags;

    expect(tags).toHaveLength(alertTags.length);

    tags.forEach((tag, index) => {
      expect(tag.props()).toEqual({
        tag: alertTags[index],
        onClick: instance.openTagDetail,
      });
    });
  });

  it('should render an edit button when all flags are false', () => {
    const component = render();
    const icon = component.find('FontAwesome');

    expect(icon).toHaveLength(1);
    expect(icon.prop('name')).toEqual('pencil');
  });

  it('should render an edit panel when showTagPanel is true', () => {
    const component = render({ showTagPanel: true });
    const panel = component.find('AlertDetailTagEdit');
    const instance = component.instance() as AlertDetailTags;

    expect(panel.exists()).toBe(true);
    expect(panel.props()).toEqual({
      tagList,
      alertTagList: alertTags,
      onRemove: instance.showRemovalConfirmation,
      onAdd: instance.addTag,
      isFetchingTags: isLoadingTags,
    });
  });

  it('should render a close button when showTagPanel is true', () => {
    const component = render({ showTagPanel: true });
    const icon = component.find('FontAwesome');

    expect(icon.exists()).toBe(true);
    expect(icon.prop('name')).toEqual('close');
  });

  it('should render a removal confirmation', () => {
    const component = render({ showRemovalConfirmation: true, tagToRemove: tag3 });
    const confirmation = component.find('AlertDetailTagRemove');
    const instance = component.instance() as AlertDetailTags;

    expect(confirmation.exists()).toBe(true);
    expect(confirmation.props()).toEqual({
      tag: tag3,
      onRemove: instance.removeTag,
      onCancel: instance.cancelTagRemoval,
    });
  });

  it('should not display any edit icon when the confirmation is displayed', () => {
    const component = render({ showRemovalConfirmation: true });

    expect(component.find('FontAwesome').exists()).toBe(false);
  });

  it('should dispatch an ADD_TAG action', () => {
    const component = render();
    const instance = component.instance() as AlertDetailTags;

    instance.addTag(tag3);
    expect(dispatch.args[0]).toEqual(
      [alertDetailTagActions.addTag(alertId, tag3.id, currentUserId)],
    );
  });

  it('should dispatch a REMOVE_TAG action', () => {
    const component = render();
    const instance = component.instance() as AlertDetailTags;

    instance.removeTag(tag3);
    expect(dispatch.args[0]).toEqual(
      [alertDetailTagActions.removeTag(alertId, tag3.id)],
    );
  });

  it('should dispatch a CANCEL_TAG_REMOVAL action', () => {
    const component = render();
    const instance = component.instance() as AlertDetailTags;

    instance.cancelTagRemoval();
    expect(dispatch.args[0]).toEqual([alertDetailTagActions.cancelTagRemoval()]);
  });

  it('should dispatch a SHOW_REMOVAL_CONFIRMATION action', () => {
    const component = render();
    const instance = component.instance() as AlertDetailTags;

    instance.showRemovalConfirmation(tag3);
    expect(dispatch.args[0]).toEqual([alertDetailTagActions.showRemovalConfirmation(tag3)]);
  });

  it('should dispatch a CLOSE_TAG_PANEL action', () => {
    const component = render();
    const instance = component.instance() as AlertDetailTags;

    instance.closeTagPanel();
    expect(dispatch.args[0]).toEqual([alertDetailTagActions.closeTagPanel()]);
  });

  it('should dispatch a OPEN_TAG_PANEL action', () => {
    const component = render();
    const instance = component.instance() as AlertDetailTags;

    instance.openTagPanel();
    expect(dispatch.args[0]).toEqual([alertDetailTagActions.openTagPanel()]);
  });
});
