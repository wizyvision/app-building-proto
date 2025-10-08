# Interactivity & Responsive Design

> **Purpose**: Rules for interaction states, animations, and responsive layouts.

---

## ⚙️ REQUIRED: Every Interactive Component Must Have

All interactive elements (buttons, links, inputs, cards) MUST implement:

1. ✅ Hover states
2. ✅ Active/Focus states
3. ✅ Disabled states (if applicable)
4. ✅ Loading states (if applicable)
5. ✅ Smooth transitions

**No placeholder interactions. Everything must be functional.**

---

## 🎨 Interaction States

### 1. Hover States

**Purpose**: Visual feedback when user points at element.

```typescript
const InteractiveButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,

  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    // Optional: Add subtle transform
    transform: 'translateY(-1px)',
    boxShadow: theme.customShadows.md,
  },
}));
```

**Common Hover Effects:**
- Background color change
- Border color change
- Shadow elevation increase
- Subtle transform (translateY, scale)
- Cursor change (`cursor: 'pointer'`)

```typescript
// Card hover example
const HoverCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  transition: theme.transitions.create(['box-shadow', 'transform']),

  '&:hover': {
    boxShadow: theme.customShadows.lg,
    transform: 'scale(1.02)',
  },
}));
```

---

### 2. Active States

**Purpose**: Visual feedback when user clicks/taps element.

```typescript
const ActiveButton = styled(Button)(({ theme }) => ({
  '&:active': {
    backgroundColor: theme.palette.action.selected,
    transform: 'scale(0.98)', // Subtle "press down" effect
  },
}));
```

**Guidelines:**
- Should be visually distinct from hover
- Often darker/more saturated than hover
- Can include scale transform (0.95-0.98)
- Duration should be quick (100-150ms)

---

### 3. Focus States

**Purpose**: Keyboard navigation and accessibility.

```typescript
const FocusableButton = styled(Button)(({ theme }) => ({
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
}));
```

**Guidelines:**
- ALWAYS provide visible focus indicator
- Use `:focus-visible` (not `:focus`) to avoid mouse focus
- Outline color should be primary or high-contrast
- Minimum 2px outline width
- Never `outline: none` without alternative indicator

```typescript
// Custom focus ring
const CustomFocusButton = styled(Button)(({ theme }) => ({
  position: 'relative',

  '&:focus-visible': {
    outline: 'none',
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: -4,
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: theme.shape.borderRadius,
    },
  },
}));
```

---

### 4. Disabled States

**Purpose**: Show element is not currently interactive.

```typescript
const DisabledButton = styled(Button)(({ theme }) => ({
  '&:disabled': {
    opacity: theme.palette.action.disabledOpacity, // 0.38
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
}));
```

**Guidelines:**
- Reduce opacity (0.38 is standard)
- Change cursor to `not-allowed`
- Remove pointer events (`pointerEvents: 'none'`)
- Consider gray background/text color
- Never hide disabled elements entirely

```typescript
// Custom disabled styling
const CustomDisabledInput = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root.Mui-disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.text.disabled,
    cursor: 'not-allowed',
  },
}));
```

---

### 5. Loading States

**Purpose**: Show operation is in progress.

```typescript
const LoadingButton = ({ loading, children, ...props }: LoadingButtonProps) => {
  return (
    <Button {...props} disabled={loading}>
      {loading ? (
        <CircularProgress size={20} color="inherit" />
      ) : (
        children
      )}
    </Button>
  );
};
```

**Guidelines:**
- Disable interaction during loading
- Show spinner or progress indicator
- Maintain button size (use CircularProgress size)
- Optional: Show loading text ("Saving...")
- Keep user informed of progress

```typescript
// LoadingButton with text
const LoadingButtonWithText = styled(Button)(({ theme }) => ({
  minWidth: 120, // Prevent width jump during loading
}));

<LoadingButtonWithText disabled={isLoading}>
  {isLoading ? 'Saving...' : 'Save'}
</LoadingButtonWithText>
```

---

## 🎬 Transitions & Animations

### Smooth Transitions

**ALWAYS use theme transitions:**

```typescript
const SmoothButton = styled(Button)(({ theme }) => ({
  transition: theme.transitions.create(
    ['background-color', 'box-shadow', 'transform'],
    {
      duration: theme.transitions.duration.short, // 250ms
      easing: theme.transitions.easing.easeInOut,
    }
  ),
}));
```

### Recommended Durations

```typescript
// Quick interactions (hover, focus)
duration: theme.transitions.duration.shorter // 200ms

// Standard interactions (button click, card expand)
duration: theme.transitions.duration.short // 250ms

// Complex interactions (panel slide, modal open)
duration: theme.transitions.duration.standard // 300ms
```

### Common Transition Properties

```typescript
// Color changes
transition: theme.transitions.create('background-color')

// Position changes
transition: theme.transitions.create('transform')

// Visibility changes
transition: theme.transitions.create('opacity')

// Multiple properties
transition: theme.transitions.create(['background-color', 'transform', 'box-shadow'])
```

---

## ⌨️ Keyboard Navigation

