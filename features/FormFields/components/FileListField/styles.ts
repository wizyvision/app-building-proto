import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';

export const FileUploadContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  padding: theme.spacing(1, 0),
}));

export const UploadButton = styled(Button)(({ theme }) => ({
  fontSize: '14px',
  fontFamily: theme.typography.fontFamily,
  padding: theme.spacing(1, 2),
  textTransform: 'none',
  borderColor: theme.palette.divider,
  color: theme.palette.text.primary,
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}));

export const FileListContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  minHeight: theme.spacing(4),
}));
