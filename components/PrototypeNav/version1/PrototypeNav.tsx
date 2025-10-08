/**
 * Prototype Navigation Component v1
 *
 * Provides navigation controls for prototype pages:
 * - Back to feature overview
 * - Version indicator
 * - Next/Previous version navigation (if available)
 *
 * UX Principles Applied:
 * - Jakob's Law: Standard back button positioning (top-left)
 * - Visual Hierarchy: Clear separation between navigation and content
 * - Consistency: Reusable across all prototype pages
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Box, IconButton, Typography, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { NavContainer, NavContent, VersionLabel, NavActions } from './styles';

export interface PrototypeNavProps {
  /** Feature name (e.g., "form-builder") */
  feature: string;
  /** Current version (e.g., "3.0", "3.1") */
  version: string;
  /** Display name for the feature (e.g., "Form Builder") */
  displayName?: string;
  /** Previous version link (if available) */
  previousVersion?: string;
  /** Next version link (if available) */
  nextVersion?: string;
  /** Custom back link override */
  backLink?: string;
}

export function PrototypeNav({
  feature,
  version,
  displayName,
  previousVersion,
  nextVersion,
  backLink,
}: PrototypeNavProps) {
  const defaultBackLink = `/prototypes/${feature}`;
  const finalBackLink = backLink ?? defaultBackLink;

  return (
    <NavContainer>
      <NavContent>
        {/* Back Button */}
        <Link href={finalBackLink} passHref legacyBehavior>
          <IconButton
            component="a"
            size="small"
            aria-label="Back to feature overview"
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Link>

        {/* Version Label */}
        <VersionLabel>
          <Typography variant="body2" color="text.secondary">
            {displayName || feature}
          </Typography>
          <Chip label={`v${version}`} size="small" />
        </VersionLabel>

        {/* Version Navigation */}
        <NavActions>
          {previousVersion && (
            <Link
              href={`/prototypes/${feature}/version/${previousVersion}`}
              passHref
              legacyBehavior
            >
              <IconButton
                component="a"
                size="small"
                aria-label={`Previous version (v${previousVersion})`}
              >
                <ChevronLeftIcon />
              </IconButton>
            </Link>
          )}
          {nextVersion && (
            <Link
              href={`/prototypes/${feature}/version/${nextVersion}`}
              passHref
              legacyBehavior
            >
              <IconButton
                component="a"
                size="small"
                aria-label={`Next version (v${nextVersion})`}
              >
                <ChevronRightIcon />
              </IconButton>
            </Link>
          )}
        </NavActions>
      </NavContent>
    </NavContainer>
  );
}
