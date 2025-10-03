# Section Component - Behavior Documentation

## Overview
The Section component is a collapsible container used to group related form fields in the Form Builder. It provides drag-and-drop reordering, inline title editing, and expand/collapse functionality.

---

## Component States

### 1. Collapsed State
**Visual:**
- Section header visible
- Content area hidden
- Chevron icon points right (▶)
- Height: 64px (header only)

**Behavior:**
- Click header → Expands section
- Click chevron icon → Expands section
- Drag handle visible on hover
- Title is visible and can be edited

### 2. Expanded State
**Visual:**
- Section header visible
- Content area visible with fields
- Chevron icon points down (▼)
- Height: 64px (header) + content height + padding

**Behavior:**
- Click header → Collapses section
- Click chevron icon → Collapses section
- Fields render in content area
- Scroll appears if content exceeds container

### 3. System Section
**Visual:**
- "System" badge appears after title
- No delete button
- All other visuals same as regular section

**Behavior:**
- Cannot be deleted (no delete button shown)
- CAN be renamed
- CAN be reordered
- CAN have fields added/removed

---

## User Interactions

### Header Click
**Trigger:** User clicks anywhere on section header (except icons/title in edit mode)

**Behavior:**
```
IF section is collapsed:
  - Expand section (show content)
  - Rotate chevron to down (▼)
  - Call onToggle()
  - Animate expansion (200ms ease-out)

ELSE IF section is expanded:
  - Collapse section (hide content)
  - Rotate chevron to right (▶)
  - Call onToggle()
  - Animate collapse (200ms ease-out)
```

**UX Principle:** Fitts's Law - Large clickable area (entire header) makes toggling easy

---

### Title Edit
**Trigger:** User clicks section title text

**Behavior:**
```
1. Title text becomes editable input field
2. Input auto-focuses with text selected
3. User types new title
4. User presses Enter OR clicks outside input:
   - Save new title
   - Call onRename(newTitle)
   - Exit edit mode
5. User presses Escape:
   - Cancel edit
   - Revert to original title
   - Exit edit mode
```

**Visual States:**
- Normal: Title appears as text with cursor: text on hover
- Edit mode: Input field with underline, auto-focused
- Hover: Background changes to indicate clickable

**UX Principle:** Jakob's Law - Inline editing pattern familiar from spreadsheets/tables

---

### Drag to Reorder Sections
**Trigger:** User clicks and drags the drag handle (6-dot icon)

**Behavior:**
```
1. User grabs drag handle:
   - Cursor changes to "grabbing"
   - Section becomes semi-transparent (opacity: 0.5)
   - Drag overlay follows cursor with shadow

2. During drag:
   - Section auto-collapses to reduce visual clutter
   - Other sections shift to show drop position
   - Drop indicators appear between sections

3. User drops section:
   - IF dropped on valid zone:
     * Section moves to new position
     * Smooth animation (200ms)
     * Call onDragEnd()
   - IF dropped outside valid zone:
     * Section returns to original position
```

**UX Principles:**
- Direct Manipulation - Drag-and-drop is intuitive
- Visual Feedback - Clear indicators show where item will drop

---

### Delete Section
**Trigger:** User clicks delete icon (trash can)

**Pre-condition:**
- Delete icon only visible if `isSystem === false`
- System sections never show delete icon
- Delete icon appears on hover (progressive disclosure)

**Behavior:**
```
1. User clicks delete icon:
   - Call onDelete() callback
   - Parent handles confirmation and deletion logic

2. Visual feedback:
   - Delete icon turns red on hover
   - Cursor changes to pointer
```

**UX Principles:**
- Error Prevention - Parent should show confirmation dialog
- Progressive Disclosure - Delete only visible on hover

---

## Field Management

### Drag Field Within Same Section
**Trigger:** User drags field within the section

**Behavior:**
```
1. User grabs field drag handle:
   - Field becomes semi-transparent (opacity: 0.3)
   - Drag overlay follows cursor with white background and shadow

2. During drag:
   - Blue drop indicator (3px line) appears above hovered field
   - Indicator shows exact insertion point
   - Only ONE indicator visible at a time

3. User drops field:
   - Field inserts at indicator position
   - Smooth animation
   - Other fields shift to make space
```

**Visual Feedback:**
- Original field: 30% opacity
- Drag overlay: White background, strong shadow, 95% opacity
- Drop indicator: Blue line (primary color), 3px height

