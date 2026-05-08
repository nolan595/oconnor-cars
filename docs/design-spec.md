# O'Connor Cars — Design Specification

**Version:** 1.0  
**Date:** 2026-05-08  
**Project:** O'Connor Cars — VW/Audi Specialist, Finglas, Dublin  
**Audience:** Dublin car owners, primarily mobile, local to Finglas/North Dublin

---

## 1. Concept & Direction

### Core Aesthetic

**Dark automotive premium.** The design takes its authority directly from the logo: near-black backgrounds, deep crimson red as the sole accent, and heavy white typography. Think of the aesthetic language of a premium motorsport brand or a high-end tyre shop — not a generic white-card SME website.

This is not a luxury car dealership, so the design should feel serious and capable rather than glamorous. The goal is earned trust: a family-run garage that has been around long enough to know these cars inside-out. Confident. Local. Skilled.

### What Makes This Memorable

- The colour system is pulled directly from the logo — the red is the exact crimson from the circular "C" mark. Nothing is invented.
- Headings are set in a condensed, uppercase display font that reads like signage — bold, functional, garage-like.
- The hero section is full-bleed cinema: dark-overlaid garage/automotive imagery, white headline at maximum weight, two unmistakable red CTAs.
- Service cards are dark slabs that lift on hover with a red accent stroke — no shadows-on-white, no light gradients.
- The entire palette has exactly three neutral tones plus one accent. Discipline = quality.

### Typography Rationale

**Display: Barlow Condensed** — A condensed grotesque with genuine character. Uppercase at heavy weights reads like workshop signage or racing livery. Practical and powerful. Not Inter. Not Roboto.

**Body: DM Sans** — Clean, geometric, highly legible at small sizes on mobile screens. Slightly warm compared to pure system fonts. Pairs cleanly with Barlow Condensed's compressed structure because it occupies completely different visual territory.

Both fonts are loaded from Google Fonts and available under open licences.

---

## 2. Colour Tokens

All values are defined as CSS custom properties on `:root`.

```css
:root {
  /* Core palette — derived directly from the O'Connor Cars logo */
  --color-black:         #0A0A0A;   /* True near-black: page background, hero overlay */
  --color-surface-dark:  #111111;   /* Section backgrounds: Services, Hours */
  --color-surface-mid:   #1A1A1A;   /* Card backgrounds, form backgrounds */
  --color-surface-edge:  #242424;   /* Card borders, dividers, subtle separators */

  /* Brand red — sampled from the logo's circular "C" mark */
  --color-red:           #C41E1E;   /* Primary accent: CTAs, hover states, active indicators */
  --color-red-dark:      #A01818;   /* Pressed state on red buttons */
  --color-red-muted:     #7A1212;   /* Subtle red: card accent borders, checklist bullets */

  /* Text */
  --color-text-primary:  #F5F5F5;   /* Primary body text, headings */
  --color-text-secondary:#A0A0A0;   /* Supporting text, labels, meta */
  --color-text-muted:    #666666;   /* Placeholder, disabled, footer sub-text */
  --color-text-inverse:  #0A0A0A;   /* Text on red buttons */

  /* Semantic */
  --color-success:       #2E7D32;   /* NCT checklist pass items */
  --color-success-light: #4CAF50;   /* Success icon fill */
  --color-warning:       #E65100;   /* Caution states */
  --color-error:         #B71C1C;   /* Form validation errors */
  --color-info:          #1565C0;   /* Informational callouts */

  /* Overlays */
  --color-overlay-hero:  rgba(10, 10, 10, 0.72);   /* Hero image dark overlay */
  --color-overlay-card:  rgba(10, 10, 10, 0.40);   /* Card image overlays if used */
}
```

### Colour Usage Rules

- `--color-black` is the page root background. No section should ever go lighter than `--color-surface-dark`.
- `--color-red` is used exclusively for interactive elements (CTAs, hover accents, active states) and brand marks. It is never used as a background for large areas.
- White text (`--color-text-primary`) on `--color-black` achieves approximately 18:1 contrast — well beyond WCAG AA.
- Red (`--color-red`) on black achieves approximately 3.8:1 — acceptable for large display text and interactive elements. It is never used for small body text.
- No gradients on the primary palette. The only gradient permitted is on the hero overlay (`linear-gradient` from black base to transparent), which is purely atmospheric.

