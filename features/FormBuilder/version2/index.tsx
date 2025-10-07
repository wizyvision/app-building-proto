'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
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
  useDroppable,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { AppBar } from '@/components/AppBar/version1';
import { FieldDrawer } from '@/components/FieldDrawer/FieldDrawer';
import { Divider } from '@/components/FieldLibraryButton/version1';
import { PreviewToggle } from '@/components/PreviewToggle/version1';
import { DraggableFieldLibraryButton } from './DraggableFieldLibraryButton';
import { MobileFormPreview } from './MobileFormPreview';
import { Section } from '@/components/Section/version2';
import { SectionContent } from '@/components/Section/version2/Content';
import { Field } from '@/components/Field/version2';
import { DragOverlayContainer } from '@/components/Field/version2/styles';
import { iconMapping } from '@/constants/iconMapping';
import { systemFields, equipmentFields } from '@/mocks/equipmentInspection';
import type { FieldData } from '@/features/FormFields';
import FolderIcon from '@mui/icons-material/Folder';

/**
 * Form Builder - Version 2
 *
 * VERSION INFO:
 * - Version: 2
 * - Layout: Three-column (field library drawer + center content)
 * - Components: Section v2, Field v2, FieldLibraryDrawer, MobileFormPreview
 * - Features: Web and Mobile preview toggle
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Three-panel layout familiar from design tools, mobile device preview familiar from responsive design tools
 * - Fitts's Law: Fixed sidebar keeps tools in consistent location, preview toggle in easy-reach position
 * - Visual Hierarchy: Clear separation between library, preview, and form. Mobile preview visually distinct with device frame
 * - Hick's Law: Simple toggle between web/mobile reduces decision time
 *
 * INTEGRATION:
 * - Mobile preview uses MobileDevice component with MobileFieldFactory
 * - Web preview shows drag-and-drop form builder with Section v2 and Field v2
 * - Toggle preserves form state when switching between views
 * - Mobile preview is read-only (no editing), web preview is fully interactive
 */

interface FormBuilderV2Props {
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

interface FormStructure {
  sections: SectionData[];
  standaloneFields: FieldData[];
}

// Supported field types based on FormFields/FieldFactory.tsx
const SUPPORTED_FIELD_TYPES = [
  'TEXT', 'STRING', 'DOUBLE', 'BOOLEAN', 'CHECKBOX', 'SELECT', 'DATE',
  'TIME', 'FILE_LIST', 'PRIVACY_ID', 'TAGS_DROPDOWN', 'MULTIPLE_CHOICE'
];

const fieldLibraryItems = [
  { id: 'section', label: 'Section', type: 'SECTION', category: 'section' },
  { id: 'divider-1', label: '', type: 'DIVIDER', category: 'divider' },
  // System Fields
  { id: 'title', label: 'Title', type: 'STRING', category: 'system' },
  { id: 'description', label: 'Description', type: 'TEXT', category: 'system' },
  { id: 'status', label: 'Status', type: 'SELECT', category: 'system' },
  { id: 'privacy', label: 'Privacy', type: 'PRIVACY_ID', category: 'system' },
  { id: 'divider-2', label: '', type: 'DIVIDER', category: 'divider' },
  // Custom Fields
  { id: 'paragraph', label: 'Paragraph', type: 'TEXT', category: 'custom' },
  { id: 'string', label: 'Text Field', type: 'STRING', category: 'custom' },
  { id: 'double', label: 'Number', type: 'DOUBLE', category: 'custom' },
  { id: 'boolean', label: 'Toggle', type: 'BOOLEAN', category: 'custom' },
  { id: 'checkbox', label: 'Checkbox', type: 'CHECKBOX', category: 'custom' },
  { id: 'select', label: 'Dropdown', type: 'SELECT', category: 'custom' },
  { id: 'date', label: 'Date', type: 'DATE', category: 'custom' },
  { id: 'time', label: 'Time', type: 'TIME', category: 'custom' },
  { id: 'file_list', label: 'Custom Files', type: 'FILE_LIST', category: 'custom' },
  { id: 'tags_dropdown', label: 'Tags Dropdown', type: 'TAGS_DROPDOWN', category: 'custom' },
  { id: 'multiple_choice', label: 'Multiple Choice', type: 'MULTIPLE_CHOICE', category: 'custom' },
  { id: 'ocr', label: 'Extracted Texts', type: 'OCR', category: 'custom' },
  { id: 'tags', label: 'Tags', type: 'TAGS', category: 'custom' },
  { id: 'location', label: 'Location', type: 'LOCATION', category: 'custom' },
  { id: 'people', label: 'People', type: 'PEOPLE', category: 'custom' },
  { id: 'people_list', label: 'People List', type: 'PEOPLE_LIST', category: 'custom' },
  { id: 'signature', label: 'Signature', type: 'SIGNATURE', category: 'custom' },
  { id: 'aris_cart', label: 'Reference List', type: 'ARIS_CART', category: 'custom' },
  { id: 'reference', label: 'Reference', type: 'REFERENCE', category: 'custom' },
  { id: 'schedule', label: 'Schedule', type: 'SCHEDULE', category: 'custom' },
];

const LayoutContainer = styled('div')({
  display: 'flex',
  height: 'calc(100vh - 64px)',
  width: '100vw',
  overflow: 'hidden',
  backgroundColor: '#f8f8f8',
  marginTop: '64px',
});

const CenterContent = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  alignItems: 'center',
  padding: 24,
  marginLeft: '280px',
});

const PreviewToggleContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  paddingBottom: theme.spacing(3),
}));

const SectionsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  maxWidth: 775,
  width: '100%',
}));

const DropIndicatorBox = styled(Box)(({ theme }) => ({
  height: theme.spacing(0.375),
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.spacing(0.125),
  marginBottom: theme.spacing(0.125),
  marginX: theme.spacing(0.25),
}));

const DropIndicatorBoxBelow = styled(Box)(({ theme }) => ({
  height: theme.spacing(0.375),
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.spacing(0.125),
  marginTop: theme.spacing(0.125),
  marginX: theme.spacing(0.25),
}));

const StandaloneFieldsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  border: `2px dashed ${theme.palette.grey[300]}`,
  borderRadius: theme.spacing(1),
  minHeight: theme.spacing(10),
}));

const StandaloneFieldsLabel = styled('div')(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const SectionDropIndicator = styled(Box)(({ theme }) => ({
  height: theme.spacing(0.5),
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.spacing(0.25),
  margin: theme.spacing(1, 0),
}));

const SectionEndDropZone = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOver' && prop !== 'isDragging',
})<{ isOver?: boolean; isDragging?: boolean }>(({ theme, isOver, isDragging }) => ({
  minHeight: isDragging ? theme.spacing(15) : theme.spacing(2),
  width: '100%',
  backgroundColor: isOver ? theme.palette.primary.lighter : isDragging ? theme.palette.grey[50] : 'transparent',
  border: isDragging ? `2px dashed ${isOver ? theme.palette.primary.main : theme.palette.grey[400]}` : 'none',
  borderRadius: theme.spacing(1),
  transition: theme.transitions.create(['background-color', 'min-height', 'border'], {
    duration: theme.transitions.duration.shorter,
  }),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: isOver ? theme.palette.primary.main : theme.palette.text.secondary,
  fontSize: theme.typography.body1.fontSize,
  fontWeight: isOver ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  visibility: isDragging ? 'visible' : 'hidden',
}));

const SectionDragOverlay = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 775,
  cursor: 'grabbing',
}));

const LibrarySectionOverlay = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: theme.shape.borderRadius,
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
  boxShadow: theme.shadows[8],
  cursor: 'grabbing',
  minWidth: 200,
}));

const LibraryFieldOverlay = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5, 2.5),
  backgroundColor: theme.palette.background.paper,
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  fontSize: theme.typography.body1.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
  boxShadow: theme.shadows[4],
  cursor: 'grabbing',
  minWidth: 180,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  color: theme.palette.text.primary,
}));

