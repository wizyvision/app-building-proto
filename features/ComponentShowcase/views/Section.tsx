'use client';

import React, { useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { Section as SectionComponent } from '@/components/Section';
import { SectionContent } from '@/components/Section/version1/Content';
import { FieldProps } from '@/components/Field';
import { VersionTabs } from '@/components/shared/VersionTabs';
import { VersionInfo } from '@/components/shared/VersionInfo';
import {
  StorySection,
  ShowcaseGrid,
  StoryTitle,
  StoryDescription,
} from '../styles';

interface MockField extends Omit<FieldProps, 'onEditLabel' | 'onEdit' | 'onMenuOpen'> {
  id: string;
  label: string;
  type: string;
}

interface MockSection {
  id: string;
  name: string;
  isExpanded: boolean;
  isSystem?: boolean;
  fields: MockField[];
}

const SECTION_VERSIONS = [
  {
    version: 1,
    date: 'October 2, 2025',
    description: 'Initial implementation with collapsible sections and field management',
    features: [
      'Collapsible header with expand/collapse',
      'Drag-and-drop section reordering',
      'Inline editing of section names',
      'Delete functionality for non-system sections',
      'Add field button with empty state',
      'Progressive disclosure (hover shows actions)',
    ],
  },
];

export const Section: React.FC = () => {
  const [currentVersion, setCurrentVersion] = useState(1);
  const [sections, setSections] = useState<MockSection[]>([
    {
      id: 'section-1',
      name: 'System Information',
      isExpanded: true,
      isSystem: true,
      fields: [
        { id: 'field-1', label: 'Created Date', type: 'date' },
        { id: 'field-2', label: 'Last Modified', type: 'date' },
        { id: 'field-3', label: 'Status', type: 'dropdown' },
        { id: 'field-4', label: 'Full Name', type: 'text' },
      ],
    },
    {
      id: 'section-2',
      name: 'Contact Details',
      isExpanded: true,
      isSystem: false,
      fields: [
        { id: 'field-5', label: 'Email Address', type: 'email' },
        { id: 'field-6', label: 'Phone Number', type: 'tel' },
        { id: 'field-7', label: 'Address', type: 'text' },
      ],
    },
    {
      id: 'section-3',
      name: 'Additional Information',
      isExpanded: true,
      isSystem: false,
      fields: [],
    },
  ]);

  const handleSectionToggle = (sectionId: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, isExpanded: !section.isExpanded }
          : section
      )
    );
  };

  const handleSectionRename = (sectionId: string, newName: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId ? { ...section, name: newName } : section
      )
    );
  };

  const handleSectionDelete = (sectionId: string) => {
    setSections((prev) => prev.filter((section) => section.id !== sectionId));
  };

  const handleFieldEditLabel = (sectionId: string, fieldId: string, newLabel: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              fields: section.fields.map((field) =>
                field.id === fieldId ? { ...field, label: newLabel } : field
              ),
            }
          : section
      )
    );
  };

  const handleFieldEdit = (sectionId: string, fieldId: string) => {
    console.log('Edit field:', sectionId, fieldId);
  };

  const handleFieldMenuOpen = (
    sectionId: string,
    fieldId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    console.log('Open field menu:', sectionId, fieldId);
  };

  const handleAddField = (sectionId: string) => {
    const newFieldId = `field-${Date.now()}`;
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              fields: [
                ...section.fields,
                { id: newFieldId, label: 'New Field', type: 'text' },
              ],
            }
          : section
      )
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setSections((prev) => {
      const oldIndex = prev.findIndex((s) => s.id === active.id);
      const newIndex = prev.findIndex((s) => s.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const versionData = SECTION_VERSIONS.find((v) => v.version === currentVersion);

  return (
    <StorySection elevation={0}>
      <StoryTitle variant="h5">Section Component</StoryTitle>
      <StoryDescription variant="body2">
        Collapsible container for grouping form fields with drag-and-drop support
      </StoryDescription>

      <VersionTabs
        versions={SECTION_VERSIONS.map((v) => v.version)}
        currentVersion={currentVersion}
        latestVersion={Math.max(...SECTION_VERSIONS.map((v) => v.version))}
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
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <ShowcaseGrid>
            {sections.map((section) => (
              <SectionComponent
                key={section.id}
                id={section.id}
                name={section.name}
                isExpanded={section.isExpanded}
                fieldCount={section.fields.length}
                isSystem={section.isSystem}
                onToggle={() => handleSectionToggle(section.id)}
                onRename={(newName: string) => handleSectionRename(section.id, newName)}
                onDelete={!section.isSystem ? () => handleSectionDelete(section.id) : undefined}
              >
                <SectionContent
                  isExpanded={section.isExpanded}
                  fields={section.fields}
                  onFieldEditLabel={(fieldId: string, newLabel: string) =>
                    handleFieldEditLabel(section.id, fieldId, newLabel)
                  }
                  onFieldEdit={(fieldId: string) => handleFieldEdit(section.id, fieldId)}
                  onFieldMenuOpen={(fieldId: string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                    handleFieldMenuOpen(section.id, fieldId, event)
                  }
                  onAddField={() => handleAddField(section.id)}
                />
              </SectionComponent>
            ))}
          </ShowcaseGrid>
        </SortableContext>
      </DndContext>
    </StorySection>
  );
};
