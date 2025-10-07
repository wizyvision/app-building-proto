# Form Builder V3 - Insertion Pattern Implementation

## Overview

Form Builder V3 implements **Pattern C: Insertion Pattern** with a context-aware overlay system that allows users to add fields and sections between existing components without modifying them.

## Key Features

### 1. Insertion Pattern Overlay System
- **Non-invasive**: Sits between existing components without modifying Section v3 or Field v5
- **Context-aware**: Shows appropriate actions based on position (field vs section insertion)
- **Zero layout shifts**: Absolute positioning prevents reflow when zones appear
- **Progressive disclosure**: Zones appear on hover, reducing visual clutter

### 2. Component Integration
- **Section v3**: Latest section component with enhanced features
- **Field v5**: Latest field component with improved interactions
- **Mobile Preview**: Real-time sync with desktop form builder
- **Drag-and-Drop**: Full support using dnd-kit library

### 3. State Management
- Minimal state tracking for insertion zones
- Clean separation of concerns
- No pollution of Section/Field component state
- Efficient updates with React hooks

## Architecture

```
FormBuilder (Main Container)
├── ToolbarContainer (Save/Cancel actions)
├── FormCanvas (Scrollable area)
│   ├── SectionList (dnd-kit context)
│   │   └── Section v3 (for each section)
│   │       └── FieldList (SortableContext)
│   │           └── Field v5 (for each field)
│   └── InsertionOverlay (Manages all zones)
│       └── InsertionZone (Individual zones)
└── MobilePreview (Optional right sidebar)
    └── MobileDevice
        └── MobileSection (for each section)
            └── FieldFactory (mobile fields)
```

## File Structure

```
/features/FormBuilder/version3/
├── index.tsx              # Main export with version docs
├── types.ts               # TypeScript interfaces
├── styles.ts              # All styled components (zero sx prop)
├── FormBuilder.tsx        # Main container component
├── SectionList.tsx        # Section list with drag-drop
├── FieldList.tsx          # Field list within sections
├── InsertionOverlay.tsx   # Manages insertion zones
├── InsertionZone.tsx      # Individual insertion zone
├── MobilePreview.tsx      # Mobile preview component
└── README.md              # This file
```

## UX Principles Applied

### Jakob's Law
- Familiar form builder interface matching Google Forms, Typeform
- Standard drag-and-drop patterns users recognize
- Inline editing conventions (click to edit, Enter to save)

### Fitts's Law
- Minimum 44px touch targets for all interactive elements
- Large insertion zones (44px height) for easy targeting
- Full-width click areas for sections and fields

### Hick's Law
- Context-aware buttons reduce decision time
- Between fields: Only "Add Field" button
- Between sections: Only "Add Section" button
- Limited to 3-5 primary actions per screen

### Miller's Law
- Sections group fields (typically 5-7 per section)
- Chunked information reduces cognitive load
- Visual grouping with cards and elevation

### Visual Hierarchy
- **Primary**: Form sections and fields (highest contrast)
- **Secondary**: Toolbar actions (medium prominence)
- **Tertiary**: Insertion zones (subtle until hover)
- **Context**: Mobile preview (separate but visible)

### Progressive Disclosure
- Insertion zones appear only on hover/interaction
- Field actions (edit, menu) visible only on hover
- Drag handles show on hover only
- Collapsed sections hide complexity

### Aesthetic-Usability Effect
- Smooth transitions (200-300ms)
- Polished animations for state changes
- Consistent spacing and alignment
- Professional visual design

## Usage

### Basic Usage

```tsx
import { FormBuilder } from '@/features/FormBuilder/version3';

<FormBuilder
  initialSections={sections}
  onSave={(sections) => handleSave(sections)}
  onCancel={() => handleCancel()}
  showMobilePreview={true}
/>
```

### Props Interface

```typescript
interface FormBuilderProps {
  initialSections?: SectionData[];
  onSave?: (sections: SectionData[]) => void;
  onCancel?: () => void;
  showMobilePreview?: boolean;
}
```

### Section Data Structure

```typescript
interface SectionData {
  id: string;
  name: string;
  isExpanded: boolean;
  isSystem?: boolean;
  fields: FieldData[];
  order: number;
}
```

### Field Data Structure

