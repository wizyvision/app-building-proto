import { styled } from '@mui/material/styles';
import { Box, IconButton, TextField } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Fitts's Law: 44x44px minimum touch targets for all interactive elements
// Jakob's Law: Familiar card-based field pattern
// Visual Hierarchy: Subtle elevation distinguishes fields from sections
export const FieldContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isDragging',
})<{ isDragging: boolean }>(({ theme, isDragging }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.grey[300]}`,
  boxShadow: theme.customShadows.z1,
  display: 'flex',
  alignItems: 'center',
  minHeight: theme.spacing(7.75), // 62px
  padding: theme.spacing(1.5, 2),
  gap: theme.spacing(1.5),
  cursor: isDragging ? 'grabbing' : 'default',
  transition: theme.transitions.create(['box-shadow', 'border-color'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    boxShadow: theme.customShadows.z2,
    borderColor: theme.palette.grey[400],
  },
  '&:focus-within': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
}));

// Progressive disclosure: Drag handle only visible on hover
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

export const LabelContainer = styled(Box)({
  flex: 1,
  minWidth: 0,
});

export const LabelEditArea = styled(Box)(({ theme }) => ({
  cursor: 'text',
  padding: theme.spacing(0.5, 0),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(['background-color'], {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const LabelText = styled('p')(({ theme }) => ({
  margin: 0,
  fontSize: theme.typography.body2.fontSize, // ~14px
  lineHeight: theme.spacing(2.5), // 20px
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightRegular, // 400
}));

// Progressive disclosure: Action buttons only visible on hover
// Hick's Law: Limited to 2 actions (edit, menu) to reduce decision time
export const ActionButtonGroup = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isVisible',
})<{ isVisible: boolean }>(({ theme, isVisible }) => ({
  display: 'flex',
  gap: theme.spacing(0.5),
  opacity: isVisible ? 1 : 0,
  transition: theme.transitions.create(['opacity'], {
    duration: theme.transitions.duration.shorter,
  }),
}));

// Fitts's Law: 44x44px touch target for action buttons
export const ActionButton = styled(IconButton)(({ theme }) => ({
  minWidth: theme.spacing(5.5), // 44px
  minHeight: theme.spacing(5.5), // 44px
  padding: theme.spacing(1),
  transition: theme.transitions.create(['background-color', 'color'], {
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

export const ActionIcon = styled(EditIcon)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.primary.main,
}));

export const MenuIcon = styled(MoreVertIcon)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.text.secondary,
}));

export const DragIcon = styled(DragIndicatorIcon)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.text.disabled,
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInput-root': {
    fontSize: theme.typography.body2.fontSize,
  },
  '& .MuiInput-input': {
    padding: theme.spacing(0.5, 0),
  },
}));
