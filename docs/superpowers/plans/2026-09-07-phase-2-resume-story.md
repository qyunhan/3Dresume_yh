# Phase 2 Resume Story Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the current 3D room into an immediately understandable four-zone interactive resume while retaining its existing exploration systems and visual identity.

**Architecture:** Portfolio content and item-to-scene mappings live in `src/data/portfolio.js`. `App` owns a `{ activeZone, selectedItem }` selection state; the room selects zone labels or item objects, and a reusable HTML detail shell renders the selected zone with an internal item switcher. Primitive-only scene modules render zone-specific objects and labels from transforms rather than portfolio copy.

**Tech Stack:** React 19, Vite, React Three Fiber, Drei, Three.js, Vitest, Testing Library.

**Spec:** `docs/superpowers/specs/2026-09-07-phase-2-resume-story-design.md`

## Global Constraints

- Preserve the existing room shell, opening-door entry, OrbitControls, drag/look, scroll zoom, camera transitions, interaction behavior, purple cozy palette, and cat Easter egg.
- Do not rebuild the app, add physics, post-processing, large textures, or new final model assets.
- New resume props use only low-poly box, plane, and cylinder geometry.
- Keep all readable labels and portfolio interfaces as React DOM, never Three.js text.
- Keep resume copy out of `Room.jsx` and scene geometry modules.
- Use `activeZone + selectedItem`; zone labels open an overview and item props open their direct item detail.
- Keep the cat separate from resume navigation and do not change its model or trot behavior.

---

### Task 1: Portfolio Data and Zone Selection State

**Files:**
- Create: `src/data/portfolio.js`
- Create: `src/data/portfolio.test.js`
- Modify: `src/App.jsx`
- Modify: `src/App.test.jsx`

**Interfaces:**
- Produces `portfolio`, `ZONE_IDS`, `getZone(id)`, and `getPortfolioItem(zoneId, itemId)`.
- Produces `selection = { activeZone: string | null, selectedItem: string | null }` in `App`.
- `Room` receives `onSelectZone(zoneId)` and `onSelectItem({ zoneId, itemId, cameraPreset })`.

- [ ] **Step 1: Write failing data-contract tests**

```js
import { expect, test } from 'vitest'
import { ZONE_IDS, getPortfolioItem, portfolio } from './portfolio'

test('defines all four recruiter-facing resume zones', () => {
  expect(ZONE_IDS).toEqual(['projects', 'research', 'experience', 'school'])
  expect(portfolio.projects.title).toBe('Projects')
  expect(portfolio.school.subtitle).toBe('Beyond Work')
})

test('maps an HDB object to its direct detail item', () => {
  expect(getPortfolioItem('projects', 'hdb').title).toBe('HDB Price Prediction')
  expect(getPortfolioItem('missing', 'hdb')).toBeNull()
})
```

- [ ] **Step 2: Run data test to verify RED**

Run: `npm test -- src/data/portfolio.test.js`

Expected: FAIL because `portfolio.js` does not exist.

- [ ] **Step 3: Implement the canonical portfolio content**

