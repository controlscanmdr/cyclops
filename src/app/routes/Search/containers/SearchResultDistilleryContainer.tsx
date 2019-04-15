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
import { connect } from 'react-redux';
import { bindActionCreators as bind } from 'redux';

// Local
import { DispatchToProps, StateToProps } from '~/store/types';
import { SearchResultDistillery } from '../components/SearchResultDistillery';
import { Dictionary } from '~/types/object';
import { DistillerySearchResults } from '~/services/search/types';
import { selectDistillery } from '~/store/searchResults';
import { DistilleryMinimal } from '~/services/distilleries/types';

interface ContainerProps {
  distillery: DistilleryMinimal;
}

interface ValueProps {
  selectedDistilleryID?: number;
  results?: Dictionary<DistillerySearchResults>;
  distillery: DistilleryMinimal;
}

interface FunctionProps {
  selectResultDistillery(distilleryID: number): any;
}

type Props = ValueProps & FunctionProps;

class Container extends React.Component<Props> {
  public onClick = () => {
    this.props.selectResultDistillery(this.props.distillery.id);
  };

  public render() {
    const results = this.props.results
      ? this.props.results[this.props.distillery.id]
      : undefined;
    const count = results ? results.count : 0;

    return (
      <SearchResultDistillery
        isActive={this.props.selectedDistilleryID === this.props.distillery.id}
        distillery={this.props.distillery}
        resultCount={count}
        onSelect={this.props.selectResultDistillery}
      />
    );
  }
}

const values: StateToProps<ValueProps, ContainerProps> = (state, props) => ({
  selectedDistilleryID: state.searchResults.selectedDistilleryID,
  results: state.searchResults.results,
  distillery: props.distillery,
});

const functions: DispatchToProps<FunctionProps, ContainerProps> = (dispatch) => ({
  selectResultDistillery: bind(selectDistillery, dispatch),
});

export const SearchResultDistilleryContainer: React.ComponentClass<ContainerProps> = (
  connect(values, functions)(Container)
);
