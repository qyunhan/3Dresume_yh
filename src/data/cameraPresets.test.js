import { describe, expect, test } from 'vitest'
import { SECTION_IDS } from './projects'
import { cameraPresets, getCameraPreset } from './cameraPresets'

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
