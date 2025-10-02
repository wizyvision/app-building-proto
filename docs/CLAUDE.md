# WizyVision Form Builder Prototype - Development Guidelines

> **CRITICAL**: This document defines STRICT rules for building the WizyVision Form Builder prototype. Claude MUST follow every rule without exception.

---

## 📋 PROTOTYPE STRUCTURE (MANDATORY)

### Route Hierarchy

```
/ (Home)
├── /prototypes (Feature List)
│   └── /prototypes/[feature] (Feature Overview with Version Cards)
│       └── /prototypes/[feature]/version/[id] (Wireframe/Design View)
│
└── /components (Component Showcase)
    ├── Drawer Navigation (components list)
    └── Component View (variants: empty, filled, states)
```

### Page Breakdown

**1. Home Page (`/`)**
- Purpose: Navigation hub
- Links to: "Prototypes" and "Components"
- Clean, minimal, centered layout

**2. Prototypes Landing (`/prototypes`)**
- Purpose: List all features/prototypes
- Display: Grid/list of feature cards
- Navigation: Click feature → feature overview

**3. Feature Overview (`/prototypes/[feature]`)**
- Purpose: Show all versions of a feature
- Display: Case study cards for each version
- Content per card: Version number, description, thumbnail, date
- Navigation: Click version card → wireframe view

**4. Wireframe View (`/prototypes/[feature]/version/[id]`)**
- Purpose: Display specific wireframe/design
- Content: Full design with annotations
- Back navigation to feature overview

**5. Components Showcase (`/components`)**
- Layout: Drawer (left) + Main content (right)
- Drawer: List of all components (Section, Field, Button, etc.)
- Main: Selected component with interactive variants
- Variants: Empty state, filled state, hover, disabled, error, etc.

---

## 🎯 DESIGN PRINCIPLES (MUST APPLY)

### Every Component Must Document Which Principles Apply

When creating ANY component, explicitly state in code comments:

```typescript
/**
 * ComponentName - [Brief description]
 * 
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: [How it's applied]
 * - Fitts's Law: [How it's applied]
 * - Hick's Law: [How it's applied]
 * - Miller's Law: [How it's applied]
 * - Visual Hierarchy: [How it's applied]
 * 
 * INTERACTION DESIGN:
 * - [Describe key interactions]
 * - [Describe hover states]
 * - [Describe click behaviors]
 */
```

### Principle Guidelines

