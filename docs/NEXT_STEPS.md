# Next Steps for Tomorrow

## Priority Tasks

### 1. Fix Section and Field Drag & Drop Behavior

Currently, the drag-and-drop functionality is not working properly. Need to implement:

#### Section Reordering
- **Issue**: Sections cannot be reordered by dragging
- **Location**: `features/ComponentShowcase/SectionShowcase.tsx`
- **Requirements**:
  - Sections should be draggable via the drag handle
  - Visual feedback during drag (opacity, preview)
  - Sections should reorder when dropped in new position
  - System sections (`isSystem: true`) behavior TBD - can they be reordered or should they be locked?

#### Field Reordering Within Section
- **Issue**: Fields cannot be reordered within the same section
- **Location**: `components/Section/Section/SectionContent.tsx`
- **Requirements**:
  - Fields should be draggable via the drag handle
  - Visual feedback during drag
  - Fields should reorder when dropped in new position within the same section
  - SortableContext is set up but may need additional configuration

#### Field Reordering Between Sections
- **Issue**: Fields cannot be dragged from one section to another
- **Requirements**:
  - Fields should be draggable between sections
  - Need to set up droppable zones for sections
  - Update parent state when field moves from one section to another
  - Visual feedback showing which section will receive the field
  - May need to refactor state management to handle cross-section moves

### Technical Implementation Notes

**Current Setup:**
- Using `@dnd-kit/core` and `@dnd-kit/sortable`
- `DndContext` is set up in `SectionShowcase.tsx` for sections
- `SortableContext` is set up in `SectionContent.tsx` for fields
- `useSortable` hook is used in `Section` component

**Potential Issues to Check:**
1. Are the `id` props properly configured for sortable items?
2. Is the `onDragEnd` handler properly updating state?
3. Do we need separate `DndContext` for fields, or can we nest them?
4. Are drag handles properly connected with `{...listeners}` and `{...attributes}`?
5. Do we need to implement `onDragOver` for cross-section field dragging?

**Reference Files:**
- `/components/Section/Section/index.tsx` - Section drag setup
- `/components/Section/Section/SectionContent.tsx` - Field drag setup
- `/components/Field/Field.tsx` - Field component (check if drag handle is set up)
- `/features/ComponentShowcase/SectionShowcase.tsx` - Section drag handlers

### Testing Checklist

Once implemented, verify:
- [ ] Sections can be dragged and reordered
- [ ] Fields can be dragged within the same section
- [ ] Fields can be dragged between different sections
- [ ] Drag handles appear on hover
- [ ] Visual feedback during drag (opacity, positioning)
- [ ] State updates correctly after drop
- [ ] Empty sections show "Add or Drag Fields here" message
- [ ] System sections behavior is clearly defined
- [ ] UI remains responsive during drag operations

## Additional Considerations

### State Management
- May need to lift state higher to handle cross-section field moves
- Consider using `useCallback` for drag handlers to prevent re-renders
- Ensure state updates are batched appropriately

### UX Improvements
- Add drop zone indicators
- Show placeholder where item will be dropped
- Consider adding animation/transition effects
- Ensure touch device compatibility (if needed)

### Edge Cases
- What happens when dragging the last field out of a section?
- Can system sections be dragged? Can fields be dragged into system sections?
- Should there be a maximum number of fields per section?
- What happens during simultaneous drags (if applicable)?
