/**
 * Template System Styled Components
 *
 * DESIGN TOKENS:
 * - Width: 240px (same as FormBuilder v2 FieldDrawer)
 * - Background: theme.palette.background[2] (#fafafa)
 * - Border: theme.palette.divider
 * - Touch targets: 44px minimum height
 */

import { styled } from '@mui/material/styles';
import { Drawer, List, ListItem, Typography, Box } from '@mui/material';

/**
 * TemplateLibrarySidebar - Persistent left sidebar
 *
 * UX PRINCIPLES:
 * - Jakob's Law: Familiar sidebar pattern (VS Code, Gmail)
 * - Visual Hierarchy: Sections grouped, Recently Used at top
 * - Progressive Disclosure: Collapsible sections (future)
 */
export const TemplateDrawer = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,

  '& .MuiDrawer-paper': {
    width: 240,
    backgroundColor: theme.palette.background[2],
    borderRight: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
    position: 'relative',
    overflowY: 'auto',
  },
}));

export const TemplateSectionHeader = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  fontWeight: theme.typography.h6.fontWeight,
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
  letterSpacing: '0.5px',
}));

/**
 * TemplateListItem - Individual template item
 *
 * UX PRINCIPLES:
 * - Fitts's Law: Full-width click target
 * - Visual feedback: Hover state with slide animation
 * - Clear affordance: Icon + label indicate action
 */
export const TemplateListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  marginBottom: theme.spacing(0.5),
  transition: theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.short,
  }),

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translateX(4px)',
  },

  '&:active': {
    backgroundColor: theme.palette.action.selected,
  },
}));

export const TemplateIcon = styled(Box)(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontSize: theme.typography.body1.fontSize,
  flexShrink: 0,
}));

export const TemplateLabel = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  fontWeight: theme.typography.body1.fontWeight,
  color: theme.palette.text.primary,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const TemplateDescription = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.caption.fontSize,
  color: theme.palette.text.secondary,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  marginTop: theme.spacing(0.5),
}));

export const EmptyState = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
}));

export const EmptyStateText = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.text.secondary,
}));
