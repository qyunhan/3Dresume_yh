export const cameraPresets = {
  overview: { position: [8.8, 4.65, 11.3], target: [0, 2.45, -3.2], fov: 40 },
  frontend: { position: [7, 5.5, 5.5], target: [4.25, 3.05, -5.15] },
  technical: { position: [2.5, 4.8, 5.2], target: [-3.65, 2.25, -4.05] },
  experience: { position: [3.8, 5.8, 4.5], target: [0, 3.55, -5.25] },
  reports: { position: [7.2, 4.5, 4.8], target: [4.4, 0.75, -1.55] },
  projects: { position: [1.5, 5.2, 4.7], target: [-3.65, 2.6, -4.25] },
  research: { position: [7.4, 5.2, 5.2], target: [4.25, 2.5, -3.8] },
  school: { position: [2.8, 6.3, 4.5], target: [-2, 5.35, -5.1] },
  financialAutomation: { position: [-0.6, 4.3, 2.5], target: [-3.65, 2.7, -4.82] },
  weather: { position: [1.6, 4.3, 2.7], target: [-2.4, 2.7, -4.82] },
  hdb: { position: [2.2, 4.1, 3.3], target: [-4.9, 2.65, -4.82] },
  equityResearch: { position: [7.4, 4.6, 4.6], target: [4.35, 2.15, -3.4] },
  ey: { position: [4.4, 5.2, 4.8], target: [-1.45, 3.72, -5.1] },
  shopee: { position: [4.5, 5.2, 4.8], target: [0, 3.72, -5.1] },
  uob: { position: [5, 5.2, 4.8], target: [1.45, 3.72, -5.1] },
  rc4: { position: [2.7, 5.98, 4.9], target: [-1.7, 5.46, -5.1] },
  scienceClub: { position: [2.2, 5.78, 4.9], target: [-3, 5.34, -5.1] },
  ucla: { position: [1.8, 4.4, 5], target: [-0.25, 5.4, -5.1] },
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
