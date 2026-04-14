# MotoFit 2 — Code Update Log

---

## Update 004 — April 14, 2026

**Author:** Kiro AI (reviewed by Samael M.)
**Scope:** Security hardening, moving admin secrets out of client bundle
**Status:** Applied to local codebase. Pending git push to `main`.

---

### 1. New: `src/actions/admin-auth.ts` — Server action for admin authentication

**File:** `src/actions/admin-auth.ts`

**Problem:**
The secret admin passphrases ("The Devil of My Word", etc.) were hardcoded into the `SECRETS` and `HOLO_SECRETS` objects inside `src/components/ui/ai/MansiWidget.tsx`. Since this is a client component, the passphrases were included in the JavaScript bundle sent to every visitor, meaning anyone inspecting the source code could find the passphrases and trigger admin commands.

**Fix:**
- Created a `'use server'` action `verifyAdminSecret(passphrase)` that securely stores and verifies the passphrases on the server-side.
- Removed the hardcoded `SECRETS` objects from `MansiWidget.tsx`.
- Updated the `verify` flow logic in both `handleAdminFlow` and `handleHoloBridgeSend` to `await verifyAdminSecret(msg)` securely without ever exposing the true passphrases to the client.

---

## Update 003 — April 14, 2026

**Author:** Kiro AI (reviewed by Samael M.)
**Scope:** Neon DB migration for admin data — Workshop Stats, Dyno Leaderboard, Featured Projects
**Status:** Applied to local codebase. Pending git push to `main`.

> **One-time setup required after deploy:** Hit `GET /api/setup-db` once to create and seed the 3 new tables.

---

### 1. New: `src/actions/admin-store-db.ts` — Server actions for all admin DB reads/writes

All admin data (stats, leaderboard, projects) now has a proper server-side persistence layer backed by Neon Postgres. The file exposes 6 server actions:

| Action | Purpose |
|---|---|
| `getStatsFromDB()` | Read workshop stats |
| `updateStatInDB(key, value)` | Write a single stat |
| `getLeaderboardFromDB()` | Read dyno leaderboard |
| `upsertLeaderboardEntryInDB(entry)` | Insert or update a leaderboard rank |
| `getProjectsFromDB()` | Read featured projects (latest 6) |
| `addProjectToDB(project)` | Insert a project, auto-trims to 6 |

All functions have safe fallbacks to the hardcoded defaults if the DB is unavailable.

---

### 2. Updated: `src/app/api/setup-db/route.ts` — 3 new tables added

Three new tables are created and seeded on first run:

- `motofit_admin_stats` — key/value store for bikesServiced, googleReviews, satisfactionPercent
- `motofit_dyno_leaderboard` — ranked dyno entries with bike, owner, mods, gain, total
- `motofit_featured_projects` — recent project deliveries with name, date, status, type

All tables use `ON CONFLICT DO NOTHING` for safe re-runs. Default data is seeded automatically.

---

### 3. Updated: `src/services/mansi/agents/admin-store.ts` — Write methods now sync to DB

The three write methods now fire-and-forget to the DB after updating localStorage:
- `updateStat()` → also calls `updateStatInDB()`
- `addLeaderboardEntry()` → also calls `upsertLeaderboardEntryInDB()`
- `addProject()` → also calls `addProjectToDB()`

This means when Akshat or Samael update data via the Mansi chat admin commands, the change is:
1. Instantly visible in the current browser (localStorage)
2. Persisted to Neon DB within milliseconds (server action)
3. Visible to all other users on next page load (ISR revalidation within 60s)

---

### 4. Updated: `src/app/page.tsx` — Admin data fetched server-side in parallel

The homepage now fetches all three data sources in a single `Promise.all()` at request time:
```ts
const [stats, leaderboard, projects] = await Promise.all([
    getStatsFromDB(),
    getLeaderboardFromDB(),
    getProjectsFromDB(),
]);
```
Data is passed as props to `IndustrialStats`, `DynoLeaderboard`, and `FeaturedProjects`. Added `export const revalidate = 60` for ISR.

---

### 5. Updated: `IndustrialStats`, `DynoLeaderboard`, `FeaturedProjects`

