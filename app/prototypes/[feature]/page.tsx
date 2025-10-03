'use client';

import React from 'react';
import { Typography, Card, CardContent, CardActionArea, Grid, Chip } from '@mui/material';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { getFeatureMetadata } from '@/config/featureRegistry';

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
 * Dynamically shows all versions of any feature using the feature registry.
 * This page works for any feature without needing to be modified.
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Timeline/version list pattern from GitHub, Figma
 * - Visual Hierarchy: Latest version highlighted with badge
 * - Fitts's Law: Large version cards (easy to click)
 */
export default function FeatureOverviewPage() {
  const params = useParams();
  const featureSlug = params.feature as string;

  // Get feature metadata from registry
  const featureMetadata = getFeatureMetadata(featureSlug);

  // If feature doesn't exist, show 404
  if (!featureMetadata) {
    notFound();
  }

  const { name: featureName, versions } = featureMetadata;

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
