import { styled } from '@mui/material/styles';
import { Box, Divider as MuiDivider } from '@mui/material';

export const ButtonContainer = styled(Box)<{ disabled?: boolean; 'data-type'?: string }>(({ theme, disabled, 'data-type': dataType }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '48px',
  padding: theme.spacing(1.5, 2),
  backgroundColor: disabled
    ? theme.palette.grey[100]
    : dataType === 'section'
      ? '#e6f7ff'  // Light blue background for sections
      : theme.palette.common.white,
  borderRadius: '8px',
  marginBottom: theme.spacing(1),
  cursor: disabled ? 'not-allowed' : 'grab',
  opacity: disabled ? 0.5 : 1,
  transition: 'all 200ms',
  border: dataType === 'section' ? '1px solid #91d5ff' : 'none',
  '&:hover': {
    backgroundColor: disabled
      ? theme.palette.grey[100]
      : dataType === 'section'
        ? '#bae7ff'  // Slightly darker blue on hover
        : theme.palette.grey[100],
  },
  '&:active': {
    cursor: disabled ? 'not-allowed' : 'grabbing',
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
