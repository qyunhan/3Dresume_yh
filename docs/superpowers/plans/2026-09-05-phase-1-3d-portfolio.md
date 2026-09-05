# Phase 1 Interactive 3D Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Vite starter with a responsive open-front 3D dollhouse portfolio featuring four camera-driven destinations, HTML content panels, and a playful cat interaction.

**Architecture:** `App` owns selection and cat-reaction state while the React Three Fiber scene and DOM overlay remain siblings. Scene components expose callbacks, reusable camera presets connect section state to damped camera motion, and structured portfolio records remain in the data layer.

**Tech Stack:** React, Vite, React Three Fiber, Drei, Three.js, Vitest, Testing Library

**Spec:** `docs/superpowers/specs/2026-09-05-phase-1-3d-portfolio-design.md`

## Global Constraints

- Build every room object from boxes, planes, and cylinders; use no imported 3D models.
- Use no textures, physics, post-processing, audio, or first-person controls.
- Keep portfolio descriptions out of `src/components/scene/Room.jsx`.
- Render every portfolio interface as normal React HTML outside the WebGL canvas.
- Limit camera input to damped preset transitions and subtle overview parallax.
- Respect reduced-motion preferences and cap canvas DPR at 1.5.
- Preserve a minimal muted-lavender, warm-wood, cream, white, and warm-light palette.

## File Map

- `src/main.jsx`: React entry point.
- `src/App.jsx`: top-level selection and cat-reaction state; Canvas/Overlay composition.
- `src/App.test.jsx`: state integration tests with the WebGL scene stubbed.
- `src/components/scene/Room.jsx`: primitive room and prop callbacks only.
- `src/components/scene/CameraController.jsx`: camera preset resolution, damping, and overview parallax.
- `src/components/scene/Lighting.jsx`: ambient, hemisphere, key, and fill lights.
- `src/components/scene/Interactable.jsx`: shared hover/click/pointer behavior.
- `src/components/ui/Overlay.jsx`: DOM chrome, panel routing, Back button, and cat message.
- `src/components/ui/Overlay.test.jsx`: panel routing and control behavior.
- `src/components/ui/ProjectsPanel.jsx`: frontend and technical project cards.
- `src/components/ui/ExperiencePanel.jsx`: About / Experience presentation.
- `src/components/ui/ReportsPanel.jsx`: report cards.
- `src/data/projects.js`: all placeholder portfolio records and section metadata.
- `src/data/roomDestinations.js`: scene destination labels and section identifiers consumed by the room.
- `src/data/cameraPresets.js`: preset tuples plus safe preset resolver.
- `src/data/cameraPresets.test.js`: complete mapping and fallback tests.
- `src/style.css`: full-screen scene and responsive overlay styling.
- `index.html`: document metadata and React mount node.
- `vite.config.js`: React plugin and Vitest jsdom configuration.
- `src/test/setup.js`: Testing Library matchers and cleanup.

---

### Task 1: React and Test Foundation

**Files:**
- Modify: `package.json`
- Create: `vite.config.js`
- Create: `src/test/setup.js`
- Create: `src/main.jsx`
- Create: `src/App.test.jsx`
- Create: `src/App.jsx`
- Modify: `index.html`
- Delete after replacement: `src/main.js`, `src/counter.js`

**Interfaces:**
- Produces: default `App` React component and a `#root` DOM mount.
- Consumes: none.

- [ ] **Step 1: Install runtime and test dependencies**

Run:

```bash
npm install react react-dom three @react-three/fiber @react-three/drei
npm install -D @vitejs/plugin-react vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Add `"test": "vitest run"` and `"test:watch": "vitest"` to `package.json` scripts.

- [ ] **Step 2: Configure Vite and the test environment**

Create `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
})
```

Create `src/test/setup.js`:

```js
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(cleanup)
```

- [ ] **Step 3: Write the failing application smoke test**

```jsx
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import App from './App'

vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => <div data-testid="canvas">{children}</div>,
}))
vi.mock('./components/scene/Room', () => ({ default: () => null }))
vi.mock('./components/scene/CameraController', () => ({ default: () => null }))
vi.mock('./components/scene/Lighting', () => ({ default: () => null }))

