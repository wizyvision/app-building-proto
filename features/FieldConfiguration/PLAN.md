# FieldConfiguration Feature - Implementation Plan

## Overview

The FieldConfiguration feature is a comprehensive right-side drawer component that allows users to configure all aspects of form fields in the FormBuilder. This document outlines the phased implementation plan, tracking what has been completed and what remains.

---

## Architecture Summary

**Component Location**: `/features/FieldConfiguration/version1/`

**Key Technologies**:
- React Hook Form v7 (form state management)
- Material UI Drawer component
- React Context (FormBuilderContext integration)
- Mock API layer for async operations

**Integration Points**:
- FormBuilder v3 context (field updates, data type locking)
- Field v5 component (real-time preview updates)
- Mobile Preview (live sync of changes)

---

## Phase 1: General Settings ✅ COMPLETED

### Implementation Date
**Completed**: 2025-10-08

### What Was Built

#### Main Components
- ✅ [FieldConfiguration/version1/index.tsx](version1/index.tsx) - Main drawer component
- ✅ [sections/GeneralSettings.tsx](version1/sections/GeneralSettings.tsx) - Form fields for basic properties
- ✅ [components/PropertySection.tsx](version1/components/PropertySection.tsx) - Collapsible accordion wrapper
- ✅ [components/DataTypeLockModal.tsx](version1/components/DataTypeLockModal.tsx) - Confirmation modal
- ✅ [components/DataTypeLockWarning.tsx](version1/components/DataTypeLockWarning.tsx) - Warning banner

#### Hooks
- ✅ [hooks/useFieldConfiguration.ts](version1/hooks/useFieldConfiguration.ts) - Form initialization and watch
- ✅ [hooks/useFieldMutation.ts](version1/hooks/useFieldMutation.ts) - Async field updates

#### Supporting Files
- ✅ [api/mockFieldApi.ts](version1/api/mockFieldApi.ts) - Mock API for testing
- ✅ [types.ts](version1/types.ts) - TypeScript interfaces
- ✅ [styles.ts](version1/styles.ts) - Styled MUI components

### Features Implemented

#### Drawer UI
- Right-side drawer (400px width)
- Header with field name, type chip, delete/close buttons
- ESC key to close
- Backdrop click to close
- Smooth slide-in transition (200ms)

#### General Settings Section
1. **Label Field** ✅
   - Required text input
   - Real-time validation
   - Auto-updates field in FormBuilder on blur

2. **Key Field** ✅
   - Auto-generated from label for custom fields
   - Shows system key for system fields (e.g., `status`, `createdAt`)
   - Custom fields prefixed with `c{appId}_` (e.g., `c5_pressure`)
   - Disabled for system fields
   - Locked after data type is saved

3. **Data Type Selection** ✅
   - Dropdown with human-readable labels
   - System fields: 9 types (STATUS_ID, FILES, TAGS, etc.)
   - Custom fields: 14 types (STRING, TEXT, DATE, DOUBLE, etc.)
   - System fields: Dropdown disabled (type cannot change)
   - Custom fields: Can change until locked

4. **Data Type Locking Flow** ✅
   - Warning banner shows when type is selected (custom fields only)
   - "Save Data Type" button appears after selection
   - Confirmation modal on save attempt
   - Modal explains locking is permanent
   - Async mock API call (simulates real backend)
   - Success: Green chip "Data type locked" with lock icon
   - After lock: Dropdown becomes read-only

5. **Description Field** ✅
   - Multiline text input (3 rows)
   - 200 character limit
   - Character counter below field
   - Real-time updates on blur

6. **Required Field Toggle** ✅
   - Switch component
   - Label "Required Field"
   - Real-time updates via context

### UX Principles Applied

**Jakob's Law**: Drawer pattern familiar from Airtable, Google Forms, Typeform

**Fitts's Law**: 44x44px touch targets for header buttons

**Progressive Disclosure**:
- Collapsible sections reduce cognitive load
- "Save Data Type" button only appears when relevant
- Warning banner only shows for custom fields

**Hick's Law**: Limited actions per section (1-3 max)

