# FormBuilder Feature

## Purpose
Interactive drag-and-drop form builder for creating and managing form layouts. Provides two versioned implementations (Pattern A and Pattern B) for stakeholder comparison and feedback.

## Key Points

### 1. Versioned Architecture
**Version 1.0 (Pattern A)**: Inline field addition
- Fields added inline within sections
- "Add Field" button appears inside each section
- Compact UI, minimal drawer usage

**Version 2.0 (Pattern B)**: Persistent field library
- Dedicated left sidebar with draggable field buttons
- Fields dragged from library into form
- Includes mobile preview on the right side
- More visual, discoverable field types

**Version 3.0 (Pattern C)**: Context-aware inline addition with mobile preview
- Hover/tap zones between fields show contextual action buttons
- Progressive disclosure: buttons appear only when needed
- Different button combinations based on cursor position
- Minimizes visual clutter while maintaining clear affordances
- Desktop: hover-activated, Tablet: tap-to-reveal
- Includes mobile preview on the right side (like v2)

### 2. Core Functionality
- **Section Management**: Add, edit, delete, expand/collapse sections
- **Field Management**: Add, edit, delete, reorder fields
- **Drag & Drop**: Reorder sections and fields via dnd-kit
- **Live Preview**: Version 2 includes mobile form preview
- **State Management**: Internal state for form structure

### 3. Component Structure
```
features/FormBuilder/
├── index.tsx                           # Main exports (v1, v2, v3)
├── version1/
│   ├── index.tsx                       # Pattern A implementation
│   └── styles.ts                       # v1-specific styles
├── version2/
│   ├── index.tsx                       # Pattern B implementation
│   ├── styles.ts                       # v2-specific styles
│   ├── DraggableFieldLibraryButton.tsx # Draggable field buttons
│   └── MobileFormPreview/
│       ├── index.tsx                   # Mobile preview component
│       └── styles.ts                   # Preview-specific styles
└── version3/
    ├── index.tsx                       # Pattern C implementation
    ├── styles.ts                       # v3-specific styles
    ├── InsertionZone.tsx               # Hover/tap zone component
    ├── ContextualActions.tsx           # Add Field/Section buttons
    └── MobileFormPreview/
        ├── index.tsx                   # Mobile preview component (shared with v2)
        └── styles.ts                   # Preview-specific styles
```

### 4. UX Principles Applied

**Jakob's Law**: Familiar builder patterns
- Drag-and-drop form builders are common (Google Forms, Typeform, etc.)
- Expand/collapse sections (familiar accordion pattern)
- Inline editing (click to edit titles/labels)

**Fitts's Law**: Easy-to-target interactions
- Large drag handles (44x44px minimum)
- Full-width section headers (easier to click/drag)
- Adequate spacing between draggable items (prevents mis-clicks)

