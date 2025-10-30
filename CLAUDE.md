# WizyVision Form Builder Prototype - Development Guidelines

> **CRITICAL**: This is the main orchestrator document. Read the appropriate detailed guidelines based on your task.

---

## 🗺️ QUICK NAVIGATION

**Choose your path based on the task:**

### 📐 **Creating or Styling Components?**
→ **Start with [DESIGN_GUIDELINES.md](./DESIGN_GUIDELINES.md)** (navigation hub)

Then read specific topics in `docs/`:
- **[Theme](./docs/theme.md)** - Colors, spacing, typography
- **[Styling Rules](./docs/styling-rules.md)** - styled() components, no sx prop
- **[Component Structure](./docs/component-structure.md)** - Organization & versioning
- **[UX Principles](./docs/ux-principles.md)** - Jakob's Law, Fitts's Law, etc.
- **[Interactivity](./docs/interactivity.md)** - States, transitions, responsive
- **[Figma Workflow](./docs/figma-workflow.md)** - Implementing designs

### 🔧 **Integrating Logic or Working with Data?**
→ **Read [ARCHITECTURE.md](./ARCHITECTURE.md)**
- Field data structures
- Constants usage (DataTypes, SystemKeys)
- State management patterns
- API integration with React Query
- Data flow & logic organization

### 🎨 **Both UI and Logic?**
→ **Read both documents above**

### 📚 **Working on Specific Feature?**
→ **Check `features/[FeatureName]/CLAUDE.md` for feature-specific details**

---

## ⚡ BEFORE YOU START (SAVE TIME)

**MANDATORY: Check these first to avoid redundant work:**

1. **Check the CHANGELOG below** - Recent features may already be implemented
2. **Check feature-specific CLAUDE.md files** - Individual features have detailed documentation:
   - `features/[FeatureName]/CLAUDE.md` - Feature-specific implementation details
   - `components/[ComponentName]/CLAUDE.md` - Component-specific guidelines
3. **Search the codebase** - The feature you're asked to build may already exist in another version

**Why this matters:**
- Saves time by not re-implementing existing features
- Provides context on recent changes and decisions
- Ensures you understand current implementation patterns

**Example workflow:**
```
User asks: "Add drag-and-drop to FormBuilder"

❌ WRONG: Immediately start implementing
✅ CORRECT:
  1. Check CHANGELOG → See "FormBuilder Version 3" has drag-drop
  2. Check features/FormBuilder/version3/CLAUDE.md → Find implementation details
  3. Review existing code → Understand current approach
  4. Then proceed with informed implementation
```

---

## 📝 CHANGELOG

### FormBuilder Version 4 (hello-pangea/dnd) - 2025-10-30

**MAJOR RELEASE: Complete Migration from dnd-kit to hello-pangea/dnd**

#### Overview
FormBuilder v4 is a complete refactor of the drag-and-drop system, migrating from `dnd-kit` (hook-based) to `@hello-pangea/dnd` (component-based). The migration maintains **100% feature parity** with v3 while providing a simpler, more maintainable architecture.

#### Library Comparison

| Aspect | dnd-kit (v3) | hello-pangea/dnd (v4) |
|--------|------------|----------------------|
| **Approach** | Hooks-based (useSortable) | Component-based (Draggable/Droppable) |
| **DragDropContext** | Nested at multiple levels | Single at app root |
| **Drag Handler** | listeners from hook | dragHandleProps from render function |
| **Drag State** | Hook return value | snapshot parameter |
| **Collision Detection** | Required (closestCenter) | Built-in |
| **API Complexity** | Medium | Low |
| **Type Safety** | Good | Excellent |
| **Accessibility** | Manual | Built-in |
| **Animations** | Manual | Automatic |

#### Key Architecture Changes

**1. Component-Based Pattern**
```typescript
// v3: Hook-based
const { setNodeRef, listeners, attributes } = useSortable({ id });

// v4: Component-based
<Draggable draggableId={id} index={index}>
  {(provided, snapshot) => (
    <div ref={provided.innerRef} {...provided.draggableProps}>
      {/* content */}
    </div>
  )}
</Draggable>
```

