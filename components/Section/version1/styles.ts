import { styled } from '@mui/material/styles';
import { Box, Card, IconButton, TextField, Chip, Button } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';

// ========================================
// Section (index.tsx) Styles
// ========================================

// Jakob's Law: Familiar accordion/section pattern
export const SectionWrapper = styled(Box)({
  minWidth: '500px',
  maxWidth: '700px',
  width: '100%',
  margin: '0 auto',
});

// Visual Hierarchy: Card elevation distinguishes sections from fields
// Fitts's Law: Full card is interactive area
export const SectionCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.grey[300]}`,
  boxShadow: theme.customShadows.z1,
  transition: theme.transitions.create(['box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    boxShadow: theme.customShadows.z2,
  },
}));

// ========================================
// SectionHeader Styles
// ========================================

// Fitts's Law: 64px minimum touch targets for primary actions
// Full width header provides large clickable area
export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minHeight: theme.spacing(8), // 64px
  padding: theme.spacing(0, 2),
  gap: theme.spacing(1.5),
  cursor: 'pointer',
  transition: theme.transitions.create(['background-color'], {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:active': {
    backgroundColor: theme.palette.action.selected,
  },
}));

// Progressive Disclosure: Drag handle only visible on hover
// Fitts's Law: 44x44px minimum touch target
export const DragHandle = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'isVisible',
})<{ isVisible: boolean }>(({ theme, isVisible }) => ({
  opacity: isVisible ? 1 : 0,
  minWidth: theme.spacing(5.5), // 44px
  minHeight: theme.spacing(5.5), // 44px
  padding: theme.spacing(1),
  cursor: 'grab',
  transition: theme.transitions.create(['opacity'], {
    duration: theme.transitions.duration.shorter,
  }),
  '&:active': {
    cursor: 'grabbing',
  },
  '&:focus-visible': {
    opacity: 1,
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
}));

// Jakob's Law: Familiar expand/collapse icon button
// Fitts's Law: 44x44px minimum touch target
export const ExpandButton = styled(IconButton)(({ theme }) => ({
  minWidth: theme.spacing(5.5), // 44px
  minHeight: theme.spacing(5.5), // 44px
  padding: theme.spacing(1),
  transition: theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
}));

export const ExpandIcon = styled(ExpandMoreIcon)(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
  transition: theme.transitions.create(['transform'], {
    duration: theme.transitions.duration.short,
  }),
}));

export const CollapseIcon = styled(ChevronRightIcon)(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
}));

export const DragIcon = styled(DragIndicatorIcon)(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
}));

export const NameContainer = styled(Box)({
  flex: 1,
  minWidth: 0,
});

export const NameEditArea = styled(Box)(({ theme }) => ({
  cursor: 'text',
  padding: theme.spacing(0.5, 0),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(['background-color'], {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:focus-within': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
}));

// Visual Hierarchy: Section name is prominent
export const NameText = styled('p')(({ theme }) => ({
  margin: 0,
  fontSize: theme.typography.h6.fontSize, // ~17px
  lineHeight: theme.spacing(4), // 32px
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightMedium, // 500
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInput-root': {
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
  },
  '& .MuiInput-input': {
    padding: theme.spacing(0.5, 0),
  },
}));

// Visual Hierarchy: Badge distinguishes section type
export const SectionBadge = styled(Chip)(({ theme }) => ({
  height: theme.spacing(3), // 24px
  fontSize: theme.typography.caption.fontSize, // ~11px
  borderRadius: theme.spacing(2), // 16px
  backgroundColor: 'transparent',
  border: `1px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  '& .MuiChip-label': {
    padding: theme.spacing(0, 1),
    lineHeight: theme.spacing(2.25), // 18px
  },
}));

// Progressive Disclosure: Delete button only visible on hover
// Fitts's Law: 44x44px minimum touch target
export const DeleteButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'isVisible',
})<{ isVisible: boolean }>(({ theme, isVisible }) => ({
  opacity: isVisible ? 1 : 0,
  minWidth: theme.spacing(5.5), // 44px
  minHeight: theme.spacing(5.5), // 44px
  padding: theme.spacing(1),
  color: theme.palette.error.main,
  transition: theme.transitions.create(['opacity', 'background-color'], {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    backgroundColor: theme.palette.error.lighter,
  },
  '&:focus-visible': {
    opacity: 1,
    outline: `2px solid ${theme.palette.error.main}`,
    outlineOffset: 2,
  },
}));

export const DeleteIcon = styled(DeleteOutlineIcon)(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
}));

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
  gap: theme.spacing(1.75), // ~14px
}));

// Visual Hierarchy: Outlined style = secondary action
// Fitts's Law: Centered button with breathing room
export const AddFieldButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.primary.main,
  color: theme.palette.primary.main,
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightMedium,
  borderRadius: theme.spacing(0.5), // Half of normal border radius
  alignSelf: 'center',
  minHeight: theme.spacing(5.5), // 44px minimum touch target
  padding: theme.spacing(1, 3),
  transition: theme.transitions.create(['border-color', 'background-color', 'transform'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    borderColor: theme.palette.primary.dark,
    backgroundColor: `${theme.palette.primary.main}08`,
    transform: 'translateY(-1px)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
}));

export const AddFieldIcon = styled(AddIcon)(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
}));

// Empty state styles
// Visual feedback when section has no fields
export const EmptyState = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4, 2),
  color: theme.palette.text.secondary,
  fontSize: theme.typography.body2.fontSize,
  fontStyle: 'italic',
  backgroundColor: theme.palette.background[3],
  borderRadius: theme.spacing(0.5),
  border: `1px dashed ${theme.palette.grey[300]}`,
}));
