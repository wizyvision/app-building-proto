# FormBuilder Version 3 - User Journey & Flow Documentation

## Overview

FormBuilder v3 is a powerful form building interface that allows users to create, organize, and configure dynamic forms with sections and fields. It features inline insertion zones, drag-and-drop functionality, real-time mobile preview, and comprehensive field configuration.

---

## Entry Points

Users access FormBuilder v3 through:
- **Prototype Route**: `/prototypes/form-builder/version/3`
- **Component Integration**: Importing `<FormBuilder />` from `@/features/FormBuilder/version3`

---

## User Journey Map

### 1. Initial Load

**State**: Empty or Pre-populated Form
- **Empty State**: Shows centered prompt with "Add Section" button
- **Pre-populated**: Displays default sections (Workflow Status, Readings & Evidence)

**Visual Elements**:
- Toolbar with "Form Builder" title
- Action buttons: "Show/Hide Mobile Preview", "Cancel", "Save Form"
- Empty state icon (ViewStreamIcon) or section list
- Mobile preview panel (if enabled)

**User Mindset**: "What can I build? Where do I start?"

---

### 2. Adding Sections

#### Path A: From Empty State
1. User clicks "Add Section" button
2. New section appears with default name "New Section"
3. Section is expanded by default, ready for fields
4. Inline name editing automatically focused

#### Path B: Using Inline Insertion Zones
1. User hovers between existing sections
2. Thin line appears with menu on hover
3. Compact popover shows "Field" and "Section" options
4. User clicks "Section"
5. New section inserted at precise location

**UX Principles Applied**:
- **Jakob's Law**: Familiar card-based section pattern
- **Progressive Disclosure**: Insertion zones appear only on hover
- **Hick's Law**: Context-aware menu (only relevant options shown)
- **Fitts's Law**: Large click targets (44px minimum)

---

### 3. Organizing Sections

#### Drag-and-Drop Reordering
1. User grabs section header (entire header is draggable)
2. All sections collapse to headers during drag
3. Visual feedback:
   - DragOverlay shows preview of dragged section
   - Drop indicators (red line) show valid drop positions
   - Drop indicator position based on drag direction (above/below)
4. User drops section at new position
5. Sections re-expand after drop complete

**Visual Feedback**:
- **Active Section**: Opacity 0 (hidden, shows overlay instead)
- **Other Sections**: Collapsed to headers
- **Drop Indicator**: 10px height, 3px red line centered
- **Smooth Transitions**: Immediate collapse, no delay

#### Renaming Sections
1. User clicks section name
2. TextField appears inline
3. User types new name
4. Press Enter or click away to save
5. Name updates immediately

#### Deleting Sections
1. User clicks delete icon (non-system sections only)
2. Section removed immediately
3. Fields inside section are also deleted

**System Protection**: System sections (e.g., "Workflow Status") cannot be deleted

---

### 4. Adding Fields

#### Path A: Section "Add" Link
1. User clicks "Add or drag fields" → "Add" link (in empty section)
2. New field appears with label "New Field"
3. FieldConfiguration drawer opens automatically
4. User configures field settings

#### Path B: Inline Insertion Zones (Within Section)
1. User hovers between fields in section
2. Compact popover shows "Field" option only
3. User clicks "Field"
4. New field inserted at exact position
5. FieldConfiguration drawer opens

#### Path C: Inline Insertion Zones (Between Sections)
1. User hovers between sections (or at form boundaries)
2. Popover shows "Field" and "Section" options
3. User clicks "Field"
4. **Standalone field** created (no section wrapper)
5. Field renders at full section width
6. FieldConfiguration drawer opens

**Field Types Created**:
- **Default Type**: STRING (text input)
- **Default Label**: "New Field"
- **Default State**: Not required, not system field
- **Auto-Selection**: New field automatically selected for configuration

---

### 5. Configuring Fields

**FieldConfiguration Drawer** (Right-side panel)

**Available Tabs**:
1. **General**: Basic field properties
   - Label (text input)
   - Data Type (dropdown with lock mechanism)
   - Required toggle
   - Placeholder text
   - Help text

2. **Options**: For select/choice fields
   - Add/remove options
   - Reorder options
   - Default selection

3. **Validation**: Field validation rules
   - Required field
   - Min/max length
   - Pattern matching
   - Custom validation

4. **Advanced**: Additional settings
   - Field key (for API reference)
   - Conditional logic
   - Default values

**Data Type Locking**:
- **Unlocked**: User can change data type freely
- **Locked**: Requires confirmation to lock
  - Modal explains locking is permanent
  - "Cancel" or "Lock Data Type" options
  - Once locked, data type cannot be changed
  - Used to prevent breaking changes in production forms

