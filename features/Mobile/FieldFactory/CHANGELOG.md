# Mobile FieldFactory - Changelog

## Initial Setup - 2025-10-06

### Field Type Mapping Reference

This document tracks all mobile field components and their mappings to field types and keys.

#### Field Components (7 Total)

1. **Description Field**
   - Field Type: `TEXT`
   - Field Key: `description` (system field)
   - Location: `features/Mobile/FieldFactory/Description/index.tsx`

2. **Paragraph Field**
   - Field Type: `TEXT`
   - Field Key: `{prefix}{n}_{label}` (custom field)
   - Location: `features/Mobile/FieldFactory/Paragraph/index.tsx`

3. **Privacy Field**
   - Field Type: `PRIVACY_ID`
   - Field Key: `privacyId` (system field)
   - Location: `features/Mobile/FieldFactory/Privacy/index.tsx`

4. **Signature Field**
   - Field Type: `SIGNATURE`
   - Field Key: `{prefix}{n}_{label}` (custom field)
   - Location: `features/Mobile/FieldFactory/Signature/index.tsx`

5. **Status Field**
   - Field Type: `STATUS_ID`
   - Field Key: `statusId` (system field)
   - Location: `features/Mobile/FieldFactory/Status/index.tsx`

6. **Text Field**
   - Field Type: `STRING`
   - Field Key: `{prefix}{n}_{label}` (custom field)
   - Location: `features/Mobile/FieldFactory/Text/index.tsx`

7. **Title Field**
   - Field Type: `STRING`
   - Field Key: `title` (system field)
   - Location: `features/Mobile/FieldFactory/Title/index.tsx`

---

### Field Type Summary

- **TEXT**: Description (system), Paragraph (custom)
- **STRING**: Text (custom), Title (system)
- **PRIVACY_ID**: Privacy (system)
- **SIGNATURE**: Signature (custom)
- **STATUS_ID**: Status (system)

---

### System vs Custom Fields

**System Fields** (fixed field keys):
- Description: `description`
- Privacy: `privacyId`
- Status: `statusId`
- Title: `title`

**Custom Fields** (dynamic field keys with pattern `{prefix}{n}_{label}`):
- Paragraph
- Signature
- Text

---

### Field Registry Structure

The `fieldRegistry` in `features/Mobile/FieldFactory/index.tsx` maps field types to components:

```typescript
export const fieldRegistry: Record<string, React.FC<MobileFieldProps>> = {
  STRING: TextField,        // Default for STRING type
  TEXT: DescriptionField,   // Default for TEXT type
  PRIVACY_ID: PrivacyField,
  SIGNATURE: SignatureField,
  STATUS_ID: StatusField,
};
```

The `MobileFieldFactory` component uses additional logic to differentiate between fields with the same type but different field keys:
- `STRING + title` → TitleField
- `STRING + {other}` → TextField
- `TEXT + description` → DescriptionField
- `TEXT + {other}` → ParagraphField

---

### Additional Components

**FieldContainer** (MOVED to `features/Mobile/FieldContainer/`)
- Location: `features/Mobile/FieldContainer/index.tsx`
- Purpose: Mobile field container with label, description, actions, and attachments
- Figma Reference: node-id 318-5690
- Structure:
  - Field Label (required)
  - Field Description (optional - only display if provided)
  - Field from FieldFactory (children)
  - Action Buttons: Media, Remarks, Actions (optional)
  - Attachments container (hidden by default)
- Props:
  - `label: string` - Required field label
  - `description?: string` - Optional field description
  - `children: React.ReactNode` - Field component from FieldFactory
  - `showActions?: boolean` - Show action buttons
  - `hasMedia?: boolean` - Show Media button
  - `hasRemarks?: boolean` - Show Remarks button
  - `hasActions?: boolean` - Show Actions button
  - `showAttachments?: boolean` - Show attachments container

**Actions Component**
- Location: `features/Mobile/FieldFactory/Actions/index.tsx`
- Purpose: Action buttons for mobile fields (Media, Remarks, Actions)
- Figma Reference: node-id 318-5694
- Props:
  - `hasMedia?: boolean` - Show Media button (default: true)
  - `hasRemarks?: boolean` - Show Remarks button (default: true)
  - `hasActions?: boolean` - Show Actions button (default: true)

**Attachments Component**
- Location: `features/Mobile/FieldContainer/Attachments/index.tsx`
- Purpose: Container for field attachments (media, remarks, case links)
- Figma Reference: node-id 318-5698, 318-5699, 318-5700
- Hidden by default, displayed when `show={true}`
- Props:
  - `show?: boolean` - Control visibility (default: false)

---

### ComponentShowcase Integration

Mobile fields added to ComponentShowcase at `features/ComponentShowcase/index.tsx`:
- View name: "Mobile Fields"
- View component: `MobileField` (from `features/ComponentShowcase/views/MobileField.tsx`)
- Displays all 7 mobile field components with their type and key information

---

## Future Additions

When adding new mobile fields:

1. Create new component directory under `features/Mobile/FieldFactory/{FieldName}/`
2. Add component to `fieldRegistry` in `features/Mobile/FieldFactory/index.tsx`
3. Update `MobileFieldFactory` logic if field key disambiguation is needed
4. Add to `MobileField` showcase view
5. Update this CHANGELOG with the new field mapping

### Template for New Field Entry:

```markdown
## [Date] - Added [Field Name] Field

- Field Type: `[TYPE]`
- Field Key: `[key]` ([system/custom] field)
- Location: `features/Mobile/FieldFactory/[FieldName]/index.tsx`
- Registry Update: Added to fieldRegistry as `[TYPE]: [FieldName]Field`
```
