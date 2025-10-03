'use client';

import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  pointerWithin,
  rectIntersection,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { AppBar } from '@/components/AppBar/version1';
import { Section } from '@/components/Section/version1';
import { SectionContent } from '@/components/Section/version1/Content';
import { Field } from '@/components/Field/version1';
import { DragOverlayContainer } from '@/components/Field/version2/styles';
import { systemFields, equipmentFields } from '@/mocks/equipmentInspection';
import type { FieldData } from '@/features/FormFields';

/**
 * Form Builder - Version 1
 *
 * VERSION INFO:
 * - Version: 1
 * - Layout: Two-column (center content only, no field library drawer)
 * - Components: Section v1, Field v1, AppBar v1
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Top app bar familiar from standard web apps
 * - Visual Hierarchy: Clean, focused layout without sidebar distraction
 * - Miller's Law: Content organized into sections (System, Equipment)
 * - Fitts's Law: Large "Add Section" button in accessible position
 *
 * FEATURES:
 * - AppBar at top with app title
 * - Container with sections and fields
 * - "Add Section" button (top right) to add new custom sections
 * - Default sections: System (title, status, privacy), Equipment (equipment_id, equipment_type)
 * - Section v1 and Field v1 components with expand/collapse
 */

interface FormBuilderV1Props {
  featureName: string;
  versionId: string;
}

interface SectionData {
  id: string;
  name: string;
  isExpanded: boolean;
  isSystem: boolean;
  fields: FieldData[];
}

const PageContainer = styled('div')({
  marginTop: 64, // Account for fixed AppBar height
  minHeight: 'calc(100vh - 64px)',
  backgroundColor: '#f5f5f5',
});

const ContentContainer = styled('div')(({ theme }) => ({
  maxWidth: 800,
  margin: '0 auto',
  padding: theme.spacing(3),
  gap: theme.spacing(2)
}));

const AddSectionButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(0, 3)
}));

const SectionsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const DropIndicatorBox = styled(Box)(({ theme }) => ({
  height: theme.spacing(0.375), // 3px
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.spacing(0.125),
  marginBottom: theme.spacing(0.125),
  marginX: theme.spacing(0.25),
}));

const DropIndicatorBoxBelow = styled(Box)(({ theme }) => ({
  height: theme.spacing(0.375), // 3px
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.spacing(0.125),
  marginTop: theme.spacing(0.125),
  marginX: theme.spacing(0.25),
}));

