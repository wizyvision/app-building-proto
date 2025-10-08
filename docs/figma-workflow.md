# Figma to Component Workflow

> **Purpose**: Step-by-step process for implementing components from Figma designs.

---

## 🚨 CRITICAL: Never Skip These Steps

When implementing from Figma:

1. **Extract specifications FIRST**
2. **List ALL specs before coding**
3. **Compare with theme tokens** (reference [theme.md](./theme.md))
4. **Create checklist with matches noted**
5. **Confirm approach with user**
6. **Implement with chosen values**
7. **Compare against Figma visually**

**DO NOT:**
- ❌ Guess theme mappings
- ❌ Approximate values
- ❌ Skip documentation
- ❌ Assume "close enough" is good enough

---

## 📋 Step-by-Step Workflow

### Step 1: Extract Figma Specifications

**Tools available:**
- `get_code` - Extract CSS/Tailwind classes
- `get_screenshot` - Visual comparison

```typescript
// Example: Get code for a specific node
// Use Figma node-id from URL: figma.com/file/ABC?node-id=123-456
```

**What to extract:**
- Node ID from Figma URL
- All CSS/Tailwind classes
- Visual screenshot for comparison

---

### Step 2: List ALL Specifications

**Before writing ANY code, document:**

```markdown
From Figma node-id: XXX-XXX

LAYOUT:
- Width: 100% / 375px / auto
- Height: 48px / auto
- Padding: 4px 0px 4px 16px
- Margin: 16px 0px

COLORS:
- Background: #faf3f3
- Border: 1px solid #eb4236
- Text (empty): #262626
- Text (filled): #595959

TYPOGRAPHY:
- Font (empty): 16px / 24px / 0.5px / weight 400
- Font (filled): 14px / 20px / 0.25px / weight 400
- Font family: Roboto

ICONS:
- Icon container: 48x48px
- Icon size: 24x24px
- Icon color: #595959

STATES:
- Border (default): 1px solid #eb4236
- Border (focused): 0px 0px 2px #eb4236
- Background (hover): #f5f5f5
- Background (disabled): #ededed
```

---

### Step 3: Compare with Theme

**Before implementing, compare extracted values with theme tokens.**

**Reference [theme.md](./theme.md) to check:**

```markdown
Figma Value → Theme Match?

COLORS:
- Background: #faf3f3 → Check theme.palette.background[*]
- Border: #eb4236 → Check theme.palette.primary[*]
- Text: #262626 → Check theme.palette.text.primary

SPACING:
- Padding: 4px → theme.spacing(0.5)
- Padding: 16px → theme.spacing(2)
- Min height: 48px → Standard touch target

TYPOGRAPHY:
- 16px/24px/0.5px → Compare with theme.typography.body1
- 14px/20px/0.25px → Compare with theme.typography.body2
- Weight 400 → theme.typography.fontWeightRegular

MATCH RESULTS:
✅ #eb4236 = theme.palette.primary[5] (EXACT match)
❌ #faf3f3 ≠ any theme.palette.background (MISSING - consider adding)
✅ 16px = theme.spacing(2)
✅ Font 16px/24px = theme.typography.body1
```

**Decision matrix:**
- **Exact match** → Can use theme token (if user approves)
- **No match** → Two options:
  1. **Add to theme** (recommended if reusable) → e.g., `theme.palette.background[6]: '#faf3f3'`
  2. **Use exact value** (if one-off or mobile-specific)
- **Close match** → Ask user which to use

---

### Step 4: Create Checklist

```markdown
Implementation Checklist:
- [ ] Background: #faf3f3 (NO theme match - ADD to theme with two layers)
  - Primitive: theme.palette.background[6] = '#faf3f3'
  - Semantic: theme.semanticTokens.textFieldBackground = background[6]
- [ ] Border: #eb4236 (= theme.primary[5], use theme token)
- [ ] Padding: 4px 0px 4px 16px (= 0.5/0/0.5/2 spacing units, use theme)
- [ ] Min height: 48px (standard touch target)
- [ ] Icon container: 48x48px
- [ ] Icon: 24x24px (default MUI size)
- [ ] Font empty: 16px/24px/0.5px (= body1, use theme)
- [ ] Font value: 14px/20px/0.25px (= body2, use theme)
- [ ] Focus state: 2px bottom border
- [ ] Hover state: background change

RECOMMENDATION FOR WEB:
1. Add primitive: theme.palette.background[6] = '#faf3f3'
2. Add semantic: theme.semanticTokens.textFieldBackground = background[6]
3. Use semantic token in component
```

---

### Step 5: Confirm Approach

