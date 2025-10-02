import { styled } from '@mui/material/styles';
import { Container, Box, Card } from '@mui/material';

export const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

export const HeroSection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

// Fitts's Law: Large buttons with spacing for easy targeting
// Hick's Law: Limited to 2 actions (primary + secondary)
export const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'center',
  marginTop: theme.spacing(3),
  // Mobile: Stack buttons vertically
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
}));

// Visual Hierarchy: Card elevation distinguishes feature details
export const FeatureCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  boxShadow: theme.customShadows.z2,
  transition: theme.transitions.create(['box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    boxShadow: theme.customShadows.primary,
  },
  '& ul': {
    paddingLeft: theme.spacing(3),
    margin: theme.spacing(1, 0),
  },
  '& li': {
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));
