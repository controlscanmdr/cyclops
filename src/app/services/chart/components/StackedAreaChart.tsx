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
import * as _ from 'lodash';

// Local
import { StackedAreaChartData } from '../types';
import { createRandomId } from '../../../utils/stringUtils';
import { createStackedAreaChart } from '../utils/createStackedAreaChart';

// --------------------------------------------------------------------------
// Interfaces
// --------------------------------------------------------------------------

/** Properties of the StackedAreaChart component. */
interface StackedAreaChartProps {
  /** Stacked area chart data for the chart. */
  data: StackedAreaChartData[];
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays a stacked area chart graph.
 */
export class StackedAreaChart
  extends React.Component<StackedAreaChartProps, {}> {
  /** ID of the container element. */
  private id: string;

  constructor(props: StackedAreaChartProps) {
    super(props);

    this.id = createRandomId();
  }

  /**
   * Creates an nvd3 stacked area chart.
   */
  public componentDidMount(): void {
    createStackedAreaChart(this.id, this.props.data);
  }

  /**
   * Updates the nvd3 stacked atea chart.
   * @param prevProps
   */
  public componentDidUpdate(prevProps: StackedAreaChartProps): void {
    if (!_.isEqual(prevProps.data, this.props.data)) {
      createStackedAreaChart(this.id, this.props.data);
    }
  }

  public render(): JSX.Element {
    return (<svg id={this.id} />);
  }
}
