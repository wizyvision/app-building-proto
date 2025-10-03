'use client';

import React from 'react';
import { Typography, Card, CardContent, CardActionArea, Grid, Chip } from '@mui/material';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { styled } from '@mui/material/styles';

const PageContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: theme.breakpoints.values.lg,
  margin: '0 auto',
}));

const VersionCard = styled(Card)(({ theme }) => ({
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

const BackLink = styled(Link)(({ theme }) => ({
  display: 'inline-block',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

/**
 * Feature Overview Page
 *
 * Shows all versions of a specific feature as case study cards
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Timeline/version list pattern from GitHub, Figma
 * - Visual Hierarchy: Latest version highlighted with badge
 * - Fitts's Law: Large version cards (easy to click)
 */
export default function FeatureOverviewPage() {
  const params = useParams();
  const featureName = String(params.feature).replace(/-/g, ' ');

  const versions = [
    {
      id: 'v1',
      version: '1.0',
      date: '2024-09-15',
      description: 'Initial wireframe with basic section and field management',
      isLatest: false,
    },
    {
      id: 'v2',
      version: '2.0',
      date: '2024-10-01',
      description: 'Enhanced with device preview, drag-and-drop, and interactive components',
      isLatest: true,
    },
  ];

  return (
    <PageContainer>
      <BackLink href="/prototypes">← Back to Prototypes</BackLink>

      <Typography variant="h3" gutterBottom textTransform="capitalize">
        {featureName}
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Version history and iterations
      </Typography>

      <Grid container spacing={3}>
        {versions.map((version) => (
          <Grid item xs={12} md={6} key={version.id}>
            <VersionCard>
              <CardActionArea
                component={Link}
                href={`/prototypes/${params.feature}/version/${version.id}`}
                sx={{ height: '100%' }}
              >
                <CardContent>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <Typography variant="h5">
                      Version {version.version}
                    </Typography>
                    {version.isLatest && (
                      <Chip label="Latest" color="primary" size="small" />
                    )}
                  </div>
                  <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                    {version.date}
                  </Typography>
                  <Typography variant="body2">
                    {version.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </VersionCard>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}
