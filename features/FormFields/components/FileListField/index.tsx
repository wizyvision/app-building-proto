import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FieldPreviewProps } from '../../types';
import { FileUploadContainer, UploadButton, FileListContainer } from './styles';

export const FileListField = ({ field }: FieldPreviewProps) => {
  return (
    <FileUploadContainer>
      <UploadButton
        component="label"
        variant="outlined"
        startIcon={<CloudUploadIcon />}
      >
        Upload Files
        <input type="file" hidden multiple />
      </UploadButton>
      <FileListContainer>
        {/* File list will appear here when files are selected */}
      </FileListContainer>
    </FileUploadContainer>
  );
};
