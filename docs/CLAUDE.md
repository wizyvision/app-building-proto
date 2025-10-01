# WizyVision Form Builder Prototype - Technical Setup

## Project Overview
Build a prototype for WizyVision's form builder redesign focusing on device-based layouts (mobile/tablet/desktop). This prototype will be used for stakeholder feedback throughout Q4 2025.

## Tech Stack Requirements

### Core Framework
- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**

### UI & Styling
- **Material UI v5** (components, icons, styles)
  - Use `@mui/material` for components
  - Use `@mui/icons-material` for icons
  - Use MUI's styling solution (`styled`, `sx` prop)
  - Theme: Use the configured WizyVision MUI theme

### Form Management
- **React Hook Form v7**
  - Use for all form state management
  - Validation with built-in validators
  - Performance optimization with controlled/uncontrolled inputs

### Data Fetching & State
- **React Query v5** (TanStack Query)
  - Mock API calls for prototype
  - Cache management
  - Optimistic updates

### Drag & Drop
- **dnd-kit**
  - Use `@dnd-kit/core` for drag and drop functionality
  - Use `@dnd-kit/sortable` for reorderable lists
  - Use `@dnd-kit/utilities` for helper functions

## Design System & Theme

### CRITICAL: Use Existing Theme Only

**All components MUST use the configured WizyVision theme from `/theme/muiTheme.ts`**

**DO NOT:**
- Create new color values
- Define custom spacing outside theme
- Add arbitrary styles
- Use hardcoded colors or dimensions

**DO:**
- Use `theme.palette.primary.main` for colors
- Use `theme.spacing(2)` for spacing
- Use MUI components styled via theme
- Reference design tokens from `designTokens.ts`

**If a component doesn't align with the theme:**
- Modify the component to use theme values
- Extend the theme if absolutely necessary
- Document why theme extension was needed

### Design Principles to Apply

When designing any component, apply these UX principles:

**Jakob's Law:**
- Users expect patterns similar to other products they know
- Use familiar UI patterns (tabs, dropdowns, drag handles)
- Don't reinvent standard interactions

**Fitts's Law:**
- Important actions should be easy to reach
- Touch targets minimum 44x44px on mobile
- Primary buttons larger and more accessible than secondary

**Hick's Law:**
- Reduce choices to minimize decision time
- Limit options: 3-5 primary actions per screen
- Use progressive disclosure for advanced options

**Miller's Law:**
- Group related items in chunks of 5-7
- Don't overwhelm with too many fields at once
- Use sections to organize information

**Visual Hierarchy:**
- Most important actions: Primary button style
- Secondary actions: Outlined button style
- Tertiary actions: Text button style

**Consistency:**
- Use same patterns throughout
- Reuse components where possible
- Maintain spacing consistency

### WizyVision MUI Theme Configuration

**Theme Architecture:**
- **Design Tokens:** `/theme/designTokens.ts` - Single source of truth for all design values
- **Theme Config:** `/theme/muiTheme.ts` - MUI theme using design tokens
- **Component Overrides:** `/theme/overrides/` - Individual component style overrides
- **Theme Registry:** `/theme/ThemeRegistry.tsx` - Theme provider wrapper

**Colors (from Figma - WizyVision Design System):**

**Primary (Red):**
```typescript
primary: {
  1: '#fde9e8',    2: '#f9c2be',    3: '#f49b94',
  4: '#f0736a',    5: '#eb4236',    6: '#e82517',
  7: '#be1e13',    8: '#be1e13',    9: '#95180f',    10: '#6b110b',
  main: '#eb4236',      // WizyVision red (5)
  light: '#f0736a',     // (4)
  dark: '#be1e13',      // (7)
  lighter: '#f9c2be',   // (2)
  darker: '#95180f'     // (9)
}
```

**Secondary (Cyan/Teal):**
```typescript
secondary: {
  1: '#e8fbfd',    2: '#bef5f9',    3: '#94eef4',
  4: '#6ae7f0',    5: '#36dfeb',    6: '#17dae8',
  7: '#13b3be',    8: '#0f8c95',    9: '#0b646b',
  10: '#063d41',   11: '#021617',
  main: '#36dfeb',      // (5)
  light: '#6ae7f0',     // (4)
  dark: '#13b3be',      // (7)
  lighter: '#bef5f9',   // (2)
  darker: '#0b646b'     // (9)
}
```