**Jakob's Law**: Users expect familiar patterns
- ✅ Use standard UI conventions (tabs, cards, drawers)
- ✅ Don't reinvent common interactions
- ✅ Follow Material Design patterns (we're using MUI)

**Fitts's Law**: Targets should be easy to reach
- ✅ Primary buttons: min 48x48px (mobile), 44x44px (desktop)
- ✅ Touch targets: min 44x44px spacing between interactive elements
- ✅ Place primary actions in easy-reach zones

**Hick's Law**: Reduce choice to reduce decision time
- ✅ Limit primary actions to 3-5 per screen
- ✅ Use progressive disclosure for advanced options
- ✅ Group related actions

**Miller's Law**: Chunk information (5-7 items)
- ✅ Group form fields in logical sections
- ✅ Limit navigation items to 5-7
- ✅ Use visual grouping (cards, sections)

**Visual Hierarchy**: Guide user attention
- ✅ Primary action: Contained button (filled)
- ✅ Secondary action: Outlined button
- ✅ Tertiary action: Text button
- ✅ Use typography scale (h1 → h6 → body)

---

## 🎨 STYLING RULES (ZERO TOLERANCE)

### CRITICAL: No Arbitrary Styling

**FORBIDDEN:**
```typescript
// ❌ NEVER DO THIS
<Box sx={{ backgroundColor: '#ff0000' }}>
<Button sx={{ padding: '13px', margin: '7px' }}>
<Card sx={{ borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
const styles = { color: '#333333', fontSize: '15px' }
```

**REQUIRED:**
```typescript
// ✅ ALWAYS DO THIS
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.customShadows.md,
}));
```

### Styling Hierarchy

**1. styled() Components (PRIMARY METHOD)**
- Use for ALL component styling
- Always in separate `styles.ts` file
- Access theme via `({ theme }) => ({})`

**2. Theme Overrides (GLOBAL CHANGES)**
- Located in `/theme/overrides/`
- Only for global component defaults

**3. sx prop (FORBIDDEN FOR PRODUCTION)**
- Only for quick prototyping experiments
- Must be replaced with `styled()` before commit

### File Structure for Styled Components

```typescript
// components/MyComponent/styles.ts
import { styled } from '@mui/material/styles';
import { Card, Button, Typography } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background[1],
  boxShadow: theme.customShadows.md,
}));

export const PrimaryButton = styled(Button)(({ theme }) => ({
  minHeight: 48, // Fitts's Law: Easy to tap
  minWidth: 120,
  textTransform: 'none', // Override MUI default if needed
}));

// components/MyComponent/index.tsx
import { StyledCard, PrimaryButton } from './styles';

export const MyComponent = () => {
  return (
    <StyledCard>
      <PrimaryButton variant="contained" color="primary">
        Action
      </PrimaryButton>
    </StyledCard>
  );
};
```

---

## 🏗️ COMPONENT STRUCTURE (MANDATORY)
# **Updated claude.md Section: Component Versioning**

Add this section after `## 🏗️ COMPONENT STRUCTURE (MANDATORY)` and before `### Smart vs Dumb Component Rules`:

---

## 🔢 COMPONENT VERSIONING (MANDATORY)

### Version Structure

All components follow a strict versioning structure to track iterations:

```
components/
├── Section/
│   ├── version1/
│   │   ├── Header.tsx
│   │   ├── Content.tsx
│   │   ├── styles.ts
│   │   └── index.tsx       # Exports Section v1
│   ├── version2/
│   │   ├── Header.tsx
│   │   ├── Content.tsx
│   │   ├── Footer.tsx      # New in v2
│   │   ├── styles.ts
│   │   └── index.tsx       # Exports Section v2
│   └── index.tsx           # Exports latest version (v2)
│
├── Field/
│   ├── version1/
│   │   ├── Label.tsx
│   │   ├── Input.tsx
│   │   ├── styles.ts
│   │   └── index.tsx
│   └── index.tsx           # Exports latest (v1)
```

### Folder Naming Rules

**REQUIRED:**
- Version folders: `version1`, `version2`, `version3` (lowercase, no spaces)
- Component folders: `PascalCase` (e.g., `Section`, `Field`)
- Sub-components: `PascalCase` (e.g., `Header.tsx`, `Content.tsx`)

**FORBIDDEN:**
- ❌ `v1`, `V1`, `Version1`, `section-v1`
- ❌ Mixing versions in same folder

### Version Documentation

**Every version folder MUST include:**

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

Create a new version when:
- ✅ **Breaking changes** to props interface
- ✅ **Major structural changes** (new sub-components, different layout)
- ✅ **Significant behavior changes** (different interactions, states)
- ✅ **Design system updates** (new theme, different principles applied)

**DO NOT** create new version for:
- ❌ Bug fixes
- ❌ Minor styling tweaks
- ❌ Performance optimizations
- ❌ Adding optional props (non-breaking)

### Sub-Component Rules

**Each version can have multiple sub-components:**

```typescript
// components/Section/version2/Header.tsx
export const Header = ({ title, onToggle }: HeaderProps) => { ... };

// components/Section/version2/Content.tsx
export const Content = ({ children }: ContentProps) => { ... };

// components/Section/version2/Footer.tsx
export const Footer = ({ actions }: FooterProps) => { ... };

// components/Section/version2/index.tsx
import { Header } from './Header';
import { Content } from './Content';
import { Footer } from './Footer';

export const Section = ({ ... }: SectionProps) => {
  return (
    <SectionContainer>
      <Header {...headerProps} />
      <Content>{children}</Content>
      <Footer {...footerProps} />
    </SectionContainer>
  );
};
```

**Sub-component structure:**
- Each sub-component has own file
- Sub-components are NOT exported from version folder (internal only)
- Only main component exported from `index.tsx`

### Main Export Pattern

```typescript
// components/Section/index.tsx (root level)

/**
 * Section Component - Latest Version Export
 * 
 * This file exports the LATEST stable version.
 * Import older versions explicitly if needed.
 */

// Export latest version (v2)
export { Section } from './version2';
export type { SectionProps } from './version2/types';

// For legacy support, users can import specific versions:
// import { Section as SectionV1 } from '@/components/Section/version1';
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

### Version Comparison Documentation

**For component showcase (`/components` route):**

```typescript
// app/components/section/page.tsx
import { SectionV1 } from '@/components/Section/version1';
import { SectionV2 } from '@/components/Section/version2';

export default function SectionShowcase() {
  return (
    <ComponentShowcase
      componentName="Section"
      versions={[
        {
          version: 1,
          component: <SectionV1 {...props} />,
          description: "Initial version with basic collapse",
          changes: "Initial implementation"
        },
        {
          version: 2,
          component: <SectionV2 {...props} />,
          description: "Added footer, improved animations",
          changes: "Split Header/Content/Footer, better UX"
        }
      ]}
    />
  );
}
```

### Version Checklist

Before creating a new version:

- [ ] **Is this a breaking change?** (If no, update current version)
- [ ] **Does this warrant separate version?** (Major changes only)
- [ ] **Are all changes documented?** (Version header comment)
- [ ] **Migration notes provided?** (How to upgrade from previous)
- [ ] **Sub-components properly structured?** (Separate files)
- [ ] **All styling in styles.ts?** (No sx props)
- [ ] **Design principles documented?** (Which UX laws apply)
- [ ] **Previous version still works?** (Don't break existing prototypes)

### Version Naming in Prompts

When requesting component creation, specify version:

```
"Create Section component (version 2) with the following changes..."
"Update Field component - create version 3 with..."
```

### Current Component Versions (Registry)

Maintain this list as components are created:

| Component | Latest Version | Created | Changes |
|-----------|----------------|---------|---------|
| Field | version 1 | 2025-01-15 | Initial: Drag handle, inline edit, icons |
| Section | version 2 | 2025-01-15 | v2: Split Header/Content/Footer |
| AppBar | version 1 | 2025-01-15 | Initial: Basic navigation bar |
| FieldDrawer | version 1 | 2025-01-15 | Initial: Left sidebar for field library |
| DraggableButton | version 1 | 2025-01-15 | Initial: Colored dot buttons |
| FieldConfigDrawer | version 1 | 2025-01-15 | Initial: Right drawer for config |


### Smart vs Dumb Component Rules

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

### Component Creation Checklist

Before creating ANY component, verify:

- [ ] **Is this presentational or stateful?**
  - Presentational → `components/`
  - Stateful → `features/`
- [ ] **Folder named in PascalCase** (e.g., `Section`, `FormBuilder`)
- [ ] **Main component in `index.tsx`**
- [ ] **ALL styled() calls in `styles.ts`** (ZERO in index.tsx)
- [ ] **Props defined in `types.ts`** (if complex)
- [ ] **Design principles documented in comments**
- [ ] **Interactions are functional** (not placeholder)

### Example Structure

```typescript
// components/Section/types.ts
export interface SectionProps {
  id: string;
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  onEdit: (newTitle: string) => void;
  onAddField: () => void;
  children?: React.ReactNode;
}

// components/Section/styles.ts
import { styled } from '@mui/material/styles';
import { Card, IconButton, Typography } from '@mui/material';

export const SectionContainer = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background[1],
  boxShadow: theme.customShadows.md,
  // Jakob's Law: Familiar card-based layout
}));