// Helper to create a new field from library item
const createFieldFromLibraryItem = (item: { id: string; label: string; dataType: string }): FieldData => {
  return {
    id: Date.now(),
    creatorId: 0,
    dataType: item.dataType,
    description: null,
    descriptionIntl: null,
    helper: null,
    helperTextIntl: null,
    iconName: null,
    instructionText: null,
    isRequired: false,
    isSystem: false,
    isVisible: true,
    key: `field_${Date.now()}`,
    label: item.label,
    logics: null,
    lookupSettings: null,
    position: 0,
    readOnly: false,
    selectOptions: null,
    defaultValue: null,
    attachmentSettings: null,
    remarkSettings: null,
    settings: null,
    shownInList: false,
    typeId: 0,
    validations: null,
    layoutWebFormPosition: null,
    layoutMobileFormPosition: null,
    layoutCaseListPosition: null,
    layoutPrintPosition: null,
    layoutCaseCardVisibility: false,
    linkableAppIds: null,
    linkableAppMapping: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };
};

export default function FormBuilderV2({ featureName, versionId }: FormBuilderV2Props) {
  const router = useRouter();
  const [previewMode, setPreviewMode] = useState<'web' | 'mobile'>('web');

  // Drop zone at end of sections list
  const { setNodeRef: setSectionEndDropRef, isOver: isSectionEndOver } = useDroppable({
    id: 'section-end-drop-zone',
    data: {
      type: 'section-end-drop',
    },
  });

  // Helper to check if a system field is already in the form
  const isSystemFieldInUse = (fieldKey: string, sections: SectionData[]): boolean => {
    for (const section of sections) {
      if (section.fields.some(field => field.key === fieldKey)) {
        return true;
      }
    }
    return false;
  };

  // Include all system fields: title, description, status, privacy
  const systemSectionFields = systemFields;

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

  const [standaloneFields, setStandaloneFields] = useState<FieldData[]>([]);

  const [isDraggingSection, setIsDraggingSection] = useState(false);
  const [isDraggingField, setIsDraggingField] = useState(false);
  const [isDraggingFromLibrary, setIsDraggingFromLibrary] = useState(false);
  const [isDraggingLibrarySection, setIsDraggingLibrarySection] = useState(false);
  const [isDraggingLibraryField, setIsDraggingLibraryField] = useState(false);
  const [activeField, setActiveField] = useState<FieldData | null>(null);
  const [activeSection, setActiveSection] = useState<SectionData | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [activeLibraryItem, setActiveLibraryItem] = useState<any>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const customCollisionDetection = (args: any) => {
    const pointerCollisions = pointerWithin(args);
    const activeType = args.active?.data?.current?.type;

    // For fields (existing or from library), prioritize field drop zones
    if ((activeType === 'field' || activeType === 'library-field') && pointerCollisions.length > 0) {
      const fieldDropZone = pointerCollisions.find((collision: any) =>
        collision.id.toString().startsWith('drop-end-') ||
        collision.id.toString().startsWith('empty-section-') ||
        collision.id.toString().startsWith('section-drop-') ||
        collision.id.toString().startsWith('field-')
      );

      if (fieldDropZone) {
        return [fieldDropZone];
      }
    }

    // For sections (existing or from library), prioritize end drop zone first, then other sections
    if ((activeType === 'section' || activeType === 'library-section') && pointerCollisions.length > 0) {
      // First check for end drop zone
      const endDropZone = pointerCollisions.find((collision: any) =>
        collision.id === 'section-end-drop-zone'
      );

      if (endDropZone) {
        return [endDropZone];
      }

      // Then check for section drop zones
      const sectionDropZone = pointerCollisions.find((collision: any) =>
        collision.data?.current?.type === 'section'
      );

      if (sectionDropZone) {
        return [sectionDropZone];
      }
    }

    return pointerCollisions.length > 0 ? pointerCollisions : rectIntersection(args);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const activeData = event.active.data.current;
    setActiveId(event.active.id as string);

    if (activeData?.type === 'library-section') {
      setIsDraggingFromLibrary(true);
      setIsDraggingLibrarySection(true);
      setActiveLibraryItem(activeData.item);
    } else if (activeData?.type === 'library-field') {
      setIsDraggingFromLibrary(true);
      setIsDraggingLibraryField(true);
      setActiveLibraryItem(activeData.item);
    } else if (activeData?.type === 'section') {
      setIsDraggingSection(true);
      // Find the section being dragged
      const section = sections.find(s => s.id === event.active.id);
      if (section) {
        setActiveSection(section);
      }
    } else if (activeData?.type === 'field') {
      setIsDraggingField(true);
      const activeFieldId = event.active.id as string;

      // Check in sections
      for (const section of sections) {
        const field = section.fields.find(f => String(f.id) === activeFieldId);
        if (field) {
          setActiveField(field);
          break;
        }
      }

      // Check in standalone fields
      if (!activeField) {
        const field = standaloneFields.find(f => String(f.id) === activeFieldId);
        if (field) {
          setActiveField(field);
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
    setIsDraggingFromLibrary(false);
    setIsDraggingLibrarySection(false);
    setIsDraggingLibraryField(false);
    setActiveField(null);
    setActiveSection(null);
    setActiveId(null);
    setOverId(null);
    setActiveLibraryItem(null);

    const { active, over } = event;

    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    // Handle dragging section from library
    if (activeData?.type === 'library-section') {
      const newSectionId = `section-${Date.now()}`;
      const newSection: SectionData = {
        id: newSectionId,
        name: 'New Section',
        isExpanded: true,
        isSystem: false,
        fields: [],
      };

      // If dropped on a section, insert before it
      if (overData?.type === 'section') {
        const overSectionIndex = sections.findIndex(s => s.id === over.id);
        if (overSectionIndex !== -1) {
          const newSections = [...sections];
          newSections.splice(overSectionIndex, 0, newSection);
          setSections(newSections);
          return;
        }
      }

      // If dropped on end zone or otherwise, add to the end
      if (overData?.type === 'section-end-drop' || !overData) {
        setSections([...sections, newSection]);
        return;
      }

      // Fallback: add to the end
      setSections([...sections, newSection]);
      return;
    }

    // Handle dragging field from library
    if (activeData?.type === 'library-field') {
      const newField = createFieldFromLibraryItem(activeData.item);

      // Check if dropped into a section
      if (overData?.type === 'field-drop-end' || overData?.type === 'section-drop' || overData?.type === 'section-field-drop') {
        const targetSectionId = overData.sectionId;
        setSections(prev => prev.map(section => {
          if (section.id === targetSectionId) {
            return {
              ...section,
              fields: [...section.fields, newField],
            };
          }
          return section;
        }));
      } else if (overData?.type === 'field') {
        // Dropped on another field - insert before it
        let inserted = false;
        for (const section of sections) {
          const fieldIndex = section.fields.findIndex(f => String(f.id) === over.id);
          if (fieldIndex !== -1) {
            setSections(prev => prev.map(s => {
              if (s.id === section.id) {
                const newFields = [...s.fields];
                newFields.splice(fieldIndex, 0, newField);
                return { ...s, fields: newFields };
              }
              return s;
            }));
            inserted = true;
            break;
          }
        }

        // If not inserted in section, add to standalone
        if (!inserted) {
          setStandaloneFields(prev => [...prev, newField]);
        }
      }
      return;
    }

    // Handle section reordering
    if (activeData?.type === 'section') {
      if (overData?.type === 'section-end-drop') {
        // Move to end
        setSections((prev) => {
          const oldIndex = prev.findIndex((s) => s.id === active.id);
          const section = prev[oldIndex];
          const newSections = prev.filter((_, i) => i !== oldIndex);
          return [...newSections, section];
        });
        return;
      } else if (overData?.type === 'section') {
        if (active.id === over.id) return;

        setSections((prev) => {
          const oldIndex = prev.findIndex((s) => s.id === active.id);
          const newIndex = prev.findIndex((s) => s.id === over.id);
          return arrayMove(prev, oldIndex, newIndex);
        });
        return;
      }
    }

    // Handle field dragging
    if (activeData?.type === 'field') {
      const activeFieldId = active.id as string;

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

      let targetSectionId: string | null = null;
      let targetFieldIndex: number = -1;

      if (overData?.type === 'field-drop-end' || overData?.type === 'section-drop' || overData?.type === 'section-field-drop') {
        targetSectionId = overData.sectionId;
        const targetSection = sections.find(s => s.id === targetSectionId);
        targetFieldIndex = targetSection ? targetSection.fields.length : 0;
      } else if (overData?.type === 'field') {
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
    if (newName.trim()) {
      setSections(
        sections.map((section) =>
          section.id === sectionId ? { ...section, name: newName.trim() } : section
        )
      );
    }
  };

  const handleDeleteSection = (sectionId: string) => {
    setSections(sections.filter((section) => section.id !== sectionId));
  };

  const handleFieldLabelChange = (sectionId: string, fieldId: string, newLabel: string) => {
    if (newLabel.trim()) {
      setSections(
        sections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              fields: section.fields.map((field) =>
                String(field.id) === fieldId
                  ? { ...field, label: newLabel.trim() }
                  : field
              ),
            };
          }
          return section;
        })
      );
    }
  };

  return (
    <>
      <AppBar
        showBackButton
        onBackClick={() => router.push('/prototypes/form-builder')}
        title="Form Builder"
      />
      <DndContext
        sensors={sensors}
        collisionDetection={customCollisionDetection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <LayoutContainer>
          {/* Field Library Drawer */}
          <FieldDrawer>
            {fieldLibraryItems.map((item, index) => {
              // Render divider
              if (item.category === 'divider') {
                return <Divider key={item.id} />;
              }

              const IconComponent = item.id === 'section'
                ? FolderIcon
                : iconMapping[item.type as keyof typeof iconMapping];

              const isSupported = item.category === 'section' || SUPPORTED_FIELD_TYPES.includes(item.type);

              // Check if system field is already in use
              const isAlreadyInUse = item.category === 'system' && isSystemFieldInUse(item.id, sections);
              const isEnabled = isSupported && !isAlreadyInUse;

              // Determine disabled reason
              let disabledReason: string | undefined;
              if (isAlreadyInUse) {
                disabledReason = "Already in use";
              } else if (!isSupported) {
                disabledReason = "Not yet supported";
              }

              return (
                <React.Fragment key={item.id}>
                  <DraggableFieldLibraryButton
                    id={item.id}
                    label={item.label}
                    type={item.category as 'system' | 'custom' | 'section'}
                    icon={IconComponent ? <IconComponent /> : null}
                    dataType={item.type}
                    isSupported={isEnabled}
                    disabledReason={disabledReason}
                  />
                </React.Fragment>
              );
            })}
          </FieldDrawer>

          {/* Center Content */}
          <CenterContent>
            <PreviewToggleContainer>
              <PreviewToggle value={previewMode} onChange={setPreviewMode} />
            </PreviewToggleContainer>

            {/* Mobile Preview */}
            {previewMode === 'mobile' && (
              <MobileFormPreview
                sections={sections}
                standaloneFields={standaloneFields}
              />
            )}

            {/* Web Preview (Form Builder) */}
            {previewMode === 'web' && (
              <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                <SectionsContainer>
                {sections.map((section, index) => {
                  const isSectionActive = section.id === activeId;
                  const isSectionOver = section.id === overId;

                  // Determine if we should show drop indicator above or below this section
                  const activeSectionIndex = sections.findIndex(s => s.id === activeId);
                  const overSectionIndex = sections.findIndex(s => s.id === overId);

                  let showIndicatorAbove = false;
                  let showIndicatorBelow = false;

                  if ((isDraggingSection || isDraggingLibrarySection) && !isSectionActive) {
                    if (activeSectionIndex !== -1 && overSectionIndex !== -1) {
                      // Dragging existing section
                      if (activeSectionIndex < overSectionIndex) {
                        showIndicatorBelow = isSectionOver;
                      } else if (activeSectionIndex > overSectionIndex) {
                        showIndicatorAbove = isSectionOver;
                      }
                    } else if (isDraggingLibrarySection && isSectionOver) {
                      // Dragging from library - always show above
                      showIndicatorAbove = true;
                    }
                  }

                  return (
                    <React.Fragment key={section.id}>
                      {showIndicatorAbove && <SectionDropIndicator />}
                      <Section
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
                      isAnySectionDragging={isDraggingSection || isDraggingLibrarySection}
                      isFieldDragging={isDraggingField || (isDraggingFromLibrary && !isDraggingLibrarySection)}
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

                          const activeIndex = section.fields.findIndex(f => String(f.id) === activeId);
                          const overIndex = section.fields.findIndex(f => String(f.id) === overId);

                          let showIndicatorAbove = false;
                          let showIndicatorBelow = false;

                          if ((isDraggingField || isDraggingFromLibrary) && !isActive) {
                            if (activeIndex !== -1 && overIndex !== -1) {
                              // Dragging within same section
                              if (activeIndex < overIndex) {
                                showIndicatorBelow = isOver;
                              } else if (activeIndex > overIndex) {
                                showIndicatorAbove = isOver;
                              }
                            } else if ((activeIndex === -1 && overIndex !== -1) || isDraggingFromLibrary) {
                              // Dragging from another section or from library
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
                                isSystemField={field.isSystem}
                                fieldData={field}
                                onLabelChange={(newLabel) => handleFieldLabelChange(section.id, fieldId, newLabel)}
                                onEdit={() => console.log('Edit field:', field.id)}
                                onMenuClick={() => console.log('Menu:', field.id)}
                              />
                              {showIndicatorBelow && <DropIndicatorBoxBelow />}
                            </Box>
                          );
                        })}
                      </SortableContext>
                    </SectionContent>
                  </Section>
                  {showIndicatorBelow && <SectionDropIndicator />}
                </React.Fragment>
                  );
                })}

                {/* Drop zone at end for section dragging - always rendered for droppable ref */}
                <SectionEndDropZone
                  ref={setSectionEndDropRef}
                  isOver={isSectionEndOver}
                  isDragging={isDraggingSection || isDraggingLibrarySection}
                >
                  {isSectionEndOver ? '↓ Drop section here' : 'Drop section at the end'}
                </SectionEndDropZone>
              </SectionsContainer>
            </SortableContext>
            )}
          </CenterContent>
        </LayoutContainer>

        <DragOverlay>
          {activeField ? (
            <DragOverlayContainer>
              <Field
                id={String(activeField.id)}
                label={activeField.label}
                type={activeField.dataType}
                isSystemField={activeField.isSystem}
                fieldData={activeField}
                onLabelChange={() => {}}
                onEdit={() => {}}
                onMenuClick={() => {}}
              />
            </DragOverlayContainer>
          ) : activeSection ? (
            <SectionDragOverlay>
              <Section
                id={activeSection.id}
                name={activeSection.name}
                isExpanded={false}
                fieldCount={activeSection.fields.length}
                isSystem={activeSection.isSystem}
                onToggle={() => {}}
                onRename={() => {}}
              >
                <div />
              </Section>
            </SectionDragOverlay>
          ) : isDraggingLibrarySection ? (
            <LibrarySectionOverlay>
              📁 New Section
            </LibrarySectionOverlay>
          ) : isDraggingLibraryField && activeLibraryItem ? (
            <LibraryFieldOverlay>
              {(() => {
                const IconComponent = iconMapping[activeLibraryItem.dataType as keyof typeof iconMapping];
                return IconComponent ? <IconComponent /> : null;
              })()}
              {activeLibraryItem.label}
            </LibraryFieldOverlay>
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}