**Text Colors (Day Scale 7-11 for body text):**
```typescript
text: {
  primary: '#262626',    // Day 10 - Main text
  secondary: '#595959',  // Day 8 - Secondary text
  title: '#262626',      // Day 10 - Titles
  disabled: '#bfbfbf',   // Day 6 - Disabled states
  divider: '#f0f0f0',    // Day 4 - Dividers
  day: {
    7: '#8c8c8c',   8: '#595959',   9: '#434343',
    10: '#262626',  11: '#1f1f1f'
  }
}
```

**Component-Specific Colors:**
```typescript
component: {
  adminSidebar: { background: '#4e546c', iconColor: '#a7b6c4', ... },
  appBar: { userView: '#ffffff', adminView: '#eb4236' },
  searchBar: { fill: '#f8f8f8' },
  table: { header: '#fafafa', highlight: '#f5f5f5', ... }
}
form: {
  label: '#797979',
  thumbnailButton: '#ededed'
}
```

**Typography:**
- Font: Public Sans, Helvetica, Arial
- H1: 32px, weight 600, line-height 1.2, letter-spacing -0.01em
- H2: 24px, weight 600, line-height 1.3, letter-spacing -0.005em
- H3: 20px, weight 500, line-height 1.4
- H4: 18px, weight 500, line-height 1.4
- H5: 16px, weight 500, line-height 1.5
- H6: 14px, weight 500, line-height 1.5
- Body1: 16px, weight 400, line-height 1.5
- Body2: 14px, weight 400, line-height 1.43
- Button (medium): 14px, weight 500, letter-spacing 0.025em, uppercase
- Caption: 12px, weight 400, letter-spacing 0.02em
- Overline: 12px, weight 500, letter-spacing 0.1em, uppercase

**Spacing:**
- Base unit: 8px
- Use `theme.spacing(1)` = 8px
- Use `theme.spacing(2)` = 16px
- Use `theme.spacing(3)` = 24px

**Component Styling:**
- Cards: 12px border radius, 24px padding
- Buttons: 4px border radius, various padding per size
  - Small: 1px 8px
  - Medium: 9px 16px
  - Large: 10px 16px
- Touch targets: 48x48px minimum (buttons), 44x44px minimum (general)

**Responsive Breakpoints:**
```typescript
xs: 0px      // Mobile
sm: 600px    // Mobile landscape
md: 900px    // Tablet
lg: 1200px   // Desktop
xl: 1536px   // Large desktop
```

**Grid System:**
- Mobile: 4 columns, 16px gutter, 16px margin
- Tablet: 8 columns, 24px gutter, 24px margin
- Desktop: 12 columns, 24px gutter, 24px margin

**Effect Styles:**

**Shadows:**
- button: `0px 2px 0px 0px rgba(0, 0, 0, 0.04)` (Figma button shadow)
- sm: `0px 1px 2px rgba(0, 0, 0, 0.05)`
- md: `0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)`
- lg: `0px 4px 6px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.06)`
- xl: `0px 10px 15px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.05)`
- 2xl: `0px 20px 25px rgba(0, 0, 0, 0.15), 0px 10px 10px rgba(0, 0, 0, 0.04)`

**Custom Shadows (theme.customShadows):**
Available for all color variants: z1, z2, primary, secondary, error, warning, info, success, grey
Plus button-specific: primaryButton, secondaryButton, errorButton, etc.

**Blur:**
- sm: 4px, md: 8px, lg: 16px, xl: 24px

**Opacity:**
- disabled: 0.38, hover: 0.04, selected: 0.08, focus: 0.12, active: 0.12

**Transitions:**
- Duration: shortest (150ms), shorter (200ms), short (250ms), standard (300ms), complex (375ms)
- Easing: easeInOut, easeOut, easeIn, sharp

### How to Style Components

**CRITICAL: Use styled() or MUI's styling system, NOT sx prop for component styling**

