# WizyVision Architecture Guidelines

> **CRITICAL**: Quick reference for data structures, state management, and logic organization.

---

## 🗺️ LOGIC DECISION TREE

**Start here every time you need to work with logic or data:**

```
┌─────────────────────────────────────────────────────────┐
│ What type of logic are you implementing?               │
└────────────────────┬────────────────────────────────────┘
                     │
      ┌──────────────┼──────────────┐
      │              │              │
   DATA?         STATE?         API?
      │              │              │
      ▼              ▼              ▼
```

### 1️⃣ DATA DECISION
```
Working with Field data?
  ├─ Yes → Use DataTypes constants (dataType property)
  ├─ Yes → Use SystemKeys constants (key property)
  └─ No magic strings! → See "Constants" section

Need to transform/validate data?
  ├─ Pure functions → features/[Feature]/utils/
  └─ Field-specific → See "Data Structure" section
```

### 2️⃣ STATE DECISION
```
What kind of state?
  ├─ UI-only (toggle, hover, focus)?
  │   └─ useState in component → Local state
  │
  ├─ Feature-wide (form data, selections)?
  │   └─ Context → See "State Management" section
  │
  └─ Server data (API responses)?
      └─ React Query → See "API Integration" section
```

### 3️⃣ COMPONENT PLACEMENT DECISION
```
Does component have logic?
  ├─ Has useState/useEffect/API calls?
  │   └─ features/ directory → Smart component
  │
  └─ Only receives props and renders UI?
      └─ components/ directory → Dumb component
```

### 4️⃣ LOGIC ORGANIZATION DECISION
```
Where does this logic go?
  ├─ Complex reusable logic?
  │   └─ Custom hook → features/[Feature]/hooks/
  │
  ├─ Pure utility functions?
  │   └─ Utils file → features/[Feature]/utils/
  │
  └─ API calls?
      └─ API file → features/[Feature]/api/
```

---

## ⚡ QUICK REFERENCE

### I need to...

| Task | Action | Location |
|------|--------|----------|
| Define field type | Import `DataTypes` | `constants/dataTypes.ts` |
| Define field key | Import `SystemKeys` | `constants/systemKeys.ts` |
| Manage UI state | Use `useState` | Component file |
| Share state across feature | Create Context | `features/[Feature]/context.tsx` |
| Fetch server data | Use React Query | `features/[Feature]/index.tsx` |
| Write reusable logic | Create custom hook | `features/[Feature]/hooks/` |
| Write pure functions | Create utility | `features/[Feature]/utils/` |
| Make API calls | Create API layer | `features/[Feature]/api/` |

---

## 📊 FIELD DATA STRUCTURE (REFERENCE)

### Complete Field Type Definition

This is the canonical field data structure used throughout the WizyVision application. All field-related components MUST adhere to this structure.

```typescript
export type Field = {
  id: number;
  creatorId: number;
  dataType: string;
  description: null | string;
  descriptionIntl: Intl | null;
  helper: null;
  helperTextIntl: null;
  intl?: Intl;
  iconName: null | string;
  instructionText: null | string;
  isRequired: boolean;
  isSystem: boolean;
  isVisible: boolean;
  key: string;
  label: string;
  logics: Logic[] | null;
  lookupSettings: LookupSettings | null;
  position: number;
  readOnly: boolean;
  selectOptions: SelectOption[] | null;
  defaultValue: DefaultValue | null;
  attachmentSettings: AttachmentSettings | null;
  remarkSettings: AttachmentSettings | null;
  settings: SettingsClass | null;
  shownInList: boolean;
  typeId: number;
  validations: Validations | null;
  layoutWebFormPosition: number | null;
  layoutMobileFormPosition: number | null;
  layoutCaseListPosition: number | null;
  layoutPrintPosition: number | null;
  layoutCaseCardVisibility: boolean;
  linkableAppIds: number[] | null;
  linkableAppMapping: LinkableAppMapping | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  statuses?: Status[];
};

export type LinkableAppMapping = {
  [key: string]: LinkableAppData;
};

export type LinkableAppData = { mapping: any; type: string };

export type DefaultValue = {
  type: string;
  unit?: string | null | undefined;
  value: string | null;
};

export type LookupSettings = {
  url: string;
  authHeader: string;
};

export type Logic = {
  value: string;
  targetFieldKeys: string[];
};

export type SelectOption = {
  id: string | number;
  value: string;
  intl?: Intl;
  position?: number;
};

export type PeopleSelectOption = SelectOption & {
  imageUrl?: string;
  type?: string;
};

export type AttachmentSettings = {
  value: string;
  condition: string;
};

export type SettingsClass = {
  scanningOrder?: number;
  scanner?: null;
  canAttachFile?: boolean;
  canAddRemarks?: boolean;
  isMultipleScan?: boolean;
  isUniqueField?: boolean;
  formulaType?: null;
  responseTemplateId?: number;
  unit?: string;
  displayFormat?: 'PERCENT';
  threshold?: {
    min?: number;
    max?: number;
  };
  isTracked?: boolean;
};

export type Validations = {
  type: string;
  errorMessage: string;
  details: Details;
};

export type Details = {
  pattern: string;
  condition: string;
  value?: string;
  min?: number;
  max?: number;
};

export enum AttachmentSettingsConditionType {
  always = 'always',
  contains = 'in',
  equals = '=',
}

export type Status = {
  // fields attached on Case
  id: number;
  color: string;
  intl?: Intl;
  name: string;
  displayName?: string;

  // complete Status fields
  createdAt: Date;
  deletedAt: null;
  memId: number;
  position: number;
  postTypeId: number;
  systemId: string;
  type: string;
  updatedAt: Date;
};
```

