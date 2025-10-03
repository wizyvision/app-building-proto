'use client';

import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, closestCenter, DragOverlay, useDroppable, pointerWithin, rectIntersection, getFirstCollision } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { Box } from '@mui/material';
import { Section as SectionV1 } from '@/components/Section/version1';
import { Section as SectionV2 } from '@/components/Section/version2';
import { SectionContent as SectionContentV1 } from '@/components/Section/version1/Content';
import { SectionContent as SectionContentV2 } from '@/components/Section/version2/Content';
import { Field as FieldV1 } from '@/components/Field/version1';
import { Field as FieldV2 } from '@/components/Field/version2';
import { FieldProps } from '@/components/Field';
import { DragOverlayContainer } from '@/components/Field/version2/styles';
import { VersionTabs } from '@/components/shared/VersionTabs';
import { VersionInfo } from '@/components/shared/VersionInfo';
import {
  StorySection,
  ShowcaseGrid,
  StoryTitle,
  StoryDescription,
  FieldDropZoneBox,
  DropIndicatorBox,
  DropIndicatorBoxBelow,
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

// Component for drop indicator at end of fields list
const FieldListDropZone = ({ sectionId, isDragging, hasFields }: { sectionId: string; isDragging: boolean; hasFields: boolean }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `drop-end-${sectionId}`,
    data: {
      type: 'field-drop-end',
      sectionId,
    },
  });

  if (!isDragging) return null;

  return (
    <FieldDropZoneBox
      ref={setNodeRef}
      isOver={isOver}
      hasFields={hasFields}
    >
      {!hasFields && !isOver && 'Drop field here'}
    </FieldDropZoneBox>
  );
};

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
  {
    version: 2,
    date: 'October 3, 2025',
    description: 'Updated styling with Figma wireframe icons and #fafafa background',
    features: [
      'Same behavior as version 1',
      'Content background: #fafafa',
      'UnfoldLessHorizontal icon for expand/collapse',
      'DragHandle icon for drag-and-drop',
      'Updated visual consistency with Figma design',
    ],
  },
];

