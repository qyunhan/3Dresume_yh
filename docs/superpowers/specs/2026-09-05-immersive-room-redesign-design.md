# Immersive Room Redesign Design

## Purpose

Transform the Phase 1 open-front dollhouse into an immersive room-facing portfolio composition inspired by the supplied reference image. Preserve the current four-section navigation, React HTML panels, camera-preset architecture, and cat reaction while rebuilding the room and furnishings as richer procedural low-poly components.

## Visual Direction

The overview camera sits near the room's open front-right area and looks inward toward the back-left corner. The room fills the viewport, creating the feeling of standing just inside a calm personal workspace rather than viewing a detached miniature.

The palette remains muted and warm:

- Layered lavender walls and ceiling
- Medium warm wood floorboards
- Large cream rug
- Soft-white furniture
- Blush, sage, mauve, and muted gold accents
- Warm directional sunlight crossing the floor from the window

The scene should feel authored and detailed but not busy. Objects use bevel-like layering and grouped primitive silhouettes rather than texture maps or imported models.

## Composition

The window anchors the left wall. Beneath and beside it, a detailed desk holds the laptop, lamp, books, plant, and mug. A procedural office chair sits in front of the desk.

The notice board occupies the center of the back wall with layered paper cards and a small landscape card. The TV and media console occupy the right half of the back wall. Three report books sit on a low stand near the right foreground so they remain a distinct destination.

A large cream rug fills the center floor. The cat sits on the rug in the left foreground, accompanied by one small floor cushion. Floating shelves, trailing plants, storage objects, and framed decor add depth around the main anchors. A partial right wall and simple door frame the composition without enclosing the view.

## Procedural Component Detail

Every object remains built from box, plane, and cylinder geometry. Local scene components provide richer silhouettes:

- `RoomShell`: floorboard strips, back/left/right wall returns, ceiling plane, baseboards, and door
- `Window`: layered frame, sill, blind, translucent-looking colored panes, and simple skyline/foliage silhouettes
- `Desk`: thick top, legs, drawer pedestal, handles, and surface accessories
- `OfficeChair`: shaped seat/back assembled from boxes, central post, five-spoke base, and cylinder wheels
- `Laptop`: keyboard base, screen bezel, dark display, and subtle keyboard rows
- `NoticeBoard`: wood frame, cork inset, layered notes, pins, and image card
- `Tv`: deep frame, display inset, colored project tiles, and status row
- `MediaConsole`: cabinet carcass, doors, drawers, open shelves, devices, and handles
- `Reports`: three books with distinct covers, page blocks, spines, and labels
- `Plants`: faceted pots with leaf clusters made from rotated, tapered-looking boxes
- `Cat`: rounded-looking primitive body segments, face, ears, paws, and striped tail while retaining the hop-and-wiggle reaction
- `Decor`: lamp, mug, desk books, shelf books, framed object, plant pots, storage boxes, and cushion

Geometry stays low-poly and repeated details are generated from small arrays. Materials remain flat-colored `meshStandardMaterial` instances with restrained roughness and emissive hover state.

## Camera and Lighting

The overview becomes a wide room-facing shot with a lower elevation and narrower sense of distance than the dollhouse view. It reveals the whole working area while allowing foreground objects to overlap slightly for depth.

The four selected-section presets are retuned for the new object positions. Camera motion remains frame-rate-independent damping with very subtle overview pointer parallax. There is no orbit control, first-person navigation, scroll zoom, or free camera movement.

Lighting uses a soft lavender hemisphere fill, a warm directional key placed outside the left window, a low-intensity interior fill, and conservative mesh shadows. Window light should create the strongest visual hierarchy. No post-processing is added.

## Interaction Presentation

TV, laptop, notice board, and reports retain shared hover glow and mesh click behavior. Each receives a small anchored in-room marker inspired by the reference: a dot, short leader, and compact label.

Markers use Drei `Html`, so labels are real React DOM buttons rather than Three.js text. Clicking a marker performs the same selection as clicking its mesh. This provides visible and keyboard-operable navigation without a duplicate top navigation bar. The existing destination pill row is removed from the brand card.

The brand overlay is reduced to a small identity/title treatment and concise interaction hint. Section panels remain the existing responsive normal-HTML overlays. Back returns to the immersive overview. The cat remains clickable and has no navigation responsibility.

## Responsive Behavior

Desktop preserves the full-room composition and positions content panels on the right. On viewports at or below 720px, the overview pulls back enough to retain the main anchors and selected targets shift into the unobscured upper region above the bottom sheet.

Anchored labels scale down on small screens and may hide their visible text at very narrow widths while their buttons retain accessible names. The room remains the visual focus; no repeated navigation bar is introduced.

## Architecture Changes

`Room.jsx` remains the scene composition entry point but delegates the richer procedural construction to focused local component functions or small adjacent scene modules if the file becomes unwieldy. It continues to consume `roomDestinations` and emits `onSelect` and `onCatClick` callbacks.

`Interactable.jsx` continues to own mesh hover and click behavior. A reusable `SceneMarker.jsx` component owns anchored HTML marker presentation and keyboard clicks.

`cameraPresets.js` is updated with the immersive overview and destination poses while preserving the existing resolver and responsive helpers.

`Overlay.jsx` removes the visible destination navigation pills. Accessible section activation moves to the in-room marker buttons. Portfolio content remains exclusively in `projects.js` and the specialized UI panels.

## Testing and Verification

Automated tests verify:

- Marker buttons expose the four destination labels and select the correct section identifiers
- The brand overlay no longer renders duplicate destination navigation
- Every section still has an authored camera preset and safe unknown-selection fallback
- Responsive camera behavior remains aligned with the 720px bottom-sheet breakpoint
- Cat reaction math and Back behavior remain intact

Production build and full tests must pass. Browser verification checks the immersive desktop composition, mobile framing, every mesh and marker interaction, hover states, camera transitions, Back behavior, repeated cat reaction, and console output.

## Out of Scope

The redesign does not add imported models, textures, environment maps, post-processing, physics, audio, theme switching, a functional day/night control, top navigation, scroll zoom, orbit controls, first-person navigation, or final portfolio content.
