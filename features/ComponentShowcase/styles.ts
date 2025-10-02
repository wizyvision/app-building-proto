import { styled } from '@mui/material/styles';
import { Container, Box, Paper, Typography, List, ListItemButton, IconButton } from '@mui/material';

export const StoryContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(2), // 16px
  paddingBottom: theme.spacing(4),
  paddingLeft: 0, // Remove horizontal padding
  paddingRight: 0,
}));

// Fitts's Law: 44x44px minimum touch target
export const BackButton = styled(IconButton)(({ theme }) => ({
  marginBottom: theme.spacing(1.5), // 12px
  minWidth: theme.spacing(5.5), // 44px
  minHeight: theme.spacing(5.5), // 44px
  color: theme.palette.text.primary,
  transition: theme.transitions.create(['background-color', 'color'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.primary.main,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
}));

export const StorySection = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(2), // 16px space above
  backgroundColor: theme.palette.background[2],
}));

export const ShowcaseGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  minWidth: '500px',
  maxWidth: '700px',
  width: '100%',
  margin: '0 auto',
}));

export const StoryTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(0.5), // 4px
  fontWeight: 600,
}));

export const StoryDescription = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1.5), // 12px
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

// Fitts's Law: Full-width list items (240px) for easy targeting
// Jakob's Law: Familiar sidebar navigation pattern
export const DrawerListItem = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(0.5),
  minHeight: theme.spacing(6), // 48px minimum
  transition: theme.transitions.create(['background-color', 'color'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary[1],
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary[2],
    },
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: -2,
  },
}));

export const ShowcaseContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2), // 16px
  overflowY: 'auto',
  marginLeft: 240,
}));
