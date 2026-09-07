import { roomLayout } from '../../../data/roomLayout'
import { Material, palette } from './materials'

function Box({ size, color, ...props }) {
  return (
    <mesh receiveShadow {...props}>
      <boxGeometry args={size} />
      <Material color={color} />
    </mesh>
  )
}

function Window() {
  return (
    <group
      position={roomLayout.window.position}
      rotation={roomLayout.window.rotation}
    >
      <Box size={[3.8, 2.9, 0.16]} color={palette.lavenderShadow} />
      <Box size={[3.6, 2.72, 0.15]} position={[0, 0, 0.08]} color={palette.white} />
      {[-0.81, 0.81].map((x) => (
        <Box key={x} size={[1.48, 2.32, 0.04]} position={[x, 0, 0.18]} color="#f2ae79" />
      ))}
      <Box size={[3.02, 0.68, 0.02]} position={[0, 0.74, 0.205]} color="#f8d6a5" />
      <Box size={[3.02, 0.56, 0.02]} position={[0, 0.13, 0.207]} color="#ed9a7b" />
      <Box size={[3.02, 0.62, 0.02]} position={[0, -0.62, 0.209]} color="#b7778a" />
      {/* Shallow layers keep the view outside opaque and inexpensive. */}
      {[
        [-1.3, 0.5, '#9dabb7'],
        [-0.87, 0.8, '#8799a8'],
        [-0.4, 0.62, '#a2adb5'],
        [0.06, 0.92, '#91a0ad'],
        [0.53, 0.52, '#a2adb5'],
        [1.05, 0.72, '#8b9eaa'],
      ].map(([x, height, color]) => (
        <Box key={x} size={[0.4, height, 0.03]} position={[x, -1.13 + height / 2, 0.24]} color={color} />
      ))}
      {[-1.2, -0.92, 0.92, 1.23].map((x, index) => (
        <group key={x} position={[x, -0.88, 0.28]}>
          <Box size={[0.04, 0.48, 0.025]} color={palette.woodDark} />
          <Box size={[0.36, 0.46, 0.035]} position={[0, 0.2, 0.02]} rotation={[0, 0, index % 2 ? 0.35 : -0.25]} color={palette.sage} />
          <Box size={[0.26, 0.36, 0.035]} position={[0.1, 0.43, 0.025]} rotation={[0, 0, -0.2]} color="#8fa38b" />
        </group>
      ))}
      {[-1.67, 0, 1.67].map((x) => (
        <Box key={x} size={[0.12, 2.55, 0.12]} position={[x, 0, 0.31]} color={palette.white} />
      ))}
      <Box size={[3.4, 0.1, 0.12]} position={[0, -0.2, 0.31]} color={palette.white} />
      <Box size={[3.92, 0.16, 0.5]} position={[0, -1.45, 0.24]} color={palette.white} castShadow />
      <Box size={[3.76, 0.2, 0.23]} position={[0, 1.43, 0.25]} color={palette.cream} castShadow />
      {Array.from({ length: 5 }, (_, index) => (
        <Box key={index} size={[3.42, 0.1, 0.09]} position={[0, 1.28 - index * 0.105, 0.36]} color={index % 2 ? '#e1d8cc' : palette.cream} />
      ))}
      <Box size={[0.025, 0.88, 0.025]} position={[1.79, 0.76, 0.36]} color={palette.cream} />
    </group>
  )
}

function Door() {
  return (
    <group
      position={roomLayout.door.position}
      rotation={roomLayout.door.rotation}
    >
      <Box size={[1.94, 5.3, 0.18]} color={palette.lavenderShadow} />
      <Box size={[1.68, 5.13, 0.16]} position={[0, -0.07, 0.09]} color="#d4c6be" />
      {[-0.92, 0.92].map((x) => (
        <Box key={x} size={[0.12, 5.3, 0.18]} position={[x, 0, 0.21]} color={palette.white} />
      ))}
      <Box size={[1.98, 0.14, 0.18]} position={[0, 2.65, 0.21]} color={palette.white} />
      {[-1.22, 1.13].map((y) => (
        <group key={y} position={[0, y, 0.19]}>
          <Box size={[1.36, 1.96, 0.04]} color="#bdaca5" />
          <Box size={[1.23, 1.83, 0.05]} position={[0, 0, 0.025]} color="#ded2c8" />
        </group>
      ))}
      <Box size={[0.12, 0.32, 0.06]} position={[-0.61, -0.03, 0.23]} color={palette.gold} />
      <Box size={[0.3, 0.065, 0.09]} position={[-0.5, 0.02, 0.3]} color={palette.woodDark} />
    </group>
  )
}

export default function RoomShell() {
  const { width, depth, backWallZ } = roomLayout.room
  const height = 8
  const centerZ = backWallZ + depth / 2
  const floorDepth = depth + 5
  const floorCenterZ = backWallZ + floorDepth / 2
  const boardWidth = width / 14

  return (
    <group>
      <Box size={[width, 0.32, floorDepth]} position={[0, -0.185, floorCenterZ]} color={palette.wood} />
      {Array.from({ length: 14 }, (_, index) => (
        <group key={index}>
          <Box size={[boardWidth - 0.018, 0.05, depth]} position={[-width / 2 + boardWidth * (index + 0.5), 0, centerZ]} color={palette.wood} />
          <Box size={[0.018, 0.008, depth - 0.04]} position={[-width / 2 + boardWidth * index, 0.018, centerZ]} color={palette.lavenderShadow} />
          <Box size={[boardWidth - 0.025, 0.008, 0.016]} position={[-width / 2 + boardWidth * (index + 0.5), 0.024, centerZ + (index % 3 - 1) * 2.65]} color={palette.lavenderShadow} />
        </group>
      ))}
      <Box size={[width + 0.28, height, 0.28]} position={[0, height / 2, backWallZ - 0.14]} color={palette.lavender} />
      <Box size={[0.28, height, depth]} position={[-width / 2 - 0.14, height / 2, centerZ]} color={palette.lavender} />
      <Box size={[0.28, height, 2.2]} position={[width / 2 + 0.14, height / 2, backWallZ + 1.1]} color={palette.lavender} />
      <Box size={[width, 0.22, 0.12]} position={[0, 0.14, backWallZ + 0.06]} color={palette.white} />
      <Box size={[0.12, 0.22, depth]} position={[-width / 2 + 0.06, 0.14, centerZ]} color={palette.white} />
      <Box size={[0.12, 0.22, 2.2]} position={[width / 2 - 0.06, 0.14, backWallZ + 1.1]} color={palette.white} />
      <Window />
      <Door />
      {/* Opaque warm strips suggest the blind-filtered sun on exposed floor. */}
      {[0, 1, 2].map((index) => (
        <Box key={index} name="sun-patch" size={[0.22, 0.006, 2.4]} position={[-5.9 + index * 0.46, 0.033, -1.6]} rotation={[0, -0.65, 0]} color="#bd9065" />
      ))}
    </group>
  )
}
