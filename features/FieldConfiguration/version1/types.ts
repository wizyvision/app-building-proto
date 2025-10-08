/**
 * FieldConfiguration v1 - TypeScript Interfaces
 *
 * TYPE DEFINITIONS:
 * - Field configuration component props
 * - Form data schema for react-hook-form
 * - Section and visibility configuration
 * - Data type lock modal
 */

import { FieldData as FormBuilderFieldData, FieldType } from '@/features/FormBuilder/version3/types';

// Re-export for convenience
export type FieldData = FormBuilderFieldData;

/**
 * Field Configuration Props
 * Main props for the FieldConfiguration drawer component
 */
export interface FieldConfigurationProps {
  /** ID of the field being configured (null to close drawer) */
  fieldId: string | null;
  /** Callback when drawer should close */
  onClose: () => void;
}

/**
 * Field Form Data
 * React Hook Form schema matching FieldData structure
 * Used for form state management and validation
 */
export interface FieldFormData {
  id: string;
  label: string;
  type: FieldType;
  key: string; // Field key identifier (camelCase)
  description: string;
  isRequired: boolean;
  isSystemField: boolean;
  dataTypeLocked: boolean;
  placeholder: string;
  helpText: string;
  options: string[];
  allowMediaAttachments: boolean;
  allowRemarks: boolean;
  requireUniqueValues: boolean; // Only for title field
  // Field visibility flags
  visibleOnWeb: boolean;
  visibleOnMobile: boolean;
  visibleOnPrint: boolean;
  visibleInList: boolean;
}

/**
 * Data Type Lock Modal Props
 * Props for confirmation modal when locking field type
 */
export interface DataTypeLockModalProps {
  /** Whether modal is open */
  open: boolean;
  /** Field type being locked */
  fieldType: FieldType;
  /** Callback when user cancels */
  onClose: () => void;
  /** Callback when user confirms lock */
  onConfirm: () => void;
  /** Whether lock operation is in progress */
  isLoading?: boolean;
}

/**
 * Data Type Lock Warning Props
 * Props for warning banner about data type locking
 */
export interface DataTypeLockWarningProps {
  /** Whether the data type is already locked */
  isLocked: boolean;
  /** Field type that will be locked */
  fieldType: FieldType;
}

/**
 * Property Section Props
 * Props for collapsible section wrapper (Accordion-based)
 */
export interface PropertySectionProps {
  /** Section title */
  title: string;
  /** Whether section is expanded by default */
  defaultExpanded?: boolean;
  /** Children components to render inside section */
  children: React.ReactNode;
  /** Optional icon to show before title */
  icon?: React.ReactNode;
}

/**
 * Field Visibility Configuration
 * Tracks where field should be visible
 */
export interface FieldVisibility {
  web: boolean;
  mobile: boolean;
  print: boolean;
  list: boolean;
}

/**
 * General Settings Props
 * Props for the GeneralSettings section component
 */
export interface GeneralSettingsProps {
  /** Whether this is the title field (shows unique values option) */
  isTitleField?: boolean;
}

/**
 * Field Configuration Section
 * Union type for different configuration sections
 */
export type FieldConfigurationSection =
  | 'general'
  | 'advanced'
  | 'logic'
  | 'validation'
  | 'scanner';

/**
 * Field Mutation State
 * State for field update operations
 */
export interface FieldMutationState {
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: Error | null;
}

/**
 * useFieldConfiguration Return Type
 * Return type for the useFieldConfiguration hook
 */
export interface UseFieldConfigurationReturn {
  formMethods: any; // react-hook-form methods
  watchedValues: FieldFormData; // Current form values
}

/**
 * useFieldMutation Return Type
 * Return type for the useFieldMutation hook
 */
export interface UseFieldMutationReturn {
  mutate: (updates: Partial<FieldData>) => Promise<void>;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: Error | null;
}
