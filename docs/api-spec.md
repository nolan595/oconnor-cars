# O'Connor Cars — API Specification

**Version:** 1.0  
**Date:** 2026-05-08  
**Project:** O'Connor Cars — Static marketing site, VW/Audi Specialist, Finglas, Dublin  
**Stack:** Next.js 15 App Router · TypeScript · Zod

---

## Overview

This is a static marketing site. There is no database, no authentication, and no dynamic data retrieval. The only server-side endpoint is the contact form submission handler.

All static site data (services, hours, contact details, checklist items) lives in `src/lib/constants.ts` as typed TypeScript constants — not served via API. Those types are documented in the [Static Data Types](#static-data-types) section below.

---

## Endpoints

### POST /api/contact

Accepts a contact form submission. Validates input with Zod, logs the submission server-side, and optionally sends an email notification via Resend when the `RESEND_API_KEY` environment variable is present.

If `RESEND_API_KEY` is not set, the route accepts the request, logs it, and returns success — allowing the frontend to be developed and tested without email credentials configured.

#### Auth requirement

None. Public endpoint.

#### Rate limiting

Should be rate-limited at the infrastructure layer (Vercel Edge Config, Netlify rate limiting, or a lightweight in-memory limiter). Recommended: 5 requests per IP per 10 minutes.

#### Request

**Content-Type:** `application/json`

| Field     | Type   | Required | Validation |
|-----------|--------|----------|------------|
| `name`    | string | Yes      | 1–100 characters, trimmed |
| `phone`   | string | No       | Max 20 characters, trimmed. If provided, must match `/^[\d\s\+\-\(\)]+$/` |
| `email`   | string | Yes      | Valid email format, max 254 characters |
| `message` | string | Yes      | 1–2000 characters, trimmed |

At least one of `phone` or `email` must be present (email is required, so this is always satisfied — but phone is optional extra context).

**Example request:**

```json
POST /api/contact
Content-Type: application/json

{
  "name": "Declan Murphy",
  "phone": "086 123 4567",
  "email": "declan@example.com",
  "message": "Hi, I need a timing belt replacement on a 2017 VW Golf. Can I book in for next week?"
}
```

#### Responses

**200 OK — Success**

```json
{
  "success": true,
  "message": "Thanks, we'll be in touch shortly."
}
```

**400 Bad Request — Validation failure**

Returned when any required field is missing, a field fails type or format validation, or the body is not valid JSON.

```json
{
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "details": {
    "email": ["Invalid email address"],
    "message": ["Message is required"]
  }
}
```

`details` is a map of field name to array of error strings, matching the Zod `flatten()` output shape.

**405 Method Not Allowed**

Next.js handles this automatically for any method other than POST on this route.

**500 Internal Server Error**

Only returned if an unexpected error occurs during email dispatch or logging. The submission is considered failed; the user should retry.

```json
{
  "error": "Something went wrong. Please try again or call us directly.",
  "code": "INTERNAL_ERROR"
}
```

---

## Zod Schema

```typescript
// src/lib/schemas/contact.ts
import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name must be 100 characters or fewer'),
  phone: z
    .string()
    .trim()
    .max(20, 'Phone number must be 20 characters or fewer')
    .regex(/^[\d\s\+\-\(\)]+$/, 'Phone number contains invalid characters')
    .optional()
    .or(z.literal('')),
  email: z
    .string()
    .trim()
    .email('Invalid email address')
    .max(254, 'Email address is too long'),
  message: z
    .string()
    .trim()
    .min(1, 'Message is required')
    .max(2000, 'Message must be 2000 characters or fewer'),
})

export type ContactFormData = z.infer<typeof contactSchema>
```

---

## Route Implementation Pattern

```typescript
// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/schemas/contact'

export async function POST(req: NextRequest) {
  let body: unknown

  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON', code: 'VALIDATION_ERROR' },
      { status: 400 }
    )
  }

  const result = contactSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: result.error.flatten().fieldErrors,
      },
      { status: 400 }
    )
  }

  const { name, phone, email, message } = result.data

  // Always log server-side — useful during development and as an audit trail
  console.log('[contact-form]', { name, phone, email, messageLength: message.length, ts: new Date().toISOString() })

  // Send email if Resend is configured — wire this up when credentials are available
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? 'noreply@oconnorcars.ie',
        to: process.env.CONTACT_RECIPIENT_EMAIL ?? 'info@oconnorcars.ie',
        subject: `New enquiry from ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          phone ? `Phone: ${phone}` : null,
          '',
          `Message:\n${message}`,
        ]
          .filter(Boolean)
          .join('\n'),
      })
    } catch (err) {
      console.error('[contact-form] email send failed', err)
      return NextResponse.json(
        { error: 'Something went wrong. Please try again or call us directly.', code: 'INTERNAL_ERROR' },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ success: true, message: "Thanks, we'll be in touch shortly." })
}
```

---

## Environment Variables

| Variable                  | Required           | Description |
|---------------------------|--------------------|-------------|
| `RESEND_API_KEY`          | No (enables email) | Resend API key. If absent, submissions are logged only. |
| `RESEND_FROM_EMAIL`       | No                 | Sender address for outbound emails. Defaults to `noreply@oconnorcars.ie`. Must be a verified Resend domain. |
| `CONTACT_RECIPIENT_EMAIL` | No                 | Where contact submissions are delivered. Defaults to `info@oconnorcars.ie`. |

None of these variables are required for the site to build or the route to return 200. Email delivery is an opt-in enhancement once credentials are configured.

---

## Static Data Types

All content below is defined as constants in `src/lib/constants.ts`. These are not API endpoints — they are imported directly into components at build time.

### BusinessInfo

```typescript
interface BusinessInfo {
  name: string
  tagline: string
  address: {
    street: string
    area: string
    city: string
    eircode: string
    googleMapsUrl: string       // Full URL for "Get Directions" link
    googleMapsEmbedUrl: string  // iframe src URL
  }
  phone: {
    landline: string  // "01 834 0938"
    mobile: string    // "086 232 3335"
  }
  email: string       // "info@oconnorcars.ie"
  social: {
    facebook?: string
    instagram?: string
  }
}
```

### Service

```typescript
interface Service {
  id: string                  // Slug used as key, e.g. "timing-belts"
  name: string                // Display name, e.g. "Timing Belts"
  description: string         // 1–2 sentence description for service card
  icon: string                // Lucide icon name, e.g. "Timer"
}

