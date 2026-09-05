# Immersive Room Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Phase 1 dollhouse as a richer primitive-only immersive room-facing composition inspired by the supplied reference while preserving all portfolio interactions.

**Architecture:** `Room.jsx` remains the scene entry point but delegates procedural geometry to focused modules under `scene/room`. Anchored `SceneMarker` DOM buttons replace the duplicate overlay navigation, while the existing section state, camera controller, content panels, and cat reaction remain intact.

**Tech Stack:** React, Vite, React Three Fiber, Drei `Html`, Three.js, Vitest, Testing Library

**Spec:** `docs/superpowers/specs/2026-09-05-immersive-room-redesign-design.md`

## Global Constraints

- Use only box, plane, and cylinder geometry; no models, textures, environment maps, or post-processing.
- Preserve TV → Frontend, Laptop → Technical, Notice Board → Experience, and Reports → Research mappings.
- Use no top navigation, repeated destination pill row, orbit controls, scroll zoom, or first-person movement.
- Keep all readable labels and portfolio interfaces as React DOM, never Three.js text.
- Keep device pixel ratio capped at 1.5 and use conservative shadows.
- Preserve reduced-motion behavior and the 720px bottom-sheet/camera breakpoint.
- Keep portfolio content out of all scene composition files.

## File Map

- `src/components/scene/Room.jsx`: high-level immersive room composition and callbacks.
- `src/components/scene/SceneMarker.jsx`: reusable Drei `Html` marker button.
- `src/components/scene/SceneMarker.test.jsx`: marker accessibility and callback tests.
- `src/components/scene/room/materials.jsx`: palette and shared flat material helper.
- `src/components/scene/room/RoomShell.jsx`: walls, ceiling, floorboards, window, blind, and door.
- `src/components/scene/room/Furniture.jsx`: desk, office chair, and media console.
- `src/components/scene/room/PortfolioObjects.jsx`: laptop, TV, notice board, and reports.
- `src/components/scene/room/Decor.jsx`: plants, shelves, lamp, mug, books, frame, storage, and cushion.
- `src/components/scene/room/Cat.jsx`: detailed primitive cat and existing reaction animation.
- `src/components/scene/Lighting.jsx`: window-led lighting rig.
- `src/components/ui/Overlay.jsx`: simplified identity card and content panel routing.
- `src/components/ui/Overlay.test.jsx`: verifies duplicate destination navigation is absent.
- `src/data/roomLayout.js`: named anchor positions for procedural groups and marker placement.
- `src/data/roomLayout.test.js`: required-anchor and marker mapping tests.
- `src/data/cameraPresets.js`: immersive overview and retuned destination camera poses.
- `src/data/cameraPresets.test.js`: pose and responsive-contract tests.
- `src/style.css`: immersive chrome, markers, panel layering, and responsive rules.

---

### Task 1: Anchored Accessible Scene Markers

**Files:**
- Create: `src/components/scene/SceneMarker.test.jsx`
- Create: `src/components/scene/SceneMarker.jsx`
- Modify: `src/components/ui/Overlay.test.jsx`
- Modify: `src/components/ui/Overlay.jsx`
- Modify: `src/App.jsx`
- Modify: `src/style.css`

**Interfaces:**
- Produces: `SceneMarker({ label, shortLabel, position, onSelect })`.
- Consumes: Drei `Html` and a selection callback.

- [ ] **Step 1: Write the failing marker behavior test**

Mock `Html` as a passthrough DOM wrapper, render `SceneMarker`, and assert its button has the supplied accessible label, renders the short label, and calls `onSelect` once when clicked.

```jsx
vi.mock('@react-three/drei', () => ({
  Html: ({ children }) => <div>{children}</div>,
}))

test('exposes an anchored destination as a DOM button', async () => {
  const onSelect = vi.fn()
  render(
    <SceneMarker
      label="Frontend projects on TV"
      shortLabel="Projects"
      position={[1, 2, 3]}
      onSelect={onSelect}
    />,
  )
  await userEvent.click(
    screen.getByRole('button', { name: 'Frontend projects on TV' }),
  )
  expect(screen.getByText('Projects')).toBeInTheDocument()
  expect(onSelect).toHaveBeenCalledOnce()
})
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- src/components/scene/SceneMarker.test.jsx`

Expected: FAIL because `SceneMarker.jsx` does not exist.

- [ ] **Step 3: Implement the marker**

Use `<Html center position={position} distanceFactor={9}>`. Render a button with `aria-label={label}`, a decorative dot/leader span, and the visible `shortLabel`. Stop pointer propagation before calling `onSelect`. Set `transform={false}` so CSS text stays crisp.

- [ ] **Step 4: Remove the duplicate overlay navigation**

Delete the visible `destination-nav` markup and `roomDestinations` import from `Overlay`. Remove `onSelect` from the overlay interface and from `App`'s overlay props. Extend `Overlay.test.jsx` to assert `queryByRole('navigation', { name: 'Portfolio destinations' })` is absent in the overview.

- [ ] **Step 5: Style reference-inspired markers**

