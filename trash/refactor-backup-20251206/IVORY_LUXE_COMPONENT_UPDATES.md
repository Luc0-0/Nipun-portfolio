# Ivory Luxe - Component Update Guide

## Quick Reference for Component Styling

---

## Navigation.jsx Updates

### Desktop Navigation (Light Mode)
```jsx
// Logo
<span className="text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]">
  NIPUN SUJESH
</span>

// Nav Links
className={`text-sm font-medium transition-all duration-300 ${
  location.pathname === item.path
    ? 'text-[var(--color-accent)]'
    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
}`}

// Theme Toggle Button
className="p-2 rounded-lg border border-[var(--color-border)] 
           hover:border-[var(--color-accent)] transition-all"
```

### Mobile Menu (Light Mode)
```jsx
// Menu background already uses var(--color-bg-primary)
className="fixed inset-0 top-20 z-[99] bg-[var(--color-bg-primary)]/98 backdrop-blur-xl"

// Menu items
className={`text-2xl font-display font-medium py-3 
  border-b border-[var(--color-border)] transition-colors ${
    location.pathname === item.path
      ? 'text-[var(--color-accent)]'
      : 'text-[var(--color-text-primary)]'
  }`}
```

---

## Hero.jsx Styling

### Main Hero Title
```jsx
// Already uses: text-[var(--color-text-primary)]
className="text-5xl md:text-6xl lg:text-7xl font-display font-bold 
           text-[var(--color-text-primary)] mb-6"
```

### Hero Subtitle (Title)
```jsx
// Gold accent - matches Ivory Luxe
className="text-heading-lg text-[var(--color-accent)] mb-8"
```

### Hero Description
```jsx
// Secondary text
className="text-body-lg text-[var(--color-text-secondary)] max-w-2xl mb-6"
```

### Proof Points
```jsx
// Muted text for smaller items
className="text-sm text-[var(--color-text-muted)]"
```

### CTA Buttons
```jsx
// Primary button - Gold with light text
className="btn-primary"
// Already configured to use --color-accent

// Secondary button - Outlined style
className="btn-secondary"
// Already configured with warm border
```

### Stats Section
```jsx
// Stat value
className="text-2xl font-display font-medium text-[var(--color-text-primary)]"

// Stat label
className="text-sm text-[var(--color-text-muted)]"

// Border
className="border-t border-[var(--color-border)]"
```

### Portrait Frame
```jsx
// Decorative borders already use var(--color-accent) and var(--color-border)
// No changes needed - CSS variables handle light mode automatically

// Image container background
className="bg-[var(--color-bg-tertiary)]"

// Overlay gradient
className="bg-gradient-to-t from-[var(--color-bg-primary)]/40 via-transparent to-transparent"
```

### Floating Badge
```jsx
// Glass card - already configured for light mode
className="glass-card px-4 py-3"

// Icon background - uses muted accent
className="rounded-lg bg-[var(--color-accent)]/10"

// Icon color
className="text-[var(--color-accent)]"
```

### Scroll Indicator
```jsx
// Border already uses var(--color-border)
// Indicator dot already uses var(--color-accent)
// No changes needed
```

---

## ProjectGallery.jsx Updates

### Project Card Container
```jsx
// Already uses glass-card
className="glass-card overflow-hidden h-full"
```

### Category Badge
```jsx
// Already uses tag class
className="tag"
```

### Image Overlay
```jsx
// Gradient to primary background
className="bg-gradient-to-t from-[var(--color-bg-primary)] 
           via-[var(--color-bg-primary)]/20 to-transparent"
```

### Project Title
```jsx
className="text-heading-md text-[var(--color-text-primary)]"
```

### Project Description
```jsx
className="text-body-md text-[var(--color-text-secondary)]"
```

### Tech Tags
```jsx
// Uses tag styling
className="tag text-xs"
```

### Project Links
```jsx
// Link hover - gold accent
<motion.a 
  href={project.liveUrl}
  className="inline-flex items-center gap-2 
             text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]
             transition-colors"
/>
```

---

## About.jsx Updates

### Section Label
```jsx
className="text-caption text-[var(--color-accent)] mb-4 block tracking-widest"
```

### Section Title
```jsx
className="text-display-md text-[var(--color-text-primary)]"
```

### Body Text
```jsx
className="text-body-lg text-[var(--color-text-secondary)]"
```

### Education Timeline
```jsx
// Year (accent)
className="text-sm text-[var(--color-accent)] font-mono"

// School name (primary)
className="text-[var(--color-text-primary)] font-medium"

// School location (secondary)
className="text-sm text-[var(--color-text-muted)]"

// Border divider
className="border-t border-[var(--color-border)]"
```

### Stats Cards
```jsx
// Card container
className="glass-card p-6 md:p-8 group hover:border-[var(--color-accent)]/30"

// Stat value
className="text-3xl font-display text-[var(--color-text-primary)] 
           group-hover:text-[var(--color-accent)]"

// Stat label
className="text-sm text-[var(--color-text-secondary)]"

// Stat description
className="text-xs text-[var(--color-text-muted)]"
```

### Capstone Card
```jsx
// Icon background - muted gold
className="rounded-xl bg-[var(--color-accent)]/10"

// Icon color
className="text-[var(--color-accent)]"

// Card title
className="text-[var(--color-text-primary)] font-medium"

// Card description
className="text-sm text-[var(--color-text-secondary)]"
```

---

## NeuralTimeline.jsx Updates

### Timeline Container
```jsx
// Background already uses gradients with var(--color-accent)
// Translucency opacity adjusted for light mode via CSS variables
```