**Miller's Law**: Form fields grouped into logical chunks

**Visual Hierarchy**:
- Primary action: "Save Data Type" (contained button)
- Secondary action: Delete (icon button)
- Tertiary action: Close (icon button)

### Testing Status

- ✅ Drawer open/close functionality
- ✅ Label editing and field updates
- ✅ Key auto-generation for custom fields
- ✅ Data type selection for both field types
- ✅ Data type locking flow (modal + confirmation)
- ✅ Description character limit and counter
- ✅ Required toggle functionality
- ✅ ESC key closes drawer
- ✅ Integration with FormBuilder context

### Known Issues

None at this time.

---

## Phase 2: Advanced Settings & Logic (NOT STARTED)

### Estimated Scope
**Complexity**: Medium
**Estimated Time**: 3-4 hours
**Dependencies**: Phase 1 complete ✅

### Features to Implement

#### 2.1 Advanced Settings Section

**File**: `sections/AdvancedSettings.tsx` (NEW)

**Features**:

1. **Field Actions** (SELECT, MULTIPLE_CHOICE, CHECKBOX types only)
   - Action dropdown: "Open App", "Navigate to URL"
   - App selector (if "Open App" selected)
   - URL input (if "Navigate to URL" selected)
   - Validation: URL must be valid format

2. **Formula** (DOUBLE, STRING types only)
   - Toggle: "Enable Formula"
   - Formula editor (code input with syntax highlighting)
   - Available variables: Other field keys
   - Formula examples dropdown
   - Validation: Formula syntax check

3. **Data Lookup** (STRING, SELECT types only)
   - Toggle: "Enable Data Lookup"
   - API URL input
   - HTTP Method dropdown (GET, POST)
   - Headers input (key-value pairs)
   - Auth header toggle + input
   - Test lookup button
   - Preview response

4. **Default Value** (All types except FILES, SIGNATURE)
   - Type-specific input:
     - STRING/TEXT: Text input
     - DOUBLE: Number input
     - DATE: Date picker
     - SELECT: Dropdown from options
     - BOOLEAN: Checkbox
     - LOCATION: Map picker (future)
   - "Use Formula" toggle (for DOUBLE fields)

5. **Scanning Order** (All types)
   - Number input (1-999)
   - Helper text: "Order in which fields are scanned"

**Conditional Rendering**:
- Field Actions: Only for SELECT, MULTIPLE_CHOICE, CHECKBOX
- Formula: Only for DOUBLE, STRING
- Data Lookup: Only for STRING, SELECT
- Default Value: Disabled for FILES, SIGNATURE

**Validation Rules**:
- URL must match pattern: `https?://.*`
- Formula must be valid JavaScript expression
- Scanning order must be positive integer

**UX Principles**:
- Progressive Disclosure: Advanced settings hidden by default
- Conditional Fields: Only show relevant options for field type
- Immediate Feedback: Validation errors shown inline

#### 2.2 Logic Section

**File**: `sections/LogicSettings.tsx` (NEW)

**Features**:

1. **Conditional Visibility Rules**
   - Add rule button: "+ Add Rule"
   - Rule builder:
     - Source field dropdown (other fields in form)
     - Condition dropdown: "equals", "not equals", "contains", "greater than", etc.
     - Value input (type-specific)
   - Multiple rules: AND/OR logic selector
   - Target fields: "Show these fields" (multi-select)

2. **Rule Preview**
   - Visual representation of rule logic
   - Example: "Show [Field B] when [Field A] equals 'Yes'"

3. **Rule Management**
   - Reorder rules (drag handles)
   - Delete rule (trash icon)
   - Duplicate rule button

**Data Structure**:
```typescript
interface LogicRule {
  id: string;
  sourceFieldKey: string;
  condition: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan';
  value: string | number | boolean;
  targetFieldKeys: string[];
  operator: 'AND' | 'OR'; // For multiple rules
}
```

**Validation Rules**:
- Source field cannot be self
- Target fields cannot include self
- Value must match source field type

**UX Principles**:
- Visual Hierarchy: Rules shown as cards
- Fitts's Law: Large touch targets for add/delete
- Miller's Law: Limit to 7 rules max (expandable)

