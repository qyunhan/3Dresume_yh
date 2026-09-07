import { Material } from './materials'

// Hand-built low-poly dioramas for the shelf frames. Faceted primitives only,
// so they light and shade like the rest of the room instead of reading as
// pasted artwork on a plane.
export const tone = {
  furTan: '#F0C57C',
  furShade: '#DDAA5D',
  maneBlue: '#3157A6',
  maneBlueDark: '#26468A',
  jersey: '#F7F2EA',
  ink: '#2B2730',
  orcaBlack: '#33373F',
  orcaBlackDark: '#272B32',
  orcaBelly: '#F4F1EA',
  brick: '#C08055',
  brickDark: '#A8673F',
  stone: '#E4D2BC',
  roof: '#9A5B49',
  bruinBlue: '#2B57A6',
  leaf: '#6E8A5C',
  leafDark: '#5A7450',
  cloud: '#FBF7F1',
  lawn: '#7E9A63',
  glassBlue: '#7FA5C4',
}

function Box({ size, color, hovered = false, ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <boxGeometry args={size} />
      <Material color={color} hovered={hovered} />
    </mesh>
  )
}

function Sphere({ args, color, hovered = false, ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <sphereGeometry args={args} />
      <Material color={color} hovered={hovered} />
    </mesh>
  )
}

function Cone({ args, color, hovered = false, ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <coneGeometry args={args} />
      <Material color={color} hovered={hovered} />
    </mesh>
  )
}

function Bush({ radius, ...props }) {
  return <Sphere args={[radius, 6, 4]} color={tone.leaf} {...props} />
}

function Cloud({ scale = 1, ...props }) {
  return (
    <group {...props} scale={scale}>
      <Sphere args={[0.075, 6, 4]} color={tone.cloud} />
      <Sphere args={[0.055, 6, 4]} color={tone.cloud} position={[0.08, -0.015, 0.01]} />
      <Sphere args={[0.05, 6, 4]} color={tone.cloud} position={[-0.075, -0.02, -0.01]} />
    </group>
  )
}

export function NusLion({ hovered }) {
  return (
    <group name="nus-lion-model">
      {/* Campus block set back so the mascot casts onto it. */}
      <Box size={[0.32, 0.46, 0.09]} position={[0.33, -0.02, -0.14]} color={tone.stone} />
      <Box size={[0.34, 0.06, 0.1]} position={[0.33, 0.23, -0.135]} color={tone.cloud} />
      {[-0.07, 0.07].map((x) => (
        <Box key={x} size={[0.08, 0.16, 0.03]} position={[0.33 + x, 0.02, -0.09]} color={tone.glassBlue} />
      ))}
      <Cloud position={[-0.28, 0.4, -0.12]} scale={0.9} />
      <Bush radius={0.13} position={[-0.36, -0.3, -0.06]} />
      <Bush radius={0.1} position={[0.42, -0.32, -0.04]} />

      <group position={[-0.05, 0.02, 0.06]}>
        {/* Mane: faceted wedges ringing the head. */}
        {Array.from({ length: 12 }, (_, index) => {
          const angle = (index / 12) * Math.PI * 2
          return (
            <Cone
              key={index}
              args={[0.08, 0.16, 5]}
              position={[Math.cos(angle) * 0.235, 0.12 + Math.sin(angle) * 0.235, -0.03]}
              rotation={[0, 0, angle - Math.PI / 2]}
              color={index % 2 ? tone.maneBlue : tone.maneBlueDark}
            />
          )
        })}
        <Box size={[0.3, 0.3, 0.19]} position={[0, -0.26, 0.01]} color={tone.jersey} hovered={hovered} />
        {[-0.07, 0, 0.07].map((x) => (
          <Box key={x} size={[0.035, 0.06, 0.02]} position={[x, -0.24, 0.105]} color={tone.maneBlue} />
        ))}
        {[-0.09, 0.09].map((x) => (
          <Box key={x} size={[0.1, 0.13, 0.11]} position={[x, -0.46, 0.005]} color={tone.furShade} />
        ))}
        <Box size={[0.095, 0.24, 0.09]} position={[-0.21, -0.26, 0.03]} rotation={[0, 0, 0.2]} color={tone.furTan} />
        <Sphere args={[0.062, 6, 4]} position={[-0.25, -0.39, 0.03]} color={tone.furTan} />
        <Box size={[0.095, 0.28, 0.09]} position={[0.25, -0.19, 0.03]} rotation={[0, 0, -0.55]} color={tone.furTan} />
        <Sphere args={[0.068, 6, 4]} position={[0.33, -0.05, 0.03]} color={tone.furTan} />
        {[-0.14, 0.14].map((x) => (
          <Sphere key={x} args={[0.055, 6, 4]} position={[x, 0.29, 0]} color={tone.furShade} />
        ))}
        <Sphere name="school-science-mascot" args={[0.215, 8, 6]} position={[0, 0.12, 0.03]} color={tone.furTan} hovered={hovered} />
        <Sphere args={[0.105, 7, 5]} position={[0, 0.05, 0.16]} color={tone.jersey} />
        <Box size={[0.055, 0.04, 0.05]} position={[0, 0.1, 0.24]} color={tone.ink} />
        <Box size={[0.09, 0.022, 0.03]} position={[0, 0.005, 0.23]} color={tone.ink} />
        {[-0.08, 0.08].map((x) => (
          <Sphere key={x} args={[0.034, 6, 4]} position={[x, 0.17, 0.185]} color={tone.ink} />
        ))}
      </group>
    </group>
  )
}