### Essential Keyboard Support

All interactive components MUST support:

- **Tab**: Move focus to next element
- **Shift+Tab**: Move focus to previous element
- **Enter**: Activate button/link
- **Space**: Activate button/checkbox
- **Escape**: Close modal/dropdown

```typescript
const KeyboardAccessibleButton = ({
  onClick,
  children,
}: ButtonProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(e);
    }
  };

  return (
    <button
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {children}
    </button>
  );
};
```

### Focus Management

```typescript
// Auto-focus first input in modal
useEffect(() => {
  if (isOpen) {
    inputRef.current?.focus();
  }
}, [isOpen]);

// Trap focus within modal
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Tab') {
    // Implement focus trap logic
  }
};
```

---

## 📱 Responsive Design

### Mobile-First Approach

**ALWAYS start with mobile styles, then add breakpoints:**

```typescript
const ResponsiveCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2), // Mobile default
  width: '100%',

  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3), // Mobile landscape (600px+)
    width: 'auto',
  },

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4), // Tablet (900px+)
  },

  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(5), // Desktop (1200px+)
  },
}));
```

### Breakpoints Reference

```typescript
xs: 0px      // Mobile portrait
sm: 600px    // Mobile landscape
md: 900px    // Tablet
lg: 1200px   // Desktop
xl: 1536px   // Large desktop
```

### Touch Targets (Mobile)

**Minimum touch target sizes:**

```typescript
const MobileButton = styled(Button)(({ theme }) => ({
  minHeight: 48, // Mobile standard
  minWidth: 48,
  padding: theme.spacing(2),

  [theme.breakpoints.up('md')]: {
    minHeight: 44, // Desktop can be slightly smaller
    minWidth: 44,
  },
}));
```

**Guidelines:**
- **Mobile**: 48x48px minimum
- **Desktop**: 44x44px minimum
- **Spacing between targets**: 8px minimum, 16px recommended

### Responsive Typography

```typescript
const ResponsiveTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5, // Mobile: 16px

  [theme.breakpoints.up('md')]: {
    ...theme.typography.h3, // Desktop: 20px
  },
}));
```

### Responsive Layout

```typescript
// Stack on mobile, row on desktop
const ResponsiveContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    gap: theme.spacing(4),
  },
}));

// Hide on mobile, show on desktop
const DesktopOnly = styled(Box)(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

// Show on mobile, hide on desktop
const MobileOnly = styled(Box)(({ theme }) => ({
  display: 'block',

  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));
```

---

## ✅ Interactivity Checklist

Before committing ANY interactive component:

### States
- [ ] Hover changes visual state (background, border, shadow)
- [ ] Click provides feedback (ripple, state change)
- [ ] Focus is visible (outline, border)
- [ ] Disabled state is clear (opacity, cursor)
- [ ] Loading state implemented (if applicable)

### Transitions
- [ ] Smooth transitions (200-300ms)
- [ ] Uses `theme.transitions.create()`
- [ ] Appropriate easing (easeInOut for most)
- [ ] No jarring animations

### Keyboard
- [ ] Tab navigation works
- [ ] Enter/Space activates
- [ ] Escape closes (if applicable)
- [ ] Focus visible (`:focus-visible`)

### Responsive
- [ ] Mobile-first breakpoints
- [ ] Touch targets 48x48px (mobile)
- [ ] Layout adapts to screen size
- [ ] Typography scales appropriately

---

## 🚫 Common Mistakes

### 1. No Hover State

```typescript
// ❌ WRONG - No hover feedback
const StaticButton = styled(Button)({
  backgroundColor: 'blue',
});

// ✅ CORRECT - Clear hover feedback
const HoverButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  transition: theme.transitions.create('background-color'),

  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));
```

### 2. No Focus Indicator

```typescript
// ❌ WRONG - Removes outline without alternative
const NoFocusButton = styled(Button)({
  outline: 'none',
});

// ✅ CORRECT - Custom focus indicator
const FocusButton = styled(Button)(({ theme }) => ({
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
}));
```

### 3. Touch Targets Too Small

```typescript
// ❌ WRONG - Too small for mobile
const TinyButton = styled(IconButton)({
  width: 24,
  height: 24,
});

// ✅ CORRECT - Comfortable touch target
const TouchButton = styled(IconButton)(({ theme }) => ({
  width: 48,
  height: 48,
  padding: theme.spacing(1.5), // Icon is 24px
}));
```

### 4. Jarring Transitions

```typescript
// ❌ WRONG - No transition or too fast
const JarringButton = styled(Button)({
  '&:hover': {
    transform: 'scale(1.5)', // Too much!
  },
});

// ✅ CORRECT - Smooth, subtle
const SmoothButton = styled(Button)(({ theme }) => ({
  transition: theme.transitions.create('transform'),

  '&:hover': {
    transform: 'scale(1.02)', // Subtle
  },
}));
```

---

## 📚 Related Documentation

- **UX Principles**: See [ux-principles.md](./ux-principles.md)
- **Styling**: See [styling-rules.md](./styling-rules.md)
- **Theme**: See [theme.md](./theme.md)
