# Phase 2.5 Visual Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the existing procedural 3D resume room feel like a cozy low-poly interior while preserving its information architecture and interactions.

**Architecture:** Keep `Room.jsx` as the composition root. Add a focused low-poly prop kit under `scene/room`, then compose it into existing furniture, project, career, school, decor, and shell modules. Camera and lighting retain their existing public props and state contracts.

**Tech Stack:** React 19, Vite 8, React Three Fiber, Drei, Three.js, Vitest.

**Spec:** `docs/superpowers/specs/2026-09-07-phase-2-5-visual-polish-design.md`

## Global Constraints

- Preserve active-zone and selected-item interactions, detail panels, camera presets, OrbitControls, and cat click behavior.
- Use procedural primitive geometry and current dependencies only; no Blender assets, texture maps, physics, post-processing, or external 3D libraries.
- Keep matte pastel `MeshStandardMaterial` styling, with limited emissive monitor surfaces and restrained trophy metalness.
- Keep geometry low-poly, corners visually populated, and the center visually quiet.
- The production build must work at GitHub Pages base path `/3Dresume_yh/`.

---

### Task 1: Establish camera and room-shell polish contracts

**Files:**
- Modify: `src/data/cameraPresets.js`
- Modify: `src/components/scene/room/RoomShell.jsx`
- Modify: `src/data/cameraPresets.test.js`
- Modify: `src/data/roomLayout.test.js`

**Interfaces:**
- Consumes: existing `getCameraPreset`, responsive preset helpers, and `roomLayout.room`.
- Produces: a lower home composition and taller wall/floor shell without changing the helper signatures.

- [ ] **Step 1: Write failing camera tests**

```js
expect(getCameraPreset(null).position[1]).toBeLessThan(5.7)
expect(getCameraPreset(null).fov).toBeGreaterThanOrEqual(35)
expect(getCameraPreset(null).fov).toBeLessThanOrEqual(45)
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `npm test -- src/data/cameraPresets.test.js`

Expected: FAIL because the home camera remains at its previous higher position or has no polished FOV.

- [ ] **Step 3: Implement the smallest camera and shell changes**

```js
// Keep the public preset shape intact.
home: { position: [8.8, 4.65, 11.3], target: [0, 2.45, -3.2], fov: 40 }
```

Extend wall height beyond the normal frame and make the floor box deeper toward the open side. Retain existing room anchors and wall-facing window and door transforms.

- [ ] **Step 4: Run focused camera and room-layout tests**

Run: `npm test -- src/data/cameraPresets.test.js src/data/roomLayout.test.js`

Expected: PASS.

- [ ] **Step 5: Commit the independently verified camera/shell polish**

```bash
git add src/data/cameraPresets.js src/data/cameraPresets.test.js src/components/scene/room/RoomShell.jsx src/data/roomLayout.test.js
git commit -m "feat: refine immersive room framing"
```

### Task 2: Add reusable low-poly décor primitives

**Files:**
- Create: `src/components/scene/room/LowPolyProps.jsx`
- Create: `src/components/scene/room/LowPolyProps.test.jsx`

**Interfaces:**
- Produces: `StackedBooks`, `LowPolyPlant`, `WallPlaque`, `PhotoFrame`, `Trophy`, `DeskLamp`, `FloorPouf` React components.
- Consumes: `Material` and `palette` from `materials.jsx`; every component accepts a normal group transform through `...props`.

- [ ] **Step 1: Write failing component-contract tests**

```jsx
expect(StackedBooks({ count: 3 }).props.children).toHaveLength(3)
expect(LowPolyPlant({}).type).toBe('group')
expect(WallPlaque({ title: 'HDB' }).type).toBe('group')
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `npm test -- src/components/scene/room/LowPolyProps.test.jsx`

Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement the primitive kit**

```jsx
export function StackedBooks({ count = 3, colors = [palette.blush, palette.sage, palette.lavenderShadow], ...props }) {
  return <group {...props}>{Array.from({ length: count }, (_, index) => <Book key={index} index={index} color={colors[index % colors.length]} />)}</group>
}
```

Use boxes and low-segment cylinders for books, foliage, plaques, frames, trophy, lamp, and pouf. Each mesh casts and receives shadows; screens/lamp bulbs may use modest emissive properties.

- [ ] **Step 4: Run the focused prop-kit tests**

Run: `npm test -- src/components/scene/room/LowPolyProps.test.jsx`

Expected: PASS.

- [ ] **Step 5: Commit the reusable prop kit**

```bash
git add src/components/scene/room/LowPolyProps.jsx src/components/scene/room/LowPolyProps.test.jsx
git commit -m "feat: add reusable low poly decor kit"
```

### Task 3: Polish projects and research composition

**Files:**
- Modify: `src/components/scene/room/Furniture.jsx`
- Modify: `src/components/scene/room/ResumeObjects.jsx`
- Modify: `src/components/scene/room/PortfolioObjects.jsx`
- Modify: `src/components/scene/room/Decor.jsx`
- Modify: `src/components/scene/Room.test.jsx`

**Interfaces:**
- Consumes: Task 2 prop exports and current hover boolean props.
- Produces: richer desk and research visuals while retaining `FinancialDashboard`, `WeatherStation`, `HdbBlock`, and `EquityResearchStation` names and their click anchors.

