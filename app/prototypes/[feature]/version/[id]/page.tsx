'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { Box, styled } from '@mui/material';
import FormBuilderV1 from '@/features/FormBuilder/version1';
import FormBuilderV2 from '@/features/FormBuilder/version2';
import FormBuilderV3 from '@/features/FormBuilder/version3';

/**
 * Prototype Version Router
 *
 * This component dynamically loads the appropriate version of any feature prototype
 * based on the URL parameters. This pattern makes it easy to:
 * - Add new features without modifying this file
 * - Add new versions to existing features
 * - Keep feature and version logic completely separated
 * - Maintain a single entry point for all prototypes
 *
 * ARCHITECTURE PATTERN:
 * - This file acts as a feature + version registry/router
 * - Each feature has its own directory in /features/{FeatureName}
 * - Each version is in /features/{FeatureName}/version{N}/index.tsx
 * - Shared utilities are in /utils
 * - Mock data is in /mocks
 * - Reusable components are in /components
 *
 * HOW TO ADD A NEW FEATURE (e.g., UserManagement):
 * 1. Create /features/UserManagement/version1/index.tsx
 * 2. Import: import UserManagementV1 from '@/features/UserManagement/version1';
 * 3. Add to featureRegistry: 'user-management': { v1: UserManagementV1 }
 * 4. That's it! Route /prototypes/user-management/version/v1 will work
 *
 * HOW TO ADD A NEW VERSION TO EXISTING FEATURE (e.g., FormBuilder v3):
 * 1. Create /features/FormBuilder/version3/index.tsx
 * 2. Import: import FormBuilderV3 from '@/features/FormBuilder/version3';
 * 3. Add to form-builder versions: v3: FormBuilderV3
 * 4. Route /prototypes/form-builder/version/v3 will work
 *
 * SUPPORTED FEATURES:
 * - form-builder: v1 (two-column), v2 (three-column with field library)
 *
 * UX PRINCIPLES APPLIED:
 * - Hick's Law: Clear separation of features and versions reduces cognitive load
 * - Jakob's Law: Consistent routing pattern across all features
 */

// Styled components
const PageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const ViewContainer = styled(Box)(() => ({
  height: '100%',
  overflow: 'auto',
}));

// Feature + Version registry: Maps feature slugs to their version components
const featureRegistry: Record<string, Record<string, React.ComponentType<{ featureName: string; versionId: string }>>> = {
  'form-builder': {
    v1: FormBuilderV1,
    v2: FormBuilderV2,
    v3: FormBuilderV3,
  },
  // 'user-management': {
  //   v1: UserManagementV1,
  // },
  // Add more features here
};

export default function PrototypeVersionPage() {
  const params = useParams();
  const featureSlug = params.feature as string;
  const versionId = params.id as string;
  const featureName = String(featureSlug).replace(/-/g, ' ');

  // Get the feature's version map
  const featureVersions = featureRegistry[featureSlug];

  // If feature doesn't exist, show 404
  if (!featureVersions) {
    notFound();
  }

  // Get the appropriate version component
  const VersionComponent = featureVersions[versionId];

  // If version doesn't exist, show 404
  if (!VersionComponent) {
    notFound();
  }

  // Render the version-specific component
  return (
    <PageContainer>
      <ViewContainer>
        <VersionComponent featureName={featureName} versionId={versionId} />
      </ViewContainer>
    </PageContainer>
  );
}