---

## 🔑 CONSTANTS (NO MAGIC STRINGS!)

### The Rule
**❌ NEVER use hardcoded strings for field types or keys**
**✅ ALWAYS use constants from `/constants/`**

### Quick Guide

```typescript
// Two types of constants:

1. DataTypes → for field.dataType (UPPERCASE)
   import { DataTypes } from '@/constants/dataTypes';
   DataTypes.STRING, DataTypes.DATE, DataTypes.FILES

2. SystemKeys → for field.key (camelCase)
   import { SystemKeys } from '@/constants/systemKeys';
   SystemKeys.title, SystemKeys.status, SystemKeys.createdAt
```

### Example

```typescript
// ❌ WRONG
const field = {
  dataType: 'DATE',
  key: 'createdAt'
};

// ✅ CORRECT
import { DataTypes, SystemKeys } from '@/constants';

const field = {
  dataType: DataTypes.DATE,      // UPPERCASE constant
  key: SystemKeys.CREATED_AT,    // camelCase constant
};
```

### Available Constants

**DataTypes** (in `constants/dataTypes.ts`):
- System: `STATUS_ID`, `FILES`, `TAGS`, `WATCHERS`, `SITE`
- Custom: `STRING`, `TEXT`, `DATE`, `DOUBLE`, `SELECT`, `CHECKBOX`, `PEOPLE`
- Additional: `NUMBER`, `URL`, `EMAIL`, `PHONE`

**SystemKeys** (in `constants/systemKeys.ts`):
- Common: `TITLE`, `DESCRIPTION`, `STATUS`, `CREATED_AT`, `UPDATED_AT`
- Assignment: `ASSIGNEE`, `DUE_DATE`, `PRIORITY`
- Metadata: `TAGS`, `FILES`

---

## 🏗️ STATE MANAGEMENT

### Decision Flow

```
What state am I managing?
│
├─ UI-only state (toggle, hover, selected)?
│  └─ useState in component
│     Example: isExpanded, isEditing, selectedTab
│
├─ Feature-wide state (shared across components)?
│  └─ Context at feature level
│     Example: FormBuilder sections, FieldManager data
│
└─ Server data (from API)?
   └─ React Query
      Example: Fetched fields, user data, app settings
```

### Three Types of State

| Type | Tool | Use For | Example |
|------|------|---------|---------|
| **Local** | `useState` | UI interactions | Toggle, hover, focus |
| **Shared** | Context | Feature-wide data | Form state, selections |
| **Server** | React Query | API data | Fields list, user info |

### Examples

**1. Local State (useState)**
```typescript
// ✅ Use for UI state
const [isExpanded, setIsExpanded] = useState(false);
const [isEditing, setIsEditing] = useState(false);
const [selectedTab, setSelectedTab] = useState(0);
```

