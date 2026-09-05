import { describe, expect, test } from 'vitest'
import { SECTION_IDS } from './projects'
import {
  cameraPresets,
  getCameraPreset,
  getResponsiveCameraPosition,
} from './cameraPresets'

describe('camera presets', () => {
  test.each(['frontend', 'technical', 'experience', 'reports'])(
    '%s has a complete camera pose',
    (sectionId) => {
      expect(SECTION_IDS).toContain(sectionId)
      expect(cameraPresets[sectionId].position).toHaveLength(3)
      expect(cameraPresets[sectionId].target).toHaveLength(3)
    },
  )

  test('unknown sections return the overview pose', () => {
    expect(getCameraPreset('missing')).toBe(cameraPresets.overview)
    expect(getCameraPreset(null)).toBe(cameraPresets.overview)
  })
})

test('portrait overview pulls back while desktop keeps the authored pose', () => {
  expect(getResponsiveCameraPosition(cameraPresets.overview, 1.6, false)).toEqual(
    cameraPresets.overview.position,
  )
  const portraitPosition = getResponsiveCameraPosition(
    cameraPresets.overview,
    0.6,
    false,
  )
  ;[16.275, 11.5, 19.375].forEach((coordinate, index) => {
    expect(portraitPosition[index]).toBeCloseTo(coordinate)
  })
})
