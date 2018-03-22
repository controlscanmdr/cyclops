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
import {
  Modal,
  Pagination,
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Local
import { ErrorPopupContent } from './ErrorPopupContent';
import { StoredError } from '../types/StoredError';
import { Close } from '../../common/components/Close';
import * as actions from '../actions/errorModalActions';
import { MapStateToProps } from '../../common/types/MapStateToProps';
import { MapDispatchToProps } from '../../common/types/MapDispatchToProps';

// Types
// --------------------------------------------------------------------------

export interface Props {
  // Array index of the currently viewed error.
  currentError: number;

  // List of all the current errors.
  errors: StoredError[];

  // Clears the current errors and dismisses the popup.
  clearErrors(): any;

  // Views a new error in the current list of errors.
  viewError(errorIndex: number): any;
}

// Component
// --------------------------------------------------------------------------

// Modal popup that displays all the current API errors when there are any.
export class ErrorPopup extends React.Component<Props, {}> {
  // Clears all errors in the errors modal.
  clearErrors = (): void => {
    this.props.clearErrors();
  };

  /**
   * View a new error in the current list of errors.
   * @param page The page of the new error to view.
   */
  viewError = (page: any): void => {
    this.props.viewError(page - 1);
  };

  render(): JSX.Element {
    const selectedError = this.props.errors[this.props.currentError] || undefined;
    const showModal = Boolean(this.props.errors.length);
    const paginationElement = this.props.errors.length > 1
      ? (
        <Pagination
          items={this.props.errors.length}
          activePage={this.props.currentError + 1}
          className="error-modal__pagination"
          onSelect={this.viewError}
          maxButtons={3}
          next="Next"
          prev="Prev"
        />
      ) : null;
    const errorContent = selectedError
      ? <ErrorPopupContent error={selectedError}/>
      : (
        <div>
          <h4>No Error Selected</h4>
          <p>
            There is currently no error selected to view.
            Please select one or close this popup.
          </p>
        </div>
      );

    return (
      <Modal show={showModal} onHide={this.clearErrors}>
        <Modal.Body>
          <div className="pull-right">
            <Close close={this.clearErrors} />
          </div>
          {errorContent}
        </Modal.Body>
        <Modal.Footer className="error-modal__footer">
          {paginationElement}
          <button className="btn btn-default" onClick={this.clearErrors}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

// Container
// --------------------------------------------------------------------------

interface Container {}

const mapStateToProps: MapStateToProps<Props, Container> = state => ({
  currentError: state.errorModal.current,
  errors: state.errorModal.errors,
});

const mapDispatchToProps: MapDispatchToProps<Props, Container> = dispatch => ({
  clearErrors: bindActionCreators(actions.clearErrors, dispatch),
  viewError: bindActionCreators(actions.viewError, dispatch),
});

const container = connect(mapStateToProps, mapDispatchToProps)(ErrorPopup);

export default container as React.ComponentClass<Container>;