### Timeline Node
```jsx
// Node color - gold accent
// Already styled via CSS: background: var(--color-accent)
// Light mode gets richer gold automatically
```

### Connection Line
```jsx
// Line color - transparent gold
// Already uses: stroke: var(--color-accent)
// Opacity: 0.3 (consistent across themes)
```

### Timeline Entry
```jsx
// Year marker
className="text-sm font-mono text-[var(--color-accent)]"

// Title
className="text-heading-md text-[var(--color-text-primary)]"

// Description
className="text-body-md text-[var(--color-text-secondary)]"

// Card background
className="glass-card p-4"
```

---

## Contact.jsx Updates

### Form Label
```jsx
className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
```

### Input Field
```jsx
className="w-full px-4 py-2 rounded-lg 
           bg-[var(--color-bg-elevated)]
           border border-[var(--color-border)]
           text-[var(--color-text-primary)]
           placeholder-[var(--color-text-muted)]
           focus:border-[var(--color-accent)]
           focus:outline-none focus:ring-1
           focus:ring-[var(--color-accent)]/30
           transition-all"
```

### Submit Button
```jsx
className="btn-primary"
```

### Error Message
```jsx
className="text-sm text-[var(--color-accent)] mt-1"
```

### Success Message
```jsx
// Use gold accent color for confirmation
className="text-sm text-[var(--color-accent)]"
```

---

## Footer.jsx Updates

### Footer Background
```jsx
// Already uses var(--color-bg-secondary)
className="bg-[var(--color-bg-secondary)]"
```

### Footer Text
```jsx
className="text-[var(--color-text-secondary)]"
```

### Footer Links
```jsx
className="text-[var(--color-text-secondary)] 
           hover:text-[var(--color-accent)]
           transition-colors"
```

### Footer Border
```jsx
className="border-t border-[var(--color-border)]"
```

---

## Expertise.jsx Updates

### Skill Category
```jsx
className="text-heading-md text-[var(--color-text-primary)]"
```

### Skill Badge
```jsx
className="tag"
```

### Skill Bars (if used)
```jsx
// Background: var(--color-bg-tertiary)
// Fill: var(--color-accent)
className="bg-[var(--color-bg-tertiary)]"
className="bg-[var(--color-accent)]"
```

---

## Credentials.jsx Updates

### Credential Card
```jsx
className="glass-card p-4 md:p-6 group hover:border-[var(--color-accent)]/30"
```

### Credential Title
```jsx
className="text-heading-md text-[var(--color-text-primary)]"
```

### Issuer
```jsx
className="text-sm text-[var(--color-text-secondary)]"
```

### Issuer Icon Background
```jsx
className="bg-[var(--color-accent)]/10"
```

---

## Common Light Mode Patterns

### Hover Elevation
```jsx
className="transition-all duration-300
           hover:shadow-[var(--shadow-elevated)]
           hover:border-[var(--color-border-hover)]"
```

### Focus Ring
```jsx
className="focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
```

### Disabled State
```jsx
className="disabled:opacity-50 disabled:cursor-not-allowed"
```

### Gradient Text
```jsx
className="bg-gradient-to-r from-[var(--color-accent)] 
           to-[var(--color-text-secondary)]
           bg-clip-text text-transparent"
```

---

## Testing Checklist for Each Component

### For each component, verify:
- [ ] Text colors: Primary (#2b2620), Secondary (#6b6259), Muted (#9a9086)
- [ ] Accent color: #c4a872 (gold)
- [ ] Borders: rgba(107, 98, 89, 0.12) (warm neutral)
- [ ] Shadows: Warm-tinted, not gray
- [ ] Glass cards: Warm cream background with blur
- [ ] Buttons: Gold primary, warm secondary
- [ ] Hover states: Proper color/shadow transitions
- [ ] Focus states: Gold ring/border
- [ ] Responsive: All breakpoints tested

---

## CSS Variable Dependency Map

### Every component relies on these CSS variables:

**Text Colors**
- `--color-text-primary`: Primary text (#2b2620)
- `--color-text-secondary`: Secondary text (#6b6259)
- `--color-text-muted`: Muted text (#9a9086)

**Backgrounds**
- `--color-bg-primary`: Main background (#faf9f6)
- `--color-bg-secondary`: Secondary bg (#f3f1ed)
- `--color-bg-tertiary`: Tertiary bg (#e8e5de)
- `--color-bg-elevated`: Elevated surfaces (#fffbf7)

**Accents & Borders**
- `--color-accent`: Gold accent (#c4a872)
- `--color-accent-hover`: Gold hover (#b39560)
- `--color-accent-muted`: Gold muted (rgba)
- `--color-border`: Border line (rgba)
- `--color-border-hover`: Border hover (rgba)

**Shadows**
- `--shadow-glow`: Glow effect
- `--shadow-card`: Card shadow
- `--shadow-elevated`: Elevated shadow

**Grain**
- `--grain-opacity`: Grain visibility (0.06 light, 0.03 dark)

---

## Migration Completion

Once you verify all components display correctly in light mode:

1. **Test Theme Toggle**: Light ↔ Dark switching
2. **Verify Animations**: Smooth 0.5s transitions
3. **Check Mobile**: All breakpoints render correctly
4. **Validate Contrast**: WCAG AAA (7:1+ for text)
5. **Performance Check**: No layout shifts or flickering
6. **Browser Test**: Chrome, Firefox, Safari, Edge

All CSS variables automatically adjust colors, shadows, and effects for light mode. No component code changes required unless you want light-specific behavior.
