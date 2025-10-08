/**
 * Section Helpers - Reusable section operations
 *
 * Clean, testable utility functions for common section operations
 */

import type { FormItem, SectionData } from '../types';

/**
 * Find section by ID in items array
 */
export function findSectionById(items: FormItem[], sectionId: string): SectionData | null {
  const section = items.find((item) => item.type === 'section' && item.data.id === sectionId);
  return section && section.type === 'section' ? section.data : null;
}

/**
 * Update section in items array
 */
export function updateSectionInItems(
  items: FormItem[],
  sectionId: string,
  updates: Partial<SectionData>
): FormItem[] {
  return items.map((item) => {
    if (item.type === 'section' && item.data.id === sectionId) {
      return {
        ...item,
        data: {
          ...item.data,
          ...updates,
        },
      };
    }
    return item;
  });
}

/**
 * Remove section from items array
 */
export function removeSectionFromItems(items: FormItem[], sectionId: string): FormItem[] {
  return items.filter((item) => !(item.type === 'section' && item.data.id === sectionId));
}

/**
 * Count total sections
 */
export function countSections(items: FormItem[]): number {
  return items.filter((item) => item.type === 'section').length;
}

/**
 * Get all sections from items array
 */
export function getAllSections(items: FormItem[]): SectionData[] {
  return items.filter((item) => item.type === 'section').map((item) => item.data as SectionData);
}

/**
 * Check if section is empty (no fields)
 */
export function isSectionEmpty(section: SectionData): boolean {
  return section.fields.length === 0;
}

/**
 * Rename section
 */
export function renameSection(items: FormItem[], sectionId: string, newTitle: string): FormItem[] {
  return updateSectionInItems(items, sectionId, { title: newTitle });
}
