import { styled } from '@mui/material/styles';
import { Box, Card, IconButton, TextField, Chip, Button } from '@mui/material';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import DeleteIcon from '@mui/icons-material/Delete';
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
}));

// ========================================
// SectionHeader Styles
// ========================================

// Fitts's Law: 72px minimum touch targets for primary actions (updated from v2)
// Full width header provides large clickable area
export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minHeight: '56px', // 72px as per Figma spec
  paddingLeft: theme.spacing(0),
  paddingRight: theme.spacing(1),
  cursor: 'pointer',
  transition: theme.transitions.create(['background-color'], {
    duration: theme.transitions.duration.shortest,
  }),
  '&:active': {
    backgroundColor: theme.palette.action.selected,
  },
}));

// Progressive Disclosure: Drag handle - centered at top of header, appears on hover
// Same pattern as Field v5
export const DragHandleWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isVisible',
})<{ isVisible: boolean }>(({ theme, isVisible }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: isVisible ? 1 : 0,
  transition: theme.transitions.create(['opacity'], {
    duration: theme.transitions.duration.shorter,
  }),
  height: '16px',
  minHeight: '16px',
  width: '100%',
}));

export const DragIconContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'grab',
  width: '16px',
  height: '16px',
  '&:active': {
    cursor: 'grabbing',
  },
});

// Jakob's Law: Familiar expand/collapse icon button
// Fitts's Law: 44x44px minimum touch target
export const ExpandButton = styled(IconButton)(({ theme }) => ({
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

// Version 3: Using UnfoldLess icon (same as v2 for consistency)
export const ExpandIcon = styled(UnfoldLessIcon)(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
  transition: theme.transitions.create(['transform'], {
    duration: theme.transitions.duration.short,
  }),
}));

export const CollapseIcon = styled(UnfoldLessIcon)(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
  transform: 'rotate(90deg)', // Rotate 90deg for collapse state
}));

// Section name container - now holds TextField directly
export const NameContainer = styled(Box)({
  flex: 1,
  minWidth: 0,
});

// TextField for inline editing - click to focus and type
// Appears as plain text until focused/hovered
export const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  '& .MuiInputBase-root': {
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: 'transparent',
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      backgroundColor: theme.palette.action.hover, // Subtle hover background
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent', // White background when focused
    },
  },
  '& .MuiInput-input': {
    padding: theme.spacing(1, 0.5),
    cursor: 'text',
  },
  '& .MuiInput-underline:before': {
    borderBottom: 'none', // No underline by default
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottom: 'none', // No underline on hover
  },
  '& .MuiInput-underline:after': {
    borderBottom: `2px solid ${theme.palette.primary.main}`, // Red underline only on focus
  },
}));

// System badge - light cyan/teal background
// Visual Hierarchy: Badge distinguishes section type
export const SystemBadge = styled(Chip)(({ theme }) => ({
  height: theme.spacing(3), // 24px
  fontSize: theme.typography.caption.fontSize, // ~11px
  backgroundColor: theme.palette.secondary[1], // '#e8fbfd' - light cyan/teal
  color: theme.palette.secondary[5], // '#36dfeb' - main cyan/teal
  border: 'none',
  '& .MuiChip-label': {
    padding: theme.spacing(0, 1),
    lineHeight: theme.spacing(2.25), // 18px
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

// Progressive Disclosure: Delete button only visible on hover
// Fitts's Law: 44x44px minimum touch target
export const DeleteButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'isVisible',
})<{ isVisible: boolean }>(({ theme, isVisible }) => ({// Control visibility with opacity
  color: theme.palette.grey[600], // Greyish color (grey[6])
  transition: theme.transitions.create(['opacity', 'background-color'], {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:focus-visible': {
    opacity: 1,
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
}));

export const StyledDeleteIcon = styled(DeleteIcon)({
});

// ========================================
// SectionContent Styles
// ========================================

// Progressive Disclosure: Content only shown when expanded
export const ContentContainer = styled(Box)(({ theme }) => ({
  padding: 0,
  backgroundColor: '#f8f8f8', // Figma spec: #f8f8f8 background for content area
}));

export const ContentInner = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 0, // No gap - insertion zones have padding for spacing
  padding: theme.spacing(1, 2), // 8px top/bottom, 16px left/right padding
}));

// Miller's Law: Group fields in manageable chunks (5-7 visible at once)
export const FieldsList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0), // ~14px
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
  shouldForwardProp: (prop) => prop !== 'isFieldDragging',
})<{ isFieldDragging?: boolean }>(({ theme, isFieldDragging }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4, 2),
  color: theme.palette.text.secondary,
  fontSize: theme.typography.body2.fontSize,
  fontStyle: 'italic',
  backgroundColor: theme.palette.background[3],
  borderRadius: theme.spacing(0.5),
  border: isFieldDragging ? '2px dashed' : '1px dashed',
  borderColor: isFieldDragging ? theme.palette.primary.main : theme.palette.grey[300],
  minHeight: isFieldDragging ? theme.spacing(10) : 'auto',
  transition: theme.transitions.create(['background-color', 'border-color', 'min-height'], {
    duration: theme.transitions.duration.shorter,
  }),
}));

// Empty state text for gray text portion ("or drag fields")
export const EmptyStateText = styled('span')(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: theme.typography.body2.fontSize,
  fontStyle: 'italic',
  marginLeft: '4px',
}));

// Empty state clickable link for "Add" text
// UX PRINCIPLES:
// - Fitts's Law: Minimum touch target with padding
// - Visual Hierarchy: Primary color indicates interactivity
// - Aesthetic-Usability: Hover underline provides clear affordance
export const EmptyStateLink = styled('button')(({ theme }) => ({
  background: 'none',
  border: 'none',
  padding: 0,
  margin: 0,
  color: theme.palette.primary.main,
  fontSize: theme.typography.body2.fontSize,
  fontStyle: 'italic',
  cursor: 'pointer',
  textDecoration: 'none',
  fontFamily: 'inherit',
  display: 'inline',

  // Hover state
  '&:hover': {
    textDecoration: 'underline',
  },

  // Active state
  '&:active': {
    color: theme.palette.primary.dark,
  },

  // Focus state for accessibility
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
    borderRadius: theme.spacing(0.25),
  },

  transition: theme.transitions.create(['color'], {
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
