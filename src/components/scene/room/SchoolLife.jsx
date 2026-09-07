import { Material, palette } from './materials'
import { LowPolyPlant, PhotoFrame, StackedBooks, Trophy, WallPlaque } from './LowPolyProps'

function Box({ size, color, hovered = false, ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <boxGeometry args={size} />
      <Material color={color} hovered={hovered} />
    </mesh>
  )
}

function Cylinder({ size, color, hovered = false, metalness, roughness, ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <cylinderGeometry args={size} />
      <Material color={color} hovered={hovered} {...(metalness !== undefined && { metalness, roughness })} />
    </mesh>
  )
}

export function SchoolLife() {
  return (
    <group position={[-2.4, 5.02, -5.28]}>
      <Box size={[4.4, 0.12, 0.46]} position={[0, -0.1, 0]} color={palette.woodDark} />
      <StackedBooks count={3} colors={[palette.blush, palette.sage, palette.lavenderShadow]} position={[-0.65, 0, 0.04]} scale={[0.78, 0.78, 0.78]} />
      <WallPlaque title="NUS" color={palette.gold} position={[-0.92, 0.82, -0.015]} scale={[0.65, 0.65, 1]} />
      <Trophy position={[0.42, 0, 0.06]} scale={[0.72, 0.72, 0.72]} />
      <PhotoFrame position={[1.38, 0, 0.04]} rotation={[0, 0, -0.14]} photoColor={palette.sky} />
      <PhotoFrame position={[1.85, 0, 0.015]} rotation={[0, 0, 0.1]} frameColor={palette.gold} photoColor={palette.blush} scale={[0.76, 0.76, 0.76]} />
      <group position={[1.01, 0.04, 0.14]} rotation={[0, 0, 0.12]}>
        <Box size={[0.28, 0.18, 0.08]} color={palette.ink} />
        <Cylinder size={[0.065, 0.065, 0.025, 10]} position={[0.07, 0.03, 0.06]} rotation={[Math.PI / 2, 0, 0]} color={palette.gold} />
      </group>
      <group position={[1.96, 0.95, 0.03]} rotation={[0, 0, -0.2]}>
        <Box size={[0.36, 0.035, 0.025]} color={palette.cream} />
        <Box size={[0.16, 0.04, 0.025]} position={[-0.11, 0.06, 0]} rotation={[0, 0, 0.46]} color={palette.cream} />
        <Box size={[0.16, 0.04, 0.025]} position={[0.1, 0.06, 0]} rotation={[0, 0, -0.46]} color={palette.cream} />
      </group>
      <group position={[0.92, 0.2, 0.1]}>
        <Box size={[0.44, 0.3, 0.025]} color={palette.blush} />
        <Box size={[0.05, 0.52, 0.03]} position={[-0.17, 0.22, 0]} color={palette.gold} />
        <Box size={[0.2, 0.12, 0.03]} position={[0.1, 0.18, 0]} color={palette.cream} />
      </group>
      <LowPolyPlant trailing position={[-1.9, -0.04, 0.08]} scale={[0.62, 0.62, 0.62]} />
    </group>
  )
}

export function NusToken({ hovered }) {
  return (
    <group>
      {[palette.lavenderShadow, palette.blush, palette.sage].map((color, index) => (
        <Box key={color} size={[0.56, 0.13, 0.38]} position={[0, 0.065 + index * 0.14, 0]} rotation={[0, 0, (index - 1) * 0.08]} color={color} hovered={hovered} />
      ))}
      <Cylinder size={[0.15, 0.15, 0.05, 10]} position={[0.22, 0.49, 0]} color={palette.gold} hovered={hovered} />
    </group>
  )
}

export function Rc4Trophy({ hovered }) {
  return (
    <group>
      <Cylinder size={[0.25, 0.32, 0.1, 10]} position={[0, 0.05, 0]} color={palette.woodDark} />
      <Cylinder size={[0.06, 0.06, 0.42, 10]} position={[0, 0.3, 0]} color={palette.gold} hovered={hovered} metalness={0.3} roughness={0.5} />
      <Cylinder size={[0.24, 0.13, 0.25, 10]} position={[0, 0.59, 0]} color={palette.gold} hovered={hovered} metalness={0.3} roughness={0.5} />
      <Cylinder size={[0.11, 0.11, 0.06, 10]} position={[0, 0.77, 0]} color={palette.cream} />
    </group>
  )
}

export function ScienceClubToken({ hovered }) {
  return (
    <group>
      <Cylinder size={[0.18, 0.18, 0.38, 10]} position={[0, 0.19, 0]} color={palette.sky} hovered={hovered} />
      <Cylinder size={[0.11, 0.11, 0.16, 10]} position={[0, 0.46, 0]} color={palette.cream} hovered={hovered} />
      <Cylinder size={[0.18, 0.18, 0.04, 10]} position={[0, 0.55, 0]} color={palette.sage} />
      {[-0.12, 0.12].map((x) => (
        <Cylinder key={x} size={[0.055, 0.055, 0.06, 8]} position={[x, 0.24, 0.18]} rotation={[Math.PI / 2, 0, 0]} color={palette.gold} />
      ))}
    </group>
  )
}

export function UclaMemory({ hovered }) {
  return (
    <group>
      <Box size={[0.58, 0.68, 0.055]} position={[-0.08, 0.34, 0]} rotation={[0, 0, -0.08]} color={palette.cream} hovered={hovered} />
      <Box size={[0.45, 0.39, 0.016]} position={[-0.08, 0.42, 0.04]} rotation={[0, 0, -0.08]} color={palette.sky} hovered={hovered} />
      <Box size={[0.44, 0.1, 0.014]} position={[-0.08, 0.15, 0.045]} rotation={[0, 0, -0.08]} color={palette.blush} />
      <Box size={[0.28, 0.16, 0.12]} position={[0.26, 0.12, 0.11]} color={palette.ink} hovered={hovered} />
      <Cylinder size={[0.075, 0.075, 0.025, 10]} position={[0.26, 0.14, 0.18]} rotation={[Math.PI / 2, 0, 0]} color={palette.gold} />
    </group>
  )
}
