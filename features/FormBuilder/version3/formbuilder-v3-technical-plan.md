# FormBuilder v3 - Technical Implementation Plan

**Project**: WizyVision Form Builder
**Version**: 1.0
**Date**: October 8, 2025
**Status**: Implementation Ready
**Author**: Technical Team
**Reviewed By**: Product Owner, Technical Lead

---

## 📋 Executive Summary

This technical plan translates the FormBuilder v3 Enhancement Plan into actionable engineering tasks. It incorporates React Query for state management, follows WizyVision's strict coding standards, and includes code quality improvements.

### Key Principles

**Architecture**:
- React Query replaces `useEffect` patterns
- Component versioning (`version1/`, `version2/`, etc.)
- All styling via `styled()` in `styles.ts` (ZERO `sx` props)
- Complete Field data structure compliance

**Code Quality (Phase 1)**:
- No Spaghetti Code: Clear separation of concerns
- Readable structure: Self-documenting code, clear naming
- Maintainable: DRY principles, reusable utilities

**Constants Usage**:
- `DataTypes` for `dataType` property (UPPERCASE)
- `SystemKeys` for `key` property (camelCase)
- Global status colors from theme
- NO hardcoded values anywhere

**Scope**:
- ✅ **Phase 1 (Ready)**: Undo/Redo, Templates, Bulk Operations, Code Cleanup
- ⚠️ **Phase 2 (Fixes)**: Type Detection, Contextual Panels
- 🔻 **Phase 3 (MVP)**: Simple Logic Builder
- ❌ **Removed**: Natural Language Configuration

---

