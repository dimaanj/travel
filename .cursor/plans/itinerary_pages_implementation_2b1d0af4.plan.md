---
name: Itinerary Pages Implementation
overview: "Implement the four main itinerary pages (list, detail, public, editor) in the Next.js App Router with the rendering strategies from the roadmap: SSR for list and detail, SSG/ISR for public shareable page, and CSR for the interactive editor, reusing the existing API client, React Query hooks, and design system."
todos: []
isProject: false
---

# Itinerary Pages Implementation Plan

## Current state

- **App**: Next.js App Router in [apps/travel](apps/travel); single placeholder [src/app/page.tsx](apps/travel/src/app/page.tsx); [layout.tsx](apps/travel/src/app/layout.tsx) wraps with React Query `Providers`.
- **API**: REST routes and [db](apps/travel/src/app/api/db.ts) return full `ItineraryDto` (with `days`, `activities`, `budget`). [libs/api-client](libs/api-client) exposes `apiClient` and hooks: `useItineraries`, `useItinerary`, `useActivities`, `useBudget`, plus mutations.
- **UI**: [libs/design-system](libs/design-system) (tokens, base styles), [libs/shared/ui](libs/shared/ui) (Button, Input, Card, Typography).

No itinerary routes exist yet; all work is under `apps/travel/src/app`.

---

## Target routes and rendering strategy


| Route                      | Strategy  | Purpose                                                               |
| -------------------------- | --------- | --------------------------------------------------------------------- |
| `/itineraries`             | SSR       | List user's itineraries; good first paint                             |
| `/itineraries/[id]`        | SSR       | View single itinerary (read-only); SEO-friendly, fast initial content |
| `/itineraries/[id]/public` | SSG + ISR | Shareable read-only page; cacheable, optional revalidate              |
| `/itineraries/[id]/edit`   | CSR       | Interactive editor (future drag-drop, real-time); client-only         |


---

## 1. Server data layer (for SSR/SSG)

The API client uses `fetch` and on the server would call the app’s own origin. To avoid that and to support SSG/ISR, add a **server-only** data layer that uses the existing DB.

- **Add** a server module in the app, e.g. `apps/travel/src/lib/server-data.ts` (or `src/app/lib/`), that:
  - Imports [db](apps/travel/src/app/api/db.ts) from the API layer (or re-exports a single place that creates the Prisma client).
  - Exposes `getItinerariesList()` and `getItineraryById(id: string)` returning the same shapes as the API (`ItineraryDto[]` and `ItineraryDto | null`).
- Use this module only in Server Components and Route Handlers; do not import in client bundles.

If you prefer to keep a single source of truth, the API route handlers already use `db`; the server data module can live next to them and call the same `db` methods.

---

## 2. List page: `/itineraries` (SSR)

- **File**: `apps/travel/src/app/itineraries/page.tsx` (Server Component).
- **Data**: In the page, call the server data layer (e.g. `getItinerariesList()`), await it, and pass the result as props to the list UI.
- **UI**: Render a simple list of itineraries (title, dates, link to `/itineraries/[id]`). Use existing design tokens and shared UI (e.g. Card, Typography) where it fits.
- **Loading**: Add `apps/travel/src/app/itineraries/loading.tsx` (e.g. skeleton or spinner) for Suspense.
- **Empty state**: If the list is empty, show a message and a link to create an itinerary (creation can be a later step; link can point to a placeholder or a simple client form on the same page).
- **Navigation**: Ensure the root page ([src/app/page.tsx](apps/travel/src/app/page.tsx)) links to `/itineraries` (e.g. “My itineraries”) so the list is reachable.

---

## 3. Detail page: `/itineraries/[id]` (SSR)

- **File**: `apps/travel/src/app/itineraries/[id]/page.tsx` (Server Component).
- **Data**: In the page, read `params.id`, call the server data layer `getItineraryById(id)`. If null, render a 404 (e.g. `notFound()`).
- **UI**: Display itinerary title, description, date range, and a day-by-day list of activities (read-only). Optionally show budget summary from `itinerary.budget` using existing domain types.
- **Links**: Add “Edit” linking to `/itineraries/[id]/edit` and optionally “Share” linking to `/itineraries/[id]/public`.
- **Loading**: Add `apps/travel/src/app/itineraries/[id]/loading.tsx` for the segment.
- **Error**: Add `apps/travel/src/app/itineraries/[id]/error.tsx` (client component) for error boundary if desired.

---

## 4. Public page: `/itineraries/[id]/public` (SSG + ISR)

