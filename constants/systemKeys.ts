/**
 * System Field Keys Constants
 *
 * Common metadata field key identifiers used in WizyVision fields.
 * These are used for the `key` property of Field objects (camelCase values).
 *
 * IMPORTANT: These are NOT data types. Use DataTypes for the `dataType` property.
 *
 * Usage:
 * ```typescript
 * import { SystemKeys } from '@/constants/systemKeys';
 * import { DataTypes } from '@/constants/dataTypes';
 *
 * const field = {
 *   key: SystemKeys.TITLE,           // 'title' (camelCase)
 *   dataType: DataTypes.STRING,      // 'STRING' (UPPERCASE)
 *   label: 'Title',
 * };
 * ```
 */

export const SystemKeys = {
  // Common metadata field identifiers (camelCase values)
  TITLE: 'title',
  DESCRIPTION: 'description',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
  CREATED_BY: 'createdBy',
  UPDATED_BY: 'updatedBy',
  ASSIGNED_TO: 'assignedTo',
  DUE_DATE: 'dueDate',
  PRIORITY: 'priority',
  NOTES: 'notes',
  STATUS: 'statusId',
  TAGS: 'tags',
  SITE: 'site',
  WATCHERS: 'watchers',
  PRIVACY: 'privacyId',
  REFERENCE: 'reference',
  MEMBER: 'member',
  TYPE: 'type',
} as const;

// Type for SystemKeys values
export type SystemKey = typeof SystemKeys[keyof typeof SystemKeys];
