'use client';

import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { SectionHeader } from './Header';
import { SectionContent } from './Content';
import { SectionProps } from './types';
import { SectionWrapper, SectionCard, CollapsedDropZone } from './styles';

/**
 * Section Component - Version 3
 *
 * VERSION INFO:
 * - Version: 3
 * - Created: 2025-10-07
 * - Changes from v2:
 *   - Increased header height from 64px to 72px (Figma spec)
 *   - TextField click-to-focus behavior (same as Field v5 - no separate edit mode)
 *   - System badge with light cyan/teal background (theme.palette.secondary[1])
 *   - Absolutely positioned drag handle (appears on hover)
 *   - Shared DragIcon component (moved from Field v5)
 *   - All drag states implemented (idle, hover, dragging)
 *
 * MIGRATION FROM V2:
 * - Props interface unchanged - drop-in replacement
 * - Behavior change: Section name TextField is always editable (click to focus)
 * - Visual change: Header height increased to 72px
 * - Visual change: Drag handle now absolutely positioned to the left
 * - Visual change: System badge uses light cyan/teal background
 *
 * COMPONENT STRUCTURE:
 * - Header: Drag handle (absolute), expand button, TextField, system badge, delete button
 * - Content: Sortable field list, add field button, empty state
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar accordion/section pattern users expect from standard UIs.
 *   Users understand clicking headers to expand/collapse without instruction.
 *
 * - Fitts's Law: Full header (72px height, full width) is clickable for expansion,
 *   providing a large target area. Icon buttons are 44x44px minimum for easy tapping.
 *   Drag handle positioned absolutely for consistent access.
 *
 * - Hick's Law: Limited actions visible at once. Primary action (toggle) is always
 *   visible. Secondary actions (drag, delete) shown only on hover (progressive disclosure).
 *   Maximum 3 primary actions per section reduces decision paralysis.
 *
 * - Miller's Law: Sections group related fields into manageable chunks (typically 5-7 fields).
 *   Visual grouping via card elevation distinguishes sections from individual fields.
 *
 * - Visual Hierarchy:
 *   - Primary action: Section name (prominent TextField)
 *   - Secondary: System badge, expand icon (medium weight)
 *   - Tertiary: Drag handle, delete button (lightest, progressive disclosure)
 *   - Clear distinction via elevation (card shadow) from contained fields
 *
 * INTERACTIONS:
 * - Click header: Toggle expand/collapse with smooth transition
 * - Hover header: Reveals absolutely positioned drag handle and delete button (progressive disclosure)
 * - Click TextField: Focus and type directly (no separate edit mode)
 * - Press Enter while editing: Save changes and blur
 * - Press Escape while editing: Cancel changes and blur
 * - Drag handle: Reorder sections via drag-and-drop (cursor changes to 'grab')
 * - Delete button: Remove non-system sections
 * - Keyboard: Tab to navigate, Enter to save, Escape to cancel
 *
 * DRAG STATES:
 * - Idle: Drag handle hidden (opacity 0)
 * - Hover: Drag handle visible (opacity 1), positioned absolutely to the left
 * - Dragging: Drag handle visible, section opacity reduced to 0.5
 *
 * TOUCH TARGETS:
 * - Header: 72px height, full width (easy to tap on mobile)
 * - Icon buttons: 44x44px minimum (iOS/Android guidelines)
 * - Drag handle: 44x44px touch target
 * - Delete button: 44x44px touch target
 * - TextField: Full width of name container
 *
 * ACCESSIBILITY:
 * - Semantic HTML with proper heading hierarchy
 * - ARIA labels for icon-only buttons
 * - Focus indicators visible on all interactive elements
 * - Keyboard navigation fully supported
 * - Screen reader friendly (announces expanded/collapsed state)
 */
export const Section: React.FC<SectionProps> = ({
  id,
  name,
  isExpanded,
  fieldCount = 0,
  isSystem = false,
  isAnySectionDragging = false,
  onToggle,
  onRename,
  onDelete,
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: {
      type: 'section',
    },
  });

  // FIX: Collapsed sections should ONLY accept field drops, NOT section drops
  // When dragging a section, collapsed sections should not show drop indicators
  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: `section-drop-${id}`,
    data: {
      type: 'section-drop', // This is for FIELD drops into collapsed sections
      sectionId: id,
    },
    disabled: isAnySectionDragging, // Disable when dragging sections (only accept fields)
  });

  // FIX: Disable transition during active drag for immediate response
  // This eliminates the slow transition delay on drag start
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? undefined : transition,
    // FIX: Hide the original position when dragging (DragOverlay shows the preview)
    opacity: isDragging ? 0 : 1,
    zIndex: isDragging ? 9999 : 1, // Highest z-index when dragging, default 1 for proper stacking
    position: 'relative' as const, // For absolutely positioned drag handle
  };

  // Collapse section content when any section is being dragged
  const shouldCollapse = isAnySectionDragging;

  // Force section to collapse instantly when dragging
  const effectiveIsExpanded = shouldCollapse ? false : isExpanded;

  return (
    <SectionWrapper
      ref={setNodeRef}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SectionCard>
        <SectionHeader
          name={name}
          isExpanded={effectiveIsExpanded}
          fieldCount={fieldCount}
          isSystem={isSystem}
          isHovered={isHovered}
          isDragging={isDragging}
          onToggle={onToggle}
          onRename={onRename}
          onDelete={onDelete}
          dragListeners={listeners}
          dragAttributes={attributes}
        />
        {React.isValidElement(children)
          ? React.cloneElement(children as React.ReactElement<any>, {
              isExpanded: effectiveIsExpanded,
              isSectionDragging: isDragging,
              isAnySectionDragging: shouldCollapse
            })
          : children
        }
        {!effectiveIsExpanded && (
          <CollapsedDropZone ref={setDroppableRef} isOver={isOver && !isAnySectionDragging} />
        )}
      </SectionCard>
    </SectionWrapper>
  );
};
