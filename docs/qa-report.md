# O'Connor Cars — QA Report

**Date:** 2026-05-08
**Reviewer:** QA Engineer
**Build:** Next.js 16.2.6 (Turbopack)
**Scope:** Full codebase review — new project

---

## 1. Toolchain Results

### TypeScript (`pnpm tsc --noEmit`)
**Result: PASS** — Zero type errors.

### Lint (`pnpm lint`)
**Result before fixes: FAIL** — 1 error, 2 warnings.
**Result after fixes: PASS (warnings only)** — 0 errors, 2 warnings (documented below).

### Build (`pnpm build`)
**Result: PASS** — Clean build, 1 non-blocking Turbopack warning about the optional `resend` module not being installed (expected — the package is dynamically imported and guarded by an env var check).

---

## 2. Issues Found

### FIXED — High

#### H1: Incorrect social media URLs in `lib/constants.ts`
- **File:** `/Users/marknolan/Code/oconnors/lib/constants.ts`, lines 76–77
- **Problem:** Facebook URL was `https://www.facebook.com/oconnorcars` (wrong slug). Instagram URL was `https://www.instagram.com/oconnorcars` (wrong handle and domain variant). Both link prominently from the Contact section and Footer and would send visitors to incorrect or non-existent pages.
- **Required:** Facebook `https://www.facebook.com/oconnorcarsfinglas/`, Instagram `https://instagram.com/oconnor_cars/`
- **Fix applied:** Corrected both values in `BUSINESS_INFO.social`.

#### H2: Lint error — `setState` inside `useEffect` in `OpeningHours.tsx`
- **File:** `/Users/marknolan/Code/oconnors/components/sections/OpeningHours.tsx`, line 37
- **Problem:** `pnpm lint` exited with code 1 due to `react-hooks/set-state-in-effect` error, blocking any CI lint gate. The pattern is architecturally correct (post-hydration date resolution to avoid SSR/client mismatch) but required a targeted eslint-disable.
- **Fix applied:** Added `// eslint-disable-next-line react-hooks/set-state-in-effect` on the `setTodayKey` call with an explanatory comment.

#### H3: Missing focus trap in mobile navigation drawer
- **File:** `/Users/marknolan/Code/oconnors/components/layout/Navbar.tsx`
- **Problem:** The mobile nav drawer declared `role="dialog"` and `aria-modal="true"` but had no focus trap. A keyboard user pressing Tab would leave the drawer and interact with hidden content behind it — violating WCAG 2.1 success criterion 2.1.2 (No Keyboard Trap). The design spec explicitly required focus trap behaviour.
- **Fix applied:** Added a `useEffect` that:
  - Queries all focusable elements within the drawer on open
  - Moves initial focus to the first focusable element
  - Intercepts Tab/Shift+Tab to keep focus cycling within the drawer
  - Handles Escape to close the drawer
  - Restores focus to the hamburger button on close (ref captured at effect start per React exhaustive-deps rules)

### FIXED — Low

#### L1: Copyright year in Footer
- **File:** `/Users/marknolan/Code/oconnors/components/layout/Footer.tsx`, line 108
- **Problem:** `© 2025` — site launched in 2026.
- **Fix applied:** Updated to `© 2026`.

---

### REMAINING — Medium

#### M1: `resend` package not installed
- **File:** `/Users/marknolan/Code/oconnors/app/api/contact/route.ts`, line 62
- **Problem:** `resend` is dynamically imported when `RESEND_API_KEY` is set, but `resend` is not listed in `package.json` dependencies. Turbopack surfaces a module-not-found warning at build time. In production with `RESEND_API_KEY` configured, the dynamic import will throw at runtime and the route will return a 500. The current workaround (local `ResendClient` interface + `import("resend" as any)`) avoids a type error but doesn't solve the missing install.
- **Action required:** Run `pnpm add resend` before configuring email delivery. The build and site function correctly without it; this only blocks email sending.

#### M2: NCT checklist content diverges from design spec
- **File:** `/Users/marknolan/Code/oconnors/lib/constants.ts`, lines 166–221
- **Problem:** The design spec (`docs/design-spec.md`, section 5.6) lists 10 checklist items including: Brakes, Mirrors, Exhaust. The implementation replaces these with: Brake Lights, Number Plate, Screenwash. Both sets contain 10 items. The implemented items are arguably more specific and practical for a pre-NCT check (brake lights are tested; mirrors are not an NCT failure point per RSA guidelines). However, the divergence from the spec should be a conscious decision, not an oversight.
- **Action required:** Confirm with the business owner which checklist reflects actual NCT test points. No code change made — this is a content decision.

