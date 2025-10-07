/**
 * MobileFormPreview Component Types
 *
 * Defines the interface for rendering form sections and fields in mobile preview mode
 */

import { FieldData } from '@/features/FormFields';

export interface SectionData {
  id: string;
  name: string;
  isExpanded: boolean;
  isSystem: boolean;
  fields: FieldData[];
}

export interface MobileFormPreviewProps {
  /** Array of sections containing fields to display */
  sections: SectionData[];
  /** Optional standalone fields not in any section */
  standaloneFields?: FieldData[];
}