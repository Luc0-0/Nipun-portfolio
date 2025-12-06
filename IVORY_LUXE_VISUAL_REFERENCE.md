# Ivory Luxe - Visual Reference & Cheat Sheet

## Color Swatches

```
═════════════════════════════════════════════════════════════════
                    IVORY LUXE LIGHT THEME
═════════════════════════════════════════════════════════════════

BACKGROUNDS
──────────────────────────────────────────────────────────────────
Primary       #faf9f6  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░ Warm ivory
Secondary     #f3f1ed  ░░░░░░░░░░░░░░░░░░░░░░░░░ Soft warm gray
Tertiary      #e8e5de  ░░░░░░░░░░░░░░░░░░░░░░ Subtle warm gray
Elevated      #fffbf7  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ Cream white

TEXT
──────────────────────────────────────────────────────────────────
Primary       #2b2620  ████████████████████████████ Deep charcoal
Secondary     #6b6259  ██████████████ Warm gray (60% lighter)
Muted         #9a9086  ████████████ Soft gray (80% lighter)

ACCENT (GOLD)
──────────────────────────────────────────────────────────────────
Main          #c4a872  ═══════════════════ Rich refined gold
Hover         #b39560  ═════════════════ Darker gold (interaction)
Muted         rgba(196, 168, 114, 0.12)  Subtle gold tint

BORDERS & DIVIDERS
──────────────────────────────────────────────────────────────────
Standard      rgba(107, 98, 89, 0.12)    Warm neutral (12%)
Hover         rgba(196, 168, 114, 0.25)  Gold tint (25%)

SHADOWS
──────────────────────────────────────────────────────────────────
Glow          0 0 40px rgba(196, 168, 114, 0.12)  Warm soft glow
Card          0 2px 12px rgba(43, 38, 32, 0.08)   Subtle shadow
Elevated      0 8px 32px rgba(43, 38, 32, 0.12)   Cinematic depth

═════════════════════════════════════════════════════════════════
```

---

## Component States

### Buttons

#### Primary Button (Gold)
```
STATE        BACKGROUND      TEXT COLOR   SHADOW
────────────────────────────────────────────────────────
Default      #c4a872        #faf9f6      0 8px 24px rgba(196, 168, 114, 0.25)
Hover        #b39560        #faf9f6      0 8px 24px rgba(196, 168, 114, 0.25)
                             (Y-offset -2px)
Focus        #b39560        #faf9f6      + ring-1 gold
Active       #9a7547        #faf9f6      None (pressed)
Disabled     #c4a872        #faf9f6      None (opacity 50%)
```

**Copy-paste className:**
```jsx
className="btn-primary"
```

#### Secondary Button (Outlined)
```
STATE        BACKGROUND                BORDER               TEXT
────────────────────────────────────────────────────────────────
Default      transparent               rgba(107, 98, 89, 0.12)    #2b2620
Hover        rgba(196, 168, 114, 0.12) #c4a872                   #c4a872
Focus        rgba(196, 168, 114, 0.12) #c4a872 + ring            #c4a872
Active       rgba(196, 168, 114, 0.2)  #c4a872                   #c4a872
Disabled     transparent               rgba(107, 98, 89, 0.08)    #6b6259
```

**Copy-paste className:**
```jsx
className="btn-secondary"
```

---

### Glass Cards

```
PROPERTY              LIGHT MODE VALUE
──────────────────────────────────────────────────────
Background            rgba(255, 253, 247, 0.6)
Backdrop Filter       blur(16px)
Border                1px solid rgba(107, 98, 89, 0.12)
Border Radius         1rem (16px)
Shadow (default)      0 2px 12px rgba(43, 38, 32, 0.08)
Shadow (hover)        0 8px 32px rgba(43, 38, 32, 0.12)
Transition            all 0.4s cubic-bezier(0.22, 1, 0.36, 1)

On Hover:
  Background opacity: 0.6 → 0.8
  Border color: warm neutral → gold tint
  Shadow: card → elevated
```

