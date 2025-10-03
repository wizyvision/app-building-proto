/**
 * Form Builder Utilities
 *
 * Shared helper functions for form builder functionality
 */

import type { FieldData } from '@/features/FormFields';

/**
 * Check if a system field is disabled (already in use)
 *
 * System fields can only be used once per form, so if a system field
 * is already in the form, it should be disabled in the field library.
 *
 * @param fieldId - The ID of the field to check
 * @param fieldType - The type of the field ('system', 'custom', or 'section')
 * @param usedFieldKeys - Array of field keys already in use
 * @returns true if the field should be disabled
 *
 * UX PRINCIPLE APPLIED:
 * - Visual Hierarchy: Disabled system fields provide clear feedback
 * - Hick's Law: Reduce invalid choices by disabling unavailable options
 */
export const isSystemFieldDisabled = (
  fieldId: string,
  fieldType: string,
  usedFieldKeys: string[]
): boolean => {
  return fieldType === 'system' && usedFieldKeys.includes(fieldId);
};

/**
 * Get all used field keys from field arrays
 *
 * @param fieldArrays - Arrays of FieldData objects
 * @returns Array of field keys currently in use
 */
export const getUsedFieldKeys = (...fieldArrays: FieldData[][]): string[] => {
  return fieldArrays.flat().map((field) => field.key);
};