**Present findings to user:**
> "I've extracted and compared Figma specs with our theme:
>
> **EXACT MATCHES (use theme tokens):**
> - Border #eb4236 = theme.palette.primary[5] ✅
> - Font 16px/24px = theme.typography.body1 ✅
> - Padding 16px = theme.spacing(2) ✅
>
> **MISSING FROM THEME:**
> - Background #faf3f3 (not in theme.palette.background) ❌
>
> **RECOMMENDATION:**
> Add #faf3f3 to theme using **two-layer approach**:
> 1. Primitive: `theme.palette.background[6] = '#faf3f3'`
> 2. Semantic: `theme.semanticTokens.textFieldBackground = background[6]`
>
> **Should I:**
> - **Option A**: Add to theme (two layers) + use semantic tokens (recommended for web)
> - **Option B**: Use theme tokens for matches, exact value for #faf3f3 (hybrid approach)
> - **Option C**: Use EXACT Figma values for everything (recommended for mobile-only)
>
> For **web components**, I recommend **Option A** (add to theme).
> For **mobile components**, I recommend **Option C** (exact values)."

**Wait for confirmation before proceeding.**

---

### Step 6: Implement with Chosen Values

**Option A: Add to theme + use theme tokens (Web - Recommended)**

First, add missing values to theme using **two-layer approach**:

**Step 1: Add to primitive layer (raw values)**
```typescript
// theme/palette.ts or designTokens.ts
export const palette = {
  background: {
    1: '#ffffff',
    2: '#fafafa',
    3: '#f5f5f5',
    4: '#f0f0f0',
    5: '#ededed',
    6: '#faf3f3', // NEW - Added from Figma (primitive)
  },
  // ...
};
```

**Step 2: Add to semantic layer (meaningful names)**
```typescript
// theme/semanticTokens.ts or in same file
export const semanticTokens = {
  // Map primitive to semantic name
  textFieldBackground: palette.background[6], // '#faf3f3'
  // OR if more general:
  drawerBackground: palette.background[6],
  // Choose name based on where it's used
};
```

Then use semantic token in component:
```typescript
// components/TextField/styles.ts
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

/**
 * TextField - Web Component
 *
 * Figma: node-id 320-1778
 * Implementation: All theme tokens (added #faf3f3 to theme)
 *
 * Theme additions (two-layer):
 * - Primitive: theme.palette.background[6] = '#faf3f3'
 * - Semantic: theme.semanticTokens.textFieldBackground = background[6]
 */
export const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',

  '& .MuiInputBase-root': {
    // Use semantic token (meaningful name)
    backgroundColor: theme.semanticTokens.textFieldBackground,
    // OR use primitive if no semantic exists yet:
    // backgroundColor: theme.palette.background[6],

    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0.5, 0, 0.5, 2),
    minHeight: 48,
  },

  '& .MuiInputBase-input': {
    padding: 0,
    ...theme.typography.body1,
    color: theme.palette.text.primary,
  },

  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
}));
```

**Why two layers?**
- **Primitive layer** (`background[6]`): Raw values, organized by type
- **Semantic layer** (`textFieldBackground`): Meaningful names, shows intent
- Easy to maintain: Change primitive, all semantic references update
- Self-documenting: `textFieldBackground` explains usage better than `background[6]`

**Option B: Theme tokens + exact for missing (Hybrid)**

```typescript
/**
 * Figma: node-id 320-1778
 * Implementation: Hybrid (theme tokens + exact for custom)
 *
 * Custom values:
 * - Background: #faf3f3 (not added to theme, using exact)
 */
export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: '#faf3f3', // Exact - not in theme
    padding: theme.spacing(0.5, 0, 0.5, 2), // Theme token
  },
  // ... rest uses theme tokens
}));
```

**Option C: EXACT Figma values (Mobile-only)**

```typescript
// components/TextField/styles.ts
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

/**
 * TextField - Mobile Multiline
 *
 * Figma: node-id 320-1778
 * Implementation: EXACT Figma values (mobile-specific)
 *
 * Specifications:
 * - Background: #faf3f3 (custom, not in theme)
 * - Border: #eb4236 (= theme.primary[5], using exact)
 * - Padding: 4px 0px 4px 16px (= 0.5/0/0.5/2, using exact)
 * - Font: 16px/24px (= body1, using exact)
 */
export const StyledTextField = styled(TextField)({
  width: '100%',

  '& .MuiInputBase-root': {
    backgroundColor: '#faf3f3', // EXACT from Figma
    borderRadius: '4px',
    padding: '4px 0px 4px 16px', // EXACT from Figma
    minHeight: '48px',
  },

  '& .MuiInputBase-input': {
    padding: 0,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.5px',
    fontWeight: 400,
    color: '#1d1b20',
  },

  '& .MuiInputBase-input:not(:placeholder-shown)': {
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
  },

  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '1px solid #eb4236',
      borderRadius: '4px',
    },
    '&.Mui-focused fieldset': {
      border: 0,
      borderBottom: '2px solid #eb4236',
      borderRadius: '4px 4px 0 0',
    },
  },
});
```

