/**
 * Equipment Inspection Mock Data
 *
 * Realistic mock data for equipment inspection use case.
 * Covers various equipment types, inspection scenarios, and field configurations.
 *
 * This file contains:
 * - System and custom field definitions (FieldData interface)
 * - Field library items for the drawer
 * - Helper utilities
 */

import type { FieldData } from '@/features/FormFields';
import { iconMapping } from '@/constants/iconMapping';

export interface MockSection {
  id: string;
  name: string;
  isExpanded: boolean;
  isSystem: boolean;
  fields: MockField[];
}

export interface MockField {
  id: string;
  label: string;
  type: string;
  isSystemField: boolean;
  fieldData?: any;
}

export interface FieldLibraryItem {
  id: string;
  label: string;
  type: 'system' | 'custom' | 'section';
  iconType: keyof typeof iconMapping | null;
}

/**
 * Equipment Inspection Sections
 *
 * Organized following Miller's Law (5-7 items per section)
 * System section contains mandatory fields (Title, Description, Status)
 * Custom sections contain inspection-specific fields
 */
export const equipmentInspectionSections: MockSection[] = [
  {
    id: 'section-system',
    name: 'System',
    isExpanded: true,
    isSystem: true,
    fields: [
      {
        id: 'field-title',
        label: 'Title',
        type: 'STRING',
        isSystemField: true,
      },
      {
        id: 'field-description',
        label: 'Description',
        type: 'TEXT',
        isSystemField: true,
      },
      {
        id: 'field-status',
        label: 'Status',
        type: 'SELECT',
        isSystemField: true,
        fieldData: {
          selectOptions: [
            { id: 1, value: 'Open', label: 'Open', color: '#818181' },
            { id: 2, value: 'In Progress', label: 'In Progress', color: '#1890ff' },
            { id: 3, value: 'Completed', label: 'Completed', color: '#52c41a' },
            { id: 4, value: 'Failed', label: 'Failed', color: '#ff4d4f' },
          ],
        },
      },
    ],
  },
  {
    id: 'section-equipment-details',
    name: 'Equipment Details',
    isExpanded: false,
    isSystem: false,
    fields: [
      {
        id: 'field-equipment-id',
        label: 'Equipment ID',
        type: 'STRING',
        isSystemField: false,
      },
      {
        id: 'field-equipment-type',
        label: 'Equipment Type',
        type: 'SELECT',
        isSystemField: false,
        fieldData: {
          selectOptions: [
            { id: 1, value: 'Forklift', label: 'Forklift' },
            { id: 2, value: 'Crane', label: 'Crane' },
            { id: 3, value: 'Generator', label: 'Generator' },
            { id: 4, value: 'Compressor', label: 'Compressor' },
            { id: 5, value: 'Other', label: 'Other' },
          ],
        },
      },
      {
        id: 'field-manufacturer',
        label: 'Manufacturer',
        type: 'STRING',
        isSystemField: false,
      },
      {
        id: 'field-model-number',
        label: 'Model Number',
        type: 'STRING',
        isSystemField: false,
      },
      {
        id: 'field-serial-number',
        label: 'Serial Number',
        type: 'STRING',
        isSystemField: false,
      },
      {
        id: 'field-installation-date',
        label: 'Installation Date',
        type: 'DATE',
        isSystemField: false,
      },
    ],
  },
  {
    id: 'section-inspection-checklist',
    name: 'Inspection Checklist',
    isExpanded: false,
    isSystem: false,
    fields: [
      {
        id: 'field-visual-inspection',
        label: 'Visual Inspection Passed',
        type: 'BOOLEAN',
        isSystemField: false,
      },
      {
        id: 'field-operational-test',
        label: 'Operational Test Passed',
        type: 'BOOLEAN',
        isSystemField: false,
      },
      {
        id: 'field-safety-check',
        label: 'Safety Check Passed',
        type: 'BOOLEAN',
        isSystemField: false,
      },
      {
        id: 'field-fluid-levels',
        label: 'Fluid Levels OK',
        type: 'BOOLEAN',
        isSystemField: false,
      },
      {
        id: 'field-damage-assessment',
        label: 'Damage Assessment',
        type: 'MULTIPLE_CHOICE',
        isSystemField: false,
        fieldData: {
          selectOptions: [
            { id: 1, value: 'None', label: 'None' },
            { id: 2, value: 'Minor', label: 'Minor' },
            { id: 3, value: 'Moderate', label: 'Moderate' },
            { id: 4, value: 'Severe', label: 'Severe' },
          ],
        },
      },
    ],
  },
  {
    id: 'section-maintenance',
    name: 'Maintenance & Repairs',
    isExpanded: false,
    isSystem: false,
    fields: [
      {
        id: 'field-last-maintenance',
        label: 'Last Maintenance Date',
        type: 'DATE',
        isSystemField: false,
      },
      {
        id: 'field-next-maintenance',
        label: 'Next Maintenance Due',
        type: 'DATE',
        isSystemField: false,
      },
      {
        id: 'field-repairs-needed',
        label: 'Repairs Needed',
        type: 'TEXT',
        isSystemField: false,
      },
      {
        id: 'field-parts-required',
        label: 'Parts Required',
        type: 'TAGS',
        isSystemField: false,
      },
    ],
  },
  {
    id: 'section-documentation',
    name: 'Documentation',
    isExpanded: false,
    isSystem: false,
    fields: [
      {
        id: 'field-photos',
        label: 'Equipment Photos',
        type: 'FILE_LIST',
        isSystemField: false,
      },
      {
        id: 'field-inspector-signature',
        label: 'Inspector Signature',
        type: 'SIGNATURE',
        isSystemField: false,
      },
      {
        id: 'field-inspector-name',
        label: 'Inspector Name',
        type: 'PEOPLE',
        isSystemField: false,
      },
      {
        id: 'field-inspection-date',
        label: 'Inspection Date',
        type: 'DATE',
        isSystemField: false,
      },
    ],
  },
];

