# Phase 1 Interactive 3D Portfolio Design

## Purpose

Build a responsive, open-front isometric dollhouse room that validates the portfolio's visual composition, section navigation, camera transitions, and HTML-overlay architecture. Phase 1 uses only low-poly primitive geometry and placeholder portfolio content.

## Experience

The site opens on a full-screen miniature room from a slightly elevated three-quarter angle. The front and ceiling are absent, while a muted lavender back wall and one side wall frame a warm wooden floor. White furniture, a cream rug, and restrained warm lighting create a soft editorial look.

The overview should immediately reveal all four portfolio destinations without making the room feel crowded:

- TV: Frontend Projects
- Laptop: Technical Projects
- Notice board: About / Experience
- Three report books: Research / Reports

Hovering any destination adds a gentle emissive lift and changes the cursor to a pointer. Clicking one selects its section, eases the camera into a curated close view, and opens the matching React HTML panel. A persistent Back control closes the panel and returns the camera to the overview.

The cat is a secondary interaction. Clicking it triggers a short hop-and-wiggle animation and a small playful HTML message, but never changes portfolio navigation.

## Visual Composition

The room uses boxes, planes, and cylinders only. It includes:

- A floor, back wall, and left side wall forming an open-front shell
- A white desk and chair placed along the back wall
- An open laptop on the desk
- A wall-mounted TV with a minimal console or ledge beneath it
- A framed notice board with a few simple paper rectangles
- Three distinct report books grouped together as one destination
- A window with a white frame and simple sky-colored panes
- A large cream rug anchoring the central floor
- Two floating white shelves
- Sparse decor such as a plant, vase, lamp, storage box, and small framed object
- A placeholder cat assembled from low-poly box/cylinder forms

Objects use flat colors with modest roughness. Lighting consists of soft ambient/hemisphere illumination, one warm key light, and contact shadows or normal mesh shadows where affordable. There are no texture maps, imported models, physics, or post-processing.

## Application Architecture

`src/App.jsx` owns `selectedSection` and the transient cat-reaction state. It renders the React Three Fiber canvas and the HTML overlay as siblings so portfolio interfaces remain normal DOM content.

`src/components/scene/Room.jsx` composes the primitive meshes and scene groups. It receives callbacks for portfolio selection and the cat reaction. It contains no portfolio descriptions or project records.

`src/components/scene/Interactable.jsx` wraps a scene object with shared pointer behavior. It tracks hover state, changes the document cursor, stops click propagation, and supplies hover state to its child render function so materials can raise emissive intensity consistently.

`src/components/scene/CameraController.jsx` reads the selected section, resolves it through `cameraPresets`, and interpolates both camera position and look-at target on every frame. When no section is selected, it layers very small pointer-driven offsets over the overview pose. Section views ignore or heavily reduce parallax so the panel target remains stable.

`src/components/scene/Lighting.jsx` owns all room lighting and shadow configuration.

`src/components/ui/Overlay.jsx` owns the title card, section panel container, Back button, interaction hint, and cat message. It selects one of the three specialized panels or the shared projects panel based on `selectedSection`.

`src/components/ui/ProjectsPanel.jsx` renders either frontend or technical project cards from data.

`src/components/ui/ExperiencePanel.jsx` renders the About / Experience content.

`src/components/ui/ReportsPanel.jsx` renders the research/report entries.

`src/data/projects.js` exports structured placeholder data for all four sections, including headings, summaries, tags, metadata, and external-link placeholders where relevant.

`src/data/cameraPresets.js` exports reusable overview, TV, laptop, notice-board, and reports camera poses. Each pose contains a `position` and `target` tuple.

## State and Data Flow

The valid section identifiers are `frontend`, `technical`, `experience`, and `reports`. Clicking a portfolio mesh calls `onSelect(sectionId)`. `App` stores the identifier and passes it independently to `CameraController` and `Overlay`, keeping 3D navigation and DOM presentation synchronized without coupling them directly.

Back sets the selection to `null`. The overlay exits visually while the camera returns to the overview preset. Clicking empty room space does not alter the selection.

The cat callback increments a reaction token. The cat animation reacts to the token, and the overlay displays a short message that dismisses itself after roughly two seconds. Repeated clicks restart the reaction cleanly.

## Camera and Input

The overview uses a perspective camera aimed near the room center from a slightly elevated front-right position. There is no first-person movement and no unrestricted orbiting. Pointer position produces a small, damped horizontal and vertical camera offset only while in the overview.

Camera motion uses frame-rate-independent damping rather than a fixed-duration CSS-style timer. Every destination has a hand-authored preset wide enough to retain spatial context and leave visual room for the DOM panel. Camera transitions should feel calm and complete in approximately one second.

Pointer and touch clicks use React Three Fiber event handlers. Hover feedback is additive and subtle: materials keep their base color and gain only a warm pale emissive tint. Interactive groups expose meaningful labels through adjacent DOM instructions and overlay controls; the WebGL objects themselves are not treated as the sole accessible navigation mechanism.

## Overlay and Responsive Behavior

The overlay uses `pointer-events: none` at its root and re-enables pointer events only on actionable controls and open panels, allowing the room to remain interactive elsewhere.

On desktop, section panels occupy a translucent card along the right side, leaving the selected object visible. On narrow screens, the panel becomes a bottom sheet and the camera preset framing remains usable behind it. The Back control stays easy to reach in both layouts. Typography is clean and editorial, using system fonts without external font dependencies.

The canvas fills the dynamic viewport. A small loading-safe background color prevents a white flash. Reduced-motion users receive quicker camera damping and no decorative cat bounce, while navigation and content remain functional.

## Failure Handling

Unknown or missing section identifiers fall back to the overview camera and no panel. Empty data arrays render a concise empty-state message rather than breaking the overlay. The WebGL canvas uses conservative device-pixel-ratio limits and simple shadows to keep the scene viable on typical mobile and laptop GPUs.

## Verification

Automated tests verify:

- Every section identifier has a matching camera preset
- Selecting TV, laptop, notice board, or reports resolves the correct overlay content
- Back clears the selected section
- Unknown selections render no content panel
- Project data remains external to `Room.jsx`

The production build must complete without warnings or missing assets. Browser verification checks the desktop and mobile composition, hover glow and cursor, every camera transition, Back behavior, overlay readability, and repeated cat reactions. Console output should remain free of runtime errors.

## Out of Scope

Phase 1 excludes final 3D models, texture maps, project-detail routing, a content management system, audio, physics, post-processing, first-person controls, unrestricted orbit controls, and production portfolio copy.
