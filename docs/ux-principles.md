# UX Principles

> **Purpose**: Core design principles that MUST be applied to every component.

---

## 🎯 MANDATORY: Document Principles Applied

**Every component MUST include a comment block documenting which principles apply:**

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

---

## 📚 The Five Core Principles

### 1. Jakob's Law: Users Expect Familiar Patterns

**Definition:**
Users spend most of their time on other sites/apps. They expect your interface to work the same way.

**Guidelines:**
- ✅ Use standard UI conventions (tabs, cards, drawers, modals)
- ✅ Don't reinvent common interactions
- ✅ Follow Material Design patterns (we're using MUI)
- ✅ Icons mean what users expect (trash = delete, pencil = edit)

**Examples:**

```typescript
// ✅ GOOD - Familiar collapsible pattern
<Accordion>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    Section Title
  </AccordionSummary>
  <AccordionDetails>Content</AccordionDetails>
</Accordion>

// ❌ BAD - Unfamiliar pattern
<Card onClick={toggleContent}>
  <Typography>Click anywhere to see more</Typography>
  {/* No visual indicator of collapsible nature */}
</Card>
```

**Common Patterns to Follow:**
- Hamburger menu = navigation
- Three dots = more options
- X icon = close
- Checkmark = confirm/complete
- Save buttons on bottom-right
- Cancel buttons on bottom-left

---

### 2. Fitts's Law: Targets Should Be Easy to Reach

**Definition:**
Time to reach a target depends on its size and distance. Larger and closer targets are faster to click.

**Guidelines:**
- ✅ Primary buttons: min 48x48px (mobile), 44x44px (desktop)
- ✅ Touch targets: min 44x44px spacing between interactive elements
- ✅ Place primary actions in easy-reach zones
- ✅ Frequently used actions should be larger
- ✅ Critical actions should be easily accessible

**Examples:**

```typescript
// ✅ GOOD - Large, easy-to-tap button
const PrimaryButton = styled(Button)(({ theme }) => ({
  minHeight: 48,
  minWidth: 120,
  padding: theme.spacing(2, 4),
}));

// ❌ BAD - Tiny, hard-to-tap link
const TinyLink = styled('a')({
  fontSize: '10px',
  padding: '2px',
});
```

**Touch Target Sizes:**
- **Minimum**: 44x44px (mobile), 40x40px (desktop)
- **Comfortable**: 48x48px (mobile), 44x44px (desktop)
- **Optimal**: 56x56px (mobile), 48x48px (desktop)

**Spacing Between Targets:**
- Minimum 8px between interactive elements
- Recommended 16px for comfortable use

---

### 3. Hick's Law: Reduce Choice to Reduce Decision Time

**Definition:**
The time to make a decision increases with the number of choices. More options = slower decisions.

**Guidelines:**
- ✅ Limit primary actions to 3-5 per screen
- ✅ Use progressive disclosure for advanced options
- ✅ Group related actions together
- ✅ Hide rarely-used options in menus
- ✅ Use clear visual hierarchy for options

**Examples:**

```typescript
// ✅ GOOD - Limited, clear choices
<Stack direction="row" spacing={2}>
  <Button variant="contained">Save</Button>
  <Button variant="outlined">Cancel</Button>
  <IconButton><MoreVertIcon /></IconButton> {/* More options hidden */}
</Stack>

// ❌ BAD - Too many choices at once
<Stack direction="row" spacing={1}>
  <Button>Save</Button>
  <Button>Save & Close</Button>
  <Button>Save & New</Button>
  <Button>Save as Draft</Button>
  <Button>Save as Template</Button>
  <Button>Cancel</Button>
  <Button>Reset</Button>
</Stack>
```

**Decision Tree:**
- **1-2 options**: Present directly
- **3-5 options**: Group visually
- **6+ options**: Use progressive disclosure (dropdown, menu)

---

### 4. Miller's Law: Chunk Information (5-7 Items)

**Definition:**
The average person can hold 5-7 items in working memory. Chunk information into groups.

**Guidelines:**
- ✅ Group form fields in logical sections
- ✅ Limit navigation items to 5-7
- ✅ Use visual grouping (cards, sections, dividers)
- ✅ Break long lists into categories
- ✅ Use pagination or infinite scroll for long lists

**Examples:**

```typescript
// ✅ GOOD - Chunked form fields
<form>
  <Section title="Personal Information">
    <TextField label="Name" />
    <TextField label="Email" />
  </Section>

  <Section title="Address">
    <TextField label="Street" />
    <TextField label="City" />
    <TextField label="Zip Code" />
  </Section>
</form>

// ❌ BAD - 15 fields in flat list
<form>
  <TextField label="Name" />
  <TextField label="Email" />
  <TextField label="Phone" />
  {/* 12 more fields... */}
</form>
```

**Chunking Strategies:**
- Group by category (Personal, Work, Settings)
- Group by frequency (Common, Advanced)
- Group by workflow (Step 1, Step 2, Step 3)
- Use visual separators (Divider, spacing)

---

### 5. Visual Hierarchy: Guide User Attention

**Definition:**
Arrange elements to show importance and guide users through content.

**Guidelines:**
- ✅ Primary action: Contained button (filled)
- ✅ Secondary action: Outlined button
- ✅ Tertiary action: Text button
- ✅ Use typography scale (h1 → h6 → body)
- ✅ Use size, color, and spacing to show importance

**Examples:**

```typescript
// ✅ GOOD - Clear hierarchy
<Stack spacing={2}>
  <Typography variant="h1">Main Title</Typography>
  <Typography variant="body1">Description text</Typography>

  <Stack direction="row" spacing={2}>
    <Button variant="contained" color="primary">
      Primary Action
    </Button>
    <Button variant="outlined">Secondary Action</Button>
    <Button variant="text">Tertiary Action</Button>
  </Stack>
</Stack>

// ❌ BAD - No hierarchy
<Stack spacing={2}>
  <Typography>Title</Typography>
  <Typography>Description</Typography>
  <Button>Action 1</Button>
  <Button>Action 2</Button>
  <Button>Action 3</Button>
</Stack>
```

**Hierarchy Levels:**

| Level | Element | Usage |
|-------|---------|-------|
| 1 | h1, Contained Button | Page title, primary action |
| 2 | h2, Outlined Button | Section title, secondary action |
| 3 | h3, Text Button | Subsection, tertiary action |
| 4 | body1 | Main content |
| 5 | body2, caption | Supporting text |

---

## 🎨 Applying Principles Together

### Example: Form Builder Section

```typescript
/**
 * Section Component
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar collapsible pattern (like Accordion)
 *   Users expect sections to expand/collapse like they do everywhere else.
 *
 * - Fitts's Law: Full header is clickable (large target area: 100% width × 56px)
 *   Action buttons are 44x44px minimum for easy tapping.
 *
 * - Hick's Law: Only 2-3 actions visible at once (Expand, Edit, Add).
 *   Advanced options hidden in menu to reduce cognitive load.
 *
 * - Miller's Law: Fields grouped in logical sections.
 *   Each section represents one "chunk" of information.
 *
 * - Visual Hierarchy:
 *   - Section title: h5 (16px, weight 500)
 *   - Field labels: body1 (16px, weight 400)
 *   - Action buttons sized by importance (Add = 44px, Menu = 40px)
 */
```

---

## ✅ UX Principles Checklist

Before committing ANY component:

- [ ] **Documentation**: UX principles documented in comment block
- [ ] **Jakob's Law**: Follows familiar patterns (Material Design)
- [ ] **Fitts's Law**: Touch targets min 44x44px, primary actions easy to reach
- [ ] **Hick's Law**: Limited choices (3-5 primary actions max)
- [ ] **Miller's Law**: Information chunked (sections, groups)
- [ ] **Visual Hierarchy**: Clear importance (primary/secondary/tertiary)
- [ ] **At least 2 principles explicitly applied**

---

## 🚫 Common Mistakes

### 1. No Principle Documentation

```typescript
// ❌ WRONG - No documentation
export const MyComponent = () => { ... }

// ✅ CORRECT - Documented
/**
 * MyComponent
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Uses standard Material Design drawer pattern
 * - Fitts's Law: Close button is 48x48px for easy tapping
 */
export const MyComponent = () => { ... }
```

### 2. Ignoring Touch Targets

```typescript
// ❌ WRONG - Too small to tap
const IconButton = styled('button')({
  width: 24,
  height: 24,
});

// ✅ CORRECT - Comfortable touch target
const IconButton = styled('button')({
  width: 44,
  height: 44,
  padding: 10, // Icon is 24px, padding makes total 44px
});
```

### 3. Too Many Choices

```typescript
// ❌ WRONG - 8 actions visible
<Stack direction="row">
  <Button>Save</Button>
  <Button>Edit</Button>
  <Button>Delete</Button>
  <Button>Duplicate</Button>
  <Button>Archive</Button>
  <Button>Export</Button>
  <Button>Share</Button>
  <Button>Print</Button>
</Stack>

// ✅ CORRECT - Primary actions + menu
<Stack direction="row" spacing={2}>
  <Button variant="contained">Save</Button>
  <Button variant="outlined">Edit</Button>
  <IconButton>
    <MoreVertIcon /> {/* Other actions in menu */}
  </IconButton>
</Stack>
```

### 4. No Visual Hierarchy

```typescript
// ❌ WRONG - All actions same importance
<Stack direction="row">
  <Button variant="contained">Save</Button>
  <Button variant="contained">Cancel</Button>
  <Button variant="contained">Delete</Button>
</Stack>

// ✅ CORRECT - Clear hierarchy
<Stack direction="row" spacing={2}>
  <Button variant="contained" color="primary">
    Save
  </Button>
  <Button variant="outlined">Cancel</Button>
  <Button variant="text" color="error">
    Delete
  </Button>
</Stack>
```

---

## 📚 Further Reading

- [Laws of UX](https://lawsofux.com/)
- [Material Design Guidelines](https://m3.material.io/)
- [WCAG Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 📚 Related Documentation

- **Component structure**: See [component-structure.md](./component-structure.md)
- **Interactivity**: See [interactivity.md](./interactivity.md)
- **Styling**: See [styling-rules.md](./styling-rules.md)
