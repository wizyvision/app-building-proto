/**
 * UndoRedoButtons Component
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar undo/redo pattern (Ctrl+Z, Ctrl+Y)
 * - Fitts's Law: 44x44px touch targets, placed in toolbar
 * - Visual Hierarchy: Disabled state clear, icons recognizable
 * - Feedback: Tooltips show last action description
 *
 * INTERACTION DESIGN:
 * - Click undo: Revert last action
 * - Click redo: Reapply undone action
 * - Hover: Show tooltip with action description
 * - Keyboard: Ctrl+Z (undo), Ctrl+Y or Ctrl+Shift+Z (redo)
 */

'use client';

import React, { useEffect } from 'react';
import { Tooltip } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import { UndoRedoContainer, UndoRedoButton, ButtonDivider } from './styles';
import type { UndoRedoButtonsProps } from './types';

export function UndoRedoButtons({
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  lastActionDescription,
}: UndoRedoButtonsProps) {
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Z or Cmd+Z for undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey && canUndo) {
        e.preventDefault();
        onUndo();
      }

      // Ctrl+Y or Ctrl+Shift+Z or Cmd+Shift+Z for redo
      if (
        ((e.ctrlKey || e.metaKey) && e.key === 'y') ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z')
      ) {
        if (canRedo) {
          e.preventDefault();
          onRedo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onUndo, onRedo, canUndo, canRedo]);

  const undoTooltip = canUndo
    ? `Undo${lastActionDescription ? `: ${lastActionDescription}` : ''} (Ctrl+Z)`
    : 'Nothing to undo';

  const redoTooltip = canRedo ? 'Redo (Ctrl+Y)' : 'Nothing to redo';

  return (
    <UndoRedoContainer>
      <Tooltip title={undoTooltip} arrow>
        <span>
          <UndoRedoButton
            onClick={onUndo}
            disabled={!canUndo}
            aria-label="Undo"
            size="small"
          >
            <UndoIcon fontSize="small" />
          </UndoRedoButton>
        </span>
      </Tooltip>

      <Tooltip title={redoTooltip} arrow>
        <span>
          <UndoRedoButton
            onClick={onRedo}
            disabled={!canRedo}
            aria-label="Redo"
            size="small"
          >
            <RedoIcon fontSize="small" />
          </UndoRedoButton>
        </span>
      </Tooltip>

      <ButtonDivider />
    </UndoRedoContainer>
  );
}
