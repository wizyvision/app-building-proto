# FormBuilder v3 Phase 1 - Quick Start Guide

**5-Minute Setup** | **For Developers**

---

## 🚀 See It in Action

```bash
npm run dev
```

Navigate to: **http://localhost:3000/prototypes/form-builder/version/3-phase1**

---

## 🎯 Key Features Demo

### 1. Template Library (Left Sidebar)
- Click **"📋 Basic Inspection"** → Instant section with 4 pre-configured fields
- Click **"🛡️ Safety Checklist"** → Safety form with Yes/No dropdowns
- Click **"📷 Evidence Collection"** → Photo upload fields
- Click **"📊 Meter Readings"** → Numeric fields with units

### 2. Undo/Redo
**Keyboard**:
- Add a template → Press `Ctrl+Z` → Section disappears
- Press `Ctrl+Y` → Section reappears

**Toolbar**:
- Click undo button (↶) → See tooltip with last action
- Click redo button (↷) → Redo what you undid

### 3. History Tracking
Every action is recorded:
- ✅ Add Section
- ✅ Delete Section
- ✅ Rename Section
- ✅ Add Field
- ✅ Update Field
- ✅ Bulk Operations

Max 50 actions in history.

---

## 📦 What You Get

### Utility Functions

```typescript
import {
  findFieldById,
  updateFieldInItems,
  removeFieldFromItems,
  validateFieldData
} from '@/features/FormBuilder/version3/utils/fieldHelpers';

// Example: Update a field
const updatedItems = updateFieldInItems(items, fieldId, {
  label: 'New Label',
  isRequired: true
});
```

### Undo/Redo

```typescript
import { UndoRedoProvider, useUndoRedo } from '@/features/FormBuilder/version3/context/UndoRedoContext';

function MyComponent() {
  const { canUndo, canRedo, undo, redo, recordAction } = useUndoRedo();

  const handleAddField = () => {
    const beforeState = [...items];
    // ... add field logic
    const afterState = [...items, newField];

    recordAction({
      type: 'ADD_FIELD',
      description: 'Added new field',
      data: { before: beforeState, after: afterState }
    });
  };

  return (
    <button onClick={undo} disabled={!canUndo}>
      Undo (Ctrl+Z)
    </button>
  );
}
```

### Templates

```typescript
import {
  TemplateLibrarySidebar,
  systemTemplates
} from '@/features/FormBuilder/version3/components/Templates/version1';

<TemplateLibrarySidebar
  onSelectTemplate={(template) => {
    console.log('Selected:', template.name);
    // Convert template.fields to your form fields
  }}
/>
```

### Bulk Operations

```typescript
import { BulkActionBar } from '@/features/FormBuilder/version3/components/BulkOperations/version1';

<BulkActionBar
  selectedCount={selectedFieldIds.length}
  onDelete={handleBulkDelete}
  onDuplicate={handleBulkDuplicate}
  onSetRequired={(isRequired) => { /* ... */ }}
  onCancel={() => setSelectedFieldIds([])}
/>
```

---

## 🏗️ Integration Example

### Step 1: Wrap with Provider

```typescript
// app/my-page/page.tsx
import { UndoRedoProvider } from '@/features/FormBuilder/version3/context/UndoRedoContext';

export default function MyPage() {
  return (
    <UndoRedoProvider maxHistorySize={50}>
      <MyFormBuilder />
    </UndoRedoProvider>
  );
}
```

### Step 2: Add Components

```typescript
// components/MyFormBuilder.tsx
import { useUndoRedo } from '@/features/FormBuilder/version3/context/UndoRedoContext';
import { UndoRedoButtons } from '@/features/FormBuilder/version3/components/UndoRedo/version1';
import { TemplateLibrarySidebar } from '@/features/FormBuilder/version3/components/Templates/version1';

function MyFormBuilder() {
  const { canUndo, canRedo, undo, redo, recordAction } = useUndoRedo();
  const [items, setItems] = useState<FormItem[]>([]);

  const handleTemplateSelect = (template) => {
    const beforeState = [...items];
    // ... insert template fields
    const afterState = [...items, newSection];
    setItems(afterState);

    recordAction({
      type: 'ADD_SECTION',
      description: `Added template: ${template.name}`,
      data: { before: beforeState, after: afterState }
    });
  };

  return (
    <Box display="flex">
      <TemplateLibrarySidebar onSelectTemplate={handleTemplateSelect} />

      <Box flex={1}>
        <UndoRedoButtons
          onUndo={undo}
          onRedo={redo}
          canUndo={canUndo}
          canRedo={canRedo}
        />

        {/* Your form builder UI */}
      </Box>
    </Box>
  );
}
```

### Step 3: Use Utilities

```typescript
import { updateFieldInItems, findFieldById } from '@/features/FormBuilder/version3/utils/fieldHelpers';

// Instead of complex nested logic:
❌ const handleFieldUpdate = (fieldId, updates) => {
  setItems(prev => {
    const updated = [...prev];
    for (let i = 0; i < updated.length; i++) {
      if (updated[i].type === 'section') {
        for (let j = 0; j < updated[i].data.fields.length; j++) {
          if (updated[i].data.fields[j].id === fieldId) {
            updated[i].data.fields[j] = { ...updated[i].data.fields[j], ...updates };
            return updated;
          }
        }
      }
    }
    return updated;
  });
};

// Use clean utility:
✅ const handleFieldUpdate = (fieldId, updates) => {
  setItems(prev => updateFieldInItems(prev, fieldId, updates));
};
```

---

## 🎨 Templates Structure

Each template has:

```typescript
{
  id: 'system-basic-inspection',
  name: 'Basic Inspection',
  description: 'Standard inspection form fields',
  icon: '📋',
  category: 'inspection',
  author: 'system',
  fields: [
    {
      dataType: DataTypes.STRING,       // Use constants!
      key: 'c1_inspectorname',
      label: 'Inspector Name',
      isRequired: true,
      isSystem: false,
      placeholder: 'Enter inspector name',
      validations: { /* ... */ },       // Optional
      selectOptions: [ /* ... */ ],     // For SELECT only
      settings: { /* ... */ },          // For DOUBLE only
      attachmentSettings: { /* ... */ }, // For FILES only
    },
    // ... more fields
  ],
  metadata: {
    createdAt: new Date('2025-10-01'),
    usageCount: 0,
    tags: ['inspection', 'basic']
  }
}
```

---

## 🔑 Action Types (Undo/Redo)

```typescript
type ActionType =
  | 'ADD_SECTION'       // Added new section
  | 'DELETE_SECTION'    // Removed section
  | 'RENAME_SECTION'    // Changed section name
  | 'REORDER_SECTION'   // Drag-dropped section
  | 'ADD_FIELD'         // Added new field
  | 'DELETE_FIELD'      // Removed field
  | 'UPDATE_FIELD'      // Changed field properties
  | 'REORDER_FIELD'     // Drag-dropped field
  | 'BULK_UPDATE';      // Bulk operations
```

**Recording an Action**:

```typescript
recordAction({
  type: 'ADD_FIELD',
  description: 'Added Email field',  // Shows in tooltip
  data: {
    before: itemsBeforeChange,       // State before
    after: itemsAfterChange          // State after
  }
});
```

---

## 🛠️ Available Utilities

### Field Helpers
- `findFieldById(items, fieldId)` → `FieldData | null`
- `updateFieldInItems(items, fieldId, updates)` → `FormItem[]`
- `removeFieldFromItems(items, fieldId)` → `FormItem[]`
- `getAllFields(items)` → `FieldData[]`
- `countFields(items)` → `number`
- `validateFieldData(field)` → `string[]` (errors)

### Section Helpers
- `findSectionById(items, sectionId)` → `SectionData | null`
- `updateSectionInItems(items, sectionId, updates)` → `FormItem[]`
- `removeSectionFromItems(items, sectionId)` → `FormItem[]`
- `getAllSections(items)` → `SectionData[]`
- `countSections(items)` → `number`
- `isSectionEmpty(section)` → `boolean`

### Validators
- `isValidEmail(email)` → `boolean`
- `isValidPhone(phone)` → `boolean`
- `isValidUrl(url)` → `boolean`
- `isValidLabel(label)` → `boolean`
- `hasValidSelectOptions(options)` → `boolean`

---

## 📊 System Templates

### 1. Basic Inspection (📋)
- Inspector Name (STRING, required)
- Inspection Date (DATE, system)
- Location (LOCATION)
- Status (STATUS_ID with colors)

### 2. Safety Checklist (🛡️)
- PPE Worn? (SELECT: Yes/No)
- Area Secured? (SELECT: Yes/No)
- Safety Notes (TEXT, max 500 chars)

### 3. Evidence Collection (📷)
- Photo - Before (FILES, image only)
- Photos - Current (FILE_LIST, multiple images)
- Evidence Notes (TEXT)

### 4. Meter Readings (📊)
- Pressure (DOUBLE, PSI, 0-150)
- Temperature (DOUBLE, °F, -20-200)
- Reading Notes (TEXT)

---

## 🎯 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Z` / `Cmd+Z` | Undo last action |
| `Ctrl+Y` / `Cmd+Y` | Redo last undone action |
| `Ctrl+Shift+Z` / `Cmd+Shift+Z` | Redo (alternative) |

---

## ✅ Checklist for New Features

When adding new functionality:

- [ ] Use utility helpers from `utils/` instead of inline logic
- [ ] Record action in undo/redo history with `recordAction()`
- [ ] Use `DataTypes` constants, never hardcoded strings
- [ ] All styling in `styles.ts`, zero `sx` props
- [ ] Document UX principles in component comments
- [ ] 44px minimum touch targets (Fitts's Law)
- [ ] Add TypeScript types for all props/state

---

## 🐛 Common Issues

### "recordAction is not defined"
**Fix**: Wrap component with `UndoRedoProvider`

```typescript
<UndoRedoProvider>
  <YourComponent />
</UndoRedoProvider>
```

### "Cannot find module 'utils/fieldHelpers'"
**Fix**: Use absolute import

```typescript
import { updateFieldInItems } from '@/features/FormBuilder/version3/utils/fieldHelpers';
```

### Undo/Redo not working
**Check**:
1. Are you recording actions with `recordAction()`?
2. Is `before` and `after` state different?
3. Are you calling `setItems(afterState)` after recording?

---

## 📚 Full Documentation

- **Implementation Details**: [PHASE1-IMPLEMENTATION.md](PHASE1-IMPLEMENTATION.md)
- **Technical Plan**: [formbuilder-v3-technical-plan.md](formbuilder-v3-technical-plan.md)
- **WizyVision Guidelines**: [/CLAUDE.md](/CLAUDE.md)

---

## 🎓 Next: Phase 2

**Smart Type Detection** with auto-configuration:
- "Inspector Email" → STRING + email validation (auto-applied)
- "Contact Phone" → STRING + phone validation (auto-applied)
- "Pressure (PSI)" → DOUBLE + unit="PSI" + threshold (auto-applied)

Coming in Phase 2!

---

**Questions?** Check [PHASE1-IMPLEMENTATION.md](PHASE1-IMPLEMENTATION.md) for detailed docs.

**Live Demo**: http://localhost:3000/prototypes/form-builder/version/3-phase1
