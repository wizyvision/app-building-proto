import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

interface DataTypeLockModalProps {
  open: boolean;
  fieldType: string;
  onClose: () => void;
  onConfirm: () => void;
}

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  paddingTop: theme.spacing(2),
}));

/**
 * DataTypeLockModal Component
 *
 * UX PRINCIPLES APPLIED:
 * - Hick's Law: Only 2 clear options (Cancel or Confirm) reduces decision time
 * - Visual Hierarchy: Primary action (Confirm) uses contained button, secondary (Cancel) uses text button
 * - Clarity Trumps Consistency: Critical action requires explicit confirmation to prevent accidental data type locking
 *
 * INTERACTION DESIGN:
 * - Click backdrop: Close modal (cancel action)
 * - ESC key: Close modal (cancel action)
 * - Click Cancel: Close modal
 * - Click Confirm: Lock data type and close modal
 * - Focus trap: Tab cycles through buttons only
 */
export const DataTypeLockModal = ({ open, fieldType, onClose, onConfirm }: DataTypeLockModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Lock Field Type as {fieldType}?</DialogTitle>
      <StyledDialogContent>
        <Typography variant="body1" paragraph>
          Once saved, this field's data type cannot be changed.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          You would need to delete and recreate the field to use a different type.
        </Typography>
      </StyledDialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} variant="contained" color="primary">
          Confirm & Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
