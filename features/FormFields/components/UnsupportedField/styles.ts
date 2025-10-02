import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const UnsupportedContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
}));

export const UnsupportedText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.secondary,
  fontStyle: 'italic',
}));