---

## 3. Typography Scale

### Font Families

```css
:root {
  --font-display: 'Barlow Condensed', sans-serif;
  --font-body:    'DM Sans', sans-serif;
}
```

**Google Fonts import (in `<head>`):**
```
https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap
```

### Type Scale

All `font-size` values are in `rem`. Base = `16px`.

| Token             | Size      | Line Height | Letter Spacing | Weight | Font     | Usage |
|-------------------|-----------|-------------|----------------|--------|----------|-------|
| `--text-xs`       | 0.75rem   | 1.4         | 0.04em         | 400    | DM Sans  | Labels, captions, footer sub-text |
| `--text-sm`       | 0.875rem  | 1.5         | 0.02em         | 400    | DM Sans  | Secondary body, opening hours table |
| `--text-base`     | 1rem      | 1.6         | 0              | 400    | DM Sans  | Body copy, service card descriptions |
| `--text-lg`       | 1.125rem  | 1.5         | 0              | 500    | DM Sans  | Lead text, checklist items |
| `--text-xl`       | 1.25rem   | 1.4         | 0              | 600    | DM Sans  | Sub-headings, card titles |
| `--text-2xl`      | 1.5rem    | 1.3         | -0.01em        | 700    | Barlow Condensed | Section sub-headings |
| `--text-3xl`      | 2rem      | 1.15        | -0.02em        | 700    | Barlow Condensed | Section headings (uppercase) |
| `--text-4xl`      | 2.75rem   | 1.05        | -0.02em        | 800    | Barlow Condensed | Hero sub-headline (uppercase) |
| `--text-5xl`      | 3.75rem   | 0.95        | -0.03em        | 800    | Barlow Condensed | Hero headline (uppercase, mobile) |
| `--text-6xl`      | 5.5rem    | 0.9         | -0.04em        | 800    | Barlow Condensed | Hero headline (uppercase, desktop) |

### Font Weight Rules

- **800 (Barlow Condensed):** Hero headline only. Maximum presence.
- **700 (Barlow Condensed):** All section headings and sub-headlines. Always uppercase.
- **600 (DM Sans):** UI labels, CTA text, navigation items, card titles.
- **500 (DM Sans):** Lead paragraphs, checklist items.
- **400 (DM Sans):** Standard body copy.
- **300 (DM Sans):** Not used on dark backgrounds — insufficient contrast.

### Uppercase Rule

All Barlow Condensed instances are `text-transform: uppercase`. No exceptions. This is what gives the design its workshop-signage authority.

---

## 4. Spacing & Layout

### Base Unit

`4px` — all spacing values are multiples of 4.

```css
:root {
  --space-1:   4px;
  --space-2:   8px;
  --space-3:   12px;
  --space-4:   16px;
  --space-5:   20px;
  --space-6:   24px;
  --space-8:   32px;
  --space-10:  40px;
  --space-12:  48px;
  --space-16:  64px;
  --space-20:  80px;
  --space-24:  96px;
  --space-32:  128px;
}
```

### Grid System

- **Columns:** 12-column grid
- **Gutter (mobile):** 16px
- **Gutter (tablet+):** 24px
- **Gutter (desktop):** 32px
- **Max content width:** 1200px
- **Max narrow content width:** 800px (for checklist section, hours, contact prose)

### Responsive Breakpoints

| Name     | Min Width | Tailwind Prefix | Usage |
|----------|-----------|-----------------|-------|
| `xs`     | 375px     | (base)          | Default mobile styles — iPhone SE and up |
| `sm`     | 480px     | `sm:`           | Slightly larger phones |
| `md`     | 768px     | `md:`           | Tablets, large phones landscape |
| `lg`     | 1024px    | `lg:`           | Laptop and desktop |
| `xl`     | 1280px    | `xl:`           | Wide desktop |
| `2xl`    | 1536px    | `2xl:`          | Large monitors (increase hero font only) |

### Container Padding Rules

| Breakpoint | Horizontal Padding |
|------------|--------------------|
| xs (base)  | 16px (--space-4)   |
| sm         | 20px (--space-5)   |
| md         | 32px (--space-8)   |
| lg         | 48px (--space-12)  |
| xl         | 64px (--space-16)  |

