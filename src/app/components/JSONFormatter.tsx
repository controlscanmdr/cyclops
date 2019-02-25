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
import * as React from 'react';
import * as Formatter from 'json-formatter-js';
import * as _ from 'lodash';

// Local
import { orderKeys } from '~/utils/objectUtils';

interface Props {
  /** Data to display. */
  json?: any;
  /** How many levels deep the object should open. */
  open?: number;
  /** Formatter configuration object. */
  config?: Formatter.Configuration;
}

/**
 * Creates a block of pretty printed and collapsible object content.
 */
export class JSONFormatter extends React.Component<Props, {}> {
  public static DEFAULT_FORMATTER_CONFIG: Formatter.Configuration = {
    animateClose: false,
    animateOpen: false,
    hoverPreviewArrayCount: 100,
    hoverPreviewEnabled: false,
    hoverPreviewFieldCount: 5,
    theme: 'dark',
  };

  /**
   * Default nested JSON open level for all JSONFormatter instances.
   */
  public static DEFAULT_OPEN: number = 1;

  public static removeChildElements(element: HTMLElement): void {
    while (element.firstChild) { element.removeChild(element.firstChild); }
  }

  public static addTargetBlankToLinks(element: HTMLElement): void {
    _.forEach(element.getElementsByTagName('a'), (link) => {
      link.target = '_blank';
    });
  }

  public static createJSONElement(
    json: any,
    config: Formatter.Configuration = {},
    open?: number,
  ): HTMLDivElement {
    return new Formatter(
      orderKeys(json),
      open || JSONFormatter.DEFAULT_OPEN,
      { ...JSONFormatter.DEFAULT_FORMATTER_CONFIG, ...config },
    ).render();
  }

  public container?: HTMLDivElement;

  public componentDidMount(): void {
    this.renderJSON(this.props.json, this.props.open, this.props.config);
  }

  public componentWillReceiveProps(props: Props): void {
    if (
      this.props.json !== props.json ||
      this.props.config !== props.config ||
      this.props.open !== props.open
    ) {
      this.renderJSON(props.json, props.open, props.config);
    }
  }

  public shouldComponentUpdate() {
    // Turn off component re-rendering.
    return false;
  }

  public renderJSON = (
    json: any,
    open?: number,
    config?: Formatter.Configuration,
  ): void => {
    if (!this.container) { return; }

    const renderedJSON = JSONFormatter.createJSONElement(json, config, open);

    JSONFormatter.removeChildElements(this.container);
    JSONFormatter.addTargetBlankToLinks(renderedJSON);
    this.container.appendChild(renderedJSON);
  };

  public bindContainerRef = (ref: HTMLDivElement) => this.container = ref;

  public render() {
    return <div ref={this.bindContainerRef} />;
  }
}
