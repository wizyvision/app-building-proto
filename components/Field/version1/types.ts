export interface FieldProps {
  id: string;
  label: string;
  type: string;
  sectionId: string;
  onEditLabel: (newLabel: string) => void;
  onEdit: () => void;
  onMenuOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