#### 2.3 Validation Rules Section

**File**: `sections/ValidationSettings.tsx` (NEW)

**Features**:

1. **Pattern Matching** (STRING, TEXT types)
   - Pattern type dropdown:
     - Email
     - Phone (US)
     - Phone (International)
     - URL
     - Custom Regex
   - Custom regex input (if "Custom Regex" selected)
   - Test input field (live validation)
   - Custom error message input

2. **Length Validation** (STRING, TEXT types)
   - Min length input (number)
   - Max length input (number)
   - Character counter toggle

3. **Range Validation** (DOUBLE, DATE types)
   - Min value input (type-specific)
   - Max value input (type-specific)
   - Custom error messages

4. **File Validation** (FILES, FILE_LIST types)
   - Allowed file types (multi-select):
     - Images (jpg, png, gif, etc.)
     - Documents (pdf, docx, xlsx, etc.)
     - Videos (mp4, mov, etc.)
     - Custom extensions input
   - Max file size (MB)
   - Max number of files (FILE_LIST only)

5. **Unique Values Validation** (STRING type, TITLE field only)
   - Toggle: "Require Unique Values"
   - Helper text: "Prevent duplicate entries"

**Conditional Rendering**:
- Pattern Matching: STRING, TEXT
- Length Validation: STRING, TEXT
- Range Validation: DOUBLE, DATE
- File Validation: FILES, FILE_LIST
- Unique Values: STRING and key === 'title'

**Validation Rules**:
- Min < Max (for length and range)
- Regex must be valid pattern
- File size must be positive number
- Max files must be > 0

**UX Principles**:
- Live Preview: Test input shows validation in real-time
- Clear Feedback: Custom error messages explained
- Context-Aware: Only show relevant validation types

#### 2.4 Scanner Settings Section

**File**: `sections/ScannerSettings.tsx` (NEW)

**Features**:

1. **Scanner Type** (All types except FILES, SIGNATURE)
   - Dropdown:
     - None (default)
     - Barcode (1D)
     - QR Code
     - OCR Text
     - NFC Tag
   - Helper text explaining each type

2. **Multiple Scan Toggle** (If scanner type selected)
   - Toggle: "Allow Multiple Scans"
   - Helper text: "User can scan multiple times to update value"

3. **Data Extraction** (OCR Text only)
   - Pattern dropdown:
     - Whole Text
     - First Line
     - Last Line
     - Pattern Match
   - Regex input (if "Pattern Match" selected)
   - Test input + preview

4. **Scanner Order** (If scanner type selected)
   - Number input (1-999)
   - Helper text: "Order in scanner mode"

**Conditional Rendering**:
- Scanner Type: Disabled for FILES, SIGNATURE
- Multiple Scan: Only if scanner type !== 'None'
- Data Extraction: Only if scanner type === 'OCR Text'
- Scanner Order: Only if scanner type !== 'None'

**Validation Rules**:
- Scanner order must be positive integer
- Regex must be valid pattern

**UX Principles**:
- Progressive Disclosure: Scanner options hidden until type selected
- Helper Text: Clear explanations for technical features
- Examples: Show sample scanner results

### Implementation Checklist for Phase 2

**Before Starting**:
- [ ] Review Phase 1 implementation
- [ ] Understand FormBuilder context API
- [ ] Plan data structure for new settings
- [ ] Create mock data for testing

**Advanced Settings**:
- [ ] Create `AdvancedSettings.tsx` component
- [ ] Implement Field Actions UI
- [ ] Implement Formula editor with syntax highlighting
- [ ] Implement Data Lookup UI with API tester
- [ ] Implement Default Value (type-specific inputs)
- [ ] Implement Scanning Order input
- [ ] Add conditional rendering logic
- [ ] Write validation rules
- [ ] Test all field type combinations

**Logic Settings**:
- [ ] Create `LogicSettings.tsx` component
- [ ] Implement rule builder UI
- [ ] Implement AND/OR logic selector
- [ ] Implement rule preview display
- [ ] Implement drag-to-reorder rules
- [ ] Add delete/duplicate rule actions
- [ ] Write validation rules
- [ ] Test complex rule scenarios

