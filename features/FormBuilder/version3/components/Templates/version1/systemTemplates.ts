/**
 * System Templates - Pre-configured field templates
 *
 * Uses DataTypes constants and existing theme status colors
 */

import { DataTypes } from '@/constants/dataTypes';
import { SystemKeys } from '@/constants/systemKeys';
import { designTokens } from '@/theme/designTokens';
import type { FieldTemplate } from './types';

/**
 * Global Status Colors from theme
 * Reuse existing status colors instead of creating new constants
 */
const STATUS_COLORS = designTokens.colors.status;

export const systemTemplates: FieldTemplate[] = [
  // Template 1: Basic Inspection
  {
    id: 'system-basic-inspection',
    name: 'Basic Inspection',
    description: 'Standard inspection form fields',
    icon: '📋',
    category: 'inspection',
    author: 'system',
    fields: [
      {
        dataType: DataTypes.STRING,
        key: 'c1_inspectorname',
        label: 'Inspector Name',
        isRequired: true,
        isSystem: false,
        isVisible: true,
        readOnly: false,
        shownInList: true,
        placeholder: 'Enter inspector name',
        description: 'Name of person conducting inspection',
        validations: {
          type: 'required',
          errorMessage: 'Inspector name is required',
          details: {
            condition: 'required',
          },
        },
      },
      {
        dataType: DataTypes.DATE,
        key: SystemKeys.CREATED_AT,
        label: 'Inspection Date',
        isRequired: true,
        isSystem: true,
        isVisible: true,
        readOnly: false,
        shownInList: true,
        description: 'Date when inspection was conducted',
      },
      {
        dataType: DataTypes.LOCATION,
        key: 'c2_location',
        label: 'Location',
        isRequired: true,
        isSystem: false,
        isVisible: true,
        readOnly: false,
        shownInList: true,
        description: 'Location where inspection took place',
      },
      {
        dataType: DataTypes.STATUS_ID,
        key: SystemKeys.STATUS,
        label: 'Status',
        isRequired: true,
        isSystem: true,
        isVisible: true,
        readOnly: false,
        shownInList: true,
        description: 'Current status of the inspection',
        statuses: [
          {
            id: 1,
            color: STATUS_COLORS.green,
            name: 'Passed',
            displayName: 'Passed',
            position: 1,
            systemId: 'passed',
            type: 'status',
          },
          {
            id: 2,
            color: STATUS_COLORS.red,
            name: 'Failed',
            displayName: 'Failed',
            position: 2,
            systemId: 'failed',
            type: 'status',
          },
          {
            id: 3,
            color: STATUS_COLORS.test,
            name: 'Pending',
            displayName: 'Pending Review',
            position: 3,
            systemId: 'pending',
            type: 'status',
          },
        ],
      },
    ],
    metadata: {
      createdAt: new Date('2025-10-01'),
      updatedAt: new Date('2025-10-01'),
      usageCount: 0,
      tags: ['inspection', 'basic'],
    },
  },

  // Template 2: Safety Checklist
  {
    id: 'system-safety-checklist',
    name: 'Safety Checklist',
    description: 'PPE and safety compliance fields',
    icon: '🛡️',
    category: 'safety',
    author: 'system',
    fields: [
      {
        dataType: DataTypes.SELECT,
        key: 'c1_ppeworn',
        label: 'PPE Worn?',
        isRequired: true,
        isSystem: false,
        isVisible: true,
        readOnly: false,
        shownInList: true,
        selectOptions: [
          { id: 'yes', value: 'Yes', position: 1 },
          { id: 'no', value: 'No', position: 2 },
        ],
      },
      {
        dataType: DataTypes.SELECT,
        key: 'c2_areasecured',
        label: 'Area Secured?',
        isRequired: true,
        isSystem: false,
        isVisible: true,
        readOnly: false,
        shownInList: true,
        selectOptions: [
          { id: 'yes', value: 'Yes', position: 1 },
          { id: 'no', value: 'No', position: 2 },
        ],
      },
      {
        dataType: DataTypes.TEXT,
        key: 'c3_safetynotes',
        label: 'Safety Notes',
        isRequired: false,
        isSystem: false,
        isVisible: true,
        readOnly: false,
        shownInList: false,
        placeholder: 'Describe safety concerns',
        description: 'Additional safety observations',
        validations: {
          type: 'maxLength',
          errorMessage: 'Safety notes must be less than 500 characters',
          details: {
            condition: 'maxLength',
            max: 500,
          },
        },
        settings: {
          canAddRemarks: true,
        },
      },
    ],
    metadata: {
      createdAt: new Date('2025-10-01'),
      updatedAt: new Date('2025-10-01'),
      usageCount: 0,
      tags: ['safety', 'checklist', 'ppe'],
    },
  },

  // Template 3: Evidence Collection
  {
    id: 'system-evidence-collection',
    name: 'Evidence Collection',
    description: 'Photo and documentation fields',
    icon: '📷',
    category: 'documentation',
    author: 'system',
    fields: [
      {
        dataType: DataTypes.FILES,
        key: 'c1_photobefore',
        label: 'Photo - Before',
        isRequired: false,
        isSystem: false,
        isVisible: true,
        readOnly: false,
        shownInList: true,
        placeholder: 'Upload before photo',
        description: 'Photo taken before work began',
        settings: {
          canAddRemarks: true,
        },
        attachmentSettings: {
          value: 'image/*',
          condition: 'always',
        },
      },
      {
        dataType: DataTypes.FILE_LIST,
        key: 'c2_photoscurrent',
        label: 'Photos - Current State',
        isRequired: false,
        isSystem: false,
        isVisible: true,
        readOnly: false,
        shownInList: true,
        placeholder: 'Upload multiple photos',
        description: 'Multiple photos of current state',
        settings: {
          canAddRemarks: true,
        },
        attachmentSettings: {
          value: 'image/*',
          condition: 'always',
        },
      },
      {
        dataType: DataTypes.TEXT,
        key: 'c3_evidencenotes',
        label: 'Evidence Notes',
        isRequired: false,
        isSystem: false,
        isVisible: true,
        readOnly: false,
        shownInList: false,
        placeholder: 'Describe evidence and observations',
        description: 'Detailed notes about evidence',
        settings: {
          canAddRemarks: true,
        },
      },
    ],
    metadata: {
      createdAt: new Date('2025-10-01'),
      updatedAt: new Date('2025-10-01'),
      usageCount: 0,
      tags: ['evidence', 'photos', 'documentation'],
    },
  },

  // Template 4: Meter & Gauge Readings
  {
    id: 'system-meter-readings',
    name: 'Meter Readings',
    description: 'Numeric readings with units',
    icon: '📊',
    category: 'inspection',
    author: 'system',
    fields: [
      {
        dataType: DataTypes.DOUBLE,
        key: 'c1_pressure',
        label: 'Pressure Reading (PSI)',
        isRequired: true,
        isSystem: false,
        isVisible: true,
        readOnly: false,
        shownInList: true,
        placeholder: 'Enter pressure value',
        description: 'Current pressure measurement',
        settings: {
          unit: 'PSI',
          threshold: {
            min: 0,
            max: 150,
          },
          isTracked: true,
        },
      },
      {
        dataType: DataTypes.DOUBLE,
        key: 'c2_temperature',
        label: 'Temperature (°F)',
        isRequired: true,
        isSystem: false,
        isVisible: true,
        readOnly: false,
        shownInList: true,
        placeholder: 'Enter temperature',
        description: 'Current temperature measurement',
        settings: {
          unit: '°F',
          threshold: {
            min: -20,
            max: 200,
          },
          isTracked: true,
        },
      },
      {
        dataType: DataTypes.TEXT,
        key: 'c3_readingnotes',
        label: 'Reading Notes',
        isRequired: false,
        isSystem: false,
        isVisible: true,
        readOnly: false,
        shownInList: false,
        placeholder: 'Additional notes about readings',
        description: 'Notes about meter readings',
      },
    ],
    metadata: {
      createdAt: new Date('2025-10-01'),
      updatedAt: new Date('2025-10-01'),
      usageCount: 0,
      tags: ['meters', 'readings', 'measurements'],
    },
  },
];
