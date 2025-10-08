# PrototypeNav v1

Navigation component for prototype pages with version navigation and back button.

## Features

- **Back Navigation**: Returns to feature overview page
- **Version Display**: Shows current version with chip
- **Version Navigation**: Previous/Next version arrows (when available)
- **Sticky Positioning**: Stays at top during scroll
- **Responsive**: Works across all screen sizes

## Usage

```tsx
import { PrototypeNav } from '@/components/PrototypeNav/version1';

export default function MyPrototypePage() {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PrototypeNav
        feature="form-builder"
        version="3.1"
        displayName="Form Builder"
        previousVersion="3.0"
        nextVersion="3.2"
      />
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        {/* Your prototype content */}
      </Box>
    </Box>
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `feature` | `string` | Yes | Feature slug (e.g., "form-builder") |
| `version` | `string` | Yes | Current version (e.g., "3.0", "3.1") |
| `displayName` | `string` | No | Human-readable feature name |
| `previousVersion` | `string` | No | Previous version for back arrow |
| `nextVersion` | `string` | No | Next version for forward arrow |
| `backLink` | `string` | No | Custom back link (defaults to `/prototypes/{feature}`) |

## UX Principles Applied

- **Jakob's Law**: Back button in expected top-left position
- **Visual Hierarchy**: Clear separation between navigation and content
- **Consistency**: Reusable pattern across all prototype pages
- **Feedback**: Hover states on all interactive elements

## Styling

All styles in [styles.ts](./styles.ts):
- Zero `sx` props in component
- Theme tokens only
- Responsive breakpoints
- Accessibility-compliant touch targets

## Related Components

- Used in: All `/prototypes/{feature}/version/{id}` pages
- Navigation target: Feature overview pages
