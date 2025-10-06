# Mobile FieldFactory - Changelog

## 2025-10-07 - Added SELECT and DOUBLE Fields

### New Field Components

8. **Select Field (Dropdown)**
   - Field Type: `SELECT`
   - Field Key: `{prefix}{n}_{label}` (custom field)
   - Location: `features/Mobile/FieldFactory/Select/`
   - Figma Reference: node-id 327-9887 (>3 options), 327-11029 (≤3 options)
   - Features:
     - Adaptive UI based on number of options
     - **> 3 options**: Native dropdown with Material UI Select
     - **≤ 3 options**: Button group with rounded buttons (8px radius)
     - Background: #fadcd8 (empty state)
     - No border outline (uses box shadow like Status/Privacy)
     - Box shadow: 0px 1.5px 4px 0px rgba(0,0,0,0.25)
     - Red arrow dropdown icon (theme.palette.primary[8])
     - Empty state: 14px font, subtle text
     - Selected state: 16px font
     - Height: 40px (dropdown)
   - Mock Data: `mockSelectOptions` in mockData.ts (4 options: Tyre, Gas, Oil, Brake)
   - Registry Update: Added to fieldRegistry as `SELECT: SelectField`

9. **Number Field**
   - Field Type: `DOUBLE`
   - Field Key: `{prefix}{n}_{label}` (custom field)
   - Location: `features/Mobile/FieldFactory/Number/`
   - Figma Reference: node-id 327-11034
   - Features:
     - Same styling as Text/Paragraph fields (NOT like Status/Privacy)
     - Border: 1px solid #eb4236 (2px bottom when focused)
     - Background: #faf3f3
     - No box shadow
     - Red "123" icon on LEFT side (startAdornment)
     - Custom SVG icon (not Material-UI icon)
     - Number input type (numeric keyboard on mobile)
     - No spinner buttons
     - Height: 40px
   - Registry Update: Added to fieldRegistry as `DOUBLE: NumberField`

### Showcase Updates

Both new fields added to:
- **Mobile Fields** showcase (`features/ComponentShowcase/views/MobileField.tsx`)
- **Mobile Components** showcase (`features/ComponentShowcase/views/MobileComponents.tsx`)

Updated field count: 9 total mobile field components

### Documentation

- Created `MOBILE_FIELDS_CHECKLIST.md` - Comprehensive checklist showing all 9 completed fields with implementation status

---

## 2025-10-06 - Field Implementation Complete

### Completed Field Components

All 7 mobile field components have been implemented following Figma designs and using theme tokens:

1. **BaseField (Shared Component)**
   - Location: `features/Mobile/FieldFactory/BaseField/index.tsx`
   - Purpose: Shared styled TextField for text-based fields
   - Figma Reference: node-id 320-1778
   - Features:
     - Height: 40px
     - Background: #faf3f3
     - Border: 1px solid primary, 2px bottom when focused
     - No box shadow on focus
     - Uses theme spacing and mobileTokens
   - Used by: Description, Paragraph, Text, Title

2. **Description & Paragraph Fields**
   - Multiline text fields with mic and clear icons
   - Icon buttons: 40x40px (adapts to field height)
   - Auto-expanding textarea
   - Shared StyledTextField from BaseField

3. **Text & Title Fields**
   - Single line text fields (no multiline)
   - Same styling as Description/Paragraph
   - Mic and clear icons

4. **Status Field**
   - Location: `features/Mobile/FieldFactory/Status/`
   - Figma Reference: node-id 320-4865
   - Features:
     - Dropdown with dynamic background color based on selected status
     - Empty state: #ffedea background with "Select a status" placeholder
     - Selected state: Uses status.color as background with white text
     - ArrowDropDown icon
     - Styles in styles.ts using theme tokens
   - Mock Data: `mockStatuses` in mockData.ts (6 statuses: Open, Closed, Test, Blue, Green, Red)

5. **Privacy Field**
   - Location: `features/Mobile/FieldFactory/Privacy/`
   - Figma Reference: node-id 320-15644
   - Features:
     - Dropdown with leading PolicyIcon
     - Background: #ffedea
     - Icon color: primary[8]
     - Box shadow: 0px 1.5px 4px 0px rgba(0,0,0,0.25)
     - ArrowDropDown trailing icon (24px)
     - Styles in styles.ts using theme tokens
   - Mock Data: `mockPrivacies` in mockData.ts (3 options: confidential, public, standard)

6. **Signature Field**
   - Location: `features/Mobile/FieldFactory/Signature/`
   - Figma Reference: node-id 322-7480
   - Features:
     - Display/canvas area: 144px height, white background, 1px border
     - Empty state: completely empty white box
     - Displays signature image when value exists
     - Attach button: #fff0ee background with Edit icon (always visible)
     - Remove button: gray text button (only when signature exists)
     - Action buttons aligned right with 12px gap
     - Styles in styles.ts using theme spacing

### Shared Mobile Components

**MobileInputComponents** (`components/shared/MobileInputComponents.tsx`)
- `StyledInputAdornment`: 40px height (adapts to field height)
- `StyledIconButton`: 40x40px with primary color, 8px padding

**Mock Data** (`features/Mobile/FieldFactory/mockData.ts`)
- Status interface and mockStatuses array
- Privacy interface and mockPrivacies array
- FieldValueResponse interface and mockFieldValue

### Theme Tokens

**Mobile Tokens** (`theme/mobileTokens.ts`)
- Field colors: background (#faf3f3), emptyStatus (#ffedea)
- Text colors: primary (#1d1b20), statusEmpty (#271815), statusSelected (#ffffff)
- Field dimensions: height (40px), borderRadius (4px)
- Icon button dimensions: size (40px), iconSize (24px)

**Global Design Tokens** (`theme/designTokens.ts`)
- Added status colors (global for mobile & web):
  - open: #818181
  - closed: #4F546A
  - test: #FF9A43
  - blue: #4384FF
  - green: #20D056
  - red: #D85642

### Styling Standards Applied

All field components now follow these standards:
- ✅ Styles in separate `styles.ts` files
- ✅ Use `theme.spacing()` instead of hardcoded px values
- ✅ Use `mobileTokens` for mobile-specific dimensions and colors
- ✅ Use `designTokens` for global colors (status colors)
- ✅ No inline `sx` props
- ✅ All styled components use `styled()` from `@mui/material/styles`

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
