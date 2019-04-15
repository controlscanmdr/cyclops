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

import * as React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

import { createRandomId } from '~/utils/stringUtils';
import { FontAwesome } from '~/components/FontAwesome';

interface Props {
  /** Function that runs when the close button is clicked. */
  close(): any;
}

/** Close button with a tooltip explaining that it's a close button. */
export class Close extends React.Component<Props, {}> {
  public ClosePopover = <Popover id={createRandomId()}>Close</Popover>;

  public render(): JSX.Element {
    return (
      <OverlayTrigger
        overlay={this.ClosePopover}
        placement="bottom"
        animation={false}
      >
        <button onClick={this.props.close} className="btn-alt">
          <FontAwesome icon="times"/>
        </button>
      </OverlayTrigger>
    );
  }
}