**2. Shared State (Context)**
```typescript
// features/FormBuilder/context.tsx
export const FormBuilderContext = createContext<FormBuilderState | null>(null);

export const FormBuilderProvider = ({ children }: PropsWithChildren) => {
  const [sections, setSections] = useState<Section[]>([]);

  return (
    <FormBuilderContext.Provider value={{ sections, setSections }}>
      {children}
    </FormBuilderContext.Provider>
  );
};

// Usage in child component
const { sections, setSections } = useContext(FormBuilderContext);
```

**3. Server State (React Query)**
```typescript
// ✅ Always use React Query for API data
const { data: fields, isLoading } = useQuery({
  queryKey: ['fields', appId],
  queryFn: () => fetchFields(appId),
});
```

### Component Placement Rule

```
Does component manage state or logic?
├─ YES → features/ directory (Smart component)
│        - Has useState/useEffect/useContext
│        - Handles API calls
│        - Contains business logic
│
└─ NO → components/ directory (Dumb component)
         - Only receives props
         - Pure UI rendering
         - No state management
```

---

## 📐 DATA FLOW (Props Down, Events Up)

### The Golden Rule
**Data flows DOWN via props → Changes flow UP via callbacks**

```
     Parent (has state)
         │
         ├─ Data down (props)
         │  - title, fields, isExpanded
         │
         ▼
     Child (renders UI)
         │
         ├─ Events up (callbacks)
         │  - onClick, onChange, onDelete
         │
         ▼
     Parent (updates state)
```

### Example

```typescript
// ✅ CORRECT Pattern
interface SectionProps {
  // Data down (nouns)
  id: string;
  title: string;
  isExpanded: boolean;

  // Events up (on + Verb)
  onTitleChange: (newTitle: string) => void;
  onToggle: () => void;
}

// Parent manages state
const ParentFeature = () => {
  const [sections, setSections] = useState<Section[]>([]);

  const handleTitleChange = (sectionId: string, newTitle: string) => {
    setSections(prev => prev.map(s =>
      s.id === sectionId ? { ...s, title: newTitle } : s
    ));
  };

  return (
    <Section
      {...section}
      onTitleChange={(title) => handleTitleChange(section.id, title)}
    />
  );
};
```

### Prop Naming Guide

| Type | Pattern | Examples |
|------|---------|----------|
| **Data** | Nouns | `title`, `fields`, `description` |
| **Events** | on + Verb | `onClick`, `onChange`, `onDelete` |
| **Booleans** | is/has/can | `isLoading`, `hasError`, `canEdit` |

---

## 🔧 LOGIC ORGANIZATION

### Where Logic Goes

```
features/[Feature]/
├── index.tsx              # Main component (uses hooks)
├── hooks/                 # Complex reusable logic
│   ├── useFormBuilder.ts  #   - State management
│   ├── useDragDrop.ts     #   - Event handlers
│   └── useValidation.ts   #   - Side effects
├── utils/                 # Pure helper functions
│   ├── fieldHelpers.ts    #   - Data transformations
│   └── validators.ts      #   - Calculations
└── api/                   # API calls only
    ├── fields.ts          #   - Fetch, create, update
    └── sections.ts        #   - Delete operations
```

### Decision: Hook vs Utility?

```
My logic...
├─ Uses React hooks (useState, useEffect)?
│  └─ Custom Hook → features/[Feature]/hooks/
│
└─ Pure function (no hooks)?
   └─ Utility → features/[Feature]/utils/
```

### 1. Custom Hooks (Stateful Logic)

```typescript
// features/FormBuilder/hooks/useFormBuilder.ts
export const useFormBuilder = (initialSections: Section[]) => {
  const [sections, setSections] = useState(initialSections);

  const addSection = useCallback((section: Section) => {
    setSections(prev => [...prev, section]);
  }, []);

  const deleteSection = useCallback((id: string) => {
    setSections(prev => prev.filter(s => s.id !== id));
  }, []);

  return { sections, addSection, deleteSection };
};

// Usage
const FormBuilder = () => {
  const { sections, addSection } = useFormBuilder([]);
  // ...
};
```

### 2. Utility Functions (Pure Logic)

