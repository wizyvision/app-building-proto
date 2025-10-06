'use client';

import React, { useState } from 'react';
import { Field as FieldV1 } from '@/components/Field/version1';
import { Field as FieldV2 } from '@/components/Field/version2';
import { Field as FieldV5 } from '@/components/Field/version5';
import { VersionTabs } from '@/components/shared/VersionTabs';
import { VersionInfo } from '@/components/shared/VersionInfo';
import {
  StorySection,
  ShowcaseGrid,
  StoryTitle,
  StoryDescription,
} from '../styles';

const mockFields = [
  { id: 'showcase-1', label: 'Text Field', type: 'text' },
  { id: 'showcase-2', label: 'Email Field', type: 'email' },
  { id: 'showcase-3', label: 'Date Field', type: 'date' },
  { id: 'showcase-4', label: 'Dropdown Field', type: 'dropdown' },
  { id: 'showcase-5', label: 'Phone Field', type: 'tel' },
  { id: 'showcase-6', label: 'Notes Field', type: 'textarea' },
];

const FIELD_VERSIONS = [
  {
    version: 1,
    date: 'October 2, 2025',
    description: 'Initial implementation with inline editing and interactive controls',
    features: [
      'Drag handle with 6-dot icon for reordering',
      'Inline label editing on click',
      'Edit button for field configuration',
      'Menu button (3-dot) for additional actions',
      'Progressive disclosure (hover shows controls)',
      'Touch targets minimum 44x44px (Fitts\'s Law)',
    ],
  },
  {
    version: 2,
    date: 'October 7, 2025',
    description: 'Two-section layout with field preview (Figma Version 2)',
    features: [
      'Drag handle with 6 vertical dots',
      'Header section with drag handle + label + actions',
      'Preview section showing actual field component',
      'Inline label editing',
      'Ghost state when dragging',
      'Drag over state with shadow',
      'Uses FieldFactory for preview',
      '24x24px touch targets (Fitts\'s Law)',
    ],
  },
  {
    version: 5,
    date: 'October 7, 2025',
    description: 'Compact design with custom drag icon (Figma Version 3)',
    features: [
      'Custom 16x16px drag icon',
      'Content section with label',
      'Inline label editing',
      'Ghost state: Semi-transparent when dragging',
      'Drag over state: Shadow when another field hovers',
      '24x24px touch targets (Fitts\'s Law)',
    ],
  },
];

export const Field: React.FC = () => {
  const [currentVersion, setCurrentVersion] = useState(2);

  const versionData = FIELD_VERSIONS.find((v) => v.version === currentVersion);

  const renderFields = () => {
    if (currentVersion === 1) {
      return mockFields.map((field) => (
        <FieldV1
          key={field.id}
          id={field.id}
          label={field.label}
          type={field.type}
          sectionId="showcase"
          onEditLabel={(newLabel: string) =>
            console.log('Edit label:', field.id, newLabel)
          }
          onEdit={() => console.log('Edit field:', field.id)}
          onMenuOpen={(event: React.MouseEvent<HTMLButtonElement>) =>
            console.log('Open menu:', field.id)
          }
        />
      ));
    }

    if (currentVersion === 2) {
      return mockFields.map((field) => (
        <FieldV2
          key={field.id}
          id={field.id}
          label={field.label}
          type={field.type}
          onLabelChange={(newLabel: string) =>
            console.log('Label changed:', field.id, newLabel)
          }
          onEdit={() => console.log('Edit field:', field.id)}
          onMenuClick={() => console.log('Menu clicked:', field.id)}
        />
      ));
    }

    if (currentVersion === 5) {
      return mockFields.map((field) => (
        <FieldV5
          key={field.id}
          id={field.id}
          label={field.label}
          type={field.type}
          onLabelChange={(newLabel: string) =>
            console.log('Label changed:', field.id, newLabel)
          }
          onEdit={() => console.log('Edit field:', field.id)}
          onMenuClick={() => console.log('Menu clicked:', field.id)}
        />
      ));
    }

    return mockFields.map((field) => (
      <FieldV2
        key={field.id}
        id={field.id}
        label={field.label}
        type={field.type}
        onLabelChange={(newLabel: string) =>
          console.log('Label changed:', field.id, newLabel)
        }
        onEdit={() => console.log('Edit field:', field.id)}
        onMenuClick={() => console.log('Menu clicked:', field.id)}
      />
    ));
  };

  return (
    <StorySection elevation={0}>
      <StoryTitle variant="h5">Field Component</StoryTitle>
      <StoryDescription variant="body2">
        Individual form field with drag-and-drop support and inline editing
      </StoryDescription>

      <VersionTabs
        versions={FIELD_VERSIONS.map((v) => v.version)}
        currentVersion={currentVersion}
        latestVersion={Math.max(...FIELD_VERSIONS.map((v) => v.version))}
        onChange={setCurrentVersion}
      />

      {versionData && (
        <VersionInfo
          version={versionData.version}
          date={versionData.date}
          description={versionData.description}
          features={versionData.features}
        />
      )}

      {/* Interactive Demo */}
      <ShowcaseGrid>
        {renderFields()}
      </ShowcaseGrid>
    </StorySection>
  );
};