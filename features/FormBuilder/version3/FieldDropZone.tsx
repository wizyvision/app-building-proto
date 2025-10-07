/**
 * FieldDropZone Component
 *
 * Individual drop zone component for field positioning.
 * Created to fix React hooks rules violation - each drop zone
 * needs its own component to call useDroppable at top level.
 *
 * UX PRINCIPLES APPLIED:
 * - Progressive Disclosure: Only visible during drag operations
 * - Visual Feedback: Shows indicator when field is dragged over
 * - Fitts's Law: Full-width drop target for easy precision
 */

'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { DropIndicator } from './DropIndicator';

interface FieldDropZoneProps {
  /** Unique ID for this drop zone */
  id: string;
  /** Section this drop zone belongs to */
  sectionId: string;
  /** Index position where field would be inserted */
  index: number;
  /** Whether a field is currently being dragged */
  isFieldDragging: boolean;
  /** Is this the first drop zone? */
  isFirst?: boolean;
  /** Is this the last drop zone? */
  isLast?: boolean;
}

/**
 * FieldDropZone
 *
 * Renders a drop indicator at a specific position within a section.
 * Uses useDroppable hook to detect when a field is dragged over.
 */
export const FieldDropZone: React.FC<FieldDropZoneProps> = ({
  id,
  sectionId,
  index,
  isFieldDragging,
  isFirst = false,
  isLast = false,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      type: 'field-drop',
      sectionId,
      index,
    },
  });

  return (
    <div ref={setNodeRef}>
      <DropIndicator isOver={isOver && isFieldDragging} isFirst={isFirst} isLast={isLast} />
    </div>
  );
};
