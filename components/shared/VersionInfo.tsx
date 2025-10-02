'use client';

import React from 'react';
import { Typography, Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const InfoContainer = styled(Box)(({ theme }) => ({
  paddingBottom: theme.spacing(1.5), // 12px
  borderBottom: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(2),
}));

const InfoHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(0.5), // 4px
}));

const VersionTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
}));

const DateText = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.text.secondary,
}));

const DescriptionText = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1), // 8px
}));

const FeaturesList = styled('ul')(({ theme }) => ({
  margin: 0,
  paddingLeft: theme.spacing(2.5), // 20px
  '& li': {
    fontSize: theme.typography.body2.fontSize,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0.25), // 2px
  },
}));

const BreakingChangeChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.caption.fontSize,
  height: theme.spacing(3),
}));

export interface VersionInfoProps {
  version: number;
  date: string;
  description: string;
  features?: string[];
  changes?: string[];
  breaking?: boolean;
}

/**
 * VersionInfo Component
 *
 * Displays metadata about a component version
 *
 * UX PRINCIPLES APPLIED:
 * - Visual Hierarchy: Version number most prominent, then description
 * - Jakob's Law: Familiar changelog/release notes format
 * - Miller's Law: Features grouped in list (5-7 items max)
 */
export const VersionInfo: React.FC<VersionInfoProps> = ({
  version,
  date,
  description,
  features,
  changes,
  breaking,
}) => {
  return (
    <InfoContainer>
      <InfoHeader>
        <VersionTitle>v{version}</VersionTitle>
        <DateText>• {date}</DateText>
        {breaking && <BreakingChangeChip label="Breaking" size="small" />}
      </InfoHeader>

      <DescriptionText>{description}</DescriptionText>

      {features && features.length > 0 && (
        <FeaturesList>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </FeaturesList>
      )}

      {changes && changes.length > 0 && (
        <Box mt={2}>
          <Typography variant="body2" fontWeight="bold" gutterBottom>
            Changes from previous version:
          </Typography>
          <FeaturesList>
            {changes.map((change, index) => (
              <li key={index}>{change}</li>
            ))}
          </FeaturesList>
        </Box>
      )}
    </InfoContainer>
  );
};