**2. Drag Handler Props**
- v3: Used `dragListeners` and `dragAttributes` from hook
- v4: Uses `provided.dragHandleProps` in render function
  - Applied to the drag handle element (usually an icon)
  - Provides automatic cursor change and accessibility

**3. Single DragDropContext**
- v3: Required nested DndContext → SortableContext at multiple levels
- v4: Single `<DragDropContext onDragEnd={handleDragEnd}>` at root
  - Simplifies component nesting
  - Better performance

**4. DropResult Handler**
```typescript
const handleDragEnd = (result: DropResult) => {
  const { source, destination, draggableId, type } = result;
  // source: { droppableId, index }
  // destination: { droppableId, index } (null if dropped outside)
};
```

**5. Droppable ID Naming Convention**
- Sections container: `sections-droppable`
- Fields in section: `fields-droppable-${sectionId}`
- Standalone fields: `standalone-fields-droppable`
- Collapsed section drop: `section-drop-${sectionId}`

#### Files Modified/Created

**New Files:**
- `features/FormBuilder/version4/FormBuilder.tsx` - Main component with DragDropContext
- `features/FormBuilder/version4/SectionList.tsx` - Root Droppable with sections and standalone fields
- `features/FormBuilder/version4/FieldList.tsx` - Nested Droppable for section fields
- `features/FormBuilder/version4/context/FormBuilderContext.tsx` - Updated context (removed unused handlers)
- `components/Field/version6/Field.tsx` - Field component with Draggable wrapper
- `components/Section/version4/index.tsx` - Section component with Draggable/Droppable integration
- `components/Section/version4/Header.tsx` - Section header with dragHandleProps
- `app/prototypes/form-builder/version/4.0/page.tsx` - Demo page

**Copied from v3 (No Changes):**
- `features/FormBuilder/version4/types.ts` (modified: removed unused FieldListProps properties)
- `features/FormBuilder/version4/styles.ts`
- `features/FormBuilder/version4/utils/migration.ts`
- `features/FormBuilder/version4/utils/typeConversion.ts`
- `features/FormBuilder/version4/InlineInsertionZone.tsx`
- `features/FormBuilder/version4/DropIndicator.tsx`
- `features/FormBuilder/version4/FieldDropZone.tsx`
- `features/FormBuilder/version4/MobilePreview.tsx`
- `components/Section/version4/Content.tsx`
- `components/Section/version4/types.ts`
- `components/Section/version4/styles.ts`
- `components/Field/version6/types.ts`
- `components/Field/version6/styles.ts`
- `components/Field/version6/DragIcon.tsx`

#### Context Changes

**Removed (No longer needed in v4):**
- `onSectionReorder: (sectionId: string, newIndex: number) => void` - Reordering handled in handleDragEnd
- `onFieldReorder: (...)` - Reordering handled in handleDragEnd

**All other handlers maintained:**
- Section: toggle, rename, delete
- Field: labelChange, edit, menuClick, delete, select, update
- Insertion: addField, insertField, insertSection, insertStandaloneField
- Lock: lockDataType

#### Features (100% Feature Parity with v3)

✅ **Drag & Drop**
- Section reordering
- Field reordering within section
- Field movement between sections
- Standalone field creation and movement
- Collapsed section drop zones

✅ **Section Management**
- Expand/collapse with smooth transitions
- Inline rename with keyboard support (Enter to save, Esc to cancel)
- Delete non-system sections
- System section badge
- Empty state messaging

✅ **Field Management**
- Inline rename with keyboard support
- Required indicator (red asterisk)
- System field badge
- Field type icons (leading position)
- Edit and menu action buttons
- Selection highlighting

✅ **Insertion Zones**
- Inline popover-based insertion (no dashed buttons)
- Context-aware (Field vs Field+Section)
- After each field (within sections)
- After sections and standalone fields
- At form start and end

✅ **Mobile Preview**
- Real-time sync with desktop form
- Responsive layout (375px iPhone width)
- Touch-optimized field rendering
- Section expansion sync

**Building Blocks Analysis:**

**SectionList Component:**
- Root-level `Droppable` containing all items
- Maps sections and standalone fields as `Draggable` items
- Handles insertion zones between items
- Passes fields to FieldList component

