/**
 * MobileFormPreview Component
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar mobile device frame that users recognize as a phone
 *   Users immediately understand this is a mobile preview context
 *
 * - Fitts's Law: Mobile fields use 48x48px touch targets (delegated to MobileFieldFactory)
 *   Preview is read-only but maintains realistic mobile sizing
 *
 * - Visual Hierarchy: Device frame clearly separates mobile preview from editor
 *   Clear visual distinction between preview mode and editing mode
 *
 * - Contextual Design: Provides realistic mobile context for form preview
 *   Shows exactly how form will appear on mobile devices in the field
 *
 * - Progressive Disclosure: Uses MobileSection with expand/collapse functionality
 *   Reduces cognitive load by allowing users to focus on one section at a time
 *
 * DESIGN SPECS:
 * - Uses MobileDevice component (360x720px Android frame)
 * - Renders sections with MobileSection (collapsible)
 * - Fields rendered via MobileFieldFactory with FieldContainer
 * - Scrollable content area within device frame
 *
 * INTERACTIONS:
 * - Collapsible sections (tap header to expand/collapse)
 * - Static preview (no editing)
 * - Fields display current values/configuration
 * - Scrollable to view all form content
 *
 * ACCESSIBILITY:
 * - Semantic structure maintained
 * - Visual-only preview (not for actual form submission)
 * - Clear labeling for screen readers
 */

import React, { useState } from 'react';
import { MobileDevice } from '@/components/mobile/MobileDevice';
import { MobileSection } from '@/components/mobile/Section';
import { MobileFieldFactory } from '@/features/Mobile/FieldFactory';
import {
  MobilePreviewContainer,
  DeviceScaleWrapper,
  PreviewLabel,
  FieldsContainer,
} from './styles';
import { MobileFormPreviewProps } from './types';

export const MobileFormPreview: React.FC<MobileFormPreviewProps> = ({
  sections,
  standaloneFields = [],
}) => {
  // Track expanded state for each section (default: all expanded)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    sections.reduce((acc, section) => ({ ...acc, [section.id]: true }), {})
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <MobilePreviewContainer>
      <PreviewLabel>Mobile Preview</PreviewLabel>
      <DeviceScaleWrapper>
        <MobileDevice>
        {sections.map((section) => {
          // Calculate completion percentage
          const totalFields = section.fields.length;
          const completionText = `0/${totalFields} (0%)`;

          return (
            <MobileSection
              key={section.id}
              title={section.name}
              completionText={completionText}
              isExpanded={expandedSections[section.id] ?? true}
              onToggle={() => toggleSection(section.id)}
            >
              <FieldsContainer>
                {section.fields.map((field) => (
                  <MobileFieldFactory
                    key={field.id}
                    field={{
                      ...field,
                      fieldKey: field.key,
                      dataType: field.dataType,
                    }}
                  />
                ))}
              </FieldsContainer>
            </MobileSection>
          );
        })}

        {/* Standalone Fields (if any) */}
        {standaloneFields.length > 0 && (
          <FieldsContainer>
            {standaloneFields.map((field) => (
              <MobileFieldFactory
                key={field.id}
                field={{
                  ...field,
                  fieldKey: field.key,
                  dataType: field.dataType,
                }}
              />
            ))}
          </FieldsContainer>
        )}
        </MobileDevice>
      </DeviceScaleWrapper>
    </MobilePreviewContainer>
  );
};