// Nine services defined:
// servicing, engine-repairs, clutches-gearboxes, timing-belts,
// auto-diagnostics, air-conditioning, emission-testing, tyres, nct-repairs
```

### OpeningHours

```typescript
type DayKey = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

interface DayHours {
  open: string | null   // "07:00" — null means closed
  close: string | null  // "17:30" — null means closed
  lunch?: {
    start: string       // "12:45"
    end: string         // "13:30"
  }
}

type OpeningHours = Record<DayKey, DayHours>

// Current hours:
// Mon–Thu: 07:00–17:30, lunch 12:45–13:30
// Fri–Sun: closed
```

### NctChecklistItem

```typescript
interface NctChecklistItem {
  id: string      // e.g. "lights"
  label: string   // Short label, e.g. "Lights"
  detail: string  // Full description shown in checklist
}

// Ten items defined (lights, tyres, windscreen, wipers, brakes,
// horn, seatbelts, mirrors, exhaust, fluid-levels)
```

---

## Google Maps Embed

No API key is required. The location section uses a plain `<iframe>` embed pointing to the garage address. The embed URL format is:

```
https://maps.google.com/maps?q=Jamestown+Rd,+Finglas+North,+Dublin+D11+K2FK&output=embed
```

This is rendered as a static `<iframe>` in the Location component. No server-side handling is involved.
