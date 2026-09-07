import { Material, palette } from './materials'
import PortfolioObject from '../PortfolioObject'
import { Image } from '@react-three/drei'
import { roomAsset } from '../../../data/roomAssets'

const schoolObjectVisuals = {
  'science-club': ({ hovered }) => <FramedSchoolImage name="school-science-mascot" url={roomAsset('nus-mascot.png')} scale={[0.8, 0.8, 1]} hovered={hovered} />,
  'rc4-flag': ({ hovered }) => <FramedSchoolImage name="school-rc4-orca" url={roomAsset('orca-frame.png')} scale={[0.8, 0.8, 1]} hovered={hovered} />,
  ucla: ({ hovered }) => <FramedSchoolImage name="school-ucla-mascot" url={roomAsset('ucla-bruin.png')} scale={[0.8, 0.8, 1]} hovered={hovered} />,
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

function FramedSchoolImage({ name, url, scale, hovered }) {
  return (
    <group name="school-photo-frame">
      <Shelf name="school-frame-top" size={[0.98, 0.07, 0.06]} position={[0, 0.98, 0.02]} color={palette.woodLight} />
      <Shelf name="school-frame-bottom" size={[0.98, 0.07, 0.06]} position={[0, -0.02, 0.02]} color={palette.woodLight} />
      <Shelf name="school-frame-left" size={[0.07, 1.07, 0.06]} position={[-0.455, 0.48, 0.02]} color={palette.woodLight} />
      <Shelf name="school-frame-right" size={[0.07, 1.07, 0.06]} position={[0.455, 0.48, 0.02]} color={palette.woodLight} />
      <Image name={name} url={url} scale={scale} position={[0, 0.48, 0.06]} transparent opacity={hovered ? 1 : 0.94} />
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