```typescript
// features/FormBuilder/utils/fieldHelpers.ts
import { Field } from '@/types/field';
import { DataTypes } from '@/constants/dataTypes';

// ✅ Pure functions - no React hooks
export const isValidField = (field: Field): boolean => {
  return Boolean(field.key && field.dataType && field.label);
};

export const filterByType = (fields: Field[], dataType: DataType) => {
  return fields.filter(f => f.dataType === dataType);
};

export const sortByPosition = (fields: Field[]) => {
  return [...fields].sort((a, b) => a.position - b.position);
};
```

---

## 🔌 API INTEGRATION

### Structure

```
features/[Feature]/api/
├── fields.ts          # All field API calls
└── sections.ts        # All section API calls

Pattern: One file per resource type
```

### Step 1: Define API Functions

```typescript
// features/FormBuilder/api/fields.ts
import { Field } from '@/types/field';

export const fetchFields = async (appId: number): Promise<Field[]> => {
  const response = await fetch(`/api/apps/${appId}/fields`);
  if (!response.ok) throw new Error('Failed to fetch fields');
  return response.json();
};

export const createField = async (appId: number, field: Partial<Field>) => {
  const response = await fetch(`/api/apps/${appId}/fields`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(field),
  });
  if (!response.ok) throw new Error('Failed to create field');
  return response.json();
};

export const updateField = async (fieldId: number, updates: Partial<Field>) => {
  const response = await fetch(`/api/fields/${fieldId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error('Failed to update field');
  return response.json();
};
```

### Step 2: Use React Query

```typescript
// features/FormBuilder/index.tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFields, createField, deleteField } from './api/fields';

const FormBuilder = ({ appId }: { appId: number }) => {
  const queryClient = useQueryClient();

  // Read data (useQuery)
  const { data: fields, isLoading } = useQuery({
    queryKey: ['fields', appId],
    queryFn: () => fetchFields(appId),
  });

  // Write data (useMutation)
  const createMutation = useMutation({
    mutationFn: (field: Partial<Field>) => createField(appId, field),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fields', appId] });
    },
  });

  // Use in handlers
  const handleAddField = () => {
    createMutation.mutate({ label: 'New Field', dataType: DataTypes.STRING });
  };

  if (isLoading) return <div>Loading...</div>;

  return <div>{/* Render UI */}</div>;
};
```

### Quick Patterns

| Operation | Tool | Example |
|-----------|------|---------|
| **Fetch** | `useQuery` | `useQuery({ queryKey, queryFn })` |
| **Create** | `useMutation` | `useMutation({ mutationFn })` |
| **Update** | `useMutation` | Same as create |
| **Delete** | `useMutation` | Same as create |
| **Refresh** | `invalidateQueries` | After mutations |

---

## ✅ BEFORE YOU CODE (Quick Checklist)

### Data
- [ ] Using DataTypes for `dataType` property?
- [ ] Using SystemKeys for `key` property?
- [ ] No hardcoded strings?

### State
- [ ] UI state → useState
- [ ] Feature state → Context
- [ ] Server data → React Query

### Organization
- [ ] Logic component → `features/`
- [ ] Presentational component → `components/`
- [ ] Custom hooks → `features/[Feature]/hooks/`
- [ ] Pure functions → `features/[Feature]/utils/`
- [ ] API calls → `features/[Feature]/api/`

### Flow
- [ ] Props down, events up?
- [ ] Clear prop naming?
- [ ] Loading/error states handled?

---

## 🚫 COMMON MISTAKES

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| `dataType: 'DATE'` | `dataType: DataTypes.DATE` |
| Logic in `components/` | Logic in `features/` |
| `useState` for API data | React Query for API data |
| Prop drilling 5 levels | Use Context |

---

## 📞 QUICK DECISION GUIDE

**Question: Where does this code go?**

```
Does it...
├─ Define field types/keys?
│  └─ Use constants/dataTypes.ts or constants/systemKeys.ts
│
├─ Manage state with hooks?
│  └─ features/[Feature]/hooks/useFeature.ts
│
├─ Transform data (pure function)?
│  └─ features/[Feature]/utils/helpers.ts
│
├─ Make API calls?
│  └─ features/[Feature]/api/resource.ts
│
└─ Render UI with state?
   └─ features/[Feature]/index.tsx
```

---

**REMEMBER**: Follow the decision tree at the top. When in doubt, check the Quick Reference table.
