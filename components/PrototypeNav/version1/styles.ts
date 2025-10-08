/**
 * PrototypeNav Styles v1
 */

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const NavContainer = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.appBar,
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const NavContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5, 2),
  maxWidth: '100%',
}));

export const VersionLabel = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  flex: 1,
}));

export const NavActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  marginLeft: 'auto',
}));