Add `.scene-marker`, `.marker-dot`, `.marker-leader`, and `.marker-label` styles: compact translucent mauve capsule, white glow dot, short connector, readable white label, visible keyboard focus, and slight hover lift. At `max-width: 480px`, visually hide only `.marker-label` while retaining the accessible button.

- [ ] **Step 6: Run marker and overlay tests**

Run: `npm test -- src/components/scene/SceneMarker.test.jsx src/components/ui/Overlay.test.jsx`

Expected: PASS.

- [ ] **Step 7: Commit the marker architecture**

```bash
git add src/components/scene/SceneMarker.jsx src/components/scene/SceneMarker.test.jsx src/components/ui/Overlay.jsx src/components/ui/Overlay.test.jsx src/App.jsx src/style.css
git commit -m "feat: anchor accessible markers in the room"
```

---

### Task 2: Immersive Layout and Camera Contracts

**Files:**
- Create: `src/data/roomLayout.test.js`
- Create: `src/data/roomLayout.js`
- Modify: `src/data/cameraPresets.test.js`
- Modify: `src/data/cameraPresets.js`

**Interfaces:**
- Produces: `roomLayout`, updated `cameraPresets`, and unchanged responsive helper signatures.
- Consumes: `roomDestinations` identifiers.

- [ ] **Step 1: Write the failing layout contract test**

Assert the layout contains named anchors for `desk`, `chair`, `laptop`, `noticeBoard`, `tv`, `mediaConsole`, `reports`, `cat`, `rug`, `window`, `shelves`, and `door`. Assert each portfolio anchor contains a three-number `position`, a three-number `markerPosition`, and the correct `sectionId` literal.

- [ ] **Step 2: Run the layout test and verify RED**

Run: `npm test -- src/data/roomLayout.test.js`

Expected: FAIL because `roomLayout.js` does not exist.

- [ ] **Step 3: Implement the immersive layout**

Use a `14 × 11` room footprint with the back wall at `z=-5.5`, the window/desk on the left, notice board near center, TV/console on the right, reports at right foreground, and cat/rug in the center-left foreground. Store only transforms, marker positions, and section identifiers; do not store portfolio copy.

- [ ] **Step 4: Update camera tests before presets**

Change the literal expectations to an immersive overview near `[8.8, 5.7, 10.4]` looking near `[0, 2.45, -1.25]`. Require all selected poses to remain inside a distance of 13 world units from their targets, and retain the existing 720px compact-selection tests.

- [ ] **Step 5: Run camera tests and verify RED**

Run: `npm test -- src/data/cameraPresets.test.js`

Expected: FAIL because the current dollhouse poses do not match the immersive contracts.

- [ ] **Step 6: Implement retuned presets**

Set the overview to the tested immersive pose. Aim destination targets at the new layout anchors with selected camera positions that retain surrounding context. Keep `getCameraPreset`, `getResponsiveCameraPosition`, `getResponsiveCameraTarget`, and `hasCameraPreset` public behavior intact.

- [ ] **Step 7: Run layout and camera tests**

Run: `npm test -- src/data/roomLayout.test.js src/data/cameraPresets.test.js`

Expected: PASS.

- [ ] **Step 8: Commit layout contracts**

```bash
git add src/data/roomLayout.js src/data/roomLayout.test.js src/data/cameraPresets.js src/data/cameraPresets.test.js
git commit -m "feat: define immersive room layout and camera poses"
```

---

### Task 3: Procedural Room Shell and Furniture

**Files:**
- Create: `src/components/scene/room/materials.jsx`
- Create: `src/components/scene/room/RoomShell.jsx`
- Create: `src/components/scene/room/Furniture.jsx`
- Modify: `src/components/scene/Room.jsx`

**Interfaces:**
- Produces: `Material`, `palette`, `RoomShell`, `Desk`, `OfficeChair`, and `MediaConsole`.
- Consumes: transforms from `roomLayout`.

- [ ] **Step 1: Extract shared palette and material behavior**

Move the existing palette and `Material` helper into `room/materials.jsx`. Preserve warm emissive hover intensity and flat rough materials. Export both for procedural modules.

- [ ] **Step 2: Build the immersive shell**

Create a back wall, left wall, partial right wall, thin ceiling, baseboards, and warm floor base. Generate fourteen long floorboard strips plus subtle seam boxes. Build the layered window with frame, sill, blind, sky panes, blocky skyline, and foliage silhouettes. Add a simple paneled door on the right wall.

- [ ] **Step 3: Build the detailed desk**

Use a thick top, left frame legs, right drawer pedestal, three drawer fronts, muted metal handles, and a rear cable lip. Keep enough clear top surface for the laptop, books, mug, lamp, and plant.

- [ ] **Step 4: Build the procedural office chair**

Use layered boxes for the seat and back, two support posts, a central cylinder lift, five rotated box spokes, and five cylinder wheels. Rotate the chair slightly toward the laptop.

- [ ] **Step 5: Build the media console**

Create a wide cabinet with outer carcass, two doors, two drawers, open device shelves, handles, and simple electronics. Keep the top visually quiet beneath the TV.