export function Orca({ hovered }) {
  return (
    <group name="rc4-orca-model">
      <Box size={[1.0, 0.36, 0.1]} position={[0, -0.32, -0.13]} color={tone.glassBlue} />
      {[-0.34, 0.36].map((x, index) => (
        <Sphere key={x} args={[index ? 0.19 : 0.24, 6, 4]} position={[x, -0.15, -0.15]} color={index ? tone.leafDark : tone.leaf} />
      ))}
      <Cloud position={[-0.3, 0.42, -0.12]} scale={0.85} />
      <Cloud position={[0.32, 0.34, -0.12]} scale={0.65} />

      <group position={[0, 0.02, 0.06]}>
        <Cone args={[0.1, 0.26, 4]} position={[0.04, 0.32, -0.11]} rotation={[0.25, 0, -0.28]} color={tone.orcaBlackDark} />
        {[-1, 1].map((side) => (
          <Cone
            key={side}
            args={[0.09, 0.24, 4]}
            position={[side * 0.16, -0.4, -0.02]}
            rotation={[0, 0, side * 2.2]}
            scale={[1, 1, 0.45]}
            color={tone.orcaBlackDark}
          />
        ))}
        <Cone args={[0.075, 0.28, 4]} position={[-0.31, 0.12, 0.04]} rotation={[0, 0, 0.85]} scale={[1, 1, 0.5]} color={tone.orcaBlackDark} />
        <Cone args={[0.075, 0.26, 4]} position={[0.31, -0.14, 0.04]} rotation={[0, 0, -2.3]} scale={[1, 1, 0.5]} color={tone.orcaBlackDark} />
        <Sphere name="school-rc4-orca" args={[0.3, 9, 7]} scale={[1.15, 0.95, 0.85]} color={tone.orcaBlack} hovered={hovered} />
        <Sphere args={[0.25, 8, 6]} scale={[0.95, 0.78, 0.62]} position={[0, -0.11, 0.11]} color={tone.orcaBelly} hovered={hovered} />
        {[-1, 1].map((side) => (
          <Box key={side} size={[0.1, 0.055, 0.04]} position={[side * 0.115, 0.14, 0.22]} rotation={[0, 0, side * -0.35]} color={tone.orcaBelly} />
        ))}
        {[-1, 1].map((side) => (
          <Sphere key={side} args={[0.03, 6, 4]} position={[side * 0.125, 0.11, 0.24]} color={tone.ink} />
        ))}
        <Box size={[0.2, 0.028, 0.04]} position={[0, -0.03, 0.25]} color={tone.ink} />
        {[-1, 1].map((side) => (
          <Box key={side} size={[0.055, 0.028, 0.04]} position={[side * 0.115, 0.005, 0.24]} rotation={[0, 0, side * -0.6]} color={tone.ink} />
        ))}
      </group>
    </group>
  )
}

export function RoyceHall({ hovered }) {
  return (
    <group name="ucla-royce-model">
      <Cloud position={[-0.3, 0.42, -0.12]} scale={0.8} />
      <Cloud position={[0.31, 0.36, -0.12]} scale={0.6} />
      <Box size={[1.0, 0.2, 0.16]} position={[0, -0.42, -0.05]} color={tone.lawn} />
      {[-0.41, 0.42].map((x, index) => (
        <group key={x} position={[x, -0.2, -0.02]}>
          <Box size={[0.05, 0.14, 0.05]} color={tone.brickDark} />
          <Sphere args={[index ? 0.11 : 0.13, 6, 4]} position={[0, 0.17, 0]} color={index ? tone.leafDark : tone.leaf} />
        </group>
      ))}

      <group position={[0, 0.02, 0.04]}>
        <Box name="school-ucla-mascot" size={[0.44, 0.34, 0.2]} position={[0, -0.11, 0]} color={tone.brick} hovered={hovered} />
        {[-0.12, 0, 0.12].map((x) => (
          <Box key={x} size={[0.07, 0.14, 0.03]} position={[x, -0.16, 0.105]} color={tone.brickDark} />
        ))}
        <Box size={[0.46, 0.045, 0.22]} position={[0, 0.07, 0]} color={tone.stone} />
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 0.29, 0.06, 0]}>
            <Box size={[0.16, 0.52, 0.18]} color={tone.brick} hovered={hovered} />
            <Box size={[0.175, 0.04, 0.19]} position={[0, 0.2, 0]} color={tone.stone} />
            {[0.08, -0.02].map((y) => (
              <Box key={y} size={[0.045, 0.08, 0.03]} position={[0, y, 0.096]} color={tone.brickDark} />
            ))}
            <Cone args={[0.135, 0.15, 4]} position={[0, 0.335, 0]} rotation={[0, Math.PI / 4, 0]} color={tone.roof} />
          </group>
        ))}
        {[-0.06, 0.06].map((y, index) => (
          <Box key={y} size={[0.72 - index * 0.06, 0.035, 0.24 - index * 0.02]} position={[0, -0.31 - index * 0.04, 0.05]} color={tone.stone} />
        ))}
        <Box size={[0.3, 0.09, 0.035]} position={[0, -0.38, 0.15]} color={tone.cloud} />
        {[-0.09, -0.03, 0.03, 0.09].map((x) => (
          <Box key={x} size={[0.028, 0.05, 0.02]} position={[x, -0.38, 0.175]} color={tone.bruinBlue} />
        ))}
      </group>
    </group>
  )
}
