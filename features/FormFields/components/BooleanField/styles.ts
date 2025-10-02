import { styled } from '@mui/material/styles';
import { Checkbox, Box } from '@mui/material';

export const CheckboxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 0),
}));

export const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  padding: theme.spacing(1),
  color: theme.palette.action.active,
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },
}));
