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

// Local
import { SubtleButton } from './SubtleButton';
import { createRandomId } from '~/utils/stringUtils';

/**
 * Object structure used when displaying a select option on a
 * select input.
 */
export interface SelectOption {
  /** Display name of the option. */
  name: string;
  /** Value of the select option. */
  value: any;
}

/** Properties for the SubtleSelect component. */
interface Props  {
  /** Options to display in the select option. */
  options: SelectOption[];
  /** The currently selected option. */
  currentValue: any;
  /**
   * Function that runs when an option is selected.
   * @param value The selected value.
   */
  onSelect(value: string): any;
}

/** Internal state of the SubtleSelect component. */
interface State {
  /** If the select dropdown view is active. */
  active: boolean;
}

/** Subtle button that displays a select option on click. */
export class SubtleSelect extends React.Component<Props, State> {
  /** If the window listener has been activated. */
  private listenerActivated: boolean;

  /** DOM id used to active or deactivate the select dropdown view. */
  private id: string;

  /**
   * Function that can be or is bound to the window click listener.
   * @param event
   */
  private clickListener?: (event: Event) => void;

  constructor(props: Props) {
    super(props);

    this.state = { active: false };

    this.id = createRandomId();
    this.listenerActivated = false;
  }

  /**
   * If the component state is active, wait a moment and add the deactivate
   * event listener to the window object so it's not immediately activated.
   */
  public componentDidUpdate() {
    const { clickListener, listenerActivated } = this;

    if (this.state.active && !listenerActivated && clickListener) {
      setTimeout(() => {
        window.addEventListener('click', clickListener);
        this.listenerActivated = true;
      }, 100);
    }
  }

  /**
   * Deactivate the listener if the component unmounts.
   */
  public componentWillUnmount() {
    this.deactivateSelect();
  }

  /**
   * Deactivates the select view.
   */
  public deactivateSelect = (): void => {
    window.removeEventListener('click', this.clickListener);

    this.clickListener = undefined;
    this.listenerActivated = false;

    this.setState({ active: false });
  };

  /**
   * Activates the select view.
   */
  public activateSelect = (): void => {
    this.clickListener = (e: any) => {
      if (e.toElement.id !== this.id) { this.deactivateSelect(); }
    };

    this.listenerActivated = false;

    this.setState({ active: true });
  };

  /**
   * Runs the passed in onSelect function and deactivates the select.
   * @param {Event} event The event fired off from the select.
   */
  public select = (event: any): void => {
    this.props.onSelect(event.target.value);
    this.deactivateSelect();
  };

  public render(): JSX.Element {
    const selectOptions = this.state.active
      ? this.props.options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.name}
        </option>
      ))
      : null;
    const displayedElement = this.state.active ? (
      <select
        className="form-control"
        id={this.id}
        onChange={this.select}
        value={this.props.currentValue || undefined}
      >
        {selectOptions}
      </select>
    ) : (
      <SubtleButton onClick={this.activateSelect}>
        {this.props.children}
      </SubtleButton>
    );

    return (displayedElement);
  }
}
