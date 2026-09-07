# Final review fixes

- Added the non-zone About `SceneMarker` at `phase2Layout.about.markerPosition`; keyboard and pointer activation both call the existing About callback.
- Forwarded `hovered` through `Decor`'s shared `Box` into `Material`, restoring the About frame's emissive hover treatment.
- Added regressions for About marker activation and hover propagation to the framed surfaces.

Verification:

- `npm test -- src/components/scene/Room.test.jsx src/components/scene/room/Decor.test.jsx src/components/scene/SceneMarker.test.jsx src/components/scene/Interactable.test.jsx` — 12 passing.
- `npm test` — 99 passing across 16 files.
- `npm run build` — completed successfully. Vite reports the existing over-1200 kB chunk-size warning.
- `git diff --check` — clean.
