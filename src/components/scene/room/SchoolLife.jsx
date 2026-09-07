import { Material, palette } from './materials'
import { PhotoFrame, StackedBooks, Trophy } from './LowPolyProps'

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
    <group name="school-shelf" position={[-2.4, 5.02, -5.28]}>
      <Box size={[4.4, 0.12, 0.46]} position={[0, -0.1, 0]} color={palette.woodDark} />
      <group name="school-nus" position={[-1.25, 0, 0.04]}>
        <StackedBooks count={3} colors={[palette.blush, palette.sage, palette.lavenderShadow]} scale={[0.78, 0.78, 0.78]} />
      </group>
      <group name="school-trophy" position={[0.05, 0, 0.06]}>
        <Trophy scale={[0.72, 0.72, 0.72]} />
      </group>
      <group name="school-ucla" position={[1.25, 0, 0.04]}>
        <PhotoFrame rotation={[0, 0, -0.14]} photoColor={palette.sky} />
      </group>
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