export const SectionHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  cursor: 'pointer',
  // Fitts's Law: Full header is clickable (larger target)
}));

export const ExpandButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(1),
  // Fitts's Law: 44x44px minimum touch target
}));

// components/Section/index.tsx
import { useState } from 'react';
import { SectionContainer, SectionHeader, ExpandButton } from './styles';
import { SectionProps } from './types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

/**
 * Section Component
 * 
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar collapsible card pattern (like Accordion)
 * - Fitts's Law: Full header clickable, 44x44px icon buttons
 * - Visual Hierarchy: Clear title, subtle action buttons
 * - Progressive Disclosure: Expand/collapse to manage cognitive load
 * 
 * INTERACTIONS:
 * - Click header: Toggle expand/collapse
 * - Click title: Inline edit mode
 * - Hover header: Show action buttons
 * - Click "Add Field": Trigger onAddField callback
 */
export const Section = ({ 
  id, 
  title, 
  isExpanded, 
  onToggle, 
  onEdit,
  onAddField,
  children 
}: SectionProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <SectionContainer>
      <SectionHeader onClick={onToggle}>
        <ExpandButton size="small">
          <ExpandMoreIcon 
            sx={{ 
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s'
            }} 
          />
        </ExpandButton>
        {/* Title, edit mode, action buttons, etc. */}
      </SectionHeader>
      
      {isExpanded && (
        <div>
          {children}
          {/* Add Field button */}
        </div>
      )}
    </SectionContainer>
  );
};
```

---

## 🎨 THEME USAGE (STRICT REFERENCE)

### Color Palette

**Primary (WizyVision Red)**
```typescript
theme.palette.primary[1]   // '#fde9e8' - Lightest
theme.palette.primary[5]   // '#eb4236' - Main (brand color)
theme.palette.primary[10]  // '#6b110b' - Darkest
theme.palette.primary.main // Same as [5]
theme.palette.primary.light // Same as [4]
theme.palette.primary.dark // Same as [7]
```

**Secondary (Cyan/Teal)**
```typescript
theme.palette.secondary[1]  // '#e8fbfd' - Lightest
theme.palette.secondary[5]  // '#36dfeb' - Main
theme.palette.secondary[11] // '#021617' - Darkest
```

**Background (Grays)**
```typescript
theme.palette.background[1] // '#ffffff' - White
theme.palette.background[2] // '#fafafa' - Lightest gray
theme.palette.background[3] // '#f5f5f5' - Very light gray
theme.palette.background[4] // '#f0f0f0' - Light gray
theme.palette.background[5] // '#ededed' - Subtle gray
```

**Text Colors**
```typescript
theme.palette.text.primary    // '#262626' - Main text
theme.palette.text.secondary  // '#595959' - Secondary text
theme.palette.text.disabled   // '#bfbfbf' - Disabled
```

### Spacing

```typescript
theme.spacing(1)  // 8px
theme.spacing(2)  // 16px
theme.spacing(3)  // 24px
theme.spacing(4)  // 32px
// Use only theme.spacing(), NEVER hardcoded px values
```

### Typography

```typescript
theme.typography.h1  // 32px, weight 600
theme.typography.h2  // 24px, weight 600
theme.typography.h5  // 16px, weight 500
theme.typography.body1  // 16px, weight 400
theme.typography.body2  // 14px, weight 400
theme.typography.button // 14px, weight 500, uppercase
```

### Shadows

```typescript
theme.customShadows.button  // Button shadow
theme.customShadows.sm      // Small elevation
theme.customShadows.md      // Medium elevation (cards)
theme.customShadows.lg      // Large elevation (modals)
```

### Border Radius

```typescript
theme.shape.borderRadius  // 4px (buttons)
12                        // 12px (cards) - use directly
```

---

## ⚙️ INTERACTIVITY (REQUIRED)

### Every Interactive Component Must Have:

1. **Hover States**
   ```typescript
   '&:hover': {
     backgroundColor: theme.palette.action.hover,
   }
   ```

2. **Active/Focus States**
   ```typescript
   '&:active': {
     backgroundColor: theme.palette.action.selected,
   },
   '&:focus-visible': {
     outline: `2px solid ${theme.palette.primary.main}`,
   }
   ```

3. **Disabled States**
   ```typescript
   '&:disabled': {
     opacity: theme.palette.action.disabledOpacity,
     cursor: 'not-allowed',
   }
   ```

4. **Loading States** (if applicable)
   ```typescript
   {isLoading && <CircularProgress size={20} />}
   ```

5. **Transitions** (smooth animations)
   ```typescript
   transition: theme.transitions.create(['background-color', 'transform'], {
     duration: theme.transitions.duration.short,
   })
   ```

### Interaction Checklist

- [ ] Hover changes visual state (background, border, shadow)
- [ ] Click provides feedback (ripple effect, state change)
- [ ] Focus is visible (outline, border)
- [ ] Disabled state is clear (opacity, cursor)
- [ ] Transitions are smooth (200-300ms)
- [ ] Keyboard navigation works (Tab, Enter, Escape)

---

## 📱 RESPONSIVE DESIGN (REQUIRED)

### Breakpoints

```typescript
theme.breakpoints.up('xs')  // 0px - Mobile
theme.breakpoints.up('sm')  // 600px - Mobile landscape
theme.breakpoints.up('md')  // 900px - Tablet
theme.breakpoints.up('lg')  // 1200px - Desktop
theme.breakpoints.up('xl')  // 1536px - Large desktop
```

### Mobile-First Approach

```typescript
const ResponsiveCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2), // Mobile default
  
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3), // Tablet+
  },
  
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(4), // Desktop+
  },
}));
```

### Touch Targets (Mobile)

- Minimum 44x44px for all interactive elements
- Use `minHeight: 44` and `minWidth: 44` in styled components
- Increase spacing between touch targets on mobile

---

## 🚫 COMMON MISTAKES (NEVER DO THIS)

### 1. Mixing Styled Components with sx Prop
```typescript
// ❌ WRONG
const StyledCard = styled(Card)(({ theme }) => ({ ... }));
<StyledCard sx={{ margin: 2 }} /> // Don't mix!