**Key points:**
- **Option A**: Add to theme + use tokens - Best for web, maximum consistency
- **Option B**: Theme tokens + exact for missing - Hybrid approach
- **Option C**: EXACT values only - Best for mobile, pixel-perfect match
- Always document Figma node-id and theme comparison results

---

### Step 7: Compare Against Figma

**Visual comparison:**
1. Take screenshot of implementation
2. Place side-by-side with Figma design
3. Check pixel-perfect alignment:
   - Colors match exactly
   - Spacing matches exactly
   - Font sizes match exactly
   - Border styles match exactly

**Fix ANY differences before proceeding.**

---

## 🎯 When to Add to Theme vs Use Exact Values

### Add to Theme (Option A) When:

✅ **Value will be reused** across multiple components
- Example: Background color used in cards, drawers, panels
- Creates consistency and easier maintenance

✅ **Building for web application**
- Theme tokens ensure consistency across app
- Easier to update globally
- Better for light/dark mode switching

✅ **Value is part of design system**
- Color appears in design system palette
- Should be centralized for brand consistency

✅ **Future scalability matters**
- Easier to change once in theme than find/replace
- Other developers can discover and reuse

### Use Exact Values (Option C) When:

✅ **Mobile-specific component**
- Mobile designs often have unique styling
- Pixel-perfect match to design is critical

✅ **One-off or prototype component**
- Temporary implementation
- Not part of permanent design system

✅ **Component-specific customization**
- Unique styling that shouldn't be reused
- Not part of broader design language

### Hybrid Approach (Option B) When:

✅ **Some values match theme, others don't**
- Use theme tokens for matches
- Use exact for custom values
- Document which is which

### Two-Layer Theme Pattern

**Always use two layers when adding to theme:**

```typescript
// 1. Primitive layer (organized by type)
palette.background[6] = '#faf3f3'

// 2. Semantic layer (organized by usage)
semanticTokens.textFieldBackground = palette.background[6]
semanticTokens.drawerBackground = palette.background[6]
```

**Why two layers?**
- **Primitive**: Easy to find all raw values
- **Semantic**: Self-documenting, shows intent
- **Flexible**: Multiple semantic tokens can point to same primitive
- **Maintainable**: Update primitive, all semantics update

---

## 🎨 Figma CSS Translation

### Common Figma → MUI Mappings

| Figma Tailwind | MUI Styled |
|----------------|------------|
| `bg-[#faf3f3]` | `backgroundColor: '#faf3f3'` |
| `pl-[16px]` | `paddingLeft: '16px'` |
| `py-[4px]` | `padding: '4px 0'` |
| `px-[16px]` | `padding: '0 16px'` |
| `h-[48px]` | `height: '48px'` |
| `min-h-[48px]` | `minHeight: '48px'` |
| `w-full` | `width: '100%'` |
| `size-[48px]` | `width: '48px', height: '48px'` |
| `gap-[10px]` | `gap: '10px'` |
| `border border-[#eb4236]` | `border: '1px solid #eb4236'` |
| `rounded-[4px]` | `borderRadius: '4px'` |
| `text-[14px]` | `fontSize: '14px'` |
| `leading-[20px]` | `lineHeight: '20px'` |
| `tracking-[0.25px]` | `letterSpacing: '0.25px'` |
| `font-normal` | `fontWeight: 400` |
| `font-medium` | `fontWeight: 500` |
| `font-semibold` | `fontWeight: 600` |

---

## 📐 Mobile vs Web Components

### Mobile Components

**Rules for mobile-specific components:**
- ✅ Use EXACT Figma specifications
- ✅ Use exact hex colors (not theme)
- ✅ Use exact px values (not spacing())
- ✅ Match font specs exactly
- ❌ DO NOT map to theme tokens by default

**Why?**
- Mobile UI often differs from web design system
- Figma designs are pixel-perfect for mobile
- Theme tokens are optimized for web

```typescript
// ✅ GOOD - Mobile component
const MobileTextField = styled(TextField)({
  backgroundColor: '#faf3f3', // Exact from Figma
  padding: '4px 0px 4px 16px', // Exact from Figma
  minHeight: '48px',
});
```

### Web Components

**Rules for web components:**
- ✅ Map colors to theme.palette
- ✅ Map spacing to theme.spacing()
- ✅ Map typography to theme.typography
- ✅ Use theme tokens for consistency

**Why?**
- Web components should follow design system
- Theme ensures consistency across app
- Easier to maintain and update globally

```typescript
// ✅ GOOD - Web component
const WebTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.background[1],
  padding: theme.spacing(0.5, 0, 0.5, 2),
  minHeight: 48,
}));
```

---

## 🔍 Component Documentation

### Required Documentation Format

