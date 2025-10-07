# WebForm Feature

## Purpose
Web-optimized form rendering and submission feature for desktop and tablet devices. Provides a complete form experience with validation, multi-step workflows, and responsive layouts optimized for mouse and keyboard interactions.

## Key Points

### 1. Web-First Design Philosophy
- **Mouse & keyboard**: Optimized for desktop interactions (hover, click, keyboard shortcuts)
- **Larger screens**: Utilizes horizontal space, multi-column layouts
- **Hover affordances**: Rich hover states, tooltips, contextual menus
- **Keyboard shortcuts**: Power-user features (Tab navigation, Enter to submit, Escape to cancel)
- **Responsive**: Adapts to tablet and desktop sizes (not mobile-first)

### 2. Component Architecture
```
features/WebForm/
├── index.tsx                   # Main form component/exports
├── styles.ts                   # Form-specific styling
├── types.ts                    # Form data types
└── components/                 # Sub-components (if needed)
    ├── FormHeader/
    ├── FormSection/
    ├── FormFooter/
    └── ValidationSummary/
```

### 3. Form Structure
```typescript
interface WebFormData {
  id: string;
  title: string;
  description?: string;
  sections: FormSection[];
  settings?: FormSettings;
}

interface FormSection {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  conditionalLogic?: ConditionalRule[];
}

interface FormField {
  id: string;
  type: string;
  dataType: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: ValidationRule[];
  // ... other properties
}
```

### 4. UX Principles Applied

**Jakob's Law**: Familiar web form patterns
- Standard form layouts (labels above inputs, left-aligned)
- Expected behaviors (Tab to next field, Enter to submit)
- Progress indicators for multi-step forms
- Breadcrumb navigation for complex forms

**Fitts's Law**: Optimized for mouse/trackpad
- Buttons sized for easy clicking (min 36x36px)
- Adequate spacing between interactive elements (8-12px)
- Labels are clickable to focus inputs
- Hover states provide visual feedback

**Hick's Law**: Simplified field selection
- Fields grouped into logical sections
- Progressive disclosure (show advanced options only when needed)
- Multi-step forms break up long workflows (reduces cognitive load)

**Visual Hierarchy**: Clear form structure
- Form title: h1 (largest, most prominent)
- Section titles: h2 (secondary emphasis)
- Field labels: body1 bold (tertiary emphasis)
- Help text: body2 (subtle, secondary color)

**Miller's Law**: Information chunking
- Sections contain 5-7 fields maximum (ideal chunk size)
- Long forms broken into steps (5-7 fields per step)
- Related fields grouped visually (cards, borders)

### 5. Validation & Error Handling

**Real-time Validation:**
- On blur: Validate field when user leaves it
- On change: Validate as user types (for complex rules)
- On submit: Full form validation before submission

**Error Display:**
- Inline errors: Red text below field
- Error summary: Top of form (lists all errors)
- Focus management: Auto-focus first error field

**Validation Rules:**
- Required fields
- Format validation (email, phone, URL)
- Range validation (min/max for numbers/dates)
- Custom regex patterns
- Cross-field validation (e.g., "End date after start date")

### 6. Multi-Step Forms

**Step Navigation:**
- Breadcrumb or stepper component at top
- "Next" and "Back" buttons at bottom
- Progress bar (optional)

**Step Validation:**
- Validate current step before proceeding
- Save progress on each step
- Allow back navigation without validation

**State Persistence:**
- Save form data to local storage (draft mode)
- Restore form state on page reload
- Clear saved data on successful submit

### 7. Responsive Layout

**Desktop (>1200px):**
- Two-column field layout (for short fields)
- Wide form container (max 1000px)
- Side-by-side buttons (Submit, Cancel)

**Tablet (900-1200px):**
- Single-column field layout
- Medium form container (max 800px)
- Stacked buttons on narrow screens

**Mobile (<900px):**
- Defer to Mobile feature (this feature not optimized for mobile)
- Or: Simplified single-column layout with larger touch targets

### 8. Interactions

**Field Interactions:**
- Click label → Focus input
- Tab → Move to next field
- Shift+Tab → Move to previous field
- Enter (in text field) → Move to next field
- Enter (on submit button) → Submit form
- Escape → Cancel current action (close modal, clear field)

