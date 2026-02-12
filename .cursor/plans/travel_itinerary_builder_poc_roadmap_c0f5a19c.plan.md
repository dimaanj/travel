---
name: Travel Itinerary Builder POC Roadmap
overview: A comprehensive day-by-day roadmap to build an Interactive Travel Itinerary Builder POC with real-time collaboration, covering all Frontend System Design interview topics including clean architecture, API design, scaling, real-time updates, monorepo structure, rendering strategies, component library design, performance, security, CSS architecture, testing, and CI/CD.
todos:
  - id: setup-monorepo
    content: Rename apps/org to apps/travel and create library structure (itinerary/domain, shared/ui, design-system)
    status: pending
  - id: design-system
    content: Create design system library with CSS variables, tokens, and base UI components
    status: pending
  - id: api-layer
    content: Design and implement REST API routes with typed API client and React Query integration
    status: pending
  - id: rendering-strategies
    content: Implement SSR, SSG, and CSR strategies in Next.js App Router
    status: pending
  - id: state-management
    content: Set up Zustand stores and React Query for state management
    status: pending
  - id: drag-drop
    content: Implement drag-and-drop timeline with dnd-kit
    status: pending
  - id: mapbox-integration
    content: Integrate Mapbox with custom markers, clustering, and geocoding
    status: pending
  - id: crdt-setup
    content: Set up Yjs CRDT for real-time collaboration
    status: pending
  - id: multi-user
    content: Implement multi-user editing with presence and conflict resolution
    status: pending
  - id: budget-tracking
    content: Build live budget tracking feature with real-time updates
    status: pending
  - id: performance
    content: Optimize performance with code splitting, lazy loading, and virtualization
    status: pending
  - id: offline-indexeddb
    content: Implement offline-first architecture with IndexedDB
    status: pending
  - id: service-worker
    content: Set up Service Worker with background sync
    status: pending
  - id: security
    content: Implement authentication, authorization, and security best practices
    status: pending
  - id: storybook
    content: Set up Storybook and document component library
    status: pending
  - id: unit-integration-tests
    content: Write unit and integration tests with Jest and React Testing Library
    status: pending
  - id: e2e-tests
    content: Create E2E test suite with Playwright
    status: pending
  - id: cicd-enhancement
    content: Enhance CI/CD pipeline with GitHub Actions
    status: pending
  - id: scaling-docs
    content: Document scaling strategies and create architecture diagrams
    status: pending
  - id: interview-prep
    content: Prepare interview materials and final polish
    status: pending
isProject: false
---

# Travel Itinerary Builder POC - Comprehensive Roadmap

## Project Overview

Build an Interactive Travel Itinerary Builder POC with real-time collaboration features. This project will serve as both a learning exercise and interview preparation, covering all major Frontend System Design topics.

## Architecture Decisions

### Monorepo Structure (Nx)

```
apps/
  travel/              # Main Next.js app (renamed from org)
  travel-e2e/          # Playwright E2E tests
  
libs/
  itinerary/
    domain/            # Domain models (Day, Activity, Budget)
    data-access/       # CRDT store + sync engine
    feature/           # Feature components (Timeline, BudgetTracker)
  maps/
    ui/                # Mapbox wrapper component
    utils/             # Map utilities (clustering, markers)
  drag-drop/
    ui/                # dnd-kit primitives
    hooks/             # Drag-drop hooks
  shared/
    ui/                # Core UI components (Button, Input, Card)
    utils/             # Shared utilities
    types/             # Shared TypeScript types
  design-system/       # CSS variables, tokens, breakpoints
  api-client/          # API client (REST/GraphQL abstraction)
  offline/             # IndexedDB + Service Worker logic
```

### Technology Stack

- **Framework**: Next.js 16 (App Router) with SSR/SSG/CSR strategies
- **State**: Zustand (client state) + React Query (server state)
- **Real-time**: Yjs CRDT + WebSocket
- **Maps**: Mapbox GL JS
- **Drag-drop**: @dnd-kit/core
- **Offline**: IndexedDB + Workbox (Service Worker)
- **Testing**: Jest + React Testing Library + Playwright
- **Styling**: CSS Modules + CSS Variables (design tokens)
- **API**: Next.js API Routes (REST) with GraphQL option exploration
- **CI/CD**: GitHub Actions with Nx Cloud

## Day-by-Day Roadmap

### Week 1: Foundation & Architecture