**Copy-paste className:**
```jsx
className="glass-card"
```

---

### Tags / Badges

```
PROPERTY              VALUE
──────────────────────────────────────────────────────
Background            rgba(196, 168, 114, 0.12)
Text Color            #c4a872
Border                1px solid rgba(107, 98, 89, 0.12)
Border Radius         9999px (pill shape)
Padding               0.375rem 0.875rem
Font Size             0.75rem (12px)
Font Weight           500
Letter Spacing        0.05em
Text Transform        uppercase
Transition            all 0.3s ease

On Hover:
  Background: 0.12 → 0.18
  Border: warm neutral → gold
```

**Copy-paste className:**
```jsx
className="tag"
```

---

### Input Fields

```
STATE        BACKGROUND       BORDER                          TEXT COLOR
──────────────────────────────────────────────────────────────────────
Default      #fffbf7          rgba(107, 98, 89, 0.12)        #2b2620
Focus        #fffbf7          #c4a872                         #2b2620
                               + ring-1 rgba(196, 168, 114, 0.3)
Filled       #fffbf7          rgba(107, 98, 89, 0.12)        #2b2620
Error        #fffbf7          #c4a872 (gold, not red)         #2b2620
Disabled     #f3f1ed          rgba(107, 98, 89, 0.08)         #9a9086
Placeholder  —                —                                #9a9086 (30%)
```

**Copy-paste className:**
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

---

## Text Hierarchy

```
ELEMENT                     FONT FAMILY         SIZE        COLOR               WEIGHT
─────────────────────────────────────────────────────────────────────────────────────
H1 (Page Title)            Playfair Display    3–7rem      #2b2620             500–700
H2 (Section Title)         Playfair Display    2–4.5rem    #2b2620             500–700
H3 (Subsection)            Playfair Display    1.5–2.25rem #2b2620             600
H4 (Card Title)            Inter               1.125–1.5rem #2b2620            600
Body Large                 Inter               1.125rem    #6b6259             400
Body Regular               Inter               1rem        #6b6259             400
Body Small                 Inter               0.875rem    #6b6259             400
Caption/Label              Inter               0.75rem     #9a9086             500
Accent Label               JetBrains Mono      0.75rem     #c4a872             500
Code/Technical             JetBrains Mono      0.875rem    #9a9086             400
```

---

## Spacing Scale

```
SCALE     VALUE    USE CASE
──────────────────────────────────────────────
XS        0.25rem  Micro spacing (4px)
SM        0.5rem   Small gaps (8px)
MD        0.75rem  Default padding (12px)
LG        1rem     Button padding, normal gap (16px)
XL        1.5rem   Card padding (24px)
2XL       2rem     Section spacing (32px)
3XL       3rem     Large spacing (48px)
4XL       4rem     Block spacing (64px)
5XL       6rem     Section vertical (96px)
6XL       8rem     Major sections (128px)
```

---

## Shadow Reference

```
SHADOW                  VALUE
──────────────────────────────────────────────────────────────
Glow (accent)          0 0 40px rgba(196, 168, 114, 0.12)
Card (default)         0 2px 12px rgba(43, 38, 32, 0.08)
Elevated (hover)       0 8px 32px rgba(43, 38, 32, 0.12)

All are warm-tinted (brown/gold), NOT gray
Blur radius 12–32px for cinematic softness
Opacity 8–12% for subtle, premium feel
```

---

## Animation Timings