```typescript
interface FieldData {
  id: string;
  label: string;
  type: FieldType;
  isRequired?: boolean;
  isSystemField?: boolean;
  placeholder?: string;
  helpText?: string;
  options?: string[];
  validation?: ValidationRule[];
}
```

## Insertion Zone Types

### 1. Between Fields
- **Position**: Between two fields in an expanded section
- **Action**: "Add Field" button
- **Behavior**: Inserts field at specific index

### 2. Section End
- **Position**: At the end of an expanded section's field list
- **Action**: "Add Field" button
- **Behavior**: Appends field to end of section

### 3. Between Sections
- **Position**: Between two sections
- **Action**: "Add Section" button
- **Behavior**: Inserts section at specific index

### 4. Form Start
- **Position**: At the beginning of the form
- **Action**: "Add Section" button
- **Behavior**: Inserts section at index 0

### 5. Form End
- **Position**: At the end of the form
- **Action**: "Add Section" button
- **Behavior**: Appends section to end

## Interactions

### Insertion Zones
- **Hover**: Background tint appears, buttons become visible
- **Click button**: Inserts field or section at position
- **Smooth transitions**: All state changes are animated

### Sections
- **Drag**: Reorder sections via drag handle
- **Toggle**: Expand/collapse with smooth animation
- **Edit name**: Click TextField to edit inline
- **Delete**: Remove non-system sections
- **Add field**: Via insertion zones

### Fields
- **Drag**: Reorder within or between sections
- **Edit label**: Click to enter inline edit mode
- **Edit config**: Click edit icon button
- **Menu**: Click menu icon for options
- **Hover**: Shows drag handle and action buttons

### Keyboard Navigation
- **Tab**: Navigate between interactive elements
- **Enter**: Activate buttons, save edits
- **Escape**: Cancel edits
- **Arrow keys**: Navigate during drag-drop

## Styling Compliance

### Zero sx Prop Usage
All styling uses `styled()` components in `styles.ts`:
- ✅ Theme values only (no hardcoded colors, spacing)
- ✅ Hover, focus, active states defined
- ✅ Smooth transitions for all interactive elements
- ✅ Responsive breakpoints for mobile/tablet/desktop

### Theme Integration
- Colors: `theme.palette.primary.*`, `theme.palette.background.*`
- Spacing: `theme.spacing(1)` through `theme.spacing(8)`
- Typography: `theme.typography.h1` through `theme.typography.body2`
- Shadows: `theme.customShadows.md`, `theme.customShadows.button`

## Accessibility

### WCAG AA Compliance
- Semantic HTML structure
- ARIA labels for icon-only buttons
- Keyboard navigation fully supported
- Focus indicators visible on all interactive elements
- Color contrast meets WCAG AA standards
- Screen reader friendly announcements

### Keyboard Support
- Tab navigation through all interactive elements
- Enter to activate buttons and save edits
- Escape to cancel edits
- Arrow keys for drag-drop navigation
- Space to toggle sections

## Responsive Design

### Breakpoints
- **Mobile (xs)**: 0-600px - Form builder full width, no mobile preview
- **Tablet (md)**: 600-900px - Form builder full width, no mobile preview
- **Desktop (lg)**: 900-1200px - Form builder full width, no mobile preview
- **Large Desktop (xl)**: 1200px+ - Form builder + mobile preview sidebar

### Touch Targets
- All interactive elements: 44x44px minimum
- Primary buttons: 48x48px recommended
- Insertion zones: 44px height for easy tapping
- Proper spacing between touch targets (8px minimum)

## Performance

### Optimizations
- React.memo for Section and Field components
- useCallback for event handlers to prevent re-renders
- Efficient drag-drop with dnd-kit (no DOM manipulation)
- Minimal state updates via proper state management
- Lazy rendering of insertion zones

### Best Practices
- Avoid unnecessary re-renders with proper dependency arrays
- Use React.memo for expensive components
- Debounce inline editing updates if needed
- Virtualize long lists if form has 50+ fields

## Testing

