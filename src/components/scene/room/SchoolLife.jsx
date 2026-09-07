import { Material, palette } from './materials'
import PortfolioObject from '../PortfolioObject'
import { Image } from '@react-three/drei'

const schoolObjectVisuals = {
  'science-club': ({ hovered }) => <MascotCard name="school-science-mascot" url="/room-assets/nus-mascot.png" scale={[0.72, 0.72, 1]} hovered={hovered} />,
  'rc4-flag': ({ hovered }) => <MascotCard name="school-rc4-mascot" url="/room-assets/rc4-oscar.png" scale={[0.6, 0.69, 1]} hovered={hovered} />,
  ucla: ({ hovered }) => <MascotCard name="school-ucla-mascot" url="/room-assets/ucla-bruin.png" scale={[0.88, 0.5, 1]} hovered={hovered} />,
}

const schoolObjectPositions = {
  'science-club': [-1.25, 0, 0.04],
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

function MascotCard({ name, url, scale, hovered }) {
  return (
    <group>
      <Shelf size={[1.02, 0.98, 0.05]} position={[0, 0.43, 0]} color={palette.cream} />
      <Image name={name} url={url} scale={scale} position={[0, 0.44, 0.034]} transparent opacity={hovered ? 1 : 0.94} />
    </group>
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
