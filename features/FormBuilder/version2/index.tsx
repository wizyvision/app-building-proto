'use client';

import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { AppBar } from '@/components/AppBar/version1';

/**
 * Form Builder - Version 2
 *
 * VERSION INFO:
 * - Version: 2
 * - Layout: Three-column (field library drawer + center content)
 * - Components: Section v2, Field v2, FieldLibraryDrawer
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Three-panel layout familiar from design tools
 * - Fitts's Law: Fixed sidebar keeps tools in consistent location
 * - Visual Hierarchy: Clear separation between library, preview, and form
 *
 * TODO: Implement version 2 layout
 */

interface FormBuilderV2Props {
  featureName: string;
  versionId: string;
}

const PageContainer = styled('div')({
  marginTop: 64, // Account for fixed AppBar height
  minHeight: 'calc(100vh - 64px)',
  backgroundColor: '#f5f5f5',
  padding: '24px',
});

const PlaceholderContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
}));

export default function FormBuilderV2({ featureName, versionId }: FormBuilderV2Props) {
  const router = useRouter();

  return (
    <>
      <AppBar
        showBackButton
        onBackClick={() => router.push('/prototypes/form-builder')}
        title="Form Builder"
      />
      <PageContainer>
        <PlaceholderContent>
          <h1>{featureName} - {versionId}</h1>
          <p>Form Builder Version 2 - To be implemented</p>
        </PlaceholderContent>
      </PageContainer>
    </>
  );
}