**Validation Settings**:
- [ ] Create `ValidationSettings.tsx` component
- [ ] Implement pattern matching UI
- [ ] Implement length validation UI
- [ ] Implement range validation UI
- [ ] Implement file validation UI
- [ ] Implement unique values toggle
- [ ] Add live test input
- [ ] Add custom error message inputs
- [ ] Write validation rules
- [ ] Test validation feedback

**Scanner Settings**:
- [ ] Create `ScannerSettings.tsx` component
- [ ] Implement scanner type dropdown
- [ ] Implement multiple scan toggle
- [ ] Implement data extraction UI
- [ ] Implement scanner order input
- [ ] Add conditional rendering logic
- [ ] Write validation rules
- [ ] Test scanner scenarios

**Integration**:
- [ ] Update `FieldConfiguration/index.tsx` to include new sections
- [ ] Update `types.ts` with new interfaces
- [ ] Update `useFieldConfiguration` hook for new fields
- [ ] Update `useFieldMutation` for new async operations
- [ ] Update mock API for new endpoints
- [ ] Test full integration with FormBuilder

**Testing**:
- [ ] Test all field type combinations
- [ ] Test conditional rendering logic
- [ ] Test validation rules
- [ ] Test async operations
- [ ] Test error handling
- [ ] Test mobile responsiveness

---

## Phase 3: Select Options & Lookups (NOT STARTED)

### Estimated Scope
**Complexity**: Medium
**Estimated Time**: 2-3 hours
**Dependencies**: Phase 2 complete

### Features to Implement

#### 3.1 Select Options Section

**File**: `sections/SelectOptionsSettings.tsx` (NEW)

**Applicable Types**:
- SELECT
- MULTIPLE_CHOICE
- TAGS_DROPDOWN
- CHECKBOX

**Features**:

1. **Options List**
   - Card-based list of options
   - Each option shows:
     - Value input (editable inline)
     - Drag handle (reorder)
     - Delete button
   - "+ Add Option" button at bottom
   - Minimum 2 options required

2. **Option Properties**
   - Option value (required)
   - Option label (internationalization support)
   - Option color (SELECT type only)
   - Option icon (SELECT type only)

3. **Default Selection**
   - Radio buttons for single-select (SELECT, TAGS_DROPDOWN)
   - Checkboxes for multi-select (MULTIPLE_CHOICE, CHECKBOX)
   - "No default" option

4. **Bulk Import**
   - Button: "Import from CSV"
   - Modal with textarea
   - Format: One option per line
   - Preview before import

**Data Structure**:
```typescript
interface SelectOption {
  id: string;
  value: string;
  label: string;
  intl?: { [locale: string]: string };
  position: number;
  color?: string;
  icon?: string;
}
```

**Validation Rules**:
- Minimum 2 options
- Option values must be unique
- Option values cannot be empty
- At least one option if field is required

**UX Principles**:
- Drag-to-Reorder: Intuitive position management
- Inline Editing: Edit values without modal
- Bulk Import: Efficient for many options

#### 3.2 Lookup Settings Section

**File**: `sections/LookupSettings.tsx` (NEW)

**Applicable Types**:
- STRING (autocomplete)
- SELECT (dynamic options)
- PEOPLE, PEOPLE_LIST

**Features**:

1. **Lookup Configuration**
   - API URL input
   - HTTP Method dropdown (GET, POST)
   - Headers (key-value pairs)
   - Auth header toggle + input
   - Response path input (JSON path)
   - Display field mapping (which field to show)
   - Value field mapping (which field to store)

2. **Query Parameters**
   - Search parameter name (e.g., "q", "search")
   - Min characters to trigger search
   - Debounce delay (milliseconds)
   - Max results to display

3. **Test Lookup**
   - Test input field
   - "Test API" button
   - Response preview
   - Success/error feedback

4. **Cache Settings**
   - Cache toggle
   - Cache duration (minutes)
   - Clear cache button

