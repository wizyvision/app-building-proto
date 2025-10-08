/**
 * UndoRedo Component Types
 */

export interface UndoRedoButtonsProps {
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  lastActionDescription?: string;
}

export interface UndoRedoTooltipProps {
  action: 'undo' | 'redo';
  description?: string;
  disabled: boolean;
  children: React.ReactElement;
}
