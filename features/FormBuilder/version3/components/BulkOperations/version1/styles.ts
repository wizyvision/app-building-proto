/**
 * BulkOperations Styled Components
 *
 * DESIGN TOKENS:
 * - Action bar height: 56px
 * - Background: theme.palette.primary.main (highlighted state)
 * - Text color: theme.palette.primary.contrastText
 * - Touch targets: 44px minimum
 */

import { styled } from '@mui/material/styles';
import { Box, Paper, IconButton, Chip } from '@mui/material';

/**
 * BulkActionBar - Floating action bar for bulk operations
 *
 * UX PRINCIPLES:
 * - Visual Hierarchy: Prominent bar at top/bottom
 * - Fitts's Law: Large action buttons, easy to reach
 * - Hick's Law: Limited actions (3-5 primary)
 */
export const BulkActionBarContainer = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.appBar,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: 0,
  minHeight: 56,
  boxShadow: theme.shadows[8],
}));

export const BulkActionBarLeft = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const BulkActionBarRight = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const BulkActionButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  minWidth: 44,
  minHeight: 44,

  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },

  '&:disabled': {
    color: 'rgba(255, 255, 255, 0.3)',
  },
}));

export const BulkSelectionChip = styled(Chip)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  color: theme.palette.primary.contrastText,
  fontWeight: theme.typography.fontWeightMedium,

  '& .MuiChip-label': {
    padding: theme.spacing(0.5, 1.5),
  },
}));
