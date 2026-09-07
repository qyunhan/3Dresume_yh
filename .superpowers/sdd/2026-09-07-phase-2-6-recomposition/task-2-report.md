# Task 2 Report: Simplify Portfolio Room Visual Anchors

## Delivered

- Removed every rendered `SceneMarker`, including the marker embedded in each `PortfolioObject`.
- Removed the standalone About interaction and deleted the unused `AboutFrame` export. The room no longer consumes the `about` scene anchor.
- Kept the three desk heroes as HDB, Financial Dashboard, and Weather Station. Their click payloads remain `{ zoneId, itemId, cameraPreset }` and retain their canonical values.
- Restricted the physical scene to the ten intended heroes. Science Club remains in `portfolio` and `phase2Layout` for panel data and camera metadata, but is no longer rendered as a room object.
- Rebuilt the Experience presentation as one board with exactly three cards; simplified School & Life to an NUS books group, trophy group, and UCLA frame group; reduced research to TV, reports, and the lamp.
- Updated the prior visual-polish tests to verify the approved, reduced research and school compositions.

## TDD Evidence

### RED

`npm test -- src/components/scene/Room.test.jsx`

Before implementation, the focused run exited with code `1`: the new test found rendered `SceneMarker` elements and the Experience board did not contain three `experience-card` groups.

`npm test -- src/components/scene/room/Decor.test.jsx`

Before deleting the obsolete export, this exited with code `1`: `Decor.AboutFrame` was still defined.

### GREEN

`npm test -- src/components/scene/Room.test.jsx src/components/scene/room/Decor.test.jsx src/components/scene/room/VisualPolish.test.jsx`

This passed with 3 test files and 16 tests.

## Completion Verification

`npm test`, `GITHUB_ACTIONS=true npm run build`, and `git diff --check` all exited with code `0`.

- `npm test`: 20 test files and 121 tests passed.
- The Vite production build completed. It emitted the existing chunk-size advisory for the 1.22 MB JavaScript bundle.
- `git diff --check`: no whitespace errors.
