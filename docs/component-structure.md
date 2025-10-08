# Component Structure & Versioning

> **Purpose**: Rules for organizing components, versioning, and file structure.

---

## 📂 Component Directory Rules

### Dumb vs Smart Components

```
components/                    # DUMB (Presentational Only)
├── Section/
│   ├── index.tsx             # Pure component (props in, UI out)
│   ├── styles.ts             # ALL styled() calls here
│   └── types.ts              # TypeScript interfaces
│
features/                      # SMART (State + Logic)
├── FormBuilder/
│   ├── index.tsx             # Feature integration
│   ├── styles.ts             # ALL styled() calls here
│   ├── SectionList.tsx       # Sub-component with logic
│   ├── FieldList.tsx         # Sub-component with logic
│   └── types.ts              # TypeScript interfaces
```

### Decision Tree

```
Is this component stateful?
│
├─ NO → Does it just render props?
│   │
│   └─ YES → components/ (Presentational)
│
└─ YES → Does it manage state/side effects?
    │
    └─ YES → features/ (Smart)
```

### Examples

**Presentational (components/):**
- Button
- Card
- Section Header
- Field
- Icon
- Typography

**Stateful (features/):**
- FormBuilder
- UserProfile
- Dashboard
- Authentication
- FileUploader

---

## 🔢 Component Versioning

### Version Structure

```
components/
├── Section/
│   ├── version1/
│   │   ├── Header.tsx
│   │   ├── Content.tsx
│   │   ├── styles.ts
│   │   ├── types.ts
│   │   └── index.tsx       # Exports Section v1
│   ├── version2/
│   │   ├── Header.tsx
│   │   ├── Content.tsx
│   │   ├── Footer.tsx      # New in v2
│   │   ├── styles.ts
│   │   ├── types.ts
│   │   └── index.tsx       # Exports Section v2
│   └── index.tsx           # Exports latest version (v2)
```

### Folder Naming Rules

**REQUIRED:**
- Version folders: `version1`, `version2`, `version3` (lowercase, no spaces)
- Component folders: `PascalCase` (e.g., `Section`, `Field`)
- Sub-components: `PascalCase` (e.g., `Header.tsx`, `Content.tsx`)

**FORBIDDEN:**
- ❌ `v1`, `V1`, `Version1`, `section-v1`
- ❌ Mixing versions in same folder
- ❌ `camelCase` or `snake_case` for folders

---

## 📝 Version Documentation

### Version Header Template

```typescript
// components/Section/version2/index.tsx

/**
 * Section Component - Version 2
 *
 * VERSION INFO:
 * - Version: 2
 * - Created: 2025-01-15
 * - Changes from v1:
 *   - Added Footer sub-component
 *   - Split Header logic from Content
 *   - Improved collapse animation
 *   - Breaking: Changed onEdit to onTitleChange prop
 *
 * MIGRATION FROM V1:
 * - Rename prop: onEdit → onTitleChange
 * - Footer is now mandatory (pass null if not needed)
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar collapsible pattern
 * - Fitts's Law: 44x44px touch targets
 * - Progressive Disclosure: Expand/collapse content
 *
 * BREAKING CHANGES:
 * - onEdit prop renamed to onTitleChange
 * - Footer prop is now required (can be null)
 */

export { Section } from './Section';
export type { SectionProps } from './types';
```

### When to Create New Version

**CREATE NEW VERSION FOR:**
- ✅ Breaking changes to props interface
- ✅ Major structural changes (new sub-components, layout)
- ✅ Significant behavior changes (interactions, states)
- ✅ Design system updates (new theme, principles)

**DO NOT CREATE NEW VERSION FOR:**
- ❌ Bug fixes
- ❌ Minor styling tweaks
- ❌ Performance optimizations
- ❌ Adding optional props (non-breaking)

---

## 🧩 Sub-Component Rules

### Sub-Component Structure

```typescript
// components/Section/version2/Header.tsx
export const Header = ({ title, onToggle }: HeaderProps) => {
  return <HeaderContainer onClick={onToggle}>{title}</HeaderContainer>;
};

// components/Section/version2/Content.tsx
export const Content = ({ children }: ContentProps) => {
  return <ContentContainer>{children}</ContentContainer>;
};

// components/Section/version2/index.tsx
import { Header } from './Header';
import { Content } from './Content';

export const Section = ({ title, children, onToggle }: SectionProps) => {
  return (
    <SectionContainer>
      <Header title={title} onToggle={onToggle} />
      <Content>{children}</Content>
    </SectionContainer>
  );
};
```

