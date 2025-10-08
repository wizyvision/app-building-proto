/**
 * Files Field - Mobile optimized
 * Field Type: FILES, FILE_LIST
 * Field Key: {prefix}{n}_{label} (custom field)
 *
 * Features:
 * - Thumbnail grid display (40x40px squares)
 * - Add file button (same size as thumbnails)
 * - Collections icon placeholder for photos
 * - 2-3 default thumbnails shown
 * - Remove button on each thumbnail
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar photo grid pattern (like gallery apps)
 * - Fitts's Law: 40x40px touch targets (standard for mobile)
 * - Visual Hierarchy: Primary add button with red accent
 */

import React, { useState } from 'react';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CollectionsIcon from '@mui/icons-material/Collections';
import CloseIcon from '@mui/icons-material/Close';
import {
  FilesContainer,
  ThumbnailGrid,
  ThumbnailBox,
  ThumbnailImage,
  ThumbnailPlaceholder,
  AddFileButton,
  RemoveButton,
} from './styles';

interface FileItem {
  id: string;
  url?: string;
  name?: string;
}

interface FilesFieldProps {
  field?: any;
  value?: FileItem[];
  onChange?: (value: FileItem[]) => void;
}

// Default placeholder files (2-3 sample files with Collections icon)
const defaultFiles: FileItem[] = [
  { id: 'file-1' }, // No URL, will show Collections icon
  { id: 'file-2' },
  { id: 'file-3' },
];

export const FilesField = ({
  field,
  value: propValue,
  onChange,
}: FilesFieldProps) => {
  const [files, setFiles] = useState<FileItem[]>(propValue || defaultFiles);

  const handleAddFile = () => {
    // TODO: In mobile, open camera/file picker
    // For now, just a placeholder
    console.log('Open file picker or camera');
  };

  const handleRemoveFile = (fileId: string) => {
    const updatedFiles = files.filter(f => f.id !== fileId);
    setFiles(updatedFiles);
    onChange?.(updatedFiles);
  };

  return (
    <FilesContainer>
      <ThumbnailGrid>
        {/* Add File Button */}
        <AddFileButton onClick={handleAddFile}>
          <AddAPhotoIcon sx={{ width: 20, height: 20 }} />
        </AddFileButton>

        {/* Existing Files */}
        {files.map((file) => (
          <ThumbnailBox key={file.id}>
            {file.url ? (
              <>
                <ThumbnailImage src={file.url} alt={file.name || 'File'} />
                <RemoveButton
                  size="small"
                  onClick={() => handleRemoveFile(file.id)}
                  aria-label="Remove file"
                >
                  <CloseIcon sx={{ width: 12, height: 12 }} />
                </RemoveButton>
              </>
            ) : (
              <ThumbnailPlaceholder>
                <CollectionsIcon sx={{ width: 24, height: 24 }} />
              </ThumbnailPlaceholder>
            )}
          </ThumbnailBox>
        ))}
      </ThumbnailGrid>
    </FilesContainer>
  );
};
