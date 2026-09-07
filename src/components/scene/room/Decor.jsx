import { roomLayout } from '../../../data/roomLayout'
import { Material, palette } from './materials'
import { LowPolyPlant } from './LowPolyProps'

function Box({ size, color = palette.white, hovered = false, ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <boxGeometry args={size} />
      <Material color={color} hovered={hovered} />
    </mesh>
  )
}

export function AboutFrame({ hovered }) {
  return (
    <group>
      <Box size={[0.47, 0.62, 0.08]} position={[0, 0.31, 0]} color={palette.woodDark} />
      <Box size={[0.37, 0.52, 0.025]} position={[0, 0.31, 0.053]} color={palette.cream} hovered={hovered} />
      <Box size={[0.25, 0.3, 0.012]} position={[0, 0.35, 0.074]} color={palette.blush} hovered={hovered} />
      <Box size={[0.14, 0.18, 0.012]} position={[0.025, 0.3, 0.085]} rotation={[0, 0, 0.2]} color={palette.lavenderShadow} />
      <Box size={[0.29, 0.055, 0.25]} position={[0, 0.028, -0.05]} color={palette.woodDark} />
    </group>
  )
}

export default function Decor() {
  return (
    <group>
      <group position={roomLayout.shelves.position}>
        {[[-1.55, 0.65], [0.05, 1.25]].map(([x, y]) => (
          <group key={x} position={[x, y, 0]}>
            <Box size={[2.05, 0.12, 0.52]} />
            {[-0.72, 0.72].map((support) => (
              <Box key={support} size={[0.08, 0.23, 0.34]} position={[support, -0.16, -0.07]} color={palette.gold} />
            ))}
          </group>
        ))}
        <LowPolyPlant position={[-0.84, 0.71, 0.02]} scale={0.62} />
        <Box size={[0.62, 0.32, 0.4]} position={[0.49, 1.47, 0]} color="#bdafa8" />
        <Box size={[0.67, 0.055, 0.43]} position={[0.49, 1.65, 0]} color={palette.cream} />
      </group>

      {/* Accessories use the desk anchor; the central laptop area stays clear. */}
      <group position={roomLayout.desk.position}>
        <LowPolyPlant position={[-1.96, 0.9, -0.48]} scale={0.65} potColor={palette.cream} />
        <group position={[1.11, 0.9, 0.48]}>
          <mesh castShadow position={[0, 0.16, 0]}>
            <cylinderGeometry args={[0.15, 0.13, 0.32, 10]} />
            <Material color={palette.cream} />
          </mesh>
          <mesh position={[0, 0.323, 0]}>
            <cylinderGeometry args={[0.118, 0.118, 0.012, 10]} />
            <Material color={palette.woodDark} />
          </mesh>
          <Box size={[0.08, 0.055, 0.065]} position={[0.185, 0.27, 0]} color={palette.cream} />
          <Box size={[0.055, 0.19, 0.065]} position={[0.24, 0.19, 0]} color={palette.cream} />
          <Box size={[0.08, 0.055, 0.065]} position={[0.185, 0.105, 0]} color={palette.cream} />
        </group>
      </group>

      <group position={roomLayout.mediaConsole.position}>
        <LowPolyPlant position={[-1.85, 0.55, 0.12]} scale={0.58} potColor={palette.cream} />
      </group>
      <group position={roomLayout.desk.position}>
        {[0, 1].map((index) => (
          <group key={index} position={[-1.42, -1.13 + index * 0.34, 0]}>
            <Box size={[0.8, 0.3, 0.72]} color={index ? '#b7b3aa' : '#cbbda9'} />
            <Box size={[0.84, 0.05, 0.76]} position={[0, 0.15, 0]} color={palette.cream} />
            <Box size={[0.2, 0.085, 0.018]} position={[0, 0.015, 0.368]} color={palette.woodDark} />
          </group>
        ))}
      </group>
    </group>
  )
}