All three components now accept server-fetched data as props instead of reading from localStorage on the client. This eliminates the client-side data fetch waterfall and makes the data visible to search engines.

- Removed `useEffect` + `MansiAdminStore.get*()` calls from all three
- Added typed `Props` interfaces
- `DynoLeaderboard` — removed the IIFE pattern for top gain, replaced with clean variable
- `FeaturedProjects` — fixed unescaped apostrophes, added `sizes` prop to `<Image>`

---



**Author:** Kiro AI (reviewed by Samael M.)
**Scope:** SEO improvement, build hardening, dead code removal, security header cleanup
**Status:** Applied to local codebase. Pending git push to `main`.

---

### 1. Fixed: Blog index page converted from client to server component

**File:** `src/app/blog/page.tsx`

**Problem:**
The blog index was a `'use client'` component that fetched blogs inside a `useEffect`. This meant:
- The page rendered as an empty shell on first load (no content for Google to index)
- Blog posts were not visible to search engine crawlers
- Every visitor triggered a client-side fetch waterfall

**Fix:**
- Removed `'use client'` directive — page is now a proper async server component
- Blogs are fetched server-side at request time via `getAllBlogs()`
- Added `export const revalidate = 60` so new AI-generated blogs appear within 60 seconds without a full redeploy (ISR — Incremental Static Regeneration)
- Removed `framer-motion` animation from `BlogCard` (not needed in a server component, and the hover CSS transitions already handle the visual effect)
- Added proper `sizes` prop to `<Image>` for better responsive image loading
- Added `aria-label` to the blog card link for accessibility
- Fixed unescaped apostrophes (`'`) that would cause React hydration warnings

---

### 2. Fixed: `eslint.ignoreDuringBuilds` set to `false`

**File:** `next.config.mjs`

**Problem:**
`eslint.ignoreDuringBuilds: true` was silently swallowing all ESLint errors during production builds. This means broken code patterns could ship to production without any warning.

**Fix:**
Set to `false`. The build will now fail fast if ESLint errors are introduced, which is the correct behavior for a production codebase.

---

### 3. Removed: Dead `src/lib/sanity.ts` file

**File:** `src/lib/sanity.ts` *(deleted)*

**Problem:**
This file imported `@sanity/image-url` and `next-sanity` but was not imported anywhere in the codebase. It was a leftover from an earlier Sanity CMS integration attempt. It caused a build error in a previous build session when `@sanity/image-url` was not installed.

**Fix:**
File deleted. If Sanity CMS integration is needed in the future, create a fresh `src/lib/sanity.ts` at that time.

---

### 4. Fixed: Netlify CSP header — removed external texture domain

**File:** `netlify.toml`

**Problem:**
The Content-Security-Policy `img-src` directive still contained `https://www.transparenttextures.com` even after the texture was moved to a local file in Update 001. This was a stale reference that could confuse future developers and unnecessarily whitelisted an external domain in the security policy.

**Fix:**
Removed `https://www.transparenttextures.com` from the `img-src` directive in the CSP header.

---

## Update 001 — April 14, 2026

**Author:** Kiro AI (reviewed by Samael M.)
**Scope:** Bug fixes, performance improvements, code quality
**Status:** Applied to local codebase. Pending git push to `main`.

---

### 1. Fixed: `require()` replaced with ES Module imports in `MansiWidget.tsx`

**File:** `src/components/ui/ai/MansiWidget.tsx`

**Problem:**
Two dynamic `require()` calls were buried inside async functions:
```js
// Inside handleSend()
const { MANSI_TRAINING_DATASET } = require('@/services/mansi/data/conversation-dataset');

// Inside handleHoloBridgeSend()
const { MANSI_TRAINING_DATASET } = require('@/services/mansi/data/conversation-dataset');
```
Dynamic `require()` inside client components breaks Next.js tree-shaking, can cause bundling inconsistencies, and is a CommonJS pattern in an ESM codebase.

**Fix:**
Added a single top-level import at the top of the file:
```ts
import { MANSI_TRAINING_DATASET } from '@/services/mansi/data/conversation-dataset';
```
Both inline `require()` calls were removed. Zero behavior change.

---