**Close Behavior**:
- Click X button or outside drawer
- Changes saved automatically
- Drawer closes, field remains selected

---

### 6. Organizing Fields

#### Within Same Section (Drag-and-Drop)
1. User grabs field by drag handle
2. Visual feedback:
   - DragOverlay shows field preview
   - Drop zones appear between fields
3. User drops at new position
4. Field reordered immediately

#### Between Sections (Drag-and-Drop)
1. User drags field from source section
2. Drop zones appear in all sections
3. User drops in target section
4. Field moved immediately
5. Field appears at correct position in target section

#### Section to Standalone (Drag-and-Drop)
1. User drags field from section
2. Drop zones appear in standalone areas (between sections)
3. User drops in standalone area
4. Field removed from section
5. Standalone field created at drop position

#### Standalone to Section (Drag-and-Drop)
1. User drags standalone field
2. Drop zones appear inside sections
3. User drops in target section
4. Standalone field removed
5. Field added to section at correct position

**Visual Feedback**:
- **Drop Zones**: Blue dashed border, "Drop field here" text
- **Collapsed Sections**: When dragging field over collapsed section, shows drop zone
- **Active Field**: Opacity 0 (hidden, shows overlay instead)
- **Smooth Transitions**: 200ms ease

---

### 7. Field Inline Editing

**Label Editing**:
1. User clicks field label
2. TextField appears inline
3. User types new label
4. Press Enter or click away to save
5. Label updates immediately
6. Mobile preview updates in real-time

**Icon Display**:
- Field type icon shown next to label
- 24x24px icon from iconMapping
- Visual hierarchy: Drag handle → Icon → Label → Actions

---

### 8. Mobile Preview

**Toggle Preview**:
- Click "Show/Hide Mobile Preview" in toolbar
- Panel slides in/out from right side
- 375px iPhone-sized preview

**Live Sync**:
- All changes reflect instantly in preview
- Section collapsing/expanding
- Field label changes
- Field reordering
- Standalone fields render at full width (no section wrapper)
- Section fields render within section card

**Preview Features**:
- Scrollable content area
- iOS-style status bar
- Accurate field rendering (Field v5 components)
- Real field types (text, number, date, file, etc.)

---

### 9. Saving & Canceling

#### Save Flow
1. User clicks "Save Form" button
2. `onSave` callback fired with form data
3. Data format: Array of `SectionData` (backward compatible)
4. Standalone fields not included in sections array (future enhancement needed)

#### Cancel Flow
1. User clicks "Cancel" button
2. `onCancel` callback fired
3. No confirmation modal (assumes parent handles)
4. User exits FormBuilder

**Data Structure Returned**:
```typescript
{
  sections: [
    {
      id: string,
      name: string,
      isExpanded: boolean,
      isSystem: boolean,
      fields: [
        {
          id: string,
          label: string,
          type: FieldType,
          isRequired: boolean,
          ...
        }
      ],
      order: number
    }
  ]
}
```

---

## Key Interaction Patterns

### Insertion Zones (InlineInsertionZone)

**Default State**:
- 1px thin line (subtle gray, low opacity)
- 8px margin above/below (field spacing)
- 16px margin above/below (section spacing)

**Hover State**:
- Line becomes solid (higher opacity)
- Compact popover menu appears above line
- Menu items: 44px height, icon + label

**Context-Aware Options**:
| Location | Field Button | Section Button |
|----------|-------------|----------------|
| Between fields (in section) | ✅ | ❌ |
| End of section (after last field) | ✅ | ✅ |
| Between sections | ✅ (standalone) | ✅ |
| Form start/end | ✅ (standalone) | ✅ |

**Touch Targets**:
- Desktop: 24x24px icon buttons (web standard)
- Mobile: 44x44px (mobile standard) - future enhancement

---

### Drag-and-Drop Behavior

**Section Dragging**:
- **Trigger**: Grab section header
- **Visual**: All sections collapse, DragOverlay shows preview
- **Drop Indicator**: Red line (above when dragging up, below when dragging down)
- **Drop**: Section inserted at indicator position

**Field Dragging**:
- **Trigger**: Grab field drag handle (6 dots icon)
- **Visual**: DragOverlay shows full Field component, drop zones appear
- **Drop Zones**: Blue dashed border in valid locations
- **Drop**: Field inserted at drop zone position

**Collision Detection**: `closestCenter` algorithm
**Sensors**: Pointer (8px threshold) + Keyboard navigation
**Activation**: 8px drag distance prevents accidental drags

---

### Empty States