// ============================================================================
// FORM BUILDER MOCK DATA (Detailed FieldData)
// ============================================================================

/**
 * System Section Fields
 * These are mandatory fields that appear in every form
 */
export const systemFields: FieldData[] = [
  {
    id: 1,
    creatorId: 1,
    dataType: 'text',
    description: null,
    descriptionIntl: null,
    helper: null,
    helperTextIntl: null,
    iconName: null,
    instructionText: null,
    isRequired: true,
    isSystem: true,
    isVisible: true,
    key: 'title',
    label: 'Title',
    logics: null,
    lookupSettings: null,
    position: 0,
    readOnly: false,
    selectOptions: null,
    defaultValue: null,
    attachmentSettings: null,
    remarkSettings: null,
    settings: null,
    shownInList: true,
    typeId: 1,
    validations: null,
    layoutWebFormPosition: null,
    layoutMobileFormPosition: null,
    layoutCaseListPosition: null,
    layoutPrintPosition: null,
    layoutCaseCardVisibility: true,
    linkableAppIds: null,
    linkableAppMapping: null,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15'),
    deletedAt: null,
  },
  {
    id: 2,
    creatorId: 1,
    dataType: 'paragraph',
    description: null,
    descriptionIntl: null,
    helper: null,
    helperTextIntl: null,
    iconName: null,
    instructionText: null,
    isRequired: false,
    isSystem: true,
    isVisible: true,
    key: 'description',
    label: 'Description',
    logics: null,
    lookupSettings: null,
    position: 1,
    readOnly: false,
    selectOptions: null,
    defaultValue: null,
    attachmentSettings: null,
    remarkSettings: null,
    settings: null,
    shownInList: false,
    typeId: 2,
    validations: null,
    layoutWebFormPosition: null,
    layoutMobileFormPosition: null,
    layoutCaseListPosition: null,
    layoutPrintPosition: null,
    layoutCaseCardVisibility: false,
    linkableAppIds: null,
    linkableAppMapping: null,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15'),
    deletedAt: null,
  },
  {
    id: 3,
    creatorId: 1,
    dataType: 'select',
    description: null,
    descriptionIntl: null,
    helper: null,
    helperTextIntl: null,
    iconName: null,
    instructionText: null,
    isRequired: true,
    isSystem: true,
    isVisible: true,
    key: 'status',
    label: 'Status',
    logics: null,
    lookupSettings: null,
    position: 2,
    readOnly: false,
    selectOptions: [
      { id: 1, label: 'Open', value: 'open', color: '#818181' },
      { id: 2, label: 'In Progress', value: 'in_progress', color: '#1890ff' },
      { id: 3, label: 'Completed', value: 'completed', color: '#52c41a' },
      { id: 4, label: 'Failed', value: 'failed', color: '#f5222d' },
    ],
    defaultValue: 'open',
    attachmentSettings: null,
    remarkSettings: null,
    settings: null,
    shownInList: true,
    typeId: 3,
    validations: null,
    layoutWebFormPosition: null,
    layoutMobileFormPosition: null,
    layoutCaseListPosition: null,
    layoutPrintPosition: null,
    layoutCaseCardVisibility: true,
    linkableAppIds: null,
    linkableAppMapping: null,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15'),
    deletedAt: null,
  },
  {
    id: 7,
    creatorId: 1,
    dataType: 'select',
    description: null,
    descriptionIntl: null,
    helper: null,
    helperTextIntl: null,
    iconName: null,
    instructionText: null,
    isRequired: true,
    isSystem: true,
    isVisible: true,
    key: 'privacy',
    label: 'Privacy',
    logics: null,
    lookupSettings: null,
    position: 3,
    readOnly: false,
    selectOptions: [
      { id: 1, label: 'Public', value: 'public', color: '#52c41a' },
      { id: 2, label: 'Private', value: 'private', color: '#f5222d' },
      { id: 3, label: 'Team Only', value: 'team', color: '#1890ff' },
    ],
    defaultValue: 'team',
    attachmentSettings: null,
    remarkSettings: null,
    settings: null,
    shownInList: true,
    typeId: 3,
    validations: null,
    layoutWebFormPosition: null,
    layoutMobileFormPosition: null,
    layoutCaseListPosition: null,
    layoutPrintPosition: null,
    layoutCaseCardVisibility: true,
    linkableAppIds: null,
    linkableAppMapping: null,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15'),
    deletedAt: null,
  },
];

