/**
 * Form Builder v3 - TypeScript Interfaces
 *
 * TYPE DEFINITIONS:
 * - Insertion pattern overlay system types
 * - Section and field data models
 * - State management interfaces
 * - Event handler signatures
 */

/**
 * Field Data Structure (Flat Nested Architecture)
 * Represents both regular fields and sections.
 * Sections are fields with type: 'SECTION' and contain children array.
 * Order is determined by array position (no explicit position property).
 */
export interface FieldData {
  id: string;
  label: string;
  type: FieldType;

  // Section-specific properties (when type === 'SECTION')
  children?: FieldData[]; // Fields belonging to this section
  isExpanded?: boolean;
  isSystem?: boolean;

  // Field-specific properties (when type !== 'SECTION')
  key?: string; // Field key for API reference (e.g., 'status', 'c123_customField')
  isRequired?: boolean;
  isSystemField?: boolean;
  dataTypeLocked?: boolean; // Whether the data type has been locked (cannot be changed after save)
  placeholder?: string;
  helpText?: string;
  options?: string[]; // For select, radio, checkbox fields
  validation?: ValidationRule[];
}

/**
 * Field Type Enum
 * All supported field types in the form builder
 * Using DataType values from FormFields
 */
export type FieldType =
  // Section Type
  | 'SECTION'
  // System Fields
  | 'FILES'
  | 'STATUS_ID'
  | 'TAGS'
  | 'PRIVACY_ID'
  | 'WATCHERS'
  | 'SITE'
  | 'MEM_ID'
  | 'REF_ID'
  | 'TYPE_ID'
  // Custom Fields
  | 'STRING'
  | 'TEXT'
  | 'BOOLEAN'
  | 'CHECKBOX'
  | 'SELECT'
  | 'DATE'
  | 'TIME'
  | 'DOUBLE'
  | 'LOCATION'
  | 'PEOPLE'
  | 'PEOPLE_LIST'
  | 'SIGNATURE'
  | 'FILE_LIST'
  | 'MULTIPLE_CHOICE'
  | 'TAGS_DROPDOWN'
  // Legacy lowercase types (for backward compatibility)
  | 'text'
  | 'textarea'
  | 'number'
  | 'email'
  | 'phone'
  | 'date'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'file'
  | 'signature';

/**
 * Validation Rule
 * Configuration for field validation
 */
export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: string | number;
  message?: string;
}

/**
 * Legacy Section Data Structure
 * @deprecated Use FieldData with type: 'SECTION' instead
 * Kept for migration purposes
 */
export interface SectionData {
  id: string;
  name: string;
  isExpanded: boolean;
  isSystem?: boolean;
  fields: FieldData[];
  order: number;
}

/**
 * Legacy Form Item Type
 * @deprecated Use FieldData array directly instead
 */
export type FormItem =
  | { type: 'section'; data: SectionData }
  | { type: 'field'; data: FieldData };

/**
 * Form Builder State
 * Complete state for the form builder feature
 */
export interface FormBuilderState {
  items: FieldData[]; // Root-level items: standalone fields and sections (with children)
  selectedFieldId: string | null;
  insertion: InsertionState;
}

/**
 * Insertion State
 * Tracks the current insertion zone state
 */
export interface InsertionState {
  activeZone: InsertionZoneId | null;
  targetPosition: InsertionPosition | null;
  isShowingZones: boolean;
}

/**
 * Insertion Zone Identifier
 * Unique identifier for each insertion zone
 */
export interface InsertionZoneId {
  type: InsertionZoneType;
  sectionId?: string;
  fieldId?: string;
  position: 'before' | 'after' | 'inside';
}

/**
 * Insertion Zone Type
 * Categories of insertion zones
 */
export type InsertionZoneType =
  | 'between-fields' // Between two fields in a section
  | 'section-end' // At the end of a section
  | 'between-sections' // Between two sections
  | 'form-start' // At the beginning of the form
  | 'form-end'; // At the end of the form

/**
 * Insertion Position
 * Calculated position for inserting new items
 */
