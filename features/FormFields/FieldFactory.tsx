import { FieldData } from './types';
import { TextField } from './components/TextField';
import { ParagraphField } from './components/ParagraphField';
import { SelectField } from './components/SelectField';
import { BooleanField } from './components/BooleanField';
import { DateField } from './components/DateField';
import { FileListField } from './components/FileListField';
import { UnsupportedField } from './components/UnsupportedField';

interface FieldFactoryProps {
  field: FieldData;
}

export const FieldFactory = ({ field }: FieldFactoryProps) => {
  const fieldType = field.dataType.toLowerCase();

  switch (fieldType) {
    // Text-based fields
    case 'text':
    case 'email':
    case 'tel':
    case 'url':
    case 'password':
    case 'string':
      return <TextField field={field} />;

    // Paragraph/multiline text
    case 'textarea':
    case 'paragraph':
      return <ParagraphField field={field} />;

    // Selection fields
    case 'select':
    case 'dropdown':
    case 'status_id':
    case 'privacy_id':
    case 'tags_dropdown':
    case 'multiple_choice':
      return <SelectField field={field} />;

    // Boolean fields
    case 'boolean':
    case 'checkbox':
      return <BooleanField field={field} />;

    // Date/Time fields
    case 'date':
      return <DateField field={field} />;

    case 'time':
    case 'datetime':
      return <DateField field={field} />;

    // File upload fields
    case 'file':
    case 'files':
    case 'file_list':
      return <FileListField field={field} />;

    // Number fields
    case 'number':
    case 'double':
      return <TextField field={field} />;

    // System fields (read-only placeholders for now)
    case 'mem_id':
    case 'ref_id':
    case 'type_id':
      return <TextField field={field} />;

    // Complex fields (to be implemented)
    case 'tags':
    case 'watchers':
    case 'site':
    case 'location':
    case 'people':
    case 'people_list':
    case 'signature':
      return <UnsupportedField field={field} />;

    // Unknown field types
    default:
      return <TextField field={field} />;
  }
};
