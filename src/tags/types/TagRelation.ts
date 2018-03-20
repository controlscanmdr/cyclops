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

// Local
import { TagRelationContentTypes } from './TagRelationContentTypes';

// Relation between a tag and an object, such as an alert.
export interface TagRelation {
  id: number;

  // Type of object the tag is related to.
  content_type: TagRelationContentTypes;

  // ID of the related object.
  object_id: number;

  // ID of the related tag.
  tag: number;

  // Date the relation was made.
  tag_date: string;

  // User who made the relation.
  tagged_by: number | null;
}
