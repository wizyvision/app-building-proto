import { styled } from '@mui/material/styles';
import { Box, IconButton, TextField } from '@mui/material';

interface AdminFieldContainerProps {
  isGhost?: boolean;
  isDragOver?: boolean;
}

export const AdminFieldContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isGhost' && prop !== 'isDragOver',
})<AdminFieldContainerProps>(({ theme, isGhost, isDragOver }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingBottom: theme.spacing(1), // 8px
  paddingTop: 0,
  paddingLeft: theme.spacing(1), // 8px
  paddingRight: theme.spacing(1), // 8px
  width: '100%',
  minHeight: '64px', // Fixed height: 64px
  maxHeight: '64px',
  backgroundColor: theme.palette.common.white,
  opacity: isGhost ? 0.5 : 1,
  boxShadow: isDragOver ? theme.shadows[4] : 'none',
  transition: theme.transitions.create(['opacity', 'box-shadow'], {
    duration: theme.transitions.duration.shorter,
  }),
  position: 'relative',
}));

export const DragHandleWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isVisible',
})<{ isVisible?: boolean }>(({ theme, isVisible }) => ({
  display: 'flex',
  gap: theme.spacing(1.25), // 10px
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  opacity: isVisible ? 1 : 0,
  transition: theme.transitions.create(['opacity'], {
    duration: theme.transitions.duration.shorter,
  }),
  // Always maintain height to prevent layout shift
  height: '16px',
  minHeight: '16px',
}));

export const DragIconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  flexShrink: 0,
  cursor: 'grab',
  width: '16px',
  height: '16px',

  '&:active': {
    cursor: 'grabbing',
  },
}));

export const ContentSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  flexShrink: 0,
}));

export const ContentContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.25), // 10px
  minWidth: 0,
  overflow: 'hidden',
  minHeight: '40px',
}));

export const LabelText = styled('p')(({ theme }) => ({
  color: theme.palette.text.primary,
  margin: 0,
  padding: '8px 4px',
  flex: 1,
  minWidth: 0,
  minHeight: '40px',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  cursor: 'text',
  backgroundColor: theme.palette.common.white,
  borderRadius: '4px 4px 0 0',

  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
}));

export const LabelInput = styled(TextField)(({ theme }) => ({
  flex: 1,
  '& .MuiFilledInput-root': {
    backgroundColor: theme.palette.common.white,
    borderRadius: '4px 4px 0 0',
    height: '40px',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '24px',

    '&:before': {
      borderBottom: 'none',
    },
    '&:after': {
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
    '&:hover': {
      backgroundColor: theme.palette.common.white,
      '&:before': {
        borderBottom: 'none',
      },
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.common.white,
    },
  },
  '& .MuiFilledInput-input': {
    padding: '8px 4px',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '24px',
    color: theme.palette.text.primary,
  },
}));

export const ActionsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 0,
  flexShrink: 0,
}));

export const ActionButton = styled(IconButton)(({ theme }) => ({
  padding: 0,
  color: theme.palette.text.secondary,
  flexShrink: 0,

  '& svg': {
    width: 24,
    height: 24,
  },

  '&:hover': {
    color: theme.palette.primary.main,
  },

  '&.Mui-disabled': {
    color: theme.palette.action.disabled,
  },
}));

export const DragOverlayContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[8],
  cursor: 'grabbing',
  opacity: 0.95,
}));
