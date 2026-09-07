import { roomLayout } from './roomLayout'

// Console-local placements shared by the research geometry and practical light.
export const researchConsole = {
  offsetFromTv: roomLayout.mediaConsole.position.map((value, index) => value - roomLayout.tv.position[index]),
  lamp: { position: [-1.36, 0.55, 0.15], scale: 0.62 },
  plant: { position: [1.38, 0.55, 0.16], scale: 0.56 },
  notebook: { position: [-0.38, 0.575, 0.12], rotation: [-Math.PI / 2, 0, -0.08] },
}

export const researchLightPosition = roomLayout.mediaConsole.position.map((value, index) =>
  value + researchConsole.lamp.position[index] + [0, 0.69, 0.03][index] * researchConsole.lamp.scale,
)
