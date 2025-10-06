# Mobile Components

Shared dumb components for mobile form views.

## Components

### 1. MobileDevice

Android-style device frame with status bar and navigation.

```tsx
import { MobileDevice } from '@/components/mobile';

<MobileDevice statusBarTime="12:30">
  {/* Your mobile content here */}
</MobileDevice>
```

**Props:**
- `children`: Content to display inside device screen
- `statusBarTime?: string` - Override time (default: "12:30")
- `showWifi?: boolean` - Show wifi icon (default: true)
- `showSignal?: boolean` - Show signal icon (default: true)
- `showBattery?: boolean` - Show battery icon (default: true)

---

### 2. FormHeader

Header showing app name, case number, and timestamps.

```tsx
import { FormHeader, transformCaseToFormHeader } from '@/components/mobile';

// Manual props
<FormHeader
  appLabel="Equipment Inspection"
  caseNumber="WV-1023"
  createdAt="Created April 23, 2023 at 12:20pm"
  updatedAt="Updated April 29, 2023 at 04:20pm"
/>

// From API response
const response = await fetchCase(caseId);
const headerProps = transformCaseToFormHeader(response);
<FormHeader {...headerProps} />
```

**Props:**
- `appLabel: string` - App name (from `response.data.type.name`)
- `caseNumber: string` - Case ID (from `response.data.postRef`)
- `createdAt: string` - Formatted creation timestamp
- `updatedAt: string` - Formatted update timestamp

**Response Mapping:**
- `appLabel` ← `response.data.type.name`
- `caseNumber` ← `response.data.postRef`
- `createdAt` ← `formatTimestamp(response.data.createdAt, 'Created')`
- `updatedAt` ← `formatTimestamp(response.data.updatedAt, 'Updated')`

---

### 3. MobileSection

Collapsible section for grouping form fields.

```tsx
import { MobileSection } from '@/components/mobile';
import { useState } from 'react';

const [isExpanded, setIsExpanded] = useState(true);

<MobileSection
  title="Basic Details"
  completionText="3/5 (60%)"
  isExpanded={isExpanded}
  onToggle={() => setIsExpanded(!isExpanded)}
>
  {/* Field components */}
</MobileSection>
```

**Props:**
- `title: string` - Section name
- `completionText?: string` - Optional completion status (e.g., "3/5 (60%)")
- `isExpanded: boolean` - Whether section is expanded
- `onToggle: () => void` - Callback when toggled
- `children?: React.ReactNode` - Section content (fields)

**Note:** Mobile sections are collapsible but NOT draggable (user view only).

---

## Complete Example

```tsx
import { MobileDevice, FormHeader, MobileSection, transformCaseToFormHeader } from '@/components/mobile';
import { useState } from 'react';

// Sample API response
const caseResponse = {
  data: {
    id: "59729bcf-5dca-48f8-b074-e1a33700fbc2",
    postRef: "WV-25",
    createdAt: "2025-09-19T09:26:04.885Z",
    updatedAt: "2025-09-19T09:26:04.885Z",
    type: {
      name: "Equipment Inspection"
    }
    // ... other fields
  }
};

export const MobileFormPreview = () => {
  const [section1Expanded, setSection1Expanded] = useState(true);
  const [section2Expanded, setSection2Expanded] = useState(false);

  const headerProps = transformCaseToFormHeader(caseResponse);

  return (
    <MobileDevice statusBarTime="12:30">
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <FormHeader {...headerProps} />

        <MobileSection
          title="Basic Details"
          completionText="3/5 (60%)"
          isExpanded={section1Expanded}
          onToggle={() => setSection1Expanded(!section1Expanded)}
        >
          {/* Add field components here */}
        </MobileSection>

        <MobileSection
          title="Inspector"
          completionText="0/2 (0%)"
          isExpanded={section2Expanded}
          onToggle={() => setSection2Expanded(!section2Expanded)}
        >
          {/* Add field components here */}
        </MobileSection>
      </div>
    </MobileDevice>
  );
};
```

---

## Design References

- **MobileDevice**: Android phone frame (360x720px)
- **FormHeader**: Figma node-id 323-9661
- **MobileSection**: Figma node-id 318-11610

---

## File Structure

```
components/mobile/
├── MobileDevice/
│   ├── index.tsx
│   ├── styles.ts
│   └── types.ts
├── FormHeader/
│   ├── index.tsx
│   ├── styles.ts
│   ├── types.ts
│   └── utils.ts         # API response transformation
├── Section/
│   ├── index.tsx
│   ├── styles.ts
│   └── types.ts
├── index.ts             # Main exports
└── README.md            # This file
```
