import { useState, useEffect } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormBuilderContext } from '@/features/FormBuilder/version3/context/FormBuilderContext';
import { useFieldConfiguration } from './hooks/useFieldConfiguration';
import { useFieldMutation } from './hooks/useFieldMutation';
import { PropertySection } from './components/PropertySection';
import { DataTypeLockModal } from './components/DataTypeLockModal';
import { GeneralSettings } from './sections/GeneralSettings';
import {
  StyledDrawer,
  DrawerHeader,
  DrawerContent,
  FieldNameHeader,
  CloseButton,
  DeleteButton,
} from './styles';

interface FieldConfigurationProps {
  fieldId: string;
  onClose: () => void;
}

/**
 * FieldConfiguration Component - Version 1
 *
 * VERSION INFO:
 * - Version: 1
 * - Created: 2025-10-08
 * - Phase: 1 (General Settings only)
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Drawer pattern is familiar from modern form builders (Google Forms, Typeform, Airtable)
 * - Fitts's Law: 44x44px touch targets for icon buttons in header
 * - Visual Hierarchy: Primary actions prominent (Save Data Type), secondary actions subtle (Delete)
 * - Progressive Disclosure: Collapsible sections reduce cognitive load, advanced settings hidden until expanded
 * - Hick's Law: Limited primary actions per section (1-3 max)
 * - Miller's Law: Form fields grouped into logical chunks within accordion sections
 *
 * INTERACTION DESIGN:
 * - Drawer slides in from right (200ms transition)
 * - ESC key closes drawer
 * - Backdrop click closes drawer
 * - Real-time preview updates via react-hook-form watch()
 * - Data type locking requires confirmation modal
 * - Delete button requires confirmation (future)
 *
 * FEATURES (Phase 1):
 * - Label editing (required field)
 * - Field key (auto-generated, locked for system fields)
 * - Data type selection with lock flow
 * - Description (200 char max with counter)
 * - Field visibility toggles (Mobile, List Columns)
 * - Media attachments toggle
 * - Remarks toggle
 * - Required field toggle
 * - Unique values toggle (TITLE field only)
 *
 * FUTURE PHASES:
 * - Phase 2: Advanced Settings, Logic, Validation Rules, Scanner Settings
 * - Phase 3: Select Options, Default Values
 * - Phase 4: Field Actions, Formula, Data Lookup
 */
export const FieldConfiguration = ({ fieldId, onClose }: FieldConfigurationProps) => {
  const { items, onFieldUpdate, onLockDataType } = useFormBuilderContext();
  const [lockModalOpen, setLockModalOpen] = useState(false);

  // Get all fields from items (new nested structure)
  const allFields = items.flatMap((item) => {
    if (item.type === 'SECTION') {
      return item.children ?? [];
    } else {
      // Standalone field
      return [item];
    }
  });

  // Find the current field
  const field = allFields.find((f) => f.id === fieldId);

  // App ID for key generation (e.g., c5_fieldname)
  // In production, this would come from the app context
  const appId = 5;

  const { formMethods } = useFieldConfiguration(field || null);
  const { lockDataType, isPending } = useFieldMutation();

  const handleLockDataType = async () => {
    setLockModalOpen(true);
  };

  const handleConfirmLock = async () => {
    await lockDataType(fieldId);
    await onLockDataType(fieldId);
    setLockModalOpen(false);
  };

  const handleClose = () => {
    onClose();
  };

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (!field) return null;

  return (
    <>
      <StyledDrawer
        anchor="right"
        open={!!fieldId}
        onClose={handleClose}
        ModalProps={{
          keepMounted: false,
        }}
      >
        {/* Header */}
        <DrawerHeader>
          <Box flex={1}>
            <FieldNameHeader variant="h6">
              {field.label || 'Untitled Field'}
            </FieldNameHeader>
            <Chip label={field.type} size="small" sx={{ mt: 0.5 }} />
          </Box>
          <Box display="flex" gap={1}>
            <DeleteButton size="small">
              <DeleteIcon />
            </DeleteButton>
            <CloseButton size="small" onClick={handleClose}>
              <CloseIcon />
            </CloseButton>
          </Box>
        </DrawerHeader>

        {/* Content */}
        <DrawerContent>
          {/* General Settings */}
          <PropertySection title="General Settings" defaultExpanded>
            <GeneralSettings
              formMethods={formMethods}
              onLockDataType={handleLockDataType}
              onFieldUpdate={onFieldUpdate}
              fieldId={fieldId}
              appId={appId}
            />
          </PropertySection>

          {/* Placeholder sections for Phase 2 */}
          <PropertySection title="Advanced Settings" defaultExpanded={false}>
            <Typography variant="body2" color="text.secondary">
              Coming in Phase 2: Field Actions, Formula, Data Lookup
            </Typography>
          </PropertySection>

          <PropertySection title="Logic" defaultExpanded={false}>
            <Typography variant="body2" color="text.secondary">
              Coming in Phase 2: Conditional Visibility
            </Typography>
          </PropertySection>

          <PropertySection title="Validation Rules" defaultExpanded={false}>
            <Typography variant="body2" color="text.secondary">
              Coming in Phase 2: Pattern, Length Validation
            </Typography>
          </PropertySection>

          <PropertySection title="Scanner Settings" defaultExpanded={false}>
            <Typography variant="body2" color="text.secondary">
              Coming in Phase 2: Scanner Type, Data Extraction
            </Typography>
          </PropertySection>
        </DrawerContent>
      </StyledDrawer>

      {/* Data Type Lock Modal */}
      <DataTypeLockModal
        open={lockModalOpen}
        fieldType={field.type || ''}
        onClose={() => setLockModalOpen(false)}
        onConfirm={handleConfirmLock}
      />
    </>
  );
};