#### Day 1: Monorepo Setup & Clean Architecture

**Focus**: Monorepo structure, clean architecture layers

**Tasks**:

- Rename `apps/org` → `apps/travel`
- Create library structure: `libs/itinerary/domain`, `libs/shared/ui`, `libs/design-system`
- Set up path aliases in `tsconfig.base.json` (`@travel/itinerary-domain`, `@travel/shared-ui`)
- Create domain models: `Day`, `Activity`, `Budget`, `User`, `Itinerary`
- Set up clean architecture boundaries (domain → data-access → feature → ui)
- Configure Nx project graph and dependencies

**System Design Topics**:

- Monorepository patterns (Nx workspace)
- Clean architecture (domain-driven design)
- Dependency inversion (interfaces in domain, implementations in data-access)

**Deliverables**:

- Monorepo structure with proper boundaries
- TypeScript domain models
- Nx dependency graph visualization

---

#### Day 2: Design System & CSS Architecture

**Focus**: CSS Modules, CSS Variables, design tokens, responsive breakpoints

**Tasks**:

- Create `libs/design-system` with CSS variable tokens:
  - Colors (primary, secondary, semantic colors)
  - Typography (font families, sizes, weights, line heights)
  - Spacing scale (4px base unit)
  - Breakpoints (mobile, tablet, desktop)
  - Shadows, borders, transitions
- Create base UI components: `Button`, `Input`, `Card`, `Typography`
- Set up CSS Modules with TypeScript support
- Create responsive utilities (mixins/functions)
- Document design system in Storybook

**System Design Topics**:

- CSS vs Preprocessors (using CSS Variables instead of SASS)
- Design system architecture
- Responsive design patterns
- CSS Modules scoping and composition

**Deliverables**:

- Design system library with tokens
- 5+ base UI components
- Storybook setup with component documentation

---

#### Day 3: API Architecture & Data Layer

**Focus**: REST API design, Next.js API Routes, data access layer

**Tasks**:

- Design REST API endpoints:
  - `GET/POST /api/itineraries`
  - `GET/PUT/DELETE /api/itineraries/[id]`
  - `GET/POST /api/itineraries/[id]/activities`
  - `GET /api/itineraries/[id]/budget`
- Implement Next.js API Routes with proper error handling
- Create `libs/api-client` with typed API client
- Implement React Query hooks (`useItineraries`, `useItinerary`, `useCreateActivity`)
- Add request/response validation (Zod schemas)
- Document API design decisions (REST vs GraphQL comparison)

**System Design Topics**:

- REST API design (resources, HTTP methods, status codes)
- REST vs GraphQL (when to use each)
- API versioning strategy
- Error handling patterns
- Type-safe API clients

**Deliverables**:

- REST API routes in Next.js
- Typed API client library
- React Query integration
- API documentation

---

#### Day 4: Rendering Strategies (SSR/SSG/CSR)

**Focus**: Next.js App Router, rendering strategies, performance

**Tasks**:

- Implement SSR for itinerary detail page (`/itineraries/[id]`)
- Implement SSG for public itinerary pages (`/itineraries/[id]/public`)
- Implement CSR for interactive editor (client-side only)
- Use `generateStaticParams` for pre-rendering
- Implement ISR (Incremental Static Regeneration) for popular itineraries
- Add loading states and Suspense boundaries
- Measure and document performance differences

**System Design Topics**:

- CSR (Client-Side Rendering) - when and why
- SSR (Server-Side Rendering) - SEO, initial load
- SSG (Static Site Generation) - build-time generation
- ISR (Incremental Static Regeneration)
- Streaming SSR with React Suspense
- Performance trade-offs

**Deliverables**:

- Multiple rendering strategies implemented
- Performance metrics comparison
- Documentation of when to use each approach

---

#### Day 5: State Management Architecture

**Focus**: Zustand + React Query, state organization

**Tasks**:

- Set up Zustand stores:
  - `useUIStore` (modals, sidebar, theme)
  - `useEditorStore` (draft changes, undo/redo)
  - `useMapStore` (map center, zoom, selected markers)
- Set up React Query for server state:
  - Query keys factory pattern
  - Optimistic updates
  - Cache invalidation strategies
- Implement state synchronization patterns
- Add DevTools integration
- Document state management decisions

**System Design Topics**:

