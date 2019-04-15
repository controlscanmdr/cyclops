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

import { AlertDetail } from '~/services/alerts/types';
import { AlertDetailComment } from '~/routes/AlertDetail/components/AlertDetailComment';
import { AlertListItem } from '~/routes/AlertList/components/AlertListItem';
import { CollapsibleHeader } from '~/components/CollapsibleHeader';
import { getOutcomeDisplayName } from '~/services/alerts/utils/getOutcomeDisplayName';
import { JSONTable } from '~/services/json/components/JSONTable';
import { Well } from '~/components/Well';
import { getConfig } from '~/config';

interface Props {
  alert: AlertDetail;
  onClick(id: number): void;
}

interface State {
  isOpen: boolean;
  canOpen: boolean;
}

/**
 * Information about an alert returned from a search query.
 */
export class SearchAlertResult extends React.Component<Props, State> {
  public id: string;

  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: false,
      canOpen: false,
    };
  }

  public render() {
    const isStaff = getConfig().CURRENT_USER.is_staff;
    const comments = isStaff
      ? this.props.alert.comments.map((comment) => (
        <AlertDetailComment key={comment.id} comment={comment}/>
      )) : null;
    const commentContainer = isStaff
      ? (
        <CollapsibleHeader
          title={`Comments ${this.props.alert.comments.length}`}
          open={!!this.props.alert.comments.length}
        >
          {comments}
        </CollapsibleHeader>
      ): null;
    const outcome = (
      getOutcomeDisplayName(this.props.alert.outcome) ||
      <i>No outcome selected</i>
    );
    const notes = this.props.alert.notes || <i>No analysis written</i>;

    return (
      <Well isLight={true}>
        <Well.Header>
          <table>
            <AlertListItem
              alert={this.props.alert}
              onClick={this.props.onClick}
              isActive={false}
              removeGradient={true}
            />
          </table>
        </Well.Header>
        <div className="flex-box search-alert-result__content">
          <div className="flex-item content">

            <JSONTable data={this.props.alert.data} />
          </div>
          <div className="flex-item flex--shrink content search-alert-result__details">
            <h3 className="sub-title">Outcome</h3>
            <div className="well">
              <div className="well__header">{outcome}</div>
              <div className="well__content">{notes}</div>
            </div>

            {commentContainer}
          </div>
        </div>
      </Well>
    );
  }
}