- [ ] **Step 1: Write failing composition tests**

```jsx
const tree = descendants(Room({ onSelectZone, onSelectItem, onCatClick: vi.fn(), catReaction: 0 }))
expect(tree.some((node) => node.type?.name === 'FloorPouf')).toBe(true)
expect(tree.some((node) => node.type?.name === 'DeskLamp')).toBe(true)
```

- [ ] **Step 2: Run the focused room test to verify it fails**

Run: `npm test -- src/components/scene/Room.test.jsx`

Expected: FAIL because the new props are not composed into the room.

- [ ] **Step 3: Implement desk and research visual details**

Use the existing project anchors for HDB, weather, and finance. Enrich them with windowed HDB geometry, cloud/sun geometry, a compact finance monitor with line and bar meshes, plaques, desk books, pen cup, plant, and lamp. Make the TV/research station use chart and metric bars, stacked reports, notebook, lamp, and plant.

- [ ] **Step 4: Run focused scene tests**

Run: `npm test -- src/components/scene/Room.test.jsx src/components/scene/room/Decor.test.jsx`

Expected: PASS.

- [ ] **Step 5: Commit the projects/research polish**

```bash
git add src/components/scene/room/Furniture.jsx src/components/scene/room/ResumeObjects.jsx src/components/scene/room/PortfolioObjects.jsx src/components/scene/room/Decor.jsx src/components/scene/Room.test.jsx
git commit -m "feat: enrich projects and research zones"
```

### Task 4: Polish career, school, center, and window storytelling

**Files:**
- Modify: `src/components/scene/room/CareerJourney.jsx`
- Modify: `src/components/scene/room/SchoolLife.jsx`
- Modify: `src/components/scene/room/RoomShell.jsx`
- Modify: `src/components/scene/Room.jsx`
- Modify: `src/components/scene/Room.test.jsx`

**Interfaces:**
- Consumes: Task 2 prop kit and existing experience/school object component names.
- Produces: timeline panel, warmer shelf memorabilia, sunset window, foliage, and purple floor pouf without modifying item IDs or handlers.

- [ ] **Step 1: Write failing visual-structure tests**

```jsx
expect(descendants(CareerJourney()).some((node) => node.type?.name === 'WallPlaque')).toBe(true)
expect(descendants(SchoolLife()).some((node) => node.type?.name === 'PhotoFrame')).toBe(true)
```

- [ ] **Step 2: Run focused tests to verify they fail**

Run: `npm test -- src/components/scene/Room.test.jsx src/components/scene/room/Decor.test.jsx`

Expected: FAIL because career and school modules do not yet compose the kit.

- [ ] **Step 3: Implement visual storytelling details**

Build a shallow career-panel timeline with calculator, orange parcel, and blueprint motifs. Add NUS books/plaque, trophy, tilted UCLA photo frames plus camera/plane, a heart/flag, and shelf foliage. Give the window simple blind slats and layered sunset, skyline, and tree geometry. Place a purple pouf on the existing rug away from cat movement.

- [ ] **Step 4: Run focused scene tests**

Run: `npm test -- src/components/scene/Room.test.jsx src/components/scene/room/Decor.test.jsx`

Expected: PASS.

- [ ] **Step 5: Commit career, school, and environment polish**

```bash
git add src/components/scene/room/CareerJourney.jsx src/components/scene/room/SchoolLife.jsx src/components/scene/room/RoomShell.jsx src/components/scene/Room.jsx src/components/scene/Room.test.jsx
git commit -m "feat: polish career school and room storytelling"
```

### Task 5: Improve warm lighting and ship verification

**Files:**
- Modify: `src/components/scene/Lighting.jsx`
- Modify: `src/components/scene/Lighting.jsx` (add test only if a lighting test harness is present)

**Interfaces:**
- Consumes: `roomLayout` desk and media-console anchors.
- Produces: ambient/hemisphere fill, one warm shadowed sun, desk/research practical lights, and a performance-conscious shadow setup.

- [ ] **Step 1: Write a failing lighting contract test**

```jsx
const tree = descendants(Lighting())
expect(tree.filter((node) => node.type === 'pointLight')).toHaveLength(2)
expect(tree.find((node) => node.type === 'directionalLight').props.castShadow).toBe(true)
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `npm test -- src/components/scene/Lighting.test.jsx`

Expected: FAIL because there is only one practical light or no test module.

- [ ] **Step 3: Implement and retain restrained lighting**

Add the research practical; tune ambient, hemisphere, and directional warm sun only. Retain a 1024 shadow map and no post-processing. Place low-opacity geometric floor-light meshes in composition modules if needed for the diagonal patch.

- [ ] **Step 4: Run all automated verification**

Run: `npm test && GITHUB_ACTIONS=true npm run build && git diff --check`

Expected: all tests PASS, build exits 0, and no whitespace errors. The existing bundle-size warning is non-blocking.

- [ ] **Step 5: Commit the lighting and validation-ready polish**

```bash
git add src/components/scene/Lighting.jsx src/components/scene/Lighting.test.jsx
git commit -m "feat: warm low poly room lighting"
```
