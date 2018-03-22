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
import * as Formatter from 'json-formatter-js';
import * as _ from 'lodash';

// Local
import { orderKeys } from '../services/objectUtils';

// Types
// --------------------------------------------------------------------------

interface Props {
  // Data to display.
  json?: any;

  // How many levels deep the object should open.
  open?: number;

  // Formatter configuration object.
  config?: Formatter.Configuration;
}

// Component
// --------------------------------------------------------------------------

// Creates a block of pretty printed and collapsible object content.
export class JSONFormatter extends React.Component<Props, {}> {
  static DEFAULT_FORMATTER_CONFIG: Formatter.Configuration = {
    animateClose: false,
    animateOpen: false,
    hoverPreviewArrayCount: 100,
    hoverPreviewEnabled: false,
    hoverPreviewFieldCount: 5,
    theme: 'dark',
  };

  // Default nested JSON open level for all JSONFormatter instances.
  static DEFAULT_OPEN: number = 1;

  /**
   * Removes all child elements of an HTMLElement
   * @param {HTMLElement} element
   */
  static removeChildElements(element: HTMLElement): void {
    while (element.firstChild) element.removeChild(element.firstChild);
  }

  /**
   * Adds target="_blank" to link elements.
   * @param {HTMLElement} element
   */
  static addTargetBlankToLinks(element: HTMLElement): void {
    _.forEach(element.getElementsByTagName('a'), (link) => {
      link.target = '_blank';
    });
  }

  /**
   * Creates the rendered HTML content of the JSON Formatter.
   * @param json
   * @param {JSONFormatter.Configuration} config
   * @param {number} open
   * @returns {HTMLDivElement}
   */
  static createJSONElement(
    json: any,
    config: Formatter.Configuration = {},
    open?: number,
  ): HTMLDivElement {
    const data = orderKeys(json);
    const isOpen = open || JSONFormatter.DEFAULT_OPEN;
    const passedConfig = { ...JSONFormatter.DEFAULT_FORMATTER_CONFIG, ...config };

    return new Formatter(data, isOpen, passedConfig).render();
  }

  // Root container element of the formatter.
  container?: HTMLDivElement;

  /**
   * Determines if the props are equal.
   * @param {Props} props
   * @returns {boolean}
   */
  propsAreEqual = (props: Props): boolean => {
    return _.isEqual(props, this.props);
  };

  componentDidMount(): void {
    this.renderJSON(this.props.json, this.props.open, this.props.config);
  }

  componentWillReceiveProps(props: Props): void {
    if (!this.propsAreEqual(props)) this.renderJSON(props.json, props.open, props.config);
  }

  shouldComponentUpdate() {
    // Turn off component re-rendering.
    return false;
  }

  /**
   * Renders the JSON element on the root component.
   * @param json
   * @param {number} open
   * @param {JSONFormatter.Configuration} config
   */
  renderJSON = (json: any, open?: number, config?: Formatter.Configuration): void => {
    if (!this.container) { return; }

    const renderedJSON = JSONFormatter.createJSONElement(json, config, open);

    JSONFormatter.removeChildElements(this.container);
    JSONFormatter.addTargetBlankToLinks(renderedJSON);
    this.container.appendChild(renderedJSON);
  };

  /**
   * Binds the container reference to the local class property.
   * @param {HTMLDivElement} ref
   * @returns {HTMLDivElement}
   */
  bindContainerRef = (ref: HTMLDivElement) => this.container = ref;

  render() {
    return <div ref={this.bindContainerRef} />;
  }
}