**FieldList Component:**
- Nested `Droppable` within each section
- Maps fields as `Draggable` items
- Handles insertion zones between fields
- Uses context for event handlers

**Field/Section Components:**
- Wrapped in `Draggable` component
- Receives `provided` and `snapshot` from render function
- Applies `provided.dragHandleProps` to drag handle
- Uses `snapshot.isDragging` for visual feedback

#### Migration Guide (v3 → v4)

**If upgrading from v3, follow this checklist:**

1. ✅ Import from v4 instead of v3
   ```typescript
   import { FormBuilder } from '@/features/FormBuilder/version4';
   ```

2. ✅ Remove any custom `onSectionReorder`/`onFieldReorder` handlers
   - These are now internal to FormBuilder via handleDragEnd

3. ✅ Update component references if using Section/Field directly
   ```typescript
   // v3
   import { Section } from '@/components/Section/version3';
   import { Field } from '@/components/Field/version5';

   // v4
   import { Section } from '@/components/Section/version4';
   import { Field } from '@/components/Field/version6';
   ```

4. ✅ Check props passed to components
   - SectionList now has simpler interface
   - FieldList no longer needs onFieldReorder prop

5. ✅ Data structure is 100% compatible
   - Same nested FieldData with children arrays
   - No migration needed for existing data

**Performance Improvements:**
- Fewer re-renders (component-based batching)
- Better optimization of Draggable/Droppable components
- Simpler dependency tracking in context

**Known Limitations:**
- None - Full feature parity with v3

**Testing Checklist:**
- [ ] Section drag and reorder works
- [ ] Field drag within section works
- [ ] Field drag to other section works
- [ ] Standalone field creation and drag works
- [ ] Collapsed section drop zone works
- [ ] Insertion zones appear and function correctly
- [ ] Mobile preview syncs correctly
- [ ] All keyboard interactions (Enter, Escape) work
- [ ] Field selection highlighting works
- [ ] System field badges display correctly

---

### FormBuilder Version 3 + Field v5 + Constants - 2025-10-08

**Major Changes:**

#### Field Component Version 5
- **Field Type Icons**: Added leading icon to field component based on data type
  - Icons positioned between drag handle and label
  - 24x24px icon size (consistent with action buttons)
  - Uses `iconMapping` constant for type-to-icon conversion
  - Visual hierarchy: Drag handle → Field type icon → Label → Actions

- **Layout Adjustments**:
  - Reduced field height from 64px to 56px (more compact)
  - Added 8px bottom padding for better spacing
  - Icon container: 24x24px with proper alignment

- **Icon Support**: All field data types now have corresponding icons
  - System fields: STATUS_ID, FILES, TAGS, WATCHERS, SITE, etc.
  - Custom fields: STRING, TEXT, DATE, DOUBLE, SELECT, etc.
  - Fallback: No icon shown if type not in mapping

#### Icon Mapping Enhancements
- **Expanded Icon Mapping**: Added icons for all DataTypes
  - System Fields: STATUS_ID (ArrowDropdown), FILES (AttachFile), PRIVACY_ID (ArrowDropdown)
  - Complete coverage for all DataTypes constants
  - Organized by category (System Fields, Custom Fields, Additional Fields)

#### Constants Architecture
- **Created DataTypes Constants** (`constants/dataTypes.ts`)
  - All field data types as constants (UPPERCASE values)
  - System fields: FILES, STATUS_ID, TAGS, PRIVACY_ID, WATCHERS, etc.
  - Custom fields: STRING, TEXT, DATE, DOUBLE, SELECT, etc.
  - Type-safe with `DataType` type export

- **Created SystemKeys Constants** (`constants/systemKeys.ts`)
  - Field key identifiers (camelCase values)
  - Common metadata keys: title, description, createdAt, status, etc.
  - Clear distinction from DataTypes (key vs dataType property)

- **Usage Documentation**:
  - `dataType` property uses DataTypes (UPPERCASE)
  - `key` property uses SystemKeys (camelCase)
  - No more magic strings in field definitions

#### FormBuilder Enhancements
- **Default Data Structure**: Added default sections with realistic fields
  - "Workflow Status" section with Status and Date fields
  - "Readings & Evidence" section with Pressure Reading and Photo fields
  - Uses DataTypes constants instead of hardcoded strings
  - Provides immediate visual feedback in prototype

