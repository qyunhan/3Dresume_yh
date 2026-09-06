# Phase 2: 3D Resume Story Design

## Goal

Reorganize the existing interactive purple low-poly room into a clear four-zone resume story. Within 3-5 seconds of entering, visitors should discover Projects, Research, Experience, and School & Life without the room becoming a dashboard.

## Scope and constraints

- Preserve the existing room shell, opening-door entry, OrbitControls, drag/look, scroll zoom, camera transitions, interaction behavior, purple cozy palette, and cat Easter egg.
- Do not rebuild the app, add physics, post-processing, large textures, or new final model assets.
- New resume props use only low-poly box, plane, and cylinder geometry.
- All resume copy remains in data files and HTML detail panels, never Three.js text.
- Existing four panels are reinterpreted as zone panels: Projects, Research, Experience, and School & Life.

## State and navigation

The app owns a single selection object:

```js
{ activeZone: 'projects' | 'research' | 'experience' | 'school' | null,
  selectedItem: string | null }
```

- Clicking a zone label opens that zone with `selectedItem: null`.
- Clicking a specific object sets its zone and item id, then animates to its item camera preset.
- Each zone panel provides compact item navigation to switch the selected item without returning to the room.
- The Back button closes the panel and restores room exploration at the zone/home framing.
- The cat does not set selection state and remains a separate walk/trot interaction.

## Information architecture

| Zone | In-room anchor | Visible label | Object items |
| --- | --- | --- | --- |
| Projects | left desk | `PROJECTS` / `What I Build` | Financial Automation, Weather Forecasting, HDB Price Prediction |
| Research | right TV and report area | `RESEARCH` / `How I Think` | Equity Research |
| Experience | back-center wall | `EXPERIENCE` / `Where I've Worked` | EY, Shopee, UOB |
| School & Life | upper left shelves/window | `SCHOOL & LIFE` / `Beyond Work` | NUS, RC4 Flag, Science Club, UCLA Exchange |

Each label is an environmental plaque, wall marker, or shelf tag rather than a floating UI card. Labels remain visible at the overview camera; object-specific hover labels appear only on hover/focus.

## Scene composition

### Projects: desk

- Preserve the laptop and desk furniture.
- Add a small financial dashboard monitor with simple revenue, margin, and chart shapes.
- Add a compact weather-station/cloud-and-sun object.
- Add a small, distinct Singapore HDB block.

### Research: TV and report area

- Retheme the TV into a finance workstation with simplified ticker, chart, and valuation marks.
- Add an equity report, notebook, and concise finance-document stack.

### Experience: career journey wall

- Replace the generic corkboard story with chronological `EY -> Shopee -> UOB` memorabilia, joined by a restrained timeline.
- EY uses calculator/valuation-sheet/chart motifs.
- Shopee uses a parcel/shopping-bag motif.
- UOB uses a product blueprint/AI workflow motif.

### School & Life: shelves and window side

- NUS books/university token.
- RC4 gold trophy.
- Small science-club/volunteering token.
- UCLA polaroid/camera/travel token.

### About

- A single small framed item near the desk opens an About interaction; it is not a fifth zone.

## Data and component boundaries

`src/data/portfolio.js` is the canonical source for zone and item content, including ids, titles, subtitles, skills, short and long descriptions, scene object names, camera presets, and status.

Scene modules consume only layout/object type/selection metadata. Portfolio text and skill tags never enter `Room.jsx` or procedural geometry files.

New reusable interfaces:

- `ZoneLabel({ zone, title, subtitle, position, onSelect })`
- `PortfolioObject({ item, position, onSelect, children })`
- `HoverLabel({ title, subtitle, visible })`
- `SkillTags({ skills })`
- `DetailPanel({ activeZone, selectedItem, onSelectItem, onBack })`

The existing panel visual styles remain editorial HTML overlays. Zone-specific content can retain project grid, experience timeline, and research-list layouts behind the shared state/switcher API.

## Camera and interaction

- Preserve constrained OrbitControls and idle parallax.
- Existing selection animation behavior remains authoritative; controls disable while a selected item camera animates and restore on Back.
- Add zone/item presets only when an existing preset cannot frame the new object while retaining room context.
- Default overview framing should expose all four environmental labels through the room's normal eye path: desk, career wall, research screen, shelves.

## Acceptance criteria

- Overview clearly communicates all four zones within 3-5 seconds.
- Each prop has a natural visual relationship to its resume content.
- Hover/focus reveals a compact label; click opens the correct zone and selected item.
- Panel item switcher changes content without returning to the room.
- Back returns to normal exploration without removing OrbitControls.
- The scene remains spacious, cozy, and primitive-only.