**Access Design Tokens:**
```typescript
import { designTokens } from '@/theme/designTokens'

// Use tokens directly for consistency
const buttonPadding = designTokens.button.padding.medium
const primaryColor = designTokens.colors.primary.main
const textColor = designTokens.colors.text.day[8]
```

**Method 1: styled() Component (PREFERRED):**
```typescript
import { styled } from '@mui/material/styles'
import { Card, Button, Typography, Box } from '@mui/material'

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.customShadows.md,
  backgroundColor: theme.palette.background[3],
}))

const StyledTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.title,
  marginBottom: theme.spacing(2),
}))

const HighlightBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary[2],
  color: theme.palette.primary[9],
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}))

function MyComponent() {
  return (
    <StyledCard>
      <StyledTitle variant="h5">
        Title
      </StyledTitle>

      <HighlightBox>
        Light primary background
      </HighlightBox>

      <Button
        variant="contained"
        color="primary"
        size="medium"
      >
        Save
      </Button>
    </StyledCard>
  )
}
```

**Method 2: Component Override in Theme (for global styles):**
See `/theme/overrides/` directory for examples.

**Method 3: sx prop (USE SPARINGLY - only for one-off adjustments):**
```typescript
// Only use sx for quick prototyping or very specific one-off cases
<Box sx={{ mt: 2 }}>Content</Box>  // ⚠️ Acceptable for simple margin/padding tweaks
```

**DO NOT use sx for:**
- Complex styling
- Reusable components
- Multiple style properties
- Production code

**USE styled() instead for:**
- All component styling
- Reusable styled components
- Complex styling logic
- Production-ready code

**Available Color Shades via Theme:**
```typescript
// Primary shades (1-10)
theme.palette.primary[1]  // '#fde9e8' - Lightest
theme.palette.primary[5]  // '#eb4236' - Main (same as .main)
theme.palette.primary[10] // '#6b110b' - Darkest

// Secondary shades (1-11)
theme.palette.secondary[1]  // '#e8fbfd' - Lightest
theme.palette.secondary[5]  // '#36dfeb' - Main
theme.palette.secondary[11] // '#021617' - Darkest

// Background shades (1-5)
theme.palette.background[1] // '#ffffff' - White
theme.palette.background[2] // '#fafafa' - Lightest gray
theme.palette.background[3] // '#f5f5f5' - Very light gray
theme.palette.background[4] // '#f0f0f0' - Light gray
theme.palette.background[5] // '#ededed' - Subtle gray

// Semantic shortcuts
theme.palette.primary.lighter   // Same as [2]
theme.palette.primary.light     // Same as [4]
theme.palette.primary.main      // Same as [5]
theme.palette.primary.dark      // Same as [7]
theme.palette.primary.darker    // Same as [9]
```

**Override Components Properly:**
Create file in `/theme/overrides/ComponentName.ts`:
```typescript
import { Theme } from '@mui/material/styles'
import { designTokens } from '../designTokens'

export default function ComponentName(theme: Theme) {
  return {
    MuiComponentName: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.button,
          // Use designTokens, not arbitrary values
        }
      }
    }
  }
}
```

**Incorrect vs Correct Usage:**

```typescript
// ❌ WRONG - Hardcoded colors with sx
<Button sx={{ backgroundColor: '#ff0000' }}>Save</Button>
<Box sx={{ backgroundColor: '#ffffff' }}>Content</Box>

// ❌ WRONG - Using sx for complex styling
<Card sx={{
  padding: '24px',
  backgroundColor: '#fafafa',
  borderRadius: '8px'
}}>Content</Card>

// ✅ CORRECT - Use styled() with theme
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}))

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background[1],
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}))

// ❌ WRONG - Arbitrary values
<Card sx={{ padding: '13px', borderRadius: '5px' }}>Content</Card>

// ✅ CORRECT - Theme values with styled()
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}))
```

## Lo-Fi Design Generation

**When the user provides "lo-fi" or requests a design concept:**