// ✅ CORRECT
const StyledCard = styled(Card)(({ theme }) => ({ 
  margin: theme.spacing(2),
}));
<StyledCard />
```

### 2. Hardcoded Values
```typescript
// ❌ WRONG
padding: '15px'
color: '#eb4236'
fontSize: '14px'

// ✅ CORRECT
padding: theme.spacing(2)
color: theme.palette.primary.main
fontSize: theme.typography.body2.fontSize
```

### 3. Non-Interactive "Interactive" Components
```typescript
// ❌ WRONG - No hover state
const Button = styled('button')({ ... });

// ✅ CORRECT - Full interactivity
const Button = styled('button')(({ theme }) => ({
  '&:hover': { backgroundColor: theme.palette.action.hover },
  '&:active': { backgroundColor: theme.palette.action.selected },
  '&:disabled': { opacity: 0.38 },
  transition: theme.transitions.create('background-color'),
}));
```

### 4. Missing Design Principle Documentation
```typescript
// ❌ WRONG - No documentation
export const MyComponent = () => { ... }

// ✅ CORRECT - Documented
/**
 * MyComponent
 * 
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: [explanation]
 * - Fitts's Law: [explanation]
 */
export const MyComponent = () => { ... }
```

### 5. Component in Wrong Directory
```typescript
// ❌ WRONG
components/FormBuilder/index.tsx  // Has useState, useEffect
features/Button/index.tsx         // Just renders a button

