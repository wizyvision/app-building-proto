import { styled } from '@mui/material/styles';
import { Select } from '@mui/material';

export const StyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiInputBase-input': {
    fontSize: '14px',
    fontFamily: theme.typography.fontFamily,
    lineHeight: '22px',
    padding: theme.spacing(1),
  },
}));
