/**
 * UndoRedo Styled Components
 *
 * DESIGN TOKENS:
 * - Button size: 44x44px (Fitts's Law minimum touch target)
 * - Spacing: theme.spacing(1) between buttons
 * - Colors: theme.palette.primary for enabled, text.disabled for disabled
 * - Transitions: theme.transitions.duration.short
 */

import { styled } from '@mui/material/styles';
import { IconButton, Box } from '@mui/material';

/**
 * UndoRedoContainer - Wrapper for undo/redo button group
 */
export const UndoRedoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

/**
 * UndoRedoButton - Icon button for undo/redo actions
 *
 * UX PRINCIPLES:
 * - Fitts's Law: 44x44px minimum touch target
 * - Visual feedback: Hover, active, disabled states
 * - Clear affordance: Icon + color indicate action
 */
export const UndoRedoButton = styled(IconButton)(({ theme }) => ({
  width: 44,
  height: 44,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(['background-color', 'color'], {
    duration: theme.transitions.duration.short,
  }),

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:active': {
    backgroundColor: theme.palette.action.selected,
  },

  '&.Mui-disabled': {
    color: theme.palette.text.disabled,
    cursor: 'not-allowed',
  },
}));

/**
 * Divider - Visual separator between undo/redo and other actions
 */
export const ButtonDivider = styled(Box)(({ theme }) => ({
  width: 1,
  height: 24,
  backgroundColor: theme.palette.divider,
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
}));
