import { Material, palette } from './materials'
import { DeskLamp, LowPolyPlant } from './LowPolyProps'
import { Reports, Tv } from './PortfolioObjects'

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
      {[
        [-0.25, 0.45, 0.2], [-0.1, 0.49, -0.12], [0.06, 0.46, 0.18], [0.22, 0.54, -0.16],
      ].map(([x, y, tilt], index) => (
        <Box key={index} size={[0.19, 0.018, 0.01]} position={[x, y, 0.04]} rotation={[0, 0, tilt]} color={palette.gold} />
      ))}
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
      <Tv hovered={hovered} />
      <Reports hovered={hovered} position={reportOffset} />
      <DeskLamp position={[-1.36, -0.79, 0.15]} scale={0.62} />
      <LowPolyPlant position={[1.38, -0.84, 0.16]} scale={0.56} potColor={palette.cream} />
      <group position={[-0.38, -0.78, 0.2]} rotation={[-Math.PI / 2, 0, -0.08]}>
        <Box size={[0.62, 0.81, 0.05]} color={palette.woodDark} hovered={hovered} />
        <Box size={[0.54, 0.71, 0.018]} position={[0, 0, 0.042]} color={palette.cream} hovered={hovered} />
        {[0.16, 0.27, 0.37].map((height, index) => (
          <Box key={height} size={[0.1, height, 0.012]} position={[-0.16 + index * 0.16, -0.22 + height / 2, 0.055]} color={palette.sage} />
        ))}
      </group>
    </group>
  )
}
