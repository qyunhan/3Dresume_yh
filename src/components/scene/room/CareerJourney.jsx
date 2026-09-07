import { Material, palette } from './materials'
import PortfolioObject from '../PortfolioObject'

function Box({ size, color, hovered = false, ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <boxGeometry args={size} />
      <Material color={color} hovered={hovered} />
    </mesh>
  )
}

function Cylinder({ size, color, hovered = false, ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <cylinderGeometry args={size} />
      <Material color={color} hovered={hovered} />
    </mesh>
  )
}

const careerMementos = {
  ey: EyMemento,
  shopee: ShopeeMemento,
  uob: UobMemento,
}

export function CareerJourney({ items = [], onSelect } = {}) {
  return (
    <group name="experience-board" position={[0, 3.38, -5.28]}>
      <Box size={[3.56, 1.56, 0.08]} color={palette.woodDark} />
      <Box size={[3.36, 1.36, 0.025]} position={[0, 0, 0.055]} color={palette.cream} />
      {items.map((item, index) => {
        const Component = careerMementos[item.id]
        const [x, color] = [
          [-1.08, palette.lavenderShadow], [0, palette.blush], [1.08, palette.sky],
        ][index]
        return (
          <group key={item.id} name="experience-card" position={[x, 0, 0.08]}>
            <PortfolioObject item={item} label={item.interactiveLabel} position={[0, 0, 0.03]} onSelect={onSelect}>
              {(hovered) => (
                <group>
                  <Box size={[0.82, 1.04, 0.022]} color={color} hovered={hovered} />
                  <Component hovered={hovered} />
                </group>
              )}
            </PortfolioObject>
          </group>
        )
      })}
    </group>
  )
}

export function EyMemento({ hovered }) {
  return (
    <group>
      <Box size={[0.72, 0.07, 0.54]} position={[0, 0.035, 0]} color={palette.cream} hovered={hovered} />
      <Box size={[0.64, 0.035, 0.46]} position={[0, 0.087, 0]} color={palette.lavenderShadow} hovered={hovered} />
      <Box size={[0.24, 0.13, 0.024]} position={[-0.16, 0.117, 0.013]} color={palette.ink} />
      {[-0.17, -0.05, 0.07, 0.19].map((x, index) => (
        <Box key={x} size={[0.075, 0.07, 0.022]} position={[x, 0.117, -0.14]} color={index % 2 ? palette.cream : palette.blush} />
      ))}
      {[0.12, 0.22, 0.31].map((height, index) => (
        <Box key={height} size={[0.06, height, 0.02]} position={[0.15 + index * 0.11, 0.11 + height / 2, 0.115]} color={index === 1 ? palette.gold : palette.sage} />
      ))}
    </group>
  )
}

export function ShopeeMemento({ hovered }) {
  return (
    <group>
      <Box size={[0.64, 0.56, 0.48]} position={[0, 0.28, 0]} color={palette.blush} hovered={hovered} />
      <Box size={[0.68, 0.055, 0.52]} position={[0, 0.585, 0]} color={palette.cream} hovered={hovered} />
      <Box size={[0.09, 0.59, 0.5]} position={[0, 0.3, 0.005]} color={palette.gold} />
      <Box size={[0.68, 0.09, 0.5]} position={[0, 0.3, 0.005]} color={palette.gold} />
      <Cylinder size={[0.17, 0.17, 0.03, 10]} position={[0.18, 0.41, 0.252]} rotation={[Math.PI / 2, 0, 0]} color={palette.cream} />
    </group>
  )
}

export function UobMemento({ hovered }) {
  return (
    <group>
      <Box size={[0.82, 0.61, 0.055]} position={[0, 0.305, 0]} color={palette.sky} hovered={hovered} />
      <Box size={[0.72, 0.51, 0.018]} position={[0, 0.305, 0.038]} color={palette.cream} hovered={hovered} />
      {[-0.23, 0, 0.23].map((x, index) => (
        <group key={x} position={[x, 0.34, 0.06]}>
          <Cylinder size={[0.065, 0.065, 0.018, 8]} rotation={[Math.PI / 2, 0, 0]} color={index === 1 ? palette.gold : palette.sage} />
          {index < 2 && <Box size={[0.16, 0.025, 0.014]} position={[0.115, -0.07, 0]} color={palette.lavenderShadow} />}
        </group>
      ))}
      <Box size={[0.41, 0.035, 0.014]} position={[0, 0.12, 0.06]} color={palette.blush} />
    </group>
  )
}
