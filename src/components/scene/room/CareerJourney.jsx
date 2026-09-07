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

const boardEdge = '#8E5B3E'
const boardHighlight = '#C48F68'
const cardEdge = '#DCCFC0'

export function CareerJourney({ items = [], onSelect } = {}) {
  return (
    <group name="experience-board" position={[0, 3.38, -5.28]}>
      <Box name="experience-board-frame" size={[4.34, 1.96, 0.2]} position={[0, 0, -0.04]} color={palette.wood} />
      {/* Raised molding rim: four rails with visible thickness and a front lip. */}
      <Box name="experience-board-rail" size={[4.34, 0.22, 0.3]} position={[0, 0.87, 0.01]} color={boardHighlight} />
      <Box name="experience-board-rail" size={[4.34, 0.22, 0.3]} position={[0, -0.87, 0.01]} color={palette.wood} />
      <Box name="experience-board-rail" size={[0.22, 1.96, 0.3]} position={[-2.06, 0, 0.01]} color={boardHighlight} />
      <Box name="experience-board-rail" size={[0.22, 1.96, 0.3]} position={[2.06, 0, 0.01]} color={boardEdge} />
      <Box name="experience-board-lip" size={[4.1, 0.05, 0.05]} position={[0, 0.74, 0.155]} color={boardEdge} />
      <Box name="experience-board-lip" size={[4.1, 0.05, 0.05]} position={[0, -0.74, 0.155]} color={boardHighlight} />
      <Box name="experience-board-lip" size={[0.05, 1.62, 0.05]} position={[-1.93, 0, 0.155]} color={boardHighlight} />
      <Box name="experience-board-lip" size={[0.05, 1.62, 0.05]} position={[1.93, 0, 0.155]} color={boardEdge} />
      {/* Cork sits clear of the backing slab's front face at 0.06; matching
          depths there make the two surfaces fight for pixels as the camera moves. */}
      <Box name="experience-corkboard" size={[3.9, 1.6, 0.05]} position={[0, 0, 0.1]} color={palette.woodLight} />
      <Box name="experience-pin-rail" size={[3.5, 0.03, 0.03]} position={[0, -0.62, 0.145]} color={palette.cream} />
      {cardPlacements.map(({ x }) => (
        <group key={x} position={[x, 0, 0]}>
          <Box name="experience-pin-stem" size={[0.04, 0.3, 0.04]} position={[0, -0.44, 0.145]} color={palette.cream} />
          <Cylinder name="experience-pin" args={[0.09, 0.09, 0.05, 12]} position={[0, -0.62, 0.19]} rotation={[Math.PI / 2, 0, 0]} color={palette.warmWhite} />
        </group>
      ))}
      {items.map((item, index) => {
        const logo = careerLogos[item.id]
        const { x, tilt, lean } = cardPlacements[index]
        return (
          <group key={item.id} name="experience-card" position={[x, 0.06, 0.19]} rotation={[lean, 0, tilt]}>
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
