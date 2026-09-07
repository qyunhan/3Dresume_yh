import { getPortfolioItem } from './portfolio'
import { roomLayout } from './roomLayout'

// Scene metadata only. Descriptive content is resolved by the HTML labels.
function itemAnchor(zoneId, id, { useTitleLabel = false, ...transforms }) {
  const item = getPortfolioItem(zoneId, id)
  return {
    id,
    zoneId,
    cameraPreset: item.cameraPreset,
    ...(useTitleLabel && { interactiveLabel: item.title }),
    ...transforms,
  }
}

export const phase2Layout = {
  zoneLabels: {
    projects: { position: [-4.45, 3.55, -5.05], cameraPreset: 'projects' },
    research: { position: [4.3, 4.25, -5.02], cameraPreset: 'research' },
    experience: { position: [0, 4.5, -5.02], cameraPreset: 'experience' },
    school: { position: [-2.45, 6.35, -5.02], cameraPreset: 'school' },
  },
  items: {
    'financial-automation': itemAnchor('projects', 'financial-automation', {
      objectType: 'financialDashboard', position: [-3.65, 2.25, -4.82],
      markerPosition: [-3.65, 3.3, -4.65],
    }),
    weather: itemAnchor('projects', 'weather', {
      objectType: 'weatherStation', position: [-2.4, 2.25, -4.82],
      markerPosition: [-2.4, 3.4, -4.65],
    }),
    hdb: itemAnchor('projects', 'hdb', {
      objectType: 'hdbBlock', position: [-4.9, 2.25, -4.82],
      markerPosition: [-4.9, 3.18, -4.65],
    }),
    'equity-research': itemAnchor('research', 'equity-research', {
      objectType: 'equityResearchStation', position: roomLayout.tv.position,
      markerPosition: [3.65, 1.95, -1.35],
      reportOffset: roomLayout.reports.position.map((value, index) => value - roomLayout.tv.position[index]),
    }),
    ey: itemAnchor('experience', 'ey', {
      objectType: 'eyMemento', position: [-1.45, 3.38, -5.1],
      markerPosition: [-1.45, 4.15, -4.91], useTitleLabel: true,
    }),
    shopee: itemAnchor('experience', 'shopee', {
      objectType: 'shopeeMemento', position: [0, 3.38, -5.1],
      markerPosition: [0, 4.15, -4.91], useTitleLabel: true,
    }),
    uob: itemAnchor('experience', 'uob', {
      objectType: 'uobMemento', position: [1.45, 3.38, -5.1],
      markerPosition: [1.45, 4.15, -4.91], useTitleLabel: true,
    }),
    'rc4-flag': itemAnchor('school', 'rc4-flag', {
      objectType: 'rc4Trophy', position: [-1.7, 5.06, -5.1],
      markerPosition: [-1.7, 5.86, -4.92], useTitleLabel: true,
    }),
    'science-club': itemAnchor('school', 'science-club', {
      objectType: 'scienceClubToken', position: [-3.0, 5.06, -5.1],
      markerPosition: [-3.0, 5.74, -4.92], useTitleLabel: true,
    }),
    ucla: itemAnchor('school', 'ucla', {
      objectType: 'uclaMemory', position: [-0.25, 5.06, -5.1],
      markerPosition: [-0.25, 5.83, -4.92], useTitleLabel: true,
    }),
  },
  about: { position: [-5.67, 2.25, -3.76], markerPosition: [-5.67, 3.05, -3.6] },
}