```js
export const ZONE_IDS = ['projects', 'research', 'experience', 'school']

export const portfolio = {
  projects: { title: 'Projects', subtitle: 'What I Build', items: [
    { id: 'financial-automation', title: 'Automated Financial Dashboard', subtitle: 'AI × Finance × Automation', skills: ['Python', 'Financial Analysis', 'Automation'], objectName: 'Financial dashboard', cameraPreset: 'financialAutomation', status: 'selected' },
    { id: 'weather', title: 'Time Series Weather Forecasting', subtitle: 'Machine Learning × Time Series', skills: ['Python', 'Pandas', 'Feature Engineering'], objectName: 'Weather station', cameraPreset: 'weather', status: 'selected' },
    { id: 'hdb', title: 'HDB Price Prediction', subtitle: 'End-to-End ML Product', skills: ['Python', 'Machine Learning', 'Dash'], objectName: 'HDB block', cameraPreset: 'hdb', status: 'selected' },
  ] },
  research: { title: 'Research', subtitle: 'How I Think', items: [{ id: 'equity-research', title: 'Equity Research', subtitle: 'Company analysis and valuation', skills: ['DCF', 'EV/EBITDA', 'P/E'], objectName: 'Equity report', cameraPreset: 'equityResearch', status: 'selected' }] },
  experience: { title: 'Experience', subtitle: "Where I've Worked", items: [
    { id: 'ey', title: 'EY', subtitle: 'Valuation and consulting', skills: ['Valuation', 'Impact Evaluation', 'Consulting'], objectName: 'Valuation calculator', cameraPreset: 'ey', status: 'selected' },
    { id: 'shopee', title: 'Shopee', subtitle: 'Strategy and analytics', skills: ['Strategy', 'Analytics', 'Stakeholder Management'], objectName: 'Commerce parcel', cameraPreset: 'shopee', status: 'selected' },
    { id: 'uob', title: 'UOB', subtitle: 'AI product and workflows', skills: ['AI Product', 'PRDs', 'Testing'], objectName: 'AI blueprint', cameraPreset: 'uob', status: 'selected' },
  ] },
  school: { title: 'School & Life', subtitle: 'Beyond Work', items: [
    { id: 'nus', title: 'NUS', subtitle: 'Data Science & Economics', skills: ['Data Science', 'Economics'], objectName: 'NUS books', cameraPreset: 'nus', status: 'selected' },
    { id: 'rc4-flag', title: 'RC4 Flag', subtitle: 'Project Director', skills: ['Leadership', 'Fundraising', 'Community'], objectName: 'Gold trophy', cameraPreset: 'rc4', status: 'selected' },
    { id: 'science-club', title: 'Science Club', subtitle: 'Volunteering and community', skills: ['Volunteering', 'Community'], objectName: 'Science token', cameraPreset: 'scienceClub', status: 'selected' },
    { id: 'ucla', title: 'UCLA Exchange', subtitle: 'Study • Travel • Explore', skills: ['Curiosity', 'Adaptability'], objectName: 'UCLA polaroid', cameraPreset: 'ucla', status: 'selected' },
  ] },
}

export const getZone = (zoneId) => portfolio[zoneId] ?? null
export const getPortfolioItem = (zoneId, itemId) => getZone(zoneId)?.items.find((item) => item.id === itemId) ?? null
```

Populate every item with id, title, subtitle, skills (2-3 hiring-relevant tags), shortDescription, longDescription, objectName, cameraPreset, and status. Use the Phase 2 copy from the approved spec; no resume text belongs in scene files.

- [ ] **Step 4: Replace single section state in `App`**

```jsx
const [selection, setSelection] = useState({ activeZone: null, selectedItem: null })
const selectZone = (activeZone) => setSelection({ activeZone, selectedItem: null })
const selectItem = ({ zoneId, itemId }) => setSelection({ activeZone: zoneId, selectedItem: itemId })
const clearSelection = () => setSelection({ activeZone: null, selectedItem: null })
```

Keep `selectedSection`-dependent camera behavior temporarily by deriving a valid preset from `selection` until Task 2 replaces its interface.

- [ ] **Step 5: Update app tests**

Mock `Room` with one zone and one item selector. Assert item selection opens `Projects` with `HDB Price Prediction`, item-less selection opens `Projects`, and Back removes the dialog.

- [ ] **Step 6: Run focused tests**

Run: `npm test -- src/data/portfolio.test.js src/App.test.jsx`

Expected: PASS.

- [ ] **Step 7: Commit selection architecture**

```bash
git add src/data/portfolio.js src/data/portfolio.test.js src/App.jsx src/App.test.jsx
git commit -m "feat: add zone-first portfolio selection"
```

### Task 2: Reusable Zone Labels and Detail Panel Shell

**Files:**
- Create: `src/components/scene/ZoneLabel.jsx`
- Create: `src/components/scene/ZoneLabel.test.jsx`
- Create: `src/components/ui/DetailPanel.jsx`
- Create: `src/components/ui/DetailPanel.test.jsx`
- Modify: `src/components/ui/Overlay.jsx`
- Modify: `src/style.css`

