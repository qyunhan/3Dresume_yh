import { describe, expect, test } from 'vitest'
import { SECTION_IDS } from './projects'
import {
  cameraPresets,
  getCameraPreset,
  getResponsiveCameraPosition,
  getResponsiveCameraTarget,
  hasCameraPreset,
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

test('portrait selection pulls back and shifts the focus below the object', () => {
  const position = getResponsiveCameraPosition(
    cameraPresets.frontend,
    0.6,
    true,
    390,
  )
  ;[8.183, 5.397, 9.18].forEach((coordinate, index) => {
    expect(position[index]).toBeCloseTo(coordinate)
  })
  expect(
    getResponsiveCameraTarget(cameraPresets.frontend, 0.6, true, 390),
  ).toEqual([3.05, 2.25, -3.8])
})

test('selected framing follows the 720px bottom-sheet breakpoint', () => {
  expect(
    getResponsiveCameraTarget(cameraPresets.frontend, 1.2, true, 720),
  ).toEqual([3.05, 2.25, -3.8])
  expect(
    getResponsiveCameraTarget(cameraPresets.frontend, 0.8, true, 721),
  ).toBe(cameraPresets.frontend.target)
})

test('only authored destination identifiers count as selected camera views', () => {
  expect(hasCameraPreset('frontend')).toBe(true)
  expect(hasCameraPreset('missing')).toBe(false)
  expect(hasCameraPreset(null)).toBe(false)
})
