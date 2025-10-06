'use client';

import React from 'react';
import { Typography, Card, CardContent, Grid, Chip, Box, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import BuildIcon from '@mui/icons-material/Build';
import PersonIcon from '@mui/icons-material/Person';
import PsychologyIcon from '@mui/icons-material/Psychology';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { getFeatureMetadata } from '@/config/featureRegistry';
import { formBuilderVersions, getVersionDetails, type VersionDetail } from '@/features/FormBuilder/data';

const PageContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: theme.breakpoints.values.xl,
  margin: '0 auto',
}));

const NavigationBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}));

const NavButton = styled(Button)(({ theme }) => ({
  minHeight: 44,
  flex: 1,
  justifyContent: 'space-between',
  textTransform: 'none',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1.5, 2),
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  transition: theme.transitions.create(['background-color', 'border-color', 'box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    borderColor: theme.palette.primary.main,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
}));

const VersionCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: theme.transitions.create(['box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    boxShadow: theme.customShadows.z2,
  },
}));


const VersionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(2),
}));

const SectionTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
  '& svg': {
    fontSize: '1.25rem',
  },
}));

const InfoList = styled('ul')(({ theme }) => ({
  margin: 0,
  paddingLeft: theme.spacing(3),
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
  '& li': {
    marginBottom: theme.spacing(0.75),
  },
}));

const TechnicalFeasibilityBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}));

const FeasibilityItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  '&:last-child': {
    marginBottom: 0,
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

// Version details registry - add feature-specific details here
// Convert unified version metadata to details format
const versionDetails: Record<string, Record<string, VersionDetail>> = {
  'form-builder': Object.keys(formBuilderVersions).reduce((acc, key) => {
    acc[key] = getVersionDetails(formBuilderVersions[key]);
    return acc;
  }, {} as Record<string, VersionDetail>),
  // Add more features here as they're created
};

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
      <Typography variant="body1" color="text.secondary" mb={3}>
        Navigate to each approach:
      </Typography>

      {/* Navigation Bar */}
      <NavigationBar>
        {versions.map((version) => (
          <NavButton
            key={version.id}
            LinkComponent={Link}
            href={`/prototypes/${params.feature}/version/${version.id}`}
            endIcon={<ArrowForwardIcon />}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" fontWeight="medium">
                v{version.version}: {version.description.split('-')[0].trim()}
              </Typography>
              {version.isLatest && (
                <Chip label="Latest" size="small" color="success" />
              )}
            </Box>
          </NavButton>
        ))}
      </NavigationBar>

      <Typography variant="h4" gutterBottom>
        Approach Analysis
      </Typography>

      {/* Version Cards Grid */}
      <Grid container spacing={3} alignItems="flex-start">
        {versions.map((version) => {
          const details = versionDetails[featureSlug]?.[version.id];

          return (
            <Grid item xs={12} md={6} key={version.id}>
              <VersionCard>
                <CardContent sx={{ flexGrow: 1 }}>
                  {/* Header */}
                  <VersionHeader>
                    <Box>
                      <Typography variant="h6" fontWeight="medium" gutterBottom>
                        {version.description.split('-')[0].trim()}
                      </Typography>
                    </Box>
                    <Chip
                      label={`Version ${version.version}`}
                      size="small"
                      color={version.isLatest ? "primary" : "default"}
                    />
                  </VersionHeader>

                  {/* Description */}
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {version.description}
                  </Typography>

                  {details && (
                    <>
                      {/* Strengths */}
                      <SectionTitle>
                        <CheckCircleIcon sx={{ color: 'success.main' }} />
                        <Typography variant="subtitle2" fontWeight="medium">
                          Strengths
                        </Typography>
                      </SectionTitle>
                      <InfoList>
                        {details.strengths.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </InfoList>

                      {/* Limitations */}
                      <SectionTitle>
                        <CancelIcon sx={{ color: 'error.main' }} />
                        <Typography variant="subtitle2" fontWeight="medium">
                          Limitations
                        </Typography>
                      </SectionTitle>
                      <InfoList>
                        {details.limitations.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </InfoList>

                      {/* Best Scenarios */}
                      <SectionTitle>
                        <LightbulbIcon sx={{ color: 'info.main' }} />
                        <Typography variant="subtitle2" fontWeight="medium">
                          Best Scenarios
                        </Typography>
                      </SectionTitle>
                      <InfoList>
                        {details.bestScenarios.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </InfoList>

                      {/* User Expertise */}
                      <SectionTitle>
                        <PersonIcon sx={{ color: 'primary.main' }} />
                        <Typography variant="subtitle2" fontWeight="medium">
                          User Expertise
                        </Typography>
                      </SectionTitle>
                      <InfoList>
                        {details.userExpertise.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </InfoList>

                      {/* Design Principles */}
                      <SectionTitle>
                        <PsychologyIcon sx={{ color: 'secondary.main' }} />
                        <Typography variant="subtitle2" fontWeight="medium">
                          Design Principles
                        </Typography>
                      </SectionTitle>
                      <InfoList>
                        {details.designPrinciples.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </InfoList>

                      {/* Technical Feasibility */}
                      <TechnicalFeasibilityBox>
                        <SectionTitle sx={{ marginTop: 0 }}>
                          <BuildIcon sx={{ color: 'text.secondary' }} />
                          <Typography variant="subtitle2" fontWeight="medium">
                            Technical Feasibility
                          </Typography>
                        </SectionTitle>
                        <FeasibilityItem>
                          <Typography variant="body2" color="text.secondary">
                            Development Time:
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {details.technicalFeasibility.developmentTime}
                          </Typography>
                        </FeasibilityItem>
                        <FeasibilityItem>
                          <Typography variant="body2" color="text.secondary">
                            Complexity:
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {details.technicalFeasibility.complexity}
                          </Typography>
                        </FeasibilityItem>
                        <FeasibilityItem>
                          <Typography variant="body2" color="text.secondary">
                            Maintainability:
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {details.technicalFeasibility.maintainability}
                          </Typography>
                        </FeasibilityItem>
                      </TechnicalFeasibilityBox>
                    </>
                  )}
                </CardContent>
              </VersionCard>
            </Grid>
          );
        })}
      </Grid>
    </PageContainer>
  );
}