### Sub-Component Guidelines

- **Each sub-component has own file**
- **Sub-components are NOT exported** (internal only)
- **Only main component exported** from `index.tsx`
- **Shared styles in `styles.ts`**
- **Shared types in `types.ts`**

---

## 📦 Import/Export Patterns

### Main Export (Root Level)

```typescript
// components/Section/index.tsx

/**
 * Section Component - Latest Version Export
 *
 * This file exports the LATEST stable version.
 * Import older versions explicitly if needed.
 */

// Export latest version (v2)
export { Section } from './version2';
export type { SectionProps } from './version2/types';
```

### Importing Versions

**Latest version (recommended):**
```typescript
import { Section } from '@/components/Section';
```

**Specific version (legacy support):**
```typescript
import { Section as SectionV1 } from '@/components/Section/version1';
import { Section as SectionV2 } from '@/components/Section/version2';
```

**In prototypes showing evolution:**
```typescript
// /prototypes/form-builder/version/1/page.tsx
import { Section as SectionV1 } from '@/components/Section/version1';

// /prototypes/form-builder/version/2/page.tsx
import { Section as SectionV2 } from '@/components/Section/version2';
```

---

## 📁 File Structure Examples

### Simple Component (No Versioning Yet)

```
components/Button/
├── index.tsx
├── styles.ts
└── types.ts
```

### Component with Versions

```
components/Section/
├── version1/
│   ├── index.tsx
│   ├── styles.ts
│   └── types.ts
├── version2/
│   ├── Header.tsx       # Sub-component
│   ├── Content.tsx      # Sub-component
│   ├── index.tsx
│   ├── styles.ts
│   └── types.ts
└── index.tsx            # Exports v2 (latest)
```

### Complex Feature

```
features/FormBuilder/
├── version1/
│   ├── FormBuilder.tsx
│   ├── SectionList.tsx
│   ├── FieldList.tsx
│   ├── styles.ts
│   ├── types.ts
│   └── index.tsx
├── version2/
│   ├── FormBuilder.tsx
│   ├── SectionList.tsx
│   ├── FieldList.tsx
│   ├── DragDropContext.tsx
│   ├── styles.ts
│   ├── types.ts
│   └── index.tsx
└── index.tsx            # Exports v2 (latest)
```

---

## ✅ Component Creation Checklist

Before creating ANY component:

- [ ] **Is this presentational or stateful?**
  - Presentational → `components/`
  - Stateful → `features/`
- [ ] **Folder named in PascalCase** (e.g., `Section`, `FormBuilder`)
- [ ] **Main component in `index.tsx`**
- [ ] **ALL styled() calls in `styles.ts`** (ZERO in index.tsx)
- [ ] **Props defined in `types.ts`** (if complex)
- [ ] **Design principles documented in comments**
- [ ] **Version documented** (if versioned component)
- [ ] **Interactions are functional** (not placeholder)

---

## 🚫 Common Mistakes

### 1. Component in Wrong Directory

```typescript
// ❌ WRONG
components/FormBuilder/index.tsx  // Has useState, useEffect
features/Button/index.tsx         // Just renders a button

// ✅ CORRECT
features/FormBuilder/index.tsx    // Stateful feature
components/Button/index.tsx       // Presentational component
```

### 2. Styles in Component File

```typescript
// ❌ WRONG - styles.ts not used
// components/Section/index.tsx
const StyledHeader = styled('div')({ ... });

export const Section = () => { ... };

// ✅ CORRECT
// components/Section/styles.ts
export const StyledHeader = styled('div')({ ... });

// components/Section/index.tsx
import { StyledHeader } from './styles';
export const Section = () => { ... };
```

### 3. Wrong Version Naming

```typescript
// ❌ WRONG
components/Section/v1/
components/Section/V1/
components/Section/Version1/

// ✅ CORRECT
components/Section/version1/
components/Section/version2/
```

### 4. Exporting Sub-components

```typescript
// ❌ WRONG
// components/Section/version2/index.tsx
export { Section } from './Section';
export { Header } from './Header';  // Don't export!
export { Content } from './Content'; // Don't export!

// ✅ CORRECT
// components/Section/version2/index.tsx
export { Section } from './Section';
// Sub-components stay internal
```

---

## 📚 Related Documentation

- **Styling**: See [styling-rules.md](./styling-rules.md)
- **UX Principles**: See [ux-principles.md](./ux-principles.md)
- **Interactivity**: See [interactivity.md](./interactivity.md)
