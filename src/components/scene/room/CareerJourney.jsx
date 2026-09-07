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

function Cylinder({ args, color, hovered = false, ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <cylinderGeometry args={args} />
      <Material color={color} hovered={hovered} />
    </mesh>
  )
}

const careerLogos = {
  ey: { name: 'experience-logo-ey', url: roomAsset('ey-logo.png') },
  shopee: { name: 'experience-logo-shopee', url: roomAsset('shopee-logo.png') },
  uob: { name: 'experience-logo-uob', url: roomAsset('uob-logo.png') },
}

// Cards stand off the cork on their pins with a slight lean, so the key light
// throws a real shadow behind each one instead of leaving them looking printed.
const cardPlacements = [
  { x: -1.28, tilt: 0.045, lean: 0.05 },
  { x: 0, tilt: -0.02, lean: 0.035 },
  { x: 1.28, tilt: 0.03, lean: 0.055 },
]

const cardEdge = '#DCCFC0'

export function CareerJourney({ items = [], onSelect } = {}) {
  return (
    <group name="experience-board" position={[0, 3.38, -5.28]}>
      {/* No two surfaces here may share a plane. Coplanar faces have no stable
          draw order, so they swap per-pixel and shimmer whenever the camera moves. */}
      <Box name="experience-board-frame" size={[4.2, 1.82, 0.08]} color={palette.wood} />
      <Box name="experience-corkboard" size={[3.94, 1.54, 0.025]} position={[0, 0, 0.055]} color={palette.woodLight} />
      <Box name="experience-pin-rail" size={[3.5, 0.018, 0.018]} position={[0, -0.62, 0.095]} color={palette.cream} />
      {cardPlacements.map(({ x }) => (
        <group key={x} position={[x, 0, 0]}>
          <Box name="experience-pin-stem" size={[0.035, 0.28, 0.035]} position={[0, -0.43, 0.09]} color={palette.cream} />
          <Cylinder name="experience-pin" args={[0.09, 0.09, 0.035, 16]} position={[0, -0.62, 0.12]} rotation={[Math.PI / 2, 0, 0]} color={palette.warmWhite} />
        </group>
      ))}
      {items.map((item, index) => {
        const logo = careerLogos[item.id]
        const { x, tilt, lean } = cardPlacements[index]
        return (
          <group key={item.id} name="experience-card" position={[x, 0.06, 0.13]} rotation={[lean, 0, tilt]}>
            <PortfolioObject item={item} label={item.interactiveLabel} position={[0, 0, 0]} onSelect={onSelect}>
              {(hovered) => (
                <group>
                  <Box name="experience-card-body" size={[0.94, 1.0, 0.08]} color={cardEdge} hovered={hovered} />
                  <Box name="experience-card-face" size={[0.88, 0.94, 0.03]} position={[0, 0, 0.035]} color={palette.warmWhite} hovered={hovered} />
                  <Cylinder name="experience-card-pin" args={[0.05, 0.05, 0.06, 10]} position={[0, 0.41, 0.09]} rotation={[Math.PI / 2, 0, 0]} color={palette.gold} />
                  <Image name={logo.name} url={logo.url} scale={[0.88, 0.88, 1]} position={[0, -0.02, 0.062]} />
                </group>
              )}
            </PortfolioObject>
          </group>
        )
      })}
    </group>
  )
}
