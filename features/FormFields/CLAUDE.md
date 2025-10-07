# FormFields Feature

## Purpose
Centralized registry and factory for rendering form field components across different field types. Provides a unified interface for displaying text, paragraph, select, boolean, date, file, and unsupported field types.

## Key Points

### 1. Field Type Support
Supports rendering for the following field types:
- **TextField**: Single-line string inputs
- **ParagraphField**: Multi-line text inputs
- **SelectField**: Dropdown/select inputs with options
- **BooleanField**: Checkbox/toggle inputs
- **DateField**: Date picker inputs
- **FileListField**: File upload/attachment fields
- **UnsupportedField**: Fallback for unrecognized field types

### 2. Factory Pattern
**FieldFactory** component:
- Maps field data to appropriate field component
- Handles field type detection via `dataType` property
- Provides consistent interface for all field types
- Reduces complexity in parent components (no switch statements)

### 3. Component Architecture
```
features/FormFields/
├── index.tsx                      # Main exports
├── FieldFactory.tsx               # Field type mapping logic
├── types.ts                       # Shared interfaces (FieldData, SelectOption, etc.)
└── components/
    ├── TextField/
    │   ├── index.tsx
    │   └── styles.ts
    ├── ParagraphField/
    ├── SelectField/
    ├── BooleanField/
    ├── DateField/
    ├── FileListField/
    └── UnsupportedField/
```

### 4. Shared Data Types
```typescript
interface FieldData {
  id: string;
  type: string;           // Field type identifier
  dataType?: string;      // Data type for validation
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: SelectOption[]; // For select fields
  // ... other properties
}

interface SelectOption {
  value: string;
  label: string;
}
```

### 5. UX Principles Applied

**Jakob's Law**: Familiar field patterns
- Standard form input conventions
- Expected behaviors (click to edit, tab to next field)
- Consistent with web form standards

**Fitts's Law**: Touch-friendly targets
- Input fields have adequate click area
- Labels are clickable to focus inputs
- Clear hover states for interactive elements

**Visual Hierarchy**: Clear field structure
- Label typography emphasizes importance
- Placeholder text is lighter/secondary
- Error states are visually distinct (red text/borders)

### 6. Field Component Responsibilities
Each field component handles:
- **Rendering**: Display the appropriate input control
- **Validation**: Display error states when invalid
- **Interactivity**: Hover, focus, disabled states
- **Accessibility**: ARIA labels, keyboard navigation
- **Theming**: All styling via `styled()` components

### 7. Usage Pattern
```typescript
import { FieldFactory } from '@/features/FormFields';

const fieldData: FieldData = {
  id: '1',
  type: 'text',
  dataType: 'STRING',
  label: 'First Name',
  required: true
};

<FieldFactory field={fieldData} />
```

### 8. Extensibility
**Adding new field types:**
1. Create new component in `components/[FieldType]/`
2. Export from `index.tsx`
3. Update `FieldFactory.tsx` to map the new type
4. Add type definitions to `types.ts` if needed

## Design Decisions
- **Factory pattern**: Centralizes field type logic, simplifies parent components
- **Component isolation**: Each field type is self-contained
- **Shared types**: Ensures type safety across all field components
- **Unsupported fallback**: Graceful degradation for unknown field types
- **No inline styling**: All styles via `styled()` components in `styles.ts`

## Related Features
- Used by: `FormBuilder` (both v1 and v2)
- Used by: `ComponentShowcase` (for field demos)
- Complements: `Mobile` feature (provides web field rendering)

## Accessibility
- All fields support keyboard navigation
- ARIA labels for screen readers
- Focus indicators on all inputs
- Error messages associated with fields via `aria-describedby`
