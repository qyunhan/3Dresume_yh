import { expect, test } from 'vitest'
import { getPortfolioItem, ZONE_IDS } from './portfolio'
import { phase2Layout } from './phase2Layout'
import { cameraPresets } from './cameraPresets'

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
])('%s resolves to its canonical zone and camera', (id, zoneId) => {
  const anchor = phase2Layout.items[id]
  expect(anchor.zoneId).toBe(zoneId)
  expect(anchor.position).toHaveLength(3)
  expect(anchor.markerPosition).toHaveLength(3)
  expect(anchor.cameraPreset).toBe(getPortfolioItem(zoneId, id).cameraPreset)
  expect(cameraPresets[anchor.cameraPreset]).toBeDefined()
  expect(anchor.position[0] < 0).toBe(zoneId === 'projects')
})
