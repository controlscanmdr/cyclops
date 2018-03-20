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

// Instructions on how to query for search results.
export class SearchQueryInstructions extends React.Component {
  render() {
    return (
      <div className="panel">
        <div className="panel-body">
          <h1 className="SearchQueryInstructions__header">Query Instructions</h1>
          <ul className="SearchQueryInstructions__list">
            <li className="SearchQueryInstructions__list-item">
              Filter search by collection name.
              <ul>
                <li><b>@source="Specific Name"</b>: Search specific collection.</li>
                <li><b>@source="Name"</b>: Search collections that contain the word "Name".</li>
              </ul>
            </li>
            <li className="SearchQueryInstructions__list-item">
              Search for a word or phrase.
              <ul>
                <li><b>word</b>: Search for a singular word.</li>
                <li><b>"a phrase"</b>: Search for a phrase. Requires quotation marks</li>
              </ul>
            </li>
            <li className="SearchQueryInstructions__list-item">
              Search for a certain field value.
              <ul>
                <li><b>field.name=value</b>: Syntax for a word in text field.</li>
                <li><b>field.name="word phrase"</b>: Search for a word phrase in a text field.</li>
                <li>
                  <b>{'field.name<5'}</b>
                  : Compare a number value. Possible operators are {'< > <= >= ='}.
                </li>
                <li><b>field.name=true</b>: Check for a particular boolean value.</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
