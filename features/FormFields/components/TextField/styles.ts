import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    fontSize: '14px',
    fontFamily: theme.typography.fontFamily,
    lineHeight: '22px',
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1),
  },
}));
