import { styled } from '@mui/material/styles';
import { Box, IconButton, TextField } from '@mui/material';

export const FieldContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2), // 16px
  backgroundColor: theme.palette.common.white,
  width: '100%',
  position: 'relative',
}));

export const FieldLabel = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1), // 8px
  alignItems: 'center',
  width: '100%',
}));

export const LeftSide = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  minWidth: 0,
}));

export const DragHandle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  flexShrink: 0,
  cursor: 'grab',

  '&:active': {
    cursor: 'grabbing',
  },

  // Fitts's Law: Adequate touch target
  minWidth: 24,
  minHeight: 24,
}));

export const LabelContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  paddingLeft: theme.spacing(1), // 8px
  paddingRight: theme.spacing(1), // 8px
  overflow: 'hidden',
}));

export const LabelTextWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.25), // 10px
  paddingTop: theme.spacing(1), // 8px
  paddingBottom: theme.spacing(1), // 8px
  width: '100%',
}));

export const LabelText = styled('p')(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.primary,
  cursor: 'text',
  margin: 0,
  flex: 1,
  minWidth: 0,

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const LabelInput = styled(TextField)(({ theme }) => ({
  flex: 1,
  '& .MuiInputBase-root': {
    ...theme.typography.body2,
    padding: 0,
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1),
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

export const RightSide = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 0,
  flexShrink: 0,
}));

export const ActionButton = styled(IconButton)(({ theme }) => ({
  width: 24,
  height: 24,
  padding: 0,
  color: theme.palette.text.primary,

  // Fitts's Law: Minimum 24x24px touch target
  minWidth: 24,
  minHeight: 24,

  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
  },
}));

export const FieldPreview = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.25), // 10px
  paddingLeft: theme.spacing(4), // 32px (to align with label text after drag handle)
  paddingRight: 0,
  overflow: 'hidden',
  width: '100%',
}));

export const DragOverlayContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[8],
  cursor: 'grabbing',
  opacity: 0.95,
}));