#### M3: API rate limiting not implemented at the application layer
- **File:** `/Users/marknolan/Code/oconnors/app/api/contact/route.ts`
- **Problem:** The API spec states "Recommended: 5 requests per IP per 10 minutes" but this is not implemented. The spec defers to infrastructure-layer rate limiting (Vercel/Netlify), which is acceptable. However, there is no in-app fallback if the deployment target does not have rate limiting configured, leaving the contact endpoint open to spam and abuse.
- **Action required:** Verify that Netlify rate limiting rules are applied to `/api/contact` as part of deployment configuration. If not, add an in-memory rate limiter (e.g. `lru-cache` or a simple `Map` with TTL) before going live.

---

### REMAINING — Low (document only, no fix applied)

#### L2: Unused TypeScript type `Props` in `Button.tsx`
- **File:** `/Users/marknolan/Code/oconnors/components/ui/Button.tsx`, line 21
- **Problem:** The union type `Props = ButtonProps | AnchorButtonProps` is defined but never used as a type annotation — the exported functions use their constituent types directly. Causes a `@typescript-eslint/no-unused-vars` warning.
- **Suggested fix:** Either remove the `Props` union type, or use it as the function argument type for a combined export. Not critical.

#### L3: Unused `_size` parameter in `Button.tsx`
- **File:** `/Users/marknolan/Code/oconnors/components/ui/Button.tsx`, line 35
- **Problem:** The `size` prop is accepted but immediately aliased to `_size` and never used. The `Button` component has no size variant logic implemented. Causes a `@typescript-eslint/no-unused-vars` warning.
- **Suggested fix:** Either implement size variants (sm/md/lg padding scale) or remove the prop from the interface until needed.

#### L4: Hero background uses `<img>` not `next/image`
- **File:** `/Users/marknolan/Code/oconnors/components/sections/Hero.tsx`, lines 25–31
- **Problem:** The hero background image uses a plain `<img>` tag with a suppressed Next.js lint rule (`eslint-disable-next-line @next/next/no-img-element`). The design spec calls for `next/image` with `priority`, `fill`, and `sizes="100vw"` for optimal LCP performance (the hero image is the largest contentful paint candidate on mobile). The plain `<img>` won't benefit from Next.js image optimisation (automatic WebP/AVIF conversion, responsive srcsets).
- **Suggested fix:** Migrate to `<Image fill priority sizes="100vw" ... />` from `next/image`. The Unsplash domain is already whitelisted in `next.config.ts`.

#### L5: Contact section uses `ExternalLink` icon for Social card
- **File:** `/Users/marknolan/Code/oconnors/components/sections/Contact.tsx`, line 1 / line 91
- **Problem:** The design spec (section 5.9) shows `Lucide Share2` as the Social card icon. The implementation uses `Lucide ExternalLink`. Minor visual divergence from spec, no functional impact.

---

## 3. Content Accuracy Verification

| Item | Expected | Actual | Status |
|------|----------|--------|--------|
| Phone — landline | 01 834 0938 | 01 834 0938 | PASS |
| Phone — mobile | 086 232 3335 | 086 232 3335 | PASS |
| `tel:` href — landline | `tel:018340938` | `tel:018340938` | PASS |
| `tel:` href — mobile | `tel:0862323335` | `tel:0862323335` | PASS |
| Email | info@oconnorcars.ie | info@oconnorcars.ie | PASS |
| Address — street | Jamestown Rd | Jamestown Rd | PASS |
| Address — area | Finglas North | Finglas North | PASS |
| Address — city | Dublin | Dublin | PASS |
| Address — eircode | D11 K2FK | D11 K2FK | PASS |
| Hours Mon–Thu open | 07:00 | 07:00 | PASS |
| Hours Mon–Thu close | 17:30 | 17:30 | PASS |
| Hours Fri–Sun | Closed | Closed | PASS |
| Lunch break | 12:45–13:30 | 12:45–13:30 | PASS |
| Services count | 9 | 9 | PASS |
| NCT checklist count | 10 | 10 | PASS |
| Facebook URL | https://www.facebook.com/oconnorcarsfinglas/ | https://www.facebook.com/oconnorcars (wrong) | FIXED |
| Instagram URL | https://instagram.com/oconnor_cars/ | https://www.instagram.com/oconnorcars (wrong) | FIXED |

---

## 4. Accessibility Audit

