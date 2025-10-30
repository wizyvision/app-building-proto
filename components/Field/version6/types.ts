import type { FieldData } from '@/features/FormFields';

export interface AdminFieldProps {
  id: string;
  label: string;
  type: string;
  isSystemField?: boolean;
  isRequired?: boolean;
  isSelected?: boolean;
  sectionId?: string;
  fieldData?: FieldData;
  onLabelChange?: (newLabel: string) => void;
  onEdit?: () => void;
  onMenuClick?: () => void;
}
