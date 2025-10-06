/**
 * Mock Data for Mobile Field Factory
 *
 * This file contains mock data structures matching the API responses
 * for field configurations and field values.
 */

// Status type definition
export interface Status {
  id: number;
  color: string;
  intl: {
    en: string;
    fr?: string;
  };
  memId: number;
  name: string;
  type: 'SYSTEM' | 'CUSTOM';
  position: number;
  postTypeId: number;
  systemId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// Mock statuses array
export const mockStatuses: Status[] = [
  {
    id: 41,
    color: '#818181',
    intl: {
      en: 'Open',
      fr: 'Ouvert',
    },
    memId: 3,
    name: 'Open',
    type: 'SYSTEM',
    position: 100,
    postTypeId: 15,
    systemId: 'OPEN',
    createdAt: '2025-09-03T04:12:33.935Z',
    updatedAt: '2025-10-06T12:09:20.805Z',
    deletedAt: null,
  },
  {
    id: 42,
    color: '#4F546A',
    intl: {
      en: 'Closed',
      fr: 'Fermé',
    },
    memId: 3,
    name: 'Closed',
    type: 'SYSTEM',
    position: 200,
    postTypeId: 15,
    systemId: 'CLOSED',
    createdAt: '2025-09-03T04:12:33.935Z',
    updatedAt: '2025-10-06T12:09:20.809Z',
    deletedAt: null,
  },
  {
    id: 43,
    color: '#FF9A43',
    intl: {
      en: 'Test',
    },
    memId: 3,
    name: 'Test',
    type: 'CUSTOM',
    position: 300,
    postTypeId: 15,
    systemId: null,
    createdAt: '2025-10-06T12:09:20.792Z',
    updatedAt: '2025-10-06T12:09:20.792Z',
    deletedAt: null,
  },
  {
    id: 44,
    color: '#4384FF',
    intl: {
      en: 'Blue',
    },
    memId: 3,
    name: 'Blue',
    type: 'CUSTOM',
    position: 400,
    postTypeId: 15,
    systemId: null,
    createdAt: '2025-10-06T12:09:20.792Z',
    updatedAt: '2025-10-06T12:09:20.792Z',
    deletedAt: null,
  },
  {
    id: 45,
    color: '#20D056',
    intl: {
      en: 'Green',
    },
    memId: 3,
    name: 'Green',
    type: 'CUSTOM',
    position: 500,
    postTypeId: 15,
    systemId: null,
    createdAt: '2025-10-06T12:09:20.792Z',
    updatedAt: '2025-10-06T12:09:20.792Z',
    deletedAt: null,
  },
  {
    id: 46,
    color: '#D85642',
    intl: {
      en: 'Red',
    },
    memId: 3,
    name: 'Red',
    type: 'CUSTOM',
    position: 600,
    postTypeId: 15,
    systemId: null,
    createdAt: '2025-10-06T12:09:20.792Z',
    updatedAt: '2025-10-06T12:09:20.792Z',
    deletedAt: null,
  },
];

// Field value response structure
export interface FieldValueResponse {
  id: string;
  description: string;
  memId: number;
  lastUpdaterId: number;
  postRef: string;
  privacyId: number;
  statusId: number;
  title: string;
  typeId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  privacyName: string;
  status: {
    id: number;
    color: string;
    intl: {
      en: string;
      fr?: string;
    };
    name: string;
  };
  type: {
    id: number;
    color: string;
    name: string;
    intl: {
      en: string;
    };
  };
  signedThumbnailUrl: string;
}

// Privacy type definition
export interface Privacy {
  id: number;
  createdAt: string;
  creatorId: number;
  deletedAt: string | null;
  description: string | null;
  displayName: string;
  isActive: boolean;
  isDefault: boolean;
  name: string;
  updatedAt: string;
}

// Mock privacies array
export const mockPrivacies: Privacy[] = [
  {
    id: 1,
    createdAt: '2025-04-25T08:13:42.609Z',
    creatorId: 1,
    deletedAt: null,
    description: null,
    displayName: 'confidential',
    isActive: true,
    isDefault: true,
    name: 'confidential',
    updatedAt: '2025-04-25T08:13:42.609Z',
  },
  {
    id: 2,
    createdAt: '2025-04-25T08:13:42.609Z',
    creatorId: 1,
    deletedAt: null,
    description: null,
    displayName: 'public',
    isActive: true,
    isDefault: true,
    name: 'public',
    updatedAt: '2025-04-25T08:13:42.609Z',
  },
  {
    id: 3,
    createdAt: '2025-04-25T08:13:42.609Z',
    creatorId: 1,
    deletedAt: null,
    description: null,
    displayName: 'standard',
    isActive: true,
    isDefault: true,
    name: 'standard',
    updatedAt: '2025-04-25T08:13:42.609Z',
  },
];

// SelectOption type definition
export interface SelectOption {
  id: string;
  value: string;
  intl: {
    en: string;
    [key: string]: string;
  };
  position: number;
}

// Mock select options
export const mockSelectOptions: SelectOption[] = [
  {
    id: '1',
    value: 'Tyre',
    intl: {
      en: 'Tyre',
    },
    position: 100,
  },
  {
    id: '2',
    value: 'Gas',
    intl: {
      en: 'Gas',
    },
    position: 200,
  },
  {
    id: '3',
    value: 'Oil',
    intl: {
      en: 'Oil',
    },
    position: 300,
  },
  {
    id: '4',
    value: 'Brake',
    intl: {
      en: 'Brake',
    },
    position: 400,
  },
];

// Mock field value response
export const mockFieldValue: FieldValueResponse = {
  id: '68cfe2df-462b-4afd-97fa-0063c41cc29e',
  description: '',
  memId: 3,
  lastUpdaterId: 3,
  postRef: 'WV-27',
  privacyId: 3,
  statusId: 41,
  title: 'huh',
  typeId: 15,
  createdAt: '2025-09-19T09:27:46.086Z',
  updatedAt: '2025-10-06T11:08:09.410Z',
  deletedAt: null,
  privacyName: 'standard',
  status: {
    id: 41,
    color: '#818181',
    intl: {
      en: 'Open',
      fr: 'Ouvert',
    },
    name: 'Open',
  },
  type: {
    id: 15,
    color: '#818181',
    name: 'Custom App',
    intl: {
      en: 'Custom App',
    },
  },
  signedThumbnailUrl:
    'https://cdn.eu.wizyvision.app/wizdam-accounts/qatestkoliv2%2Fthumbnails%2F1.jpg-1.jpg?Expires=1759838540952&KeyName=cdn-secret-1&Signature=tyFaNEUxQ8PyQpKWzmRRoXZUMrY',
};
