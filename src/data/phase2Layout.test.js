import { expect, test } from 'vitest'
import { getPortfolioItem, ZONE_IDS } from './portfolio'
import { phase2Layout } from './phase2Layout'
import { cameraPresets } from './cameraPresets'
import { roomLayout } from './roomLayout'

test('all four environmental labels resolve to authored zone views', () => {
  expect(Object.keys(phase2Layout.zoneLabels)).toEqual(ZONE_IDS)
  for (const label of Object.values(phase2Layout.zoneLabels)) {
    expect(label.position).toHaveLength(3)
    expect(cameraPresets[label.cameraPreset]).toBeDefined()
  }
})

test.each([
  ['financial-automation', 'projects'], ['weather', 'projects'],
  ['hdb', 'projects'], ['equity-research', 'research'],
  ['ey', 'experience'], ['shopee', 'experience'], ['uob', 'experience'],
  ['rc4-flag', 'school'], ['science-club', 'school'], ['ucla', 'school'],
])('%s resolves to its canonical zone and camera', (id, zoneId) => {
  const anchor = phase2Layout.items[id]
  expect(anchor.zoneId).toBe(zoneId)
  expect(anchor.position).toHaveLength(3)
  expect(anchor.markerPosition).toHaveLength(3)
  expect(anchor.cameraPreset).toBe(getPortfolioItem(zoneId, id).cameraPreset)
  expect(cameraPresets[anchor.cameraPreset]).toBeDefined()
  if (zoneId === 'projects') expect(anchor.position[0]).toBeLessThan(0)
})

test('places Science Club and RC4 on the left shelf surface', () => {
  const leftShelfSurface = roomLayout.shelves.position[1] + 0.65 + 0.06

  for (const itemId of ['science-club', 'rc4-flag']) {
    expect(phase2Layout.items[itemId].position[1]).toBeCloseTo(leftShelfSurface)
  }
})

test('orders the project heroes across one level desk display row', () => {
  const projectPositions = ['hdb', 'financial-automation', 'weather'].map(
    (itemId) => phase2Layout.items[itemId].position,
  )

  expect(projectPositions[0][0]).toBeLessThan(projectPositions[1][0])
  expect(projectPositions[1][0]).toBeLessThan(projectPositions[2][0])
  expect(new Set(projectPositions.map(([, y]) => y)).size).toBe(1)
  expect(new Set(projectPositions.map(([, , z]) => z)).size).toBe(1)
})

test('keeps every school anchor on the shelf arrangement', () => {
  const shelfSurface = roomLayout.shelves.position[1] + 0.65 + 0.06
  const shelfFront = roomLayout.shelves.position[2] + 0.1

  for (const itemId of ['science-club', 'rc4-flag', 'ucla']) {
    const position = phase2Layout.items[itemId].position
    expect(position[1]).toBeCloseTo(shelfSurface)
    expect(position[2]).toBeCloseTo(shelfFront)
    expect(position[0]).toBeGreaterThan(roomLayout.shelves.position[0] - 2.25)
    expect(position[0]).toBeLessThan(roomLayout.shelves.position[0] + 2.25)
  }
})

test('moves the entire research destination right of the experience board with a clear gap', () => {
  expect(roomLayout.tv.position[0]).toBeCloseTo(4.25)
  expect(roomLayout.reports.position[0]).toBeCloseTo(4.4)
  expect(phase2Layout.zoneLabels.research.position[0]).toBeCloseTo(4.3)
})

test('keeps every white zone label just above its visual destination', () => {
  expect(phase2Layout.zoneLabels.projects.position[1]).toBeCloseTo(3.55)
  expect(phase2Layout.zoneLabels.research.position[1]).toBeCloseTo(4.25)
  expect(phase2Layout.zoneLabels.experience.position[1]).toBeCloseTo(4.5)
  expect(phase2Layout.zoneLabels.school.position[1]).toBeCloseTo(6.35)
})