### Section Vertical Rhythm

- **Standard section:** `padding-top: 80px; padding-bottom: 80px` (desktop) / `60px` (mobile)
- **Hero:** 100svh minimum, no top padding, content vertically centred
- **Footer:** `padding-top: 48px; padding-bottom: 32px`

---

## 5. Component Inventory

### 5.1 Navigation Bar

**Purpose:** Sticky top nav with logo, anchor links, and a persistent CTA. Collapses to hamburger on mobile.

**Visual description:** Fully transparent on hero, transitions to `--color-black` with a 1px `--color-surface-edge` bottom border after 80px scroll. Logo on left (white wordmark variant). Nav links in `--text-sm` / DM Sans 600, `--color-text-secondary`, uppercase tracking. "Call Us" button (red, compact) pinned right.

**States:**
- Default (over hero): transparent background, all elements white
- Scrolled: `--color-black` background, border bottom, smooth 200ms transition
- Mobile open: full-screen drawer, `--color-surface-dark` background, links stacked at `--text-2xl` Barlow Condensed
- Mobile closed: hamburger icon (Lucide `Menu`), becomes `X` when open
- Link hover: `--color-red` colour, no underline, 150ms transition
- Active section: `--color-red` colour on the corresponding link (intersection observer)

**Variants:** none — single nav component, responsive behaviour handled internally.

---

### 5.2 Hero Section

**Purpose:** Full-bleed opening statement. Cinematic. Immediate trust signal.

**Visual description:** 100svh tall. Background: Unsplash automotive image (see image search terms below) with `--color-overlay-hero` linear gradient (`linear-gradient(to bottom, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.55) 50%, rgba(10,10,10,0.85) 100%)`). Content vertically and horizontally centred. Top line: "VW / AUDI SPECIALIST · FINGLAS, DUBLIN" in `--text-xl` DM Sans 500, `--color-red`, letter-spacing 0.12em, uppercase. Main headline: "YOUR LOCAL GARAGE. DONE PROPERLY." in `--text-5xl` / `--text-6xl` Barlow Condensed 800, `--color-text-primary`. Sub-line: brief supporting sentence in `--text-lg` DM Sans 400, `--color-text-secondary`. Two CTA buttons side by side (stack on xs). Scroll-down chevron (`Lucide ChevronDown`) at bottom-centre, animates gentle bob.

**Image search terms (Unsplash):** "mechanic garage workshop dark", "car workshop lift dark atmospheric", "automotive repair shop tools"

**States:** Static layout — no interactive states beyond CTAs.

---

### 5.3 CTA Button — Primary (Red)

**Purpose:** Main conversion action. "Call Us" and "Send an Email".

**Visual description:** `background: --color-red`, `color: --color-text-inverse`, `font: --text-base DM Sans 600`, `text-transform: uppercase`, `letter-spacing: 0.08em`. Border radius: 4px (deliberately tight — not pill, not sharp-square). Padding: 14px 28px (desktop) / 14px 24px (mobile). Min tap target: 48px height.

**States:**
- Default: `--color-red` fill, black text
- Hover: `--color-red-dark` fill, scale(1.02), 150ms ease-out
- Active/Pressed: `--color-red-dark` fill, scale(0.98), box-shadow removed
- Focus: 2px offset outline in `--color-red`, 2px gap (custom focus ring, not browser default)
- Disabled: opacity 0.4, cursor not-allowed (not used in hero — but built into component)
- Loading: spinner icon replaces text, same red fill

---

### 5.4 CTA Button — Secondary (Outline)

**Purpose:** Secondary action alongside the primary. "Send an Email" when used paired with "Call Us".

**Visual description:** `background: transparent`, `border: 2px solid --color-text-primary`, `color: --color-text-primary`. Same font, radius, padding, and height as primary. On hover, border and text transition to `--color-red`.

**States:**
- Default: white outline, white text
- Hover: red border, red text, 150ms ease-out
- Active: scale(0.98)
- Focus: 2px offset outline in `--color-red`
- Disabled: opacity 0.4

---

### 5.5 Services Grid

**Purpose:** Communicate the full scope of work O'Connor Cars handles. Builds confidence.