test('renders the room canvas and portfolio heading', () => {
  render(<App />)
  expect(screen.getByTestId('canvas')).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /a room full of ideas/i })).toBeInTheDocument()
})
```

- [ ] **Step 4: Run the test and verify RED**

Run: `npm test -- src/App.test.jsx`

Expected: FAIL because `src/App.jsx` does not exist.

- [ ] **Step 5: Create the smallest React shell**

Create `src/App.jsx` with a `<Canvas data-testid="canvas" />` sibling to `<h1>A room full of ideas</h1>`; the dedicated overlay replaces this heading in Task 3. Create `src/main.jsx` using `createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)`. Update `index.html` to use `<div id="root"></div>`, `/src/main.jsx`, the title `A Room Full of Ideas`, and a matching description meta tag.

- [ ] **Step 6: Run the focused test and production build**

Run: `npm test -- src/App.test.jsx && npm run build`

Expected: PASS and a successful Vite build.

- [ ] **Step 7: Commit the foundation**

```bash
git add package.json package-lock.json vite.config.js index.html src/main.jsx src/App.jsx src/App.test.jsx src/test/setup.js src/main.js src/counter.js
git commit -m "chore: set up React 3D portfolio foundation"
```

If the workspace is still not a Git repository, record the checkpoint without running the Git commands.

---

### Task 2: Portfolio Data and Camera Presets

**Files:**
- Create: `src/data/projects.js`
- Create: `src/data/cameraPresets.js`
- Create: `src/data/cameraPresets.test.js`

**Interfaces:**
- Produces: `SECTION_IDS`, `sectionContent`, `cameraPresets`, and `getCameraPreset(sectionId)`.
- Consumes: none.

- [ ] **Step 1: Write failing preset-contract tests**

```js
import { describe, expect, test } from 'vitest'
import { SECTION_IDS } from './projects'
import { cameraPresets, getCameraPreset } from './cameraPresets'

describe('camera presets', () => {
  test.each(SECTION_IDS)('%s has a complete camera pose', (sectionId) => {
    expect(cameraPresets[sectionId].position).toHaveLength(3)
    expect(cameraPresets[sectionId].target).toHaveLength(3)
  })

  test('unknown sections return the overview pose', () => {
    expect(getCameraPreset('missing')).toBe(cameraPresets.overview)
    expect(getCameraPreset(null)).toBe(cameraPresets.overview)
  })
})
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- src/data/cameraPresets.test.js`

Expected: FAIL because the data modules do not exist.

- [ ] **Step 3: Implement structured section content**

Export:

```js
export const SECTION_IDS = ['frontend', 'technical', 'experience', 'reports']

export const sectionContent = {
  frontend: {
    eyebrow: 'Selected work',
    title: 'Frontend Projects',
    intro: 'Interfaces shaped around clarity, motion, and small human details.',
    items: [
      { title: 'Soft Focus', summary: 'A calm planning interface for creative routines.', tags: ['React', 'Motion'] },
      { title: 'Field Notes', summary: 'An editorial archive for places and observations.', tags: ['Design systems', 'Accessibility'] },
    ],
  },
  technical: {
    eyebrow: 'Under the hood',
    title: 'Technical Projects',
    intro: 'Systems, prototypes, and experiments built to make complex things feel simple.',
    items: [
      { title: 'Signal Garden', summary: 'A live data experiment with a spatial interface.', tags: ['WebGL', 'Data'] },
      { title: 'Tiny Tools', summary: 'Focused utilities for repetitive creative workflows.', tags: ['TypeScript', 'APIs'] },
    ],
  },
  experience: {
    eyebrow: 'About & experience',
    title: 'Curious by design',
    intro: 'I work where thoughtful interfaces meet reliable engineering.',
    timeline: [
      { period: 'Now', role: 'Product Engineer', detail: 'Designing and building useful, expressive digital products.' },
      { period: 'Before', role: 'Creative Technologist', detail: 'Prototyping new interactions across design and code.' },
    ],
  },
  reports: {
    eyebrow: 'Research archive',
    title: 'Reports & Writing',
    intro: 'A small shelf of investigations, findings, and documented decisions.',
    items: [
      { title: 'Designing for Calm', summary: 'Patterns that lower interface noise.', meta: 'Field report · 08 min' },
      { title: 'Rooms as Interfaces', summary: 'Using spatial memory to organize content.', meta: 'Research note · 06 min' },
      { title: 'Motion with Restraint', summary: 'A practical guide to purposeful transitions.', meta: 'Technical report · 10 min' },
    ],
  },
}
```

No scene component imports this module.

- [ ] **Step 4: Implement exact camera presets and resolver**

```js
export const cameraPresets = {
  overview: { position: [10.5, 8.2, 12.5], target: [0, 2.2, 0] },
  frontend: { position: [7.4, 5.1, 7.2], target: [3.05, 3.45, -3.8] },
  technical: { position: [4.6, 4.3, 7.4], target: [-1.7, 2.65, -3.4] },
  experience: { position: [7.3, 5.3, 6.5], target: [0.5, 3.65, -3.82] },
  reports: { position: [6.8, 4.0, 6.7], target: [2.1, 1.7, -2.5] },
}

