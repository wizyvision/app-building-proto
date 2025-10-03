import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface FieldDrawerProps {
  children: React.ReactNode;
}

const DrawerContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  left: 0,
  width: '280px',
  height: 'calc(100vh - 64px)',
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(2),
  borderRight: `1px solid ${theme.palette.grey[300]}`,
  overflowY: 'auto',
}));

const DrawerHeader = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  marginBottom: theme.spacing(2),
}));

export const FieldDrawer: React.FC<FieldDrawerProps> = ({ children }) => {
  return (
    <DrawerContainer>
      <DrawerHeader>Field Library</DrawerHeader>
      {children}
    </DrawerContainer>
  );
};
