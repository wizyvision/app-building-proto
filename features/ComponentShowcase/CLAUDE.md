# ComponentShowcase Feature

## Purpose
Interactive component library and gallery for demonstrating all UI components with their variants, states, and behaviors. Serves as a living style guide and reference for stakeholders and developers.

## Key Points

### 1. Storybook-Style Interface
- **Drawer navigation**: Left sidebar with component list (familiar pattern)
- **Component display**: Main content area showing selected component
- **Interactive demos**: Live, functional component examples
- **Variant showcase**: Multiple states (empty, filled, error, disabled, hover, etc.)

### 2. Component Structure
```
features/ComponentShowcase/
├── index.tsx                   # Main showcase layout
├── styles.ts                   # Showcase-specific styling
└── views/                      # Individual component demos
    ├── Section.tsx             # Section component variants
    ├── Field.tsx               # Field component variants
    ├── FieldLibraryButton.tsx  # Field library button variants
    ├── MobileField.tsx         # Mobile field variants
    └── MobileComponents.tsx    # Mobile components overview
```

### 3. UX Principles Applied

**Jakob's Law**: Familiar component gallery pattern
- Left drawer navigation (Storybook, Material-UI docs pattern)
- Component selection highlights in sidebar
- Main content area displays selected component
- Back button in top-left (standard navigation)

**Fitts's Law**: Easy-to-target navigation
- Full-width drawer items (240px wide) - large click targets
- 48px height for drawer items
- Back button: 44x44px minimum, top-left corner position

**Hick's Law**: Limited component list
- Currently 5 components (within Miller's Law limit)
- As list grows, consider categorization:
  - Web Components (Section, Field, etc.)
  - Mobile Components (Mobile Fields, etc.)
  - Actions (Buttons, etc.)

**Visual Hierarchy**: Clear UI structure
- Primary: Selected component (highlighted in drawer, primary color)
- Secondary: Component name heading, interactive demos
- Tertiary: Unselected drawer items, descriptions
- Clear visual separation via drawer border and background

**Miller's Law**: Manageable component list
- Drawer shows 5-7 components at once (ideal chunk size)
- If list exceeds 7, implement search or categorization

### 4. Navigation Pattern

**Drawer Items:**
- Section
- Field
- Field Library Button
- Mobile Fields
- Mobile Components

**Selected State:**
- Background: `theme.palette.action.selected`
- Border-left: 4px solid `theme.palette.primary.main`
- Text color: `theme.palette.primary.main`

**Hover State:**
- Background: `theme.palette.action.hover`
- Cursor: pointer
- Smooth transition (150ms)

### 5. Layout Structure

**ShowcaseLayout:**
- Display: flex
- Full viewport height

**ShowcaseDrawer:**
- Width: 240px (fixed)
- Height: 100vh (sticky)
- Background: `theme.palette.background[2]`
- Border-right: 1px solid divider
- Overflow-y: auto (scrollable if many items)

**ShowcaseContent:**
- Flex: 1 (fills remaining space)
- Margin-left: 240px (avoids drawer overlap)
- Padding: theme.spacing(4)
- Overflow-y: auto (scrollable)

### 6. Component View Structure

Each view (Section, Field, etc.) typically includes:

**Header:**
- Component name (h3)
- Short description (body1)
- Design principles applied (bulleted list)

**Demo Section:**
- Interactive component instance
- Props controls (optional)
- Live state manipulation (optional)

**Variants Section:**
- Cards for each variant
- Variant name (h5)
- Component in specific state
- Code snippet (optional)

**Props Table (optional):**
- Prop name, type, required, default, description
- Helps developers understand component API

### 7. Variant Examples

**Section Component Variants:**
- Default (collapsed)
- Expanded
- With fields
- Empty state
- Loading state
- Error state

**Field Component Variants:**
- Empty (placeholder visible)
- Filled (value visible)
- Focused (active border)
- Disabled (grayed out)
- Error (red border, error message)
- Required (asterisk indicator)

**Mobile Field Variants:**
- Empty state
- Filled state
- With attachments
- With actions (camera, attach, remarks)
- Signature field (canvas)

### 8. Interactions

**Drawer Interactions:**
- Click item → Switch to selected component view
- Hover item → Background color change
- Keyboard: Tab through items, Enter to select

**Back Button:**
- Click → Navigate to home page (`/`)
- Keyboard: Tab to focus, Enter to activate
- ARIA label: "Back to home"

**Component Demos:**
- Fully interactive (not static screenshots)
- Hover states functional
- Click behaviors functional
- State changes visible in real-time

### 9. Responsive Considerations

**Desktop (>900px):**
- Drawer visible (240px wide)
- Content fills remaining space
- Side-by-side layout

**Tablet (600-900px):**
- Drawer remains visible (may reduce width)
- Content adjusts to smaller space

**Mobile (<600px):**
- Consider collapsible drawer (hamburger menu)
- Drawer overlays content when open
- Full-width content when drawer closed

### 10. Accessibility

**Keyboard Navigation:**
- Tab: Moves between drawer items
- Enter/Space: Selects drawer item
- Shift+Tab: Moves backward

**ARIA Labels:**
- Back button: `aria-label="Back to home"`
- Selected drawer item: `aria-current="page"` or `aria-selected="true"`

**Focus Indicators:**
- Visible outline on all interactive elements
- High contrast (2px solid primary color)

**Screen Reader:**
- Drawer navigation announced as list
- Selected component announced
- Component descriptions read aloud

## Design Decisions
- **Drawer navigation**: Familiar pattern reduces learning curve
- **Live demos**: More valuable than static images for stakeholders
- **Variant showcase**: Demonstrates component flexibility and states
- **No code editor**: Keeps focus on visual/interactive demo (not code complexity)
- **Separate views folder**: Each component demo is isolated, maintainable
- **No sx props**: All styling via `styled()` components

## Related Features
- **Showcases**: `FormFields` components (Section, Field, etc.)
- **Showcases**: `Mobile` components (Mobile fields, containers)
- **Showcases**: Custom buttons (Field library buttons, etc.)
- **Used by**: `/components` route

## Extensibility

**Adding New Component Demo:**
1. Create new view file: `features/ComponentShowcase/views/MyComponent.tsx`
2. Add to `navItems` array in `index.tsx`:
   ```typescript
   { label: 'My Component', value: 'myComponent' }
   ```
3. Add to `contentMap`:
   ```typescript
   myComponent: <MyComponent />
   ```
4. Implement view with variants and documentation

**View Template:**
```typescript
export const MyComponentView = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom>My Component</Typography>
      <Typography variant="body1" mb={2}>
        Brief description of what this component does.
      </Typography>

      {/* Design Principles */}
      <Typography variant="h5" gutterBottom>UX Principles Applied</Typography>
      <ul>
        <li>Jakob's Law: [explanation]</li>
        <li>Fitts's Law: [explanation]</li>
      </ul>

      {/* Variants */}
      <Typography variant="h5" gutterBottom mt={4}>Variants</Typography>

      {/* Default */}
      <Card sx={{ mb: 2, p: 2 }}>
        <Typography variant="h6" gutterBottom>Default</Typography>
        <MyComponent />
      </Card>

      {/* Other variants */}
    </>
  );
};
```

## Future Enhancements
- Search/filter component list
- Category grouping (Web, Mobile, Actions, etc.)
- Props playground (interactive prop controls)
- Code snippets with syntax highlighting
- Copy-to-clipboard for code examples
- Dark mode toggle
- Responsive preview (toggle device sizes)
- Version comparison (show component evolution)
- Export component documentation (PDF/Markdown)
