import { roomLayout } from '../../../data/roomLayout'
import { Material, palette } from './materials'

function Box({ size, color = palette.white, hovered = false, ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <boxGeometry args={size} />
      <Material color={color} hovered={hovered} />
    </mesh>
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
        <Box size={[0.62, 0.32, 0.4]} position={[0.49, 1.47, 0]} color="#bdafa8" />
        <Box size={[0.67, 0.055, 0.43]} position={[0.49, 1.65, 0]} color={palette.cream} />
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
