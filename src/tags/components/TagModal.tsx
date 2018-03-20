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
import { Modal, Well, Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';

// Local
import { TagModalView } from '../types/TagModalView';
import { Dispatch } from '../../common/types/Dispatch';
import * as tagModalActions from '../actions/tagModalActions';
import { MapStateToProps } from '../../common/types/MapStateToProps';
import { Article, Tag, TagDetail } from '../types/Tag';
import { TagAutocomplete } from './TagAutocomplete';
import './TagModal.scss';
import { Close } from '../../common/components/Close';
import { LoadingLine } from '../../common/components/LoadingLine';
import { RichTextEditor } from '../../common/components/RichTextEditor';

// Types
// --------------------------------------------------------------------------

export interface Props {
  // If the modal is currently active.
  isActive: boolean;

  // Current view of the tag modal.
  view: TagModalView;

  // Tag detail to view detailed information on.
  tag?: TagDetail;

  // If the tag detail is loading.
  tagIsLoading: boolean;

  // If the tag list is loading.
  tagListIsLoading: boolean;

  // List of all current tags.
  tagList: Tag[];

  // Redux dispatch function.
  dispatch: Dispatch<any, any>;
}

export interface State {}

// Component
// --------------------------------------------------------------------------

export class TagModal extends React.Component<Props, State> {
  // Closes the modal.
  closeModal = () => {
    this.props.dispatch(tagModalActions.closeModal());
  };

  /**
   * Shows a detailed view of the selected tag.
   * @param {Tag} tag
   */
  showTagDetail = (tag: Tag) => {
    this.props.dispatch(tagModalActions.fetchTagDetail(tag.id));
  };

  /**
   * Removes the currently selected tag detail from the current list of tags.
   * @returns {TagDetail[]}
   */
  removeTagFromList = () => {
    return this.props.tag ? [this.props.tag] : undefined;
  };

  /**
   * Renders the article in a rich text box.
   * @param {Article | null} article
   * @returns {any}
   */
  renderArticle = (article: Article | null) => {
    if (!article) return <p>Tag has no associated article.</p>;

    return <RichTextEditor readonly={true} initial={article.content} />;
  };

  // Renders the tag detail view.
  renderTagDetail = () => {
    if (!this.props.tag) return null;

    return (
      <div>
        <h1 className="sub-title">{this.props.tag.topic.name}: {this.props.tag.name}</h1>
        {this.renderArticle(this.props.tag.article)}
        <LoadingLine show={Boolean(this.props.tagIsLoading)} overlay={true} />
      </div>
    );
  };

  render() {
    return (
      <Modal show={this.props.isActive} onHide={this.closeModal}>
        <Modal.Header className="TagModal__Header">
          <h1 className="TagModal__Title">Tags:</h1>
          <Nav className="TagModal__Nav" bsStyle="pills" activeKey={this.props.view}>
            <NavItem eventKey={TagModalView.Detail}>Search</NavItem>
            <NavItem eventKey={TagModalView.Create}>Create</NavItem>
          </Nav>
          <div className="TagModal__Close">
            <Close close={this.closeModal} />
          </div>
        </Modal.Header>
        <Modal.Body>
          <TagAutocomplete
            tags={this.props.tagList}
            onSelect={this.showTagDetail}
            exclude={this.removeTagFromList()}
            placeholder="Search"
          />
          <Well className="TagModal__Well">
            {this.renderTagDetail()}
          </Well>
        </Modal.Body>
      </Modal>
    );
  }
}

// Container
// --------------------------------------------------------------------------

interface Container {}

const mapStateToProps: MapStateToProps<Props, Container> = state => ({
  isActive: state.tagModal.modalIsActive,
  view: state.tagModal.modalView,
  tag: state.tagModal.tagDetail,
  tagList: state.tagStore.tags,
  tagIsLoading: state.tagModal.tagDetailIsLoading,
  tagListIsLoading: state.tagStore.isFetching,
});


export default connect(mapStateToProps)(TagModal);
