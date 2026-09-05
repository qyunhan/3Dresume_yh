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
  test('overview uses the immersive room-facing pose', () => {
    expect(cameraPresets.overview.position).toEqual([8.8, 5.7, 10.4])
    expect(cameraPresets.overview.target).toEqual([0, 2.45, -1.25])
  })

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

  test('selected poses retain surrounding context', () => {
    Object.values(cameraPresets)
      .filter((preset) => preset !== cameraPresets.overview)
      .forEach(({ position, target }) => {
        const distance = Math.hypot(
          ...position.map((coordinate, index) => coordinate - target[index]),
        )
        expect(distance).toBeLessThan(13)
      })
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
  ;[13.64, 7.4875, 16.8075].forEach((coordinate, index) => {
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
  ;[7.621, 5.941, 7.417].forEach((coordinate, index) => {
    expect(position[index]).toBeCloseTo(coordinate)
  })
  ;[3.55, 1.85, -5.15].forEach((coordinate, index) => {
    expect(
      getResponsiveCameraTarget(cameraPresets.frontend, 0.6, true, 390)[index],
    ).toBeCloseTo(coordinate)
  })
})

test('selected framing follows the 720px bottom-sheet breakpoint', () => {
  ;[3.55, 1.85, -5.15].forEach((coordinate, index) => {
    expect(
      getResponsiveCameraTarget(cameraPresets.frontend, 1.2, true, 720)[index],
    ).toBeCloseTo(coordinate)
  })
  expect(
    getResponsiveCameraTarget(cameraPresets.frontend, 0.8, true, 721),
  ).toBe(cameraPresets.frontend.target)
})

test('only authored destination identifiers count as selected camera views', () => {
  expect(hasCameraPreset('frontend')).toBe(true)
  expect(hasCameraPreset('missing')).toBe(false)
  expect(hasCameraPreset(null)).toBe(false)
})
