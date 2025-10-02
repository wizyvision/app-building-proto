import type { FieldData } from '../../features/FormFields';

export interface FieldProps {
  id: string;
  label: string;
  type: string;
  isSystemField?: boolean;
  fieldData?: FieldData;
  onLabelChange?: (newLabel: string) => void;
  onEdit?: () => void;
  onMenuClick?: () => void;
}
