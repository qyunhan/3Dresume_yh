import { Material, palette } from './materials'
import PortfolioObject from '../PortfolioObject'
import { NusLion, Orca, RoyceHall } from './SchoolModels'

// Each shelf piece is a shadow box: stepped molding, a recessed backdrop, and a
// hand-built low-poly diorama sitting on an interior ledge that catches shade.
const schoolScenes = {
  'science-club': { Model: NusLion, backdrop: '#BBD8EE', ground: '#8FB07A', tilt: 0.16, lean: -0.05 },
  'rc4-flag': { Model: Orca, backdrop: '#A6C8E2', ground: '#6E9CBD', tilt: -0.02, lean: -0.04 },
  ucla: { Model: RoyceHall, backdrop: '#C6DCF0', ground: '#8FA86E', tilt: -0.15, lean: -0.05 },
}

const schoolObjectPositions = {
  'science-club': [-1.42, 0, 0.05],
  'rc4-flag': [0, 0, 0.08],
  ucla: [1.42, 0, 0.05],
}

const frameWood = '#D8BC94'
const frameWoodDark = '#B0906A'
const frameWoodLight = '#E9D3AE'

function Slab({ size, color, hovered = false, ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <boxGeometry args={size} />
      <Material color={color} hovered={hovered} />
    </mesh>
  )
}

function ShadowBox({ scene, hovered }) {
  const { Model, backdrop, ground, tilt, lean } = scene

  return (
    <group name="school-photo-frame" rotation={[lean, tilt, 0]}>
      <Slab name="school-frame-depth" size={[1.06, 1.12, 0.04]} position={[0, 0.5, -0.11]} color={backdrop} />
      <Slab name="school-frame-ground" size={[1.02, 0.04, 0.2]} position={[0, -0.01, -0.02]} color={ground} />

      {/* Molding carries real thickness, so its inner reveal shades the box. */}
      <Slab name="school-frame-top" size={[1.22, 0.11, 0.28]} position={[0, 1.085, 0]} color={frameWoodLight} />
      <Slab name="school-frame-bottom" size={[1.22, 0.11, 0.28]} position={[0, -0.085, 0]} color={frameWood} />
      <Slab name="school-frame-left" size={[0.11, 1.29, 0.28]} position={[-0.555, 0.5, 0]} color={frameWoodLight} />
      <Slab name="school-frame-right" size={[0.11, 1.29, 0.28]} position={[0.555, 0.5, 0]} color={frameWoodDark} />

      {/* Front lip steps the profile down toward the glass line. */}
      <Slab name="school-frame-lip" size={[1.1, 0.045, 0.05]} position={[0, 1.005, 0.145]} color={frameWoodDark} />
      <Slab name="school-frame-lip" size={[1.1, 0.045, 0.05]} position={[0, -0.005, 0.145]} color={frameWoodLight} />
      <Slab name="school-frame-lip" size={[0.045, 1.1, 0.05]} position={[-0.5, 0.5, 0.145]} color={frameWoodLight} />
      <Slab name="school-frame-lip" size={[0.045, 1.1, 0.05]} position={[0.5, 0.5, 0.145]} color={frameWoodDark} />

      {/* Underside shadow line where the frame meets the shelf board. */}
      <Slab name="school-frame-foot" size={[1.16, 0.04, 0.22]} position={[0, -0.155, 0]} color={frameWoodDark} />

      {/* Depth is compressed so a full diorama fits behind the glass line. */}
      <group position={[0, 0.52, 0]} scale={[0.92, 0.92, 0.42]}>
        <Model hovered={hovered} />
      </group>
    </group>
  )
}

export function SchoolLife({ items = [], onSelect } = {}) {
  return (
    <group name="school-shelf" position={[-2.4, 5.02, -5.28]}>
      <Slab name="school-shelf-board" size={[4.7, 0.14, 0.52]} position={[0, -0.245, 0.02]} color={palette.warmWhite} />
      <Slab name="school-shelf-nose" size={[4.7, 0.07, 0.06]} position={[0, -0.34, 0.25]} color={frameWood} />
      <Slab name="school-shelf-cleat" size={[4.7, 0.1, 0.1]} position={[0, -0.36, -0.19]} color={frameWoodDark} />
      {[-1.72, 0, 1.72].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <Slab name="school-shelf-bracket" size={[0.1, 0.24, 0.1]} position={[0, -0.44, -0.15]} color={frameWoodDark} />
          <Slab name="school-shelf-bracket" size={[0.09, 0.09, 0.3]} position={[0, -0.38, -0.02]} rotation={[0.72, 0, 0]} color={frameWoodDark} />
        </group>
      ))}
      {items.map((item) => (
        <PortfolioObject
          key={item.id}
          item={item}
          label={item.interactiveLabel}
          position={schoolObjectPositions[item.id]}
          onSelect={onSelect}
        >
          {(hovered) => <ShadowBox scene={schoolScenes[item.id]} hovered={hovered} />}
        </PortfolioObject>
      ))}
    </group>
  )
}