**Data Structure**:
```typescript
interface LookupSettings {
  url: string;
  method: 'GET' | 'POST';
  headers: { [key: string]: string };
  authHeader?: string;
  responsePath: string;
  displayField: string;
  valueField: string;
  searchParam: string;
  minChars: number;
  debounce: number;
  maxResults: number;
  cache: boolean;
  cacheDuration: number;
}
```

**Validation Rules**:
- URL must be valid format
- Response path must be valid JSON path
- Min chars must be 0-10
- Debounce must be 0-2000ms
- Max results must be 1-100
- Cache duration must be 1-1440 minutes

**UX Principles**:
- Test First: Allow testing before saving
- Clear Feedback: Show API response in preview
- Performance Hints: Suggest optimal debounce/cache

### Implementation Checklist for Phase 3

**Select Options**:
- [ ] Create `SelectOptionsSettings.tsx` component
- [ ] Implement options list with drag-to-reorder
- [ ] Implement inline value editing
- [ ] Implement add/delete options
- [ ] Implement default selection UI
- [ ] Implement bulk CSV import
- [ ] Add option color picker (SELECT type)
- [ ] Add option icon selector (SELECT type)
- [ ] Write validation rules
- [ ] Test with different field types

**Lookup Settings**:
- [ ] Create `LookupSettings.tsx` component
- [ ] Implement API configuration UI
- [ ] Implement query parameters UI
- [ ] Implement test lookup functionality
- [ ] Implement cache settings UI
- [ ] Add response preview
- [ ] Write validation rules
- [ ] Test API calls
- [ ] Test error handling

**Integration**:
- [ ] Update `FieldConfiguration/index.tsx`
- [ ] Update `types.ts` with new interfaces
- [ ] Update `useFieldConfiguration` hook
- [ ] Update `useFieldMutation` for async operations
- [ ] Update mock API
- [ ] Test full integration

---

## Phase 4: Field Visibility & Layout (NOT STARTED)

### Estimated Scope
**Complexity**: Low-Medium
**Estimated Time**: 1-2 hours
**Dependencies**: None (can be done in parallel with Phase 2/3)

### Features to Implement

#### 4.1 Visibility Settings Section

**File**: `sections/VisibilitySettings.tsx` (NEW)

**Features**:

1. **Platform Visibility**
   - Switch: "Show on Web"
   - Switch: "Show on Mobile"
   - Switch: "Show on Print"
   - Helper text for each

2. **List Display**
   - Switch: "Show in List Columns"
   - Position input (if enabled)
   - Helper text: "Field appears in list/table view"

3. **Case Card Visibility**
   - Switch: "Show on Case Card"
   - Helper text: "Field appears in card preview"

4. **Preview**
   - Visual representation of where field appears
   - Icons for Web, Mobile, Print, List

**Data Structure**:
```typescript
interface FieldVisibility {
  visibleOnWeb: boolean;
  visibleOnMobile: boolean;
  visibleOnPrint: boolean;
  visibleInList: boolean;
  visibleOnCaseCard: boolean;
  layoutWebFormPosition: number | null;
  layoutMobileFormPosition: number | null;
  layoutCaseListPosition: number | null;
  layoutPrintPosition: number | null;
}
```

**Validation Rules**:
- At least one visibility option must be enabled
- Position values must be positive integers
- System fields: Cannot disable mobile/web visibility

**UX Principles**:
- Visual Preview: Show where field appears
- Smart Defaults: All platforms enabled by default
- System Field Protection: Cannot hide critical fields

#### 4.2 Media & Attachments Section

**File**: `sections/MediaSettings.tsx` (NEW)

**Applicable Types**: All except FILES, FILE_LIST, SIGNATURE

**Features**:

1. **Allow Media Attachments**
   - Toggle: "Allow Media Attachments"
   - Helper text: "Users can attach photos/files to this field"
   - Condition dropdown:
     - Always
     - When value equals
     - When value contains
   - Value input (if conditional)

2. **Allow Remarks**
   - Toggle: "Allow Remarks"
   - Helper text: "Users can add text comments to this field"
   - Condition dropdown (same as media)