export function getCameraPreset(sectionId) {
  return cameraPresets[sectionId] ?? cameraPresets.overview
}
```

- [ ] **Step 5: Run the data tests**

Run: `npm test -- src/data/cameraPresets.test.js`

Expected: PASS.

- [ ] **Step 6: Commit the data contracts**

```bash
git add src/data
git commit -m "feat: add portfolio data and camera presets"
```

---

### Task 3: Accessible HTML Overlay

**Files:**
- Create: `src/components/ui/Overlay.test.jsx`
- Create: `src/components/ui/ProjectsPanel.jsx`
- Create: `src/components/ui/ExperiencePanel.jsx`
- Create: `src/components/ui/ReportsPanel.jsx`
- Create: `src/components/ui/Overlay.jsx`

**Interfaces:**
- Consumes: `sectionContent`, `selectedSection`, `onBack`, and `catReaction`.
- Produces: `Overlay({ selectedSection, onBack, catReaction })`.

- [ ] **Step 1: Write failing overlay routing tests**

```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import Overlay from './Overlay'

test.each([
  ['frontend', 'Frontend Projects'],
  ['technical', 'Technical Projects'],
  ['experience', 'Curious by design'],
  ['reports', 'Reports & Writing'],
])('routes %s to its content panel', (section, heading) => {
  render(<Overlay selectedSection={section} onBack={() => {}} catReaction={0} />)
  expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
})

test('Back requests clearing the section', async () => {
  const onBack = vi.fn()
  render(<Overlay selectedSection="frontend" onBack={onBack} catReaction={0} />)
  await userEvent.click(screen.getByRole('button', { name: /back to room/i }))
  expect(onBack).toHaveBeenCalledOnce()
})