**Empty Form**:
```
[Icon]
No sections yet
Create your first section to start building your form
[Add Section Button]
```

**Empty Section** (while expanded):
```
Add or drag fields
("Add" is clickable link)
```

**Empty Section** (while collapsed):
- Shows field count: "0 fields"
- No additional messaging

---

## State Management

### Context Pattern (FormBuilderContext)

All state and handlers centralized in context:

**State**:
- `items`: FormItem[] (union of Section | Field)
- `selectedFieldId`: string | null

**Section Handlers**:
- `onSectionToggle`
- `onSectionRename`
- `onSectionDelete`
- `onSectionReorder`

**Field Handlers**:
- `onFieldLabelChange`
- `onFieldEdit`
- `onFieldMenuClick`
- `onFieldDelete`
- `onFieldReorder`
- `onFieldSelect`
- `onFieldUpdate`

**Insertion Handlers**:
- `onAddField` (add to section)
- `onInsertSection` (at specific position)
- `onInsertStandaloneField` (no section)

**Special Handlers**:
- `onLockDataType` (async, simulates API call)

---

## Data Flow

### Component Hierarchy

```
FormBuilder (main component)
├── FormBuilderProvider (context)
├── Toolbar (actions)
├── FormCanvas
│   ├── SectionList
│   │   ├── DndContext (drag-drop)
│   │   ├── InlineInsertionZone (before first item)
│   │   ├── Section (v3)
│   │   │   ├── Header (drag handle, title, actions)
│   │   │   ├── Content
│   │   │   │   ├── FieldList
│   │   │   │   │   ├── InlineInsertionZone (between fields)
│   │   │   │   │   ├── Field (v5)
│   │   │   │   │   ├── FieldDropZone (during drag)
│   │   │   │   │   └── InlineInsertionZone (after last field)
│   │   │   │   └── Empty State ("Add or drag fields")
│   │   ├── StandaloneField (Field v5, no section wrapper)
│   │   ├── InlineInsertionZone (between items)
│   │   ├── FieldDropZone (during field drag)
│   │   └── InlineInsertionZone (after last item)
│   ├── DragOverlay (section/field preview)
│   └── DropIndicator (red line during section drag)
├── MobilePreview (right panel)
│   ├── Phone Frame (375px)
│   ├── Status Bar (iOS style)
│   └── Form Content (sections + standalone fields)
└── FieldConfiguration (right drawer)
    ├── Tabs (General, Options, Validation, Advanced)
    ├── Form Fields (label, type, required, etc.)
    └── Data Type Lock Modal
```

---

## Technical Architecture

### Key Technologies
- **Framework**: React + TypeScript
- **Drag-Drop**: @dnd-kit/core + @dnd-kit/sortable
- **UI Library**: Material UI (MUI)
- **Styling**: MUI `styled()` components (theme-based)
- **State**: React hooks (useState, useCallback, useContext)

### Performance Optimizations
- **Memoized Callbacks**: All event handlers use `useCallback`
- **Context Provider**: Prevents prop drilling, centralized state
- **Drag Overlay**: Single overlay instead of duplicating dragged item
- **Conditional Rendering**: Insertion zones hidden during drag

### Versioned Components
- **Section**: Version 3 (collapsible, drag-drop, inline edit)
- **Field**: Version 5 (type icons, drag handle, inline edit)
- **FieldConfiguration**: Version 1 (drawer, tabs, data type locking)

---

## User Flow Diagrams

### Complete User Journey

```
START
  ↓
[Load FormBuilder]
  ↓
  ├─→ Empty State → Click "Add Section" → Section Created
  │                                           ↓
  │                                    [Configure Section]
  │                                           ↓
  └─→ Pre-populated → [View Sections & Fields]
                            ↓
                      [User Actions]
                            ↓
            ┌───────────────┼───────────────┐
            ↓               ↓               ↓
      [Add Content]  [Organize Layout] [Configure Fields]
            ↓               ↓               ↓
      • Add Section   • Drag Sections  • Click Field
      • Add Field     • Drag Fields    • Edit Label
      • Insert Zone   • Reorder        • Change Type
      • Standalone    • Collapse       • Set Required
            ↓               ↓               ↓
            └───────────────┼───────────────┘
                            ↓
                    [Review in Mobile Preview]
                            ↓
                      [Save or Cancel]
                            ↓
                          END
```

### Insertion Zone Flow

```
Hover Insertion Zone
  ↓
[Popover Menu Appears]
  ↓
  ├─→ Click "Field"
  │     ↓
  │   [Field Created at Position]
  │     ↓
  │   [FieldConfiguration Opens]
  │
  └─→ Click "Section"
        ↓
      [Section Created at Position]
        ↓
      [Section Expanded & Ready]
```

