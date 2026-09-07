import { Material, palette } from './materials'
import { StackedBooks } from './LowPolyProps'

function Box({ size, color = palette.white, ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <boxGeometry args={size} />
      <Material color={color} />
    </mesh>
  )
}

export function Desk(props) {
  // The layout anchor is at y=1.35; the finished desktop is at y=2.25.
  return (
    <group {...props}>
      <Box size={[4.8, 0.24, 1.75]} position={[0, 0.78, 0]} />
      <Box size={[4.62, 0.09, 1.59]} position={[0, 0.615, 0]} color="#ded6cd" />
      {[-0.65, 0.65].map((z) => (
        <Box key={z} size={[0.14, 1.91, 0.14]} position={[-2.11, -0.335, z]} />
      ))}
      <Box size={[0.14, 0.14, 1.44]} position={[-2.11, -1.22, 0]} />
      <Box size={[0.14, 0.14, 1.44]} position={[-2.11, 0.55, 0]} />
      <Box size={[1.22, 1.9, 1.49]} position={[1.58, -0.335, 0]} color="#ddd6ce" />
      <Box size={[1.05, 0.12, 1.28]} position={[1.58, -1.28, 0]} color={palette.lavenderShadow} />
      {[-0.94, -0.32, 0.3].map((y) => (
        <group key={y} position={[1.58, y, 0.77]}>
          <Box size={[1.1, 0.56, 0.09]} />
          <Box size={[0.38, 0.045, 0.055]} position={[0, 0.14, 0.085]} color="#938b86" />
        </group>
      ))}
      <Box size={[4.48, 0.14, 0.08]} position={[0, 0.94, -0.8]} color="#ded6cd" />
      <StackedBooks position={[-1.35, 0.9, 0.25]} />
    </group>
  )
}

export function OfficeChair(props) {
  return (
    <group {...props}>
      <group rotation={[0, -0.14, 0]}>
        <Box size={[1.26, 0.15, 1.13]} position={[0, 0.07, 0]} color={palette.lavenderShadow} />
        <Box size={[1.18, 0.17, 1.06]} position={[0, 0.22, -0.015]} color={palette.cream} />
        <group position={[0, 0.97, 0.48]} rotation={[-0.08, 0, 0]}>
          <Box size={[1.22, 1.42, 0.16]} color={palette.lavenderShadow} />
          <Box size={[1.1, 1.27, 0.12]} position={[0, 0.015, -0.115]} color={palette.cream} />
          <Box size={[1.02, 0.25, 0.05]} position={[0, -0.38, -0.19]} color="#e0d5c4" />
        </group>
        {[-0.43, 0.43].map((x) => (
          <Box key={x} size={[0.08, 0.79, 0.08]} position={[x, 0.43, 0.47]} color="#716b72" />
        ))}
        <mesh castShadow position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.1, 0.13, 0.78, 10]} />
          <Material color="#817b7d" />
        </mesh>
        <mesh castShadow position={[0, -0.72, 0]}>
          <cylinderGeometry args={[0.18, 0.2, 0.25, 10]} />
          <Material color={palette.lavenderShadow} />
        </mesh>
        {Array.from({ length: 5 }, (_, index) => (
          <group key={index} rotation={[0, index * Math.PI * 2 / 5, 0]}>
            <Box size={[0.12, 0.1, 0.76]} position={[0, -0.83, 0.35]} color="#716b72" />
            <Box size={[0.1, 0.12, 0.08]} position={[0, -0.88, 0.7]} color="#716b72" />
            <mesh castShadow position={[0, -0.915, 0.7]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.11, 0.11, 0.14, 10]} />
              <Material color={palette.ink} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  )
}

export function MediaConsole(props) {
  return (
    <group {...props}>
      <Box size={[4.1, 0.15, 1.3]} position={[0, 0.475, 0]} />
      <Box size={[4.1, 0.13, 1.3]} position={[0, -0.835, 0]} />
      <Box size={[3.86, 1.2, 0.08]} position={[0, -0.18, -0.59]} color={palette.woodDark} />
      {[-1.98, -0.84, 0.84, 1.98].map((x) => (
        <Box key={x} size={[0.13, 1.18, 1.22]} position={[x, -0.18, 0]} />
      ))}
      {[-1.41, 1.41].map((x) => (
        <group key={x} position={[x, -0.18, 0.63]}>
          <Box size={[0.99, 1.16, 0.1]} color="#e8e1d8" />
          <Box size={[0.84, 1.0, 0.035]} position={[0, 0, 0.065]} />
          <Box size={[0.045, 0.3, 0.06]} position={[x < 0 ? 0.3 : -0.3, 0.1, 0.11]} color="#938b86" />
        </group>
      ))}
      <Box size={[1.55, 0.08, 1.15]} position={[0, -0.4, 0]} />
      <Box size={[1.55, 0.07, 1.15]} position={[0, -0.03, 0]} />
      {[-0.4, 0.4].map((x) => (
        <group key={x} position={[x, -0.605, 0.64]}>
          <Box size={[0.73, 0.32, 0.1]} color="#e8e1d8" />
          <Box size={[0.24, 0.035, 0.06]} position={[0, 0.04, 0.08]} color="#938b86" />
        </group>
      ))}
      <Box size={[1.02, 0.17, 0.67]} position={[-0.13, 0.1, 0.09]} color={palette.ink} />
      <Box size={[0.49, 0.025, 0.02]} position={[-0.27, 0.1, 0.44]} color="#79757d" />
      <Box size={[0.04, 0.035, 0.02]} position={[0.28, 0.1, 0.44]} color={palette.sage} />
      <Box size={[1.26, 0.15, 0.69]} position={[0, -0.285, 0.1]} color="#a19b9b" />
      <Box size={[0.48, 0.035, 0.025]} position={[0, -0.285, 0.46]} color={palette.ink} />
      {[-1.72, 1.72].map((x) => (
        <Box key={x} size={[0.23, 0.125, 1.0]} position={[x, -0.9625, 0]} color={palette.woodDark} />
      ))}
    </group>
  )
}