```
ELEMENT              DURATION    EASING                         BEHAVIOR
──────────────────────────────────────────────────────────────────────────
Button Hover         0.3s        cubic-bezier(0.22, 1, 0.36, 1) Scale 1.02x
Button Active        0.3s        cubic-bezier(0.22, 1, 0.36, 1) Y-translate -2px
Card Hover           0.4s        cubic-bezier(0.22, 1, 0.36, 1) Shadow elevation
Input Focus          0.3s        cubic-bezier(0.22, 1, 0.36, 1) Ring expansion
Link Hover           0.3s        ease-in-out                   Color → gold
Page Transition      0.5s        cubic-bezier(0.4, 0, 0.2, 1)  Smooth fade
Theme Toggle         0.5s        ease                          Cross-fade
Scroll Animation     0.8–1.2s    easeInOut                     Staggered enters
```

---

## Tailwind Classes (Light Mode)

### Colors
```jsx
// Text
className="text-[var(--color-text-primary)]"      // #2b2620
className="text-[var(--color-text-secondary)]"    // #6b6259
className="text-[var(--color-text-muted)]"        // #9a9086
className="text-[var(--color-accent)]"             // #c4a872

// Backgrounds
className="bg-[var(--color-bg-primary)]"           // #faf9f6
className="bg-[var(--color-bg-secondary)]"         // #f3f1ed
className="bg-[var(--color-bg-tertiary)]"          // #e8e5de
className="bg-[var(--color-bg-elevated)]"          // #fffbf7
className="bg-[var(--color-accent)]/10"            // Gold muted tint

// Borders
className="border border-[var(--color-border)]"
className="hover:border-[var(--color-border-hover)]"
className="focus:border-[var(--color-accent)]"

// Shadows
className="shadow-[var(--shadow-card)]"
className="hover:shadow-[var(--shadow-elevated)]"
```

### Buttons
```jsx
className="btn-primary"      // Gold filled
className="btn-secondary"     // Outlined with gold hover
```

### Cards
```jsx
className="glass-card"       // Premium glass effect
className="glass-card p-6"   // With padding
```

### Tags
```jsx
className="tag"              // Gold badge/label
```

---

## Common Patterns

### Hoverable Card
```jsx
<div className="glass-card p-6 group hover:border-[var(--color-accent)]/30
              transition-all duration-300">
  <h3 className="text-[var(--color-text-primary)]">Title</h3>
  <p className="text-[var(--color-text-secondary)]">Description</p>
</div>
```

### Accent Link
```jsx
<a href="#" className="text-[var(--color-accent)] 
            hover:text-[var(--color-accent-hover)]
            transition-colors">
  Learn More
</a>
```

### Icon with Gold Background
```jsx
<div className="w-12 h-12 rounded-lg 
               bg-[var(--color-accent)]/10 
               flex items-center justify-center">
  <svg className="w-6 h-6 text-[var(--color-accent)]" />
</div>
```

### Divider Line
```jsx
<div className="h-px bg-gradient-to-r 
               from-transparent via-[var(--color-border)] 
               to-transparent" />
```

### Section with Gold Accent
```jsx
<section>
  <span className="text-caption text-[var(--color-accent)] 
                  mb-4 block tracking-widest">
    SECTION LABEL
  </span>
  <h2 className="text-display-md text-[var(--color-text-primary)]">
    Section Title
  </h2>
</section>
```

---

## Before/After Reference

### Old Light Mode (Washed Out)
```
BG Primary:      #fafafa         (cold white)
BG Secondary:    #f5f5f5         (generic gray)
BG Tertiary:     #e5e5e5         (bland)
Text Primary:    #0a0a0b         (pure black)
Text Secondary:  #525252         (cold gray)
Accent:          #a67c2e         (weak gold)
Borders:         rgba(0,0,0,0.08) (cold)
Shadows:         rgba(0,0,0,0.08) (flat, weak)
```
**Feel**: Flat, cold, uninspired, low contrast

### New Ivory Luxe (Premium)
```
BG Primary:      #faf9f6         (warm ivory)
BG Secondary:    #f3f1ed         (warm neutral)
BG Tertiary:     #e8e5de         (warm gray)
Text Primary:    #2b2620         (warm charcoal)
Text Secondary:  #6b6259         (warm gray)
Accent:          #c4a872         (rich gold)
Borders:         rgba(107,98,89,0.12) (warm)
Shadows:         rgba(43,38,32,0.08+) (cinematic)
```
**Feel**: Warm, expensive, cinematic, professional