### Drag-Drop Flow

```
User Grabs Item
  ↓
  ├─→ [Section Drag Detected]
  │     ↓
  │   • All sections collapse
  │   • DragOverlay shows preview
  │   • Drop indicators appear
  │     ↓
  │   [User Hovers Over Section]
  │     ↓
  │   • Indicator above/below (based on direction)
  │     ↓
  │   [User Drops]
  │     ↓
  │   • Section reordered
  │   • Sections re-expand
  │
  └─→ [Field Drag Detected]
        ↓
      • DragOverlay shows field
      • Drop zones appear
        ↓
      [User Hovers Drop Zone]
        ↓
      • Drop zone highlights (blue)
        ↓
      [User Drops]
        ↓
        ├─→ Same section → Reorder
        ├─→ Different section → Move
        ├─→ Standalone area → Extract from section
        └─→ Into section → Add to section
```

---

## Edge Cases & Behaviors

### System Fields
- **Cannot Delete**: Delete button hidden
- **Can Edit Label**: Inline editing allowed
- **Can Reorder**: Drag-drop enabled
- **Data Type Locked**: Cannot change type (e.g., Status, Date)

### Data Type Locking
- **Unlocked State**: User can change type freely in dropdown
- **Locking Process**:
  1. User selects new type
  2. Modal appears: "Lock Data Type?"
  3. User confirms
  4. Type locked permanently
  5. Dropdown becomes read-only
- **Purpose**: Prevents breaking changes in production forms

### Drag-Drop Constraints
- **8px Activation**: Prevents accidental drags
- **No Self-Drop**: Cannot drop item on itself
- **Valid Drop Zones Only**: Invalid zones don't respond
- **Keyboard Navigation**: Arrow keys + Enter to drop

### Mobile Preview Sync
- **Instant Updates**: No debounce, immediate reflection
- **Full Width Standalone**: Standalone fields render like sections
- **Section Grouping**: Section fields grouped in card
- **Scrollable**: Content scrolls independently

### Insertion Zone Behavior
- **Hidden During Drag**: No insertion zones visible while dragging
- **Context-Aware**: Options change based on location
- **Hover Delay**: 150ms delay before hiding on mouse leave
- **No Layout Shift**: Absolute positioning prevents reflow

---

## Accessibility Features

### Keyboard Navigation
- **Tab Order**: Logical flow through sections → fields → actions
- **Enter/Space**: Activate buttons, open drawers
- **Escape**: Close drawers, cancel editing
- **Arrow Keys**: Navigate drag-drop with keyboard

### Screen Reader Support
- **ARIA Labels**: All interactive elements labeled
- **Role Attributes**: Proper semantic roles
- **Live Regions**: Announce changes (field added, section moved)
- **Focus Management**: Focus returns to trigger after drawer close

### Touch Targets
- **Desktop**: 24x24px icon buttons (web standard)
- **Mobile**: 44x44px minimum (future enhancement needed)
- **Spacing**: 8px minimum between interactive elements

---

## Future Enhancements

### Planned Features
- [ ] Undo/Redo functionality
- [ ] Bulk field operations (duplicate, delete multiple)
- [ ] Field templates library
- [ ] Export/Import form JSON
- [ ] Form validation preview
- [ ] Conditional field visibility rules
- [ ] Save standalone fields in data structure
- [ ] Mobile touch target optimization (44x44px)

### Known Limitations
- Standalone fields not saved in `onSave` callback (only sections)
- No confirmation on cancel (assumes parent handles)
- No auto-save (manual save required)
- FieldConfiguration drawer data not persisted until save

---

## Changelog Reference

See main `/CLAUDE.md` file for detailed version history:
- **v3** (2025-10-07): Inline insertion zones, standalone fields, enhanced drag-drop
- **v2**: Previous iteration (refer to version2 folder)
- **v1**: Initial implementation (refer to version1 folder)

---

## Persona-Based Scenarios

### Persona 1: Sarah - Business Analyst

**Background**:
- Role: Business Analyst at manufacturing company
- Experience: 5 years in process optimization
- Technical Skills: Low to medium (comfortable with forms, not a developer)
- Goal: Create inspection forms for field technicians

**Scenario: Building Equipment Inspection Form**

**Context**: Sarah needs to digitize a paper-based equipment inspection form used by technicians during site visits.

**Journey**:

1. **Discovery Phase** (First 30 seconds)
   - Opens FormBuilder v3
   - Sees pre-populated "Workflow Status" section
   - Thinks: "This looks like the status tracking we need. I'll keep this."
   - Sees mobile preview on right
   - Thinks: "Good, I can see how technicians will use this on their phones."