// ✅ CORRECT
features/FormBuilder/index.tsx    // Stateful feature
components/Button/index.tsx       // Presentational component
```

---

## ✅ CODE REVIEW CHECKLIST

Before committing ANY code, verify:

### Structure
- [ ] Component in correct directory (`components/` vs `features/`)
- [ ] Folder named in PascalCase
- [ ] Main component in `index.tsx`
- [ ] Styled components in `styles.ts`
- [ ] Types in `types.ts` (if needed)

### Styling
- [ ] ZERO sx prop usage (except quick prototypes)
- [ ] ALL styling uses `styled()`
- [ ] ALL colors from `theme.palette.*`
- [ ] ALL spacing from `theme.spacing()`
- [ ] ALL typography from `theme.typography.*`
- [ ] No hardcoded values anywhere

### Design Principles
- [ ] Design principles documented in comments
- [ ] At least 2 UX laws explicitly applied
- [ ] Touch targets 44x44px minimum
- [ ] Visual hierarchy clear (primary/secondary/tertiary)
- [ ] Limited choices (3-5 primary actions)

### Interactivity
- [ ] Hover states defined
- [ ] Active/focus states defined
- [ ] Disabled states (if applicable)
- [ ] Smooth transitions
- [ ] Keyboard navigation works

### Responsive
- [ ] Mobile-first breakpoints
- [ ] Touch targets sized correctly
- [ ] Layout adapts to screen size

### Accessibility
- [ ] ARIA labels where needed
- [ ] Keyboard navigation
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA

---

## 🎯 PROTOTYPE-SPECIFIC RULES

### Component Showcase Page Requirements

When building `/components` route:

1. **Drawer Navigation**
   - List all components alphabetically
   - Highlight active component
   - Sticky/fixed position

2. **Component Display**
   - Component name as h1
   - Short description
   - Interactive demo at top
   - Props table below
   - Variants section (empty, filled, error, disabled, etc.)

3. **Variant Display**
   - Each variant in separate card
   - Label for each variant
   - Code snippet (optional)

### Example Component Showcase Structure

```typescript
// app/components/[componentName]/page.tsx
import { ComponentDemo } from '@/features/ComponentShowcase';
import { Section } from '@/components/Section';