3. **Attachment Settings** (if media enabled)
   - Max attachments (number input)
   - Allowed file types (multi-select)
   - Max file size (MB)

**Data Structure**:
```typescript
interface AttachmentSettings {
  canAttachFile: boolean;
  attachmentCondition: 'always' | 'equals' | 'contains';
  attachmentValue?: string;
  maxAttachments?: number;
  allowedFileTypes?: string[];
  maxFileSize?: number;
  canAddRemarks: boolean;
  remarkCondition: 'always' | 'equals' | 'contains';
  remarkValue?: string;
}
```

**Validation Rules**:
- Max attachments must be 1-50
- Max file size must be 0.1-100 MB
- At least one file type if media enabled

**UX Principles**:
- Conditional Logic: Show/hide based on field value
- Smart Defaults: Reasonable limits pre-filled
- Clear Labels: Explain what each setting does

### Implementation Checklist for Phase 4

**Visibility Settings**:
- [ ] Create `VisibilitySettings.tsx` component
- [ ] Implement platform visibility switches
- [ ] Implement list display toggle
- [ ] Implement case card visibility toggle
- [ ] Implement position inputs
- [ ] Add visual preview
- [ ] Write validation rules
- [ ] Test with system fields

**Media & Attachments**:
- [ ] Create `MediaSettings.tsx` component
- [ ] Implement media attachments toggle
- [ ] Implement remarks toggle
- [ ] Implement conditional logic UI
- [ ] Implement attachment settings
- [ ] Write validation rules
- [ ] Test conditional scenarios

**Integration**:
- [ ] Update `FieldConfiguration/index.tsx`
- [ ] Update `types.ts` with new interfaces
- [ ] Update `useFieldConfiguration` hook
- [ ] Update mock API
- [ ] Test full integration

---

## Phase 5: Internationalization & Accessibility (NOT STARTED)

### Estimated Scope
**Complexity**: Medium
**Estimated Time**: 2-3 hours
**Dependencies**: Phase 1-4 complete (for full feature set)

### Features to Implement

#### 5.1 Internationalization Section

**File**: `sections/InternationalizationSettings.tsx` (NEW)

**Features**:

1. **Locale Management**
   - Primary locale selector (dropdown)
   - "+ Add Translation" button
   - List of active translations
   - Each translation shows:
     - Locale flag icon
     - Locale name
     - Edit button
     - Delete button

2. **Translation Editor**
   - Modal with tabs for each translatable field:
     - Label
     - Description
     - Help Text
     - Placeholder
     - Select Options (if applicable)
   - Side-by-side view: Primary | Translation
   - Character count for each field
   - "Copy from Primary" button

3. **Translation Status**
   - Progress indicator per locale
   - "Complete" badge when all fields translated
   - Warning icon for incomplete translations

4. **Bulk Translation**
   - Button: "Auto-Translate"
   - Service selector (Google Translate API, DeepL)
   - API key input
   - Preview before apply
   - Cost estimate (if paid service)

**Data Structure**:
```typescript
interface FieldIntl {
  [locale: string]: {
    label?: string;
    description?: string;
    helpText?: string;
    placeholder?: string;
    selectOptions?: { [optionId: string]: string };
  };
}
```

**Validation Rules**:
- Primary locale cannot be removed
- At least label must be translated
- Character limits same as primary language

**UX Principles**:
- Side-by-Side View: Easy comparison
- Progress Indicators: Clear completion status
- Quick Actions: Copy from primary, auto-translate

#### 5.2 Accessibility Section

**File**: `sections/AccessibilitySettings.tsx` (NEW)

**Features**:

1. **ARIA Properties**
   - ARIA label input (overrides default)
   - ARIA description input
   - ARIA role (auto-generated, read-only)
   - Helper text explaining each property

2. **Screen Reader Settings**
   - Announce changes toggle
   - Priority level (low, medium, high)
   - Custom announcement text

3. **Keyboard Navigation**
   - Tab order input (position in form)
   - Keyboard shortcuts input (optional)
   - Focus trap toggle (for modal fields)