- Client state vs Server state separation
- State management patterns (Zustand, Redux comparison)
- Optimistic updates
- Cache invalidation strategies
- State normalization

**Deliverables**:

- Zustand stores for client state
- React Query setup for server state
- State management documentation

---

### Week 2: Core Features & Real-time

#### Day 6: Drag-and-Drop Timeline

**Focus**: dnd-kit, multiple containers, accessibility

**Tasks**:

- Create `libs/drag-drop/ui` with reusable primitives
- Implement timeline component with days as containers
- Implement activity cards as draggable items
- Add drag preview and drop indicators
- Handle cross-container dragging (move activity between days)
- Add keyboard navigation support
- Implement drag persistence (save on drop)

**System Design Topics**:

- Drag-and-drop patterns
- Accessibility (ARIA, keyboard navigation)
- Component composition
- Performance optimization (virtualization prep)

**Deliverables**:

- Drag-and-drop timeline component
- Reusable drag-drop primitives library
- Accessibility compliance

---

#### Day 7: Mapbox Integration

**Focus**: Mapbox GL JS, custom markers, clustering

**Tasks**:

- Set up Mapbox account and API key management
- Create `libs/maps/ui` with Map component wrapper
- Implement custom markers for activities
- Add marker clustering for dense areas
- Implement map bounds synchronization with timeline
- Add geocoding integration (search places)
- Implement route visualization between activities
- Lazy-load map tiles and components

**System Design Topics**:

- Third-party library integration patterns
- Map performance optimization
- Lazy loading strategies
- API key security (environment variables)

**Deliverables**:

- Mapbox integration
- Custom markers and clustering
- Geocoding search
- Performance optimizations

---

#### Day 8: CRDT Real-time Collaboration (Part 1)

**Focus**: Yjs CRDT setup, document structure

**Tasks**:

- Research and choose CRDT library (Yjs recommended)
- Set up Yjs document structure for itinerary
- Create `libs/itinerary/data-access` with Yjs store
- Implement Yjs provider (WebSocket or HTTP)
- Set up document synchronization
- Add conflict resolution testing
- Document CRDT vs Operational Transform comparison

**System Design Topics**:

- CRDTs (Conflict-free Replicated Data Types)
- Real-time collaboration patterns
- Conflict resolution strategies
- Operational Transform vs CRDTs
- WebSocket vs Server-Sent Events

**Deliverables**:

- Yjs integration
- Document structure design
- Basic synchronization working

---

#### Day 9: CRDT Real-time Collaboration (Part 2)

**Focus**: Multi-user editing, presence, conflict resolution

**Tasks**:

