'use client';

import React from 'react';
import { Typography, Card, CardContent, CardActionArea, Grid, IconButton } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';

const PageContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: theme.breakpoints.values.lg,
  margin: '0 auto',
}));

// Fitts's Law: 44x44px minimum touch target for back button
const BackButton = styled(IconButton)(({ theme }) => ({
  marginBottom: theme.spacing(2),
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

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.customShadows.primary,
  },
  '&:focus-within': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
}));

const features = [
  {
    id: 'form-builder',
    name: 'Form Builder',
    description: 'Device-based form layout builder with sections and fields',
    versions: 2,
  },
];

/**
 * Prototypes Landing Page
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Grid of cards pattern familiar from app stores, portfolios
 *   Back button follows familiar top-left navigation pattern
 * - Fitts's Law: Large clickable cards (easy targets), 44x44px back button
 * - Visual Hierarchy: Clear feature names, subtle descriptions
 * - Hick's Law: Limited choices (one feature per card)
 *
 * INTERACTIONS:
 * - Click back button: Navigate to home page
 * - Hover card: Card elevates with smooth animation
 * - Click card: Navigate to feature overview page
 * - Keyboard: Tab to navigate, Enter to select
 */
export default function PrototypesPage() {
  const router = useRouter();

  return (
    <PageContainer>
      <BackButton onClick={() => router.push('/')} aria-label="Back to home">
        <ArrowBackIcon />
      </BackButton>

      <Typography variant="h3" gutterBottom>
        Prototypes
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Browse feature prototypes and their iterations
      </Typography>

      <Grid container spacing={3}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={4} key={feature.id}>
            <FeatureCard>
              <CardActionArea
                component={Link}
                href={`/prototypes/${feature.id}`}
                sx={{ height: '100%' }}
              >
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {feature.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {feature.description}
                  </Typography>
                  <Typography variant="caption" color="primary">
                    {feature.versions} {feature.versions === 1 ? 'version' : 'versions'}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </FeatureCard>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}