2. **Structure Planning** (2 minutes)
   - Clicks "Add Section" for equipment details
   - Renames to "Equipment Information"
   - Hovers between sections, discovers inline insertion
   - Adds another section: "Safety Checklist"
   - Adds final section: "Photos & Documentation"
   - **UX Win**: Inline zones feel natural, no hunting for buttons

3. **Field Creation** (10 minutes)
   - In "Equipment Information":
     - Clicks "Add" link
     - Changes label to "Equipment ID"
     - Opens FieldConfiguration drawer
     - Changes type to STRING
     - Enables "Required"
     - Adds help text: "Scan barcode or enter manually"
     - **UX Win**: Drawer stays open, easy to configure multiple properties

   - Adds more fields using insertion zones:
     - "Manufacturer" (STRING)
     - "Model Number" (STRING)
     - "Installation Date" (DATE)
     - **UX Win**: Insertion zones appear exactly where needed

4. **Field Organization** (5 minutes)
   - Realizes "Installation Date" should be higher
   - Drags field using 6-dot handle
   - Drops above "Model Number"
   - **UX Win**: Visual feedback (overlay + drop zones) makes drag-drop confident
   - Checks mobile preview
   - Sees fields in new order immediately
   - **UX Win**: Real-time preview builds confidence

5. **Safety Checklist Creation** (15 minutes)
   - Opens "Safety Checklist" section
   - Adds multiple yes/no fields:
     - "PPE Worn Properly?" (SELECT with Yes/No options)
     - "Area Cleared?" (SELECT)
     - "Equipment Locked Out?" (SELECT)
   - For each field:
     - Opens FieldConfiguration
     - Changes type to SELECT
     - Adds Options tab
     - Adds "Yes" and "No" options
     - Sets "No" to trigger alert (Advanced tab)
   - **UX Win**: Tab structure in drawer is intuitive
   - **Pain Point**: Repetitive for similar fields (future: field templates)

6. **Photo Documentation** (3 minutes)
   - In "Photos & Documentation":
     - Adds "Equipment Photos" field
     - Changes type to FILES
     - Sees camera icon appear next to field
     - Sets required: true
     - Adds "Technician Notes" (TEXT, multiline)
   - Checks mobile preview
   - Sees AttachmentField component (camera interface)
   - **UX Win**: Field type icons help identify purpose at glance

7. **Final Review** (5 minutes)
   - Collapses all sections to see structure
   - **UX Win**: Clean header-only view shows form outline
   - Expands sections one-by-one
   - Drags "Safety Checklist" to top (most important)
   - All sections collapse during drag
   - **UX Win**: Reduced visual clutter during section reorder
   - Reviews mobile preview on iPhone frame
   - Satisfied with field order and layout

8. **Save & Deploy** (1 minute)
   - Clicks "Save Form"
   - Form sent to backend
   - Deploys to field technicians
   - **Outcome**: 45-minute form creation, replaces 2-week paper form redesign

**Key Takeaways**:
- ✅ Inline insertion zones discovered naturally
- ✅ Mobile preview built confidence
- ✅ Drag-drop felt intuitive with visual feedback
- ✅ FieldConfiguration drawer organization was clear
- ⚠️ Repetitive field setup for similar fields (opportunity for templates)

---

### Persona 2: Marcus - Solutions Architect

**Background**:
- Role: Solutions Architect at enterprise software company
- Experience: 12 years in system design
- Technical Skills: High (full-stack developer background)
- Goal: Design reusable form templates for client projects

**Scenario: Creating Multi-Use Incident Report Template**

**Context**: Marcus needs to build a flexible incident report form that can be customized per client while maintaining core structure.

**Journey**:

1. **Requirements Analysis** (10 minutes)
   - Reviews client requirements:
     - Core fields: Date, Location, Reporter, Severity
     - Client-specific fields: Custom tags, approvals, integrations
     - Multiple sections: Incident Details, People Involved, Follow-up Actions
   - Opens FormBuilder v3
   - Deletes pre-populated sections (not relevant)
   - **UX Win**: Can delete sections quickly (non-system)

2. **Core Structure Design** (15 minutes)
   - Creates section: "Incident Overview" (system section)
   - Adds fields:
     - "Incident ID" (STRING, system field)
     - "Date & Time" (DATE, required)
     - "Location" (STRING, required)
     - "Severity" (SELECT: Low/Medium/High/Critical)
   - For "Severity" field:
     - Opens FieldConfiguration → General tab
     - Sets type to SELECT
     - Switches to Options tab
     - Adds 4 options with proper ordering
     - **Technical Note**: Considers option.position for sorting
   - Creates standalone field: "Quick Summary" (TEXT)
     - Uses insertion zone between sections
     - **UX Win**: Standalone field for prominent placement
     - Configures as multiline, max 500 chars

