import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
  Button,
  Stack,
  Box,
  Chip,
  InputAdornment,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Controller, UseFormReturn } from 'react-hook-form';
import { DataTypes } from '@/constants/dataTypes';
import { SystemKeys } from '@/constants/systemKeys';
import { FieldData } from '../types';
import { DataTypeLockWarning } from '../components/DataTypeLockWarning';
import { useState } from 'react';
import { FieldType } from '@/features/FormBuilder/version3/types';

// System field types (not available for custom fields)
const systemFieldTypes = [
  DataTypes.STATUS_ID,
  DataTypes.FILES,
  DataTypes.TAGS,
  DataTypes.PRIVACY_ID,
  DataTypes.WATCHERS,
  DataTypes.SITE,
  DataTypes.MEM_ID,
  DataTypes.REF_ID,
  DataTypes.TYPE_ID,
];

// Custom field types (available for user creation)
const customFieldTypes = [
  DataTypes.STRING,
  DataTypes.TEXT,
  DataTypes.BOOLEAN,
  DataTypes.CHECKBOX,
  DataTypes.SELECT,
  DataTypes.DATE,
  DataTypes.TIME,
  DataTypes.DOUBLE,
  DataTypes.LOCATION,
  DataTypes.PEOPLE,
  DataTypes.PEOPLE_LIST,
  DataTypes.SIGNATURE,
  DataTypes.FILE_LIST,
  DataTypes.MULTIPLE_CHOICE,
  DataTypes.TAGS_DROPDOWN,
];

// Human-readable labels for data types
const dataTypeLabels: Record<string, string> = {
  STATUS_ID: 'Status',
  FILES: 'Files',
  TAGS: 'Tags',
  PRIVACY_ID: 'Privacy',
  WATCHERS: 'Watchers',
  SITE: 'Site',
  MEM_ID: 'Member',
  REF_ID: 'Reference',
  TYPE_ID: 'Type',
  STRING: 'Text',
  TEXT: 'Paragraph',
  BOOLEAN: 'Yes/No',
  CHECKBOX: 'Checkbox',
  SELECT: 'Dropdown',
  DATE: 'Date',
  TIME: 'Time',
  DOUBLE: 'Number',
  LOCATION: 'Location',
  PEOPLE: 'Person',
  PEOPLE_LIST: 'People List',
  SIGNATURE: 'Signature',
  FILE_LIST: 'Files',
  MULTIPLE_CHOICE: 'Multiple Choice',
  TAGS_DROPDOWN: 'Tags Dropdown',
};

// Mapping from DataTypes to SystemKeys (for system fields)
const dataTypeToSystemKey: Record<string, string> = {
  [DataTypes.STATUS_ID]: SystemKeys.STATUS,
  [DataTypes.FILES]: 'files',
  [DataTypes.TAGS]: SystemKeys.TAGS,
  [DataTypes.PRIVACY_ID]: SystemKeys.PRIVACY,
  [DataTypes.WATCHERS]: SystemKeys.WATCHERS,
  [DataTypes.SITE]: SystemKeys.SITE,
  [DataTypes.MEM_ID]: SystemKeys.MEMBER,
  [DataTypes.REF_ID]: SystemKeys.REFERENCE,
  [DataTypes.TYPE_ID]: SystemKeys.TYPE,
  [DataTypes.DATE]: SystemKeys.CREATED_AT, // Default date field
};

interface GeneralSettingsProps {
  formMethods: UseFormReturn<FieldData>;
  onLockDataType: () => void;
  onFieldUpdate: (fieldId: string, updates: Partial<FieldData>) => void;
  fieldId: string;
  appId: number;
}

/**
 * GeneralSettings Section
 *
 * UX PRINCIPLES APPLIED:
 * - Miller's Law: Form fields grouped into logical chunks (Label/Key, Data Type, Description)
 * - Visual Hierarchy: Required fields marked with *, lock icon for immutable fields
 * - Progressive Disclosure: "Save Data Type" button only appears for new custom fields
 * - Fitts's Law: Full-width form controls are easy to interact with
 *
 * INTERACTION DESIGN:
 * - Label auto-generates field key (if not system field)
 * - System fields: Data type disabled, no warning banner, no save button
 * - Custom fields: Data type shows warning banner and save button if not locked
 * - Key field format: System fields show camelCase, custom fields show "c{count}_{key}"
 * - Description shows character count (200 max)
 */