4. **Visual Accessibility**
   - High contrast mode preview
   - Color blindness simulator
   - Font size preview (100%, 125%, 150%)

5. **Accessibility Score**
   - Overall score (0-100)
   - Checklist of issues:
     - Missing ARIA label
     - Low color contrast
     - Small touch targets
     - Missing keyboard shortcuts
   - "Fix All" quick action

**Data Structure**:
```typescript
interface AccessibilitySettings {
  ariaLabel?: string;
  ariaDescription?: string;
  ariaRole: string;
  announceChanges: boolean;
  announcePriority: 'low' | 'medium' | 'high';
  customAnnouncement?: string;
  tabOrder: number;
  keyboardShortcut?: string;
  focusTrap: boolean;
}
```

**Validation Rules**:
- Tab order must be positive integer
- Keyboard shortcut must be valid key combo
- ARIA label recommended if label is empty

**UX Principles**:
- Automated Checks: Score and issue detection
- Visual Previews: See accessibility impact
- Quick Fixes: One-click improvements

### Implementation Checklist for Phase 5

**Internationalization**:
- [ ] Create `InternationalizationSettings.tsx` component
- [ ] Implement locale management UI
- [ ] Implement translation editor modal
- [ ] Implement side-by-side translation view
- [ ] Implement translation status indicators
- [ ] Implement bulk auto-translate
- [ ] Write validation rules
- [ ] Test multiple locales

**Accessibility**:
- [ ] Create `AccessibilitySettings.tsx` component
- [ ] Implement ARIA properties UI
- [ ] Implement screen reader settings
- [ ] Implement keyboard navigation settings
- [ ] Implement visual accessibility previews
- [ ] Implement accessibility score checker
- [ ] Write validation rules
- [ ] Test with screen readers

**Integration**:
- [ ] Update `FieldConfiguration/index.tsx`
- [ ] Update `types.ts` with new interfaces
- [ ] Update `useFieldConfiguration` hook
- [ ] Update mock API
- [ ] Test full integration

---

## Phase 6: Performance & Polish (NOT STARTED)

### Estimated Scope
**Complexity**: Medium
**Estimated Time**: 2-3 hours
**Dependencies**: All previous phases complete

### Optimizations to Implement

#### 6.1 Performance Enhancements

**Features**:

1. **Form State Optimization**
   - Implement react-hook-form's `mode: 'onBlur'` for expensive fields
   - Debounce API calls (200-300ms)
   - Memoize complex calculations
   - Use `useCallback` for event handlers
   - Use `React.memo` for static sections

2. **Lazy Loading**
   - Code-split large sections (Phase 5 translations)
   - Lazy load modals (only when opened)
   - Virtualize long option lists (100+ items)

3. **API Request Optimization**
   - Batch multiple field updates
   - Implement optimistic UI updates
   - Cache lookup results
   - Cancel pending requests on close

4. **Bundle Size**
   - Analyze bundle size impact
   - Tree-shake unused MUI components
   - Remove duplicate dependencies
   - Use lighter alternatives where possible

**Metrics to Track**:
- Initial render time (< 100ms)
- Field update latency (< 50ms)
- Drawer open time (< 200ms)
- Bundle size increase (< 50KB gzipped)

#### 6.2 User Experience Polish

**Features**:

1. **Improved Transitions**
   - Smooth drawer slide-in (ease-in-out)
   - Fade-in for sections
   - Scale-up for modals
   - Loading skeletons for async content

2. **Better Feedback**
   - Toast notifications for save success
   - Inline validation feedback
   - Progress indicators for long operations
   - Confirmation messages

3. **Keyboard Shortcuts**
   - CMD/CTRL + S: Save changes
   - ESC: Close drawer
   - CMD/CTRL + Z: Undo (if undo implemented)
   - Tab: Navigate fields
   - Enter: Submit forms

4. **Error Handling**
   - Network error recovery
   - Validation error summaries
   - Friendly error messages
   - Retry failed operations

5. **Mobile Responsiveness**
   - Drawer becomes full-screen on mobile
   - Touch-optimized controls
   - Larger touch targets (44x44px)
   - Swipe to close

#### 6.3 Developer Experience

