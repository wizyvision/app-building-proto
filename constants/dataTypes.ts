/**
 * Data Types Constants
 *
 * Canonical field data type constants used throughout WizyVision application.
 *
 * CRITICAL: Always use these constants instead of hardcoded strings.
 *
 * Usage:
 * ```typescript
 * import { DataTypes } from '@/constants/dataTypes';
 *
 * const field = {
 *   type: DataTypes.STATUS_ID,
 *   dataType: DataTypes.DATE
 * };
 * ```
 */

export const DataTypes = {
  // System Fields - Standard metadata managed by WizyVision
  FILES: 'FILES',
  STATUS_ID: 'STATUS_ID',
  TAGS: 'TAGS',
  PRIVACY_ID: 'PRIVACY_ID',
  WATCHERS: 'WATCHERS',
  SITE: 'SITE',
  MEM_ID: 'MEM_ID',
  REF_ID: 'REF_ID',
  TYPE_ID: 'TYPE_ID',

  // Custom Fields - User-defined form fields
  STRING: 'STRING',
  TEXT: 'TEXT',
  BOOLEAN: 'BOOLEAN',
  CHECKBOX: 'CHECKBOX',
  SELECT: 'SELECT',
  DATE: 'DATE',
  TIME: 'TIME',
  DOUBLE: 'DOUBLE',
  LOCATION: 'LOCATION',
  PEOPLE: 'PEOPLE',
  PEOPLE_LIST: 'PEOPLE_LIST',
  SIGNATURE: 'SIGNATURE',
  FILE_LIST: 'FILE_LIST',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  TAGS_DROPDOWN: 'TAGS_DROPDOWN',
} as const;

// Type for DataTypes values
export type DataType = typeof DataTypes[keyof typeof DataTypes];
