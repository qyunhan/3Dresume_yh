import { Material, palette } from './materials'
import PortfolioObject from '../PortfolioObject'
import { Image } from '@react-three/drei'
import { roomAsset } from '../../../data/roomAssets'

function Box({ size, color, hovered = false, ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <boxGeometry args={size} />
      <Material color={color} hovered={hovered} />
    </mesh>
  )
}

const careerLogos = {
  ey: { name: 'experience-logo-ey', url: roomAsset('ey-logo.png') },
  shopee: { name: 'experience-logo-shopee', url: roomAsset('shopee-logo.png') },
  uob: { name: 'experience-logo-uob', url: roomAsset('uob-logo.png') },
}

export function CareerJourney({ items = [], onSelect } = {}) {
  return (
    <group name="experience-board" position={[0, 3.38, -5.28]}>
      <Box size={[3.56, 1.56, 0.08]} color={palette.woodLight} />
      <Box size={[3.36, 1.36, 0.025]} position={[0, 0, 0.055]} color={palette.warmWhite} />
      {items.map((item, index) => {
        const logo = careerLogos[item.id]
        const x = [-1.08, 0, 1.08][index]
        return (
          <group key={item.id} name="experience-card" position={[x, 0, 0.08]}>
            <PortfolioObject item={item} label={item.interactiveLabel} position={[0, 0, 0.03]} onSelect={onSelect}>
              {(hovered) => (
                <group>
                  <Image name={logo.name} url={logo.url} scale={[0.68, 0.68, 1]} position={[0, 0.03, 0.018]} />
                </group>
              )}
            </PortfolioObject>
          </group>
        )
      })}
    </group>
  )
}