**Interfaces:**
- `ZoneLabel({ title, subtitle, position, onSelect })` renders a Drei `Html` button with a compact environmental-label treatment.
- `DetailPanel({ activeZone, selectedItem, onBack, onSelectItem })` consumes `portfolio` data and renders zone overview or selected item plus a zone item switcher.

- [ ] **Step 1: Write failing label and panel tests**

```jsx
test('opens a zone from its environmental label', async () => {
  const onSelect = vi.fn()
  render(<ZoneLabel title="PROJECTS" subtitle="What I Build" position={[0, 0, 0]} onSelect={onSelect} />)
  await userEvent.click(screen.getByRole('button', { name: 'Projects: What I Build' }))
  expect(onSelect).toHaveBeenCalledOnce()
})

test('switches items without closing its zone panel', async () => {
  render(<DetailPanel activeZone="projects" selectedItem="hdb" onBack={() => {}} onSelectItem={onSelectItem} />)
  await userEvent.click(screen.getByRole('button', { name: 'Time Series Weather Forecasting' }))
  expect(onSelectItem).toHaveBeenCalledWith('weather')
  expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run focused tests to verify RED**

Run: `npm test -- src/components/scene/ZoneLabel.test.jsx src/components/ui/DetailPanel.test.jsx`

Expected: FAIL because the components do not exist.

- [ ] **Step 3: Implement `ZoneLabel`**

Use Drei `Html` with a DOM button. The visible title is uppercase, subtitle is smaller, and the button has no permanent glowing tutorial pill. It uses `aria-label={`${title}: ${subtitle}`}` and calls `onSelect` after stopping pointer propagation.

- [ ] **Step 4: Implement `DetailPanel` and route Overlay through it**

Render the active zone heading and overview intro. If `selectedItem` resolves, render its title, subtitle, short/long description, and `SkillTags`. Render a compact list of buttons from `zone.items`; selecting one calls `onSelectItem(item.id)`. Preserve the existing `Back to room` control and dialog semantics.

- [ ] **Step 5: Add editorial styles**

Add `.zone-label`, `.zone-label__title`, `.zone-label__subtitle`, `.item-switcher`, `.item-switcher__button`, and `.detail-item`. Keep labels subtle, cards at 8px radius, thin gray-lilac borders, dark plum type, muted lavender secondary text, no gradients or glass bubbles. At <=720px, preserve the bottom-sheet panel and horizontally scrollable item switcher.

- [ ] **Step 6: Run focused tests**

Run: `npm test -- src/components/scene/ZoneLabel.test.jsx src/components/ui/DetailPanel.test.jsx src/components/ui/Overlay.test.jsx`

Expected: PASS.

- [ ] **Step 7: Commit panel shell**

```bash
git add src/components/scene/ZoneLabel.jsx src/components/scene/ZoneLabel.test.jsx src/components/ui/DetailPanel.jsx src/components/ui/DetailPanel.test.jsx src/components/ui/Overlay.jsx src/style.css
git commit -m "feat: add zone labels and item detail panel"
```

### Task 3: Scene Contracts, Camera Presets, and Project/Research Props

**Files:**
- Create: `src/data/phase2Layout.js`
- Create: `src/data/phase2Layout.test.js`
- Create: `src/components/scene/room/ResumeObjects.jsx`
- Modify: `src/data/cameraPresets.js`
- Modify: `src/data/cameraPresets.test.js`
- Modify: `src/components/scene/Room.jsx`

**Interfaces:**
- `phase2Layout` maps each zone label and portfolio item id to `position`, `markerPosition`, and `cameraPreset`.
- `ResumeObjects` exports `FinancialDashboard`, `WeatherStation`, `HdbBlock`, and `EquityResearchStation`.
- Room item callbacks call `onSelectItem({ zoneId, itemId, cameraPreset })`.

- [ ] **Step 1: Write failing layout and camera tests**

```js
test('maps desk project props and research props to distinct zone locations', () => {
  expect(phase2Layout.items.hdb.zoneId).toBe('projects')
  expect(phase2Layout.items['equity-research'].zoneId).toBe('research')
  expect(phase2Layout.zoneLabels.school.position).toHaveLength(3)
})