3. **People Involved Section** (10 minutes)
   - Adds section: "People Involved"
   - Creates repeatable field pattern:
     - "Reporter Name" (STRING)
     - "Reporter Email" (STRING with email validation)
     - "Witnesses" (STRING, multiline)
   - For "Reporter Email":
     - Opens Validation tab in drawer
     - Sets validation type: Email
     - Adds error message: "Valid email required"
     - **Technical Win**: Validation rules structured as expected

4. **Advanced Configuration** (20 minutes)
   - Adds section: "Follow-up Actions"
   - Creates "Assigned To" field (SELECT)
     - Configures as people picker
     - **Technical Note**: Plans integration with user directory API
     - In Advanced tab:
       - Sets field key: `assignedTo` (camelCase for API)
       - Adds conditional logic JSON:
         ```json
         {
           "value": "High,Critical",
           "targetFieldKeys": ["approvalRequired"]
         }
         ```
       - **Technical Win**: Logic structure matches backend schema

   - Adds "Approval Required" field (hidden by default)
     - Sets field key: `approvalRequired`
     - Configures as boolean with default: false
     - **Technical Note**: Will show only when Severity is High/Critical

5. **Data Type Locking Strategy** (5 minutes)
   - Reviews all system/core fields
   - Locks data types for:
     - "Incident ID" (STRING - API dependency)
     - "Date & Time" (DATE - reporting requirements)
     - "Severity" (SELECT - integration with alerting system)
   - For each lock:
     - Selects field → FieldConfiguration
     - Changes type (triggers lock modal)
     - Reviews lock warning
     - Confirms lock
     - **Technical Win**: Lock prevents breaking changes in production
   - Leaves flexible fields unlocked (client customization)

6. **Section Organization & Logic** (10 minutes)
   - Reorders sections by priority:
     1. Incident Overview (system)
     2. Quick Summary (standalone)
     3. People Involved
     4. Follow-up Actions
   - Drags sections using header
   - Observes collapse behavior
   - **UX Win**: Collapse during drag reduces cognitive load
   - Tests drag-drop for standalone field
   - Moves "Quick Summary" between sections
   - **Technical Win**: Standalone fields maintain independence

7. **Mobile Optimization Review** (15 minutes)
   - Toggles mobile preview
   - Reviews field rendering on 375px screen
   - Checks standalone field (full width as expected)
   - Verifies section fields (grouped in cards)
   - Tests field types in preview:
     - AttachmentField for FILES
     - DateField for DATE
     - TextField for STRING/TEXT
     - **Technical Win**: FieldFactory correctly maps types
   - Notes field icon display:
     - 24x24px icons next to labels
     - Visual hierarchy: Handle → Icon → Label → Actions
     - **UX Win**: Icons aid quick scanning

8. **Documentation & Handoff** (10 minutes)
   - Exports form structure (mentally notes data format)
   - Documents field keys for API team:
     - `incidentId`, `dateTime`, `location`, `severity`
     - `assignedTo`, `approvalRequired`
   - Creates notes for client customization points:
     - Unlocked fields: Reporter Name, Witnesses, Custom fields
     - Locked fields: Core system fields
   - **Technical Win**: Clear separation of fixed vs flexible fields

9. **Save as Template** (2 minutes)
   - Clicks "Save Form"
   - Names template: "Incident Report v1.0"
   - Shares with project team
   - **Outcome**: Reusable template, 90 minutes vs 4-hour manual setup

**Key Takeaways**:
- ✅ Data type locking critical for system integrity
- ✅ Field keys in Advanced tab enable API mapping
- ✅ Standalone fields provide layout flexibility
- ✅ Conditional logic structure matches backend expectations
- ✅ Mobile preview ensures field types render correctly
- ⚠️ No export/import JSON feature (manual documentation needed)
- ⚠️ No template versioning (future: version control for templates)

---

### Persona 3: Alex - Junior Developer

**Background**:
- Role: Junior Frontend Developer (6 months experience)
- Experience: Bootcamp grad, first job
- Technical Skills: Medium (React basics, learning MUI)
- Goal: Integrate FormBuilder into new feature, customize styling

**Scenario: Adding Form Builder to Project Management App**

**Context**: Alex's team is building a project management tool. They need to let project managers create custom task forms. Alex is assigned to integrate FormBuilder v3.

**Journey**:

