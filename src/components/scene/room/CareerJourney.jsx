import { Material, palette } from './materials'
import PortfolioObject from '../PortfolioObject'
import { Image } from '@react-three/drei'

function Box({ size, color, hovered = false, ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <boxGeometry args={size} />
      <Material color={color} hovered={hovered} />
    </mesh>
  )
}

const careerLogos = {
  ey: { name: 'experience-logo-ey', url: '/room-assets/ey-logo.png' },
  shopee: { name: 'experience-logo-shopee', url: '/room-assets/shopee-logo.png' },
  uob: { name: 'experience-logo-uob', url: '/room-assets/uob-logo.png' },
}

export function CareerJourney({ items = [], onSelect } = {}) {
  return (
    <group name="experience-board" position={[0, 3.38, -5.28]}>
      <Box size={[3.56, 1.56, 0.08]} color={palette.woodDark} />
      <Box size={[3.36, 1.36, 0.025]} position={[0, 0, 0.055]} color={palette.cream} />
      {items.map((item, index) => {
        const logo = careerLogos[item.id]
        const [x, color] = [
          [-1.08, palette.lightLavender], [0, palette.cream], [1.08, palette.purpleFurniture],
        ][index]
        return (
          <group key={item.id} name="experience-card" position={[x, 0, 0.08]}>
            <PortfolioObject item={item} label={item.interactiveLabel} position={[0, 0, 0.03]} onSelect={onSelect}>
              {(hovered) => (
                <group>
                  <Box size={[0.82, 1.04, 0.022]} color={color} hovered={hovered} />
                  <Image name={logo.name} url={logo.url} scale={[0.7, 0.66, 1]} position={[0, 0.03, 0.018]} transparent />
                </group>
              )}
            </PortfolioObject>
          </group>
        )
      })}
    </group>
  )
}
