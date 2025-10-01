import { styled } from '@mui/material/styles';
import { Box, Card, IconButton, TextField, Chip, Button, Collapse } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';

// ========================================
// Section (index.tsx) Styles
// ========================================

// Jakob's Law: Familiar accordion/section pattern
export const SectionWrapper = styled(Box)({});

// Visual Hierarchy: Card elevation distinguishes sections from fields
export const SectionCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.grey[300]}`,
  boxShadow: theme.shadows[1],
  '&:hover': {
    boxShadow: theme.shadows[2],
  },
}));

// ========================================
// SectionHeader Styles
// ========================================

// Fitts's Law: 48x48px minimum touch targets for primary actions
export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minHeight: '64px',
  padding: theme.spacing(0, 2),
  gap: theme.spacing(1.5),
  cursor: 'pointer',
}));

// Progressive Disclosure: Drag handle only visible on hover
export const DragHandle = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'isVisible',
})<{ isVisible: boolean }>(({ theme, isVisible }) => ({
  opacity: isVisible ? 1 : 0,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
  cursor: 'grab',
  minWidth: '26px',
  minHeight: '26px',
  padding: '5px',
  '&:active': {
    cursor: 'grabbing',
  },
}));

// Jakob's Law: Familiar expand/collapse icon button
export const ExpandButton = styled(IconButton)({
  minWidth: '26px',
  minHeight: '26px',
  padding: '5px',
});

export const ExpandIcon = styled(ExpandMoreIcon)({
  fontSize: '16px',
});

export const CollapseIcon = styled(ChevronRightIcon)({
  fontSize: '16px',
});

export const DragIcon = styled(DragIndicatorIcon)({
  fontSize: '16px',
});

export const NameContainer = styled(Box)({
  flex: 1,
  minWidth: 0,
});

export const NameEditArea = styled(Box)(({ theme }) => ({
  cursor: 'text',
  padding: theme.spacing(0.5, 0),
}));

export const NameText = styled('p')(({ theme }) => ({
  margin: 0,
  fontSize: '1.0625rem',
  lineHeight: '32px',
  color: theme.palette.text.primary,
  fontWeight: 500,
}));

export const StyledTextField = styled(TextField)({
  '& .MuiInput-root': {
    fontSize: '1.0625rem',
    fontWeight: 500,
  },
});

// Visual Hierarchy: Badge distinguishes section type
export const SectionBadge = styled(Chip)(({ theme }) => ({
  height: '24px',
  fontSize: '0.6875rem',
  borderRadius: '16px',
  backgroundColor: 'transparent',
  border: `1px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  '& .MuiChip-label': {
    padding: theme.spacing(0, 1),
    lineHeight: '18px',
  },
}));

// Progressive Disclosure: Delete button only visible on hover
export const DeleteButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'isVisible',
})<{ isVisible: boolean }>(({ theme, isVisible }) => ({
  opacity: isVisible ? 1 : 0,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
  minWidth: '26px',
  minHeight: '26px',
  padding: '5px',
}));

export const DeleteIcon = styled(DeleteOutlineIcon)({
  fontSize: '16px',
});

// ========================================
// SectionContent Styles
// ========================================

// Progressive Disclosure: Content only shown when expanded
export const ContentContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2, 2, 2),
}));

export const ContentInner = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

// Miller's Law: Group fields in manageable chunks (5-7 visible at once)
export const FieldsList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.75),
}));

// Visual Hierarchy: Outlined style = secondary action
// Button is auto-width to give breathing room and de-emphasize vs fields
export const AddFieldButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.primary.main,
  color: theme.palette.primary.main,
  textTransform: 'none',
  fontWeight: 500,
  borderRadius: theme.shape.borderRadius / 2,
  alignSelf: 'center',
  '&:hover': {
    borderColor: theme.palette.primary.dark,
    backgroundColor: `${theme.palette.primary.main}08`,
  },
}));

export const AddFieldIcon = styled(AddIcon)({
  fontSize: '16px',
});

// Empty state styles
export const EmptyState = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4, 2),
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  fontStyle: 'italic',
  backgroundColor: theme.palette.background[3],
  borderRadius: theme.shape.borderRadius / 2,
  border: `1px dashed ${theme.palette.grey[300]}`,
}));
