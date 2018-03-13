// Local
import { TagRelationContentTypes } from '~/services/tags/types/TagRelationContentTypes';

/** Relation between a tag and an object, such as an alert. */
export interface TagRelation {
  id: number;

  /** Type of object the tag is related to. */
  content_type: TagRelationContentTypes;

  /** ID of the related object. */
  object_id: number;

  /** ID of the related tag. */
  tag: number;

  /** Date the relation was made. */
  tag_date: string;

  /** User who made the relation. */
  tagged_by: number | null;
}