## 📚 Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [React Query Setup](#2-react-query-setup)
3. [Field Data Structure](#3-field-data-structure)
4. [Phase 1: Foundation + Code Quality](#4-phase-1-foundation--code-quality)
5. [Phase 2: Efficiency](#5-phase-2-efficiency)
6. [Phase 3: Intelligence (MVP)](#6-phase-3-intelligence-mvp)
7. [Code Structure](#7-code-structure)
8. [Theme Integration](#8-theme-integration)
9. [Testing Strategy](#9-testing-strategy)
10. [File Checklist](#10-file-checklist)
11. [Timeline](#11-timeline)

---

## 1. Architecture Overview

### 1.1 Component Structure

```
features/FormBuilder/version3/
  components/
    UndoRedo/version1/
      UndoRedoButtons.tsx
      UndoRedoTooltip.tsx
      styles.ts
      types.ts
      index.tsx
    Templates/version1/
      TemplateLibrarySidebar.tsx   # Left sidebar (like FormBuilder v2)
      TemplateCard.tsx
      TemplateCreator.tsx
      TemplateFilters.tsx
      systemTemplates.ts
      styles.ts
      types.ts
      index.tsx
    BulkOperations/version1/
      BulkSelectionMode.tsx
      BulkActionBar.tsx
      BulkActionMenu.tsx
      styles.ts
      types.ts
      index.tsx
    TypeDetection/version1/
      TypeSuggestion.tsx
      TypeConfidenceBadge.tsx
      styles.ts
      types.ts
      index.tsx
    LogicBuilder/version1/
      SimpleLogicBuilder.tsx
      LogicRuleList.tsx
      styles.ts
      types.ts
      index.tsx
  hooks/
    useUndoRedo.ts
    useTemplates.ts
    useBulkOperations.ts
    useTypeDetection.ts
  queries/
    queryKeys.ts
    templateQueries.ts
    typeDetectionQueries.ts
  context/
    UndoRedoContext.tsx
    FormBuilderContext.tsx
  services/
    typePatternEngine.ts
    templateStorage.ts
  utils/
    actionHistory.ts
    templateValidator.ts
    fieldHelpers.ts            # Reusable field utilities
```

### 1.2 State Management

**Three-Tier Architecture**:

1. **FormBuilder Context**: UI state, CRUD
2. **React Query**: Server state, caching
3. **UndoRedo Context**: History state

---

## 2. React Query Setup

### 2.1 Query Client

```typescript
// app/providers.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      retry: false,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### 2.2 Query Keys

```typescript
// features/FormBuilder/version3/queries/queryKeys.ts
export const queryKeys = {
  templates: {
    all: ['templates'] as const,
    user: () => [...queryKeys.templates.all, 'user'] as const,
    system: () => [...queryKeys.templates.all, 'system'] as const,
    recentlyUsed: () => [...queryKeys.templates.all, 'recent'] as const,
  },
  typeDetection: {
    detect: (label: string) => ['typeDetection', 'detect', label] as const,
  },
};
```

---

## 3. Field Data Structure

### 3.1 Template Field Interface

```typescript
// features/FormBuilder/version3/components/Templates/version1/types.ts
import { DataTypes, DataType } from '@/constants/dataTypes';
import { SystemKeys } from '@/constants/systemKeys';

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
  // CRITICAL: canAttachFile is NOT needed (implicit for FILES/FILE_LIST)
  // Only canAddRemarks is used
  attachmentSettings?: {
    value: string;          // Accepted MIME types (e.g., 'image/*', 'application/pdf')
    condition: string;      // 'always', 'in', '='
  } | null;

  // Statuses (STATUS_ID only) - Use global status colors
  statuses?: {
    id: number;
    color: string;          // Global status color from theme or constants
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
```

---

## 4. Phase 1: Foundation + Code Quality

**Timeline**: Weeks 1-2
**Status**: ✅ Ready
**Focus**: Undo/Redo, Templates, Bulk Operations, **Code Cleanup**

### 4.1 Feature: Code Quality & Refactoring

**Objective**: Eliminate spaghetti code, improve readability and maintainability.

#### 4.1.1 Code Quality Principles

**No Spaghetti Code**:
- Separate concerns: UI, logic, data
- Single Responsibility: Each function/component does ONE thing
- Clear naming: `handleFieldLabelChange` not `doStuff`
- Extract reusable logic into utilities

**Readable Structure**:
- Self-documenting code (clear variable names)
- Comments only for WHY, not WHAT
- Max 200 lines per file (split if larger)
- Consistent formatting (Prettier)

**Maintainable**:
- DRY (Don't Repeat Yourself)
- Reusable utilities for common operations
- Type-safe interfaces
- Testable functions (pure where possible)

#### 4.1.2 Refactoring Targets

**FormBuilder.tsx**:
```typescript
// BEFORE (Spaghetti):
const handleFieldUpdate = (fieldId, updates) => {
  setItems((prev) => {
    const updated = [...prev];
    for (let i = 0; i < updated.length; i++) {
      if (updated[i].type === 'section') {
        for (let j = 0; j < updated[i].data.fields.length; j++) {
          if (updated[i].data.fields[j].id === fieldId) {
            updated[i].data.fields[j] = { ...updated[i].data.fields[j], ...updates };
            return updated;
          }
        }
      } else if (updated[i].type === 'field' && updated[i].data.id === fieldId) {
        updated[i] = { ...updated[i], data: { ...updated[i].data, ...updates } };
        return updated;
      }
    }
    return updated;
  });
};

// AFTER (Clean):
const handleFieldUpdate = useCallback((fieldId: string, updates: Partial<FieldData>) => {
  setItems((prev) => updateFieldInItems(prev, fieldId, updates));
}, []);

// Extract to utility: utils/fieldHelpers.ts
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
      return {
        ...item,
        data: { ...item.data, ...updates },
      };
    }

    return item;
  });
}
```

**FieldConfiguration.tsx**:
```typescript
// Extract tab rendering logic
// BEFORE: 200+ lines in one file

// AFTER:
// FieldConfiguration.tsx - 100 lines (coordinator)
// sections/GeneralSettings.tsx - 50 lines
// sections/ValidationSettings.tsx - 50 lines
// hooks/useFieldConfiguration.ts - 50 lines (form logic)
```

#### 4.1.3 Utility Files to Create

```typescript
// features/FormBuilder/version3/utils/fieldHelpers.ts

/**
 * Field Helpers - Reusable field operations
 *
 * Clean, testable utility functions for common field operations
 */

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
```

#### 4.1.4 Code Cleanup Checklist

**Week 1, Day 1: Audit**
- [ ] Review all FormBuilder v3 files
- [ ] Identify spaghetti code (long functions, nested loops)
- [ ] List repeated logic patterns
- [ ] Create refactoring plan

**Week 1, Day 2-3: Extract Utilities**
- [ ] Create `utils/fieldHelpers.ts`
- [ ] Create `utils/sectionHelpers.ts`
- [ ] Create `utils/validators.ts`
- [ ] Write unit tests for each utility

**Week 1, Day 4-5: Refactor FormBuilder**
- [ ] Replace inline logic with utility calls
- [ ] Split long functions (>50 lines)
- [ ] Improve variable naming
- [ ] Add JSDoc comments to complex functions

**Week 2: Refactor Sub-Components**
- [ ] FieldList.tsx cleanup
- [ ] SectionList.tsx cleanup
- [ ] FieldConfiguration cleanup
- [ ] Update all tests

---

### 4.2 Feature A1: Undo/Redo System

#### Action Types (Updated)

```typescript
// features/FormBuilder/version3/context/UndoRedoContext.tsx

type ActionType =
  | 'ADD_SECTION'
  | 'DELETE_SECTION'
  | 'RENAME_SECTION'
  | 'REORDER_SECTION'      // ✅ ADDED
  | 'ADD_FIELD'
  | 'DELETE_FIELD'
  | 'UPDATE_FIELD'
  | 'REORDER_FIELD'         // ✅ ADDED
  | 'BULK_UPDATE';

interface Action {
  type: ActionType;
  timestamp: number;
  description: string;
  data: {
    before: any;
    after: any;
  };
}
```

*(Rest of Undo/Redo implementation same as before)*

---

### 4.3 Feature A2: Field Template System

**CRITICAL CHANGE**: Templates in **left sidebar** (like FormBuilder v2), NOT modal.

#### UI Structure

```
┌────────────────────────────────────────────────────┐
│  Form Builder Toolbar                              │
│  [↶ Undo] [↷ Redo] | [Save] [Cancel]               │
├────────┬──────────────────────────────┬────────────┤
│        │                              │            │
│ TEMPL. │  FORM CANVAS                 │  MOBILE    │
│ SIDEBAR│                              │  PREVIEW   │
│        │  [Section 1]                 │            │
│  📋    │    Field 1                   │  [Phone]   │
│  Basic │    Field 2                   │            │
│  Insp. │                              │            │
│        │  [Section 2]                 │            │
│  🛡️    │    Field 3                   │            │
│  Safety│    Field 4                   │            │
│        │                              │            │
│  📷    │                              │            │
│  Photos│                              │            │
│        │                              │            │
│  ────  │                              │            │
│  MY    │                              │            │
│  (empty│                              │            │
│        │                              │            │
└────────┴──────────────────────────────┴────────────┘
```

#### Styled Components (Sidebar)

```typescript
// features/FormBuilder/version3/components/Templates/version1/styles.ts
import { styled } from '@mui/material/styles';
import { Drawer, List, ListItem, Typography } from '@mui/material';

/**
 * TemplateLibrarySidebar - Persistent left sidebar
 *
 * DESIGN TOKENS:
 * - Width: 240px (same as FormBuilder v2 FieldDrawer)
 * - Background: theme.palette.background[2] (#fafafa)
 * - Border: theme.palette.divider
 * - NO Dialog/Modal needed (always visible)
 */
export const TemplateLibrarySidebar = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,

  '& .MuiDrawer-paper': {
    width: 240,
    backgroundColor: theme.palette.background[2],
    borderRight: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
    position: 'relative', // Not fixed (part of layout)
  },
}));

export const TemplateSectionHeader = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  fontWeight: theme.typography.h6.fontWeight,
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
  letterSpacing: '0.5px',
}));

export const TemplateListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  marginBottom: theme.spacing(0.5),
  transition: theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.short,
  }),

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translateX(4px)',
  },

  '&:active': {
    backgroundColor: theme.palette.action.selected,
  },
}));

export const TemplateIcon = styled('div')(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontSize: theme.typography.body2.fontSize,
}));

export const TemplateLabel = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  fontWeight: theme.typography.body1.fontWeight,
  color: theme.palette.text.primary,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));
```

#### Component Structure

```typescript
// features/FormBuilder/version3/components/Templates/version1/TemplateLibrarySidebar.tsx

