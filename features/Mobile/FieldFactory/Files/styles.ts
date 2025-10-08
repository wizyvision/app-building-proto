/**
 * Files Field Styles
 * Mobile file upload/display area with thumbnails
 *
 * Specifications:
 * - Thumbnail grid with square images (matching add button size)
 * - Add file button: same dimensions as thumbnails
 * - Image icon placeholder for photos
 * - 2-3 default thumbnail placeholders
 */

import { styled } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';

export const FilesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.25),
  width: '100%',
}));

export const ThumbnailGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, 40px)',
  gap: theme.spacing(1),
  width: '100%',
}));

export const ThumbnailBox = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '4px',
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: '#f5f5f5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const ThumbnailImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const ThumbnailPlaceholder = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#e0e0e0',
  color: '#9e9e9e',
}));

export const AddFileButton = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '4px',
  backgroundColor: '#ffffff',
  border: '2px dashed #eb4236',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: theme.palette.primary.main,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#fef7f6',
    borderColor: theme.palette.primary.dark,
  },
  '&:active': {
    backgroundColor: '#fde9e8',
  },
}));

export const RemoveButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 2,
  right: 2,
  width: '16px',
  height: '16px',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  color: '#ffffff',
  padding: 0,
  minWidth: '16px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
}));
