import { Material, palette } from './materials'

function Box({ size, color, hovered = false, ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <boxGeometry args={size} />
      <Material color={color} hovered={hovered} />
    </mesh>
  )
}

function Cylinder({ size, color, hovered = false, ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <cylinderGeometry args={size} />
      <Material color={color} hovered={hovered} />
    </mesh>
  )
}

export function FinancialDashboard({ hovered }) {
  return (
    <group>
      <Box size={[0.52, 0.05, 0.35]} position={[0, 0.025, 0]} color={palette.lavenderShadow} />
      <Box size={[0.07, 0.23, 0.07]} position={[0, 0.14, -0.03]} color={palette.woodDark} />
      <Box size={[0.9, 0.65, 0.075]} position={[0, 0.55, -0.03]} color={palette.ink} hovered={hovered} />
      <Box size={[0.81, 0.55, 0.016]} position={[0, 0.55, 0.018]} color="#51485f" hovered={hovered} />
      {[-0.24, 0.03, 0.27].map((x, index) => (
        <Box key={x} size={[0.18, 0.085, 0.01]} position={[x, 0.73, 0.032]} color={index === 1 ? palette.gold : palette.sage} />
      ))}
      {[0.13, 0.21, 0.18, 0.3, 0.27, 0.36].map((height, index) => (
        <Box key={index} size={[0.075, height, 0.01]} position={[-0.29 + index * 0.115, 0.32 + height / 2, 0.034]} color={index < 3 ? palette.blush : palette.sky} />
      ))}
      <Box size={[0.73, 0.012, 0.01]} position={[0, 0.306, 0.034]} color={palette.cream} />
    </group>
  )
}

export function WeatherStation({ hovered }) {
  return (
    <group>
      <Box size={[0.51, 0.07, 0.34]} position={[0, 0.035, 0]} color={palette.cream} hovered={hovered} />
      <Cylinder size={[0.025, 0.025, 0.43, 8]} position={[0, 0.25, 0]} color={palette.woodDark} />
      <Cylinder size={[0.14, 0.14, 0.065, 10]} position={[0.12, 0.7, -0.035]} rotation={[Math.PI / 2, 0, 0]} color={palette.gold} hovered={hovered} />
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <group key={index} position={[0.12, 0.7, -0.035]} rotation={[0, 0, index * Math.PI / 3]}>
          <Box size={[0.025, 0.07, 0.03]} position={[0, 0.195, 0]} color={palette.gold} />
        </group>
      ))}
      {[[-0.16, 0.5, 0.105], [-0.04, 0.57, 0.14], [0.11, 0.51, 0.11]].map(([x, y, radius]) => (
        <Cylinder key={x} size={[radius, radius, 0.11, 8]} position={[x, y, 0.035]} rotation={[Math.PI / 2, 0, 0]} color={palette.white} hovered={hovered} />
      ))}
      <Box size={[0.38, 0.1, 0.11]} position={[-0.03, 0.47, 0.035]} color={palette.white} hovered={hovered} />
      {[-0.13, 0, 0.13].map((x) => (
        <Box key={x} size={[0.022, 0.1, 0.025]} position={[x, 0.34, 0.08]} rotation={[0, 0, -0.22]} color={palette.sky} />
      ))}
    </group>
  )
}

export function HdbBlock({ hovered }) {
  return (
    <group>
      <Box size={[0.65, 0.06, 0.43]} position={[0, 0.03, 0]} color={palette.sage} />
      {[-0.22, 0, 0.22].map((x, column) => (
        <group key={x} position={[x, 0, 0]}>
          <Box size={[0.18, 0.64, 0.3]} position={[0, 0.4, 0]} color={column === 1 ? '#d5b9ab' : palette.cream} hovered={hovered} />
          {[0.22, 0.36, 0.5, 0.64].map((y) => (
            <group key={y} position={[0, y, 0.16]}>
              <Box size={[0.115, 0.065, 0.014]} color={palette.ink} />
              <Box size={[0.16, 0.025, 0.04]} position={[0, -0.052, 0.005]} color={palette.white} />
            </group>
          ))}
        </group>
      ))}
      <Box size={[0.65, 0.055, 0.37]} position={[0, 0.745, 0]} color={palette.blush} hovered={hovered} />
      <Box size={[0.13, 0.11, 0.018]} position={[0, 0.115, 0.16]} color={palette.woodDark} />
      <Box size={[0.15, 0.12, 0.19]} position={[0.12, 0.83, -0.025]} color={palette.cream} />
    </group>
  )
}

