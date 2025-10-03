import { styled } from '@mui/material/styles';
import { Box, Divider as MuiDivider } from '@mui/material';

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '48px',
  padding: theme.spacing(1.5, 2),
  backgroundColor: theme.palette.common.white,
  borderRadius: '8px',
  marginBottom: theme.spacing(1),
  cursor: 'grab',
  transition: 'all 200ms',
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
  '&:active': {
    cursor: 'grabbing',
  },
}));

export const IconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(1.5),
  color: theme.palette.text.secondary,
}));

export const LabelText = styled(Box)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

export const Divider = styled(MuiDivider)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));