/**
 * TemplateLibrarySidebar Component
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Sidebar pattern from FormBuilder v2, VS Code, Gmail
 * - Visual Hierarchy: Sections grouped, Recently Used at top
 * - Fitts's Law: Full-width click targets, larger icons
 * - Miller's Law: Max 5-7 templates visible per section
 *
 * INTERACTION DESIGN:
 * - Click template: Insert fields at current position
 * - Hover template: Preview fields in tooltip
 * - Drag template: Drag-to-insert (future)
 */

interface TemplateLibrarySidebarProps {
  onSelectTemplate: (template: FieldTemplate) => void;
}

export function TemplateLibrarySidebar({ onSelectTemplate }: TemplateLibrarySidebarProps) {
  const { data: systemTemplates = [] } = useSystemTemplates();
  const { data: userTemplates = [] } = useUserTemplates();
  const { data: recentTemplates = [] } = useRecentlyUsedTemplates();

  return (
    <TemplateLibrarySidebar variant="permanent" anchor="left">
      <Typography variant="h6" gutterBottom>
        Field Templates
      </Typography>

      {/* Recently Used */}
      {recentTemplates.length > 0 && (
        <>
          <TemplateSectionHeader>Recently Used</TemplateSectionHeader>
          <List>
            {recentTemplates.map((template) => (
              <TemplateListItem key={template.id} onClick={() => onSelectTemplate(template)}>
                <TemplateIcon>{template.icon}</TemplateIcon>
                <TemplateLabel>{template.name}</TemplateLabel>
              </TemplateListItem>
            ))}
          </List>
        </>
      )}

      {/* System Templates */}
      <TemplateSectionHeader>System Templates</TemplateSectionHeader>
      <List>
        {systemTemplates.map((template) => (
          <TemplateListItem key={template.id} onClick={() => onSelectTemplate(template)}>
            <TemplateIcon>{template.icon}</TemplateIcon>
            <TemplateLabel>{template.name}</TemplateLabel>
          </TemplateListItem>
        ))}
      </List>

      {/* User Templates */}
      <TemplateSectionHeader>My Templates</TemplateSectionHeader>
      <List>
        {userTemplates.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
            No templates yet
          </Typography>
        ) : (
          userTemplates.map((template) => (
            <TemplateListItem key={template.id} onClick={() => onSelectTemplate(template)}>
              <TemplateIcon>{template.icon}</TemplateIcon>
              <TemplateLabel>{template.name}</TemplateLabel>
            </TemplateListItem>
          ))
        )}
      </List>
    </TemplateLibrarySidebar>
  );
}
```

#### System Templates (Corrected)

```typescript
// features/FormBuilder/version3/components/Templates/version1/systemTemplates.ts
import { DataTypes } from '@/constants/dataTypes';
import { SystemKeys } from '@/constants/systemKeys';
import type { FieldTemplate } from './types';

/**
 * Global Status Colors
 * Used consistently across all STATUS_ID fields
 */
const GLOBAL_STATUS_COLORS = {
  PASSED: '#4caf50',    // Green
  FAILED: '#f44336',    // Red
  PENDING: '#ff9800',   // Orange
  IN_PROGRESS: '#2196f3', // Blue
  COMPLETE: '#9c27b0',  // Purple
};