- [ ] **Step 6: Recompose `Room.jsx` with layout anchors**

Replace local shell/furniture implementations with imported procedural components positioned from `roomLayout`. Leave portfolio interactions temporarily using current object implementations so the scene remains buildable between tasks.

- [ ] **Step 7: Run all tests and production build**

Run: `npm test && npm run build`

Expected: all tests PASS and build succeeds.

- [ ] **Step 8: Commit shell and furniture**

```bash
git add src/components/scene/Room.jsx src/components/scene/room
git commit -m "feat: build immersive shell and procedural furniture"
```

---

### Task 4: Detailed Portfolio Objects, Decor, and Cat

**Files:**
- Create: `src/components/scene/room/PortfolioObjects.jsx`
- Create: `src/components/scene/room/Decor.jsx`
- Create: `src/components/scene/room/Cat.jsx`
- Modify: `src/components/scene/Room.jsx`
- Modify: `src/components/scene/Lighting.jsx`

**Interfaces:**
- Produces: detailed `Laptop`, `Tv`, `NoticeBoard`, `Reports`, `Decor`, and `Cat` components.
- Consumes: `hovered`, `reaction`, room layout transforms, and shared materials.

- [ ] **Step 1: Build detailed portfolio objects**

Move each destination to `PortfolioObjects.jsx`. Add laptop keyboard rows and screen bezel; TV inset, four colorful project tiles, and status row; notice-board frame, pins, layered notes, and landscape card; three reports with covers, page blocks, spines, and cream labels. Keep hover emissive state visible on the dominant surface of each object.

- [ ] **Step 2: Attach markers and interactions**

In `Room.jsx`, wrap each object in `Interactable` and add a sibling `SceneMarker` using the anchor's `markerPosition`. Mesh and marker clicks must call the same `onSelect(sectionId)` callback.

- [ ] **Step 3: Build the richer decor module**

Add two floating shelves, upright shelf books, a trailing plant, desk lamp, mug, desk book stack, small frame, two console plants, storage boxes, and a floor cushion. Use array-generated rotated box leaves and keep decor outside interaction hit areas.

- [ ] **Step 4: Rebuild the cat silhouette**

Move cat behavior to `Cat.jsx` and preserve `getCatReactionPose`. Add layered torso/head boxes, muzzle, nose, eyes, ears, four cylinder paws, and a segmented striped tail. Keep click reaction and reduced-motion behavior unchanged.

- [ ] **Step 5: Retune lighting**

Move the warm directional key toward the left window, broaden its shadow camera for the larger floor, keep 1024 shadow maps, soften hemisphere fill, and retain a low-intensity desk lamp point light. Avoid adding more shadow-casting lights.

- [ ] **Step 6: Run interaction and regression tests**

Run: `npm test -- src/components/scene/SceneMarker.test.jsx src/components/scene/Interactable.test.jsx src/components/scene/catAnimation.test.js && npm test`

Expected: all tests PASS.

- [ ] **Step 7: Commit detailed scene objects**

```bash
git add src/components/scene/Room.jsx src/components/scene/Lighting.jsx src/components/scene/room
git commit -m "feat: add detailed room objects and decor"
```

---

### Task 5: Immersive Styling and Visual Verification

**Files:**
- Modify: `src/style.css`

**Interfaces:**
- Consumes: marker, overlay, and responsive class names.
- Produces: final immersive composition and UI polish.

- [ ] **Step 1: Refine overlay hierarchy**

Reduce the brand card to a compact translucent identity plate, keep the interaction hint, remove unused destination-nav styles, and ensure the room stays visible beneath desktop panels. Preserve the existing bottom-sheet layout.

- [ ] **Step 2: Refine marker and panel layering**

Ensure scene markers sit above Canvas but below open content panels, remain clickable through the pointer-transparent overlay, and do not collide with the brand card at desktop or mobile widths.

- [ ] **Step 3: Start the local app**

Run: `npm run dev -- --host 127.0.0.1`

- [ ] **Step 4: Verify the reference-facing desktop composition**

At approximately `1580 × 1060`, confirm the room fills the viewport; window/desk, notice board, TV/console, reports, rug, cat, and right wall/door form the intended hierarchy; warm window light reads clearly; and no marker overlaps another object label.

- [ ] **Step 5: Verify all interactions**

Hover and click all four meshes and marker buttons. Confirm glow, pointer cursor, correct camera transition, correct HTML panel, and Back return. Click the cat repeatedly and confirm its animation/toast restart without opening a section.

- [ ] **Step 6: Verify responsive layouts**

At `390 × 844`, `720 × 500`, and a desktop width, confirm overview framing, selected target placement above the bottom sheet, marker accessibility, panel scrolling, and absence of horizontal overflow.

- [ ] **Step 7: Run final verification**

Run: `npm test && npm run build && git diff --check`

Expected: all tests PASS, build succeeds without warnings, and Git reports no whitespace errors.

- [ ] **Step 8: Commit the polished redesign**

```bash
git add src/style.css
git commit -m "feat: polish immersive room presentation"
```
