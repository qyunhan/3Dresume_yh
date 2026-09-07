import { Material, palette } from './materials'

function Box({ size, color = palette.white, ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <boxGeometry args={size} />
      <Material color={color} />
    </mesh>
  )
}

function Cylinder({ args, color = palette.white, ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <cylinderGeometry args={args} />
      <Material color={color} />
    </mesh>
  )
}

function Book({ index, color }) {
  return (
    <group position={[0, 0.085 + index * 0.17, 0]} rotation={[0, (index - 1) * 0.08, 0]}>
      <Box size={[0.74, 0.15, 0.5]} color={color} />
      <Box size={[0.66, 0.09, 0.45]} position={[0.02, 0.01, 0.02]} color={palette.cream} />
    </group>
  )
}

export function StackedBooks({
  count = 3,
  colors = [palette.blush, palette.sage, palette.lavenderShadow],
  ...props
}) {
  return (
    <group {...props}>
      {Array.from({ length: count }, (_, index) => (
        <Book key={index} index={index} color={colors[index % colors.length]} />
      ))}
    </group>
  )
}

export function LowPolyPlant({ potColor = palette.blush, leafColor = palette.sage, ...props }) {
  return (
    <group {...props}>
      <Cylinder args={[0.25, 0.2, 0.42, 8]} color={potColor} position={[0, 0.21, 0]} />
      <Cylinder args={[0.21, 0.21, 0.02, 8]} color={palette.woodDark} position={[0, 0.425, 0]} />
      {Array.from({ length: 7 }, (_, index) => {
        const angle = index * Math.PI * 2 / 7
        return (
          <group key={index} position={[Math.sin(angle) * 0.1, 0.62 + (index % 3) * 0.07, Math.cos(angle) * 0.1]} rotation={[0, angle, -0.45]}>
            <Box size={[0.04, 0.42, 0.04]} color={palette.woodDark} />
            <Box size={[0.18, 0.34, 0.07]} position={[0.04, 0.11, 0]} rotation={[0.1, 0, -0.2]} color={leafColor} />
          </group>
        )
      })}
    </group>
  )
}

export function WallPlaque({ title, color = palette.gold, ...props }) {
  return (
    <group name={title} {...props}>
      <Box size={[1.08, 0.62, 0.08]} color={palette.woodDark} />
      <Box size={[0.96, 0.5, 0.03]} position={[0, 0, 0.055]} color={color} />
      {[0.2, 0, -0.2].map((y, index) => (
        <Box key={y} size={[0.62 - index * 0.11, 0.045, 0.018]} position={[0, y, 0.078]} color={palette.cream} />
      ))}
    </group>
  )
}

export function PhotoFrame({ frameColor = palette.woodDark, photoColor = palette.sky, ...props }) {
  return (
    <group {...props}>
      <Box size={[0.62, 0.78, 0.08]} color={frameColor} position={[0, 0.39, 0]} />
      <Box size={[0.5, 0.65, 0.025]} color={palette.cream} position={[0, 0.39, 0.055]} />
      <Box size={[0.4, 0.48, 0.018]} color={photoColor} position={[0, 0.41, 0.077]} />
      <Box size={[0.32, 0.055, 0.28]} color={frameColor} position={[0, 0.03, -0.06]} />
    </group>
  )
}

export function Trophy({ color = palette.gold, ...props }) {
  return (
    <group {...props}>
      <Cylinder args={[0.28, 0.32, 0.1, 8]} color={palette.woodDark} position={[0, 0.05, 0]} />
      <Cylinder args={[0.07, 0.07, 0.34, 8]} color={color} position={[0, 0.25, 0]} />
      <Cylinder args={[0.22, 0.12, 0.32, 8]} color={color} position={[0, 0.57, 0]} />
      <Box size={[0.42, 0.06, 0.07]} color={color} position={[0, 0.64, 0]} />
    </group>
  )
}

export function DeskLamp({ shadeColor = palette.blush, ...props }) {
  return (
    <group {...props}>
      <Cylinder args={[0.26, 0.3, 0.1, 10]} color={palette.gold} position={[0, 0.05, 0]} />
      <Cylinder args={[0.035, 0.035, 0.66, 8]} color={palette.gold} position={[0, 0.4, 0]} />
      <Cylinder args={[0.2, 0.34, 0.38, 10]} color={shadeColor} position={[0, 0.85, 0]} rotation={[0.15, 0, 0]} />
      <Cylinder args={[0.25, 0.25, 0.02, 10]} color={palette.cream} emissive={palette.cream} emissiveIntensity={0.35} position={[0, 0.69, 0.03]} />
    </group>
  )
}

export function FloorPouf({ color = palette.lavender, ...props }) {
  return (
    <group {...props}>
      <Cylinder args={[0.62, 0.7, 0.28, 10]} color={color} position={[0, 0.14, 0]} />
      <Cylinder args={[0.56, 0.62, 0.1, 10]} color={color} position={[0, 0.31, 0]} />
      <Cylinder args={[0.1, 0.1, 0.025, 8]} color={palette.lavenderShadow} position={[0, 0.375, 0]} />
    </group>
  )
}
