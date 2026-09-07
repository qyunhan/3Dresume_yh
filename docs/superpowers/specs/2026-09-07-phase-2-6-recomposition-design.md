# Phase 2.6: Minimal Portfolio Room Recomposition

## Goal

Reduce visual density while retaining the existing React Three Fiber portfolio architecture, interactions, panels, controls, cat, room shell, and low-poly palette.

## Composition

- **Projects:** exactly three independently clickable project miniatures form a level, equally spaced desk row: HDB, Financial Automation, Weather. The laptop remains optional background furniture and cannot overlap or dominate them.
- **Experience:** one bulletin board with exactly three symmetrical clickable company cards: EY, Shopee, UOB. It contains no external calculator, parcel, blueprint, chart, or decorative timeline props.
- **School & Life:** one shelf with a trophy, NUS frame, and UCLA frame. UCLA moves into this shelf arrangement. Science Club remains available in the School panel switcher, but has no physical hero object. The disconnected About frame/marker is removed; the School label opens the School overview.
- **Research:** one finance TV and a stack of at most three reports with one lamp. Plants, notebooks, and unrelated console props are removed.

## Navigation and labels

Retain exactly four environmental category labels, positioned adjacent to their visual anchors. Remove all `SceneMarker` interaction dots and the separate About label. Object mesh interactions remain usable through pointer/touch and retain pointer feedback.

## Camera

Keep the existing controller and responsive helper interfaces. Create or retarget unique item presets for HDB, finance, weather, EY, Shopee, UOB, RC4, NUS, UCLA, and equity research. Each points directly at its object so it occupies approximately the central 30–40% of the viewport before its panel opens.

## Validation

Tests must verify the physical hero-object counts, no scene-marker composition, School shelf routing, unique item preset values, and preserved panel payloads. Full tests and a GitHub Pages-mode production build must pass.
