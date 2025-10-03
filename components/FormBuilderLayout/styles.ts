/**
 * Form Builder Layout - Styled Components
 *
 * Shared styled components used across all form builder versions
 * These components define the common layout structure, preview toggles,
 * and container styles.
 */

import { styled } from '@mui/material/styles';
import { AppBar, IconButton, Typography, ToggleButtonGroup } from '@mui/material';

// ============================================================================
// APP BAR COMPONENTS
// ============================================================================

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[1],
}));

export const BackButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
  minWidth: theme.spacing(5.5), // 44px - Fitts's Law
  minHeight: theme.spacing(5.5), // 44px - Fitts's Law
}));

export const AppTitle = styled(Typography)({
  flexGrow: 1,
});

// ============================================================================
// LAYOUT CONTAINERS
// ============================================================================

export const LayoutContainer = styled('div')({
  display: 'flex',
  height: 'calc(100vh - 64px)', // Account for AppBar height
  width: '100vw',
  overflow: 'hidden',
  backgroundColor: '#f8f8f8',
  marginTop: '64px', // AppBar height
});

export const CenterContent = styled('div')<{ hasDrawer?: boolean }>(({ hasDrawer }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  alignItems: 'center',
  padding: 24,
  marginLeft: hasDrawer ? '280px' : 0, // Account for FieldDrawer width
}));

export const FormContainer = styled('div')(({ theme }) => ({
  backgroundColor: '#fdfdfd',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  width: 775,
  minHeight: 730,
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

// ============================================================================
// PREVIEW TOGGLE COMPONENTS
// ============================================================================

export const PreviewToggleContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  paddingBottom: theme.spacing(3),
}));

export const PreviewLabel = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButton-root': {
    padding: theme.spacing(1, 2),
    textTransform: 'none',
    fontSize: 14,
    fontWeight: 400,
    border: '1px solid #d9d9d9',
    '&.Mui-selected': {
      backgroundColor: '#ffffff',
      borderColor: '#1890ff',
      color: '#1890ff',
      '&:hover': {
        backgroundColor: '#ffffff',
      },
    },
    '&:not(.Mui-selected)': {
      backgroundColor: '#ffffff',
      color: '#bfbfbf',
    },
  },
}));