1. **Setup & Integration** (30 minutes)
   - Reads FormBuilder documentation
   - Imports component:
     ```typescript
     import { FormBuilder } from '@/features/FormBuilder/version3';
     ```
   - Adds to parent component:
     ```typescript
     <FormBuilder
       initialSections={[]}
       onSave={handleSave}
       onCancel={handleCancel}
     />
     ```
   - Runs dev server, sees FormBuilder render
   - **UX Win**: Component works out-of-box, no complex setup

2. **Understanding Data Structure** (20 minutes)
   - Clicks "Save Form" to see console output
   - Inspects returned data:
     ```typescript
     {
       sections: [
         {
           id: "section-1",
           name: "Task Details",
           fields: [
             { id: "field-1", label: "Task Name", type: "STRING", ... }
           ],
           order: 0
         }
       ]
     }
     ```
   - **Confusion**: Where are standalone fields?
   - Reads documentation: "Standalone fields not saved in onSave callback"
   - **Learning**: Current limitation, workaround needed
   - Notes for future: Request enhancement

3. **Customizing Default Sections** (15 minutes)
   - Team wants pre-filled sections for project tasks
   - Modifies `initialSections` prop:
     ```typescript
     const initialSections = [
       {
         id: 'section-1',
         name: 'Task Information',
         isSystem: false,
         isExpanded: true,
         fields: [
           {
             id: 'field-1',
             label: 'Task Name',
             type: DataTypes.STRING,
             isRequired: true,
             isSystem: false,
           },
           {
             id: 'field-2',
             label: 'Due Date',
             type: DataTypes.DATE,
             isRequired: true,
             isSystem: false,
           }
         ],
         order: 0
       }
     ];
     ```
   - Reloads app
   - Sees pre-filled section with fields
   - **UX Win**: Preview immediately shows customizations

4. **Handling Save Callback** (25 minutes)
   - Implements `handleSave`:
     ```typescript
     const handleSave = async (sections: SectionData[]) => {
       try {
         const response = await api.post('/forms', { sections });
         toast.success('Form saved!');
         router.push('/forms');
       } catch (error) {
         toast.error('Save failed');
       }
     };
     ```
   - Tests save flow
   - Data posts successfully to API
   - **Technical Win**: Data structure matches API expectations

5. **Styling Customization** (45 minutes)
   - Product wants branded colors (not default red)
   - Reads CLAUDE.md styling rules: "ZERO sx prop, use styled()"
   - **Confusion**: How to override FormBuilder styling?
   - Searches codebase for `styled()` examples
   - Finds `/features/FormBuilder/version3/styles.ts`
   - Attempts to wrap FormBuilder:
     ```typescript
     const CustomFormBuilder = styled(FormBuilder)(({ theme }) => ({
       // Tries to override colors
       '& .MuiButton-root': {
         backgroundColor: theme.palette.secondary.main
       }
     }));
     ```
   - **Problem**: Doesn't work (FormBuilder uses internal styled components)
   - Asks senior developer for help
   - **Learning**: Need to fork or request theme prop support
   - **Workaround**: Uses theme provider wrapper:
     ```typescript
     <ThemeProvider theme={customTheme}>
       <FormBuilder {...props} />
     </ThemeProvider>
     ```
   - **UX Win**: Colors now match brand (secondary cyan instead of primary red)

6. **Testing Drag-Drop** (20 minutes)
   - Product manager asks: "Can we disable drag-drop for some users?"
   - Alex reviews FormBuilder props
   - **Confusion**: No `disableDragDrop` prop
   - Searches documentation
   - Finds: "Drag-drop always enabled in v3"
   - **Learning**: Would need to fork or request feature
   - Reports back to PM: "Not configurable in current version"
   - **Outcome**: Accepted as current limitation

7. **Mobile Preview Integration** (15 minutes)
   - Product wants mobile preview optional (save screen space)
   - Sees toolbar button: "Show/Hide Mobile Preview"
   - Tests toggle behavior
   - **UX Win**: Already built-in!
   - Sets default state in parent component:
     ```typescript
     const [showPreview, setShowPreview] = useState(false);
     ```
   - **Wait**: FormBuilder manages preview state internally
   - **Learning**: No control over default preview visibility
   - **Workaround**: Asks users to click toggle button
   - **Future Request**: Add `defaultPreviewVisible` prop

8. **Field Type Customization** (30 minutes)
   - Team needs "Priority" field (color-coded dropdown)
   - Current SELECT type doesn't support colors
   - Reviews FieldFactory:
     ```typescript
     // features/Mobile/FieldFactory/index.tsx
     case DataTypes.SELECT:
       return <SelectField {...props} />;
     ```
   - **Learning**: Would need to extend FieldFactory
   - **Option 1**: Fork and modify FieldFactory
   - **Option 2**: Use STRING with instructions
   - **Decision**: Use STRING for now, request enhancement
   - **Future**: Custom field type support