**Hick's Law**: Limited field types reduce choice overload
- Version 1: Hidden field types until "Add Field" clicked
- Version 2: ~5-7 visible field types in library (within Miller's Law limit)
- Progressive disclosure: Advanced options hidden until needed

**Visual Hierarchy**: Clear structure
- Sections are primary containers (higher elevation)
- Fields are secondary items (nested within sections)
- Drag handles are tertiary affordances (subtle, discoverable on hover)

**Miller's Law**: Chunking information
- Form organized into sections (logical grouping)
- Field library categorized by type
- Limited to 5-7 field types visible at once

### 5. Version Comparison

| Feature | Version 1 (Pattern A) | Version 2 (Pattern B) | Version 3 (Pattern C) |
|---------|----------------------|----------------------|----------------------|
| **Field Addition** | Inline "Add Field" button | Drag from library | Context-aware hover/tap zones |
| **Field Library** | Hidden until clicked | Persistent left sidebar | Inline (no drawer) |
| **Mobile Preview** | ❌ Not included | ✅ Live preview (right) | ✅ Live preview (right) |
| **Discoverability** | Lower (hidden buttons) | Higher (visible library) | Medium (progressive disclosure) |
| **Screen Space** | More (no sidebars) | Less (2 sidebars) | More (1 sidebar: preview only) |
| **Learning Curve** | Lower (simple UI) | Higher (more features) | Medium (familiar patterns) |
| **Visual Clutter** | Medium (buttons visible) | High (persistent drawer) | Low (hover-based) |
| **Touch Adaptation** | Standard | Standard | Tap-to-reveal on tablet |

### 6. State Management
```typescript
interface FormStructure {
  sections: Section[];
}

interface Section {
  id: string;
  title: string;
  isExpanded: boolean;
  fields: Field[];
}

interface Field {
  id: string;
  type: string;
  label: string;
  // ... other properties
}
```

### 7. Drag & Drop Implementation
- **Library**: `dnd-kit` (modern, accessible drag-and-drop)
- **Droppable zones**: Sections (for fields), Section list (for sections)
- **Draggable items**: Field buttons (v2), Field rows, Section cards
- **Visual feedback**: Hover states, drag overlays, drop indicators

### 8. Interactions

**Section Interactions:**
- Click header → Toggle expand/collapse
- Click title → Inline edit mode
- Drag handle → Reorder section
- Delete button → Remove section

**Field Interactions:**
- Click label → Inline edit mode
- Drag handle → Reorder field within section
- Delete button → Remove field
- (v2) Drag from library → Add to section

**Field Library (v2 only):**
- Drag colored dot button → Create new field
- Color coding by field type (visual categorization)

### 9. Mobile Preview (v2 only)
- **Live preview**: Reflects current form structure
- **Mobile-optimized**: Uses Mobile feature field components
- **Scrollable**: Independent scroll from main builder
- **Read-only**: Preview only, no editing

## Design Decisions
- **Versioned features**: Allows A/B comparison for stakeholder feedback
- **dnd-kit library**: Accessible, modern, performant drag-and-drop
- **Inline editing**: Reduces clicks, faster workflow
- **Expand/collapse**: Manages cognitive load for large forms
- **No sx props**: All styling via `styled()` components
- **Mobile preview in v2**: Validates mobile UX early in design process

## Related Features
- **Uses**: `FormFields` (for rendering field components)
- **Uses**: `Mobile` (for mobile preview in v2)
- **Used by**: `/prototypes/form-builder/version/[id]` (prototype routes)

## Accessibility
- Keyboard navigation for all interactions
- ARIA labels on drag handles and buttons
- Focus indicators visible
- Screen reader announcements for drag-and-drop actions
- Semantic HTML (sections as regions, fields as form controls)

---

## 📐 VERSION 3 PATTERN SPECIFICATION (Pattern C)

### Overview: Context-Aware Inline Addition with Mobile Preview
Progressive disclosure pattern that shows contextual action buttons based on cursor/interaction position. Minimizes visual clutter while maintaining clear affordances. Includes live mobile preview on the right side (same as Version 2).

### Core Principles
- **Progressive Disclosure**: Show only contextually relevant actions
- **Hover-First, Touch-Adapted**: Desktop uses hover, tablet uses tap-to-reveal
- **Predictable Placement**: New elements always insert at the interaction point
- **Visual Hierarchy**: Maintain clean interface until user indicates intent to edit

---

### Interaction States

#### State 1: Between Fields (Within Section)
**Trigger**: Hover/tap between any two fields inside a section
**Display**: Single action button
**Actions Available**: `[+ Add Field]`

```
[Field 1]
========= (hover/tap zone) =========
        [+ Add Field]
=====================================
[Field 2]
```

**Behavior**:
- New field inserts between Field 1 and Field 2
- Inherits section properties
- Auto-focuses label input for immediate editing

#### State 2: After Last Field in Section
**Trigger**: Hover/tap after the last field within a section
**Display**: Two action buttons
**Actions Available**: `[+ Add Field] [+ Add Section]`

```
[Field N] (last field in section)
========= (hover/tap zone) =========
    [+ Add Field] [+ Add Section]
=====================================
───────── Section Boundary ─────────
```

**Behavior**:
- `Add Field`: Inserts new field at end of current section
- `Add Section`: Creates new section below current section

#### State 3: Between Sections
**Trigger**: Hover/tap in the space between two sections
**Display**: Two action buttons
**Actions Available**: `[+ Add Field] [+ Add Section]`

```
▼ Section A
  [Field 1]
  [Field 2]
========= (hover/tap zone) =========
    [+ Add Field] [+ Add Section]
=====================================
▼ Section B
  [Field 3]
```

**Behavior**:
- `Add Field`: Creates standalone field between sections
- `Add Section`: Inserts new section between Section A and B

#### State 4: Empty Section
**Trigger**: Section with no fields
**Display**: Persistent button (no hover required)
**Actions Available**: `[+ Add Field]`

```
▼ New Section
  ┌─────────────────────────┐
  │    [+ Add Field]        │
  │   Add your first field  │
  └─────────────────────────┘
```

---

### Visual Specifications

#### Hover/Tap Zones
- **Height**: Follow standard touch target size from WizyVision Design System (44px minimum)
- **Appearance**:
  - Default: `theme.palette.divider` with dashed border
  - Hover/Active: `theme.palette.primary.light` with solid border
- **Hit Target**: Full width of form builder panel
- **Transition**: `theme.transitions.create(['border-color', 'background-color'])`

#### Action Buttons
- **Style**: Follow WizyVision Design System
  - Use `contained` variant for "Add Field" (primary action)
  - Use `outlined` variant for "Add Section" when shown together
  - Icon: `AddIcon` from `@mui/icons-material/Add`
- **Spacing**: `theme.spacing(2)` between buttons
- **Animation**: Fade in/out with `theme.transitions.duration.short`
- **Size**:
  - Desktop: `medium` (40px height)
  - Mobile: `large` (48px height) per Fitts's Law

---

### Device-Specific Behaviors

#### Desktop (Mouse/Trackpad)
```typescript
// Hover-based interaction
onMouseEnter(zone) {
  showButtons(contextualActions)
  highlightInsertionLine()
}

onMouseLeave(zone) {
  hideButtons()
  removeHighlight()
}
```

#### Tablet (Touch)
```typescript
// Tap-to-reveal with auto-hide
onTap(zone) {
  if (buttonsVisible) {
    hideButtons()
  } else {
    showButtons(contextualActions)
    autoHideAfter(5000ms)
  }
}

onTapOutside() {
  hideButtons()
}
```

---

### Edge Cases & Constraints

#### Rapid Hover
- **Issue**: User quickly moves mouse across multiple zones
- **Solution**: 150ms debounce before showing buttons (prevents flashing)

#### Nested Sections (Not Supported)
- **Rule**: Sections cannot contain other sections
- **Implementation**: Disable "Add Section" when inside a section

#### Maximum Fields
- **Limit**: 50 fields per section (performance consideration)
- **Behavior**: Disable "Add Field" with tooltip: "Maximum fields reached (50)"

#### Drag Conflict
- **Issue**: Drag handle vs insertion zone overlap
- **Solution**: Insertion zone appears 16px below field (no overlap)

#### Empty Form
- **State**: No sections exist
- **Display**: Center-aligned call-to-action
- **Actions**: `[+ Add Section]` button only

---

### Accessibility

#### Keyboard Navigation
- **Tab**: Cycles through insertion zones (skip hidden zones)
- **Enter/Space**: Shows action buttons when zone focused
- **Escape**: Hides action buttons
- **Arrow Keys**: Navigate between visible buttons

#### Screen Readers
- **Announcement**: "Add field or section insertion point between [previous element] and [next element]"
- **Button Labels**:
  - "Add new field to [Section name]"
  - "Add new section after [Section name]"
- **Live Regions**: Announce when buttons appear/disappear
- **Focus Management**: Auto-focus first button when zone activates

#### WCAG Compliance
- **Color Contrast**: Meet WCAG AA for all states
- **Touch Targets**: 44x44px minimum per WCAG 2.1
- **Focus Indicators**: Visible `2px solid` outline with `theme.palette.primary.main`

---

### Implementation Structure

#### InsertionZone Component
```typescript
/**
 * InsertionZone - Context-aware insertion point for fields/sections
 *
 * UX PRINCIPLES APPLIED:
 * - Progressive Disclosure: Buttons hidden until interaction
 * - Fitts's Law: Full-width target, 44px height minimum
 * - Hick's Law: Show only 1-2 buttons based on context
 * - Jakob's Law: Familiar hover-to-reveal pattern
 *
 * STATES:
 * - default: Hidden (dashed border on hover)
 * - hovered: Visible with buttons
 * - active: Button click in progress
 */

interface InsertionZoneProps {
  position: 'between-fields' | 'section-end' | 'between-sections' | 'empty-section';
  onAddField: () => void;
  onAddSection?: () => void;
  sectionName?: string;
}
```

#### ContextualActions Component
```typescript
/**
 * ContextualActions - Dynamic action buttons for insertion zones
 *
 * UX PRINCIPLES APPLIED:
 * - Visual Hierarchy: Primary (Add Field) vs Secondary (Add Section)
 * - Hick's Law: Max 2 actions to reduce choice overload
 * - Fitts's Law: Large touch targets with adequate spacing
 */

interface ContextualActionsProps {
  showAddField: boolean;
  showAddSection: boolean;
  onAddField: () => void;
  onAddSection: () => void;
  isVisible: boolean;
}
```

---

### Field Addition Flow (v3)

1. User hovers/taps insertion zone
2. Contextual button(s) fade in (150ms transition)
3. User clicks "Add Field"
4. Field type selector dropdown appears (inline, not drawer)
5. User selects field type
6. New field card inserted at position with:
   - Smart default label (e.g., "Text Field 1")
   - Collapsed configuration
   - Auto-focus on label for immediate editing
7. Insertion zone returns to default (hidden) state
8. New insertion zones appear above/below new field

---

### Metrics to Track (v3 Specific)

- **Interaction Method**: Hover vs Tap usage (desktop vs tablet)
- **Zone Activation Rate**: % of hovers that result in clicks
- **Button Choice**: Add Field vs Add Section selection rate
- **Discovery Time**: Time to first insertion zone interaction
- **Error Recovery**: How often users undo immediately after adding
- **Zone Position Preference**: Which zones are used most (between fields, section end, etc.)

---

### Comparison to v1 and v2

**vs Version 1 (Pattern A)**:
- v3: More discoverable (visual zones vs hidden button)
- v3: Context-aware (different buttons per position)
- v3: Cleaner UI (progressive disclosure)

**vs Version 2 (Pattern B)**:
- v3: Less visual clutter (no persistent field library drawer)
- v3: More screen space (only 1 sidebar vs 2)
- v3: Lower learning curve (familiar hover pattern)
- v2: Better for field type discovery (all types visible in drawer)
- Both: Include mobile preview on the right side

---

### Future Enhancements (v3-Specific)

1. **Quick Templates**: Long-press/right-click on zone for common field combinations
   - "Address Block" (Street, City, State, Zip)
   - "Name Fields" (First Name, Last Name)
   - "Contact Info" (Email, Phone)

2. **Smart Suggestions**: AI-powered field recommendations
   - Based on form context (e.g., suggest "Phone" after "Email")
   - Based on section name (e.g., suggest address fields in "Location" section)

3. **Bulk Operations**: Multi-select insertion zones
   - Add same field type to multiple positions at once
   - Copy/paste field groups between zones

4. **Drag-to-Zone**: Hybrid approach
   - Drag field from library directly to insertion zone
   - Combines benefits of v2 and v3

5. **Insertion History**: Undo/Redo support
   - Track all insertion actions
   - Visual timeline of form construction

---

## Future Enhancements (All Versions)
- Field validation rules
- Conditional logic (show/hide fields based on values)
- Field templates (save/reuse common field configs)
- Export form schema (JSON)
- Import existing forms
- Collaborative editing (multi-user)