```typescript
/**
 * ComponentName
 *
 * Figma Reference: node-id XXX-XXX
 *
 * Design Specifications:
 * - Background: #faf3f3
 * - Border: 1px solid #eb4236
 * - Padding: 4px 0px 4px 16px
 * - Height: 48px
 * - Font (empty): 16px/24px/0.5px
 * - Font (value): 14px/20px/0.25px
 *
 * Implementation Notes:
 * - Uses exact Figma values (mobile component)
 * - Focus state: bottom border only
 * - Font size changes when value is entered
 *
 * UX PRINCIPLES APPLIED:
 * - [See ux-principles.md]
 */
```

---

## ✅ Figma Implementation Checklist

Before committing Figma implementation:

### Extraction
- [ ] Used `get_code` tool to extract CSS
- [ ] Used `get_screenshot` tool for visual reference
- [ ] Documented Figma node-id

### Specifications
- [ ] Listed ALL design specifications
- [ ] **Compared with theme tokens** (referenced [theme.md](./theme.md))
- [ ] Identified exact matches vs custom values
- [ ] Created implementation checklist with matches noted
- [ ] Confirmed approach with user (Option A/B/C)

### Implementation
- [ ] Used chosen values (exact or theme)
- [ ] Documented Figma reference in component
- [ ] Documented which values match theme (if using Option B)
- [ ] Implemented all states (default, hover, focus, disabled)

### Verification
- [ ] Compared screenshot with Figma side-by-side
- [ ] Fixed all visual differences
- [ ] Tested all interaction states
- [ ] Pixel-perfect match achieved

---

## 🚫 Common Figma Mistakes

### 1. Skipping Theme Comparison

```typescript
// ❌ WRONG - Not checking theme first
const StyledField = styled(TextField)({
  backgroundColor: '#eb4236', // Didn't check - this IS in theme!
  padding: '16px', // Didn't check - this IS theme.spacing(2)!
});

// ✅ CORRECT - Compared with theme.md first
/**
 * Figma Comparison:
 * - #eb4236 = theme.palette.primary[5] ✅
 * - 16px = theme.spacing(2) ✅
 * - User approved Option B (use theme)
 */
const StyledField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main, // Matched!
  padding: theme.spacing(2), // Matched!
}));
```

### 2. Not Adding to Theme When Needed

```typescript
// ❌ WRONG - Using exact value without considering theme addition
const StyledField = styled(TextField)({
  backgroundColor: '#faf3f3', // Should this be in theme?
  // This color will be used in multiple components but isn't reusable
});

// ✅ CORRECT - Added to theme with two-layer approach
/**
 * Figma Comparison:
 * - #faf3f3 ≠ theme.palette.background[*] ❌
 * - Added using two-layer approach ✅
 * - User approved Option A (add to theme)
 */
// 1. Added to theme/palette.ts (primitive):
// background: { ..., 6: '#faf3f3' }

// 2. Added semantic token:
// semanticTokens: { textFieldBackground: palette.background[6] }

// 3. Use semantic token:
const StyledField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.semanticTokens.textFieldBackground, // Semantic!
}));
```

### 4. Approximating Values

```typescript
// ❌ WRONG - "Close enough"
const StyledBox = styled(Box)({
  padding: '5px', // Figma says 4px!
  fontSize: '15px', // Figma says 14px!
});

// ✅ CORRECT - EXACT values
const StyledBox = styled(Box)({
  padding: '4px', // Exact
  fontSize: '14px', // Exact
});
```

### 5. Missing Documentation

```typescript
// ❌ WRONG - No Figma reference or theme comparison
const StyledComponent = styled(Box)({
  backgroundColor: '#faf3f3',
});

// ✅ CORRECT - Documented with two-layer approach
/**
 * Component Name
 * Figma: node-id 320-1778
 *
 * Theme Comparison:
 * - Background #faf3f3 ≠ theme.palette.background[*] ❌
 * - Added using two-layer approach ✅
 *   - Primitive: theme.palette.background[6] = '#faf3f3'
 *   - Semantic: theme.semanticTokens.componentBackground = background[6]
 * - User approved Option A (add to theme)
 */
const StyledComponent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.semanticTokens.componentBackground, // Semantic token
}));
```

### 6. Skipping Visual Comparison

```typescript
// ❌ WRONG - "Looks right to me"
// No visual comparison done

// ✅ CORRECT - Compared and verified
// Screenshot compared side-by-side with Figma
// All spacing, colors, fonts verified pixel-perfect
```

---

## 📚 Related Documentation

- **Theme reference** (CRITICAL for Step 3): See [theme.md](./theme.md)
- **Styling rules**: See [styling-rules.md](./styling-rules.md)
- **Component structure**: See [component-structure.md](./component-structure.md)

**💡 Pro Tip**: Keep [theme.md](./theme.md) open during Figma implementation to quickly compare values!
