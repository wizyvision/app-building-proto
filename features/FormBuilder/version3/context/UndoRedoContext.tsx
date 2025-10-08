/**
 * UndoRedo Context - History management for FormBuilder
 *
 * Manages undo/redo state for form builder operations
 * Tracks all reversible actions (add, delete, update, reorder)
 */

'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import type { FormItem } from '../types';

/**
 * Action Types - All reversible operations
 */
export type ActionType =
  | 'ADD_SECTION'
  | 'DELETE_SECTION'
  | 'RENAME_SECTION'
  | 'REORDER_SECTION'     // Section drag-and-drop
  | 'ADD_FIELD'
  | 'DELETE_FIELD'
  | 'UPDATE_FIELD'
  | 'REORDER_FIELD'       // Field drag-and-drop
  | 'BULK_UPDATE';

/**
 * Action - Single reversible operation
 */
export interface Action {
  type: ActionType;
  timestamp: number;
  description: string;
  data: {
    before: FormItem[];
    after: FormItem[];
  };
}

/**
 * UndoRedo Context State
 */
interface UndoRedoContextValue {
  // State
  canUndo: boolean;
  canRedo: boolean;
  historyIndex: number;
  historyLength: number;

  // Actions
  recordAction: (action: Omit<Action, 'timestamp'>) => void;
  undo: () => FormItem[] | null;
  redo: () => FormItem[] | null;
  clearHistory: () => void;
  getLastAction: () => Action | null;
}

const UndoRedoContext = createContext<UndoRedoContextValue | null>(null);

/**
 * UndoRedo Provider Props
 */
interface UndoRedoProviderProps {
  children: React.ReactNode;
  maxHistorySize?: number;
}

/**
 * UndoRedo Provider Component
 *
 * Provides undo/redo functionality to FormBuilder
 * Maintains history stack with configurable size limit
 */
export function UndoRedoProvider({
  children,
  maxHistorySize = 50
}: UndoRedoProviderProps) {
  const [history, setHistory] = useState<Action[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  /**
   * Record new action
   * Clears any redo history when new action is recorded
   */
  const recordAction = useCallback((action: Omit<Action, 'timestamp'>) => {
    const newAction: Action = {
      ...action,
      timestamp: Date.now(),
    };

    setHistory((prev) => {
      // Clear redo history (everything after current index)
      const newHistory = prev.slice(0, historyIndex + 1);

      // Add new action
      newHistory.push(newAction);

      // Enforce max history size
      if (newHistory.length > maxHistorySize) {
        return newHistory.slice(newHistory.length - maxHistorySize);
      }

      return newHistory;
    });

    setHistoryIndex((prev) => {
      const newIndex = Math.min(prev + 1, maxHistorySize - 1);
      return newIndex;
    });
  }, [historyIndex, maxHistorySize]);

  /**
   * Undo last action
   * Returns the 'before' state to apply
   */
  const undo = useCallback((): FormItem[] | null => {
    if (historyIndex < 0) return null;

    const action = history[historyIndex];
    setHistoryIndex((prev) => prev - 1);

    return action.data.before;
  }, [history, historyIndex]);

  /**
   * Redo last undone action
   * Returns the 'after' state to apply
   */
  const redo = useCallback((): FormItem[] | null => {
    if (historyIndex >= history.length - 1) return null;

    const action = history[historyIndex + 1];
    setHistoryIndex((prev) => prev + 1);

    return action.data.after;
  }, [history, historyIndex]);

  /**
   * Clear all history
   */
  const clearHistory = useCallback(() => {
    setHistory([]);
    setHistoryIndex(-1);
  }, []);

  /**
   * Get last action (for display)
   */
  const getLastAction = useCallback((): Action | null => {
    if (historyIndex < 0) return null;
    return history[historyIndex] || null;
  }, [history, historyIndex]);

  const value: UndoRedoContextValue = {
    canUndo: historyIndex >= 0,
    canRedo: historyIndex < history.length - 1,
    historyIndex,
    historyLength: history.length,
    recordAction,
    undo,
    redo,
    clearHistory,
    getLastAction,
  };

  return (
    <UndoRedoContext.Provider value={value}>
      {children}
    </UndoRedoContext.Provider>
  );
}

/**
 * useUndoRedo Hook
 *
 * Access undo/redo functionality
 */
export function useUndoRedo() {
  const context = useContext(UndoRedoContext);

  if (!context) {
    throw new Error('useUndoRedo must be used within UndoRedoProvider');
  }

  return context;
}
