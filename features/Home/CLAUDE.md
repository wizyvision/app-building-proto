# Home Feature

## Purpose
Navigation hub and landing page for the WizyVision Form Builder prototype. Provides stakeholders with clear entry points to explore prototypes and component showcases.

## Key Points

### 1. Central Navigation Hub
- **Primary CTAs**: Two main actions (View Prototypes, View Components)
- **Clear purpose**: Explains prototype goal (device-based form layout builder)
- **Feature overview**: Lists 5 key prototype capabilities

### 2. UX Principles Applied

**Jakob's Law**: Familiar landing page pattern
- Hero section with centered content
- Primary/secondary button hierarchy
- Standard card-based feature display

**Fitts's Law**: Easy-to-target actions
- Large buttons (48x48px minimum)
- Central positioning for primary actions
- 16px spacing between buttons prevents mis-clicks

**Hick's Law**: Limited choices reduce decision time
- Only 2 primary navigation options
- Feature list is informational only (read-only)
- No decision paralysis

**Visual Hierarchy**: Clear content priority
- h1 for main heading (largest, most prominent)
- Body text for description
- Primary button (contained) vs Secondary (outlined)
- Feature card with subtle elevation

**Miller's Law**: Information chunking
- 5 feature items (within 5-7 cognitive limit)
- Easy to scan and comprehend

### 3. Component Structure
```
features/Home/
├── index.tsx      # Main landing page component
└── styles.ts      # Styled components (PageContainer, HeroSection, etc.)
```

### 4. Interactions
- **Hover**: Buttons darken, subtle elevation increase
- **Click "View Prototypes"**: Navigate to `/prototypes`
- **Click "View Components"**: Navigate to `/components`
- **Keyboard**: Tab navigation, Enter to activate links

### 5. Accessibility
- Semantic HTML hierarchy (h1, h2, ul)
- Sufficient color contrast (WCAG AA compliant)
- Focus indicators on interactive elements
- Screen reader friendly content structure

## Related Components
- Uses MUI `Container`, `Typography`, `Button`, `Card`
- Custom styled components: `PageContainer`, `HeroSection`, `ButtonGroup`, `FeatureCard`

## Design Decisions
- **Minimal content**: Reduces cognitive load, focuses on navigation
- **Centered layout**: Desktop-friendly, professional appearance
- **Card for features**: Visual separation, scannable format
- **Outlined secondary button**: Clear hierarchy without competing with primary CTA