- **File**: `apps/travel/src/app/itineraries/[id]/public/page.tsx`.
- **Strategy**:
  - Use **SSG** with `generateStaticParams`: if you have a bounded set of “featured” or seed itineraries, return their IDs so those paths are pre-rendered at build time.
  - For any other `[id]`, rely on **dynamicParams: true** (default) so the first request generates the page, then cache it.
  - Add `revalidate` (e.g. 60 seconds or 3600) for **ISR** so updated itineraries get fresh HTML without full rebuild.
- **Data**: Same server data layer `getItineraryById(id)`. Optionally enforce `itinerary.isPublic` and return 404 or redirect if not public.
- **UI**: Same read-only content as the detail page but with a “public” layout (e.g. no “Edit”, minimal chrome, share-friendly meta tags).
- **Meta**: Set `metadata` (or `generateMetadata`) with itinerary title and description for sharing/SEO.

---

## 5. Editor page: `/itineraries/[id]/edit` (CSR)

- **File**: `apps/travel/src/app/itineraries/[id]/edit/page.tsx` (Client Component or a thin wrapper that renders a client editor).
- **Strategy**: No server-side data fetch for the editor UI. Shell can be minimal (e.g. layout with back link and title placeholder).
- **Data**: Use existing [useItinerary(id)](libs/api-client/src/hooks/use-itineraries.ts), [useActivities(itineraryId)](libs/api-client/src/hooks/use-activities.ts), [useBudget(itineraryId)](libs/api-client/src/hooks/use-budget.ts) to load data after mount. Optionally prefetch from the parent layout (see below).
- **UI**: Simple editor for this POC: show itinerary title (editable), list of days and activities (read-only list is enough for now). No drag-drop or real-time yet; that aligns with later roadmap days. “Save” can call `useUpdateItinerary(id)` and existing activity mutations as needed.
- **Loading**: Show a loading state while `useItinerary` is fetching; handle 404 (invalid id) in the client.
- **Layout**: Consider a shared [layout.tsx](apps/travel/src/app/layout.tsx) under `itineraries/[id]` that prefetches the single itinerary (e.g. via server data or React Query’s prefetch in a server layout) so both detail and edit benefit; if so, the edit page can consume the same query cache.

---

## 6. Shared layout and navigation

- **Layout**: Add `apps/travel/src/app/itineraries/layout.tsx` with a simple nav (e.g. “Back to list” to `/itineraries`) and optional breadcrumbs. This wraps list and all `[id]` routes.
- **Root**: Update [src/app/page.tsx](apps/travel/src/app/page.tsx) to link to `/itineraries` and optionally to “Create itinerary” (can be a client form on `/itineraries` or a separate route later).

---

## 7. Optional: Prefetch for edit page

- If you add a layout under `itineraries/[id]` that runs on the server, you can prefetch `getItineraryById(id)` and pass to React Query’s `HydrationBoundary` / `dehydrate` so the edit page has data immediately. This is an optimization; the editor can work with client-only fetching first.

---

## File summary


| Path                                       | Purpose                                                              |
| ------------------------------------------ | -------------------------------------------------------------------- |
| `src/lib/server-data.ts`                   | Server-only getItinerariesList, getItineraryById (using existing db) |
| `src/app/itineraries/layout.tsx`           | Shared nav / breadcrumbs for itinerary section                       |
| `src/app/itineraries/page.tsx`             | List page (SSR)                                                      |
| `src/app/itineraries/loading.tsx`          | List loading UI                                                      |
| `src/app/itineraries/[id]/page.tsx`        | Detail page (SSR)                                                    |
| `src/app/itineraries/[id]/loading.tsx`     | Detail loading UI                                                    |
| `src/app/itineraries/[id]/error.tsx`       | Optional error boundary                                              |
| `src/app/itineraries/[id]/public/page.tsx` | Public shareable page (SSG/ISR)                                      |
| `src/app/itineraries/[id]/edit/page.tsx`   | Editor page (CSR)                                                    |
| `src/app/page.tsx`                         | Update: link to /itineraries                                         |


---

## Dependencies

- Existing: [db](apps/travel/src/app/api/db.ts), [api-client](libs/api-client) hooks and types, [design-system](libs/design-system), [shared/ui](libs/shared/ui).
- No new packages required for this plan. Map, drag-drop, and real-time are out of scope for this implementation.

---

## Order of implementation

1. Server data layer (`server-data.ts`).
2. Itineraries layout and list page (SSR) + loading; wire root page to `/itineraries`.
3. Detail page (SSR) + loading (and optional error).
4. Public page (SSG/ISR) with `generateStaticParams` and `revalidate`.
5. Editor page (CSR) with existing hooks and minimal editable UI.

This order gives a working flow: list → detail → public share link → edit, and matches the rendering strategy plan from the roadmap (Day 4).