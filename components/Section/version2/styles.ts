import { styled } from '@mui/material/styles';
import { Box, Card, IconButton, TextField, Chip, Button } from '@mui/material';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';

// ========================================
// Section (index.tsx) Styles
// ========================================

// Jakob's Law: Familiar accordion/section pattern
export const SectionWrapper = styled(Box)({
  width: '100%',
  boxSizing: 'border-box',
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
  boxSizing: 'border-box',
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

// Version 2: Using unfold_less icon (replaces non-existent unfold_less_horizontal)
// UnfoldLess provides two arrows pointing inward, rotated for expand/collapse states
export const ExpandIcon = styled(UnfoldLessIcon)(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
  transition: theme.transitions.create(['transform'], {
    duration: theme.transitions.duration.short,
  }),
}));

export const CollapseIcon = styled(UnfoldLessIcon)(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
  transform: 'rotate(90deg)',
}));

// Version 2: Using drag_handle icon from Figma (horizontal drag indicator)
export const DragIcon = styled(DragHandleIcon)(({ theme }) => ({
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
// Version 2: Background color #fafafa
export const ContentContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2, 2, 2),
  backgroundColor: '#fafafa',
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
export const EmptyState = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isFieldDragging' && prop !== 'isEmptyOver',
})<{ isFieldDragging?: boolean; isEmptyOver?: boolean }>(({ theme, isFieldDragging, isEmptyOver }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4, 2),
  color: theme.palette.text.secondary,
  fontSize: theme.typography.body2.fontSize,
  fontStyle: 'italic',
  backgroundColor: isEmptyOver ? theme.palette.primary.lighter : theme.palette.background[3],
  borderRadius: theme.spacing(0.5),
  border: isFieldDragging ? '2px dashed' : '1px dashed',
  borderColor: isEmptyOver ? theme.palette.primary.main : theme.palette.grey[300],
  minHeight: isFieldDragging ? theme.spacing(10) : 'auto',
  transition: theme.transitions.create(['background-color', 'border-color', 'min-height'], {
    duration: theme.transitions.duration.shorter,
  }),
}));

// Drop zone for collapsed sections
export const CollapsedDropZone = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOver',
})<{ isOver?: boolean }>(({ theme, isOver }) => ({
  minHeight: theme.spacing(1),
  backgroundColor: isOver ? theme.palette.primary.lighter : 'transparent',
  borderTop: isOver ? `2px solid ${theme.palette.primary.main}` : 'none',
  transition: theme.transitions.create(['background-color', 'min-height'], {
    duration: theme.transitions.duration.shorter,
  }),
}));

// Drop zone for expanded sections (when dragging fields)
export const FieldDropZone = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOver' && prop !== 'isDragging',
})<{ isOver?: boolean; isDragging?: boolean }>(({ theme, isOver, isDragging }) => ({
  minHeight: isDragging ? theme.spacing(6) : 0,
  backgroundColor: isOver ? theme.palette.primary.lighter : isDragging ? theme.palette.grey[100] : 'transparent',
  border: isDragging ? `2px dashed ${isOver ? theme.palette.primary.main : theme.palette.grey[300]}` : 'none',
  borderRadius: theme.spacing(0.5),
  transition: theme.transitions.create(['background-color', 'min-height', 'border'], {
    duration: theme.transitions.duration.shorter,
  }),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  fontSize: theme.typography.caption.fontSize,
}));

// Drop indicator between fields
export const DropIndicator = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isVisible',
})<{ isVisible?: boolean }>(({ theme, isVisible }) => ({
  height: isVisible ? theme.spacing(0.5) : 0,
  backgroundColor: isVisible ? theme.palette.primary.main : 'transparent',
  borderRadius: theme.spacing(0.25),
  margin: isVisible ? theme.spacing(0.5, 0) : 0,
  transition: theme.transitions.create(['height', 'margin', 'background-color'], {
    duration: theme.transitions.duration.shortest,
  }),
}));