test('an unknown selection renders no panel', () => {
  render(<Overlay selectedSection="unknown" onBack={() => {}} catReaction={0} />)
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
```

- [ ] **Step 2: Run the overlay tests and verify RED**

Run: `npm test -- src/components/ui/Overlay.test.jsx`

Expected: FAIL because the overlay modules do not exist.

- [ ] **Step 3: Build the specialized panels**

Each panel accepts a `content` prop, renders the content title and intro, and maps its records into semantic `<article>` or timeline markup. `ProjectsPanel` handles both project sections; `ExperiencePanel` renders the timeline; `ReportsPanel` renders all three report records. When an items/timeline array is empty, render `More work is being prepared for this shelf.`

- [ ] **Step 4: Build overlay routing and controls**

`Overlay` always renders the brand block with heading `A room full of ideas` and hint `Explore the glowing objects`. For a valid selection, render a `<section role="dialog" aria-modal="false">`, the appropriate panel, and a button labeled `Back to room`. Render a keyed `The curator is awake.` cat toast only when `catReaction > 0`. Invalid section identifiers render neither dialog nor Back button.

- [ ] **Step 5: Run the overlay tests**

Run: `npm test -- src/components/ui/Overlay.test.jsx`

Expected: PASS.

- [ ] **Step 6: Commit the overlay**

```bash
git add src/components/ui
git commit -m "feat: add portfolio HTML overlays"
```

---

### Task 4: Shared Interaction and Camera Motion

**Files:**
- Create: `src/components/scene/Interactable.jsx`
- Create: `src/components/scene/CameraController.jsx`
- Create: `src/components/scene/Lighting.jsx`

**Interfaces:**
- Consumes: `getCameraPreset`, React Three Fiber pointer state, `selectedSection`, and group children.
- Produces: `Interactable({ label, onClick, children })`, `CameraController({ selectedSection })`, and `Lighting()`.

- [ ] **Step 1: Add a failing cursor cleanup test**

```jsx
import { fireEvent, render } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import Interactable from './Interactable'

test('sets and restores the pointer cursor', () => {
  const onClick = vi.fn()
  const { container, unmount } = render(
    <Interactable label="Test object" onClick={onClick}>
      {(hovered) => <span>{hovered ? 'hot' : 'cold'}</span>}
    </Interactable>,
  )
  const group = container.querySelector('group')
  fireEvent.pointerEnter(group)
  expect(document.body.style.cursor).toBe('pointer')
  fireEvent.click(group)
  expect(onClick).toHaveBeenCalledOnce()
  unmount()
  expect(document.body.style.cursor).toBe('auto')
})
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- src/components/scene/Interactable.test.jsx`

Expected: FAIL because `Interactable.jsx` does not exist.

- [ ] **Step 3: Implement shared interaction behavior**

Use local `hovered` state. On pointer enter, stop propagation and set hover; on pointer leave, clear it; on click, stop propagation and call `onClick`. Use an effect to set `document.body.style.cursor = hovered ? 'pointer' : 'auto'` and restore `auto` during cleanup. Invoke `children(hovered)` so every destination controls its own emissive materials. Set the group name from `label` for scene inspection.

- [ ] **Step 4: Implement damped camera presets**

In `CameraController`, keep target vectors in refs and resolve the active pose with `getCameraPreset(selectedSection)`. In `useFrame((state, delta) => ...)`, use `MathUtils.damp` on all three camera coordinates and all three look-at target coordinates. Add pointer offsets capped near `0.35` world units only when `selectedSection` is falsy. Call `camera.lookAt(dampedTarget)` each frame. Read `prefers-reduced-motion` once and use a higher damping coefficient when it is true.

- [ ] **Step 5: Implement restrained lighting**

Return ambient intensity around `0.7`, a lavender-tinted hemisphere light, and one warm shadow-casting directional light with a compact shadow map. Add one low-intensity point light near the desk for warmth.

- [ ] **Step 6: Run focused and complete tests**

Run: `npm test -- src/components/scene/Interactable.test.jsx && npm test`

Expected: all tests PASS.

- [ ] **Step 7: Commit scene infrastructure**

```bash
git add src/components/scene/Interactable.jsx src/components/scene/Interactable.test.jsx src/components/scene/CameraController.jsx src/components/scene/Lighting.jsx
git commit -m "feat: add scene interaction and camera controls"
```

---

### Task 5: Primitive Dollhouse Room

**Files:**
- Create: `src/components/scene/Room.jsx`
- Create: `src/data/roomDestinations.js`
- Create: `src/data/roomDestinations.test.js`

**Interfaces:**
- Consumes: `onSelect(sectionId)`, `onCatClick()`, and `catReaction`.
- Produces: `roomDestinations` plus a primitive-only room with clickable TV, laptop, notice board, report group, and cat.

- [ ] **Step 1: Write a failing destination-contract test**

```js
import { expect, test } from 'vitest'
import { roomDestinations } from './roomDestinations'

test('maps every room destination to its intended section', () => {
  expect(roomDestinations).toEqual({
    tv: { label: 'Frontend projects on TV', sectionId: 'frontend' },
    laptop: { label: 'Technical projects on laptop', sectionId: 'technical' },
    noticeBoard: { label: 'About and experience on notice board', sectionId: 'experience' },
    reports: { label: 'Research and reports on books', sectionId: 'reports' },
  })
})
```

- [ ] **Step 2: Run the destination test and verify RED**

Run: `npm test -- src/data/roomDestinations.test.js`

Expected: FAIL because `roomDestinations.js` does not exist.

- [ ] **Step 3: Implement the destination contract**

Export the exact literal from the failing test as `roomDestinations`. `Room.jsx` must consume its labels and `sectionId` values when configuring the four `Interactable` groups; portfolio descriptions remain in `projects.js` and never enter the scene module.

- [ ] **Step 4: Compose the shell and anchor furniture**

Create focused local JSX helpers inside `Room.jsx` for `RoomShell`, `Desk`, `Chair`, `Window`, `Rug`, `FloatingShelves`, and `Decor`. Use only `boxGeometry`, `planeGeometry`, and `cylinderGeometry`. Arrange the shell around a `12 x 10` floor, place the desk on the back-left, TV on the back-right, window and notice board between anchors, and rug/chair centrally. Enable shadows only on the floor and prominent furniture.

- [ ] **Step 5: Add the four portfolio destinations**

Wrap each destination in `Interactable`:

```jsx
<Interactable label={roomDestinations.tv.label} onClick={() => onSelect(roomDestinations.tv.sectionId)}>
  {(hovered) => <Tv hovered={hovered} />}
</Interactable>
```

Repeat with `technical` for the laptop, `experience` for the notice board, and one parent group using `reports` for all three books. Give interactive materials `emissive="#fff0cf"` and switch `emissiveIntensity` between `0` and approximately `0.18`.

- [ ] **Step 6: Add the animated placeholder cat**

Create the cat from a box torso/head, cylinder legs/tail, and tiny box ears. Track its group ref. When `catReaction` changes above zero, record a reaction start time. In `useFrame`, apply a decaying vertical hop and short side-to-side rotation for about `0.8s`; skip bounce when reduced motion is active. Wrap it in `Interactable` and call `onCatClick`.

- [ ] **Step 7: Add sparse decorative primitives**

Add two floating shelves and no more than six small decor clusters: a cylinder vase, simple plant, desk lamp, two storage boxes, and one small frame. Keep walking/view corridors visually open.

- [ ] **Step 8: Run the destination test and production build**

Run: `npm test -- src/data/roomDestinations.test.js && npm run build`

Expected: PASS and a successful Vite build.

- [ ] **Step 9: Commit the room**

```bash
git add src/components/scene/Room.jsx src/data/roomDestinations.js src/data/roomDestinations.test.js
git commit -m "feat: build primitive dollhouse room"
```

---

### Task 6: Integration, Styling, and Browser Verification

**Files:**
- Modify: `src/App.test.jsx`
- Modify: `src/App.jsx`
- Replace: `src/style.css`

**Interfaces:**
- Consumes: all scene and overlay components.
- Produces: completed responsive Phase 1 experience.

- [ ] **Step 1: Extend the failing App state tests**

Mock `Room` with buttons that call `onSelect('frontend')` and `onCatClick()`. Mock `Overlay` with buttons that call `onBack` and expose `selectedSection`/`catReaction`. Assert clicking the TV stub selects `frontend`, clicking Back clears it, and clicking the cat increments the reaction token.

- [ ] **Step 2: Run the App test and verify RED**

Run: `npm test -- src/App.test.jsx`

Expected: FAIL because `App` does not yet connect callbacks and state.

- [ ] **Step 3: Wire application state**

In `App`, create `selectedSection` initialized to `null` and `catReaction` initialized to `0`. Pass selection to both `CameraController` and `Overlay`, pass `setSelectedSection` to `Room`, increment cat reaction from the room callback, and pass `() => setSelectedSection(null)` as `onBack`. Configure Canvas with the overview camera, `dpr={[1, 1.5]}`, shadows, and `gl={{ antialias: true, alpha: false }}`.

- [ ] **Step 4: Run the App and full test suites**

Run: `npm test -- src/App.test.jsx && npm test`

Expected: all tests PASS.

- [ ] **Step 5: Implement the complete visual system**

Replace `src/style.css` with full-viewport layout and palette variables. Style the canvas as an absolute inset layer; use a pointer-transparent overlay root; place the brand card top-left and the glassy section dialog on the right; keep interactive controls pointer-enabled. Add a bottom-sheet breakpoint below `720px`, visible keyboard focus rings, safe-area padding, compact project cards, and reduced-motion rules.

- [ ] **Step 6: Start the app for browser verification**

Run: `npm run dev -- --host 127.0.0.1`

Verify at desktop and narrow mobile widths:

- The whole open-front dollhouse is visible on initial load.
- All twelve required scene-content categories are present without clutter.
- TV, laptop, notice board, and reports glow subtly and show a pointer cursor on hover.
- Each click reaches the correct camera preset and HTML panel.
- Back returns to the overview and removes the panel.
- Cat clicks replay the animation and toast without changing the selected section.
- Pointer movement causes only slight overview parallax; no orbit or first-person navigation is possible.
- Browser console contains no runtime errors or React warnings.

- [ ] **Step 7: Run final automated verification**

Run: `npm test && npm run build`

Expected: all tests PASS and the production build completes successfully.

- [ ] **Step 8: Commit the finished Phase 1 build**

```bash
git add src/App.jsx src/App.test.jsx src/style.css
git commit -m "feat: complete interactive room portfolio phase one"
```

If Git remains unavailable, provide the user with the verified working tree and note that commits were not created.