1. **Start with a Component** - Always create a functional React component first
2. **Apply Design Principles** - Explicitly apply relevant UX laws:
   - **Jakob's Law**: Use familiar patterns users recognize
   - **Fitts's Law**: Make important actions easy to reach (proper touch targets)
   - **Hick's Law**: Limit choices to 3-5 primary actions
   - **Miller's Law**: Group items in chunks of 5-7
   - **Visual Hierarchy**: Primary → Outlined → Text button styles
3. **Use Theme Styling** - Apply WizyVision theme via styled() components
4. **Make it Responsive** - Consider mobile/tablet/desktop breakpoints
5. **Document Design Decisions** - Comment why each principle was applied

**Lo-Fi Example:**
```typescript
import { styled } from '@mui/material/styles'
import { Card, Button, Typography, Stack } from '@mui/material'

// Jakob's Law: Familiar card-based layout
// Fitts's Law: Large button (48px) for primary action
const ActionCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 400,
  // Visual Hierarchy: Card elevation distinguishes importance
  boxShadow: theme.customShadows.md,
}))

// Hick's Law: Limited to 2 actions (primary + secondary)
const ActionButton = styled(Button)(({ theme }) => ({
  minHeight: 48, // Fitts's Law: Easy to tap
}))

function FormSubmitCard() {
  return (
    <ActionCard>
      {/* Visual Hierarchy: Title is prominent */}
      <Typography variant="h5" gutterBottom>
        Save Your Changes?
      </Typography>

      {/* Miller's Law: Simple 2-item choice */}
      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <ActionButton variant="contained" color="primary" fullWidth>
          Save
        </ActionButton>
        <ActionButton variant="outlined" fullWidth>
          Cancel
        </ActionButton>
      </Stack>
    </ActionCard>
  )
}
```

## Component Structure Convention

**CRITICAL: Separate smart components (features) from dumb components (components):**

### Directory Structure

```
components/                   # DUMB COMPONENTS (presentational only)
  ├── {ComponentName}/        # Component folder in PascalCase
  │   ├── index.tsx          # Main component (props in, UI out)
  │   ├── styles.ts          # Styled components (all styled() calls)
  │   └── types.ts           # Optional: component-specific types

features/                     # SMART COMPONENTS (business logic + state)
  ├── {FeatureName}/         # Feature name in PascalCase (e.g., Home, FormBuilder)
  │   ├── index.tsx          # Main feature integration/export
  │   ├── styles.ts          # Styled components (all styled() calls)
  │   ├── SubComponent1.tsx  # Feature-specific sub-components
  │   ├── SubComponent2.tsx
  │   └── types.ts           # Optional: feature-specific types
```

### Smart vs Dumb Components

**Dumb Components (components/):**
- ✅ Pure presentational components
- ✅ Receive data via props only
- ✅ No state management (except UI state like hover, focus)
- ✅ No business logic
- ✅ Reusable across features
- ✅ Examples: Button, Field, Section, Card, Input

**Smart Components (features/):**
- ✅ Container/feature components
- ✅ Manage state (useState, useContext, etc.)
- ✅ Handle business logic
- ✅ Connect to APIs/services
- ✅ Compose dumb components
- ✅ Examples: Home, FormBuilder, UserProfile, Dashboard

**Examples:**

```typescript
// ✅ CORRECT - Dumb components (presentational)
components/Field/index.tsx           // Pure Field component (props only)
components/Field/styles.ts           // All styled() MUI components
components/Section/index.tsx         // Pure Section component (props only)
components/Section/styles.ts         // All styled() MUI components
components/Button/index.tsx          // Pure Button component

// ✅ CORRECT - Smart components (features)
features/Home/index.tsx              // Home feature with state & logic
features/Home/styles.ts              // Styled components for Home
features/FormBuilder/index.tsx       // FormBuilder with state management
features/FormBuilder/styles.ts       // Styled components
features/FormBuilder/FieldList.tsx   // Feature-specific sub-component
features/FormBuilder/SectionList.tsx // Feature-specific sub-component

// ❌ WRONG - State management in components/
components/Field/index.tsx
// Contains useState, useEffect, business logic (should be in features/)

// ❌ WRONG - Pure presentation in features/
features/Button/index.tsx
// Just renders a styled button with no logic (should be in components/)

// ❌ WRONG - Styled components mixed in index.tsx
components/Field/index.tsx
// Contains both component logic AND styled() calls (should be separated)

// ❌ WRONG - lowercase names
components/field/index.tsx
features/form-builder/index.tsx
```