export const systemTemplates: FieldTemplate[] = [
  // Template 1: Basic Inspection
  {
    id: 'system-basic-inspection',
    name: 'Basic Inspection',
    description: 'Standard inspection form fields',
    icon: '📋',
    category: 'inspection',
    author: 'system',
    fields: [
      {
        dataType: DataTypes.STRING,
        key: 'c1_inspectorname',
        label: 'Inspector Name',
        isRequired: true,
        isSystem: false,
        isVisible: true,
        readOnly: false,
        shownInList: true,
        placeholder: 'Enter inspector name',
        description: 'Name of person conducting inspection',
        validations: {
          type: 'required',
          errorMessage: 'Inspector name is required',
          details: {
            condition: 'required',
          },
        },
      },
      {
        dataType: DataTypes.DATE,
        key: SystemKeys.CREATED_AT,
        label: 'Inspection Date',
        isRequired: true,
        isSystem: true,
        isVisible: true,
        readOnly: false,
        shownInList: true,
        description: 'Date when inspection was conducted',
      },
      {
        dataType: DataTypes.LOCATION,
        key: 'c2_location',
        label: 'Location',
        isRequired: true,
        isSystem: false,
        isVisible: true,
        readOnly: false,
        shownInList: true,
        description: 'Location where inspection took place',
      },
      {
        dataType: DataTypes.STATUS_ID,
        key: SystemKeys.STATUS,
        label: 'Status',
        isRequired: true,
        isSystem: true,
        isVisible: true,
        readOnly: false,
        shownInList: true,
        description: 'Current status of the inspection',
        // ✅ Use global status colors
        statuses: [
          {
            id: 1,
            color: GLOBAL_STATUS_COLORS.PASSED,
            name: 'Passed',
            displayName: 'Passed',
            position: 1,
            systemId: 'passed',
            type: 'status',
          },
          {
            id: 2,
            color: GLOBAL_STATUS_COLORS.FAILED,
            name: 'Failed',
            displayName: 'Failed',
            position: 2,
            systemId: 'failed',
            type: 'status',
          },
          {
            id: 3,
            color: GLOBAL_STATUS_COLORS.PENDING,
            name: 'Pending',
            displayName: 'Pending Review',
            position: 3,
            systemId: 'pending',
            type: 'status',
          },
        ],
      },
    ],
    metadata: {
      createdAt: new Date('2025-10-01'),
      updatedAt: new Date('2025-10-01'),
      usageCount: 0,
      tags: ['inspection', 'basic'],
    },
  },

  // Template 2: Safety Checklist
  {
    id: 'system-safety-checklist',
    name: 'Safety Checklist',
    description: 'PPE and safety compliance fields',
    icon: '🛡️',
    category: 'safety',
    author: 'system',
    fields: [
      {
        dataType: DataTypes.SELECT,
        key: 'c1_ppeworn',
        label: 'PPE Worn?',
        isRequired: true,
        isSystem: false,
        isVisible: true,
        readOnly: false,
        shownInList: true,
        selectOptions: [
          { id: 'yes', value: 'Yes', position: 1 },
          { id: 'no', value: 'No', position: 2 },
        ],
      },
      {
        dataType: DataTypes.SELECT,
        key: 'c2_areasecured',
        label: 'Area Secured?',
        isRequired: true,
        isSystem: false,
        isVisible: true,
        readOnly: false,
        shownInList: true,
        selectOptions: [
          { id: 'yes', value: 'Yes', position: 1 },
          { id: 'no', value: 'No', position: 2 },
        ],
      },
      {
        dataType: DataTypes.TEXT,
        key: 'c3_safetynotes',
        label: 'Safety Notes',
        isRequired: false,
        isSystem: false,
        isVisible: true,
        readOnly: false,
        shownInList: false,
        placeholder: 'Describe safety concerns',
        description: 'Additional safety observations',
        // ✅ TEXT can have validation
        validations: {
          type: 'maxLength',
          errorMessage: 'Safety notes must be less than 500 characters',
          details: {
            condition: 'maxLength',
            max: 500,
          },
        },
        settings: {
          canAddRemarks: true,  // TEXT can have remarks
        },
      },
    ],
    metadata: {
      createdAt: new Date('2025-10-01'),
      updatedAt: new Date('2025-10-01'),
      usageCount: 0,
      tags: ['safety', 'checklist', 'ppe'],
    },
  },

  // Template 3: Evidence Collection
  {
    id: 'system-evidence-collection',
    name: 'Evidence Collection',
    description: 'Photo and documentation fields',
    icon: '📷',
    category: 'documentation',
    author: 'system',
    fields: [
      {
        dataType: DataTypes.FILES,  // ✅ Single file upload
        key: 'c1_photobefore',
        label: 'Photo - Before',
        isRequired: false,
        isSystem: false,
        isVisible: true,
        readOnly: false,
        shownInList: true,
        placeholder: 'Upload before photo',
        description: 'Photo taken before work began',
        // ✅ NO canAttachFile setting (implicit for FILES)
        // ✅ Only canAddRemarks
        settings: {
          canAddRemarks: true,
        },
        attachmentSettings: {
          value: 'image/*',  // Accept images only
          condition: 'always',
        },
      },
      {
        dataType: DataTypes.FILE_LIST,  // ✅ Multiple file uploads
        key: 'c2_photoscurrent',
        label: 'Photos - Current State',
        isRequired: false,
        isSystem: false,
        isVisible: true,
        readOnly: false,
        shownInList: true,
        placeholder: 'Upload multiple photos',
        description: 'Multiple photos of current state',
        settings: {
          canAddRemarks: true,
        },
        attachmentSettings: {
          value: 'image/*',
          condition: 'always',
        },
      },
      {
        dataType: DataTypes.TEXT,
        key: 'c3_evidencenotes',
        label: 'Evidence Notes',
        isRequired: false,
        isSystem: false,
        isVisible: true,
        readOnly: false,
        shownInList: false,
        placeholder: 'Describe evidence and observations',
        description: 'Detailed notes about evidence',
        settings: {
          canAddRemarks: true,
        },
      },
    ],
    metadata: {
      createdAt: new Date('2025-10-01'),
      updatedAt: new Date('2025-10-01'),
      usageCount: 0,
      tags: ['evidence', 'photos', 'documentation'],
    },
  },

  // Template 4: Meter & Gauge Readings
  {
    id: 'system-meter-readings',
    name: 'Meter Readings',
    description: 'Numeric readings with units',
    icon: '📊',
    category: 'inspection',
    author: 'system',
    fields: [
      {
        dataType: DataTypes.DOUBLE,
        key: 'c1_pressure',
        label: 'Pressure Reading (PSI)',
        isRequired: true,
        isSystem: false,
        isVisible: true,
        readOnly: false,
        shownInList: true,
        placeholder: 'Enter pressure value',
        description: 'Current pressure measurement',
        settings: {
          unit: 'PSI',
          threshold: {
            min: 0,
            max: 150,
          },
          isTracked: true,
        },
        // ✅ NO validation for DOUBLE (only threshold in settings)
      },
      {
        dataType: DataTypes.DOUBLE,
        key: 'c2_temperature',
        label: 'Temperature (°F)',
        isRequired: true,
        isSystem: false,
        isVisible: true,
        readOnly: false,
        shownInList: true,
        placeholder: 'Enter temperature',
        description: 'Current temperature measurement',
        settings: {
          unit: '°F',
          threshold: {
            min: -20,
            max: 200,
          },
          isTracked: true,
        },
      },
      {
        dataType: DataTypes.TEXT,
        key: 'c3_readingnotes',
        label: 'Reading Notes',
        isRequired: false,
        isSystem: false,
        isVisible: true,
        readOnly: false,
        shownInList: false,
        placeholder: 'Additional notes about readings',
        description: 'Notes about meter readings',
      },
    ],
    metadata: {
      createdAt: new Date('2025-10-01'),
      updatedAt: new Date('2025-10-01'),
      usageCount: 0,
      tags: ['meters', 'readings', 'measurements'],
    },
  },
];
```

---

### 4.4 Feature A3: Bulk Operations

*(Same as before - no changes needed)*

---

## 5. Phase 2: Efficiency

**Timeline**: Weeks 3-4
**Status**: ⚠️ Requires Smart Defaults Implementation
**Focus**: Smart Field Type Detection with Auto-Configuration, Contextual Panels

### 5.1 Feature B1: Smart Type Detection with Auto-Configuration (CORRECTED)

**CRITICAL CORRECTION**: WizyVision has NO EMAIL or PHONE data types. Smart detection should:
1. Detect DataType from label pattern
2. **Auto-configure validation/settings as smart defaults** BEFORE user opens configuration

#### Detection with Smart Defaults Strategy

```typescript
// features/FormBuilder/version3/services/typePatternEngine.ts

import { DataTypes, DataType } from '@/constants/dataTypes';
import { ValidationPatterns } from '@/constants/validationPatterns';

/**
 * Type Detection Result with Smart Defaults
 *
 * CRITICAL: Returns DataType + pre-configured defaults
 * NOT imaginary types like EMAIL or PHONE
 */
interface TypeDetectionResult {
  dataType: DataType;           // ALWAYS a real DataType constant
  confidence: number;            // 0-100
  reasoning: string[];           // Explanation of detection