export interface InsertionPosition {
  sectionId?: string; // Target section (if inserting field)
  sectionIndex?: number; // Target section index (if inserting section)
  fieldIndex?: number; // Target field index (if inserting field)
}

/**
 * Insertion Zone Props
 * Props for individual InsertionZone components
 */
export interface InsertionZoneProps {
  id: InsertionZoneId;
  isActive: boolean;
  isVisible: boolean;
  onActivate: (id: InsertionZoneId) => void;
  onDeactivate: () => void;
  onInsertField: (position: InsertionPosition) => void;
  onInsertSection: (position: InsertionPosition) => void;
}

/**
 * Insertion Overlay Props
 * Props for the InsertionOverlay manager component
 */
export interface InsertionOverlayProps {
  items: FormItem[]; // Changed from sections to items (supports both sections and standalone fields)
  isEnabled: boolean;
  onInsertField: (position: InsertionPosition) => void;
  onInsertSection: (position: InsertionPosition) => void;
}

/**
 * Section List Props
 * Props for the SectionList component
 * Works with flat nested FieldData structure
 */
export interface SectionListProps {
  items: FieldData[]; // Root-level items: standalone fields and sections
  onSectionToggle: (sectionId: string) => void;
  onSectionRename: (sectionId: string, newLabel: string) => void;
  onSectionDelete: (sectionId: string) => void;
  onSectionReorder: (sectionId: string, newIndex: number) => void;
  onFieldLabelChange: (fieldId: string, newLabel: string) => void;
  onFieldEdit: (fieldId: string) => void;
  onFieldMenuClick: (fieldId: string) => void;
  onFieldDelete: (fieldId: string) => void; // Delete standalone field
  onFieldReorder: (fieldId: string, sourceSectionId: string | null, targetSectionId: string | null, newIndex: number) => void; // Updated signature
  onFieldMoveToStandalone: (fieldId: string, sourceSectionId: string | null, targetIndex: number) => void; // Move field to standalone
  onStandaloneFieldToSection: (fieldId: string, targetSectionId: string, targetIndex: number) => void; // Move standalone field into section
  onAddField: (sectionId: string) => void;
  onInsertField: (position: InsertionPosition) => void; // Insert field at specific position in section
  onInsertSection: (position: InsertionPosition, withField?: boolean) => void;
  onInsertStandaloneField: (position: InsertionPosition) => void; // Insert standalone field
}

/**
 * Field List Props
 * Props for the FieldList component within a section
 * Note: Reordering handled through FormBuilder's drag-drop handler
 */
export interface FieldListProps {
  sectionId: string;
  fields: FieldData[];
  isExpanded: boolean;
  isFieldDragging?: boolean;
  onFieldLabelChange?: (fieldId: string, newLabel: string) => void;
  onFieldEdit?: (fieldId: string) => void;
  onFieldMenuClick?: (fieldId: string) => void;
  onAddField?: () => void;
  onInsertField?: (index: number) => void; // Insert field at specific index
  onAddSection?: () => void; // Add section after this section (for section-end insertion zone)
}

/**
 * Mobile Preview Props
 * Props for the MobilePreview component
 */
export interface MobilePreviewProps {
  items: FieldData[]; // Root-level items with nested children
  onFieldChange?: (fieldId: string, value: any) => void;
}

/**
 * Form Builder Props
 * Main Form Builder component props
 */
export interface FormBuilderProps {
  initialSections?: SectionData[]; // Legacy support - will be converted to new format
  initialItems?: FieldData[]; // New: direct FieldData items
  onSave?: (items: FieldData[]) => void; // Returns new format
  onCancel?: () => void;
  showMobilePreview?: boolean;
}

/**
 * Drag and Drop Context
 * Context data for drag and drop operations
 */
export interface DragContext {
  activeId: string | null;
  activeType: 'section' | 'field' | null;
  overId: string | null;
  overType: 'section' | 'field' | null;
}

/**
 * Type Guards
 */
export const isSection = (field: FieldData): field is FieldData & { type: 'SECTION'; children: FieldData[] } => {
  return field.type === 'SECTION';
};

export const isRegularField = (field: FieldData): boolean => {
  return field.type !== 'SECTION';
};
