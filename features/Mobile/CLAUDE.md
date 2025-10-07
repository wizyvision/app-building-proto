# Mobile Feature

## Purpose
Mobile-optimized field rendering and container components designed for touch-based interactions on mobile devices. Provides specialized field types with larger touch targets, gesture support, and mobile-specific UX patterns.

## Key Points

### 1. Mobile-First Design Philosophy
- **Touch targets**: Minimum 44x44px (prefer 48x48px) for all interactive elements
- **One-handed operation**: Key actions positioned for thumb-friendly access
- **Native keyboards**: Optimized input types (email, tel, number, etc.)
- **Gesture support**: Signature field with canvas-based drawing
- **Visual clarity**: Larger fonts, increased spacing, high contrast

### 2. Field Types Supported
**System Fields** (pre-defined, non-editable keys):
- **TitleField**: Main record title (fieldKey: `title`)
- **DescriptionField**: Record description (fieldKey: `description`)
- **StatusField**: Status dropdown (fieldKey: `statusId`)
- **PrivacyField**: Privacy level selector (fieldKey: `privacyId`)

**Custom Fields** (user-created, dynamic keys):
- **TextField**: Single-line text (dataType: `STRING`)
- **ParagraphField**: Multi-line text (dataType: `TEXT`)
- **NumberField**: Numeric input (dataType: `DOUBLE`)
- **SelectField**: Dropdown select (dataType: `SELECT`)
- **SignatureField**: Canvas signature capture (dataType: `SIGNATURE`)

### 3. Component Architecture
```
features/Mobile/
├── FieldContainer/              # Wrapper for all fields
│   ├── index.tsx               # Main container component
│   ├── styles.ts               # Container styling
│   ├── Actions/                # Field action buttons
│   └── Attachments/            # Media/file attachments
│
└── FieldFactory/               # Field type mapping
    ├── index.tsx               # Factory logic
    ├── BaseField/              # Base field wrapper
    ├── Title/                  # System: Title field
    ├── Description/            # System: Description field
    ├── Status/                 # System: Status dropdown
    ├── Privacy/                # System: Privacy selector
    ├── Text/                   # Custom: Text field
    ├── Paragraph/              # Custom: Paragraph field
    ├── Number/                 # Custom: Number field
    ├── Select/                 # Custom: Select field
    └── Signature/              # Custom: Signature field
```

### 4. FieldFactory Pattern
**Purpose**: Maps field data to appropriate mobile component

```typescript
// Field type disambiguation logic:
// - dataType: PRIMARY discriminator (STRING, TEXT, SELECT, etc.)
// - fieldKey: SECONDARY discriminator (title, description, statusId, privacyId)

// Example: STRING dataType
if (dataType === 'STRING') {
  if (fieldKey === 'title') → TitleField
  else → TextField
}

// Example: TEXT dataType
if (dataType === 'TEXT') {
  if (fieldKey === 'description') → DescriptionField
  else → ParagraphField
}
```

### 5. FieldContainer Component
**Purpose**: Unified wrapper for all mobile fields

**Features:**
- Label and description rendering
- Optional action buttons (camera, attach, remarks)
- Attachment display (media, files)
- Consistent padding and spacing
- Touch-friendly layout

**Props:**
```typescript
interface FieldContainerProps {
  label: string;
  description?: string;
  showActions?: boolean;      // Show action buttons
  hasMedia?: boolean;          // Has media attachments
  hasRemarks?: boolean;        // Has remarks/notes
  hasActions?: boolean;        // Show action row
  showAttachments?: boolean;   // Show attachment section
  children: React.ReactNode;   // Field component
}
```

### 6. UX Principles Applied

**Jakob's Law**: Familiar mobile patterns
- Native mobile form field conventions
- Standard input controls (text, select, signature pad)
- Expected touch interactions (tap, swipe, pinch)

