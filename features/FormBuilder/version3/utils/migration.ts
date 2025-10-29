/**
 * Migration Utilities
 * Convert between old SectionData format and new nested FieldData format
 */

import { FieldData, SectionData } from '../types';
import { DataTypes } from '@/constants/dataTypes';

/**
 * Convert legacy SectionData array to new nested FieldData array
 *
 * Old format:
 * SectionData[] { id, name, fields: FieldData[] }
 *
 * New format:
 * FieldData[] where sections are FieldData with type='SECTION' and children array
 */
export const migrateSectionsToItems = (sections: SectionData[]): FieldData[] => {
  return sections.map((section) => ({
    id: section.id,
    label: section.name, // Rename 'name' to 'label'
    type: 'SECTION' as const,
    isExpanded: section.isExpanded,
    isSystem: section.isSystem,
    children: section.fields, // Children order is determined by array position
  }));
};

/**
 * Convert new nested FieldData array back to legacy SectionData format
 * Used for backward compatibility when saving
 */
export const migrateItemsToSections = (items: FieldData[]): SectionData[] => {
  return items
    .filter((item) => item.type === 'SECTION')
    .map((section, index) => ({
      id: section.id,
      name: section.label,
      isExpanded: section.isExpanded ?? true,
      isSystem: section.isSystem,
      fields: section.children ?? [],
      order: index,
    }));
};

/**
 * Create a new section field
 */
export const createSectionField = (
  name: string,
  isSystem: boolean = false,
  children: FieldData[] = []
): FieldData => ({
  id: `section-${Date.now()}`,
  label: name,
  type: 'SECTION',
  isExpanded: true,
  isSystem,
  children,
});

/**
 * Create a new regular field
 */
export const createRegularField = (
  label: string,
  type: string = DataTypes.STRING,
  isSystemField: boolean = false
): FieldData => ({
  id: `field-${Date.now()}`,
  label,
  type: type as any,
  isRequired: false,
  isSystemField,
});

/**
 * Find a field by ID in nested structure (searches all sections and root level)
 */
export const findFieldById = (items: FieldData[], fieldId: string): FieldData | null => {
  for (const item of items) {
    if (item.id === fieldId) {
      return item;
    }
    // Search in children if this is a section
    if (item.type === 'SECTION' && item.children) {
      const found = findFieldById(item.children, fieldId);
      if (found) return found;
    }
  }
  return null;
};

/**
 * Find parent section ID of a field (null if field is at root level)
 */
export const findParentSectionId = (items: FieldData[], fieldId: string): string | null => {
  for (const item of items) {
    if (item.type === 'SECTION' && item.children) {
      if (item.children.some((f) => f.id === fieldId)) {
        return item.id;
      }
      // Recursively search nested sections (if supported in future)
      const found = findParentSectionId(item.children, fieldId);
      if (found) return found;
    }
  }
  return null;
};

/**
 * Get all fields in a section (including nested)
 */
export const getFieldsInSection = (items: FieldData[], sectionId: string): FieldData[] => {
  const section = items.find((item) => item.id === sectionId && item.type === 'SECTION');
  return section?.children ?? [];
};

/**
 * No-op function kept for backward compatibility
 * Position is now determined by array index, not explicit property
 */
export const reorderPositions = (fields: FieldData[]): FieldData[] => {
  return fields;
};
