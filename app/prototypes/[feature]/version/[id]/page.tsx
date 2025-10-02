'use client';

import React from 'react';
import { Typography, Paper } from '@mui/material';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { styled } from '@mui/material/styles';

const PageContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: theme.breakpoints.values.xl,
  margin: '0 auto',
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

const WireframeContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(3),
  backgroundColor: theme.palette.background[2],
}));

/**
 * Wireframe/Design View Page
 *
 * Displays specific wireframe or design iteration
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Full-page design view like Figma, InVision
 * - Visual Hierarchy: Clear navigation back to feature overview
 */
export default function WireframeViewPage() {
  const params = useParams();
  const featureName = String(params.feature).replace(/-/g, ' ');
  const versionId = params.id;

  return (
    <PageContainer>
      <BackLink href={`/prototypes/${params.feature}`}>
        ← Back to {featureName}
      </BackLink>

      <Typography variant="h3" gutterBottom sx={{ textTransform: 'capitalize' }}>
        {featureName} - Version {versionId}
      </Typography>

      <WireframeContainer>
        <Typography variant="h5" gutterBottom>
          Wireframe Placeholder
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This page would display the actual wireframe, design mockup, or interactive prototype.
          <br /><br />
          In a full implementation, this could include:
          <br />
          • Figma embed or screenshot
          <br />
          • Interactive prototype iframe
          <br />
          • Design annotations and specifications
          <br />
          • Feedback and comment threads
        </Typography>
      </WireframeContainer>
    </PageContainer>
  );
}