/**
 * Equipment Section Fields
 * Custom fields specific to equipment inspection
 */
export const equipmentFields: FieldData[] = [
  {
    id: 4,
    creatorId: 1,
    dataType: 'text',
    description: null,
    descriptionIntl: null,
    helper: null,
    helperTextIntl: null,
    iconName: null,
    instructionText: null,
    isRequired: true,
    isSystem: false,
    isVisible: true,
    key: 'equipment_id',
    label: 'Equipment ID',
    logics: null,
    lookupSettings: null,
    position: 0,
    readOnly: false,
    selectOptions: null,
    defaultValue: null,
    attachmentSettings: null,
    remarkSettings: null,
    settings: null,
    shownInList: true,
    typeId: 1,
    validations: null,
    layoutWebFormPosition: null,
    layoutMobileFormPosition: null,
    layoutCaseListPosition: null,
    layoutPrintPosition: null,
    layoutCaseCardVisibility: true,
    linkableAppIds: null,
    linkableAppMapping: null,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15'),
    deletedAt: null,
  },
  {
    id: 5,
    creatorId: 1,
    dataType: 'select',
    description: null,
    descriptionIntl: null,
    helper: null,
    helperTextIntl: null,
    iconName: null,
    instructionText: null,
    isRequired: true,
    isSystem: false,
    isVisible: true,
    key: 'equipment_type',
    label: 'Equipment Type',
    logics: null,
    lookupSettings: null,
    position: 1,
    readOnly: false,
    selectOptions: [
      { id: 1, label: 'Forklift', value: 'forklift', color: '#1890ff' },
      { id: 2, label: 'Crane', value: 'crane', color: '#52c41a' },
      { id: 3, label: 'Pallet Jack', value: 'pallet_jack', color: '#faad14' },
      { id: 4, label: 'Conveyor Belt', value: 'conveyor_belt', color: '#722ed1' },
    ],
    defaultValue: 'forklift',
    attachmentSettings: null,
    remarkSettings: null,
    settings: null,
    shownInList: true,
    typeId: 3,
    validations: null,
    layoutWebFormPosition: null,
    layoutMobileFormPosition: null,
    layoutCaseListPosition: null,
    layoutPrintPosition: null,
    layoutCaseCardVisibility: true,
    linkableAppIds: null,
    linkableAppMapping: null,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15'),
    deletedAt: null,
  },
];

