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
      <Box name="experience-board-frame" size={[4.2, 1.82, 0.08]} color={palette.wood} />
      <Box name="experience-corkboard" size={[3.94, 1.54, 0.025]} position={[0, 0, 0.055]} color={palette.woodLight} />
      <Box name="experience-pin-rail" size={[3.5, 0.018, 0.018]} position={[0, -0.62, 0.095]} color={palette.cream} />
      {[-1.28, 0, 1.28].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <Box name="experience-pin-stem" size={[0.035, 0.28, 0.035]} position={[0, -0.43, 0.03]} color={palette.cream} />
          <Cylinder name="experience-pin" args={[0.09, 0.09, 0.035, 16]} position={[0, -0.62, 0.12]} rotation={[Math.PI / 2, 0, 0]} color={palette.warmWhite} />
        </group>
      ))}
      {items.map((item, index) => {
        const logo = careerLogos[item.id]
        const x = [-1.28, 0, 1.28][index]
        return (
          <group key={item.id} name="experience-card" position={[x, 0, 0.08]}>
            <PortfolioObject item={item} label={item.interactiveLabel} position={[0, 0, 0.03]} onSelect={onSelect}>
              {(hovered) => (
                <group>
                  <Image name={logo.name} url={logo.url} scale={[0.74, 0.74, 1]} position={[0, 0.13, 0.018]} />
                </group>
              )}
            </PortfolioObject>
          </group>
        )
      })}
    </group>
  )
}