- **Field Movement Improvements**:
  - Enhanced standalone field movement logic
  - Better field-to-section and section-to-standalone conversions
  - Maintains field order during complex drag operations

- **Type System Updates**:
  - Extended FieldType to include all DataTypes values
  - Backward compatibility with lowercase legacy types
  - Added `onInsertField` handler to SectionListProps

#### Mobile Preview
- **Field Factory Integration**: Added support for Files field type
  - Renders AttachmentField for FILES data type
  - Complete field type coverage in mobile preview

**Files Modified:**
- `components/Field/version5/Field.tsx` - Added field type icon rendering
- `components/Field/version5/styles.ts` - Added FieldIconContainer, adjusted heights and padding
- `components/Field/version5/DragIcon.tsx` - Minor icon size adjustments
- `constants/iconMapping.ts` - Expanded icon mapping for all DataTypes
- `constants/dataTypes.ts` - NEW: DataTypes constants
- `constants/systemKeys.ts` - NEW: SystemKeys constants
- `features/FormBuilder/version3/FormBuilder.tsx` - Default sections, DataTypes usage
- `features/FormBuilder/version3/types.ts` - Extended FieldType, added onInsertField handler
- `features/FormBuilder/version3/FieldDropZone.tsx` - Type updates
- `features/FormBuilder/version3/FieldList.tsx` - Type updates
- `features/FormBuilder/version3/SectionList.tsx` - Handler prop additions
- `features/FormBuilder/version3/DropIndicator.tsx` - Positioning refinements
- `features/Mobile/FieldFactory/index.tsx` - Added FILES field support
- `app/prototypes/form-builder/version/3/page.tsx` - Removed hardcoded initialSections
- `CLAUDE.md` - Reorganized into modular documentation structure

**Breaking Changes:**
- None (backward compatible)
- Legacy lowercase field types still supported alongside DataTypes constants

**Documentation Updates:**
- Split guidelines into modular documents (DESIGN_GUIDELINES.md, ARCHITECTURE.md)
- Created comprehensive Field Data Structure documentation
- Added DataTypes vs SystemKeys distinction guide
- Updated cross-referencing system between documents

**Known Issues:**
- None

---

### FormBuilder Version 3 - 2025-10-07

**Major Changes:**
- **Inline Insertion Zones**: Replaced dashed button-based insertion with subtle hover-based inline insertion zones
  - Compact popover menu appears on hover (no layout shifts)
  - Context-aware: Shows "Field" only between fields, "Field + Section" between sections
  - Uses `InlineInsertionZone` component throughout
  - Disabled legacy `InsertionOverlay` component

- **Standalone Fields Support**: Fields can now exist outside of sections
  - Data structure changed from `sections[]` to `items[]` (union of Section | Field)
  - Standalone fields render at full width in mobile preview (no section wrapper)
  - Standalone fields match section width in desktop builder
  - Created `FormItem` union type for type-safe handling

- **Empty Section State**: Improved UX for empty sections
  - Shows "Add or drag fields" message
  - "Add" is clickable link (primary color with hover underline)
  - 4px margin between "Add" and "or drag fields" for better readability
  - Drop zone active when dragging fields

- **Insertion Zone Improvements**:
  - Added insertion zone after last field in each section (Field + Section options)
  - Added insertion zone after last section/item in form
  - All insertion zones properly positioned (no zones at wrong locations)
  - Minimal vertical space (1px line + 8px margins = ~10px total)
  - Section insertion correctly inserts at specified position (not at end)

- **Touch Target Override**: Changed from 44x44px mobile standard to 24x24px for web
  - Icon buttons: 24x24px (compact web sizing)
  - Applies to all insertion zone buttons
  - Note: Mobile-specific components may still use 44x44px

- **Drag-and-Drop Section Collapse**: Enhanced section drag-and-drop behavior to match v1/v2
  - All sections collapse to header-only view during section drag operations
  - Original dragged section position hidden (opacity: 0) while DragOverlay shows preview
  - Drop indicators positioned consistently based on drag direction (above when dragging down, below when dragging up)
  - Drop indicators maintain 10px height (matching insertion zone spacing) with 3px red line
  - Insertion zones hidden during drag to reduce visual clutter
  - Immediate collapse with no animation delay for responsive feel

