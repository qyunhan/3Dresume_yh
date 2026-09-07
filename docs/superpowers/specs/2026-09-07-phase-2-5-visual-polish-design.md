# Phase 2.5: Low-Poly Room Visual Polish

## Scope

Polish the existing procedural React Three Fiber room without altering portfolio zones, selection state, camera-preset routing, detail panels, OrbitControls, or the cat Easter egg.

## Composition and camera

The room shell will use taller back and side walls, while keeping its open front. The home camera will move from a dollhouse-style high angle to a slightly elevated eye-level view at a 35–45 degree field of view. The floor will extend past the visible viewing edge. Existing orbit constraints remain, adjusted only to retain a forward-looking, in-room range.

## Procedural prop kit

New reusable low-poly components will provide plants, book stacks, plaques, photo frames, desk lamps, trophy shapes, and project miniatures. They use boxes, cylinders, planes, and low-segment geometry with matte `MeshStandardMaterial` variants. The components are composed into existing zone modules rather than adding resume copy to `Room.jsx`.

## Zone treatment

- **Projects:** tidy desk additions: HDB block with windows and plaque, cloud/sun weather miniature, compact finance monitor, books, pen cup, lamp, and plant.
- **Experience:** a wall-mounted geometric timeline preserves EY, Shopee, and UOB interactions, pairing calculator, parcel, and blueprint motifs with a restrained connector.
- **School & Life:** shelves gain books, NUS plaque, trophy, tilted photos, small camera or plane, heart/flag, and trailing foliage.
- **Research:** TV becomes an abstract finance interface with chart and metric bars. Nearby books, notebook, lamp, and plant establish a research desk mood.
- **Center and window:** cream rug, purple pouf, cat position retained, plus blinds and layered sunset skyline/tree silhouettes at the window.

## Lighting and materials

The scene uses a soft ambient/hemisphere fill, one shadow-casting warm directional sun, and modest warm desk/research practical lights. Simple transparent-free geometric patches suggest diagonal late-afternoon light. Materials remain matte and low-poly; monitors are gently emissive and the trophy has restrained metallic styling. No assets, post-processing, textures, or physics are added.

## Validation

Component tests will protect reusable geometry contracts where practical. Existing interaction tests must remain green. A production build run under the GitHub Pages base path validates that the published site still resolves assets correctly.