/**
 * Field Library Items
 * Items displayed in the field drawer for drag-and-drop
 * Following Miller's Law with logical grouping
 */
export const fieldLibraryItems: FieldLibraryItem[] = [
  // Sections - Always at the top
  { id: 'new_section', label: 'New Section', type: 'section', iconType: 'SECTION' },

  // System Fields
  { id: 'title', label: 'Title', type: 'system', iconType: 'TEXT' },
  { id: 'status', label: 'Status', type: 'system', iconType: 'SELECT' },
  { id: 'site', label: 'Site', type: 'system', iconType: 'LOCATION' },

  // Custom Fields
  { id: 'text', label: 'Description', type: 'custom', iconType: 'TEXT' },
  { id: 'date', label: 'Date', type: 'custom', iconType: 'DATE' },
  { id: 'ocr', label: 'Extracted Texts', type: 'custom', iconType: 'OCR' },
  { id: 'tags', label: 'Tags', type: 'custom', iconType: 'TAGS' },
  { id: 'string', label: 'Text Field', type: 'custom', iconType: 'STRING' },
  { id: 'double', label: 'Number', type: 'custom', iconType: 'DOUBLE' },
  { id: 'boolean', label: 'Toggle', type: 'custom', iconType: 'BOOLEAN' },
  { id: 'checkbox', label: 'Checkbox', type: 'custom', iconType: 'CHECKBOX' },
  { id: 'select', label: 'Dropdown', type: 'custom', iconType: 'SELECT' },
  { id: 'location', label: 'Location', type: 'custom', iconType: 'LOCATION' },
  { id: 'people', label: 'People', type: 'custom', iconType: 'PEOPLE' },
  { id: 'privacy_id', label: 'Privacy', type: 'custom', iconType: 'PRIVACY_ID' },
  { id: 'people_list', label: 'People List', type: 'custom', iconType: 'PEOPLE_LIST' },
  { id: 'signature', label: 'Signature', type: 'custom', iconType: 'SIGNATURE' },
  { id: 'time', label: 'Time', type: 'custom', iconType: 'TIME' },
  { id: 'file_list', label: 'Custom Files', type: 'custom', iconType: 'FILE_LIST' },
  { id: 'aris_cart', label: 'Reference List', type: 'custom', iconType: 'ARIS_CART' },
  { id: 'reference', label: 'Reference', type: 'custom', iconType: 'REFERENCE' },
  { id: 'schedule', label: 'Schedule', type: 'custom', iconType: 'SCHEDULE' },
  { id: 'tags_dropdown', label: 'Tags Dropdown', type: 'custom', iconType: 'TAGS_DROPDOWN' },
  { id: 'multiple_choice', label: 'Multiple Choice', type: 'custom', iconType: 'MULTIPLE_CHOICE' },
];