**Files Modified:**
- `features/FormBuilder/version3/FormBuilder.tsx` - Disabled InsertionOverlay, refactored state to items[]
- `features/FormBuilder/version3/SectionList.tsx` - Added insertion zone after last item, implemented v2-style drop indicator logic
- `features/FormBuilder/version3/FieldList.tsx` - Added insertion zone after last field (both buttons)
- `features/FormBuilder/version3/InlineInsertionZone.tsx` - Compact popover design
- `features/FormBuilder/version3/InsertionOverlay.tsx` - Removed section-end zones
- `features/FormBuilder/version3/MobilePreview.tsx` - Renders standalone fields at full width
- `features/FormBuilder/version3/DropIndicator.tsx` - Updated to maintain 10px height with 3px centered line
- `features/FormBuilder/version3/types.ts` - Added FormItem union type
- `features/FormBuilder/version3/styles.ts` - Added compact zone styling
- `components/Section/version3/Content.tsx` - Empty state with clickable "Add" link, immediate return null during drag
- `components/Section/version3/index.tsx` - Added opacity: 0 for dragged section, effectiveIsExpanded logic
- `components/Section/version3/styles.ts` - EmptyStateLink and EmptyStateText styling with 4px margin

**Breaking Changes:**
- None (backward compatible, data structure conversion handled internally)

**Known Issues:**
- Drag-drop for standalone fields not yet implemented (fields can't be reordered via drag)
- FieldData type conflict between FormBuilder and Field component (pre-existing)

---

## 📋 PROTOTYPE STRUCTURE (MANDATORY)

### Route Hierarchy

```
/ (Home)
├── /prototypes (Feature List)
│   └── /prototypes/[feature] (Feature Overview with Version Cards)
│       └── /prototypes/[feature]/version/[id] (Wireframe/Design View)
│
└── /components (Component Showcase)
    ├── Drawer Navigation (components list)
    └── Component View (variants: empty, filled, states)
```

### Page Breakdown

**1. Home Page (`/`)**
- Purpose: Navigation hub
- Links to: "Prototypes" and "Components"
- Clean, minimal, centered layout

**2. Prototypes Landing (`/prototypes`)**
- Purpose: List all features/prototypes
- Display: Grid/list of feature cards
- Navigation: Click feature → feature overview

**3. Feature Overview (`/prototypes/[feature]`)**
- Purpose: Show all versions of a feature
- Display: Case study cards for each version
- Content per card: Version number, description, thumbnail, date
- Navigation: Click version card → wireframe view

**4. Wireframe View (`/prototypes/[feature]/version/[id]`)**
- Purpose: Display specific wireframe/design
- Content: Full design with annotations
- Back navigation to feature overview

**5. Components Showcase (`/components`)**
- Layout: Drawer (left) + Main content (right)
- Drawer: List of all components (Section, Field, Button, etc.)
- Main: Selected component with interactive variants
- Variants: Empty state, filled state, hover, disabled, error, etc.

---

## 📦 TECH STACK REFERENCE

- **Framework**: Next.js 14 (App Router)
- **UI Library**: Material UI v5
- **Form Management**: React Hook Form v7
- **Drag & Drop**: dnd-kit
- **State Management**: React Query v5
- **Styling**: MUI styled() + theme

### Import Patterns

```typescript
// MUI Components
import { Box, Card, Button, Typography, Stack } from '@mui/material';

// MUI Icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

// MUI Styling
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

// Theme
import { designTokens } from '@/theme/designTokens';
```

---

## 🎯 TASK-BASED QUICK REFERENCE

### "Create a new component"
1. Check CHANGELOG - does it already exist?
2. Read [Component Structure](./docs/component-structure.md) - Determine: Presentational or Stateful?
3. Read [UX Principles](./docs/ux-principles.md) - Which principles apply?
4. Read [Styling Rules](./docs/styling-rules.md) - Follow styling patterns
5. Read [Interactivity](./docs/interactivity.md) - Implement all states
6. Reference [Theme](./docs/theme.md) - Use theme tokens

### "Implement business logic"
1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) - Logic organization patterns
2. Create custom hooks in `hooks/` folder
3. Use React Query for server data
4. Extract utilities to `utils/` folder
5. Follow "props down, events up" pattern

