/**
 * Signature Field Styles
 * Mobile signature canvas/display area with action buttons
 * Figma reference: node-id 322-7480
 */

import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';

export const SignatureContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.25),
  width: '100%',
}));

export const SignatureCanvas = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '144px',
  border: '1px solid #79747e',
  borderRadius: '4px',
  backgroundColor: '#ffffff',
  padding: `${theme.spacing(1)} 0 ${theme.spacing(1)} ${theme.spacing(2)}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  position: 'relative',
}));

export const ActionsRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1.5),
  justifyContent: 'flex-end',
  alignItems: 'center',
  height: '40px',
}));

export const RemoveButton = styled(Button)(({ theme }) => ({
  height: '40px',
  padding: `${theme.spacing(0.875)} ${theme.spacing(1.5)}`,
  borderRadius: '100px',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '20px',
  letterSpacing: '0.1px',
  color: 'rgba(74, 68, 88, 0.75)',
  '&:hover': {
    backgroundColor: 'rgba(74, 68, 88, 0.08)',
  },
}));

export const AttachButton = styled(Button)(({ theme }) => ({
  height: '40px',
  padding: `${theme.spacing(0.875)} ${theme.spacing(3)} ${theme.spacing(0.875)} ${theme.spacing(2)}`,
  borderRadius: '100px',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '20px',
  letterSpacing: '0.1px',
  backgroundColor: '#fff0ee',
  color: theme.palette.primary.main,
  boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
  gap: theme.spacing(1),
  '&:hover': {
    backgroundColor: '#ffe8e5',
    boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
  },
}));
