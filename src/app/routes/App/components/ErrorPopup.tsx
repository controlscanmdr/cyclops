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
import {
  Modal,
  Pagination,
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Local
import { ErrorPopupContent } from './ErrorPopupContent';
import { StoredError } from '../types';
import { Close } from '../../../components/Close';
import {
  StateToProps,
  DispatchToProps,
} from '../../../store/types';
import {
  clearErrors,
  viewError,
} from '../../../store/errorModal/errorModalActions';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the ErrorPopup component that are values. */
export interface ValueProps {
  /** Array index of the currently viewed error. */
  currentError: number;
  /** List of all the current errors. */
  errors: StoredError[];
}

/** Properties of the ErrorPopup component that are functions. */
export interface FunctionProps {
  /** Clears the current errors and dismisses the popup. */
  clearErrors(): any;
  /** Views a new error in the current list of errors. */
  viewError(errorIndex: number): any;
}

/** Combined property interfaces for the ErrorPopup component. */
type Props = ValueProps & FunctionProps;

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Modal popup that displays all the current API errors when there are any.
 */
export class ErrorPopup extends React.Component<Props, {}> {
  /**
   * Clears all errors in the errors modal.
   */
  public clearErrors = (): void => {
    this.props.clearErrors();
  };

  /**
   * View a new error in the current list of errors.
   * @param page The page of the new error to view.
   */
  public viewError = (page: any): void => {
    this.props.viewError(page - 1);
  };

  public render(): JSX.Element {
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