export function EquityResearchStation({ hovered, reportOffset }) {
  return (
    <group>
      <Box size={[3.35, 1.94, 0.16]} position={[0, 0, -0.05]} color="#514956" />
      <Box size={[3.28, 1.86, 0.13]} position={[0, 0, 0.04]} color={palette.ink} hovered={hovered} />
      <Box size={[3.03, 1.61, 0.022]} position={[0, 0, 0.119]} color="#50465b" hovered={hovered} />
      {[-1.14, -0.57, 0, 0.57, 1.14].map((x, index) => (
        <Box key={x} size={[0.42, 0.08, 0.015]} position={[x, 0.65, 0.14]} color={index % 2 ? palette.blush : palette.sage} />
      ))}
      {[0.25, 0.39, 0.33, 0.57, 0.65, 0.79].map((height, index) => (
        <Box key={index} size={[0.16, height, 0.018]} position={[-1.16 + index * 0.25, -0.4 + height / 2, 0.15]} color={index < 3 ? palette.sky : palette.sage} />
      ))}
      <Box size={[1.61, 0.018, 0.014]} position={[-0.5, -0.43, 0.15]} color={palette.cream} />
      {[0.3, 0.02, -0.26].map((y, index) => (
        <group key={y} position={[0.89, y, 0.15]}>
          <Box size={[0.82, 0.15, 0.012]} color="#71617b" />
          <Box size={[0.58 - index * 0.12, 0.055, 0.012]} position={[-index * 0.06, 0, 0.016]} color={index === 1 ? palette.blush : palette.gold} />
        </group>
      ))}
      <Box size={[2.7, 0.06, 0.014]} position={[0, -0.65, 0.15]} color={palette.lavenderShadow} />
      <group position={reportOffset}>
        <Box size={[1.92, 0.12, 1.22]} position={[0, -0.06, 0]} color={palette.white} />
        {[-0.72, 0.72].map((x) => (
          <Box key={x} size={[0.12, 0.605, 0.91]} position={[x, -0.4225, 0]} color={palette.woodDark} />
        ))}
        {[0, 1, 2].map((index) => (
          <group key={index} position={[0.43, 0.045 + index * 0.09, 0.08]} rotation={[0, (index - 1) * 0.07, 0]}>
            <Box size={[0.61, 0.075, 0.72]} color={palette.cream} />
            <Box size={[0.65, 0.025, 0.76]} position={[0, 0.05, 0]} color={index === 1 ? palette.blush : palette.lavenderShadow} hovered={hovered} />
          </group>
        ))}
        <group position={[-0.44, 0.45, -0.08]} rotation={[-0.2, 0, -0.06]}>
          <Box size={[0.68, 0.84, 0.07]} color={palette.woodDark} hovered={hovered} />
          <Box size={[0.59, 0.74, 0.025]} position={[0, 0, 0.05]} color={palette.cream} hovered={hovered} />
          <Box size={[0.38, 0.06, 0.01]} position={[-0.04, 0.24, 0.07]} color={palette.lavenderShadow} />
          {[0.13, 0.23, 0.32].map((height, index) => (
            <Box key={index} size={[0.09, height, 0.012]} position={[-0.15 + index * 0.15, -0.22 + height / 2, 0.07]} color={palette.sage} />
          ))}
        </group>
        <group position={[0.38, 0.355, 0.12]} rotation={[-Math.PI / 2, 0, 0.06]}>
          <Box size={[0.51, 0.63, 0.035]} color={palette.sky} hovered={hovered} />
          <Box size={[0.04, 0.63, 0.02]} position={[-0.19, 0, 0.025]} color={palette.woodDark} />
          <Box size={[0.27, 0.13, 0.01]} position={[0.025, 0.1, 0.025]} color={palette.cream} />
        </group>
      </group>
    </group>
  )
}
