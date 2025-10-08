# FormBuilder v3 Enhancement Plan - UI/UX Design Document
**Product**: WizyVision FormBuilder v3
**Document Type**: UI/UX Design Specification
**Version**: 3.0 (Aligned with Technical Plan v2.0)
**Date**: October 8, 2025
**Author**: UI/UX Team
**Status**: Implementation Ready

---

## Executive Summary

This UI/UX design document aligns with the FormBuilder v3 Technical Implementation Plan, providing comprehensive interface specifications and interaction patterns. The design addresses critical pain points through smart defaults, contextual interfaces, and intelligent assistance features.

**Key Objectives**:
- Reduce form creation time by 40% (45min → 27min)
- Decrease configuration clicks by 50% (120 → 60 clicks)
- Improve developer integration time by 60% (4hrs → 1.5hrs)
- Achieve SUS score > 80

**Technical Alignment**:
- All designs use actual WizyVision DataTypes (no EMAIL/PHONE types)
- Smart defaults auto-configure validation BEFORE user opens Field Configuration
- Template library in left sidebar (not modal) matching FormBuilder v2 pattern
- Global status colors for consistency across all STATUS_ID fields

---

## Table of Contents

1. [Current State Analysis](#current-state-analysis)
2. [Track A: FormBuilder Core Enhancements](#track-a-formbuilder-core-enhancements)
3. [Track B: Field Configuration Evolution](#track-b-field-configuration-evolution)
4. [Implementation Phases](#implementation-phases)
5. [Technical Specifications](#technical-specifications)
6. [Success Metrics](#success-metrics)
7. [Risk Mitigation](#risk-mitigation)

---

## Current State Analysis

### Identified Pain Points

| Issue | Impact | User Affected | Current Time Lost |
|-------|--------|---------------|-------------------|
| Repetitive field creation | High | Sarah (BA) | 15 min/form |
| No undo/redo capability | High | All users | 5-10 min/form |
| Confusing data lock warnings | Medium | Non-technical | Causes hesitation |
| Standalone fields not saved | High | Developers | Data loss risk |
| No field templates | High | Sarah, Marcus | 10-15 min/form |
| Limited customization props | Medium | Alex (Dev) | 2-3 hrs integration |

### Current Architecture
- **Framework**: React + TypeScript + Material UI
- **State Management**: Context API (FormBuilderContext)
- **Drag-Drop**: @dnd-kit/core
- **Components**: Section v3, Field v5, FieldConfiguration v1

---

## Track A: FormBuilder Core Enhancements

### Feature A1: Undo/Redo System

#### Specification

**Objective**: Enable users to reverse/replay actions, reducing anxiety and encouraging experimentation.

**User Stories**:
- As Sarah, I want to undo accidental deletions so I don't lose work
- As Marcus, I want to redo actions when testing configurations
- As Alex, I want keyboard shortcuts for faster editing

#### Technical Requirements

```typescript
interface UndoRedoSystem {
  // Configuration
  config: {
    maxStackSize: 50;
    debounceTime: 500; // ms for text input grouping
    persistToStorage: false; // Future: localStorage
  };

  // Action Types
  actionTypes: 
    | 'ADD_SECTION' | 'DELETE_SECTION' | 'RENAME_SECTION'
    | 'ADD_FIELD' | 'DELETE_FIELD' | 'UPDATE_FIELD'
    | 'REORDER_ITEMS' | 'BULK_UPDATE';

  // Stack Structure
  undoStack: Action[];
  redoStack: Action[];
  
  // Methods
  methods: {
    pushAction(action: Action): void;
    undo(): void;
    redo(): void;
    canUndo(): boolean;
    canRedo(): boolean;
    getUndoDescription(): string;
    getRedoDescription(): string;
    clearStacks(): void;
  };
}
```

#### UI Specification

**Toolbar Integration**:
```
Position: After "Form Builder" title
Layout: [↶ Undo] [↷ Redo] | Divider | Rest of toolbar
States:
  - Enabled: Full opacity, hover effect
  - Disabled: 40% opacity, no hover
  - Tooltip: Shows action description
Keyboard: Cmd/Ctrl+Z (undo), Cmd/Ctrl+Shift+Z (redo)
```

#### Implementation Steps

1. **Week 1**: Create UndoRedoContext provider
2. **Week 1**: Integrate with existing FormBuilderContext
3. **Week 2**: Add toolbar buttons and keyboard handlers
4. **Week 2**: Implement action grouping for text input
5. **Week 2**: Add comprehensive tests

---

### Feature A2: Field Template System

#### Specification

**Objective**: Eliminate repetitive field creation through reusable templates.

**CRITICAL DESIGN CHANGE**: Templates in **left sidebar** (NOT modal), following FormBuilder v2 pattern (Jakob's Law).

**User Stories**:
- As Sarah, I want to reuse common field groups to save 15 minutes per form
- As Marcus, I want to create organization-wide templates for consistency
- As a new user, I want starter templates to understand best practices

#### Data Model (Technical Alignment)

```typescript
interface TemplateField {
  // Core (Required)
  dataType: DataType;           // ✅ Actual WizyVision DataType constant
  key: string;                  // Field identifier (camelCase)
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

  // Select Options (SELECT, MULTIPLE_CHOICE)
  selectOptions?: {
    id: string | number;
    value: string;
    position?: number;
  }[] | null;

  // Settings (type-specific)
  settings?: {
    unit?: string;              // DOUBLE only
    displayFormat?: 'PERCENT';  // DOUBLE only
    threshold?: { min?: number; max?: number };  // DOUBLE only
    canAddRemarks?: boolean;    // TEXT, FILES, FILE_LIST
    isTracked?: boolean;        // DOUBLE only
  } | null;

  // Attachment Settings (FILES, FILE_LIST only)
  attachmentSettings?: {
    value: string;              // MIME types (e.g., 'image/*')
    condition: string;          // 'always', 'in', '='
  } | null;

  // Statuses (STATUS_ID only) - Uses global status colors
  statuses?: {
    id: number;
    color: string;              // ✅ From GLOBAL_STATUS_COLORS constant
    name: string;
    displayName?: string;
    position: number;
    systemId: string;
    type: string;
  }[];
}

interface FieldTemplate {
  id: string;
  name: string;
  description?: string;
  icon: string;
  category: 'inspection' | 'safety' | 'documentation' | 'custom';
  author: 'system' | 'user' | 'organization';
  fields: TemplateField[];     // ✅ Uses complete Field data structure
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    usageCount: number;
    lastUsed?: Date;
    tags?: string[];
  };
}
```

#### UI Layout (Updated)

```
┌────────────────────────────────────────────────────┐
│  Form Builder Toolbar                              │
│  [↶ Undo] [↷ Redo] | [Save] [Cancel]               │
├────────┬──────────────────────────────┬────────────┤
│        │                              │            │
│ TEMPL. │  FORM CANVAS                 │  MOBILE    │
│ SIDEBAR│                              │  PREVIEW   │
│  240px │  Sections & Fields           │   360px    │
│        │                              │            │
│  📋    │  [Section 1]                 │  [Phone]   │
│  Basic │    Field 1                   │            │
│  Insp. │    Field 2                   │            │
│        │                              │            │
│  🛡️    │  [Section 2]                 │            │
│  Safety│    Field 3                   │            │
│        │    Field 4                   │            │
│  📷    │                              │            │
│  Photos│                              │            │
│        │                              │            │
│  📊    │                              │            │
│  Meters│                              │            │
│        │                              │            │
│  ────  │                              │            │
│  MY    │                              │            │
│  (0)   │                              │            │
│        │                              │            │
└────────┴──────────────────────────────┴────────────┘
```

#### UI Components (Revised)

**1. Template Library Sidebar** (NOT Modal)
```
Width: 240px
Position: Left side (persistent)
Background: theme.palette.background[2] (#fafafa)
Border: 1px right border

Sections:
  - Header: "Field Templates" (h6)
  - Recently Used (if any, max 3)
  - System Templates (always visible)
  - User Templates (with empty state)

Each Template Card:
  - Icon (32x32px, colored circle)
  - Name (truncated if needed)
  - Full-width clickable
  - Hover: Slight slide animation (4px right)
  - Click: Insert fields at current position

Interaction:
  - Click template: Inserts immediately
  - No modal/dialog required
  - Fast, one-click insertion
```

**2. Template Card (Sidebar Item)**
```
Size: Full width (224px with padding)
Padding: theme.spacing(1)
Height: Auto (min 40px for Fitts's Law)

Layout:
  ┌─────────────────────────┐
  │ [🔵] Template Name      │
  │ [icon] Short desc...    │
  └─────────────────────────┘

States:
  - Default: background transparent
  - Hover: background action.hover + slide 4px right
  - Active: background action.selected
  - Transition: 200ms ease

Visual Hierarchy:
  - Icon: Primary color circle (32x32px)
  - Name: body2, weight 500
  - Description: body2, text.secondary (optional)
```

**3. Template Creation Flow** (Future Phase)
```
Trigger: Right-click on selected fields → "Save as Template"
Or: Toolbar button "Create Template" (when 2+ fields selected)

Form (Modal):
  - Name (required)
  - Description (optional)
  - Icon picker (emoji or icon)
  - Category (dropdown)
  - Sharing options (future: organization templates)
  - Preview of fields

Actions:
  - [Cancel] [Save Template]
```

#### System Templates (Corrected for Technical Plan)

```typescript
const systemTemplates = [
  {
    name: 'Basic Inspection',
    icon: '📋',
    category: 'inspection',
    fields: [
      {
        dataType: DataTypes.STRING,       // ✅ Uses DataTypes constant
        key: 'c1_inspectorname',          // ✅ Uses camelCase key
        label: 'Inspector Name',
        isRequired: true,
        isSystem: false,
        validations: {                    // ✅ Required validation
          type: 'required',
          errorMessage: 'Inspector name is required',
          details: { condition: 'required' }
        }
      },
      {
        dataType: DataTypes.DATE,         // ✅ DATE type
        key: SystemKeys.CREATED_AT,       // ✅ Uses SystemKeys constant
        label: 'Inspection Date',
        isRequired: true,
        isSystem: true,
      },
      {
        dataType: DataTypes.LOCATION,     // ✅ LOCATION type
        key: 'c2_location',
        label: 'Location',
        isRequired: true,
        isSystem: false,
      },
      {
        dataType: DataTypes.STATUS_ID,    // ✅ STATUS_ID type
        key: SystemKeys.STATUS,           // ✅ Uses SystemKeys constant
        label: 'Status',
        isRequired: true,
        isSystem: true,
        statuses: [                       // ✅ Uses GLOBAL_STATUS_COLORS
          {
            id: 1,
            color: GLOBAL_STATUS_COLORS.PASSED,    // '#4caf50'
            name: 'Passed',
            displayName: 'Passed',
            position: 1,
            systemId: 'passed',
            type: 'status'
          },
          {
            id: 2,
            color: GLOBAL_STATUS_COLORS.FAILED,    // '#f44336'
            name: 'Failed',
            displayName: 'Failed',
            position: 2,
            systemId: 'failed',
            type: 'status'
          },
          {
            id: 3,
            color: GLOBAL_STATUS_COLORS.PENDING,   // '#ff9800'
            name: 'Pending',
            displayName: 'Pending Review',
            position: 3,
            systemId: 'pending',
            type: 'status'
          }
        ]
      }
    ]
  },
  {
    name: 'Safety Checklist',
    icon: '🛡️',
    category: 'safety',
    fields: [
      {
        dataType: DataTypes.SELECT,       // ✅ SELECT for Yes/No
        key: 'c1_ppeworn',
        label: 'PPE Worn?',
        isRequired: true,
        isSystem: false,
        selectOptions: [
          { id: 'yes', value: 'Yes', position: 1 },
          { id: 'no', value: 'No', position: 2 }
        ]
      },
      {
        dataType: DataTypes.SELECT,
        key: 'c2_areasecured',
        label: 'Area Secured?',
        isRequired: true,
        isSystem: false,
        selectOptions: [
          { id: 'yes', value: 'Yes', position: 1 },
          { id: 'no', value: 'No', position: 2 }
        ]
      },
      {
        dataType: DataTypes.TEXT,         // ✅ TEXT for multiline
        key: 'c3_safetynotes',
        label: 'Safety Notes',
        isRequired: false,
        isSystem: false,
        placeholder: 'Describe safety concerns',
        validations: {                    // ✅ TEXT can have validation
          type: 'maxLength',
          errorMessage: 'Safety notes must be less than 500 characters',
          details: {
            condition: 'maxLength',
            max: 500
          }
        },
        settings: {                       // ✅ TEXT can have remarks
          canAddRemarks: true
        }
      }
    ]
  },
  {
    name: 'Evidence Collection',
    icon: '📷',
    category: 'documentation',
    fields: [
      {
        dataType: DataTypes.FILES,        // ✅ FILES (single upload)
        key: 'c1_photobefore',
        label: 'Photo - Before',
        isRequired: false,
        isSystem: false,
        placeholder: 'Upload before photo',
        attachmentSettings: {             // ✅ Image filter
          value: 'image/*',
          condition: 'always'
        },
        settings: {
          canAddRemarks: true             // ✅ Can add remarks
        }
      },
      {
        dataType: DataTypes.FILE_LIST,    // ✅ FILE_LIST (multiple uploads)
        key: 'c2_photoscurrent',
        label: 'Photos - Current State',
        isRequired: false,
        isSystem: false,
        placeholder: 'Upload multiple photos',
        attachmentSettings: {
          value: 'image/*',
          condition: 'always'
        },
        settings: {
          canAddRemarks: true
        }
      },
      {
        dataType: DataTypes.TEXT,
        key: 'c3_evidencenotes',
        label: 'Evidence Notes',
        isRequired: false,
        isSystem: false,
        placeholder: 'Describe evidence and observations',
        settings: {
          canAddRemarks: true
        }
      }
    ]
  },
  {
    name: 'Meter Readings',
    icon: '📊',
    category: 'inspection',
    fields: [
      {
        dataType: DataTypes.DOUBLE,       // ✅ DOUBLE with unit
        key: 'c1_pressure',
        label: 'Pressure Reading (PSI)',
        isRequired: true,
        isSystem: false,
        placeholder: 'Enter pressure value',
        settings: {                       // ✅ DOUBLE settings (NO validation)
          unit: 'PSI',
          threshold: { min: 0, max: 150 },
          isTracked: true
        }
      },
      {
        dataType: DataTypes.DOUBLE,
        key: 'c2_temperature',
        label: 'Temperature (°F)',
        isRequired: true,
        isSystem: false,
        placeholder: 'Enter temperature',
        settings: {
          unit: '°F',
          threshold: { min: -20, max: 200 },
          isTracked: true
        }
      },
      {
        dataType: DataTypes.TEXT,
        key: 'c3_readingnotes',
        label: 'Reading Notes',
        isRequired: false,
        isSystem: false,
        placeholder: 'Additional notes about readings'
      }
    ]
  }
];
```

#### Design Rationale

**Why Sidebar Instead of Modal?**
1. **Jakob's Law**: Familiar pattern from FormBuilder v2, VS Code, Gmail
2. **Faster Access**: Always visible, one click to insert
3. **Better Discoverability**: Templates visible without clicking "Add Template" button
4. **Reduced Clicks**: Modal requires: Click button → Wait for modal → Select template → Click use
5. **Consistent Layout**: Matches existing FormBuilder v2 FieldDrawer pattern

**Visual Hierarchy**:
- Left sidebar: Template library (input/source)
- Center: Form canvas (working area)
- Right sidebar: Mobile preview (output)

---

### Feature A3: Bulk Operations

#### Specification

**Objective**: Enable efficient management of multiple fields simultaneously.

**User Stories**:
- As Sarah, I want to make 5 fields required at once
- As Marcus, I want to apply validation rules to multiple fields
- As any user, I want to delete multiple fields without clicking each one

#### Interaction Model

```typescript
interface BulkOperationMode {
  // Activation
  triggers: {
    keyboard: 'Shift + Click' | 'Cmd/Ctrl + Click';
    ui: 'Toggle multi-select button in toolbar';
    rightClick: 'Context menu → Select Multiple';
  };
  
  // Selection State
  selectedItems: Set<string>; // Field IDs
  
  // Available Actions
  bulkActions: {
    setRequired: (required: boolean) => void;
    setDataType: (type: DataTypes) => void;
    applyValidation: (rules: ValidationRules) => void;
    moveToSection: (sectionId: string) => void;
    duplicate: () => void;
    delete: () => void;
  };
}
```

#### UI Specification

**Selection Visual**:
```css
.field-multi-select {
  background: #E3F2FD;
  border-left: 3px solid #2196F3;
}

.field-checkbox {
  position: absolute;
  left: -24px;
  opacity: 0;
  transition: opacity 0.2s;
}

.field:hover .field-checkbox,
.field-selected .field-checkbox {
  opacity: 1;
}
```

**Floating Action Bar**:
```
Position: Fixed bottom, centered
Appearance: When 2+ items selected
Layout: [Count] | [Actions based on selection type]
Animation: Slide up on appear, slide down on dismiss
```

---

### Feature A4: Smart Section Suggestions

#### Specification

**Objective**: AI-powered grouping suggestions based on field relationships.

**Detection Algorithm**:
```typescript
interface GroupingSuggestion {
  detectRelatedFields(fields: Field[]): FieldGroup[] {
    // Factors analyzed:
    // 1. Naming patterns (prefix/suffix matching)
    // 2. Data type similarity
    // 3. Proximity (fields added consecutively)
    // 4. Common patterns from analytics
    
    return suggestedGroups;
  }
  
  confidenceScore: number; // 0-100
  suggestionThreshold: 70; // Min score to show suggestion
}
```

**Suggestion Triggers**:
- After adding 3+ ungrouped fields
- When 4+ fields in a section could be split
- During form review (optional analysis)

---

## Track B: Field Configuration Evolution

### Feature B1: Smart Type Detection with Auto-Configuration

#### Specification

**Objective**: Automatically detect appropriate field types AND auto-configure smart defaults (validation, settings) based on label patterns.

**CRITICAL DESIGN PRINCIPLE**:
- WizyVision has NO "EMAIL" or "PHONE" data types
- Detection maps labels to **actual DataTypes only** (STRING, DOUBLE, PEOPLE, etc.)
- Smart defaults (validation rules, settings) are **auto-applied BEFORE** user opens Field Configuration
- User can edit/remove auto-configured defaults in Field Configuration drawer

**Pattern Recognition with Smart Defaults**:

```typescript
interface SmartDetectionResult {
  dataType: DataType;           // ALWAYS an actual WizyVision DataType
  confidence: number;            // 0-100
  reasoning: string[];

  // Auto-configured defaults (applied immediately)
  autoConfiguration?: {
    validations?: Validations;        // Email, phone, URL patterns
    selectOptions?: SelectOption[];   // Yes/No for boolean questions
    settings?: SettingsClass;         // Units for measurements
    attachmentSettings?: AttachmentSettings;  // Image filters for photos
    placeholder?: string;             // Smart placeholder text
  };
}
```

#### Detection Patterns

**Email Detection** (NOT an "Email" type):
```
Label: "Inspector Email"
↓
Detected: DataTypes.STRING
Auto-configured:
  - Validation: Email regex pattern
  - Placeholder: "user@example.com"
  - Error message: "Please enter a valid email address"

Visual: [📝 String ▼] (Email validation) ✅
```

**Phone Detection** (NOT a "Phone" type):
```
Label: "Contact Phone"
↓
Detected: DataTypes.STRING
Auto-configured:
  - Validation: Phone regex pattern (US format)
  - Placeholder: "(555) 123-4567"
  - Error message: "Please enter a valid phone number"

Visual: [📝 String ▼] (Phone validation) ✅
```

**Measurement Detection**:
```
Label: "Pressure (PSI)"
↓
Detected: DataTypes.DOUBLE
Auto-configured:
  - Settings.unit: "PSI" (extracted from label)
  - Settings.threshold: { min: 0 }
  - Settings.isTracked: true
  - Placeholder: "Enter value"

Visual: [🔢 Double ▼] (PSI) ✅
```

**Photo Detection**:
```
Label: "Photo Before"
↓
Detected: DataTypes.FILES
Auto-configured:
  - AttachmentSettings.value: "image/*"
  - AttachmentSettings.condition: "always"
  - Settings.canAddRemarks: true
  - Placeholder: "Tap to upload photo"

Visual: [📷 Files ▼] (Image only) ✅
```

**Boolean Question Detection**:
```
Label: "Is Complete?" or "PPE Worn?"
↓
Detected: DataTypes.SELECT
Auto-configured:
  - SelectOptions: [
      { id: 'yes', value: 'Yes', position: 1 },
      { id: 'no', value: 'No', position: 2 }
    ]
  - Placeholder: "Select..."

Visual: [📋 Select ▼] (Yes/No) ✅
```

**People Detection**:
```
Label: "Inspector" or "Technician"
↓
Detected: DataTypes.PEOPLE
Auto-configured:
  - Placeholder: "Select person"

Visual: [👤 People ▼] ✅
```

#### UI Behavior

**Auto-Configuration Flow**:
1. User types label: "Inspector Email"
2. Debounce 500ms
3. System analyzes label pattern
4. If confidence ≥ 85%:
   - Auto-change DataType to STRING
   - Auto-apply email validation
   - Auto-set placeholder
   - Show checkmark badge: ✅ "Email validation"
5. If confidence 60-84%:
   - Show suggestion tooltip: 💡 "Email field detected. Apply validation?"
   - User clicks to confirm
6. If confidence < 60%:
   - Default to STRING, no auto-configuration

**Visual Feedback (Updated)**:
```
High Confidence (Auto-applied):
Label: "Inspector Email"
Type: [📝 String ▼] (Email validation) ✅
Tooltip: "Email validation automatically applied. Edit in Field Configuration."

Medium Confidence (Suggestion):
Label: "Mailing Address"
Type: [📝 String ▼] 💡 Location field detected. Change to LOCATION type?
Action: [Apply] [Dismiss]

Low Confidence (No action):
Label: "Custom Field 1"
Type: [📝 String ▼] (No auto-detection)
```

#### Field Configuration Integration

**Before Opening Field Configuration**:
- Smart defaults already applied (user sees validation badge)
- User can immediately insert field without configuration

**Inside Field Configuration Drawer**:
- All auto-configured settings are visible and editable
- User can modify or remove validation rules
- Clear indication: "Auto-configured based on field label" (info icon)
- Reset button: "Remove smart defaults"

#### Example User Flows

**Flow 1: Email Field (High Confidence)**
```
1. User adds field, types label: "Inspector Email"
2. After 500ms pause:
   - Type auto-changes to STRING
   - Email validation applied (shown with ✅ badge)
   - Placeholder: "user@example.com"
3. User inserts field immediately (no configuration needed)
4. If user opens Field Configuration:
   - Sees validation rule pre-filled
   - Can edit regex pattern, error message
   - Can remove validation entirely
```

**Flow 2: Measurement Field (High Confidence)**
```
1. User adds field, types label: "Pressure (PSI)"
2. After 500ms pause:
   - Type auto-changes to DOUBLE
   - Unit extracted: "PSI"
   - Threshold set: min=0
   - isTracked: true
3. User inserts field
4. Field Configuration shows:
   - Unit: "PSI" (editable)
   - Threshold settings pre-filled
   - Tracking enabled
```

**Flow 3: Boolean Question (High Confidence)**
```
1. User adds field, types label: "Is Complete?"
2. After 500ms pause:
   - Type auto-changes to SELECT
   - Options: Yes, No (pre-filled)
3. User inserts field
4. Field Configuration shows:
   - Options list with Yes/No
   - User can add more options
   - User can change to different type if needed
```

---

### Feature B2: Contextual Configuration Panels

#### Specification

**Objective**: Show only relevant configuration options based on field type.

**Dynamic Tab System**:

```typescript
interface ContextualTabs {
  tabConfigurations: {
    STRING: ['General', 'Validation', 'Advanced'];
    EMAIL: ['General', 'Validation', 'Domain Rules', 'Advanced'];
    SELECT: ['General', 'Options', 'Validation', 'Logic', 'Advanced'];
    FILES: ['General', 'File Rules', 'Preview', 'Advanced'];
    DATE: ['General', 'Date Constraints', 'Format', 'Advanced'];
    CALCULATED: ['General', 'Formula', 'Dependencies', 'Advanced'];
  };
  
  // Tab content generators
  generateTabContent(fieldType: DataTypes, tab: string): ReactNode;
}
```

**Progressive Disclosure Rules**:
- Hide tabs with no applicable settings
- Show advanced tabs only after basic configuration
- Collapse rarely-used sections by default
- Remember user's tab preferences

---

### Feature B3: Visual Logic Builder

#### Specification

**Objective**: Enable non-technical users to create conditional logic without code.

**Logic Model**:

```typescript
interface ConditionalLogic {
  conditions: {
    id: string;
    field: string;
    operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'is_empty' | 'is_not_empty';
    value: any;
    connector?: 'AND' | 'OR';
  }[];
  
  actions: {
    type: 'show' | 'hide' | 'require' | 'unrequire' | 'set_value' | 'clear_value';
    target?: string; // Field ID
    value?: any;
  }[];
  
  // Validation
  validateLogic(): ValidationResult;
  
  // Testing
  testWithValues(formData: FormData): TestResult;
}
```

**Visual Builder UI**:

```
Components:
1. Condition Builder
   - Dropdown: Field selector
   - Dropdown: Operator selector
   - Input: Value field (dynamic type)
   - Button: Add AND/OR condition

2. Action Builder
   - Dropdown: Action type
   - Dropdown: Target field (if applicable)
   - Input: Value (if applicable)

3. Logic Preview
   - Plain English description
   - Visual flow diagram (optional)

4. Test Panel
   - Mock form with test values
   - Real-time result display
```

---

### Feature B4: Natural Language Configuration

#### Specification

**Objective**: Allow configuration through natural language descriptions.

**NLP Processing**:

```typescript
interface NLPConfiguration {
  // Input processing
  parseDescription(text: string): ParsedIntent {
    // Extract:
    // - Field properties (required, type, validation)
    // - Conditional logic
    // - Validation rules
    // - Default values
  }
  
  // Supported phrases
  patterns: [
    "required email that only accepts company domains",
    "optional text field with 500 character limit",
    "number between 1 and 100",
    "date that must be in the future",
    "show only when status is pending"
  ];
  
  // Confidence scoring
  interpretationConfidence: number;
  
  // Fallback to manual if confidence < 70%
  fallbackThreshold: 70;
}
```

**UI Integration**:

```
Location: Top of Field Configuration drawer
Input: Multi-line text area with placeholder
Process: 
  1. User describes field
  2. Click "Generate Configuration"
  3. System shows interpretation
  4. User confirms or modifies
  5. Configuration applied
```

---

## Implementation Phases

### Phase 1: Foundation (Weeks 1-2)

**Sprint Goals**:
- Implement Undo/Redo system
- Improve warning messages
- Add field counter to toolbar
- Create initial template structure

**Deliverables**:

| Feature | Components | Testing | Documentation |
|---------|------------|---------|---------------|
| Undo/Redo | Context, UI buttons, keyboard | Unit + E2E | API guide |
| Improved Warnings | Text updates, styling | Visual regression | Copy guidelines |
| Field Counter | Toolbar component | Unit tests | - |
| Template Structure | Data models, API | Unit tests | Schema docs |

**Success Criteria**:
- Zero regressions in existing functionality
- Undo/redo works for all user actions
- 100% keyboard accessibility

---

### Phase 2: Efficiency (Weeks 3-4)

**Sprint Goals**:
- Launch Template System
- Implement Bulk Operations
- Add Smart Type Detection
- Create Contextual Panels

**Deliverables**:

| Feature | Components | Testing | Documentation |
|---------|------------|---------|---------------|
| Template System | Modal, storage, CRUD | Integration | User guide |
| Bulk Operations | Selection UI, action bar | E2E scenarios | Feature tutorial |
| Type Detection | Pattern engine, UI feedback | Accuracy tests | Pattern library |
| Contextual Panels | Dynamic tabs, content | Unit + visual | Config guide |

**Success Criteria**:
- Template usage in 50% of new forms
- Type detection accuracy > 85%
- Bulk operations reduce clicks by 40%

---

### Phase 3: Intelligence (Weeks 5-6)

**Sprint Goals**:
- Visual Logic Builder
- Natural Language Config
- Smart Section Suggestions
- Performance optimization

**Deliverables**:

| Feature | Components | Testing | Documentation |
|---------|------------|---------|---------------|
| Logic Builder | Visual UI, validator | Logic scenarios | Builder guide |
| NLP Config | Parser, interpreter | NLP accuracy | Phrase library |
| Smart Suggestions | ML model, UI prompts | Suggestion accuracy | - |
| Performance | Code splitting, memo | Performance tests | - |

**Success Criteria**:
- Logic builder handles 90% of use cases
- NLP configuration 70% accuracy
- No performance degradation

---

## Technical Specifications

### State Management Updates

```typescript
// Enhanced FormBuilderContext
interface EnhancedFormBuilderContext extends FormBuilderContext {
  // Undo/Redo
  undoStack: Action[];
  redoStack: Action[];
  pushAction: (action: Action) => void;
  undo: () => void;
  redo: () => void;
  
  // Templates
  templates: TemplateLibrary;
  saveAsTemplate: (fields: Field[], metadata: TemplateMetadata) => void;
  applyTemplate: (templateId: string, targetSectionId?: string) => void;
  
  // Bulk Operations
  multiSelectMode: boolean;
  selectedFields: Set<string>;
  toggleFieldSelection: (fieldId: string) => void;
  bulkUpdateFields: (updates: Partial<Field>) => void;
  
  // Smart Features
  typeDetection: TypeDetectionEngine;
  logicBuilder: ConditionalLogicBuilder;
  suggestions: SuggestionEngine;
}
```

### Component Architecture

```typescript
// New components to create
components/
  UndoRedo/
    UndoRedoButtons.tsx
    UndoRedoContext.tsx
    useUndoRedo.ts
  
  Templates/
    TemplateLibraryModal.tsx
    TemplateCard.tsx
    TemplateCreator.tsx
    useTemplates.ts
  
  BulkOperations/
    MultiSelectMode.tsx
    BulkActionBar.tsx
    useBulkOperations.ts
  
  SmartFeatures/
    TypeDetector.tsx
    LogicBuilder/
      ConditionBuilder.tsx
      ActionBuilder.tsx
      LogicTester.tsx
    NLPConfigurator.tsx
```

### API Integrations

```typescript
// Template Storage API
interface TemplateAPI {
  endpoints: {
    GET: '/api/form-templates';
    POST: '/api/form-templates';
    PUT: '/api/form-templates/:id';
    DELETE: '/api/form-templates/:id';
  };
  
  // Analytics
  trackTemplateUsage(templateId: string, context: UsageContext): void;
}

// AI/ML Services
interface AIServices {
  typeDetection: {
    endpoint: '/api/ai/detect-field-type';
    method: 'POST';
    payload: { label: string };
    response: { type: DataTypes; confidence: number };
  };
  
  nlpConfiguration: {
    endpoint: '/api/ai/parse-field-description';
    method: 'POST';
    payload: { description: string };
    response: { configuration: FieldConfig; confidence: number };
  };
}
```

---

## Success Metrics

### Quantitative Metrics

| Metric | Current | Target | Measurement Method |
|--------|---------|--------|-------------------|
| Form Creation Time | 45 min | 27 min | Session analytics |
| Configuration Clicks | 120 | 60 | Click tracking |
| Template Usage | 0% | 60% | Feature analytics |
| Type Detection Accuracy | N/A | 85% | A/B testing |
| Undo Usage | N/A | 30% sessions | Event tracking |
| Developer Integration | 4 hrs | 1.5 hrs | Dev survey |
| Error Rate | 15% | 7% | Error tracking |
| SUS Score | 68 | 82 | Quarterly survey |

### Qualitative Metrics

**User Satisfaction Indicators**:
- Reduced support tickets for form building
- Positive feedback in user interviews
- Increased form complexity (users feeling empowered)
- Higher adoption of advanced features

**Developer Experience**:
- Reduced customization requests
- Faster onboarding for new developers
- Fewer workarounds needed

---

## Risk Mitigation

### Technical Risks

| Risk | Probability | Impact | Mitigation Strategy |
|------|------------|--------|-------------------|
| Performance degradation with templates | Medium | High | Implement virtualization, lazy loading |
| Undo/redo memory issues | Low | High | Limit stack size, implement cleanup |
| AI detection inaccuracy | High | Medium | Fallback to manual, continuous training |
| Integration conflicts | Medium | High | Comprehensive testing, feature flags |
| Browser compatibility | Low | Medium | Progressive enhancement, polyfills |

### User Experience Risks

| Risk | Probability | Impact | Mitigation Strategy |
|------|------------|--------|-------------------|
| Feature overwhelm | Medium | Medium | Progressive disclosure, onboarding |
| Template proliferation | High | Low | Categorization, search, cleanup |
| Logic builder complexity | Medium | High | Templates, examples, tutorials |
| Change resistance | Low | Medium | Gradual rollout, training |

---

## Testing Strategy

### Test Coverage Requirements

```typescript
// Unit Test Coverage
const coverageTargets = {
  statements: 85,
  branches: 80,
  functions: 85,
  lines: 85
};

// E2E Test Scenarios
const e2eScenarios = [
  'Create form with templates',
  'Undo/redo complex operations',
  'Bulk update 10 fields',
  'Configure conditional logic',
  'Save and reload form'
];

// Performance Benchmarks
const performanceBenchmarks = {
  initialLoad: 2000, // ms
  templateInsertion: 500, // ms
  undoOperation: 100, // ms
  bulkUpdate: 300, // ms
};
```

### User Acceptance Testing

**Persona-Based Testing**:
1. **Sarah** (Business Analyst): Create inspection form in < 30 min
2. **Marcus** (Solutions Architect): Build complex template with logic
3. **Alex** (Junior Developer): Integrate without documentation

---

## Rollout Strategy

### Phase 1: Internal Alpha (Week 6)
- Team testing
- 5 power users
- Feature flags for gradual enablement

### Phase 2: Limited Beta (Week 8)
- 50 users across different roles
- A/B testing old vs new
- Feedback collection

### Phase 3: General Availability (Week 10)
- Full rollout with feature flags
- Progressive enhancement based on user type
- Continuous monitoring

---

## Appendix

### A. Detailed Wireframes
[See attached wireframe document]

### B. User Research Data
[See persona analysis document]

### C. Technical Dependencies
- React 18+
- TypeScript 4.9+
- Material UI 5+
- @dnd-kit/core 6+

### D. Glossary
- **SUS**: System Usability Scale
- **NLP**: Natural Language Processing
- **CRUD**: Create, Read, Update, Delete
- **E2E**: End-to-End testing

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Oct 2025 | UX Team | Initial draft |
| 2.0 | Oct 2025 | UX Team | Comprehensive specification |
| 3.0 | Oct 8, 2025 | UX Team | Aligned with Technical Plan v2.0 - Updated Smart Detection, Template UI, DataTypes |

**Review Status**: ✅ Aligned with Technical Plan v2.0
**Approval Status**: Ready for Implementation
**Next Review**: Week 2 Implementation Checkpoint

---

## Document Alignment Summary

This UI/UX design document has been fully aligned with the FormBuilder v3 Technical Implementation Plan v2.0. Key changes include:

### Critical Updates

**1. Smart Type Detection** (Feature B1)
- ✅ Clarified: NO "EMAIL" or "PHONE" data types exist in WizyVision
- ✅ Updated: Detection maps to actual DataTypes (STRING, DOUBLE, etc.)
- ✅ Added: Auto-configuration of validation/settings as smart defaults
- ✅ Specified: Smart defaults applied BEFORE user opens Field Configuration
- ✅ Documented: Complete detection patterns with visual feedback examples

**2. Template System** (Feature A2)
- ✅ Changed: Left sidebar design (NOT modal) following FormBuilder v2 pattern
- ✅ Updated: Complete TemplateField interface matching technical data structure
- ✅ Corrected: System templates use DataTypes constants and SystemKeys
- ✅ Added: Global status colors (GLOBAL_STATUS_COLORS) for STATUS_ID fields
- ✅ Fixed: FILES vs FILE_LIST distinction in Evidence Collection template
- ✅ Removed: Invalid settings (canAttachFile), kept only canAddRemarks
- ✅ Added: Meter Readings template with DOUBLE type and unit extraction

**3. Design Principles**
- ✅ Jakob's Law: Template sidebar matches FormBuilder v2 familiar pattern
- ✅ Fitts's Law: Full-width clickable template cards (min 40px height)
- ✅ Visual Hierarchy: Smart defaults shown with badges (✅ Email validation)
- ✅ Progressive Disclosure: Auto-configuration reduces initial cognitive load

### Technical Alignment Checklist

- [x] All DataTypes references use actual constants (no EMAIL/PHONE types)
- [x] Template data structure matches complete WizyVision Field structure
- [x] Global status colors used consistently across all STATUS_ID fields
- [x] Smart defaults strategy (validation/settings pre-configured)
- [x] Left sidebar UI pattern for templates (not modal)
- [x] FILES (single) vs FILE_LIST (multiple) distinction clear
- [x] Validation only for STRING and TEXT (DOUBLE uses threshold in settings)
- [x] Settings structure correct (unit, threshold, canAddRemarks, isTracked)
- [x] All keys use SystemKeys constants where applicable

### Implementation Notes for Designers

**When creating wireframes/mockups**:
1. Show smart defaults with badges (✅ Email validation, ✅ PSI unit)
2. Template sidebar on left (240px), always visible
3. Field type dropdown shows actual DataTypes only
4. Status colors must use global constants (green for passed, red for failed)
5. Measurement fields show extracted units in parentheses
6. Boolean questions default to SELECT with Yes/No options

**When writing user stories**:
- Use actual DataTypes in examples (STRING, not EMAIL)
- Reference smart defaults, not separate field types
- Show validation as configuration, not type

**Testing with users**:
- Validate that smart defaults are clear and editable
- Test template sidebar discoverability vs modal approach
- Confirm extracted units (PSI, °F) are intuitive

---

**Related Documents**:
- FormBuilder v3 Technical Implementation Plan v2.0
- WizyVision Development Guidelines (CLAUDE.md)
- FormBuilder v3 User Journey Map
- Persona Analysis Document