- Implement user presence (who's editing what)
- Add cursor tracking (show other users' cursors)
- Implement awareness API (user list, active users)
- Add conflict resolution UI (show conflicts, resolve)
- Implement undo/redo with Yjs
- Add real-time updates indicator
- Test with multiple concurrent users

**System Design Topics**:

- Real-time updates patterns
- Presence systems
- Conflict resolution UX
- Scalability considerations (WebSocket limits)

**Deliverables**:

- Multi-user editing working
- Presence indicators
- Conflict resolution

---

#### Day 10: Budget Tracking Feature

**Focus**: Live budget calculations, real-time updates

**Tasks**:

- Create budget domain model
- Implement budget calculation engine
- Add budget tracking UI component
- Integrate with real-time updates (CRDT)
- Add budget alerts (over budget warnings)
- Implement budget categories
- Add currency conversion (optional)

**System Design Topics**:

- Feature implementation patterns
- Real-time calculations
- Derived state management

**Deliverables**:

- Budget tracking feature
- Real-time budget updates
- Budget alerts

---

### Week 3: Performance & Offline

#### Day 11: Performance Optimization

**Focus**: Code splitting, lazy loading, virtualization

**Tasks**:

- Implement route-based code splitting
- Add component lazy loading (React.lazy, dynamic imports)
- Implement virtualized timeline (react-window or react-virtuoso)
- Optimize map rendering (lazy-load markers, debounce updates)
- Add image optimization (Next.js Image component)
- Implement service worker for asset caching
- Measure and document performance improvements (Lighthouse, Web Vitals)

**System Design Topics**:

- Performance optimization strategies
- Code splitting patterns
- Virtualization for large lists
- Web Vitals (LCP, FID, CLS)
- Bundle size optimization

**Deliverables**:

- Performance optimizations implemented
- Lighthouse scores improved
- Performance documentation

---

#### Day 12: Offline-First Architecture (Part 1)

**Focus**: IndexedDB, local storage strategy

**Tasks**:

- Set up IndexedDB wrapper (`libs/offline`)
- Implement local data persistence (save itinerary to IndexedDB)
- Create sync queue (store changes when offline)
- Implement conflict resolution for offline changes
- Add offline indicator UI
- Test offline scenarios

**System Design Topics**:

- Offline-first architecture
- IndexedDB vs LocalStorage
- Sync strategies
- Conflict resolution for offline changes

**Deliverables**:

- IndexedDB integration
- Offline data persistence
- Sync queue implementation

---

#### Day 13: Offline-First Architecture (Part 2)

**Focus**: Service Workers, background sync

**Tasks**:

- Set up Workbox for service worker
- Implement background sync (sync when back online)
- Add cache strategies (cache-first, network-first)
- Implement offline fallbacks (show cached data)
- Add push notifications for sync completion
- Test service worker lifecycle
- Document offline strategy

**System Design Topics**:

- Service Workers
- Background sync API
- Cache strategies
- Progressive Web App (PWA) features

**Deliverables**:

- Service worker implementation
- Background sync working
- Offline functionality complete

---

#### Day 14: Security Implementation

**Focus**: Authentication, authorization, security best practices

**Tasks**:

- Implement authentication (NextAuth.js or custom)
- Add authorization (user can only edit own itineraries)
- Implement API route protection
- Add CSRF protection
- Sanitize user inputs
- Implement rate limiting for API routes
- Add security headers (CSP, HSTS)
- Document security considerations

**System Design Topics**:

- Authentication vs Authorization
- Security best practices
- CSRF, XSS prevention
- Rate limiting
- Security headers

**Deliverables**:

- Authentication system
- Authorization checks
- Security headers configured
- Security documentation

---

#### Day 15: Component Library & Storybook

**Focus**: Component library design, documentation

**Tasks**:

- Refactor shared components into `libs/shared/ui`
- Set up Storybook with all components
- Add component documentation (props, examples)
- Create component composition examples
- Add accessibility testing in Storybook
- Document component API patterns
- Add visual regression testing (Chromatic or Percy)

**System Design Topics**:

- Component library design
- Design system implementation
- Component composition patterns
- Documentation strategies
- Visual regression testing

**Deliverables**:

- Storybook with all components
- Component documentation
- Visual regression testing setup

---

### Week 4: Testing & CI/CD

#### Day 16: Unit & Integration Testing

**Focus**: Jest, React Testing Library, test coverage

**Tasks**:

- Write unit tests for domain models
- Write unit tests for utility functions
- Write integration tests for API routes
- Write component tests (React Testing Library)
- Add test coverage reporting
- Set up test utilities and mocks
- Document testing strategy

**System Design Topics**:

- Testing pyramid (unit, integration, E2E)
- Test-driven development (TDD)
- Mocking strategies
- Test coverage metrics

**Deliverables**:

- Unit tests for core logic
- Integration tests for API
- Component tests
- Test coverage > 80%

---

#### Day 17: E2E Testing with Playwright

**Focus**: End-to-end testing, user flows

**Tasks**:

- Set up Playwright configuration
- Write E2E tests for critical user flows:
  - Create itinerary
  - Add activities
  - Drag-and-drop activities
  - Real-time collaboration
  - Offline sync
- Add visual regression tests
- Set up E2E test CI pipeline
- Document E2E testing strategy

**System Design Topics**:

- E2E testing strategies
- Test automation
- User flow testing
- Visual regression testing

**Deliverables**:

- E2E test suite
- Critical flows covered
- CI integration

---

#### Day 18: CI/CD Pipeline Enhancement

**Focus**: GitHub Actions, deployment strategies

**Tasks**:

- Enhance existing CI workflow:
  - Add test coverage checks
  - Add linting and type checking
  - Add build verification
  - Add E2E tests
  - Add performance budgets
- Set up deployment pipeline (Vercel/Netlify)
- Add preview deployments for PRs
- Implement deployment strategies (blue-green, canary)
- Add monitoring and error tracking (Sentry)
- Document CI/CD process

**System Design Topics**:

- CI/CD best practices
- Deployment strategies
- Preview deployments
- Monitoring and observability
- Nx Cloud task distribution

**Deliverables**:

- Enhanced CI/CD pipeline
- Automated deployments
- Monitoring setup
- CI/CD documentation

---

#### Day 19: Scaling Considerations & Documentation

**Focus**: Scaling strategies, system design documentation

**Tasks**:

- Document scaling strategies:
  - Horizontal scaling (multiple instances)
  - Database scaling (read replicas, sharding)
  - CDN for static assets
  - WebSocket scaling (Redis pub/sub)
  - Caching strategies (Redis, CDN)
- Create system architecture diagram
- Document API rate limits and quotas
- Add performance monitoring
- Create scaling playbook

**System Design Topics**:

- Horizontal vs Vertical scaling
- Database scaling strategies
- Caching strategies
- CDN usage
- Load balancing
- WebSocket scaling

**Deliverables**:

- Scaling documentation
- Architecture diagrams
- Performance monitoring
- Scaling playbook

---

#### Day 20: Interview Preparation & Polish

**Focus**: Prepare for interviews, final polish

**Tasks**:

- Create interview talking points for each system design topic
- Prepare demo scenarios
- Add README with architecture overview
- Create presentation slides (optional)
- Practice explaining:
  - Architecture decisions
  - Trade-offs made
  - Performance optimizations
  - Scaling strategies
- Add final polish and bug fixes
- Deploy final version

**System Design Topics**:

- Interview preparation
- System design presentation
- Trade-off discussions

**Deliverables**:

- Interview preparation materials
- Final polished POC
- Documentation complete

---

## Key Files to Create/Modify

### Apps

- `apps/travel/` - Rename from `org`, main Next.js application
- `apps/travel-e2e/` - E2E tests (rename from `org-e2e`)

### Libraries

- `libs/itinerary/domain/` - Domain models and interfaces
- `libs/itinerary/data-access/` - CRDT store, sync engine
- `libs/itinerary/feature/` - Feature components (Timeline, BudgetTracker)
- `libs/maps/ui/` - Mapbox wrapper component
- `libs/maps/utils/` - Map utilities
- `libs/drag-drop/ui/` - Drag-drop primitives
- `libs/drag-drop/hooks/` - Drag-drop hooks
- `libs/shared/ui/` - Core UI components
- `libs/shared/utils/` - Shared utilities
- `libs/design-system/` - CSS variables, tokens, breakpoints
- `libs/api-client/` - API client abstraction
- `libs/offline/` - IndexedDB + Service Worker

### Configuration

- `tsconfig.base.json` - Path aliases for libraries
- `.github/workflows/ci.yml` - Enhanced CI/CD pipeline
- `nx.json` - Nx configuration (already exists)

## System Design Topics Coverage

Each day focuses on specific system design topics:

1. **Clean Architecture** - Day 1 (domain-driven design, dependency inversion)
2. **Monorepository** - Day 1 (Nx workspace structure)
3. **CSS vs Preprocessors** - Day 2 (CSS Variables, CSS Modules)
4. **API: REST vs GraphQL** - Day 3 (REST implementation, GraphQL comparison)
5. **CSR, SSR, SSG** - Day 4 (all rendering strategies)
6. **Components Library Design** - Day 15 (Storybook, component patterns)
7. **Performance** - Day 11 (optimization strategies)
8. **Real-time Updates** - Days 8-9 (CRDT, WebSocket)
9. **Offline-first** - Days 12-13 (IndexedDB, Service Workers)
10. **Security** - Day 14 (authentication, authorization, best practices)
11. **Integration Testing** - Day 16 (Jest, React Testing Library)
12. **CI/CD** - Day 18 (GitHub Actions, deployment)
13. **Scaling** - Day 19 (horizontal scaling, caching, WebSocket scaling)

## Success Metrics

- **Code Quality**: ESLint passing, TypeScript strict mode, >80% test coverage
- **Performance**: Lighthouse score >90, Web Vitals passing
- **Features**: All core features working (timeline, maps, real-time, offline)
- **Documentation**: Complete README, API docs, architecture docs
- **CI/CD**: Automated testing and deployment
- **Interview Ready**: Can explain all system design decisions and trade-offs

## Next Steps After Plan Approval

1. Rename `apps/org` → `apps/travel`
2. Create library structure using Nx generators
3. Set up design system and base components
4. Begin Day 1 implementation

This roadmap ensures comprehensive coverage of Frontend System Design topics while building a production-quality POC that demonstrates real-world skills.