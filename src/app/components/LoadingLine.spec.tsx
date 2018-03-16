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
import { LoadingLine, Props, State } from './LoadingLine';

describe('<LoadingLine />', () => {
  const defaults: Props = { show: true };
  const render = (props: Partial<Props> = {}) => enzyme.shallow((
    <LoadingLine {...defaults} {...props} />
  ));

  it('should return null if show is false', () => {
    const component = render({ show: false });

    expect(component.get(0)).toBeNull();
  });

  it('should display an overlay if overlay property is true', () => {
    const component = render({ overlay: true });
    const overlay = component.find('LoadingLine--overlay');

    expect(overlay.exists()).toBe(true);
  });
});