### "Integrate component with data"
1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) - Data structures and constants
2. Read [Component Structure](./docs/component-structure.md) - Organization
3. Use DataTypes and SystemKeys constants (no magic strings)
4. Set up proper state management (useState/Context/React Query)
5. Handle loading/error states

### "Style an existing component"
1. Read [Styling Rules](./docs/styling-rules.md) - Use only styled() components
2. Reference [Theme](./docs/theme.md) - Use theme tokens
3. Read [Interactivity](./docs/interactivity.md) - Ensure all states work
4. Read [Figma Workflow](./docs/figma-workflow.md) - If implementing from design

### "Implement from Figma"
1. Read [Figma Workflow](./docs/figma-workflow.md) - Complete step-by-step process
2. Extract specs → List all → Confirm → Implement exact values → Verify
3. Reference [Styling Rules](./docs/styling-rules.md) - Implementation patterns
4. Reference [Theme](./docs/theme.md) - Theme tokens (if approved)

### "Work with Field data"
1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) - Field data structure
2. Import types from `/types/field`
3. Use DataTypes constants for field types
4. Use SystemKeys constants for field keys
5. No hardcoded strings

---

## 🚀 DEVELOPMENT WORKFLOW

### Quick Decision Tree

```
┌─────────────────────────────────────┐
│ What are you building?             │
└──────────────┬──────────────────────┘
               │
       ┌───────┴────────┐
       │                │
   UI/Styling?     Logic/Data?
       │                │
       ▼                ▼
DESIGN_GUIDELINES  ARCHITECTURE.md
       .md              │
       │                │
       └────────┬───────┘
                │
                ▼
         Build the feature
                │
                ▼
         Review checklists
                │
                ▼
              Commit
```

### Before Committing - Quick Checks

**For UI components:**
- [ ] All styling in `styles.ts` (zero sx props)
- [ ] Theme tokens used (no hardcoded values)
- [ ] UX principles documented
- [ ] Interactive states implemented
- [ ] Responsive breakpoints defined

**For logic/data:**
- [ ] Constants used (DataTypes, SystemKeys)
- [ ] Proper state management (useState/Context/React Query)
- [ ] Logic in custom hooks or utils
- [ ] API calls in separate layer
- [ ] Props down, events up pattern

---

## 📚 DOCUMENTATION STRUCTURE

```
/
├── CLAUDE.md (this file)           # Main orchestrator & changelog
├── DESIGN_GUIDELINES.md            # Navigation hub for UI/styling
├── ARCHITECTURE.md                 # All data, logic, integration rules
│
├── docs/                           # Modular design documentation
│   ├── theme.md                    # Colors, spacing, typography
│   ├── styling-rules.md            # styled() components, no sx
│   ├── component-structure.md      # Organization & versioning
│   ├── ux-principles.md            # Design principles
│   ├── interactivity.md            # States, transitions, responsive
│   └── figma-workflow.md           # Figma implementation process
│
├── features/
│   └── [FeatureName]/
│       └── CLAUDE.md               # Feature-specific details
│
└── components/
    └── [ComponentName]/
        └── CLAUDE.md               # Component-specific details
```

---

## 📞 WHEN IN DOUBT

1. **Check CHANGELOG** - Feature may already exist
2. **Read appropriate detailed doc**:
   - UI/Styling: [DESIGN_GUIDELINES.md](./DESIGN_GUIDELINES.md) → specific topic in `docs/`
   - Logic/Data: [ARCHITECTURE.md](./ARCHITECTURE.md)
3. **Check feature-specific docs** - Look in `features/[FeatureName]/CLAUDE.md`
4. **Search codebase** - Similar implementations may exist
5. **Ask before implementing** - Confirm approach if uncertain

---

**REMEMBER**: This is a prototype for stakeholder feedback. Quality > Speed. Follow the guidelines in the detailed documents strictly to ensure consistent, professional output.
