import { styled } from '@mui/material/styles';
import { Container, Box, Paper, Typography, List, ListItemButton, IconButton } from '@mui/material';

export const StoryContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

export const BackButton = styled(IconButton)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const StorySection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background[2],
}));

export const ShowcaseGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const StoryTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: 600,
}));

export const StoryDescription = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

// ComponentShowcase specific styles
export const ShowcaseLayout = styled(Box)({
  display: 'flex',
  minHeight: '100vh',
});

export const ShowcaseDrawer = styled(Box)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  borderRight: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  position: 'fixed',
  height: '100vh',
  overflowY: 'auto',
  left: 0,
  top: 0,
}));

export const DrawerList = styled(List)(({ theme }) => ({
  padding: theme.spacing(1),
}));

export const DrawerListItem = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(0.5),
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary[1],
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary[2],
    },
  },
}));

export const ShowcaseContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  overflowY: 'auto',
  marginLeft: 240,
}));