export const GeneralSettings = ({ formMethods, onLockDataType, onFieldUpdate, fieldId, appId }: GeneralSettingsProps) => {
  const { control, watch } = formMethods;
  const fieldType = watch('type' as any);
  const dataTypeLocked = watch('dataTypeLocked' as any);
  const isSystemField = watch('isSystemField' as any);
  const description = watch('helpText' as any) || '';

  const [showLockButton, setShowLockButton] = useState(false);

  return (
    <Stack spacing={3}>
      {/* Label */}
      <Controller
        name="label"
        control={control}
        rules={{ required: 'Label is required' }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Label"
            required
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            fullWidth
            onBlur={(e) => {
              field.onBlur();
              onFieldUpdate(fieldId, { label: e.target.value });
            }}
          />
        )}
      />

      {/* Combined Key Field */}
      <Controller
        name="key"
        control={control}
        render={({ field }) => {
          let displayValue = field.value || '';

          if (isSystemField) {
            // For system fields, use the mapping from DataTypes to SystemKeys
            const currentType = fieldType as string;
            displayValue = dataTypeToSystemKey[currentType] || field.value || 'systemField';
          } else if (!displayValue) {
            // Auto-generate key from label for custom fields
            const labelKey = watch('label' as any)?.toLowerCase().replace(/\s+/g, '') || 'field';
            displayValue = labelKey;
          }

          return (
            <TextField
              {...field}
              value={displayValue}
              label="Key"
              disabled={isSystemField || dataTypeLocked}
              fullWidth
              helperText="Reference for creating/updating this field"
              InputProps={{
                startAdornment: !isSystemField ? (
                  <InputAdornment position="start">
                    <Box
                      component="span"
                      sx={{
                        color: 'text.disabled',
                        fontWeight: 400,
                        fontSize: '1rem',
                      }}
                    >
                      c{appId}_
                    </Box>
                  </InputAdornment>
                ) : undefined,
              }}
            />
          );
        }}
      />

      {/* Type Field (Combined with dropdown) */}
      <Box>
        <Controller
          name="type"
          control={control}
          render={({ field }) => {
            // Get the human-readable label for the current type
            const currentTypeLabel = dataTypeLabels[field.value] || field.value;

            // Get available types based on whether it's a system field
            const availableTypes = isSystemField ? systemFieldTypes : customFieldTypes;

            return (
              <FormControl fullWidth disabled={dataTypeLocked || isSystemField}>
                <InputLabel>Type</InputLabel>
                <Select
                  {...field}
                  label="Type"
                  onChange={(e) => {
                    field.onChange(e);
                    onFieldUpdate(fieldId, { type: e.target.value as FieldType });
                    if (!isSystemField) {
                      setShowLockButton(true);
                    }
                  }}
                  renderValue={() => currentTypeLabel}
                >
                  {availableTypes.map((type) => {
                    const label = dataTypeLabels[type] || type;
                    return (
                      <MenuItem key={type} value={type}>
                        {label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            );
          }}
        />

        {/* Warning Banner - Only for custom fields */}
        {!isSystemField && !dataTypeLocked && fieldType && (
          <Box mt={2}>
            <DataTypeLockWarning />
          </Box>
        )}

        {/* Save Data Type Button - Only for custom fields */}
        {!isSystemField && !dataTypeLocked && showLockButton && fieldType && (
          <Box mt={2}>
            <Button variant="contained" color="primary" fullWidth onClick={onLockDataType}>
              Save Data Type
            </Button>
          </Box>
        )}

        {/* Locked Indicator - Only for custom fields */}
        {!isSystemField && dataTypeLocked && (
          <Box mt={1}>
            <Chip
              label="Data type locked"
              size="small"
              color="success"
              icon={<LockIcon />}
            />
          </Box>
        )}
      </Box>

      {/* Description */}
      <Controller
        name="helpText"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            multiline
            rows={3}
            fullWidth
            inputProps={{ maxLength: 200 }}
            helperText={`${description.length}/200 characters`}
            onBlur={(e) => {
              field.onBlur();
              onFieldUpdate(fieldId, { helpText: e.target.value });
            }}
          />
        )}
      />

      {/* Required Field */}
      <Controller
        name="isRequired"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Switch
                {...field}
                checked={field.value || false}
                onChange={(e) => {
                  field.onChange(e);
                  onFieldUpdate(fieldId, { isRequired: e.target.checked });
                }}
              />
            }
            label="Required Field"
          />
        )}
      />
    </Stack>
  );
};
