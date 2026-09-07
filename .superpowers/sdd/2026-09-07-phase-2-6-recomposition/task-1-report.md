# Task 1 Report: Minimal Anchors and Camera Framing

## Delivered

- Kept every portfolio item ID and its existing `cameraPreset` identifier intact.
- Aligned the desk display row as HDB (left), Financial Automation (center), and Weather (right), sharing one height and depth.
- Moved Science Club and UCLA onto the existing shelf surface; UCLA no longer has a disconnected room anchor.
- Retargeted the existing project, Science Club, and UCLA camera presets to their new anchors without changing any public camera helper API.
- Added regression coverage for the level project row, shelf-local school anchors, and distinct portfolio-item camera targets.

## Test Evidence

### RED

Command:

```sh
npm test -- src/data/phase2Layout.test.js src/data/cameraPresets.test.js
```

Before implementation, this exited with code `1`: 2 tests failed and 40 passed. The failures were the new project-row assertion (`-1.72` was not less than `-4.9`) and the new shelf assertion (Science Club y position `5.68` was not close to shelf surface `5.06`).

### GREEN

Command:

```sh
npm test -- src/data/phase2Layout.test.js src/data/cameraPresets.test.js
```

After implementation, this exited with code `0`: 2 test files passed and 42 tests passed.

### Completion Verification

```sh
npm test
GITHUB_ACTIONS=true npm run build
git diff --check
```

- `npm test`: exit `0`; 20 test files and 123 tests passed.
- `GITHUB_ACTIONS=true npm run build`: exit `0`; Vite production build completed. It emitted the existing chunk-size advisory for the 1.22 MB JavaScript bundle.
- `git diff --check`: exit `0` with no whitespace errors.
