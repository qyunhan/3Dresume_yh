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