  // Smart Defaults - Auto-configured based on pattern
  autoConfiguration?: {
    validations?: Validations;        // Pre-configured validation rules
    selectOptions?: SelectOption[];   // Pre-configured options
    settings?: SettingsClass;         // Pre-configured settings
    attachmentSettings?: AttachmentSettings;
    placeholder?: string;             // Smart placeholder text
    defaultValue?: DefaultValue;
  };
}

/**
 * Pattern Engine - Detects DataType + Smart Defaults
 *
 * DETECTION RULES:
 * - "Inspector" → DataTypes.PEOPLE (no extra config)
 * - "Inspector Email" → DataTypes.STRING + email validation preset
 * - "Inspector Phone" → DataTypes.STRING + phone validation preset
 * - "Pressure (PSI)" → DataTypes.DOUBLE + unit="PSI" + threshold
 * - "Photo Before" → DataTypes.FILES + image/* filter
 * - "Is Complete?" → DataTypes.SELECT + Yes/No options preset
 *
 * IMPORTANT: Validation/settings are applied as SMART DEFAULTS.
 * User can still edit/remove them in Field Configuration.
 */
class TypePatternEngine {
  private patterns = new Map<string, SmartPattern>([
    // STRING with EMAIL validation auto-configured
    ['email', {
      dataType: DataTypes.STRING,
      patterns: [/email/i, /e-?mail/i, /@/],
      confidence: 95,
      autoConfiguration: {
        validations: {
          type: 'email',
          errorMessage: 'Please enter a valid email address',
          details: {
            pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
            condition: 'pattern'
          }
        },
        placeholder: 'user@example.com'
      }
    }],

    // STRING with PHONE validation auto-configured
    ['phone', {
      dataType: DataTypes.STRING,
      patterns: [/phone/i, /mobile/i, /tel/i, /cell/i],
      confidence: 95,
      autoConfiguration: {
        validations: {
          type: 'phone',
          errorMessage: 'Please enter a valid phone number',
          details: {
            pattern: '^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$',
            condition: 'pattern'
          }
        },
        placeholder: '(555) 123-4567'
      }
    }],

    // STRING with URL validation auto-configured
    ['url', {
      dataType: DataTypes.STRING,
      patterns: [/url/i, /website/i, /link/i],
      confidence: 90,
      autoConfiguration: {
        validations: {
          type: 'url',
          errorMessage: 'Please enter a valid URL',
          details: {
            pattern: '^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b',
            condition: 'pattern'
          }
        },
        placeholder: 'https://example.com'
      }
    }],

    // PEOPLE - Person selector (no extra config)
    ['people', {
      dataType: DataTypes.PEOPLE,
      patterns: [/^inspector$/i, /^technician$/i, /^supervisor$/i],
      confidence: 95,
      autoConfiguration: {
        placeholder: 'Select person'
      }
    }],

    // SIGNATURE - Signature capture (no extra config)
    ['signature', {
      dataType: DataTypes.SIGNATURE,
      patterns: [/signature$/i, /sign.*here/i],
      confidence: 98,
      autoConfiguration: {
        placeholder: 'Tap to sign'
      }
    }],

    // DOUBLE with UNIT auto-detected from label
    ['measurement', {
      dataType: DataTypes.DOUBLE,
      patterns: [
        /pressure.*\(psi\)/i,
        /temperature.*\(°?[fc]\)/i,
        /amount.*\(\$\)/i,
        /distance.*\(ft|m|km\)/i
      ],
      confidence: 95,
      autoConfiguration: {
        settings: {
          unit: '', // Extracted from label (e.g., "PSI")
          threshold: { min: 0 },
          isTracked: true
        },
        placeholder: 'Enter value'
      },
      extractUnit: (label: string) => {
        const match = label.match(/\(([^)]+)\)/);
        return match ? match[1] : '';
      }
    }],

    // FILES with image filter auto-configured
    ['photo', {
      dataType: DataTypes.FILES,
      patterns: [/^photo$/i, /^image$/i, /upload.*photo/i],
      confidence: 90,
      autoConfiguration: {
        attachmentSettings: {
          value: 'image/*',
          condition: 'always'
        },
        settings: {
          canAddRemarks: true
        },
        placeholder: 'Tap to upload photo'
      }
    }],

    // FILE_LIST for multiple photos
    ['photos', {
      dataType: DataTypes.FILE_LIST,
      patterns: [/^photos$/i, /^images$/i],
      confidence: 90,
      autoConfiguration: {
        attachmentSettings: {
          value: 'image/*',
          condition: 'always'
        },
        settings: {
          canAddRemarks: true
        },
        placeholder: 'Tap to upload photos'
      }
    }],

    // FILES with document filter
    ['document', {
      dataType: DataTypes.FILES,
      patterns: [/^document$/i, /^file$/i, /^attachment$/i],
      confidence: 85,
      autoConfiguration: {
        attachmentSettings: {
          value: 'application/pdf,image/*',
          condition: 'always'
        },
        settings: {
          canAddRemarks: true
        },
        placeholder: 'Tap to upload document'
      }
    }],

    // SELECT with Yes/No options auto-configured
    ['boolean-select', {
      dataType: DataTypes.SELECT,
      patterns: [/^(is |are |has |have |can |should |did |does )/i, /\?$/],
      confidence: 85,
      autoConfiguration: {
        selectOptions: [
          { id: 'yes', value: 'Yes', position: 1 },
          { id: 'no', value: 'No', position: 2 }
        ],
        placeholder: 'Select...'
      }
    }],

    // DATE (no validation, built-in date picker)
    ['date', {
      dataType: DataTypes.DATE,
      patterns: [/date$/i, /^when$/i, /deadline/i],
      confidence: 95,
      autoConfiguration: {
        placeholder: 'Select date'
      }
    }],

    // LOCATION
    ['location', {
      dataType: DataTypes.LOCATION,
      patterns: [/^location$/i, /^address$/i, /^site$/i],
      confidence: 95,
      autoConfiguration: {
        placeholder: 'Enter or select location'
      }
    }],

    // TEXT - Multiline with max length
    ['text', {
      dataType: DataTypes.TEXT,
      patterns: [/^notes$/i, /^comments$/i, /^description$/i],
      confidence: 85,
      autoConfiguration: {
        validations: {
          type: 'maxLength',
          errorMessage: 'Text is too long (max 5000 characters)',
          details: {
            condition: 'maxLength',
            max: 5000
          }
        },
        placeholder: 'Enter additional details...'
      }
    }],

    // STRING - Default (no extra config)
    ['string-default', {
      dataType: DataTypes.STRING,
      patterns: [/^name$/i, /^title$/i, /.*/],  // Catch-all
      confidence: 50,
      autoConfiguration: {
        placeholder: 'Enter text'
      }
    }]
  ]);

  /**
   * Detect type and auto-configure smart defaults
   */
  detectType(label: string): TypeDetectionResult {
    const labelLower = label.toLowerCase().trim();
    let bestMatch: TypeDetectionResult | null = null;
    let highestConfidence = 0;

    for (const [key, pattern] of this.patterns) {
      for (const regex of pattern.patterns) {
        if (regex.test(labelLower)) {
          if (pattern.confidence > highestConfidence) {
            highestConfidence = pattern.confidence;

            // Extract unit if measurement type
            let config = pattern.autoConfiguration;
            if (pattern.extractUnit && config?.settings) {
              const unit = pattern.extractUnit(label);
              config = {
                ...config,
                settings: { ...config.settings, unit }
              };
            }

            bestMatch = {
              dataType: pattern.dataType,
              confidence: pattern.confidence,
              reasoning: [
                `Matched pattern: ${regex.source}`,
                `Detected as: ${pattern.dataType}`,
                config ? 'Smart defaults applied' : 'No extra configuration'
              ],
              autoConfiguration: config
            };
          }
          break;
        }
      }
    }

    // Default to STRING
    if (!bestMatch) {
      return {
        dataType: DataTypes.STRING,
        confidence: 50,
        reasoning: ['No pattern match', 'Defaulting to STRING'],
        autoConfiguration: {
          placeholder: 'Enter text'
        }
      };
    }

    return bestMatch;
  }
}

