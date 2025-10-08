/**
 * Template System Types
 */

import { DataTypes, DataType } from '@/constants/dataTypes';

/**
 * Template Field - Simplified WizyVision Field for templates
 */
export interface TemplateField {
  // Core
  dataType: DataType;
  key: string;
  label: string;
  isRequired: boolean;
  isSystem: boolean;

  // Optional
  description?: string | null;
  iconName?: string | null;
  placeholder?: string | null;
  helpText?: string | null;
  instructionText?: string | null;
  readOnly?: boolean;
  isVisible?: boolean;
  shownInList?: boolean;

  // Validation (STRING and TEXT only)
  validations?: {
    type: string;
    errorMessage: string;
    details: {
      pattern?: string;
      condition?: string;
      value?: string;
      min?: number;
      max?: number;
    };
  } | null;

  // Logic
  logics?: {
    value: string;
    targetFieldKeys: string[];
  }[] | null;

  // Select Options (SELECT, MULTIPLE_CHOICE)
  selectOptions?: {
    id: string | number;
    value: string;
    position?: number;
  }[] | null;

  // Default Value
  defaultValue?: {
    type: string;
    unit?: string | null;
    value: string | null;
  } | null;

  // Settings (DOUBLE only)
  settings?: {
    unit?: string;
    displayFormat?: 'PERCENT';
    threshold?: { min?: number; max?: number };
    canAddRemarks?: boolean;  // TEXT, FILES, FILE_LIST only
    isTracked?: boolean;      // DOUBLE only
  } | null;

  // Attachment Settings (FILES, FILE_LIST only)
  attachmentSettings?: {
    value: string;          // Accepted MIME types (e.g., 'image/*', 'application/pdf')
    condition: string;      // 'always', 'in', '='
  } | null;

  // Statuses (STATUS_ID only) - Use global status colors from theme
  statuses?: {
    id: number;
    color: string;          // Color from designTokens.colors.status
    name: string;
    displayName?: string;
    position: number;
    systemId: string;
    type: string;
  }[];
}

export interface FieldTemplate {
  id: string;
  name: string;
  description?: string;
  icon: string;
  category: TemplateCategory;
  author: 'system' | 'user' | 'organization';
  fields: TemplateField[];
  metadata: TemplateMetadata;
}

export type TemplateCategory = 'inspection' | 'safety' | 'documentation' | 'custom';

export interface TemplateMetadata {
  createdAt: Date;
  updatedAt: Date;
  usageCount: number;
  lastUsed?: Date;
  tags?: string[];
}

export interface TemplateLibrarySidebarProps {
  onSelectTemplate: (template: FieldTemplate) => void;
}

export interface TemplateCardProps {
  template: FieldTemplate;
  onClick: () => void;
}
