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

// Local
import { Result } from '~/types/result';
import { User } from '~/services/users/types';
import {
  DistilleryFlat,
  DistilleryNested,
  Distillery,
  DistilleryMinimal,
} from '~/services/distilleries/types';
import {
  CommentNested,
  Comment,
} from '~/types/comments';
import {
  DispatchNested,
  Dispatch,
} from '~/types/dispatches';
import { NormalizedList, NormalizedEntity } from '~/types/normalizr';
import { TagDetail } from '~/services/tags/types';

/** Status choices for alerts. */
export type AlertStatusChoices = 'NEW' | 'BUSY' | 'DONE';

/** Level choices for alerts. */
export type AlertLevelChoices = (
  'CRITICAL' |
  'HIGH' |
  'MEDIUM' |
  'LOW' |
  'INFO'
);

/** Outcome choices for alerts */
export type AlertOutcomeChoices = (
  'completed' |
  'duplicate' |
  'false positive' |
  'N/A' |
  null
);

/** Base interface of the alert object from the Cyphon API. */
export interface Alert {
  /** Unique identifier of the alert. */
  id: number;
  /** Created date of the data that created the alert. */
  content_date: string | null;
  /** Date the alert was saved to the database. */
  created_date: string;
  /** How many times the same alert occurred. */
  incidents: number;
  /** Priority level of the alert. */
  level: AlertLevelChoices;
  /** Outcome of the alert. */
  outcome: AlertOutcomeChoices;
  /** Workflow status of the alert. */
  status: AlertStatusChoices;
  /** Short description of the alert. */
  title: string;
  /** Information a user has written about an alert. */
  notes: string;
  /** Data that created the alert. */
  data: Result;
  /** User assigned to the alert. */
  assigned_user: User | number | null;
  /** Distillery the alert came from. */
  distillery?: Distillery | DistilleryMinimal | number;
  /** User comments associated with the alert. */
  comments?: Comment[];
  /** Previous actions performed on the alert. */
  dispatches?: Dispatch[];
}

/** Shape of the alert object returned from the alerts detail view. */
export interface AlertDetail extends Alert {
  /** OBject of the user assigned to the alert. */
  assigned_user: User | null;
  /** Object of the distillery that created the alert. */
  distillery?: DistilleryNested;
  /** Comment objects associated with the alert. */
  comments: CommentNested[];
  /** Previous actions performed on the alert. */
  dispatches: DispatchNested[];
  doc_id: string;
  tags: TagDetail[];
}

/** Shape of the alert object returned from the alerts list view. */
export interface AlertListItem extends Alert {
  /** Object of the user assigned to the alert. */
  assigned_user: User | null;
  /** Object of the distillery the alert came from. */
  distillery?: DistilleryMinimal;
}

/** Alert object fields that are able to be updated. */
export interface AlertUpdateRequest {
  /** Information a user has written about the alert. */
  notes?: string;
  /** Current level of the alert. */
  level?: AlertLevelChoices;
  /** Current status of the alert. */
  status?: AlertStatusChoices;
  /** Current outcome of the alert. */
  outcome?: AlertOutcomeChoices;
  /** Current user of the alert. */
  assigned_user?: User | null;
}

/** Alert level search parameter types. */
export type AlertLevelParam = string | string[];

/** Alert status search parameter types. */
export type AlertStatusParam = string | string[];

/** Alert list search parameters. */
export interface AlertSearchParams extends AlertTimeSearchParams {
  /** Category to filter by. */
  categories?: number;
  /** Alert level to search for. */
  level?: AlertLevelParam;
  /** Alert status to search for. */
  status?: AlertStatusParam;
  /** Assigned user to search for. */
  assigned_user?: number;
  /** Distillery the alert came from. */
  collection?: number;
  /** String content the alert data contains. */
  content?: string;
  /** Limit of alerts to return. */
  limit?: number;
  /** How many alerts to offset. */
  offset?: number;
}

/** Alert time search parameters. */
export interface AlertTimeSearchParams {
  /** Time after to search for alerts. */
  after?: string;
  /** Time before to search for alerts. */
  before?: string;
}

/** Alert level timeseries object that shows level distribution per day. */
export interface AlertLevelTimeseries {
  /** Dates covered by the timeseries. */
  date: string[];
  /** Critical alerts per day. */
  critical: number[];
  /** High alerts per day. */
  high: number[];
  /** Merdium alerts per day. */
  medium: number[];
  /** Low alerts per day. */
  low: number[];
  /** Into alerts per day. */
  info: number[];
}

/** Properties on the geojson point features returned from thee API. */
export interface AlertLocationPointProperties {
  /** Level of the alert. */
  level: string;
  /** ID of the alert. */
  pk: string;
  /** Short description of the alert. */
  title: string;
  /** Number of times the alert occurred. */
  incidents: number;
}

/** Alert geojson point. */
export interface AlertLocationPoint extends GeoJSON.Point {
  /** Properties of the point */
  properties: AlertLocationPointProperties;
}

/** GeoJSON response of alert locations. */
export type AlertLocationResponse = GeoJSON.FeatureCollection<AlertLocationPoint>;

/** Alert field option property. */
export interface AlertOption {
  /** Value to use when placed in a select drop down list. */
  value: string;
  /** Display name of the value. */
  name: string;
  /** Fontawesome icon. */
  icon?: string;
  /** Text color to use on the icon/display text. */
  textColor?: string;
  /** Background color to use on contextual displays. */
  bgColor?: string;
  /** Hex value of the option. */
  hexColor?: string;
}

/** Category that alerts are grouped into. */
export interface Category {
  /** ID of the category. */
  id: number;
  /** Name of the category. */
  name: string;
}

/** Normalized category entities. */
export interface CategoryEntities {
  /** Normalized category objects. */
  categories: NormalizedEntity<Category>;
}

/** List of normalized category objects. */
export type NormalizedCategoryList = NormalizedList<number, CategoryEntities>;