**Visual description:** Section background `--color-surface-dark`. Heading "OUR SERVICES" centred, Barlow Condensed `--text-3xl`, `--color-text-primary`, uppercase. Sub-heading in DM Sans `--text-base`, `--color-text-secondary`. Grid: 1 column (mobile) → 2 columns (sm) → 3 columns (lg). Gap: 16px (mobile) / 24px (desktop).

Each service card: `background: --color-surface-mid`, border: `1px solid --color-surface-edge`, border-radius: 6px, padding: 28px 24px. Top: icon in `--color-red` (Lucide icon, 28px). Below icon: service name in Barlow Condensed `--text-2xl`, `--color-text-primary`, uppercase. Below name: 1–2 sentence description in DM Sans `--text-sm`, `--color-text-secondary`. Left border accent: on hover/active, a 3px `--color-red` left border appears.

**Services and their Lucide icons:**
| Service | Icon |
|---------|------|
| Servicing | `Wrench` |
| Engine Repairs | `Cog` |
| Clutches & Gearboxes | `Settings2` |
| Timing Belts | `Timer` |
| Auto-Diagnostics | `ScanLine` |
| Air Conditioning | `Wind` |
| Emission Testing | `Gauge` |
| Tyres | `Circle` |
| NCT Repairs | `ClipboardCheck` |

**States (card):**
- Default: `--color-surface-mid` background, `--color-surface-edge` border, no left accent
- Hover: `border-left: 3px solid --color-red`, icon brightens, card background shifts to `#1E1E1E`, 200ms ease-out
- Focus (keyboard): 2px `--color-red` outline on card wrapper

---

### 5.6 NCT Prep Checklist Section

**Purpose:** Trust-building informational content. Demonstrates expertise. Encourages booking.