**Fitts's Law**: Optimized touch targets
- 48x48px minimum for all interactive elements
- Larger input areas for easier tapping
- Icons sized for touch (24x24px minimum)
- Adequate spacing prevents mis-taps (12-16px between elements)

**Hick's Law**: Simplified choices
- Factory pattern hides field selection logic
- Users see only the appropriate field type
- No overwhelming UI with all field types visible

**Visual Hierarchy**: Clear field structure
- Label: Bold, larger font (guides user attention)
- Input: Prominent, high contrast background
- Description: Subtle, secondary text
- Actions: Tertiary, icon-only buttons

### 7. Mobile-Specific Optimizations

**Input Types:**
- Email fields: `type="email"` (triggers email keyboard)
- Phone fields: `type="tel"` (triggers numeric keyboard with symbols)
- Number fields: `type="number"` (triggers numeric keyboard)

**Touch Interactions:**
- Signature field: Canvas-based drawing with touch events
- Select fields: Native mobile dropdown (better UX than custom)
- Text fields: Auto-focus prevention (avoids unwanted keyboard pop-ups)

**Responsive Sizing:**
- Fields expand to full container width
- Font sizes optimized for mobile readability (16px minimum prevents zoom)
- Line heights increased for better tap accuracy

### 8. Figma Implementation Guidelines

**CRITICAL**: This feature uses EXACT Figma specifications

**From Figma get_code tool:**
```typescript
// Example: TextField specifications
- Background: #faf3f3 (exact hex, not theme token)
- Border: 1px solid #eb4236
- Padding: 4px 0px 4px 16px (exact px values)
- Min height: 48px (touch-friendly)
- Icon container: 48x48px
- Icon size: 24px (MUI default)
```

**Why exact specs?**
- Mobile UI differs from web design system
- Figma designs are pixel-perfect for mobile
- Theme tokens optimized for web, not mobile

### 9. Field Variants

**Empty State:**
- Placeholder text visible
- Font: 16px / 24px / 0.5px letter-spacing
- Subtle text color

**Filled State:**
- Value text visible
- Font: 14px / 20px / 0.25px letter-spacing
- Darker text color

**Focused State:**
- Border changes (e.g., 0px 0px 2px #eb4236)
- Background may lighten
- Cursor visible

**Disabled State:**
- Reduced opacity
- Gray text/background
- No pointer events

### 10. Actions & Attachments

**Action Buttons:**
- Camera icon (48x48px) - Capture photo
- Attach icon (48x48px) - Add file
- Comment icon (48x48px) - Add remarks

**Attachment Display:**
- Thumbnail preview for images
- File name + size for documents
- Remove button for each attachment
- Horizontal scroll for multiple items

## Design Decisions
- **Exact Figma specs**: Mobile UI is pixel-perfect, not theme-based
- **Factory pattern**: Centralizes field type logic
- **FieldContainer wrapper**: Ensures consistency across all fields
- **Native inputs where possible**: Better mobile UX than custom controls
- **Canvas for signature**: Only way to capture handwritten signatures on mobile
- **Touch-first interactions**: All interactions optimized for touch, not mouse

## Related Features
- **Used by**: `FormBuilder` v2 (for mobile preview)
- **Complements**: `FormFields` (provides web field rendering)
- **Used by**: `ComponentShowcase` (for mobile field demos)

## Accessibility
- All fields support touch and keyboard navigation
- ARIA labels on interactive elements
- Focus indicators visible (for keyboard users)
- Screen reader friendly labels and descriptions
- Color contrast meets WCAG AA standards

## Testing Considerations
- Test on actual mobile devices (not just desktop browser responsive mode)
- Verify touch target sizes (minimum 44x44px)
- Test with native keyboards (email, tel, number)
- Validate signature field on touch devices
- Check one-handed reachability for key actions

## Future Enhancements
- Swipe to delete fields
- Voice input for text fields
- Barcode/QR code scanning field type
- GPS location field type
- Offline support with local storage
- Field validation with error messages
- Rich text editing for paragraph fields