---

### Drag Field to Different Section
**Trigger:** User drags field from another section

**Behavior:**
```
1. User drags field over target section:
   - IF section has fields:
     * Blue drop indicator appears above hovered field
   - IF section is empty:
     * Empty state becomes drop zone
     * Shows "Drop field here" text
     * Border changes to blue dashed

2. User drops field:
   - Field moves to new section
   - Removed from original section
   - Appears at drop position in target section
   - Brief highlight animation (optional)
```

**Empty Section Drop Zone:**
- Height: 80px when dragging
- Border: 2px dashed, turns blue on hover
- Background: Subtle grey, turns primary.lighter on hover
- Text: "Drop field here"

---

### Drag Field to Empty Section
**Trigger:** User drags field to section with no fields

**Behavior:**
```
1. Empty section shows large drop zone:
   - Minimum height: 80px
   - Border: 2px dashed grey
   - Text: "Drop field here"

2. On hover:
   - Border turns blue
   - Background turns light blue
   - Text remains visible

3. On drop:
   - Field appears in section
   - Empty state replaced with field
   - Normal drop indicators active for future drags
```

**UX Principle:** Affordance - Clear visual indication that empty section accepts drops

---

## Drag & Drop System

### Drop Indicators
**Within Section (Same Section):**
- Direction-based positioning:
  - Dragging DOWN: Indicator appears BELOW hovered field
  - Dragging UP: Indicator appears ABOVE hovered field
- Only one indicator visible at a time

**Between Sections (Cross-Section):**
- Indicator appears ABOVE hovered field (always)
- Indicator at end of list when hovering bottom area

**Visual Specs:**
- Height: 3px
- Color: Primary blue
- Border radius: 1px
- Margin: 8px horizontal
- Appears instantly (no fade-in)

### Collision Detection
**Priority Order:**
1. Field drop zones (`drop-end-*`, `empty-section-*`)
2. Individual fields (`field-*`)
3. Section drop zones (collapsed sections)

**Custom Logic:**
- When dragging field: Prioritize field drop zones over section sortables
- When dragging section: Only section sortables are valid targets
- Pointer-within detection used for accuracy

---

### Add Field Button
**Visual:**
- Outlined button style (not filled)
- Primary color border and text
- Plus (+) icon on left
- Text: "Add Field"
- Centered in section content area

**Behavior:**
```
User clicks "Add Field":
  - Call onAddField() callback
  - Parent handles field creation/insertion logic
  - New field typically appears at end of section
```

---

## Keyboard Navigation

### Tab Order
```
Within section header:
1. Drag handle (focusable, shows outline)
2. Chevron icon (Space/Enter to toggle)
3. Title (Enter to edit)
4. Delete icon (Enter to delete)

Within section content (if expanded):
5. Each field in order
6. Add Field button
```

### Keyboard Shortcuts
- **Enter** (on chevron): Toggle expand/collapse
- **Enter** (on title): Enter edit mode
- **Enter** (in edit mode): Save changes
- **Escape** (in edit mode): Cancel edit
- **Tab**: Navigate through interactive elements
- **Shift+Tab**: Navigate backwards

---

## Edge Cases

### Empty Section
**State:** Section has no fields inside

**Visual:**
- Shows empty state: "Add or Drag Fields here"
- When dragging: Shows larger drop zone with dashed border
- Message is centered, grey text

**Behavior:**
- Section can still be collapsed/expanded
- Drop zone appears when field is dragged
- Can be deleted (if not system section)

### Section Being Dragged
**Behavior:**
- Auto-collapses during drag
- Content hidden to reduce visual clutter
- Header remains visible in drag overlay
- Drop indicators disabled inside being-dragged section

### Multiple Sections Collapsed
**Behavior:**
- Each collapsed section shows drop zone for fields
- Drop zones appear as thin line at bottom of section card
- Hovering shows blue highlight

### System Section Cannot Be Deleted
**Visual:**
- No delete icon visible
- Cannot be triggered via keyboard or mouse

**Behavior:**
- System badge indicates special status
- All other functionality works normally

---

## Animation Specifications

### Timings
- **Expand/collapse**: 200ms ease-out
- **Chevron rotation**: 200ms
- **Drag opacity**: Instant
- **Drop indicator**: Instant appearance
- **Field insertion**: 200ms smooth shift