**Form Actions:**
- Submit button: Primary action (contained button, right-aligned)
- Cancel/Reset button: Secondary action (outlined button, left of submit)
- Save Draft: Tertiary action (text button, left-aligned)

**Hover States:**
- Fields: Border color change, subtle background lighten
- Buttons: Background darken, shadow increase
- Help icons: Tooltip appears on hover

### 9. Accessibility

**Keyboard Navigation:**
- All fields reachable via Tab
- Logical tab order (top to bottom, left to right)
- Skip links for long forms (skip to section, skip to submit)

**ARIA Labels:**
- Form: `role="form"`, `aria-label="Form name"`
- Required fields: `aria-required="true"`
- Error fields: `aria-invalid="true"`, `aria-describedby="error-id"`
- Field hints: `aria-describedby="hint-id"`

**Screen Reader:**
- Error summary announced on submit
- Field errors announced on focus
- Progress/step changes announced
- Loading states announced

**Color Contrast:**
- All text meets WCAG AA (4.5:1 ratio)
- Error text high contrast (red on white)
- Focus indicators visible (2px solid primary color)

### 10. Form Submission

**Submit Flow:**
1. Client-side validation
2. Disable submit button (prevent double-submit)
3. Show loading indicator
4. API request to backend
5. Handle response:
   - Success: Show success message, redirect, or reset form
   - Error: Display error message, re-enable submit button
6. Re-enable form on error

**Loading States:**
- Submit button: Show spinner, text changes to "Submitting..."
- Form overlay: Semi-transparent overlay prevents interaction
- Progress indicator: For long-running submissions

**Success State:**
- Success message: Green banner at top
- Redirect: Navigate to success page (optional)
- Reset form: Clear all fields (optional)

**Error State:**
- Error message: Red banner at top
- Inline errors: Highlight specific fields
- Re-enable form: Allow user to fix errors and resubmit

## Design Decisions
- **Web-optimized**: Not mobile-first (Mobile feature handles that)
- **Real-time validation**: Faster feedback reduces errors
- **Multi-step support**: Breaks up long forms, improves completion rates
- **Local storage drafts**: Prevents data loss on accidental close/refresh
- **Hover-rich interactions**: Leverages desktop capabilities (not available on mobile)
- **Theme-based styling**: Uses design tokens (unlike Mobile feature)

## Related Features
- **Uses**: `FormFields` (for rendering field components)
- **Complements**: `Mobile` (provides mobile form rendering)
- **Used by**: Prototype routes (if web form prototypes exist)

## Integration with FormBuilder
- FormBuilder creates form structure
- WebForm renders that structure for end users
- Form data (sections, fields) generated by FormBuilder
- WebForm consumes FormBuilder output (JSON schema)

## Testing Considerations
- Test keyboard navigation (Tab order, Enter/Escape)
- Verify validation rules (required, format, range)
- Test multi-step navigation (next, back, progress saving)
- Validate error display (inline, summary, focus management)
- Check responsive layouts (desktop, tablet)
- Verify accessibility (screen reader, ARIA labels, contrast)

## Future Enhancements
- Conditional field visibility (show/hide based on other field values)
- Calculated fields (auto-compute based on other fields)
- File upload with drag-and-drop
- Rich text editor for paragraph fields
- Date range picker (start/end dates)
- Auto-save drafts (periodic saves without user action)
- Form analytics (track field completion times, drop-off points)
- Integration with backend validation (server-side validation)
- Captcha/spam prevention
- Multi-language support (i18n)

## API Integration Example
```typescript
// Submit form data to backend
const handleSubmit = async (formData: WebFormData) => {
  setIsSubmitting(true);

  try {
    const response = await fetch('/api/forms/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (!response.ok) throw new Error('Submission failed');

    const result = await response.json();
    setSubmitSuccess(true);
    // Redirect or show success message

  } catch (error) {
    setSubmitError(error.message);
    // Display error message

  } finally {
    setIsSubmitting(false);
  }
};
```

## Notes
This feature is currently a placeholder. Implementation will follow once WebForm prototypes are defined in the project requirements.
