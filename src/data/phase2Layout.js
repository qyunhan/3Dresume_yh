import { getPortfolioItem } from './portfolio'
import { roomLayout } from './roomLayout'

// Scene metadata only. Descriptive content is resolved by the HTML labels.
function itemAnchor(zoneId, id, transforms) {
  return { id, zoneId, cameraPreset: getPortfolioItem(zoneId, id).cameraPreset, ...transforms }
}

export const phase2Layout = {
  zoneLabels: {
    projects: { position: [-4.45, 3.75, -5.05], cameraPreset: 'projects' },
    research: { position: [3.55, 4.45, -5.02], cameraPreset: 'research' },
    experience: { position: [0, 4.63, -5.02], cameraPreset: 'experience' },
    school: { position: [-2.45, 6.02, -5.02], cameraPreset: 'school' },
  },
  items: {
    'financial-automation': itemAnchor('projects', 'financial-automation', {
      objectType: 'financialDashboard', position: [-4.9, 2.25, -4.82],
      markerPosition: [-4.9, 3.3, -4.65],
    }),
    weather: itemAnchor('projects', 'weather', {
      objectType: 'weatherStation', position: [-2.6, 2.25, -4.8],
      markerPosition: [-2.6, 3.4, -4.6],
    }),
    hdb: itemAnchor('projects', 'hdb', {
      objectType: 'hdbBlock', position: [-1.72, 2.25, -3.73],
      markerPosition: [-1.72, 3.18, -3.55],
    }),
    'equity-research': itemAnchor('research', 'equity-research', {
      objectType: 'equityResearchStation', position: roomLayout.tv.position,
      markerPosition: [3.65, 1.95, -1.35],
      reportOffset: roomLayout.reports.position.map((value, index) => value - roomLayout.tv.position[index]),
    }),
  },
  about: { position: [-5.67, 2.25, -3.76], markerPosition: [-5.67, 3.05, -3.6] },
}