**Features**:

1. **Documentation**
   - JSDoc comments for all components
   - README for FieldConfiguration feature
   - Storybook stories for isolated testing
   - Type definitions for all props

2. **Testing**
   - Unit tests for hooks
   - Component tests for sections
   - Integration tests for full flow
   - Accessibility tests

3. **DevTools**
   - React DevTools integration
   - Performance profiling
   - State debugging tools

### Implementation Checklist for Phase 6

**Performance**:
- [ ] Implement form state optimization
- [ ] Add lazy loading for sections
- [ ] Optimize API requests
- [ ] Analyze and reduce bundle size
- [ ] Profile and fix performance bottlenecks
- [ ] Test on low-end devices

**UX Polish**:
- [ ] Improve transitions and animations
- [ ] Add toast notifications
- [ ] Implement keyboard shortcuts
- [ ] Improve error handling and messages
- [ ] Make fully mobile-responsive
- [ ] Test on multiple devices

**Developer Experience**:
- [ ] Add comprehensive JSDoc comments
- [ ] Write feature README
- [ ] Create Storybook stories
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Write accessibility tests

---

## Summary Checklist

### Phase 1: General Settings ✅
- [x] Drawer UI and header
- [x] Label field
- [x] Key field (auto-generation)
- [x] Data type selection
- [x] Data type locking flow
- [x] Description field
- [x] Required field toggle

### Phase 2: Advanced Settings & Logic ⏳
- [ ] Advanced Settings section (Field Actions, Formula, Data Lookup, Default Value, Scanning Order)
- [ ] Logic section (Conditional Visibility)
- [ ] Validation Rules section (Pattern, Length, Range, File, Unique)
- [ ] Scanner Settings section (Scanner Type, Multiple Scan, Data Extraction)

### Phase 3: Select Options & Lookups ⏳
- [ ] Select Options section (Options List, Drag-to-Reorder, Bulk Import)
- [ ] Lookup Settings section (API Config, Query Params, Test Lookup, Cache)

### Phase 4: Field Visibility & Layout ⏳
- [ ] Visibility Settings section (Platform Visibility, List Display, Case Card)
- [ ] Media & Attachments section (Media Attachments, Remarks, Conditions)

### Phase 5: Internationalization & Accessibility ⏳
- [ ] Internationalization section (Locale Management, Translation Editor, Bulk Translate)
- [ ] Accessibility section (ARIA Properties, Screen Reader, Keyboard Navigation, Accessibility Score)

### Phase 6: Performance & Polish ⏳
- [ ] Performance optimizations (Form State, Lazy Loading, API Requests, Bundle Size)
- [ ] UX polish (Transitions, Feedback, Keyboard Shortcuts, Error Handling, Mobile)
- [ ] Developer experience (Documentation, Testing, DevTools)

---

## Timeline Estimate

| Phase | Estimated Time | Dependencies | Status |
|-------|----------------|--------------|--------|
| Phase 1: General Settings | 3-4 hours | None | ✅ Complete |
| Phase 2: Advanced & Logic | 3-4 hours | Phase 1 | ⏳ Not Started |
| Phase 3: Options & Lookups | 2-3 hours | Phase 2 | ⏳ Not Started |
| Phase 4: Visibility & Media | 1-2 hours | None | ⏳ Not Started |
| Phase 5: i18n & A11y | 2-3 hours | Phases 1-4 | ⏳ Not Started |
| Phase 6: Performance & Polish | 2-3 hours | All phases | ⏳ Not Started |
| **Total** | **13-19 hours** | | **17% Complete** |

---

## Related Documentation

- [FormBuilder USER_JOURNEY.md](../FormBuilder/version3/USER_JOURNEY.md) - User flow integration
- [Field Component](../../components/Field/version5/Field.tsx) - Field rendering
- [CLAUDE.md](../../CLAUDE.md) - Project-wide guidelines

---

**Document Version**: 1.0
**Created**: 2025-10-08
**Last Updated**: 2025-10-08
**Author**: Claude Code (AI Assistant)
**Status**: Phase 1 Complete, Phases 2-6 Planned