### Transitions
```css
/* Section collapse/expand */
transition: height 200ms ease-out;

/* Chevron rotation */
transform: rotate(0deg);
transition: transform 200ms;

/* Drag handle visibility */
opacity: 0 → 1
transition: opacity 200ms;

/* Drop indicator */
/* No transition - instant appearance */
```

---

## Props Interface

```typescript
interface SectionProps {
  id: string;              // Unique identifier
  name: string;            // Section name
  isExpanded: boolean;     // Controlled expand/collapse state
  fieldCount?: number;     // Number of fields (for badge)
  isSystem?: boolean;      // If true, no delete button
  onToggle: () => void;    // Called on expand/collapse
  onRename: (newName: string) => void;  // Called on title change
  onDelete?: () => void;   // Called on delete (optional)
  children?: ReactNode;    // Fields inside section
}
```

### Internal State
```typescript
const [isEditing, setIsEditing] = useState(false);
const [editValue, setEditValue] = useState(name);
const [isHovered, setIsHovered] = useState(false);
```

---

## UX Principles Applied

1. **Jakob's Law** - Familiar accordion/collapsible pattern users expect
2. **Fitts's Law** - Large header click target (64px height, full width), 44x44px icons
3. **Hick's Law** - Limited visible actions, progressive disclosure for delete
4. **Miller's Law** - Sections group 5-7 fields for cognitive load management
5. **Progressive Disclosure** - Drag handle and delete only visible on hover
6. **Visual Hierarchy** - Section name largest, badge secondary, icons tertiary
7. **Direct Manipulation** - Drag-and-drop for intuitive reordering
8. **Consistency** - Same interaction patterns as Field component

---

## Accessibility

### ARIA Labels
- Drag handle: `aria-label="Drag to reorder section"`
- Chevron: `aria-label="Expand/Collapse section"`
- Delete: `aria-label="Delete section"`
- Section header: `role="button"` for expand/collapse

### Focus Management
- Visible focus indicators on all interactive elements
- Focus outline: 2px solid primary color, 2px offset
- Tab order follows logical flow
- Focus trapped in title edit mode (Escape to exit)

### Screen Reader Support
- Section announces state: "Expanded" or "Collapsed"
- Field count announced: "Contains 5 fields"
- System section announced: "System section, cannot be deleted"

---

## Testing Scenarios

1. **Toggle expand/collapse** - Verify animation smooth, state updates
2. **Rename section** - Test edit mode, Enter/Escape keys
3. **Drag section to reorder** - Test auto-collapse, position update
4. **Delete section** - Verify callback fired (if not system)
5. **Drag field within section** - Test drop indicators, direction-based
6. **Drag field between sections** - Test cross-section drops
7. **Drag field to empty section** - Test empty state drop zone
8. **Keyboard navigation** - Test Tab order, Enter/Escape
9. **Empty section** - Verify empty state shows
10. **System section** - Verify no delete icon, can be renamed/reordered
11. **Hover states** - Test progressive disclosure (drag handle, delete)
12. **Multiple rapid toggles** - Verify no animation conflicts

---

## Implementation Notes

### Dependencies
- `@dnd-kit/core` - Drag and drop functionality
- `@dnd-kit/sortable` - Sortable lists
- `@mui/material` - UI components (Collapse, TextField, etc.)

### Key Components
- `Section` (index.tsx) - Main container with drag/drop
- `SectionHeader` - Header with title, icons, controls
- `SectionContent` - Collapsible content area with fields

### Collision Detection
Custom collision detection prioritizes field drop zones:
```typescript
customCollisionDetection() {
  // 1. Check for field drop zones first
  // 2. Then check for field targets
  // 3. Finally fall back to section targets
}
```

### State Management
- Parent controls `isExpanded` state
- Parent handles field reordering via callbacks
- Section manages internal edit state locally

---

## Related Components
- [Field Component](../Field/BEHAVIOR.md) - Individual form fields
- [FieldLibrary](../FieldLibrary/BEHAVIOR.md) - Field type picker
- [FormBuilder](../../features/FormBuilder/README.md) - Main form editor

---

## Version History
- **v1.0** (2025-10-02) - Initial implementation
  - Collapsible sections
  - Drag-and-drop reordering
  - Inline title editing
  - Field management with drop indicators
  - Empty section drop zones
  - Custom collision detection