export const Section: React.FC = () => {
  const [currentVersion, setCurrentVersion] = useState(1);
  const [isDraggingSection, setIsDraggingSection] = useState(false);
  const [isDraggingField, setIsDraggingField] = useState(false);
  const [activeField, setActiveField] = useState<MockField | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
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

  const handleDragStart = (event: DragStartEvent) => {
    const activeData = event.active.data.current;
    setActiveId(event.active.id as string);

    if (activeData?.type === 'section') {
      setIsDraggingSection(true);
    } else if (activeData?.type === 'field') {
      setIsDraggingField(true);

      // Find the field being dragged
      const activeFieldId = event.active.id as string;
      for (const section of sections) {
        const field = section.fields.find(f => f.id === activeFieldId);
        if (field) {
          setActiveField(field);
          break;
        }
      }
    }
  };

  const handleDragOver = (event: any) => {
    setOverId(event.over?.id || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDraggingSection(false);
    setIsDraggingField(false);
    setActiveField(null);
    setOverId(null);
    setActiveId(null);
    const { active, over } = event;

    if (!over) {
      return;
    }

    const activeData = active.data.current;
    const overData = over.data.current;

    // Handle section reordering
    if (activeData?.type === 'section' && overData?.type === 'section') {
      if (active.id === over.id) return;

      setSections((prev) => {
        const oldIndex = prev.findIndex((s) => s.id === active.id);
        const newIndex = prev.findIndex((s) => s.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
      return;
    }

    // Handle field dragging
    if (activeData?.type === 'field') {
      const activeFieldId = active.id as string;

      // Find source section
      let sourceSectionId: string | null = null;
      let fieldToMove: MockField | null = null;

      for (const section of sections) {
        const field = section.fields.find(f => f.id === activeFieldId);
        if (field) {
          sourceSectionId = section.id;
          fieldToMove = field;
          break;
        }
      }

      if (!fieldToMove || !sourceSectionId) return;

      // Determine target section
      let targetSectionId: string | null = null;
      let targetFieldIndex: number = -1;

      if (overData?.type === 'section-drop' || overData?.type === 'section-field-drop' || overData?.type === 'field-drop-end') {
        // Dropped on any section drop zone - add to end
        targetSectionId = overData.sectionId;
        const targetSection = sections.find(s => s.id === targetSectionId);
        targetFieldIndex = targetSection ? targetSection.fields.length : 0;
      } else if (overData?.type === 'field') {
        // Dropped on another field
        for (const section of sections) {
          const fieldIndex = section.fields.findIndex(f => f.id === over.id);
          if (fieldIndex !== -1) {
            targetSectionId = section.id;
            targetFieldIndex = fieldIndex;
            break;
          }
        }
      }

      if (!targetSectionId) return;

      // Same section reordering
      if (sourceSectionId === targetSectionId) {
        setSections((prev) =>
          prev.map((section) => {
            if (section.id === sourceSectionId) {
              const newFields = [...section.fields];
              const oldIndex = newFields.findIndex(f => f.id === activeFieldId);
              const newIndex = targetFieldIndex;
              const [removed] = newFields.splice(oldIndex, 1);
              newFields.splice(newIndex > oldIndex ? newIndex : newIndex, 0, removed);
              return { ...section, fields: newFields };
            }
            return section;
          })
        );
      } else {
        // Cross-section move
        setSections((prev) => {
          return prev.map((section) => {
            // Remove from source section
            if (section.id === sourceSectionId) {
              return {
                ...section,
                fields: section.fields.filter(f => f.id !== activeFieldId),
              };
            }

            // Add to target section
            if (section.id === targetSectionId) {
              const newFields = [...section.fields];
              newFields.splice(targetFieldIndex, 0, fieldToMove!);
              return {
                ...section,
                fields: newFields,
              };
            }

            return section;
          });
        });
      }
    }
  };

  const versionData = SECTION_VERSIONS.find((v) => v.version === currentVersion);

  // Select component based on version
  const SectionComponent = currentVersion === 1 ? SectionV1 : SectionV2;
  const SectionContent = currentVersion === 1 ? SectionContentV1 : SectionContentV2;
  const Field = currentVersion === 1 ? FieldV1 : FieldV2;

  // Custom collision detection: prioritize field drop zones over sections
  const customCollisionDetection = (args: any) => {
    // Start with pointer-based collisions
    const pointerCollisions = pointerWithin(args);

    // If dragging a field and we have collisions, prioritize by type
    if (args.active?.data?.current?.type === 'field' && pointerCollisions.length > 0) {
      // Look for field drop zones first (check if ID starts with 'drop-end-', 'empty-section-', or 'field-')
      const fieldDropZone = pointerCollisions.find((collision: any) =>
        collision.id.toString().startsWith('drop-end-') ||
        collision.id.toString().startsWith('empty-section-') ||
        collision.id.toString().startsWith('field-')
      );

      if (fieldDropZone) {
        return [fieldDropZone];
      }
    }

    // Return all pointer collisions or fall back to rect intersection
    return pointerCollisions.length > 0 ? pointerCollisions : rectIntersection(args);
  };

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
      <DndContext collisionDetection={customCollisionDetection} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
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
                  isAnySectionDragging={isDraggingSection}
                  isFieldDragging={isDraggingField}
                  sectionId={section.id}
                  onAddField={() => handleAddField(section.id)}
                  hasFields={section.fields.length > 0}
                >
                  <SortableContext
                    items={section.fields.map(f => f.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {section.fields.map((field, index) => {
                      // Calculate where the drop indicator should appear
                      const isActive = field.id === activeId;
                      const isOver = field.id === overId;

                      // Find indices for active and over items in THIS section
                      const activeIndex = section.fields.findIndex(f => f.id === activeId);
                      const overIndex = section.fields.findIndex(f => f.id === overId);

                      // Determine if we should show indicator above or below this field
                      let showIndicatorAbove = false;
                      let showIndicatorBelow = false;

                      if (isDraggingField && !isActive) {
                        if (activeIndex !== -1 && overIndex !== -1) {
                          // Same section dragging
                          if (activeIndex < overIndex) {
                            // Dragging down: show indicator below the over field
                            showIndicatorBelow = isOver;
                          } else if (activeIndex > overIndex) {
                            // Dragging up: show indicator above the over field
                            showIndicatorAbove = isOver;
                          }
                        } else if (activeIndex === -1 && overIndex !== -1) {
                          // Cross-section dragging: active field is from another section
                          // Always show indicator above the over field
                          showIndicatorAbove = isOver;
                        }
                      }

                      return (
                        <Box key={field.id}>
                          {/* Show drop indicator above this field */}
                          {showIndicatorAbove && <DropIndicatorBox />}
                          <Field
                          onEditLabel={function (newLabel: string): void {
                            throw new Error('Function not implemented.');
                          } } onMenuOpen={function (event: React.MouseEvent<HTMLButtonElement>): void {
                            throw new Error('Function not implemented.');
                          } } {...field}
                          sectionId={section.id}
                          onLabelChange={(newLabel: string) => handleFieldEditLabel(section.id, field.id, newLabel)}
                          onEdit={() => handleFieldEdit(section.id, field.id)}                            // onMenuClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                            //   handleFieldMenuOpen(section.id, field.id, event)
                            // }
                          />
                          {/* Show drop indicator below this field */}
                          {showIndicatorBelow && <DropIndicatorBoxBelow />}
                        </Box>
                      );
                    })}
                    {/* Drop zone at end of field list */}
                    <FieldListDropZone sectionId={section.id} isDragging={isDraggingField} hasFields={section.fields.length > 0} />
                  </SortableContext>
                </SectionContent>
              </SectionComponent>
            ))}
          </ShowcaseGrid>
        </SortableContext>
        <DragOverlay>
          {activeField ? (
            <DragOverlayContainer>
              <Field
                  onEditLabel={function (newLabel: string): void {
                    throw new Error('Function not implemented.');
                  } }
                  onMenuOpen={function (event: React.MouseEvent<HTMLButtonElement>): void {
                    throw new Error('Function not implemented.');
                  } } {...activeField}
                  sectionId=""
                  onLabelChange={() => { } }
                  onEdit={() => { } }
                  onMenuClick={() => { } }
              />
            </DragOverlayContainer>
          ) : null}
        </DragOverlay>
      </DndContext>
    </StorySection>
  );
};
