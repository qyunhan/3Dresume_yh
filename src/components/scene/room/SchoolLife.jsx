import { Material, palette } from './materials'
import PortfolioObject from '../PortfolioObject'
import { PhotoFrame, Trophy } from './LowPolyProps'

const schoolObjectVisuals = {
  nus: ({ hovered }) => <PhotoFrame name="school-nus-frame" frameColor={palette.gold} photoColor={palette.lavenderShadow} hovered={hovered} />,
  'rc4-flag': ({ hovered }) => <Trophy name="school-trophy" hovered={hovered} />,
  ucla: ({ hovered }) => <PhotoFrame name="school-ucla-frame" frameColor={palette.woodDark} photoColor={palette.sky} hovered={hovered} />,
}

const schoolObjectPositions = {
  nus: [-1.25, 0, 0.04],
  'rc4-flag': [0.05, 0, 0.06],
  ucla: [1.25, 0, 0.04],
}

function Shelf({ size, color, ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <boxGeometry args={size} />
      <Material color={color} />
    </mesh>
  )
}

export function SchoolLife({ items = [], onSelect } = {}) {
  return (
    <group name="school-shelf" position={[-2.4, 5.02, -5.28]}>
      <Shelf size={[4.4, 0.12, 0.46]} position={[0, -0.1, 0]} color={palette.woodDark} />
      {items.map((item) => {
        const ObjectVisual = schoolObjectVisuals[item.id]
        return (
          <PortfolioObject key={item.id} item={item} label={item.interactiveLabel} position={schoolObjectPositions[item.id]} onSelect={onSelect}>
            {(hovered) => <ObjectVisual hovered={hovered} />}
          </PortfolioObject>
        )
      })}
    </group>
  )
}