---

## Grain Overlay Specifications

```
PROPERTY            VALUE
──────────────────────────────────────────────────────────
Type                SVG fractal noise
Opacity (Light)     6% (0.06)
Opacity (Dark)      3% (0.03)
Blend Mode          overlay (multiply for alternative)
Pattern Frequency   0.9 baseFrequency
Octaves             4 layers
Position            Fixed (entire viewport)
Pointer Events      None (non-interactive)
Z-Index             Below content (z-index: 1)
```

**Effect**: Premium film grain that adds texture without distraction. More visible in light mode (6%) to compensate for brightness.

---

## Quick Conversion Checklist

When updating a component to use Ivory Luxe:

- [ ] Text: Replace cold blacks with warm charcoal (#2b2620)
- [ ] Secondary text: Warm gray (#6b6259), not cold gray
- [ ] Accents: Use #c4a872 gold (rich, refined)
- [ ] Borders: Warm neutral rgba(107, 98, 89, 0.12)
- [ ] Shadows: Warm-tinted, blur 12-32px
- [ ] Backgrounds: Warm ivories (#faf9f6, #f3f1ed, #e8e5de, #fffbf7)
- [ ] Glass cards: Warm cream rgba(255, 253, 247, 0.6) + blur
- [ ] Buttons: Gold primary, outlined secondary with gold hover
- [ ] Hover states: Color shift + shadow elevation
- [ ] Focus states: Gold ring (2px)
- [ ] Grain: 6% SVG fractal noise overlay

---

## Design Tokens for Copy-Paste

```css
/* Colors */
--color-text-primary:     #2b2620
--color-text-secondary:   #6b6259
--color-text-muted:       #9a9086
--color-accent:           #c4a872
--color-accent-hover:     #b39560
--color-accent-muted:     rgba(196, 168, 114, 0.12)
--color-bg-primary:       #faf9f6
--color-bg-secondary:     #f3f1ed
--color-bg-tertiary:      #e8e5de
--color-bg-elevated:      #fffbf7
--color-border:           rgba(107, 98, 89, 0.12)
--color-border-hover:     rgba(196, 168, 114, 0.25)

/* Shadows */
--shadow-glow:            0 0 40px rgba(196, 168, 114, 0.12)
--shadow-card:            0 2px 12px rgba(43, 38, 32, 0.08)
--shadow-elevated:        0 8px 32px rgba(43, 38, 32, 0.12)

/* Grain */
--grain-opacity:          0.06
```

---

## Accessibility Notes

- **Text Contrast**: Minimum 7:1 (WCAG AAA)
- **Focus States**: 2px gold ring with 2px offset
- **Motion**: All animations 0.3–1.2s, smooth easing
- **Color Independence**: Don't rely on color alone (use borders, text weight)
- **Touch Targets**: Minimum 44px × 44px
- **Readability**: Line-height 1.6–1.7, max-width ~65 chars
- **Grain Overlay**: Subtle enough not to interfere with reading

---

## Testing Verification

When light mode is live, verify:

- [ ] Text on all backgrounds meets 7:1 contrast ratio
- [ ] Gold accent appears consistently across all components
- [ ] Grain overlay visible but not distracting (6% opacity)
- [ ] Shadows create proper depth (no flat feeling)
- [ ] Borders are warm, not cold
- [ ] Buttons have clear hover/active states
- [ ] Theme toggle works (smooth 0.5s transition)
- [ ] All interactive elements respond to hover/focus
- [ ] Mobile responsive (light mode on all breakpoints)
- [ ] Dark ↔ Light switching preserves all functionality

---

This reference sheet covers every aspect of the Ivory Luxe light theme. Use it as a guide when implementing, updating, or verifying components.
