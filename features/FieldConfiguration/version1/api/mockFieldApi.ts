/**
 * Mock Field API
 *
 * Simulates backend API calls for field configuration operations.
 * All functions return promises with realistic delays to mimic network requests.
 *
 * UX PRINCIPLES APPLIED:
 * - Realistic delays: Simulates actual API response times
 * - Console logging: Provides feedback during development
 * - Error simulation: Allows testing error states
 *
 * USAGE:
 * - Import functions in hooks or components
 * - Use with async/await or .then()
 * - Check console for "Mock API:" prefixed logs
 */

import { FieldData } from '@/features/FormBuilder/version3/types';

/**
 * Update Field
 *
 * Updates specific properties of a field.
 * Simulates PATCH /api/fields/:fieldId
 *
 * @param fieldId - Field identifier
 * @param updates - Partial field data to update
 * @returns Promise resolving to updated field data
 */
export const updateField = async (
  fieldId: string,
  updates: Partial<FieldData>
): Promise<FieldData> => {
  console.log('Mock API: Updating field', fieldId, 'with', updates);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Return merged field data (in real API, would come from server)
  const updatedField: FieldData = {
    id: fieldId,
    label: updates.label || 'Field',
    type: updates.type || 'STRING',
    ...updates,
  };

  console.log('Mock API: Field updated successfully', updatedField);

  return updatedField;
};

/**
 * Lock Data Type
 *
 * Locks the data type of a field, preventing future changes.
 * Simulates POST /api/fields/:fieldId/lock-data-type
 *
 * @param fieldId - Field identifier
 * @returns Promise resolving when lock is successful
 */
export const lockDataType = async (fieldId: string): Promise<void> => {
  console.log('Mock API: Locking data type for field', fieldId);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log('Mock API: Data type locked successfully for field', fieldId);
};

/**
 * Delete Field
 *
 * Deletes a field from the form.
 * Simulates DELETE /api/fields/:fieldId
 *
 * @param fieldId - Field identifier
 * @returns Promise resolving when deletion is successful
 */
export const deleteField = async (fieldId: string): Promise<void> => {
  console.log('Mock API: Deleting field', fieldId);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  console.log('Mock API: Field deleted successfully', fieldId);
};

/**
 * Validate Field Configuration
 *
 * Validates field configuration before saving.
 * Simulates POST /api/fields/validate
 *
 * @param fieldData - Field data to validate
 * @returns Promise resolving to validation result
 */
export const validateFieldConfiguration = async (
  fieldData: Partial<FieldData>
): Promise<{ isValid: boolean; errors: string[] }> => {
  console.log('Mock API: Validating field configuration', fieldData);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const errors: string[] = [];

  // Mock validation logic
  if (!fieldData.label || fieldData.label.trim() === '') {
    errors.push('Label is required');
  }

  if (!fieldData.type) {
    errors.push('Field type is required');
  }

  const isValid = errors.length === 0;

  console.log('Mock API: Validation result', { isValid, errors });

  return { isValid, errors };
};

/**
 * Duplicate Field
 *
 * Creates a duplicate of an existing field.
 * Simulates POST /api/fields/:fieldId/duplicate
 *
 * @param fieldId - Field identifier to duplicate
 * @returns Promise resolving to new duplicated field
 */
export const duplicateField = async (fieldId: string): Promise<FieldData> => {
  console.log('Mock API: Duplicating field', fieldId);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 700));

  // Return duplicated field (mock data)
  const duplicatedField: FieldData = {
    id: `${fieldId}-copy-${Date.now()}`,
    label: 'Field (Copy)',
    type: 'STRING',
  };

  console.log('Mock API: Field duplicated successfully', duplicatedField);

  return duplicatedField;
};