interface SmartPattern {
  dataType: DataType;
  patterns: RegExp[];
  confidence: number;
  autoConfiguration?: {
    validations?: any;
    selectOptions?: any[];
    settings?: any;
    attachmentSettings?: any;
    placeholder?: string;
    defaultValue?: any;
  };
  extractUnit?: (label: string) => string;
}
```

#### Auto-Configuration Flow

```typescript
// features/FormBuilder/version3/hooks/useSmartTypeDetection.ts

/**
 * useSmartTypeDetection - Auto-configure field based on label
 *
 * FLOW:
 * 1. User types label: "Inspector Email"
 * 2. Debounce 500ms
 * 3. Detect pattern → DataTypes.STRING + email validation
 * 4. Auto-apply DataType + validation BEFORE user opens config
 * 5. User can edit/remove validation in Field Configuration
 */

export function useSmartTypeDetection(fieldId: string, label: string) {
  const engine = useMemo(() => new TypePatternEngine(), []);
  const { updateField } = useFormBuilder();
  const [lastDetection, setLastDetection] = useState<TypeDetectionResult | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (label.length > 2) {
        const result = engine.detectType(label);
        setLastDetection(result);

        // Auto-apply if high confidence
        if (result.confidence >= 85) {
          updateField(fieldId, {
            dataType: result.dataType,

            // Apply smart defaults
            ...(result.autoConfiguration?.validations && {
              validations: result.autoConfiguration.validations
            }),
            ...(result.autoConfiguration?.selectOptions && {
              selectOptions: result.autoConfiguration.selectOptions
            }),
            ...(result.autoConfiguration?.settings && {
              settings: result.autoConfiguration.settings
            }),
            ...(result.autoConfiguration?.attachmentSettings && {
              attachmentSettings: result.autoConfiguration.attachmentSettings
            }),
            ...(result.autoConfiguration?.placeholder && {
              placeholder: result.autoConfiguration.placeholder
            })
          });
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [label, fieldId]);

  return { detection: lastDetection };
}
```

#### Examples of Smart Defaults

```typescript
// EXAMPLE 1: Email field
// Label: "Inspector Email"
// Auto-configured as:
{
  dataType: DataTypes.STRING,  // ✅ STRING, NOT 'EMAIL'
  label: "Inspector Email",
  placeholder: "user@example.com",
  validations: {                // ✅ Auto-configured BEFORE user opens config
    type: 'email',
    errorMessage: 'Please enter a valid email address',
    details: {
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
      condition: 'pattern'
    }
  }
}

// EXAMPLE 2: Phone field
// Label: "Contact Phone"
// Auto-configured as:
{
  dataType: DataTypes.STRING,  // ✅ STRING, NOT 'PHONE'
  label: "Contact Phone",
  placeholder: "(555) 123-4567",
  validations: {                // ✅ Auto-configured
    type: 'phone',
    errorMessage: 'Please enter a valid phone number',
    details: {
      pattern: '^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$',
      condition: 'pattern'
    }
  }
}

// EXAMPLE 3: Measurement field
// Label: "Pressure (PSI)"
// Auto-configured as:
{
  dataType: DataTypes.DOUBLE,
  label: "Pressure (PSI)",
  placeholder: "Enter value",
  settings: {                   // ✅ Auto-configured
    unit: "PSI",                // Extracted from label
    threshold: { min: 0 },
    isTracked: true
  }
}

// EXAMPLE 4: Boolean question
// Label: "Is Complete?"
// Auto-configured as:
{
  dataType: DataTypes.SELECT,
  label: "Is Complete?",
  placeholder: "Select...",
  selectOptions: [              // ✅ Auto-configured
    { id: 'yes', value: 'Yes', position: 1 },
    { id: 'no', value: 'No', position: 2 }
  ]
}

// EXAMPLE 5: Photo upload
// Label: "Photo Before"
// Auto-configured as:
{
  dataType: DataTypes.FILES,
  label: "Photo Before",
  placeholder: "Tap to upload photo",
  attachmentSettings: {         // ✅ Auto-configured
    value: 'image/*',
    condition: 'always'
  },
  settings: {
    canAddRemarks: true
  }
}
```

---

### 5.2 Validation Patterns Constants

**New File**: `constants/validationPatterns.ts`

```typescript
/**
 * Validation Patterns Constants
 *
 * Used by Smart Type Detection for auto-configuration
 * User can edit/remove in Field Configuration drawer
 */

export const ValidationPatterns = {
  EMAIL: {
    type: 'email',
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    errorMessage: 'Please enter a valid email address',
    placeholder: 'user@example.com'
  },

  PHONE_US: {
    type: 'phone',
    pattern: '^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$',
    errorMessage: 'Please enter a valid phone number',
    placeholder: '(555) 123-4567'
  },

  URL: {
    type: 'url',
    pattern: '^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b',
    errorMessage: 'Please enter a valid URL',
    placeholder: 'https://example.com'
  },

  ZIPCODE_US: {
    type: 'zipcode',
    pattern: '^[0-9]{5}(-[0-9]{4})?$',
    errorMessage: 'Please enter a valid ZIP code',
    placeholder: '12345'
  }
} as const;
```

---

### 5.3 Feature B2: Contextual Configuration Panels

*(Same as original plan - no changes needed)*

---

## 6. Phase 3: Intelligence (MVP)

**Timeline**: Weeks 5-6
**Status**: 🔻 Future Enhancement
**Focus**: Simple Logic Builder, AI-Assisted Detection (Future)

### 6.1 Simple Logic Builder

*(Same as original plan - no changes needed)*

---

### 6.2 AI-Assisted Type Detection (Future Enhancement)

**Objective**: Upgrade pattern-based detection to AI-powered detection

```typescript
// Phase 3: AI Service Integration

interface AITypeDetectionService {
  endpoint: '/api/ai/detect-field-type';
  method: 'POST';

  request: {
    label: string;
    context?: {
      sectionName?: string;
      existingFields?: string[];
      formType?: string;
    };
  };

  response: {
    dataType: DataType;  // ✅ ALWAYS returns actual DataType constant
    confidence: number;   // 0-100
    reasoning: string[];
    autoConfiguration?: {
      validations?: any;
      settings?: any;
      selectOptions?: any[];
      // ... smart defaults
    };
  };
}

// Example AI call
const result = await detectFieldTypeAI("Inspector Email");
// Response:
// {
//   dataType: "STRING",  // ✅ Not 'EMAIL'
//   confidence: 98,
//   reasoning: [
//     "Contains 'email' keyword",
//     "Context: Inspector field suggests work email",
//     "Recommended: Add email validation"
//   ],
//   autoConfiguration: {
//     validations: {
//       type: 'email',
//       errorMessage: 'Please enter a valid email address',
//       details: { pattern: '...', condition: 'pattern' }
//     }
//   }
// }
```

**Benefits of AI Detection**:
- Higher accuracy (98%+ vs 85% pattern matching)
- Context-aware (considers section name, nearby fields)
- Learns from user corrections
- Handles edge cases (e.g., "Contact Info" → suggests email + phone)
- Multi-language support (Phase 4)

---

## 7. Code Structure

```
features/FormBuilder/version3/
  components/
    Templates/version1/
      TemplateLibrarySidebar.tsx  ✅ Changed from Modal
  utils/
    fieldHelpers.ts                ✅ New - reusable utilities
    sectionHelpers.ts              ✅ New - section operations
    validators.ts                  ✅ New - validation logic
```

---

## 8. Theme Integration

**Global Status Colors**:

```typescript
// constants/statusColors.ts (NEW FILE)

/**
 * Global Status Colors
 * Used consistently across all STATUS_ID fields
 */
export const GLOBAL_STATUS_COLORS = {
  PASSED: '#4caf50',      // Green
  FAILED: '#f44336',      // Red
  PENDING: '#ff9800',     // Orange
  IN_PROGRESS: '#2196f3', // Blue
  COMPLETE: '#9c27b0',    // Purple
  CANCELED: '#9e9e9e',    // Gray
} as const;

export type StatusColor = typeof GLOBAL_STATUS_COLORS[keyof typeof GLOBAL_STATUS_COLORS];
```

**Usage in Templates**:
```typescript
import { GLOBAL_STATUS_COLORS } from '@/constants/statusColors';

statuses: [
  {
    id: 1,
    color: GLOBAL_STATUS_COLORS.PASSED,  // Use constant
    name: 'Passed',
    // ...
  },
];
```

---

## 9. Testing Strategy

*(Same as before - comprehensive unit, integration, E2E tests)*

---

## 10. File Checklist

### New Files to Create

**Code Quality (Phase 1)**:
- [ ] `features/FormBuilder/version3/utils/fieldHelpers.ts`
- [ ] `features/FormBuilder/version3/utils/sectionHelpers.ts`
- [ ] `features/FormBuilder/version3/utils/validators.ts`
- [ ] `features/FormBuilder/version3/utils/__tests__/fieldHelpers.test.ts`

**Global Constants**:
- [ ] `constants/statusColors.ts`
- [ ] `constants/validationPatterns.ts` ✅ **NEW: Email, phone, URL validation patterns**

**Templates (Updated)**:
- [ ] `features/FormBuilder/version3/components/Templates/version1/TemplateLibrarySidebar.tsx` (NOT Modal)

**Smart Type Detection (Phase 2)** ✅ **UPDATED**:
- [ ] `features/FormBuilder/version3/services/typePatternEngine.ts` - Pattern-based detection with smart defaults
- [ ] `features/FormBuilder/version3/hooks/useSmartTypeDetection.ts` - Auto-configuration hook
- [ ] `features/FormBuilder/version3/components/TypeDetection/version1/TypeSuggestion.tsx` - Suggestion UI (optional, for medium confidence)
- [ ] `features/FormBuilder/version3/components/TypeDetection/version1/styles.ts`
- [ ] `features/FormBuilder/version3/components/TypeDetection/version1/types.ts`
- [ ] `features/FormBuilder/version3/components/TypeDetection/version1/index.tsx`

**All other files**: Same as previous plan

### Files to Modify

- [ ] `features/FormBuilder/version3/FormBuilder.tsx` - Integrate sidebar, add cleanup, integrate smart detection
- [ ] `features/FormBuilder/version3/context/UndoRedoContext.tsx` - Add REORDER actions
- [ ] `features/FormBuilder/version3/components/Templates/version1/systemTemplates.ts` - Use global colors, fix FILES/FILE_LIST, ✅ **STRING with validation for email/phone**
- [ ] `features/FormBuilder/version3/FieldList.tsx` ✅ **NEW: Integrate useSmartTypeDetection hook**
- [ ] `features/FormBuilder/version3/types.ts` ✅ **NEW: Add TypeDetectionResult interface**

---

## 11. Timeline

| Phase | Feature | Time |
|-------|---------|------|
| **Phase 1: Foundation + Cleanup** | | **2 weeks** |
| Code Quality & Refactoring | High Priority | 3 days |
| Undo/Redo (with REORDER actions) | Medium | 4 days |
| Templates (Sidebar, not Modal) | High | 5 days |
| Bulk Operations | Medium | 3 days |
| **Phase 2: Efficiency** | | **2 weeks** |
| Type Detection (DataTypes fix) | Low | 3 days |
| Contextual Panels | Medium | 5 days |
| Testing & Fixes | - | 2 days |
| **Phase 3: MVP Logic** | | **1 week** |
| Simple Logic Builder | Medium | 4 days |
| Final Testing | - | 1 day |
| **Total** | | **5 weeks** |

---

## Summary: All Corrections Applied

### Critical DataTypes Fix (Phase 2)

✅ **NO EMAIL or PHONE DataTypes**: WizyVision only has actual DataTypes from `constants/dataTypes.ts`
✅ **Smart Detection Strategy**:
  - Pattern detection maps labels to **real DataTypes only**
  - "Inspector Email" → `DataTypes.STRING` (NOT 'EMAIL')
  - "Contact Phone" → `DataTypes.STRING` (NOT 'PHONE')
  - "Inspector" → `DataTypes.PEOPLE`
  - "Inspector Signature" → `DataTypes.SIGNATURE`

✅ **Auto-Configuration (Smart Defaults)**:
  - Email pattern → `DataTypes.STRING` + email validation auto-configured
  - Phone pattern → `DataTypes.STRING` + phone validation auto-configured
  - Measurement pattern → `DataTypes.DOUBLE` + unit auto-extracted
  - Boolean question → `DataTypes.SELECT` + Yes/No options auto-configured
  - Photo pattern → `DataTypes.FILES` + image/* filter auto-configured
  - Applied BEFORE user opens Field Configuration
  - User can edit/remove in Field Configuration drawer

✅ **Validation as Smart Defaults**:
  - Validation is NOT a separate data type
  - Validation rules are auto-configured based on label patterns
  - User can customize/remove validation in Field Configuration
  - Email/phone/URL validation stored in `validations` property

✅ **New Constants File**:
  - `constants/validationPatterns.ts` - Reusable validation patterns
  - EMAIL, PHONE_US, URL, ZIPCODE_US patterns
  - Used by TypePatternEngine for smart defaults

### Other Corrections (From Previous Review)

✅ **Global Status Colors**: All STATUS_ID fields use `GLOBAL_STATUS_COLORS` constants
✅ **Action Types**: Added `REORDER_FIELD` and `REORDER_SECTION`
✅ **Code Quality**: Phase 1 includes comprehensive cleanup and refactoring
✅ **FILES vs FILE_LIST**: Clear distinction, FILES = single, FILE_LIST = multiple
✅ **Settings**: NO `canAttachFile` (implicit), only `canAddRemarks` for TEXT/FILES/FILE_LIST
✅ **Validation**: Only for STRING and TEXT, NOT DOUBLE (DOUBLE uses threshold in settings)
✅ **Templates UI**: Left sidebar (like FormBuilder v2), NOT modal/dialog

---

## Key Distinctions (Developer Reference)

### DataType vs Validation

```typescript
// ✅ CORRECT: DataType is STRING, validation is separate
{
  dataType: DataTypes.STRING,  // Field type
  label: "Inspector Email",
  validations: {               // Optional validation rules
    type: 'email',
    errorMessage: 'Please enter a valid email address',
    details: {
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
      condition: 'pattern'
    }
  }
}

// ❌ WRONG: No 'EMAIL' DataType exists
{
  dataType: 'EMAIL',  // ERROR: Not in DataTypes constants
  label: "Inspector Email"
}
```

### Smart Detection Examples

| Label Input | Detected DataType | Auto-Configuration |
|-------------|-------------------|--------------------|
| "Inspector" | `PEOPLE` | Placeholder: "Select person" |
| "Inspector Email" | `STRING` | Email validation + placeholder |
| "Inspector Phone" | `STRING` | Phone validation + placeholder |
| "Inspector Signature" | `SIGNATURE` | Placeholder: "Tap to sign" |
| "Pressure (PSI)" | `DOUBLE` | Unit: "PSI", threshold, isTracked |
| "Photo Before" | `FILES` | Image filter + canAddRemarks |
| "Is Complete?" | `SELECT` | Yes/No options |
| "Team Members" | `PEOPLE_LIST` | Multi-select people |
| "Location" | `LOCATION` | GPS/address picker |

### Phase 2 Implementation Priorities

1. **Pattern Engine** (Week 3, Day 1-2)
   - Create `typePatternEngine.ts` with pattern definitions
   - Map patterns to DataTypes + autoConfiguration
   - Unit extraction logic for measurements

2. **Validation Constants** (Week 3, Day 2)
   - Create `constants/validationPatterns.ts`
   - Define EMAIL, PHONE, URL, ZIP patterns
   - Reusable across detection and Field Configuration

3. **Smart Detection Hook** (Week 3, Day 3)
   - Create `useSmartTypeDetection.ts`
   - Debounce label input (500ms)
   - Auto-apply if confidence >= 85%

4. **UI Integration** (Week 3, Day 4-5)
   - Integrate hook into FieldList component
   - Show confidence badge (optional, for 60-85% confidence)
   - Test with real label examples

5. **Testing** (Week 4, Day 1-2)
   - Unit tests for pattern engine
   - Accuracy tests (>85% target)
   - Edge case handling

---

**Document Version**: 2.0 (DataTypes Fix)
**Last Updated**: 2025-10-08
**Status**: ✅ Ready for Implementation
**Critical Fix**: Phase 2 Type Detection completely rewritten to use actual DataTypes only
**Approvals**: Pending Technical Review
