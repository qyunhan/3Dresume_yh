export const cameraPresets = {
  overview: { position: [10.5, 8.2, 12.5], target: [0, 2.2, 0] },
  frontend: { position: [7.4, 5.1, 7.2], target: [3.05, 3.45, -3.8] },
  technical: { position: [4.6, 4.3, 7.4], target: [-1.7, 2.65, -3.4] },
  experience: { position: [7.3, 5.3, 6.5], target: [0.5, 3.65, -3.82] },
  reports: { position: [6.8, 4, 6.7], target: [2.1, 1.7, -2.5] },
}

export function getCameraPreset(sectionId) {
  return cameraPresets[sectionId] ?? cameraPresets.overview
}

export function getResponsiveCameraPosition(preset, aspect, hasSelection) {
  if (aspect >= 0.8 || hasSelection) return preset.position

  const portraitScale = 1.55
  return preset.position.map(
    (coordinate, index) =>
      preset.target[index] +
      (coordinate - preset.target[index]) * portraitScale,
  )
}
