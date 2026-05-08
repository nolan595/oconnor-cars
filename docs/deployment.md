# O'Connor Cars — Deployment Guide

**Project:** Static marketing site for O'Connor Cars, VW/Audi specialist, Finglas, Dublin  
**Stack:** Next.js 16 App Router · TypeScript · Tailwind CSS 4 · Framer Motion · pnpm  
**Hosting:** Netlify (account: `nolan595`)  
**Last updated:** 2026-05-08

## Live deployment

| | |
|---|---|
| **Live URL** | https://oconnor-cars.netlify.app |
| **GitHub repo** | https://github.com/nolan595/oconnor-cars |
| **Netlify site name** | oconnor-cars |
| **Netlify account** | nolan595 |
| **Auto-deploy** | Every push to `main` triggers a new deploy automatically |

---

## Prerequisites

| Tool | Minimum version | Install |
|------|----------------|---------|
| Node.js | 22 LTS | https://nodejs.org or `nvm install 22` |
| pnpm | 9 | `npm install -g pnpm@9` |
| Netlify CLI | latest | `pnpm add -g netlify-cli` (optional — UI deploy works without it) |
| Git | any modern | — |

---

## Local setup from scratch

```bash
git clone <repo-url> oconnors
cd oconnors
pnpm install
cp .env.example .env.local   # edit if you want email delivery locally
pnpm dev
```

The site is available at `http://localhost:3000`. Hot reload is active.

The contact form works without any env vars — submissions are logged to the terminal. To test real email delivery locally, populate `RESEND_API_KEY` in `.env.local` (see [Environment variables](#environment-variables)).

---

## Running tests

There are no automated tests in the current build. When tests are added (Vitest is the planned runner), the command will be:

```bash
pnpm test
```

The CI pipeline includes a placeholder lint and type-check step that acts as a lightweight correctness gate until a test suite is added.

---

## How to build

```bash
pnpm build
```

Output goes to `.next/`. The build is environment-agnostic — no env vars are required at build time. All three contact-form variables are read at request time (runtime), not build time.

To preview the production build locally:

```bash
pnpm build && pnpm start
```

---

## How to deploy

### Option A — Git push (recommended, zero effort)

Once the Netlify site is connected to the GitHub repo, every push to `main` triggers an automatic deploy. No manual steps needed.

1. Push to `main`
2. Netlify picks up the commit, runs `pnpm build`, and publishes `.next`
3. The deploy URL appears in the Netlify dashboard under **Deploys**

### Option B — Netlify CLI

```bash
pnpm build
netlify deploy --prod --dir .next
```

You will be prompted to log in and select a site on first run.

### Option C — Netlify UI (drag and drop)

1. Run `pnpm build` locally
2. Open https://app.netlify.com → your site → **Deploys**
3. Drag the `.next` folder into the deploy dropzone

---

## Connecting the GitHub repo to Netlify (first-time setup)

1. Log into Netlify as `nolan595`
2. **Add new site → Import an existing project**
3. Choose GitHub, authorise, and select the `oconnors` repo
4. Set build settings:
   - **Build command:** `pnpm build`
   - **Publish directory:** `.next`
   - **Node version:** `22` (set in `netlify.toml` — no manual step needed)
5. Click **Deploy site**

Netlify detects `netlify.toml` and the `@netlify/plugin-nextjs` plugin automatically. No further config is needed for the plugin to handle API routes and SSR.

---

## Environment variables

All env vars are optional. The site builds and serves without any of them. Email delivery on the contact form is the only gated feature.

| Variable | Default | Description |
|----------|---------|-------------|
| `RESEND_API_KEY` | _(none)_ | Resend API key. When absent, contact submissions are logged to Netlify function logs only. Get from https://resend.com/api-keys |
| `RESEND_FROM_EMAIL` | `noreply@oconnorcars.ie` | Sender address on outbound contact emails. Must be a verified sender in your Resend account. |
| `CONTACT_RECIPIENT_EMAIL` | `info@oconnorcars.ie` | Inbox where contact form submissions are delivered. |

### Setting env vars in Netlify UI

1. Site dashboard → **Site configuration** → **Environment variables**
2. Click **Add a variable**
3. Enter the key and value, select **All scopes** (or Production only if you prefer)
4. Click **Save** — the variable takes effect on the next deploy

Variables set in the Netlify UI override anything in `netlify.toml`. Never put real credentials in `netlify.toml`.

### Setting env vars locally

Copy `.env.example` to `.env.local` and fill in values. `.env.local` is git-ignored and will never be committed.

---

## Custom domain setup

The production domain is TBD — confirm with the client before configuring.

When the domain is confirmed:

1. Netlify dashboard → **Domain management** → **Add a domain**
2. Enter the domain (e.g. `oconnorcars.ie`)
3. Netlify provides DNS records — either:
   - Point the domain's nameservers to Netlify DNS (simplest), or
   - Add the provided `CNAME`/`A` records at the existing DNS provider
4. Netlify provisions a Let's Encrypt TLS certificate automatically once DNS propagates (usually under 10 minutes with Netlify DNS)
5. Enable **Force HTTPS** in the domain settings

---

## Wiring up the contact form email (when ready)

The `resend` package is not yet installed — it is dynamically imported only when `RESEND_API_KEY` is present, so there is no build-time dependency.

When ready to enable real email delivery:

```bash
pnpm add resend
```

Then set `RESEND_API_KEY` (and optionally the two address vars) in both Netlify and your local `.env.local`. No code changes are needed — the API route already handles it.

The sending domain (`oconnorcars.ie` or whichever address is used in `RESEND_FROM_EMAIL`) must be verified in the Resend dashboard before emails will deliver.

---

## How to roll back

### Via Netlify UI (instant)

1. Site dashboard → **Deploys**
2. Find the last known-good deploy in the list
3. Click it → **Publish deploy**

The rollback is live in under 30 seconds. No code change or git revert needed.

### Via git revert

If you want the rollback reflected in git history:

```bash
git revert <bad-commit-sha>
git push origin main
```

Netlify picks up the new commit and redeploys automatically.

---

## CI pipeline

The GitHub Actions workflow at `.github/workflows/ci.yml` runs on every push to `main` and every PR targeting `main`. Steps:

1. Install dependencies (`pnpm install --frozen-lockfile`)
2. Lint (`pnpm lint`)
3. Type-check (`pnpm tsc --noEmit`)
4. Build (`pnpm build`)

A failing CI run blocks merge on PRs (requires branch protection to be enabled in GitHub — recommended). The build step runs without any env vars to confirm the site is environment-agnostic.
