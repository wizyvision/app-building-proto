# Theme Reference

> **Purpose**: Complete reference for all theme tokens and values. Use this when styling components.

---

## 🎨 Color Palette

### Primary (WizyVision Red)
```typescript
theme.palette.primary[1]   // '#fde9e8' - Lightest
theme.palette.primary[5]   // '#eb4236' - Main (brand color)
theme.palette.primary[10]  // '#6b110b' - Darkest
theme.palette.primary.main // Same as [5]
theme.palette.primary.light // Same as [4]
theme.palette.primary.dark // Same as [7]
```

### Secondary (Cyan/Teal)
```typescript
theme.palette.secondary[1]  // '#e8fbfd' - Lightest
theme.palette.secondary[5]  // '#36dfeb' - Main
theme.palette.secondary[11] // '#021617' - Darkest
```

### Background (Grays)
```typescript
theme.palette.background[1] // '#ffffff' - White
theme.palette.background[2] // '#fafafa' - Lightest gray
theme.palette.background[3] // '#f5f5f5' - Very light gray
theme.palette.background[4] // '#f0f0f0' - Light gray
theme.palette.background[5] // '#ededed' - Subtle gray
```

### Text Colors
```typescript
theme.palette.text.primary    // '#262626' - Main text
theme.palette.text.secondary  // '#595959' - Secondary text
theme.palette.text.disabled   // '#bfbfbf' - Disabled
```

### Action Colors (Interaction States)
```typescript
theme.palette.action.hover       // Hover state background
theme.palette.action.selected    // Active/selected state
theme.palette.action.disabled    // Disabled elements
theme.palette.action.disabledOpacity // 0.38
```

---

## 📏 Spacing

**Base unit: 8px**

```typescript
theme.spacing(0.5)  // 4px
theme.spacing(1)    // 8px
theme.spacing(2)    // 16px
theme.spacing(3)    // 24px
theme.spacing(4)    // 32px
theme.spacing(5)    // 40px
theme.spacing(6)    // 48px
```

**RULE: Always use `theme.spacing()`, NEVER hardcoded px values**

```typescript
// ✅ CORRECT
padding: theme.spacing(2)

// ❌ WRONG
padding: '16px'
```

---

## 🔤 Typography

### Font Sizes & Weights

```typescript
theme.typography.h1      // 32px, weight 600
theme.typography.h2      // 24px, weight 600
theme.typography.h3      // 20px, weight 600
theme.typography.h4      // 18px, weight 600
theme.typography.h5      // 16px, weight 500
theme.typography.h6      // 14px, weight 500
theme.typography.body1   // 16px, weight 400
theme.typography.body2   // 14px, weight 400
theme.typography.caption // 12px, weight 400
theme.typography.button  // 14px, weight 500
```

### Usage Example

```typescript
const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.h2,
  color: theme.palette.text.primary,
}));
```

---

## 🌑 Shadows

```typescript
theme.customShadows.button  // Button shadow
theme.customShadows.sm      // Small elevation
theme.customShadows.md      // Medium elevation (cards)
theme.customShadows.lg      // Large elevation (modals)
theme.customShadows.xl      // Extra large elevation
```

### Usage Example

```typescript
const Card = styled(Box)(({ theme }) => ({
  boxShadow: theme.customShadows.md,
}));
```

---

## 🔘 Border Radius

```typescript
theme.shape.borderRadius  // 4px (default - buttons, inputs)
8                        // 8px (medium - smaller cards)
12                       // 12px (large - cards, panels)
16                       // 16px (extra large - containers)
```

### Usage Guidelines

- **4px**: Buttons, text fields, small elements
- **8px**: Compact cards, chips
- **12px**: Standard cards, panels
- **16px**: Large containers, modals

```typescript
const Button = styled(MuiButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius, // 4px
}));

const Card = styled(Box)({
  borderRadius: 12, // Use directly for non-standard values
});
```

---

## ⚡ Transitions

### Duration

```typescript
theme.transitions.duration.shortest // 150ms
theme.transitions.duration.shorter  // 200ms
theme.transitions.duration.short    // 250ms
theme.transitions.duration.standard // 300ms
theme.transitions.duration.complex  // 375ms
```

### Easing

```typescript
theme.transitions.easing.easeInOut  // Standard transitions
theme.transitions.easing.easeOut    // Enter animations
theme.transitions.easing.easeIn     // Exit animations
theme.transitions.easing.sharp      // Quick transitions
```

### Creating Transitions

```typescript
const Button = styled(MuiButton)(({ theme }) => ({
  transition: theme.transitions.create(
    ['background-color', 'transform'],
    {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }
  ),
}));
```

---

## 📱 Breakpoints

```typescript
theme.breakpoints.up('xs')  // 0px - Mobile
theme.breakpoints.up('sm')  // 600px - Mobile landscape
theme.breakpoints.up('md')  // 900px - Tablet
theme.breakpoints.up('lg')  // 1200px - Desktop
theme.breakpoints.up('xl')  // 1536px - Large desktop
```

### Usage Example (Mobile-First)

```typescript
const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2), // Mobile default

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3), // Tablet+
  },

  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(4), // Desktop+
  },
}));
```

---

## 🎯 Quick Reference

### Most Common Usage

```typescript
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const StyledComponent = styled(Box)(({ theme }) => ({
  // Colors
  backgroundColor: theme.palette.background[1],
  color: theme.palette.text.primary,

  // Spacing
  padding: theme.spacing(2),
  margin: theme.spacing(3),

  // Typography
  ...theme.typography.body1,

  // Elevation
  boxShadow: theme.customShadows.md,

  // Border
  borderRadius: 12,

  // Transitions
  transition: theme.transitions.create('background-color'),

  // Hover state
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },

  // Responsive
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
}));
```

---

## ✅ Theme Checklist

Before committing styled components, verify:

- [ ] ALL colors from `theme.palette.*`
- [ ] ALL spacing from `theme.spacing()`
- [ ] ALL typography from `theme.typography.*`
- [ ] ALL shadows from `theme.customShadows.*`
- [ ] Transitions use `theme.transitions.create()`
- [ ] Breakpoints use `theme.breakpoints.up()`
- [ ] NO hardcoded values anywhere

---

## 📦 Import Pattern

```typescript
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

// In components
const Component = () => {
  const theme = useTheme(); // For runtime access
  return <div>{/* Use theme */}</div>;
};

// In styled components
const StyledDiv = styled('div')(({ theme }) => ({
  // Theme access via parameter
}));
```
