export interface Intl {
  [key: string]: string;
}

export interface SelectOption {
  id: number;
  value: string;
  label: string;
  color?: string;
}

export interface Logic {
  [key: string]: any;
}

export interface LookupSettings {
  [key: string]: any;
}

export interface AttachmentSettings {
  [key: string]: any;
}

export interface SettingsClass {
  [key: string]: any;
}

export interface Validations {
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  [key: string]: any;
}

export interface LinkableAppMapping {
  [key: string]: any;
}

export type DefaultValue = string | number | boolean | null;

export interface Status {
  // fields attached on Case
  id: number;
  color: string;
  intl?: Intl;
  name: string;
  displayName?: string;

  // complete Status fields
  createdAt: Date;
  deletedAt: null;
  memId: number;
  position: number;
  postTypeId: number;
  systemId: string;
  type: string;
  updatedAt: Date;
}

export interface FieldData {
  id: number;
  creatorId: number;
  dataType: string;
  description: null | string;
  descriptionIntl: Intl | null;
  helper: null;
  helperTextIntl: null;
  intl?: Intl;
  iconName: null | string;
  instructionText: null | string;
  isRequired: boolean;
  isSystem: boolean;
  isVisible: boolean;
  key: string;
  label: string;
  logics: Logic[] | null;
  lookupSettings: LookupSettings | null;
  position: number;
  readOnly: boolean;
  selectOptions: SelectOption[] | null;
  defaultValue: DefaultValue | null;
  attachmentSettings: AttachmentSettings | null;
  remarkSettings: AttachmentSettings | null;
  settings: SettingsClass | null;
  shownInList: boolean;
  typeId: number;
  validations: Validations | null;
  layoutWebFormPosition: number | null;
  layoutMobileFormPosition: number | null;
  layoutCaseListPosition: number | null;
  layoutPrintPosition: number | null;
  layoutCaseCardVisibility: boolean;
  linkableAppIds: number[] | null;
  linkableAppMapping: LinkableAppMapping | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  statuses?: Status[];
}

export interface FieldPreviewProps {
  field: FieldData;
}

export type DataType =
  // System Fields
  | 'FILES'
  | 'STATUS_ID'
  | 'TAGS'
  | 'PRIVACY_ID'
  | 'WATCHERS'
  | 'SITE'
  | 'MEM_ID'
  | 'REF_ID'
  | 'TYPE_ID'
  // Custom Fields
  | 'STRING'
  | 'TEXT'
  | 'BOOLEAN'
  | 'CHECKBOX'
  | 'SELECT'
  | 'DATE'
  | 'TIME'
  | 'DOUBLE'
  | 'LOCATION'
  | 'PEOPLE'
  | 'PEOPLE_LIST'
  | 'SIGNATURE'
  | 'FILE_LIST'
  | 'MULTIPLE_CHOICE'
  | 'TAGS_DROPDOWN';