### Manual Testing Checklist
- [ ] Insertion zones appear on hover without layout shifts
- [ ] Add field button works at all positions
- [ ] Add section button works at all positions
- [ ] Drag-drop works for sections
- [ ] Drag-drop works for fields (within section)
- [ ] Drag-drop works for fields (between sections)
- [ ] Inline editing works (Enter saves, Escape cancels)
- [ ] System sections cannot be deleted
- [ ] System fields cannot be deleted
- [ ] Mobile preview syncs with form builder
- [ ] Toolbar save/cancel buttons work
- [ ] Keyboard navigation works throughout
- [ ] Hover states appear on all interactive elements
- [ ] Focus indicators visible
- [ ] Empty state shows when no sections

### Automated Testing (Future)
```typescript
// Example test cases
describe('InsertionZone', () => {
  it('should show Add Field button for between-fields zone', () => {});
  it('should show Add Section button for between-sections zone', () => {});
  it('should call onInsertField with correct position', () => {});
  it('should not cause layout shift when appearing', () => {});
});
```

## Known Limitations

1. **Insertion Zone Visibility**: Currently shows all zones when enabled. Future enhancement: proximity-based visibility.

2. **Mobile Preview**: Read-only preview. No editing capabilities in mobile view.

3. **Undo/Redo**: Not implemented yet. Future enhancement.

4. **Field Templates**: No pre-built field templates. Future enhancement.

5. **Conditional Logic**: No conditional field visibility. Future enhancement.

## Future Enhancements

### Proximity-Based Zones
Show insertion zones only near cursor position to reduce visual clutter.

```typescript
// Pseudo-code for proximity detection
const showZone = (zonePosition, cursorPosition) => {
  const distance = Math.abs(zonePosition - cursorPosition);
  return distance < PROXIMITY_THRESHOLD;
};
```

### Undo/Redo
Implement command pattern for undo/redo functionality.

### Field Templates
Pre-built field configurations for common use cases:
- Contact Information (Name, Email, Phone)
- Address (Street, City, State, ZIP)
- Date/Time (Date, Time, Timezone)

### Conditional Logic
Show/hide fields based on other field values.

### Field Validation Builder
Visual builder for validation rules.

### Export/Import
Export form definitions as JSON, import from external sources.

### Version History
Track changes over time, compare versions.

## Migration Guide

### From V2 to V3

#### Non-Breaking Changes
V3 is designed as a non-breaking enhancement. Most V2 code should work without changes.

#### Add Button Replacement
If you relied on specific styling for "Add Field" buttons within sections, note that these are now replaced with insertion zones that appear on hover.

**Before (V2):**
```tsx
// Add Field button always visible at section end
<Button onClick={onAddField}>Add Field</Button>
```

**After (V3):**
```tsx
// Insertion zone appears on hover between fields and at section end
// No code change needed - handled automatically by InsertionOverlay
```

#### Props Changes
No breaking props changes. All V2 props still supported.

#### State Structure
Internal state structure extended but V2 state is still compatible.

## Troubleshooting

### Insertion Zones Not Appearing
- Check `isEnabled` prop on InsertionOverlay
- Verify mouse is hovering over form canvas
- Check z-index conflicts with other components

### Layout Shifts When Zones Appear
- Verify `position: absolute` on InsertionZoneContainer
- Check parent container has `position: relative`
- Ensure no conflicting CSS from global styles

### Drag-Drop Not Working
- Verify dnd-kit context is properly set up
- Check sensor configuration (distance threshold)
- Ensure items have unique IDs

### Mobile Preview Not Syncing
- Verify sections prop is passed correctly
- Check state updates in parent component
- Use React DevTools to inspect state flow

## Contributing

### Code Style
- Follow WizyVision CLAUDE.md guidelines strictly
- Zero sx prop usage (all styling in styles.ts)
- Document UX principles in component headers
- Use theme values exclusively (no hardcoded values)

### Pull Request Checklist
- [ ] All UX principles documented
- [ ] Zero sx prop usage
- [ ] All styling in styles.ts with theme values
- [ ] TypeScript interfaces in types.ts
- [ ] Component versioning followed
- [ ] Hover/focus/active states defined
- [ ] Keyboard navigation tested
- [ ] Accessibility verified (WCAG AA)
- [ ] Mobile responsive behavior tested

## Support

For questions or issues:
1. Check this README first
2. Review CLAUDE.md for coding standards
3. Check component-specific documentation in file headers
4. Review UX principles documentation

## License

Part of the WizyVision Form Builder prototype.
Internal use only.
