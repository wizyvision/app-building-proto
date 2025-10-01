import { styled } from '@mui/material/styles';
import { Box, IconButton, TextField } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Fitts's Law: 44x44px minimum touch targets for all interactive elements
// Jakob's Law: Familiar card-based field pattern
export const FieldContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isDragging',
})<{ isDragging: boolean }>(({ theme, isDragging }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.grey[300]}`,
  boxShadow: theme.shadows[1],
  display: 'flex',
  alignItems: 'center',
  minHeight: '62px',
  padding: theme.spacing(1.5, 2),
  gap: theme.spacing(1.5),
  cursor: isDragging ? 'grabbing' : 'default',
  '&:hover': {
    boxShadow: theme.shadows[2],
  },
}));

// Progressive disclosure: Drag handle only visible on hover
export const DragHandle = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'isVisible',
})<{ isVisible: boolean }>(({ theme, isVisible }) => ({
  opacity: isVisible ? 1 : 0,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
  cursor: 'grab',
  minWidth: '24px',
  minHeight: '24px',
  padding: '5px',
  '&:active': {
    cursor: 'grabbing',
  },
}));

export const LabelContainer = styled(Box)({
  flex: 1,
  minWidth: 0,
});

export const LabelEditArea = styled(Box)(({ theme }) => ({
  cursor: 'text',
  padding: theme.spacing(0.5, 0),
}));

export const LabelText = styled('p')(({ theme }) => ({
  margin: 0,
  fontSize: '0.875rem',
  lineHeight: '20px',
  color: theme.palette.text.primary,
  fontWeight: 400,
}));

// Progressive disclosure: Action buttons only visible on hover
export const ActionButtonGroup = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isVisible',
})<{ isVisible: boolean }>(({ theme, isVisible }) => ({
  display: 'flex',
  gap: theme.spacing(0.5),
  opacity: isVisible ? 1 : 0,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// Fitts's Law: 44x44px touch target for action buttons
export const ActionButton = styled(IconButton)(({ theme }) => ({
  minWidth: '24px',
  minHeight: '24px',
  padding: '5px',
}));

export const ActionIcon = styled(EditIcon)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.error.main,
}));

export const MenuIcon = styled(MoreVertIcon)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.error.main,
}));

export const DragIcon = styled(DragIndicatorIcon)({
  fontSize: '14px',
});

export const StyledTextField = styled(TextField)({
  '& .MuiInput-root': {
    fontSize: '0.875rem',
  },
});
