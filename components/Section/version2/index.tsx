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
 * Section Component - Version 2
 *
 * VERSION INFO:
 * - Version: 2
 * - Created: 2025-10-03
 * - Based on version 1 with updated styling
 * - Features: Same behavior as v1, #fafafa content background, Figma wireframe icons
 *
 * COMPONENT STRUCTURE:
 * - Header: Drag handle, expand button, editable title, delete button
 * - Content: Sortable field list, add field button, empty state
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar accordion/section pattern users expect from standard UIs.
 *   Users understand clicking headers to expand/collapse without instruction.
 *
 * - Fitts's Law: Full header (64px height, full width) is clickable for expansion,
 *   providing a large target area. Icon buttons are 44x44px minimum for easy tapping.
 *   Drag handle positioned at expected left edge for muscle memory.
 *
 * - Hick's Law: Limited actions visible at once. Primary action (toggle) is always
 *   visible. Secondary actions (drag, delete) shown only on hover (progressive disclosure).
 *   Maximum 3 primary actions per section reduces decision paralysis.
 *
 * - Miller's Law: Sections group related fields into manageable chunks (typically 5-7 fields).
 *   Visual grouping via card elevation distinguishes sections from individual fields.
 *
 * - Visual Hierarchy:
 *   - Primary action: Section name (largest, darkest text)
 *   - Secondary: Field count badge, expand icon (medium weight)
 *   - Tertiary: Drag handle, delete button (lightest, progressive disclosure)
 *   - Clear distinction via elevation (card shadow) from contained fields
 *
 * INTERACTIONS:
 * - Click header: Toggle expand/collapse with smooth transition
 * - Hover header: Reveals drag handle and delete button (progressive disclosure)
 * - Click section name: Enter inline edit mode with autofocus
 * - Press Enter while editing: Save changes
 * - Press Escape while editing: Cancel changes
 * - Drag handle: Reorder sections via drag-and-drop (cursor changes to 'grab')
 * - Delete button: Remove non-system sections
 * - Keyboard: Tab to navigate, Enter to edit name, Escape to cancel
 *
 * TOUCH TARGETS:
 * - Header: 64px height, full width (easy to tap on mobile)
 * - Icon buttons: 44x44px minimum (iOS/Android guidelines)
 * - Drag handle: 44x44px touch target
 * - Delete button: 44x44px touch target
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

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: `section-drop-${id}`,
    data: {
      type: 'section-drop',
      sectionId: id,
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

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
          isExpanded={isExpanded}
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
              isSectionDragging: isDragging
            })
          : children
        }
        {!isExpanded && (
          <CollapsedDropZone ref={setDroppableRef} isOver={isOver} />
        )}
      </SectionCard>
    </SectionWrapper>
  );
};