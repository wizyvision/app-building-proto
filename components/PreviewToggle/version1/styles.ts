import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5), // 4px
  paddingBottom: theme.spacing(3), // 24px
  boxSizing: 'border-box',
}));

export const Label = styled(Typography)({
  fontFamily: 'Public Sans, sans-serif',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '22px',
  color: '#8c8c8c',
  paddingBottom: 8,
});

export const ButtonGroup = styled(Box)({
  display: 'flex',
  alignItems: 'stretch',
  position: 'relative',
});

interface ToggleButtonProps {
  selected: boolean;
}

export const ToggleButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<ToggleButtonProps>(({ selected }) => ({
  backgroundColor: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  padding: '9px 16px',
  cursor: 'pointer',
  boxSizing: 'border-box',
  transition: 'all 200ms',

  // First button
  '&:first-of-type': {
    borderRadius: '2px 0 0 2px',
    border: selected ? '1px solid #1890ff' : '1px solid transparent',
    ...(selected && {
      borderRight: 'none',
    }),
  },

  // Second button
  '&:last-of-type': {
    borderRadius: '0 2px 2px 0',
    boxShadow: '-1px 0px 0px 0px inset #d9d9d9, 0px 1px 0px 0px inset #d9d9d9, 0px -1px 0px 0px inset #d9d9d9',
  },

  '&:hover': {
    backgroundColor: selected ? '#ffffff' : '#f5f5f5',
  },
}));

export const IconWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  height: 20,
  width: 22,
});

export const ButtonText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<ToggleButtonProps>(({ selected }) => ({
  fontFamily: 'Public Sans, sans-serif',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '22px',
  color: selected ? '#1890ff' : '#bfbfbf',
  whiteSpace: 'pre',
}));
