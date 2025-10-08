import { Box, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const WarningContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
}));

const WarningIconStyled = styled(WarningAmberIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: 20,
  marginTop: 2,
}));

/**
 * DataTypeLockWarning Component
 *
 * UX PRINCIPLES APPLIED:
 * - Visual Hierarchy: Primary color (WizyVision red) draws attention to critical warning
 * - Fitts's Law: Prominent placement ensures users see warning before locking data type
 * - Von Restorff Effect: Distinct styling makes warning stand out from surrounding content
 *
 * INTERACTION DESIGN:
 * - Static display (no interactions)
 * - Shows before data type is locked
 * - Hides after data type is locked
 */
export const DataTypeLockWarning = () => {
  return (
    <WarningContainer>
      <WarningIconStyled />
      <Typography variant="body2" color="text.primary">
        Once saved, the data type cannot be changed. You would need to delete and recreate the field to use a different type.
      </Typography>
    </WarningContainer>
  );
};
