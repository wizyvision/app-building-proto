/**
 * useDragDropState Hook
 *
 * Manages drag-and-drop state for FormBuilder.
 * Extracts drag state management from components to reduce complexity.
 *
 * UX PRINCIPLES APPLIED:
 * - Single Responsibility: Centralized drag state management
 * - Separation of Concerns: State logic separated from rendering
 */

import { useState, useCallback } from 'react';
import { DragStartEvent, DragOverEvent, DragEndEvent } from '@dnd-kit/core';

export interface DragDropState {
  activeId: string | null;
  overId: string | null;
  isDraggingSection: boolean;
  isDraggingField: boolean;
}

export const useDragDropState = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [isDraggingSection, setIsDraggingSection] = useState(false);
  const [isDraggingField, setIsDraggingField] = useState(false);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);

    const activeData = active.data.current;
    if (activeData?.type === 'section') {
      setIsDraggingSection(true);
    } else if (activeData?.type === 'field') {
      setIsDraggingField(true);
    }
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { over } = event;
    setOverId(over ? (over.id as string) : null);
  }, []);

  const resetDragState = useCallback(() => {
    setActiveId(null);
    setOverId(null);
    setIsDraggingSection(false);
    setIsDraggingField(false);
  }, []);

  return {
    dragState: {
      activeId,
      overId,
      isDraggingSection,
      isDraggingField,
    },
    handleDragStart,
    handleDragOver,
    resetDragState,
  };
};
