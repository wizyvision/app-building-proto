import {
  AssignmentOutlined,
  Business,
  FormatAlignLeft,
  Event,
  FilterCenterFocus,
  LocalOfferOutlined,
  ShortText,
  LooksOne,
  Check,
  List,
  ArrowDropDown as ArrowDropdown,
  LocationOn,
  People as PeopleIcon,
  Security as SecurityIcon,
  Group as GroupIcon,
  Draw as DrawIcon,
  AccessTime,
  BurstMode,
  ViewList as ViewListIcon,
  AddLink,
  DateRange,
  LocalOffer as LocalOfferIcon,
  RadioButtonChecked,
  ViewModule,
  AttachFile,
} from '@mui/icons-material';

export const iconMapping = {
  // System Fields
  REF_ID: AssignmentOutlined,
  TYPE_ID: Business,
  STATUS_ID: ArrowDropdown, // Status → Select icon
  PRIVACY_ID: ArrowDropdown, // Privacy → Select icon
  FILES: AttachFile, // Files → AttachFile icon
  TAGS: LocalOfferOutlined,
  WATCHERS: GroupIcon,
  SITE: LocationOn,
  MEM_ID: PeopleIcon,

  // Custom Fields
  TEXT: FormatAlignLeft,
  STRING: ShortText,
  DATE: Event,
  TIME: AccessTime,
  DOUBLE: LooksOne,
  BOOLEAN: Check,
  CHECKBOX: List,
  SELECT: ArrowDropdown,
  LOCATION: LocationOn,
  PEOPLE: PeopleIcon,
  PEOPLE_LIST: GroupIcon,
  SIGNATURE: DrawIcon,
  FILE_LIST: BurstMode,
  MULTIPLE_CHOICE: RadioButtonChecked,
  TAGS_DROPDOWN: LocalOfferIcon,

  // Additional Fields
  OCR: FilterCenterFocus,
  ARIS_CART: ViewListIcon,
  REFERENCE: AddLink,
  SCHEDULE: DateRange,
  SECTION: ViewModule,
};