**Rules:**
1. **Component folders** use PascalCase (e.g., `Field`, `Section`, `FormBuilder`)
2. **Dumb components** go in `components/` - presentational only, no state/logic
3. **Smart components** go in `features/` - state management, business logic
4. **Styled components** MUST be in separate `styles.ts` file - NEVER mix styled() calls with component logic
5. **Main component** always in `index.tsx` of the component/feature folder
6. **Sub-components** live in the same folder (features only)
7. **Export pattern**: Can have a file named after component that re-exports: `export * from './ComponentName'`

### Styled Components File Pattern

**CRITICAL: All styled() calls must be in a separate styles.ts file**

```typescript
// ❌ WRONG - index.tsx with styled() calls mixed in
// components/FormBuilder/Field/index.tsx
import { styled } from '@mui/material/styles';

const FieldContainer = styled(Box)(({ theme }) => ({...}));
const DragHandle = styled(IconButton)(({ theme }) => ({...}));

export const Field = () => {
  return <FieldContainer>...</FieldContainer>
}

// ✅ CORRECT - Separate styles.ts file
// components/FormBuilder/Field/styles.ts
import { styled } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';

export const FieldContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isDragging',
})<{ isDragging: boolean }>(({ theme, isDragging }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  // ... all styles
}));

export const DragHandle = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'isVisible',
})<{ isVisible: boolean }>(({ theme, isVisible }) => ({
  opacity: isVisible ? 1 : 0,
  // ... all styles
}));

// components/FormBuilder/Field/index.tsx
import { FieldContainer, DragHandle } from './styles';

export const Field = () => {
  return <FieldContainer>...</FieldContainer>
}
```

**Benefits:**
- Clean separation of concerns (styling vs logic)
- Easier to maintain and update styles
- Better code organization and readability
- Styles can be imported and reused across sub-components

## Component Design Checklist

When creating any component, verify:

- [ ] **Follows component structure convention** (PascalCase, index.tsx for integration)
- [ ] **Styled components in separate styles.ts** (NEVER mix styled() with component logic)
- [ ] Uses `styled()` or theme overrides (NOT sx prop for styling)
- [ ] Uses theme colors (`theme.palette.*`)
- [ ] Uses theme spacing (`theme.spacing()`)
- [ ] Uses theme typography (`theme.typography.*`)
- [ ] Explicitly applies relevant UX law (Jakob's, Fitts's, Hick's, Miller's)
- [ ] Touch targets are 44x44px minimum on mobile
- [ ] Responsive across breakpoints
- [ ] Accessible (ARIA labels, keyboard navigation)
- [ ] Consistent with other WizyVision components
- [ ] No hardcoded values or arbitrary styling
- [ ] Design decisions are documented in comments

## Prototype Scope

### Include:
- Device preview toggle (mobile/tablet/desktop)
- Pages list with create/reorder
- Sections list with create/reorder
- Fields list with drag-to-reorder between sections
- Visual distinction between device layouts
- Mock data pre-populated

### Exclude (Out of Scope):
- Backend API integration
- User authentication
- Full CRUD (focus on read/create/reorder only)
- Field type configuration details
- Production error handling
- Data persistence

## Success Criteria
- Prototype loads and displays mock form structure
- Device toggle changes preview container size
- Pages/sections/fields can be reordered via drag & drop
- **All UI follows WizyVision theme strictly**
- **All styling uses styled() components, NOT sx prop**
- **Design principles are explicitly applied and documented**
- **Lo-fi designs start with functional components**
- Responsive on actual devices
- Code is clean, commented, and component-based
- No hardcoded colors, spacing, or arbitrary values

## Notes
- This is a prototype for gathering feedback, not production code
- Prioritize speed and clarity over completeness
- Use mock data liberally
- Focus on demonstrating the device-based layout concept
- **MOST IMPORTANT: Stick to the theme. No arbitrary styling.**