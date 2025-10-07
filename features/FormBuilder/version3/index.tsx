/**
 * Form Builder - Version 3
 *
 * VERSION INFO:
 * - Version: 3
 * - Created: 2025-10-07
 * - Major Feature: Insertion Pattern Overlay System (Pattern C)
 *
 * CHANGES FROM V2:
 * - Context-aware insertion zones between components
 * - Non-invasive overlay system using absolute positioning
 * - No modification of existing Section/Field components
 * - Real-time mobile preview integration
 * - Enhanced drag-and-drop with improved visual feedback
 * - Progressive disclosure of insertion actions
 *
 * MIGRATION FROM V2:
 * - Props interface mostly unchanged - drop-in replacement
 * - New insertion pattern replaces previous "Add Field" buttons in sections
 * - Mobile preview now integrated (toggle via showMobilePreview prop)
 * - Insertion zones appear on hover instead of always visible add buttons
 * - State management extended but backward compatible
 *
 * BREAKING CHANGES:
 * - None - designed as non-breaking enhancement
 * - Add buttons in sections replaced with insertion zones
 * - If you relied on specific add button styling, update to use insertion zones
 *
 * KEY FEATURES:
 * - Pattern C Insertion: Overlay system sits between components
 * - Context-aware actions: Shows relevant buttons based on position
 * - No layout shifts: Absolute positioning prevents reflow
 * - Mobile preview: Real-time sync with form builder state
 * - Section v3 integration: Uses latest Section component
 * - Field v5 integration: Uses latest Field component
 * - Full drag-drop: Sections and fields reorderable
 * - Inline editing: Click-to-edit for names and labels
 * - System protection: System sections/fields cannot be deleted
 *
 * COMPONENT ARCHITECTURE:
 * - FormBuilder: Main container and state management
 * - SectionList: Renders sections with drag-drop context
 * - FieldList: Renders fields within sections
 * - InsertionOverlay: Manages all insertion zones
 * - InsertionZone: Individual insertion zone component
 * - MobilePreview: Mobile device preview with sync
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar form builder patterns
 * - Fitts's Law: Large, easy-to-reach targets (44px minimum)
 * - Hick's Law: Context-aware actions reduce choices
 * - Miller's Law: Sections group fields (5-7 per section)
 * - Visual Hierarchy: Clear primary/secondary/tertiary actions
 * - Progressive Disclosure: Insertion zones on hover only
 * - Aesthetic-Usability: Polished transitions and feedback
 *
 * USAGE EXAMPLE:
 * ```tsx
 * import { FormBuilder } from '@/features/FormBuilder/version3';
 *
 * <FormBuilder
 *   initialSections={[
 *     {
 *       id: 'section-1',
 *       name: 'Basic Information',
 *       isExpanded: true,
 *       isSystem: false,
 *       fields: [
 *         {
 *           id: 'field-1',
 *           label: 'Name',
 *           type: 'text',
 *           isRequired: true,
 *         },
 *       ],
 *       order: 0,
 *     },
 *   ]}
 *   onSave={(sections) => console.log('Saved:', sections)}
 *   onCancel={() => console.log('Cancelled')}
 *   showMobilePreview={true}
 * />
 * ```
 *
 * ACCESSIBILITY:
 * - Semantic HTML structure
 * - ARIA labels for icon-only buttons
 * - Keyboard navigation fully supported
 * - Focus indicators visible on all interactive elements
 * - Screen reader friendly announcements
 * - Color contrast meets WCAG AA standards
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile preview hides on screens < 1200px (lg breakpoint)
 * - Form canvas responsive with proper touch targets
 * - Insertion zones adapt to available space
 * - Scrollable areas with custom scrollbar styling
 *
 * PERFORMANCE:
 * - React.memo for Section and Field components
 * - useCallback for event handlers
 * - Efficient drag-drop with dnd-kit
 * - Minimal re-renders via proper state management
 *
 * TECHNICAL STACK:
 * - React 18+ with hooks
 * - Material UI v5 for components and theme
 * - dnd-kit for drag-and-drop
 * - TypeScript for type safety
 * - Styled components for all styling
 *
 * TESTING NOTES:
 * - Test insertion zones appear on hover
 * - Verify no layout shifts when zones appear
 * - Test drag-drop for sections and fields
 * - Verify mobile preview syncs correctly
 * - Test keyboard navigation and accessibility
 * - Verify system sections/fields protected
 * - Test inline editing (Enter to save, Escape to cancel)
 *
 * KNOWN LIMITATIONS:
 * - Insertion zones currently show all at once when enabled
 * - Could be enhanced to show only zones near cursor
 * - Mobile preview is read-only (no editing)
 * - No undo/redo functionality yet
 *
 * FUTURE ENHANCEMENTS:
 * - Smart insertion zone visibility (proximity-based)
 * - Undo/redo functionality
 * - Field templates and presets
 * - Conditional logic builder
 * - Field validation rule builder
 * - Export/import form definitions
 * - Version history and comparison
 */

export { FormBuilder } from './FormBuilder';
export { SectionList } from './SectionList';
export { FieldList } from './FieldList';
export { InsertionOverlay } from './InsertionOverlay';
export { InsertionZone } from './InsertionZone';
export { MobilePreview } from './MobilePreview';

export type {
  FormBuilderProps,
  FormBuilderState,
  SectionData,
  FieldData,
  FieldType,
  InsertionState,
  InsertionZoneId,
  InsertionZoneType,
  InsertionPosition,
  InsertionZoneProps,
  InsertionOverlayProps,
  SectionListProps,
  FieldListProps,
  MobilePreviewProps,
  ValidationRule,
  DragContext,
} from './types';

/**
 * Default export wrapper for version router compatibility
 * The prototype version router expects a component with featureName and versionId props
 */

import React from 'react';
import { FormBuilder } from './FormBuilder';
import { SectionData } from './types';

// Mock initial data for demonstration
const mockInitialSections: SectionData[] = [
  {
    id: 'section-1',
    name: 'System Information',
    isExpanded: true,
    isSystem: true,
    order: 0,
    fields: [
      {
        id: 'field-1',
        label: 'Inspection Title',
        type: 'text',
        isRequired: true,
        isSystemField: false, // Changed to allow editing
      },
      {
        id: 'field-2',
        label: 'Description',
        type: 'textarea',
        isRequired: false,
        isSystemField: false, // Changed to allow editing
      },
    ],
  },
  {
    id: 'section-2',
    name: 'Basic Details',
    isExpanded: true,
    isSystem: false,
    order: 1,
    fields: [
      {
        id: 'field-3',
        label: 'Property Address',
        type: 'text',
        isRequired: true,
        isSystemField: false,
      },
      {
        id: 'field-4',
        label: 'Inspector Name',
        type: 'text',
        isRequired: true,
        isSystemField: false,
      },
    ],
  },
];

interface FormBuilderV3Props {
  featureName: string;
  versionId: string;
}

export default function FormBuilderV3({ featureName, versionId }: FormBuilderV3Props) {
  const handleSave = (sections: SectionData[]) => {
    console.log('Form saved:', sections);
    alert('Form saved! Check console for details.');
  };

  const handleCancel = () => {
    console.log('Form cancelled');
    alert('Form cancelled!');
  };

  return (
    <FormBuilder
      initialSections={mockInitialSections}
      onSave={handleSave}
      onCancel={handleCancel}
      showMobilePreview={true}
    />
  );
}
