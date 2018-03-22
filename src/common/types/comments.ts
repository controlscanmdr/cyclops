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
import { User } from '../../users/types/User';

// Base interface of a comment object returned by the Cyphon API.
export interface Comment {
  // Identifier of the object.
  id: number;

  // ID of the alert associated with the comment.
  alert: number;

  // Date the alert was created.
  created_date: string;

  // Comment string content.
  content: string;

  // User who created the comment.
  user: User | number;
}

// Comment object with associated objects nested on the comment.
export interface CommentNested extends Comment {
  // Object of the user who created the comment
  user: User;
}
