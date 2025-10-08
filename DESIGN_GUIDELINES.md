# WizyVision Design Guidelines

> **Purpose**: Navigation hub for all design and UI development rules.

---

## 📖 Quick Navigation

Choose the topic you need:

### 🎨 [Theme Reference](./docs/theme.md)
Colors, spacing, typography, shadows, breakpoints, transitions
- **When**: Styling any component
- **Contains**: Complete theme token reference

### 🎯 [Styling Rules](./docs/styling-rules.md)
styled() components, no sx prop, theme usage
- **When**: Writing component styles
- **Contains**: Styling hierarchy, patterns, common mistakes

### 🏗️ [Component Structure](./docs/component-structure.md)
Directory organization, versioning, dumb vs smart
- **When**: Creating or organizing components
- **Contains**: File structure, versioning rules, import patterns

### 🧠 [UX Principles](./docs/ux-principles.md)
Jakob's Law, Fitts's Law, Hick's Law, Miller's Law, Visual Hierarchy
- **When**: Designing any interaction
- **Contains**: Principle definitions, examples, documentation requirements

### ⚙️ [Interactivity](./docs/interactivity.md)
Hover, focus, disabled states, transitions, responsive design
- **When**: Making components interactive
- **Contains**: State requirements, transitions, keyboard navigation, touch targets

### 🎨 [Figma Workflow](./docs/figma-workflow.md)
Extracting specs, implementing designs pixel-perfect
- **When**: Implementing from Figma designs
- **Contains**: Step-by-step process, CSS translation, mobile vs web

---

## 🚀 Quick Start

### "I'm creating a new component"
1. Read [Component Structure](./docs/component-structure.md) - Where to put it?
2. Read [UX Principles](./docs/ux-principles.md) - Which principles apply?
3. Read [Styling Rules](./docs/styling-rules.md) - How to style it?
4. Read [Interactivity](./docs/interactivity.md) - What states to implement?
5. Reference [Theme](./docs/theme.md) - Use theme tokens

### "I'm implementing from Figma"
1. Read [Figma Workflow](./docs/figma-workflow.md) - Complete process
2. Reference [Theme](./docs/theme.md) - Theme tokens (if needed)
3. Reference [Styling Rules](./docs/styling-rules.md) - Implementation patterns

### "I'm styling an existing component"
1. Read [Styling Rules](./docs/styling-rules.md) - Rules and patterns
2. Reference [Theme](./docs/theme.md) - Available tokens
3. Reference [Interactivity](./docs/interactivity.md) - Required states

---

## ✅ Pre-Commit Checklist

Before committing ANY component:

### Structure
- [ ] In correct directory ([Component Structure](./docs/component-structure.md))
- [ ] Versioned if breaking changes ([Component Structure](./docs/component-structure.md))
- [ ] All styled() in styles.ts ([Styling Rules](./docs/styling-rules.md))

### Styling
- [ ] Zero sx prop usage ([Styling Rules](./docs/styling-rules.md))
- [ ] All theme tokens used ([Theme](./docs/theme.md))
- [ ] No hardcoded values ([Styling Rules](./docs/styling-rules.md))

### UX
- [ ] Principles documented ([UX Principles](./docs/ux-principles.md))
- [ ] At least 2 principles applied ([UX Principles](./docs/ux-principles.md))
- [ ] Touch targets 44x44px+ ([UX Principles](./docs/ux-principles.md))

### Interactivity
- [ ] All states implemented ([Interactivity](./docs/interactivity.md))
- [ ] Smooth transitions ([Interactivity](./docs/interactivity.md))
- [ ] Keyboard navigation ([Interactivity](./docs/interactivity.md))
- [ ] Mobile responsive ([Interactivity](./docs/interactivity.md))

---

## 🎯 Common Tasks

| Task | Read These Docs |
|------|-----------------|
| Create button component | [Component Structure](./docs/component-structure.md), [Styling Rules](./docs/styling-rules.md), [UX Principles](./docs/ux-principles.md), [Interactivity](./docs/interactivity.md) |
| Implement Figma design | [Figma Workflow](./docs/figma-workflow.md), [Styling Rules](./docs/styling-rules.md), [Theme](./docs/theme.md) |
| Add hover effects | [Interactivity](./docs/interactivity.md), [Styling Rules](./docs/styling-rules.md), [Theme](./docs/theme.md) |
| Version existing component | [Component Structure](./docs/component-structure.md) |
| Apply UX principles | [UX Principles](./docs/ux-principles.md) |
| Make component responsive | [Interactivity](./docs/interactivity.md), [Theme](./docs/theme.md) |
| Fix styling issues | [Styling Rules](./docs/styling-rules.md), [Theme](./docs/theme.md) |

---

## 🚫 Critical Rules (Zero Tolerance)

1. **NO sx prop in production** → [Styling Rules](./docs/styling-rules.md)
2. **ALL styling in styles.ts** → [Styling Rules](./docs/styling-rules.md)
3. **NO hardcoded values** → [Styling Rules](./docs/styling-rules.md) + [Theme](./docs/theme.md)
4. **UX principles documented** → [UX Principles](./docs/ux-principles.md)
5. **ALL interaction states** → [Interactivity](./docs/interactivity.md)
6. **Touch targets 44x44px+** → [UX Principles](./docs/ux-principles.md) + [Interactivity](./docs/interactivity.md)

---

## 📚 Documentation Structure

```
/
├── DESIGN_GUIDELINES.md (this file - navigation)
├── ARCHITECTURE.md (data, logic, integration)
├── CLAUDE.md (main orchestrator)
│
└── docs/
    ├── theme.md
    ├── styling-rules.md
    ├── component-structure.md
    ├── ux-principles.md
    ├── interactivity.md
    └── figma-workflow.md
```

---

## 🔗 Related Documentation

- **Architecture & Data**: [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Main Project Guide**: [CLAUDE.md](./CLAUDE.md)
- **Feature-specific docs**: Check `features/[FeatureName]/CLAUDE.md`

---

**REMEMBER**: This prototype is for stakeholder feedback. Quality > Speed. Follow all guidelines strictly.
