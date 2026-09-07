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

function Cylinder({ args, color, ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <cylinderGeometry args={args} />
      <Material color={color} />
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
      <Box name="experience-board-frame" size={[4.62, 2.1, 0.08]} color={palette.wood} />
      <Box name="experience-corkboard" size={[4.34, 1.82, 0.025]} position={[0, 0, 0.055]} color={palette.woodLight} />
      <Box name="experience-pin-rail" size={[3.9, 0.018, 0.018]} position={[0, -0.72, 0.095]} color={palette.cream} />
      {[-1.45, 0, 1.45].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <Box name="experience-pin-stem" size={[0.035, 0.34, 0.035]} position={[0, -0.49, 0.03]} color={palette.cream} />
          <Cylinder name="experience-pin" args={[0.1, 0.1, 0.035, 16]} position={[0, -0.72, 0.12]} rotation={[Math.PI / 2, 0, 0]} color={palette.warmWhite} />
        </group>
      ))}
      {items.map((item, index) => {
        const logo = careerLogos[item.id]
        const x = [-1.45, 0, 1.45][index]
        return (
          <group key={item.id} name="experience-card" position={[x, 0, 0.08]}>
            <PortfolioObject item={item} label={item.interactiveLabel} position={[0, 0, 0.03]} onSelect={onSelect}>
              {(hovered) => (
                <group>
                  <Image name={logo.name} url={logo.url} scale={[0.86, 0.86, 1]} position={[0, 0.16, 0.018]} />
                </group>
              )}
            </PortfolioObject>
          </group>
        )
      })}
    </group>
  )
}
