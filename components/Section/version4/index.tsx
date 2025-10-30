'use client';

import React, { useState } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot, Droppable } from '@hello-pangea/dnd';
import { SectionHeader } from './Header';
import { SectionContent } from './Content';
import { SectionProps } from './types';
import { SectionWrapper, SectionCard, CollapsedDropZone } from './styles';

/**
 * Section Component - Version 4
 *
 * VERSION INFO:
 * - Version: 4
 * - Based on: Version 3 (dnd-kit) → Version 4 (hello-pangea/dnd)
 * - Changes from v3:
 *   - Uses hello-pangea/dnd Draggable instead of useSortable
 *   - Droppable for accepting field drops into collapsed sections
 *   - Render function pattern
 *   - Automatic animations and accessibility
 *
 * COMPONENT STRUCTURE:
 * - Header: Drag handle (absolute), expand button, TextField, system badge, delete button
 * - Content: Sortable field list, add field button, empty state
 * - Droppable: Accepts field drops into collapsed section
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar accordion/section pattern users expect from standard UIs.
 * - Fitts's Law: Full header (72px height, full width) is clickable for expansion,
 *   providing a large target area. Icon buttons are 44x44px minimum for easy tapping.
 * - Hick's Law: Limited actions visible at once. Primary action (toggle) is always
 *   visible. Secondary actions (drag, delete) shown only on hover (progressive disclosure).
 * - Miller's Law: Sections group related fields into manageable chunks (typically 5-7 fields).
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
 */
interface SectionV4Props extends SectionProps {
  draggableId: string;
  index: number;
}

const SectionContentRender = ({
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
  provided,
  snapshot,
}: Omit<SectionV4Props, 'draggableId' | 'index'> & {
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Collapse section content when any section is being dragged
  const shouldCollapse = isAnySectionDragging;
  const effectiveIsExpanded = shouldCollapse ? false : isExpanded;

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      style={{
        ...provided.draggableProps.style,
        opacity: snapshot.isDragging ? 0.6 : 1,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SectionWrapper>
        <SectionCard>
        <SectionHeader
          name={name}
          isExpanded={effectiveIsExpanded}
          fieldCount={fieldCount}
          isSystem={isSystem}
          isHovered={isHovered}
          isDragging={snapshot.isDragging}
          onToggle={onToggle}
          onRename={onRename}
          onDelete={onDelete}
          dragHandleProps={provided.dragHandleProps}
        />
        {React.isValidElement(children)
          ? React.cloneElement(children as React.ReactElement<any>, {
              isExpanded: effectiveIsExpanded,
              isSectionDragging: snapshot.isDragging,
              isAnySectionDragging: shouldCollapse
            })
          : children
        }
        {!effectiveIsExpanded && (
          <Droppable droppableId={`section-drop-${id}`} type="FIELD">
            {(provided, snapshot) => (
              <CollapsedDropZone
                ref={provided.innerRef}
                {...provided.droppableProps}
                isOver={snapshot.isDraggingOver && !isAnySectionDragging}
              >
                {provided.placeholder}
              </CollapsedDropZone>
            )}
          </Droppable>
        )}
        </SectionCard>
      </SectionWrapper>
    </div>
  );
};

/**
 * Section Component - Version 4
 *
 * Wrapped in Draggable from hello-pangea/dnd
 * Must be used inside a Droppable component
 *
 * Props:
 * - draggableId: Unique ID for this section (should be `section-${sectionId}`)
 * - index: Position in the sections list
 * - isDragDisabled: Disable dragging for system sections
 */
export const Section: React.FC<SectionV4Props> = ({
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
  draggableId,
  index,
}) => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <SectionContentRender
          id={id}
          name={name}
          isExpanded={isExpanded}
          fieldCount={fieldCount}
          isSystem={isSystem}
          isAnySectionDragging={isAnySectionDragging}
          onToggle={onToggle}
          onRename={onRename}
          onDelete={onDelete}
          children={children}
          provided={provided}
          snapshot={snapshot}
        />
      )}
    </Draggable>
  );
};