| Requirement | Status | Notes |
|------------|--------|-------|
| Single `<h1>` on page | PASS | Hero only |
| Section headings use `<h2>` | PASS | Via `SectionHeading` |
| Card sub-headings use `<h3>` | PASS | ServiceCard, ContactCard, Location address |
| `<nav aria-label>` on main nav | PASS | "Main navigation" |
| Mobile hamburger `aria-expanded` + `aria-controls` | PASS | Present and correct |
| Mobile drawer `role="dialog"` + `aria-modal` | PASS | Present |
| Focus trap in mobile drawer | FIXED (was missing) | See H3 above |
| Focus returns to trigger on drawer close | FIXED (was missing) | See H3 above |
| Escape closes mobile drawer | FIXED (was missing) | See H3 above |
| `aria-label` on `tel:` links | PASS | All phone links have labels |
| `aria-label` on social links | PASS | "Visit us on Facebook/Instagram" |
| Google Maps iframe `title` | PASS | "O'Connor Cars location map" |
| NCT checklist `<ul role="list">` | PASS | Present in NctChecklist |
| Opening hours `<dl>` with `dt`/`dd` | PASS | Correct semantic structure |
| `<address>` for address blocks | PASS | Used in Footer and Location |
| `aria-hidden="true"` on decorative icons | PASS | All Lucide icons set |
| Global `focus-visible` ring | PASS | Defined in `globals.css` |
| `prefers-reduced-motion` respected | PASS | All Framer Motion components check `useReducedMotion()` |
| Minimum 48px tap targets | PASS | All CTAs have `min-h-[48px]` or `min-h-[52px]` |
| `alt=""` on decorative images | PASS | Hero background has `alt=""` + `aria-hidden="true"` |
| Logo `alt` text | PASS | "O'Connor Cars" in Navbar and Footer |

---

## 5. Mobile / Responsive Review

| Check | Status | Notes |
|-------|--------|-------|
| Mobile-first Tailwind classes | PASS | Base (mobile) styles defined first, `sm:`/`md:`/`lg:` scale up |
| Container padding scale | PASS | `px-4 sm:px-5 md:px-8 lg:px-12` matches design spec table |
| Services grid 1→2→3 columns | PASS | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |
| Contact cards 1→3 columns | PASS | `grid-cols-1 sm:grid-cols-3` |
| Hero headline text scale | PASS | `3.5rem → 4.5rem → 5.5rem → 6.5rem` |
| Location map stack/side-by-side | PASS | `grid-cols-1 md:grid-cols-2` |
| Map aspect ratio | PASS | `aspect-[4/3]` mobile, `md:aspect-[16/9]` desktop |
| Nav collapses to hamburger | PASS | `hidden md:flex` on desktop links, `md:hidden` on hamburger |
| CTA buttons full-width on mobile | PASS | `w-full sm:w-auto` in Hero |

---

## 6. API Route Security Review (`/api/contact`)

| Check | Status | Notes |
|-------|--------|-------|
| Input validated with Zod before any processing | PASS | `contactSchema.safeParse(body)` before any use of data |
| All fields trimmed | PASS | `.trim()` on all string fields |
| Max length enforced | PASS | name 100, email 254, phone 20, message 2000 |
| Phone regex restricts characters | PASS | `/^[\d\s+\-()]+$/` — digits, spaces, `+`, `-`, `()` only |
| Email validated as proper format | PASS | Zod `.email()` |
| No SQL / no database | PASS | Static site — no injection surface |
| No PII logged beyond what's necessary | PASS | Only `messageLength` logged, not message content |
| Error responses typed and consistent | PASS | All paths return `{ error, code }` or `{ success, message }` |
| 500 only on email failure | PASS | Correct — base path (no Resend) always returns 200 |
| Rate limiting | NOT IMPLEMENTED | See M3 — infrastructure-layer mitigation required |
| `resend` not installed | MEDIUM RISK | See M1 — email will fail in production if env var set |

---

## 7. Spec Compliance

The implementation closely follows both `docs/design-spec.md` and `docs/api-spec.md`. Notable divergences:

- NCT checklist items differ from spec list (see M2) — functional, not architectural
- Social card uses `ExternalLink` icon instead of spec's `Share2` (see L5) — cosmetic
- Hero uses plain `<img>` instead of spec's `next/image` (see L4) — performance impact only
- API route uses a manual `ResendClient` interface + `import("resend" as any)` instead of spec's direct `import { Resend } from 'resend'` — functionally equivalent when `resend` is installed, but adds complexity

---

## 8. Regression Risk

This is a static single-page marketing site with one server endpoint. There are no database migrations, no shared state, and no authentication. Regression surface is minimal:

- **Focus trap changes in Navbar.tsx** are the highest-risk change. A regression here would manifest as focus escaping the mobile drawer on Tab, or focus not returning to the hamburger on close. Manual keyboard testing is recommended on mobile and desktop before deployment.
- **Social URL corrections** are non-breaking — they change external link destinations only.
- **Copyright year** is a string change in the footer — zero risk.
- **OpeningHours.tsx lint suppress** leaves the runtime behaviour unchanged.

---

## Summary

| Severity | Count | Fixed | Remaining |
|----------|-------|-------|-----------|
| Critical | 0 | — | — |
| High | 3 | 3 | 0 |
| Medium | 3 | 0 | 3 |
| Low | 5 | 1 | 4 |

**Final build: PASS. Final lint: PASS (0 errors, 2 warnings). TypeScript: PASS.**