**Visual description:** Section background `--color-black` (alternates from Services' `--color-surface-dark`). Max-width `800px`, centred. Heading: "IS YOUR CAR NCT READY?" Barlow Condensed `--text-3xl`, `--color-text-primary`. Sub-copy in DM Sans `--text-base`, `--color-text-secondary`. Below: 10-item checklist. Each item: flex row, `--color-red` checkmark icon (`Lucide CheckCircle2`, 20px) on left, item text in DM Sans `--text-base` / `--text-lg` 500, `--color-text-primary`. Divider line `--color-surface-edge` between items. Below checklist: inline callout box — `background: --color-surface-mid`, `border-left: 4px solid --color-red`, padding 20px, italic DM Sans copy: "Not sure if your car is ready? We offer a full pre-NCT inspection." + small red text link "Book an inspection →".

**NCT Checklist items (10):**
1. Lights — all headlights, tail lights, and indicators working
2. Tyres — minimum 1.6mm tread depth, no visible damage
3. Windscreen — no cracks in the driver's line of sight
4. Wipers — clear vision in all conditions
5. Brakes — responsive, no grinding or pulling
6. Horn — audible and working
7. Seatbelts — all belts lock and release correctly
8. Mirrors — all mirrors intact and adjustable
9. Exhaust — no excessive smoke or unusual noise
10. Fluid levels — oil, coolant, and brake fluid at correct levels

**States:** Static informational section — no interactive states.

---

### 5.7 Opening Hours Table

**Purpose:** Immediate, scannable answer to "are you open right now?". Removes friction.

**Visual description:** Section background `--color-surface-dark`. Centred, max-width 600px. Heading "OPENING HOURS" Barlow Condensed `--text-3xl`. Below: a styled table/stack, not a literal HTML table on mobile. Each row: day name left (DM Sans `--text-base` 600, `--color-text-secondary`), hours right (DM Sans `--text-base` 500, `--color-text-primary`). "CLOSED" days in `--color-text-muted`. Lunch break shown as a sub-row in `--text-sm`, `--color-text-muted`. Horizontal rule `--color-surface-edge` between rows.

**Today highlight:** The current day's row gets `background: --color-surface-mid`, `border-left: 3px solid --color-red`, and text in `--color-text-primary` 600. Implemented via JavaScript `Date` on the client.

**Hours data:**
| Day | Hours |
|-----|-------|
| Monday | 07:00 – 17:30 |
| Tuesday | 07:00 – 17:30 |
| Wednesday | 07:00 – 17:30 |
| Thursday | 07:00 – 17:30 |
| Friday | Closed |
| Saturday | Closed |
| Sunday | Closed |
| Lunch (Mon–Thu) | 12:45 – 13:30 |

---

### 5.8 Location Section

**Purpose:** Remove any barrier to physically finding the garage. Address + map, no friction.

**Visual description:** Section background `--color-black`. Two-column layout on desktop (map left, address card right), stacked on mobile with address card above map. Address card: `background: --color-surface-mid`, border-radius 6px, padding 32px. Business name in Barlow Condensed `--text-2xl`, `--color-text-primary`. Address lines in DM Sans `--text-base`, `--color-text-secondary`. Below address: a "Get Directions" link styled as a secondary button (`Lucide Navigation2` icon + text), opens Google Maps in new tab.

Map: `<iframe>` embed of Google Maps centred on Jamestown Rd, Finglas North, D11 K2FK. Map container: border-radius 6px, overflow hidden, aspect-ratio 4/3 on mobile / 16/9 on desktop. A subtle `--color-surface-edge` border wraps the iframe. The map iframe uses a dark map style (Google Maps satellite/dark skin — use URL param `&style=...` or accept the default light map with a `mix-blend-mode: multiply` overlay as fallback).

---

### 5.9 Contact Section

**Purpose:** All contact methods in one place, scannable, easy to act on.

**Visual description:** Section background `--color-surface-dark`. Heading "GET IN TOUCH" Barlow Condensed `--text-3xl`. Three contact method cards in a row (1-col mobile, 3-col desktop), each with icon + label + value/link:

| Card | Icon | Content |
|------|------|---------|
| Phone | `Lucide Phone` | 01 834 0938 / 086 232 3335 — tappable `tel:` links |
| Email | `Lucide Mail` | info@oconnorcars.ie — tappable `mailto:` link |
| Social | `Lucide Share2` | Facebook + Instagram icon links |

Card style: `background: --color-surface-mid`, border `--color-surface-edge`, border-radius 6px, padding 24px, centred content. Icon in `--color-red` (32px). Label in Barlow Condensed `--text-xl`, `--color-text-secondary`. Value in DM Sans `--text-base` 500, `--color-text-primary`.

On phone card: both numbers stacked. Each is an `<a href="tel:...">` — styled as plain text in `--color-text-primary`, underline on hover in `--color-red`.

Social icons: use Lucide `Facebook` is not available — use inline SVG brand icons for Facebook (f logo) and Instagram (camera logo), or a simple "Facebook" / "Instagram" text link with `ExternalLink` icon. Both open in `_blank`.

**States (contact card):**
- Default: `--color-surface-mid` background
- Hover: `border-color: --color-red`, 200ms ease
- Link hover: `--color-red` text colour

---

### 5.10 Footer

**Purpose:** Close the page, provide legal and social links, reinforce the brand mark.

**Visual description:** Background `--color-black`, `border-top: 1px solid --color-surface-edge`. Logo (PNG, white variant — apply `filter: brightness(0) invert(1)` if needed, or use as-is since logo is already on dark). Below logo: tagline "VW / Audi Specialist · Finglas, Dublin" in DM Sans `--text-sm`, `--color-text-muted`. Right side (desktop) / below logo (mobile): social icon links (Facebook, Instagram) as small icon buttons. Bottom row: copyright line "© 2024 O'Connor Cars. All rights reserved." in `--text-xs`, `--color-text-muted`.

---

### 5.11 Section Heading Block

**Purpose:** Reusable heading + optional sub-text pattern used consistently across all sections.

**Visual description:** Centred or left-aligned (varies by section — services is centred, location is left). Pre-heading label (optional): `--text-sm`, `--color-red`, uppercase, letter-spacing 0.12em — e.g. "TRUSTED SINCE 1998". Main heading: Barlow Condensed `--text-3xl`, `--color-text-primary`, uppercase. Sub-copy: DM Sans `--text-base`, `--color-text-secondary`, max-width 560px.

---

### 5.12 Scroll-Down Chevron

**Purpose:** Visual affordance at the bottom of the hero to indicate scrollable content.

**Visual description:** `Lucide ChevronDown` icon, 28px, `--color-text-secondary`. Absolutely positioned at `bottom: 32px`, horizontally centred. Animates: `translateY(0) → translateY(6px) → translateY(0)` in a 2s infinite ease-in-out loop. Fades out when user scrolls past 100px.

---

## 6. Motion & Interaction

### Easing Curves

```css
:root {
  --ease-out:       cubic-bezier(0.0, 0.0, 0.2, 1.0);   /* Elements entering view */
  --ease-in:        cubic-bezier(0.4, 0.0, 1.0, 1.0);   /* Elements leaving view */
  --ease-in-out:    cubic-bezier(0.4, 0.0, 0.2, 1.0);   /* State changes, toggles */
  --ease-spring:    cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Playful bounces — use sparingly */
}
```

### Durations

```css
:root {
  --duration-fast:    100ms;   /* Colour transitions, icon swaps */
  --duration-base:    200ms;   /* Button hover, card hover, most micro-interactions */
  --duration-slow:    350ms;   /* Nav drawer open/close, modal entrance */
  --duration-xslow:  500ms;   /* Page-level entrance animations */
}
```

### Interaction Rules

| Interaction | Gets Animation? | Duration | Easing |
|-------------|----------------|----------|--------|
| Button hover (colour) | Yes | 150ms | ease-in-out |
| Button press (scale) | Yes | 100ms | ease-in |
| Card hover | Yes | 200ms | ease-out |
| Nav background transition (scroll) | Yes | 200ms | ease-in-out |
| Mobile nav drawer open | Yes | 350ms | ease-out (slide from top) |
| Section entrance (scroll into view) | Yes | 500ms | ease-out |
| Scroll chevron bob | Yes | 2000ms | ease-in-out, infinite |
| Checklist item entrance (stagger) | Yes | 400ms + 60ms stagger | ease-out |
| Today highlight (hours) | No | — | Rendered on mount, no transition |
| Map iframe load | No | — | Static embed |
| Page load | Yes | 300ms fade-in | ease-out (on root element) |

### Scroll-Triggered Entrance Animations (Framer Motion)

Applied to: section headings, service cards, checklist items, contact cards, hours rows.

Pattern: `{ opacity: 0, y: 20 }` → `{ opacity: 1, y: 0 }`, duration 0.5s, `ease-out`, triggered when element enters viewport (Framer Motion `whileInView` with `viewport: { once: true, amount: 0.15 }`).

Service cards stagger: each card delays by `index * 0.08s`.
Checklist items stagger: each item delays by `index * 0.06s`.

### `prefers-reduced-motion`

All Framer Motion components must check `useReducedMotion()`. When true:
- All `initial` / `animate` transitions are bypassed (elements render at final state immediately)
- The scroll chevron bob animation is disabled
- The mobile nav drawer appears instantly rather than sliding

---

## 7. Accessibility Requirements

### Contrast Ratios

| Combination | Ratio | Requirement | Pass? |
|-------------|-------|-------------|-------|
| `--color-text-primary` on `--color-black` | ~18:1 | AA (4.5:1) | Pass |
| `--color-text-primary` on `--color-surface-mid` | ~16:1 | AA (4.5:1) | Pass |
| `--color-text-secondary` on `--color-black` | ~8:1 | AA (4.5:1) | Pass |
| `--color-text-muted` on `--color-black` | ~4.9:1 | AA (4.5:1) | Pass |
| `--color-red` on `--color-black` (large text only, ≥18pt) | ~3.8:1 | AA Large (3:1) | Pass |
| `--color-text-inverse` on `--color-red` (button) | ~7.2:1 | AA (4.5:1) | Pass |

Note: `--color-red` must never be used for body text or text smaller than 18px. It is a decorative/interactive accent only.

### Focus Indicators

All interactive elements receive a visible focus ring. No `outline: none` without a replacement:

```css
:focus-visible {
  outline: 2px solid var(--color-red);
  outline-offset: 3px;
  border-radius: 2px;
}
```

This applies to buttons, links, nav items, and the mobile hamburger. The focus ring is red on dark backgrounds and has sufficient contrast.

### Tap Target Sizes

All tappable elements must meet a minimum of **48px × 48px** touch target, per WCAG 2.5.5. Padding is used to extend targets without affecting visual size where necessary.

### ARIA Patterns Required

| Component | ARIA requirement |
|-----------|-----------------|
| Navigation | `<nav aria-label="Main navigation">` |
| Mobile nav toggle | `aria-expanded`, `aria-controls` on hamburger button |
| Mobile nav drawer | `role="dialog"` or managed focus trap |
| Services section | `<section aria-labelledby="services-heading">` |
| Contact links | `aria-label="Call 01 834 0938"` on `tel:` links |
| Map iframe | `title="O'Connor Cars location map"` |
| Checklist | `<ul role="list">` with `<li>` items |
| Opening hours | `<table>` or `<dl>` with proper headers/terms |
| Social links | `aria-label="Visit us on Facebook"` / `"Visit us on Instagram"` |
| Scroll chevron | `aria-hidden="true"` (decorative only) |

### Semantic HTML Rules

- One `<h1>` per page — the hero headline.
- Section headings use `<h2>`. Sub-headings within sections use `<h3>`.
- Use `<section>` with meaningful `id` attributes for anchor navigation (e.g. `id="services"`, `id="hours"`, `id="location"`, `id="contact"`).
- Phone numbers are always wrapped in `<a href="tel:...">`.
- Email addresses are always wrapped in `<a href="mailto:...">`.
- The address block uses `<address>`.

### Keyboard Navigation

- Tab order follows visual reading order.
- Mobile nav drawer traps focus while open; returns focus to hamburger button on close.
- Smooth scroll is triggered by anchor links — these must still be standard `<a href="#section">` links, not JavaScript-only buttons, so keyboard and screen reader navigation works without JS.

---

## 8. Image Strategy

### Hero Background

**Unsplash search terms (in priority order):**
1. `"car workshop lift dark atmospheric"`
2. `"mechanic garage dark tools"`
3. `"automotive repair shop interior dark"`

**Implementation:** `next/image` with `priority`, `fill`, and `sizes="100vw"`. The `--color-overlay-hero` gradient is applied as an absolutely-positioned `<div>` above the image, below the content. Aspect ratio: `cover` fill.

### Other Images

No other photographic images are required in v1. Service cards use icons only. The NCT section is text-only. The location section uses the Google Maps embed.

### Logo Usage

The provided logo PNG (black background, red/white mark, white wordmark) is used as-is in the footer and mobile nav drawer. In the sticky navbar, use the same logo — it works on the dark nav background. No modifications needed.

---

## 9. Tailwind CSS 4 Configuration Notes

The following custom tokens should be registered in `tailwind.config.ts` (or via CSS `@theme` in Tailwind 4):

```css
@theme {
  --color-brand-black:    #0A0A0A;
  --color-brand-dark:     #111111;
  --color-brand-mid:      #1A1A1A;
  --color-brand-edge:     #242424;
  --color-brand-red:      #C41E1E;
  --color-brand-red-dark: #A01818;
  --color-brand-red-muted:#7A1212;

  --font-display: 'Barlow Condensed', sans-serif;
  --font-body:    'DM Sans', sans-serif;
}
```

Use the `font-display` / `font-body` utilities via `font-[family-name:--font-display]` pattern in Tailwind 4, or register via the `@theme` block as `--font-display` which maps to `font-display` utility class.

---

## 10. File & Folder Conventions

```
src/
  app/
    layout.tsx          ← Google Fonts link, global CSS vars, metadata
    page.tsx            ← Single-page composition: all sections
  components/
    layout/
      Navbar.tsx
      Footer.tsx
    sections/
      Hero.tsx
      Services.tsx
      NctChecklist.tsx
      OpeningHours.tsx
      Location.tsx
      Contact.tsx
    ui/
      Button.tsx        ← Primary + Secondary variants
      SectionHeading.tsx
      ServiceCard.tsx
      ContactCard.tsx
      ChecklistItem.tsx
  lib/
    constants.ts        ← Services list, checklist items, hours, contact data
  styles/
    globals.css         ← CSS custom properties, @theme block, base resets
```

All section data (service names, icons, checklist text, hours, contact details) lives in `lib/constants.ts`, not hardcoded in components. This makes copy changes a one-file edit.
