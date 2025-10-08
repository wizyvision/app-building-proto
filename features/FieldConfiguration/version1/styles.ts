/**
 * FieldConfiguration v1 - Styled Components
 *
 * ALL styling for FieldConfiguration feature.
 * ZERO sx prop usage - strict WizyVision compliance.
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar drawer pattern (right-side panel)
 * - Fitts's Law: 44x44px minimum touch targets for all buttons
 * - Visual Hierarchy: Header sticky, content scrollable, clear sections
 * - Aesthetic-Usability Effect: Smooth transitions, polished spacing
 */

import { styled } from '@mui/material/styles';
import { Drawer, Box, Typography, IconButton, Chip, Alert } from '@mui/material';

/**
 * Styled Drawer
 * Right-anchored drawer for field configuration
 * 360px width for comfortable form editing
 */
export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 360,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background[2],
  },
}));

/**
 * Drawer Header
 * Sticky header with field name and action buttons
 * Minimum 64px height for comfortable touch targets
 */
export const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.common.white,
  position: 'sticky',
  top: 0,
  zIndex: 1,
  minHeight: 64,
}));

/**
 * Header Left Section
 * Contains field name and type badge
 */
export const HeaderLeft = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  flex: 1,
  minWidth: 0,
}));

/**
 * Header Right Section
 * Contains close and delete buttons
 */
export const HeaderRight = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  flexShrink: 0,
}));

/**
 * Field Name Header
 * Typography for field name display
 */
export const FieldNameHeader = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.h6.fontWeight,
  color: theme.palette.text.primary,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

/**
 * Field Type Badge
 * Chip showing the current field type
 */
export const FieldTypeBadge = styled(Chip)(({ theme }) => ({
  height: 24,
  fontSize: theme.typography.body2.fontSize,
  backgroundColor: theme.palette.background[4],
  color: theme.palette.text.secondary,
  fontWeight: 500,
  '& .MuiChip-label': {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

/**
 * Close Button
 * Icon button to close the drawer
 * 44x44px for Fitts's Law compliance
 */
export const CloseButton = styled(IconButton)(({ theme }) => ({
  minWidth: 44,
  minHeight: 44,
  color: theme.palette.text.secondary,

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
  },

  '& svg': {
    width: 24,
    height: 24,
  },
}));

/**
 * Delete Button
 * Icon button to delete the field
 * 44x44px for Fitts's Law compliance
 * Error color for destructive action
 */
export const DeleteButton = styled(IconButton)(({ theme }) => ({
  minWidth: 44,
  minHeight: 44,
  color: theme.palette.error.main,

  '&:hover': {
    backgroundColor: `rgba(${theme.palette.error.main}, 0.08)`,
  },

  '& svg': {
    width: 24,
    height: 24,
  },
}));

/**
 * Drawer Content
 * Scrollable content area with padding
 * Contains all configuration sections
 */
export const DrawerContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  overflowY: 'auto',
  overflowX: 'hidden',
  height: 'calc(100vh - 64px)', // Full height minus header
  backgroundColor: theme.palette.background[2],
}));

/**
 * Section Container
 * Wrapper for each configuration section
 * Adds spacing between sections
 */
export const SectionContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),

  '&:last-child': {
    marginBottom: 0,
  },
}));

/**
 * Data Type Lock Warning Container
 * Alert-style warning banner
 */
export const LockWarningContainer = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor: `rgba(${parseInt(theme.palette.primary.main.slice(1, 3), 16)}, ${parseInt(
    theme.palette.primary.main.slice(3, 5),
    16
  )}, ${parseInt(theme.palette.primary.main.slice(5, 7), 16)}, 0.1)`,
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,

  '& .MuiAlert-icon': {
    color: theme.palette.primary.main,
  },

  '& .MuiAlert-message': {
    color: theme.palette.text.primary,
    fontSize: theme.typography.body2.fontSize,
  },
}));

/**
 * Save Data Type Button
 * Primary button to lock data type
 */
export const SaveDataTypeButton = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  '& .MuiButton-root': {
    minHeight: 44,
    textTransform: 'none',
  },
}));

/**
 * Form Field Wrapper
 * Wrapper for each form field with consistent spacing
 */
export const FormFieldWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),

  '&:last-child': {
    marginBottom: 0,
  },
}));

/**
 * Field Label with Required Indicator
 * Label for form fields with optional required asterisk
 */
export const FieldLabel = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  fontWeight: 500,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
}));

/**
 * Field Helper Text
 * Supplementary text below form fields
 */
export const FieldHelperText = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.caption.fontSize,
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(0.5),
}));

/**
 * Checkbox Group Container
 * Container for grouped checkboxes (field visibility)
 */
export const CheckboxGroupContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  paddingLeft: theme.spacing(0.5),
}));

/**
 * Placeholder Section Container
 * Container for placeholder sections (Phase 2-4)
 */
export const PlaceholderSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background[3],
  borderRadius: theme.shape.borderRadius,
  border: `1px dashed ${theme.palette.divider}`,
  textAlign: 'center',
}));

/**
 * Placeholder Text
 * Text for placeholder sections
 */
export const PlaceholderText = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.text.secondary,
  fontStyle: 'italic',
}));
