import { roomLayout } from '../../../data/roomLayout'
import { Material, palette } from './materials'

function Box({ size, color = palette.white, ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <boxGeometry args={size} />
      <Material color={color} />
    </mesh>
  )
}

function Plant({ trailing = false, potColor = palette.blush, ...props }) {
  return (
    <group {...props}>
      <mesh castShadow position={[0, 0.21, 0]}>
        <cylinderGeometry args={[0.25, 0.19, 0.42, 8]} />
        <Material color={potColor} />
      </mesh>
      <mesh position={[0, 0.422, 0]}>
        <cylinderGeometry args={[0.21, 0.21, 0.016, 8]} />
        <Material color={palette.woodDark} />
      </mesh>
      {Array.from({ length: 7 }, (_, index) => {
        const angle = index * Math.PI * 2 / 7
        return (
          <group key={index} position={[Math.sin(angle) * 0.12, 0.62 + index % 3 * 0.07, Math.cos(angle) * 0.12]} rotation={[0, angle, -0.45]}>
            <Box size={[0.045, 0.46, 0.045]} color="#677c65" />
            <Box size={[0.19, 0.37, 0.075]} position={[0.04, 0.12, 0]} rotation={[0.1, 0, -0.2]} color={index % 2 ? palette.sage : '#98a78a'} />
          </group>
        )
      })}
      {trailing && [0, 1, 2, 3, 4, 5].map((index) => (
        <group key={index} position={[0.16 + Math.sin(index * 1.1) * 0.08, 0.34 - index * 0.17, 0.28 + index * 0.025]}>
          <Box size={[0.03, 0.21, 0.03]} color="#677c65" />
          <Box size={[0.19, 0.15, 0.055]} rotation={[0.2, 0, index % 2 ? 0.6 : -0.6]} color={index % 2 ? palette.sage : '#98a78a'} />
        </group>
      ))}
    </group>
  )
}

function BookStack(props) {
  return (
    <group {...props}>
      {[palette.sage, palette.blush, palette.lavenderShadow].map((color, index) => (
        <group key={color} position={[0, 0.075 + index * 0.16, 0]} rotation={[0, (index - 1) * 0.08, 0]}>
          <Box size={[0.72, 0.15, 0.53]} color={color} />
          <Box size={[0.66, 0.09, 0.49]} position={[0.025, 0, 0.028]} color={palette.cream} />
        </group>
      ))}
    </group>
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
        <Plant position={[-0.84, 0.71, 0.02]} scale={0.62} trailing />
        <Box size={[0.62, 0.32, 0.4]} position={[0.49, 1.47, 0]} color="#bdafa8" />
        <Box size={[0.67, 0.055, 0.43]} position={[0.49, 1.65, 0]} color={palette.cream} />
      </group>

      {/* Accessories use the desk anchor; the central laptop area stays clear. */}
      <group position={roomLayout.desk.position}>
        <group position={[1.77, 0.9, -0.39]}>
          <mesh castShadow position={[0, 0.045, 0]}>
            <cylinderGeometry args={[0.26, 0.29, 0.09, 12]} />
            <Material color={palette.gold} />
          </mesh>
          <mesh castShadow position={[0, 0.42, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.75, 8]} />
            <Material color={palette.gold} />
          </mesh>
          <mesh castShadow position={[0, 0.91, 0]} rotation={[0.15, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.36, 0.4, 10]} />
            <Material color={palette.blush} />
          </mesh>
          <mesh position={[0, 0.71, 0.03]}>
            <cylinderGeometry args={[0.3, 0.3, 0.02, 10]} />
            <Material color="#ffe1b5" emissive="#ffd4a3" emissiveIntensity={0.3} />
          </mesh>
        </group>
        <BookStack position={[-1.35, 0.9, 0.25]} />
        <Plant position={[-1.96, 0.9, -0.48]} scale={0.65} potColor={palette.cream} />
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
        <Plant position={[-1.85, 0.55, 0.12]} scale={0.58} potColor={palette.cream} />
        <Plant position={[1.85, 0.55, 0.05]} scale={0.6} />
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
      <group position={roomLayout.rug.position}>
        <group position={[0.3, 0.18, 1.13]} rotation={[0, -0.2, 0]}>
          <Box size={[1.08, 0.24, 0.86]} color={palette.blush} />
          <Box size={[0.96, 0.1, 0.75]} position={[0, 0.14, 0]} color="#dfb2b5" />
          <Box size={[0.1, 0.025, 0.09]} position={[0, 0.202, 0]} color="#c58c98" />
        </group>
      </group>
    </group>
  )
}
