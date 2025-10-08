# Styling Rules

> **Purpose**: STRICT rules for how to style components. Zero tolerance for violations.

---

## 🚨 CRITICAL RULE: No Arbitrary Styling

### FORBIDDEN

```typescript
// ❌ NEVER DO THIS
<Box sx={{ backgroundColor: '#ff0000' }}>
<Button sx={{ padding: '13px', margin: '7px' }}>
<Card sx={{ borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
const styles = { color: '#333333', fontSize: '15px' }

// ❌ Hardcoded values
padding: '16px'
color: '#eb4236'
fontSize: '14px'

// ❌ Magic numbers
margin: '7px'
borderRadius: '5px'
```

### REQUIRED

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

---

## 📋 Styling Hierarchy

### 1. styled() Components (PRIMARY METHOD)

**USE FOR:**
- All component styling
- Production code
- Maintainable, theme-aware styles

**LOCATION:**
- Always in separate `styles.ts` file
- Access theme via `({ theme }) => ({})`

```typescript
// components/MyComponent/styles.ts
import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background[1],
}));
```

### 2. Theme Overrides (GLOBAL CHANGES)

**USE FOR:**
- Global component defaults (e.g., all buttons)
- MUI component customization

**LOCATION:**
- `/theme/overrides/`

```typescript
// theme/overrides/MuiButton.ts
export const MuiButton = {
  styleOverrides: {
    root: {
      textTransform: 'none',
    },
  },
};
```

### 3. sx prop (FORBIDDEN FOR PRODUCTION)

**ONLY FOR:**
- Quick prototyping experiments
- Temporary exploration

**RULE:**
- Must be replaced with `styled()` before commit
- Zero sx props in production code

---

## 📁 File Structure

### Component with Styles

```
components/MyComponent/
├── index.tsx      # Component logic
├── styles.ts      # ALL styled components
└── types.ts       # TypeScript interfaces (optional)
```

### styles.ts Pattern

```typescript
// components/MyComponent/styles.ts
import { styled } from '@mui/material/styles';
import { Card, Button, Typography } from '@mui/material';

// Export each styled component
export const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background[1],
  boxShadow: theme.customShadows.md,

  // Nested selectors
  '& .MuiTypography-root': {
    color: theme.palette.text.primary,
  },

  // Pseudo-classes
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },

  // Responsive
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
}));

export const PrimaryButton = styled(Button)(({ theme }) => ({
  minHeight: 48, // Fitts's Law: Easy to tap
  minWidth: 120,
  textTransform: 'none',
}));
```

### index.tsx Pattern

```typescript
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

## 🎯 Styling Patterns

### Theme Access

```typescript
const StyledComponent = styled(Box)(({ theme }) => ({
  // Access theme properties
  color: theme.palette.primary.main,
  padding: theme.spacing(2),
  ...theme.typography.body1,
}));
```

### Conditional Styling (Props)

```typescript
interface StyledBoxProps {
  variant?: 'primary' | 'secondary';
}

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'variant',
})<StyledBoxProps>(({ theme, variant }) => ({
  padding: theme.spacing(2),
  backgroundColor:
    variant === 'primary'
      ? theme.palette.primary.main
      : theme.palette.secondary.main,
}));

// Usage
<StyledBox variant="primary" />
```

### Pseudo-classes & States

```typescript
const StyledButton = styled(Button)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:active': {
    backgroundColor: theme.palette.action.selected,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
  },
  '&:disabled': {
    opacity: theme.palette.action.disabledOpacity,
    cursor: 'not-allowed',
  },
}));
```

### Nested Selectors

```typescript
const StyledCard = styled(Card)(({ theme }) => ({
  // Direct child
  '& > .MuiTypography-root': {
    marginBottom: theme.spacing(1),
  },

  // Any descendant
  '& .MuiButton-root': {
    marginTop: theme.spacing(2),
  },

  // Pseudo-element
  '&::before': {
    content: '""',
    display: 'block',
  },
}));
```

### Media Queries (Responsive)

```typescript
const ResponsiveBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2), // Mobile default

  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3), // Mobile landscape
  },

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4), // Tablet
  },

  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(5), // Desktop
  },
}));
```

---

## 🚫 Common Mistakes

### 1. Mixing styled() with sx Prop

```typescript
// ❌ WRONG
const StyledCard = styled(Card)({ ... });
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
const StyledBox = styled(Box)({
  padding: '15px',
  color: '#eb4236',
  fontSize: '14px',
});

// ✅ CORRECT
const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.primary.main,
  fontSize: theme.typography.body2.fontSize,
}));
```

### 3. Inline Styles

```typescript
// ❌ WRONG
<div style={{ padding: '10px', color: 'red' }}>

// ✅ CORRECT
const StyledDiv = styled('div')(({ theme }) => ({
  padding: theme.spacing(1.25),
  color: theme.palette.error.main,
}));
<StyledDiv>
```

### 4. Not Using shouldForwardProp

```typescript
// ❌ WRONG - Custom prop forwarded to DOM
const StyledBox = styled(Box)<{ isActive: boolean }>(({ isActive }) => ({
  backgroundColor: isActive ? 'red' : 'blue',
}));
// Warning: isActive is passed to DOM element

// ✅ CORRECT
const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  backgroundColor: isActive
    ? theme.palette.primary.main
    : theme.palette.secondary.main,
}));
```

---

## ✅ Styling Checklist

Before committing ANY styled component:

- [ ] **Zero sx prop usage** (except prototypes)
- [ ] **All styling in `styles.ts`** (not in component file)
- [ ] **All colors from `theme.palette.*`**
- [ ] **All spacing from `theme.spacing()`**
- [ ] **All typography from `theme.typography.*`**
- [ ] **No hardcoded values** (colors, spacing, sizes)
- [ ] **Custom props use `shouldForwardProp`**
- [ ] **Responsive breakpoints use `theme.breakpoints.up()`**
- [ ] **Transitions use `theme.transitions.create()`**
- [ ] **Shadows use `theme.customShadows.*`**

---

## 📚 Related Documentation

- **Theme tokens**: See [theme.md](./theme.md)
- **Component structure**: See [component-structure.md](./component-structure.md)
- **Interactivity**: See [interactivity.md](./interactivity.md)
