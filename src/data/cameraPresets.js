export const cameraPresets = {
  overview: { position: [8.8, 5.7, 10.4], target: [0, 2.45, -1.25] },
  frontend: { position: [7, 5.5, 5.5], target: [3.55, 3.05, -5.15] },
  technical: { position: [2.5, 4.8, 5.2], target: [-3.65, 2.25, -4.05] },
  experience: { position: [3.8, 5.8, 4.5], target: [0, 3.55, -5.25] },
  reports: { position: [6.8, 4.5, 4.8], target: [3.65, 0.75, -1.55] },
}

export function getCameraPreset(sectionId) {
  return cameraPresets[sectionId] ?? cameraPresets.overview
}

export function getResponsiveCameraPosition(
  preset,
  aspect,
  hasSelection,
  viewportWidth = Number.POSITIVE_INFINITY,
) {
  const compactSelection = hasSelection && viewportWidth <= 720
  const portraitOverview = !hasSelection && aspect < 0.8
  if (!compactSelection && !portraitOverview) return preset.position

  const portraitScale = hasSelection ? 1.18 : 1.55
  return preset.position.map(
    (coordinate, index) =>
      preset.target[index] +
      (coordinate - preset.target[index]) * portraitScale,
  )
}

export function getResponsiveCameraTarget(
  preset,
  _aspect,
  hasSelection,
  viewportWidth = Number.POSITIVE_INFINITY,
) {
  if (!hasSelection || viewportWidth > 720) return preset.target
  return [preset.target[0], preset.target[1] - 1.2, preset.target[2]]
}

export function hasCameraPreset(sectionId) {
  return Boolean(
    sectionId && sectionId !== 'overview' && cameraPresets[sectionId],
  )
}
