/**
 * Type Conversion Utilities
 *
 * Shared utilities for converting between FormBuilder types and FormFields types.
 * Eliminates duplication across SectionList and FieldList components.
 */

import type { FieldData as FormFieldsFieldData } from '@/features/FormFields';

/**
 * Convert FormBuilder FieldData to FormFields FieldData
 *
 * Maps the simplified FormBuilder field structure to the full
 * FormFields interface required by Field components.
 */
export const convertToFormFieldsFieldData = (field: any): FormFieldsFieldData => {
  return {
    ...field,
    creatorId: 0,
    dataType: field.type?.toUpperCase() || 'TEXT',
    description: null,
    descriptionIntl: null,
    helper: null,
    helperTextIntl: null,
    iconName: null,
    instructionText: null,
    isRequired: field.isRequired || false,
    isSystem: field.isSystemField || false,
    isVisible: true,
    key: `field_${field.id}`,
    logics: null,
    lookupSettings: null,
    position: 0,
    readOnly: false,
    selectOptions: null,
    defaultValue: null,
    attachmentSettings: null,
    remarkSettings: null,
    settings: null,
    shownInList: false,
    typeId: 0,
    validations: null,
    layoutWebFormPosition: null,
    layoutMobileFormPosition: null,
    layoutCaseListPosition: null,
    layoutPrintPosition: null,
    layoutCaseCardVisibility: false,
    linkableAppIds: null,
    linkableAppMapping: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  } as FormFieldsFieldData;
};