test.each(['financialAutomation', 'weather', 'hdb', 'equityResearch'])(
  '%s has an authored camera preset',
  (presetId) => expect(cameraPresets[presetId].position).toHaveLength(3),
)
```

- [ ] **Step 2: Run layout and camera tests to verify RED**

Run: `npm test -- src/data/phase2Layout.test.js src/data/cameraPresets.test.js`

Expected: FAIL because `phase2Layout` and the Phase 2 presets do not exist.

- [ ] **Step 3: Implement transforms and presets**

Place Projects on/along the left desk, Research at the right TV/report area, Experience on the back-center wall, School on upper shelves, and About near the desk. Keep all project anchors clear of desk accessories and all research anchors clear of the console. Add selection presets that remain under 13 units from their target and retain surrounding context.

- [ ] **Step 4: Build primitive project and research props**

Use only boxes, planes, and cylinders:

```jsx
export function HdbBlock({ hovered }) {
  return <group>{Array.from({ length: 4 }, (_, index) => <mesh key={index} />)}</group>
}

export function FinancialDashboard({ hovered }) {
  return <group>{Array.from({ length: 6 }, (_, index) => <mesh key={index} />)}</group>
}
```

Make the TV a finance workstation with chart, ticker, valuation strips. Add report/notebook/document stack. Dominant surfaces receive existing subtle hover emissive treatment.

- [ ] **Step 5: Compose labels and PortfolioObjects in Room**

Render four `ZoneLabel`s from `phase2Layout.zoneLabels`; render projects/research objects with `Interactable`, compact `SceneMarker` hover labels, and correct data-driven callbacks. Remove replaced generic TV/reports semantics while preserving existing room furniture and cat.

- [ ] **Step 6: Run focused and full verification**

Run: `npm test -- src/data/phase2Layout.test.js src/data/cameraPresets.test.js src/components/scene/Room.test.jsx && npm test && npm run build`

Expected: PASS.

- [ ] **Step 7: Commit projects and research scene**

```bash
git add src/data/phase2Layout.js src/data/phase2Layout.test.js src/data/cameraPresets.js src/data/cameraPresets.test.js src/components/scene/room/ResumeObjects.jsx src/components/scene/Room.jsx
git commit -m "feat: add projects and research resume zones"
```

### Task 4: Experience and School/Life Environmental Storytelling

**Files:**
- Create: `src/components/scene/room/CareerJourney.jsx`
- Create: `src/components/scene/room/SchoolLife.jsx`
- Modify: `src/components/scene/Room.jsx`
- Modify: `src/components/scene/room/Decor.jsx`
- Modify: `src/data/phase2Layout.js`
- Modify: `src/components/scene/Room.test.jsx`

**Interfaces:**
- `CareerJourney` exports clickable primitive `EyMemento`, `ShopeeMemento`, and `UobMemento` bound to `experience` ids.
- `SchoolLife` exports clickable primitive `NusToken`, `Rc4Trophy`, `ScienceClubToken`, and `UclaMemory` bound to `school` ids.

- [ ] **Step 1: Write failing Room composition test**

```jsx
test('maps career and school memorabilia to their direct resume items', () => {
  const elements = descendants(Room({ onSelectZone, onSelectItem, onCatClick: vi.fn(), catReaction: 0 }))
  expect(elements.some((element) => element.props?.label === 'RC4 Flag')).toBe(true)
  expect(elements.some((element) => element.props?.label === 'UOB')).toBe(true)
})
```

- [ ] **Step 2: Run Room test to verify RED**

Run: `npm test -- src/components/scene/Room.test.jsx`

Expected: FAIL because Phase 2 memorabilia is not yet composed.

- [ ] **Step 3: Build the career journey wall**

Create a restrained back-wall timeline with three circles/line segments and a calculator, parcel, and blueprint built from primitives. Use `Interactable` wrappers with data-derived item labels; do not put company descriptions or skill tags in 3D text.

- [ ] **Step 4: Build school/life props**

Use shelf/window anchors for NUS books/token, gold RC4 trophy, science/volunteering token, and UCLA polaroid/camera/travel token. Keep the composition visibly more playful than the professional zones and do not crowd the window.

- [ ] **Step 5: Add the small About frame**

Create one compact framed-card primitive near the desk. Its click invokes the existing informational detail route or a dedicated non-zone About DOM view, but it must not create a fifth label or zone.

- [ ] **Step 6: Compose and verify callbacks**

Render career and school props from `phase2Layout.items`, route callbacks through `onSelectItem`, and retain cat callback isolation. Run: `npm test -- src/components/scene/Room.test.jsx && npm test`

Expected: PASS.

- [ ] **Step 7: Commit experience and school/life scene**

```bash
git add src/components/scene/room/CareerJourney.jsx src/components/scene/room/SchoolLife.jsx src/components/scene/Room.jsx src/components/scene/room/Decor.jsx src/data/phase2Layout.js src/components/scene/Room.test.jsx
git commit -m "feat: add experience and school life zones"
```

### Task 5: Interaction Reduction, Overview Composition, and Acceptance Verification

**Files:**
- Modify: `src/components/scene/SceneMarker.jsx`
- Modify: `src/components/scene/Interactable.jsx`
- Modify: `src/components/scene/CameraController.jsx`
- Modify: `src/style.css`
- Modify: `src/components/ui/Overlay.test.jsx`

**Interfaces:**
- Scene markers show only an object hover/focus label, never permanent tutorial bubbles.
- Zone labels stay subtly readable at overview; item marker labels appear on hover/focus.

- [ ] **Step 1: Write failing interaction tests**

```jsx
test('keeps an item label hidden until hover or keyboard focus', async () => {
  render(<SceneMarker label="HDB Price Prediction" shortLabel="HDB" position={[0, 0, 0]} onSelect={() => {}} />)
  const marker = screen.getByRole('button', { name: 'HDB Price Prediction' })
  expect(marker).not.toHaveClass('is-visible')
  await userEvent.hover(marker)
  expect(marker).toHaveClass('is-visible')
})
```

- [ ] **Step 2: Run focused interaction tests to verify RED where behavior differs**

Run: `npm test -- src/components/scene/SceneMarker.test.jsx src/components/ui/Overlay.test.jsx`

Expected: any new assertion fails until reduced marker/chrome styles are applied.

- [ ] **Step 3: Reduce tutorial-like chrome**

Keep the hideable `Explore my room!` control but remove permanent glowing destination bubbles. Ensure SceneMarker shows a compact label only for hover/focus, zone labels remain visible but quiet, and inactive interactions do not visually compete with the selected object.

- [ ] **Step 4: Retune overview framing if required**

Only adjust `cameraPresets.overview` and its target if a default desktop viewport cannot reasonably reveal desk, timeline wall, research area, and shelves. Preserve all OrbitControls limits and reduced-motion behavior.

- [ ] **Step 5: Verify desktop/mobile acceptance**

Run the local app and inspect default desktop plus 390px/720px layouts using the available in-app browser. Confirm zone labels are readable, panel switcher remains reachable, no horizontal overflow occurs, and selected/back camera transitions re-enable OrbitControls. If no browser is available, document that limitation and rely on automated checks.

- [ ] **Step 6: Run final verification**

Run: `npm test && npm run build && git diff --check`

Expected: all tests PASS, production build succeeds, and no whitespace errors are reported.

- [ ] **Step 7: Commit Phase 2 polish**

```bash
git add src/components/scene/SceneMarker.jsx src/components/scene/Interactable.jsx src/components/scene/CameraController.jsx src/style.css src/components/ui/Overlay.test.jsx
git commit -m "feat: polish phase two resume exploration"
```

## Plan Self-Review

- Spec coverage: Tasks 1-2 implement the zone-first data/state/panel architecture; Tasks 3-4 implement all four environmental zones and About; Task 5 verifies label hierarchy, camera, orbit, and responsive acceptance.
- Constraints: every scene task explicitly retains primitive geometry, existing controls, the cat, and copy/data separation.
- Interfaces: `portfolio` and `phase2Layout` are established before scene consumers; item callback payloads remain `{ zoneId, itemId, cameraPreset }` throughout.
- Placeholder scan: no unassigned requirements or `TODO`/`TBD` placeholders remain.
