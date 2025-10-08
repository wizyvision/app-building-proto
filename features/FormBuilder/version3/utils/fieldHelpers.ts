/**
 * Field Helpers - Reusable field operations
 *
 * Clean, testable utility functions for common field operations
 */

import { DataTypes } from '@/constants/dataTypes';
import type { FormItem, FieldData, SectionData } from '../types';

/**
 * Find field in items array (sections and standalone)
 */
export function findFieldById(items: FormItem[], fieldId: string): FieldData | null {
  for (const item of items) {
    if (item.type === 'section') {
      const found = item.data.fields.find((f) => f.id === fieldId);
      if (found) return found;
    } else if (item.type === 'field' && item.data.id === fieldId) {
      return item.data;
    }
  }
  return null;
}

/**
 * Update field in items array
 */
export function updateFieldInItems(
  items: FormItem[],
  fieldId: string,
  updates: Partial<FieldData>
): FormItem[] {
  return items.map((item) => {
    if (item.type === 'section') {
      return {
        ...item,
        data: {
          ...item.data,
          fields: item.data.fields.map((field) =>
            field.id === fieldId ? { ...field, ...updates } : field
          ),
        },
      };
    }

    if (item.type === 'field' && item.data.id === fieldId) {
      return { ...item, data: { ...item.data, ...updates } };
    }

    return item;
  });
}

/**
 * Remove field from items array
 */
export function removeFieldFromItems(items: FormItem[], fieldId: string): FormItem[] {
  return items
    .map((item) => {
      if (item.type === 'section') {
        return {
          ...item,
          data: {
            ...item.data,
            fields: item.data.fields.filter((f) => f.id !== fieldId),
          },
        };
      }
      return item;
    })
    .filter((item) => !(item.type === 'field' && item.data.id === fieldId));
}

/**
 * Get all fields from items (flattened)
 */
export function getAllFields(items: FormItem[]): FieldData[] {
  const fields: FieldData[] = [];
  items.forEach((item) => {
    if (item.type === 'section') {
      fields.push(...item.data.fields);
    } else {
      fields.push(item.data);
    }
  });
  return fields;
}

/**
 * Count total fields
 */
export function countFields(items: FormItem[]): number {
  return getAllFields(items).length;
}

/**
 * Validate field data
 */
export function validateFieldData(field: Partial<FieldData>): string[] {
  const errors: string[] = [];

  if (!field.label || field.label.trim().length === 0) {
    errors.push('Label is required');
  }

  if (!field.dataType) {
    errors.push('Data type is required');
  }

  if (field.dataType === DataTypes.SELECT && (!field.selectOptions || field.selectOptions.length === 0)) {
    errors.push('Select fields require at least one option');
  }

  return errors;
}

/**
 * Find section containing a field
 */
export function findSectionByFieldId(items: FormItem[], fieldId: string): SectionData | null {
  for (const item of items) {
    if (item.type === 'section') {
      const hasField = item.data.fields.some((f) => f.id === fieldId);
      if (hasField) return item.data;
    }
  }
  return null;
}

/**
 * Check if field is standalone (not in a section)
 */
export function isStandaloneField(items: FormItem[], fieldId: string): boolean {
  return items.some((item) => item.type === 'field' && item.data.id === fieldId);
}