9. **Testing & Debugging** (40 minutes)
   - Tests full user flow:
     1. Add section → ✅ Works
     2. Add fields → ✅ Works
     3. Drag-drop fields → ✅ Works
     4. Configure field → ✅ Opens drawer
     5. Lock data type → ⚠️ Modal appears, confusing for users
     6. Save form → ✅ API call successful
   - **Issue Found**: Data type lock modal scary for non-technical users
   - **Learning**: Might need to hide lock feature for simple use cases
   - **Workaround**: Adds help text in UI explaining lock purpose

10. **Documentation & Handoff** (20 minutes)
    - Documents integration for team:
      - Import statement
      - Props required
      - Data structure returned
      - Known limitations (standalone fields, no drag-drop disable)
      - Customization options (theme wrapper)
    - Creates ticket for future enhancements:
      - [ ] Add `defaultPreviewVisible` prop
      - [ ] Add `disableDragDrop` prop
      - [ ] Support standalone fields in save data
      - [ ] Add `onFieldTypeChange` callback
      - [ ] Custom field type support
    - **Outcome**: Integration complete, 4 hours total

**Key Takeaways**:
- ✅ Component integration straightforward
- ✅ Data structure clear and well-documented
- ✅ Out-of-box functionality comprehensive
- ⚠️ Limited customization without forking
- ⚠️ No control over drag-drop or preview defaults
- ⚠️ Styling customization requires theme wrapper approach
- ⚠️ Field type extensibility not built-in
- 📚 **Learning Opportunity**: Junior dev gained deep understanding of component architecture
- 📚 **Documentation**: Integration notes help future developers

---

## Persona Comparison Matrix

| Aspect | Sarah (Business Analyst) | Marcus (Solutions Architect) | Alex (Junior Developer) |
|--------|--------------------------|------------------------------|-------------------------|
| **Primary Goal** | Create usable forms quickly | Design reusable templates | Integrate into app |
| **Technical Depth** | Surface-level (UI only) | Deep (data structure, logic) | Medium (component usage) |
| **Key Features Used** | Inline zones, drag-drop, mobile preview | Data type locking, field keys, conditional logic | Props, callbacks, theme |
| **Pain Points** | Repetitive field setup | No JSON export/import | Limited customization |
| **Success Metric** | 45 min (vs 2 weeks paper) | 90 min (vs 4 hours manual) | 4 hours integration |
| **UX Wins** | Intuitive interactions | Clear data structure | Works out-of-box |
| **Feature Requests** | Field templates | Template versioning | More props, extensibility |
| **Learning Curve** | 5 minutes (immediate) | 20 minutes (exploring advanced) | 2 hours (integration + customization) |

---

## Cross-Persona Insights

### What Works for Everyone
1. **Inline Insertion Zones**: All personas discovered and used naturally
2. **Drag-Drop Visual Feedback**: Overlay + drop zones built confidence
3. **Mobile Preview**: Real-time sync validated decisions
4. **FieldConfiguration Drawer**: Tab structure was intuitive

### What Needs Improvement
1. **Customization Flexibility** (Alex's pain point):
   - Add more props for control (drag-drop, preview, validation)
   - Support theme customization without wrapper
   - Enable custom field types

2. **Template & Reusability** (Sarah & Marcus's request):
   - Field templates for repetitive setups
   - Export/import JSON functionality
   - Version control for templates

3. **Advanced User Onboarding** (Marcus's need):
   - Better documentation for conditional logic
   - Examples for complex field configurations
   - API integration patterns

4. **Data Structure Completeness** (Alex's discovery):
   - Include standalone fields in save data
   - Expose more granular callbacks (onFieldTypeChange, etc.)

---

## Related Documentation

- **Component Guidelines**: `/CLAUDE.md`
- **Field Component**: [Field.tsx](../../components/Field/version5/Field.tsx)
- **Section Component**: [Section/index.tsx](../../components/Section/version3/index.tsx)
- **FieldConfiguration**: [FieldConfiguration/](../FieldConfiguration/version1/)
- **Type Definitions**: [types.ts](./types.ts)
- **Context**: [FormBuilderContext.tsx](./context/FormBuilderContext.tsx)

---

**Document Version**: 1.1
**Last Updated**: 2025-10-08
**Author**: Claude Code (AI Assistant)
**Review Status**: ✅ Complete (with Persona Scenarios)
