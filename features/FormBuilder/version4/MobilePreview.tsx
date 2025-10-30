/**
 * MobilePreview Component - Version 3 (Refactored for nested FieldData)
 *
 * COMPONENT PURPOSE:
 * Displays a real-time mobile preview of the form being built.
 * Uses mobile-specific Section and Field components to show how the form
 * will appear on mobile devices. Syncs with desktop form builder state.
 * Works with nested FieldData structure where sections have children arrays.
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar mobile device frame that users recognize instantly.
 * - Visual Hierarchy: Clear separation between desktop builder (left) and mobile preview (right).
 * - Contextual Awareness: Shows real mobile interactions (touch-optimized).
 * - Fitts's Law: Preview is fixed-width, matching actual mobile dimensions (375px iPhone width).
 *
 * TECHNICAL ARCHITECTURE:
 * - Uses MobileDevice component for device frame
 * - Uses mobile Section component (non-draggable)
 * - Uses mobile Field components (touch-optimized)
 * - Syncs state from parent FormBuilder
 * - Works with nested FieldData: sections have children[], standalone fields don't
 * - Read-only preview (no editing in mobile view)
 */

'use client';

import React from 'react';
import { Typography } from '@mui/material';
import { MobileDevice } from '@/components/mobile/MobileDevice';
import { MobileSection } from '@/components/mobile/Section';
import { MobileFieldFactory } from '@/features/Mobile/FieldFactory';
import { MobilePreviewProps, FieldData } from './types';
import { useFormBuilderContext } from './context/FormBuilderContext';
import {
  MobilePreviewContainer,
  MobilePreviewHeader,
  MobilePreviewContent,
  MobilePreviewEmptyState,
  EmptyStatePrimaryText,
  EmptyStateSecondaryText,
} from './styles';

export const MobilePreview: React.FC<MobilePreviewProps> = ({
  items,
  onFieldChange,
}) => {
  const { selectedFieldId } = useFormBuilderContext();

  // Extract sections for expansion state (sections are FieldData with type='SECTION')
  const sections = items.filter((item) => item.type === 'SECTION');

  const [expandedSections, setExpandedSections] = React.useState<Set<string>>(
    new Set(sections.filter((s) => s.isExpanded !== false).map((s) => s.id))
  );

  const handleSectionToggle = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const calculateCompletion = (sectionFields: any[]) => {
    const total = sectionFields.length;
    const completed = sectionFields.filter((f) => f.value).length;
    if (total === 0) return '';
    const percentage = Math.round((completed / total) * 100);
    return `${completed}/${total} (${percentage}%)`;
  };

  return (
    <MobilePreviewContainer>
      <MobilePreviewHeader>
        <Typography variant="h6" fontWeight={600}>
          Mobile Preview
        </Typography>
        <Typography variant="body2" color="text.secondary">
          iPhone 375px
        </Typography>
      </MobilePreviewHeader>

      <MobilePreviewContent>
        <MobileDevice
          statusBarTime="12:30"
          showWifi={true}
          showSignal={true}
          showBattery={true}
        >
          {items.map((item) => {
            if (item.type === 'SECTION') {
              // Render section with its children
              const section = item;
              const isExpanded = expandedSections.has(section.id);
              const completionText = calculateCompletion(section.children ?? []);

              return (
                <MobileSection
                  key={section.id}
                  title={section.label}
                  completionText={completionText}
                  isExpanded={isExpanded}
                  onToggle={() => handleSectionToggle(section.id)}
                >
                  {(section.children ?? []).map((field) => (
                    <MobileFieldFactory
                      key={field.id}
                      field={{
                        ...field,
                        value: '', // Empty value for preview
                        dataType: field.type?.toUpperCase() || 'STRING',
                        fieldKey: field.key || field.label?.toLowerCase().replace(/\s+/g, '_'),
                        description: field.helpText || undefined,
                      }}
                      showActions={false}
                      showAttachments={false}
                    />
                  ))}
                </MobileSection>
              );
            } else {
              // Render standalone field at full width (no section container)
              const field = item;

              return (
                <MobileFieldFactory
                  key={field.id}
                  field={{
                    ...field,
                    value: '', // Empty value for preview
                    dataType: field.type?.toUpperCase() || 'STRING',
                    fieldKey: field.key || field.label?.toLowerCase().replace(/\s+/g, '_'),
                    description: field.helpText || undefined,
                  }}
                  showActions={false}
                  showAttachments={false}
                />
              );
            }
          })}

          {items.length === 0 && (
            <MobilePreviewEmptyState>
              <EmptyStatePrimaryText variant="body1">
                No sections yet
              </EmptyStatePrimaryText>
              <EmptyStateSecondaryText variant="body2">
                Add sections and fields to see mobile preview
              </EmptyStateSecondaryText>
            </MobilePreviewEmptyState>
          )}
        </MobileDevice>
      </MobilePreviewContent>
    </MobilePreviewContainer>
  );
};