### 2. Fixed: External carbon-fibre texture replaced with local asset

**Files affected (14 files):**
- `src/app/globals.css`
- `src/app/about/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/gallery/page.tsx`
- `src/app/parts/page.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/HolographicServices.tsx`
- `src/components/sections/FeaturedProjects.tsx`
- `src/components/sections/DynoLeaderboard.tsx`
- `src/components/sections/MotoFitSystem.tsx`
- `src/components/sections/ServiceCatalog.tsx`
- `src/components/sections/ServiceLandingPage.tsx`
- `src/components/sections/PartsCatalog.tsx`
- `src/components/ui/GlobalTrustNetwork.tsx`

**Problem:**
Every page was making an HTTP request to an external third-party CDN on every render:
```
https://www.transparenttextures.com/patterns/carbon-fibre.png
```
This is a reliability risk — if that domain goes down, rate-limits, or changes, every page on the live site loses its background texture. It also adds an external DNS lookup on every page load.

**Fix:**
- Downloaded the texture file and saved it to `public/textures/carbon-fibre.png`
- Replaced all 16 occurrences of the external URL with the local path `/textures/carbon-fibre.png`

---

### 3. Verified: No TypeScript errors across the entire codebase

A full diagnostic pass was run across all source files including:
- All `src/app/**` pages and routes
- All `src/components/**` components
- All `src/actions/**` server actions
- All `src/services/**` Mansi AI agents
- All `src/lib/**` utilities
- All `src/data/**` data files
- All `src/context/**` providers

**Result:** Zero TypeScript errors or warnings found.

---

### 4. Investigated: Old build errors (confirmed already resolved)

The following errors appeared in `build_error.txt` and `build_error_2.txt` but were from **previous builds** and are no longer present in the codebase:

| Old Error | Status |
|---|---|
| `Cannot find module './HeroImageSlider'` in `src/components/Hero.tsx` | File no longer exists — resolved |
| `Type error: Property 'initialReviews' does not exist` in `page.tsx` | `ClientReviews` component already updated to accept no props — resolved |
| `Module not found: Can't resolve '@sanity/image-url'` | Package is installed and `sanity.ts` deleted in Update 002 — resolved |

---

## Remaining Known Issues / Future Work

These are issues that still need attention in future updates:

### High Priority

1. **One-time DB setup required**
   - After the next deploy, hit `GET /api/setup-db` once to create and seed the 3 new admin tables (`motofit_admin_stats`, `motofit_dyno_leaderboard`, `motofit_featured_projects`).
   - This is safe to run multiple times — all inserts use `ON CONFLICT DO NOTHING`.

### Low Priority

3. **`src/components/Background3D.tsx` is commented out in layout**
   - The component exists but is disabled in `layout.tsx`. If permanently removed, the file and its Three.js dependencies (`@react-three/fiber`, `@react-three/drei`, `three`) could be removed to reduce bundle size significantly.

4. **Mansi day-look images confirmed present** ✅
5. **Gallery and team images confirmed present** ✅

---

## Tech Stack Reference

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion, GSAP |
| 3D | Three.js, React Three Fiber |
| Smooth Scroll | Lenis |
| AI (Mansi) | OpenRouter → Sarvam → Helicone → Portkey → Ollama → Bonsai (6-layer fallback) |
| Database | Neon (serverless Postgres) |
| Deployment | Vercel (primary), Netlify (configured) |
| Repo | https://github.com/Manash8666/MotoFit-2-Website |

---

## Environment Variables Required

| Variable | Purpose |
|---|---|
| `OPENROUTER_API_KEY` | Primary AI model (Gemini 2.0 Flash via OpenRouter) |
| `SARVAM_API_KEY` | Indic language AI fallback |
| `HELICONE_API_KEY` | AI gateway layer 3 |
| `PORTKEY_API_KEY` | AI gateway layer 4 |
| `OLLAMA_API_KEY` | Self-hosted model fallback |
| `OLLAMA_HOST` | Ollama server URL |
| `BONSAI_API_KEY` | Final AI fallback |
| `BONSAI_HOST` | Bonsai server URL |
| `TAVILY_API_KEY` | Web search for Mansi learning engine |
