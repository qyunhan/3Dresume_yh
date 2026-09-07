# Phase 2.6 Minimal Portfolio Room Recomposition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Simplify the low-poly room into four clear portfolio anchors while preserving existing interaction and panel systems.

**Architecture:** Retain `Room.jsx` as the interaction composition root and existing `PortfolioObject` routing. Simplify visual child components in place, centralize clean anchors in `phase2Layout`, and retain unique camera-preset IDs already consumed by portfolio data.

**Tech Stack:** React 19, React Three Fiber, Drei, Three.js, Vitest, Vite.

**Spec:** `docs/superpowers/specs/2026-09-07-phase-2-6-recomposition-design.md`

## Global Constraints

- Do not change activeZone/selectedItem, panels, cat, OrbitControls, drag/zoom, room shell, window, door, rug, chair, cabinet, or detail-copy data.
- Use only existing procedural geometry and dependencies.
- Keep exactly four category labels and remove every scene interaction dot plus separate About geometry/marker.
- Keep physical hero objects at Projects 3, Experience 3 cards in one board, School 3 shelf objects, and Research TV plus ≤3 reports and one lamp.
- Every remaining physical portfolio hero object must retain independent camera framing.
- Validate with full tests and `GITHUB_ACTIONS=true npm run build`.

---

### Task 1: Establish minimal anchors and distinct camera framing

**Files:**
- Modify: `src/data/phase2Layout.js`
- Modify: `src/data/cameraPresets.js`
- Modify: `src/data/phase2Layout.test.js`
- Modify: `src/data/cameraPresets.test.js`

**Interfaces:**
- Consumes: current portfolio `cameraPreset` IDs.
- Produces: level project positions and per-object presets without renaming existing portfolio item IDs.

- [ ] Write failing tests that assert project x positions are ascending, share y/z values, UCLA is shelf-local, and unique item presets have non-identical targets.
- [ ] Run `npm test -- src/data/phase2Layout.test.js src/data/cameraPresets.test.js` and confirm failure.
- [ ] Set the desk display row to HDB left, finance center, weather right; locate all school item anchors on the shelf; retarget existing presets so no two item IDs share both position and target.
- [ ] Re-run the focused tests and confirm pass.
- [ ] Commit: `feat: align minimalist room anchors and cameras`.

### Task 2: Simplify visual groups and preserve object interactions

**Files:**
- Modify: `src/components/scene/Room.jsx`
- Modify: `src/components/scene/room/ResumeObjects.jsx`
- Modify: `src/components/scene/room/CareerJourney.jsx`
- Modify: `src/components/scene/room/SchoolLife.jsx`
- Modify: `src/components/scene/room/Decor.jsx`
- Modify: `src/components/scene/room/PortfolioObjects.jsx`
- Modify: `src/components/scene/Room.test.jsx`

**Interfaces:**
- Consumes: Task 1 anchors and current `PortfolioObject` callback payloads.
- Produces: uncluttered visual groups, with mesh clicks maintained for the specified remaining hero objects.

- [ ] Write failing scene tests that assert no `SceneMarker`/About interaction in `Room`, three project objects still route correctly, and only the intended School/Experience/Research hero groups compose.
- [ ] Run `npm test -- src/components/scene/Room.test.jsx` and confirm failure.
- [ ] Remove scene markers and About frame; make the desk only HDB/finance/weather; make career board only three cards; make School shelf trophy/NUS/UCLA; make research TV/reports/lamp only. Keep panel-only Science Club data untouched.
- [ ] Re-run focused tests and confirm pass.
- [ ] Commit: `feat: simplify portfolio room visual anchors`.

### Task 3: Verify visual composition contracts and ship readiness

**Files:**
- Create: `src/components/scene/room/MinimalComposition.test.jsx`
- Modify: affected scene tests only if necessary.

**Interfaces:**
- Consumes: final Room composition and item preset data.
- Produces: regression coverage for hero counts, minimal research props, and no disconnected UCLA/About physical section.

- [ ] Write failing tests for exactly three project heroes, exactly three career cards, exactly three School shelf heroes, and research reports no greater than three.
- [ ] Run `npm test -- src/components/scene/room/MinimalComposition.test.jsx` and confirm failure.
- [ ] Implement only any remaining testable composition adjustments needed to satisfy the minimal contract.
- [ ] Run `npm test && GITHUB_ACTIONS=true npm run build && git diff --check` and confirm all pass.
- [ ] Commit: `test: protect minimal room composition`.
