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
import {
  normalize,
  denormalize,
} from 'normalizr';

// Local
import {
  ContextNested,
  NormalizedContextList,
} from '../types';
import {
  CONTEXT_LIST_SCHEMA,
  CONTEXT_SCHEMA,
} from '../constants';

/**
 * Normalize a list of nested context objects.
 * @param contexts Contexts to normalize.
 * @returns {NormalizedContextList}
 */
export function normalizeContexts(
  contexts: ContextNested[],
): NormalizedContextList {
  return normalize(contexts, CONTEXT_LIST_SCHEMA);
}

/**
 * Denormalizes a list of context objects back into their original objects.
 * @param contexts Normalized list of contexts.
 * @returns {ContextNested[]}
 */
export function denormalizeContexts(
  contexts: NormalizedContextList,
): ContextNested[] {
  return denormalize(
    contexts.result,
    CONTEXT_LIST_SCHEMA,
    contexts.entities,
  );
}

/**
 * Returns a context object from a normalized list of context objects.
 * @param context ID of the context to grab.
 * @param contexts Normalized list of contexts
 * @returns {ContextNested}
 */
export function denormalizeContext(
  context: number,
  contexts: NormalizedContextList,
): ContextNested | undefined {
  return denormalize(context, CONTEXT_SCHEMA, contexts.entities);
}