export default function SectionShowcase() {
  return (
    <ComponentDemo
      componentName="Section"
      description="Collapsible container for grouping form fields"
      principles={[
        "Jakob's Law: Familiar accordion pattern",
        "Fitts's Law: Full header clickable",
        "Progressive Disclosure: Expand/collapse"
      ]}
      variants={[
        {
          name: "Default (Collapsed)",
          component: <Section title="System Information" isExpanded={false} />
        },
        {
          name: "Expanded",
          component: <Section title="System Information" isExpanded={true} />
        },
        {
          name: "With Fields",
          component: <Section title="System Information" isExpanded={true}>
            {/* Fields */}
          </Section>
        }
      ]}
    />
  );
}
```

---

## 📦 TECH STACK (REFERENCE)

- **Framework**: Next.js 14 (App Router)
- **UI Library**: Material UI v5
- **Form Management**: React Hook Form v7
- **Drag & Drop**: dnd-kit
- **State Management**: React Query v5
- **Styling**: MUI styled() + theme

### Import Patterns

```typescript
// MUI Components
import { Box, Card, Button, Typography, Stack } from '@mui/material';

// MUI Icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

// MUI Styling
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

// Theme
import { designTokens } from '@/theme/designTokens';
```

---

## 🚀 DEVELOPMENT WORKFLOW

1. **Understand the requirement**
   - What page/component am I building?
   - Is it smart (features) or dumb (components)?
   - What UX principles apply?

2. **Create the structure**
   - Create folder in correct directory
   - Create `index.tsx`, `styles.ts`, `types.ts`

3. **Define types first** (types.ts)
   - Props interface
   - State types
   - Event handlers

4. **Create styled components** (styles.ts)
   - Use theme values only
   - Apply responsive breakpoints
   - Add hover/active/focus states

5. **Build the component** (index.tsx)
   - Document design principles
   - Implement interactivity
   - Add keyboard navigation

6. **Test interactivity**
   - Hover, click, keyboard
   - Mobile touch targets
   - Responsive breakpoints

7. **Review against checklist**
   - Run through Code Review Checklist
   - Fix any issues
   - Commit

---

## 🎓 EXAMPLES

### Complete Component Example

See `components/Section/` for a complete example that follows ALL rules:
- Proper structure (index.tsx, styles.ts, types.ts)
- Design principles documented
- Full interactivity (hover, click, keyboard)
- Theme-based styling only
- Responsive design
- Accessibility

---

## 📞 WHEN IN DOUBT

Ask yourself:
1. Does this follow the theme? (colors, spacing, typography)
2. Are design principles applied and documented?
3. Is it interactive? (hover, click, keyboard)
4. Is it in the right directory? (components vs features)
5. Are styled components in styles.ts?
6. Would a user find this familiar and easy to use?

If any answer is "no" or "unsure", STOP and fix it before proceeding.

---

**REMEMBER**: This is a prototype for stakeholder feedback. Quality > Speed. Follow these rules strictly to ensure consistent, professional output.