export default function FormBuilderV1({ featureName, versionId }: FormBuilderV1Props) {
  const router = useRouter();

  // Filter system fields to only include title, status, privacy (exclude description)
  const systemSectionFields = systemFields.filter((field) =>
    ['title', 'status', 'privacy'].includes(field.key)
  );

  const [sections, setSections] = useState<SectionData[]>([
    {
      id: 'system-section',
      name: 'System',
      isExpanded: true,
      isSystem: true,
      fields: systemSectionFields,
    },
    {
      id: 'equipment-section',
      name: 'Equipment',
      isExpanded: true,
      isSystem: false,
      fields: equipmentFields,
    },
  ]);

  const [isDraggingSection, setIsDraggingSection] = useState(false);
  const [isDraggingField, setIsDraggingField] = useState(false);
  const [activeField, setActiveField] = useState<FieldData | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  // Set up drag sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px movement before drag starts
      },
    })
  );

  const handleAddSection = () => {
    const newSectionId = `section-${Date.now()}`;
    const newSection: SectionData = {
      id: newSectionId,
      name: 'New Section',
      isExpanded: true,
      isSystem: false,
      fields: [],
    };
    setSections([...sections, newSection]);
  };

  const handleToggleSection = (sectionId: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? { ...section, isExpanded: !section.isExpanded }
          : section
      )
    );
  };

  const handleRenameSection = (sectionId: string, newName: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId ? { ...section, name: newName } : section
      )
    );
  };

  const handleDeleteSection = (sectionId: string) => {
    setSections(sections.filter((section) => section.id !== sectionId));
  };

  // Custom collision detection: prioritize field drop zones over sections
  const customCollisionDetection = (args: any) => {
    const pointerCollisions = pointerWithin(args);

    if (args.active?.data?.current?.type === 'field' && pointerCollisions.length > 0) {
      const fieldDropZone = pointerCollisions.find((collision: any) =>
        collision.id.toString().startsWith('drop-end-') ||
        collision.id.toString().startsWith('empty-section-') ||
        collision.id.toString().startsWith('field-')
      );

      if (fieldDropZone) {
        return [fieldDropZone];
      }
    }

    return pointerCollisions.length > 0 ? pointerCollisions : rectIntersection(args);
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
        const field = section.fields.find(f => String(f.id) === activeFieldId);
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
    // Reset drag states
    setIsDraggingSection(false);
    setIsDraggingField(false);
    setActiveField(null);
    setActiveId(null);
    setOverId(null);

    const { active, over } = event;

    if (!over) return;

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

      // Find source section and field
      let sourceSectionId: string | null = null;
      let fieldToMove: FieldData | null = null;

      for (const section of sections) {
        const field = section.fields.find(f => String(f.id) === activeFieldId);
        if (field) {
          sourceSectionId = section.id;
          fieldToMove = field;
          break;
        }
      }

      if (!fieldToMove || !sourceSectionId) return;

      // Determine target section and index
      let targetSectionId: string | null = null;
      let targetFieldIndex: number = -1;

      if (overData?.type === 'field-drop-end' || overData?.type === 'section-drop' || overData?.type === 'section-field-drop') {
        // Dropped on section drop zone - add to end
        targetSectionId = overData.sectionId;
        const targetSection = sections.find(s => s.id === targetSectionId);
        targetFieldIndex = targetSection ? targetSection.fields.length : 0;
      } else if (overData?.type === 'field') {
        // Dropped on another field
        for (const section of sections) {
          const fieldIndex = section.fields.findIndex(f => String(f.id) === over.id);
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
              const oldIndex = newFields.findIndex(f => String(f.id) === activeFieldId);
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
            if (section.id === sourceSectionId) {
              return {
                ...section,
                fields: section.fields.filter(f => String(f.id) !== activeFieldId),
              };
            }

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

  return (
    <>
      <AppBar
        showBackButton
        onBackClick={() => router.push('/prototypes/form-builder')}
        title="Form Builder"
      />
      <PageContainer>
        <ContentContainer>
        <AddSectionButtonContainer>
          <Button variant="contained" color="primary" onClick={handleAddSection}>
                Add Section
          </Button>
        </AddSectionButtonContainer>

          <DndContext
            sensors={sensors}
            collisionDetection={customCollisionDetection}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
              <SectionsContainer>
                {sections.map((section) => (
                  <Section
                    key={section.id}
                    id={section.id}
                    name={section.name}
                    isExpanded={section.isExpanded}
                    fieldCount={section.fields.length}
                    isSystem={section.isSystem}
                    onToggle={() => handleToggleSection(section.id)}
                    onRename={(newName) => handleRenameSection(section.id, newName)}
                    onDelete={section.isSystem ? undefined : () => handleDeleteSection(section.id)}
                  >
                    <SectionContent
                      isExpanded={section.isExpanded}
                      isAnySectionDragging={isDraggingSection}
                      isFieldDragging={isDraggingField}
                      sectionId={section.id}
                      onAddField={() => console.log('Add field to', section.id)}
                      hasFields={section.fields.length > 0}
                    >
                      <SortableContext
                        items={section.fields.map((f) => String(f.id))}
                        strategy={verticalListSortingStrategy}
                      >
                        {section.fields.map((field) => {
                          const fieldId = String(field.id);
                          const isActive = fieldId === activeId;
                          const isOver = fieldId === overId;

                          // Find indices for active and over items in THIS section
                          const activeIndex = section.fields.findIndex(f => String(f.id) === activeId);
                          const overIndex = section.fields.findIndex(f => String(f.id) === overId);

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
                              {showIndicatorAbove && <DropIndicatorBox />}
                              <Field
                                id={fieldId}
                                label={field.label}
                                type={field.dataType}
                                sectionId={section.id}
                                onEditLabel={(newLabel) => console.log('Edit label:', newLabel)}
                                onEdit={() => console.log('Edit field:', field.id)}
                                onMenuOpen={() => console.log('Menu:', field.id)}
                              />
                              {showIndicatorBelow && <DropIndicatorBoxBelow />}
                            </Box>
                          );
                        })}
                      </SortableContext>
                    </SectionContent>
                  </Section>
                ))}
              </SectionsContainer>
            </SortableContext>

          

            <DragOverlay>
              {activeField ? (
                <DragOverlayContainer>
                  <Field
                    id={String(activeField.id)}
                    label={activeField.label}
                    type={activeField.dataType}
                    sectionId=""
                    onEditLabel={() => {}}
                    onEdit={() => {}}
                    onMenuOpen={() => {}}
                  />
                </DragOverlayContainer>
              ) : null}
            </DragOverlay>
          </DndContext>
        </ContentContainer>
      </PageContainer>
    </>
  );
}
