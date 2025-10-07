/**
 * MobilePreview Component - Version 3
 *
 * COMPONENT PURPOSE:
 * Displays a real-time mobile preview of the form being built.
 * Uses mobile-specific Section and Field components to show how the form
 * will appear on mobile devices. Syncs with desktop form builder state.
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar mobile device frame that users recognize instantly.
 *   Provides realistic context for how forms appear on actual devices.
 *
 * - Visual Hierarchy: Clear separation between desktop builder (left) and
 *   mobile preview (right). Device frame creates visual boundary.
 *
 * - Contextual Awareness: Shows real mobile interactions (touch-optimized)
 *   rather than scaled-down desktop version. Accurate preview builds confidence.
 *
 * - Fitts's Law: Preview is fixed-width, matching actual mobile dimensions
 *   (375px iPhone width), ensuring touch targets are accurately represented.
 *
 * TECHNICAL ARCHITECTURE:
 * - Uses MobileDevice component for device frame
 * - Uses mobile Section component (non-draggable)
 * - Uses mobile Field components (touch-optimized)
 * - Syncs state from parent FormBuilder
 * - Read-only preview (no editing in mobile view)
 *
 * MOBILE-SPECIFIC STYLING:
 * - Exact Figma specifications for mobile components
 * - Touch-optimized targets (48x48px minimum)
 * - Mobile typography and spacing
 * - Scrollable content within device frame
 *
 * INTERACTIONS:
 * - Expand/collapse sections (preview only)
 * - Scroll content (within device frame)
 * - No editing or drag-drop (read-only preview)
 * - Syncs with desktop form changes in real-time
 */

'use client';

import React from 'react';
import { Typography } from '@mui/material';
import { MobileDevice } from '@/components/mobile/MobileDevice';
import { MobileSection } from '@/components/mobile/Section';
import { MobileFieldFactory } from '@/features/Mobile/FieldFactory';
import { MobilePreviewProps } from './types';
import {
  MobilePreviewContainer,
  MobilePreviewHeader,
  MobilePreviewContent,
} from './styles';

export const MobilePreview: React.FC<MobilePreviewProps> = ({
  items,
  onFieldChange,
}) => {
  // Extract sections for expansion state
  const sections = items
    .filter((item) => item.type === 'section')
    .map((item) => item.data);

  const [expandedSections, setExpandedSections] = React.useState<Set<string>>(
    new Set(sections.filter((s) => s.isExpanded).map((s) => s.id))
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
            if (item.type === 'section') {
              const section = item.data;
              const isExpanded = expandedSections.has(section.id);
              const completionText = calculateCompletion(section.fields);

              // Regular section with name
              return (
                <MobileSection
                  key={section.id}
                  title={section.name}
                  completionText={completionText}
                  isExpanded={isExpanded}
                  onToggle={() => handleSectionToggle(section.id)}
                >
                  {section.fields.map((field) => (
                    <MobileFieldFactory
                      key={field.id}
                      field={{
                        ...field,
                        value: '', // Empty value for preview
                        dataType: field.type?.toUpperCase() || 'STRING',
                        fieldKey: field.label?.toLowerCase().replace(/\s+/g, '_'),
                      }}
                      showActions={false}
                      showAttachments={false}
                    />
                  ))}
                </MobileSection>
              );
            } else if (item.type === 'field') {
              // Render standalone field at full width (no section container)
              const field = item.data;

              return (
                <MobileFieldFactory
                  key={field.id}
                  field={{
                    ...field,
                    value: '', // Empty value for preview
                    dataType: field.type?.toUpperCase() || 'STRING',
                    fieldKey: field.label?.toLowerCase().replace(/\s+/g, '_'),
                  }}
                  showActions={false}
                  showAttachments={false}
                />
              );
            }

            return null;
          })}

          {items.length === 0 && (
            <div
              style={{
                padding: '48px 16px',
                textAlign: 'center',
                color: '#595959',
              }}
            >
              <Typography variant="body1" color="text.secondary">
                No sections yet
              </Typography>
              <Typography variant="body2" color="text.disabled">
                Add sections and fields to see mobile preview
              </Typography>
            </div>
          )}
        </MobileDevice>
      </MobilePreviewContent>
    </MobilePreviewContainer>
  );
};
