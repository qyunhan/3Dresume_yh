import { Material, palette } from './materials'

function Box({ size, color, hovered = false, screen = false, ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <boxGeometry args={size} />
      <Material color={color} hovered={hovered} {...(screen && { emissive: color, emissiveIntensity: hovered ? 0.22 : 0.12 })} />
    </mesh>
  )
}

export function Laptop({ hovered }) {
  return (
    <group>
      <Box size={[1.48, 0.09, 0.96]} position={[0, 0.045, 0]} color="#bcb8c1" hovered={hovered} />
      <Box size={[1.4, 0.025, 0.88]} position={[0, 0.102, 0]} color="#e4dfe1" hovered={hovered} />
      {[0, 1, 2, 3].map((row) => (
        <group key={row} position={[0, 0.121, -0.22 + row * 0.105]}>
          {Array.from({ length: 10 }, (_, column) => (
            <Box key={column} size={[0.098, 0.012, 0.068]} position={[(column - 4.5) * 0.12, 0, 0]} color="#77707d" />
          ))}
        </group>
      ))}
      <Box size={[0.43, 0.012, 0.18]} position={[0, 0.121, 0.31]} color="#b7b0ba" />
      <group position={[0, 0.6, -0.46]} rotation={[-0.1, 0, 0]}>
        <Box size={[1.48, 1.02, 0.085]} color="#d8d3d8" hovered={hovered} />
        <Box size={[1.34, 0.87, 0.025]} position={[0, 0, 0.052]} color={palette.ink} />
        <Box size={[1.24, 0.75, 0.014]} position={[0, 0, 0.073]} color="#60566d" hovered={hovered} screen />
        {/* Abstract display blocks suggest a workspace without 3D text. */}
        <Box size={[0.26, 0.61, 0.008]} position={[-0.43, 0, 0.086]} color="#847389" />
        {[0.22, 0.07, -0.08].map((y, index) => (
          <Box key={y} size={[0.57 - index * 0.09, 0.045, 0.008]} position={[0.12, y, 0.086]} color={index % 2 ? palette.sage : palette.blush} />
        ))}
        <Box size={[0.045, 0.025, 0.008]} position={[0, 0.462, 0.05]} color={palette.ink} />
      </group>
    </group>
  )
}

export function Tv({ hovered }) {
  return (
    <group>
      <Box size={[3.35, 1.94, 0.16]} position={[0, 0, -0.05]} color="#514956" />
      <Box size={[3.28, 1.86, 0.13]} position={[0, 0, 0.04]} color={palette.ink} hovered={hovered} />
      <Box size={[3.03, 1.61, 0.022]} position={[0, 0, 0.119]} color="#50465b" hovered={hovered} screen />
      {[
        [-0.72, 0.38, '#d39d9e'], [0.72, 0.38, '#9aac9d'],
        [-0.72, -0.23, '#c1a3c7'], [0.72, -0.23, '#d0b083'],
      ].map(([x, y, color], index) => (
        <group key={color} position={[x, y, 0.14]}>
          <Box size={[1.3, 0.5, 0.018]} color={color} hovered={hovered} screen />
          <Box size={[0.35, 0.31, 0.012]} position={[-0.36, 0, 0.02]} color={index % 2 ? '#6e7d71' : '#8e647f'} />
          {[0.11, 0.2, 0.16, 0.26].map((height, metricIndex) => (
            <Box key={metricIndex} size={[0.06, height, 0.012]} position={[0.03 + metricIndex * 0.1, -0.11 + height / 2, 0.024]} color={metricIndex % 2 ? palette.cream : palette.gold} />
          ))}
          <Box size={[0.55, 0.045, 0.012]} position={[0.2, 0.18, 0.02]} color={palette.cream} />
          <Box size={[0.38, 0.025, 0.012]} position={[0.12, 0.07, 0.02]} color={palette.white} />
        </group>
      ))}
      <Box size={[2.75, 0.055, 0.014]} position={[0, -0.65, 0.145]} color="#7b6d83" />
      <Box size={[0.43, 0.055, 0.017]} position={[-1.13, -0.65, 0.156]} color={palette.blush} />
      <Box size={[0.045, 0.025, 0.018]} position={[1.48, -0.867, 0.12]} color={palette.sage} />
    </group>
  )
}

export function NoticeBoard({ hovered }) {
  return (
    <group>
      <Box size={[2.35, 1.62, 0.13]} color={palette.woodDark} />
      <Box size={[2.21, 1.48, 0.07]} position={[0, 0, 0.09]} color={palette.gold} />
      <Box size={[2.07, 1.34, 0.025]} position={[0, 0, 0.139]} color="#b69073" hovered={hovered} />
      {[
        [-0.64, 0.27, '#f4eddf', -0.07], [0.09, 0.3, '#ddb0b4', 0.09],
        [-0.5, -0.34, '#e6dbc4', 0.04], [0.2, -0.32, '#b9c8bd', -0.1],
      ].map(([x, y, color, tilt], index) => (
        <group key={color} position={[x, y, 0.166 + index * 0.012]} rotation={[0, 0, tilt]}>
          <Box size={[0.56, 0.48, 0.016]} color={color} hovered={hovered} />
          {[0.055, -0.065].map((line) => (
            <Box key={line} size={[0.32, 0.015, 0.006]} position={[-0.04, line, 0.013]} color="#b1a292" />
          ))}
          <mesh position={[0, 0.18, 0.024]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.022, 8]} />
            <Material color={index % 2 ? palette.woodDark : palette.blush} />
          </mesh>
        </group>
      ))}
      <group position={[0.7, 0.13, 0.22]} rotation={[0, 0, -0.055]}>
        <Box size={[0.57, 0.67, 0.018]} color={palette.cream} hovered={hovered} />
        <Box size={[0.47, 0.47, 0.012]} position={[0, 0.045, 0.02]} color={palette.sky} />
        <Box size={[0.47, 0.16, 0.014]} position={[0, -0.105, 0.03]} color={palette.sage} />
        <Box size={[0.21, 0.22, 0.015]} position={[-0.085, -0.03, 0.037]} rotation={[0, 0, 0.35]} color="#90a185" />
        <Box size={[0.1, 0.08, 0.015]} position={[0.11, 0.18, 0.035]} color="#ead3a1" />
        <Box size={[0.18, 0.075, 0.012]} position={[0, 0.31, 0.04]} color="#d8bd9b" />
      </group>
    </group>
  )
}

export function Reports({ hovered, ...props }) {
  return (
    <group {...props}>
      {/* Low stand keeps this destination separate from the media console. */}
      <Box size={[1.92, 0.12, 1.22]} position={[0, -0.06, 0]} color={palette.white} />
      {[-0.72, 0.72].map((x) => (
        <Box key={x} size={[0.12, 0.605, 0.91]} position={[x, -0.4225, 0]} color={palette.woodDark} />
      ))}
      {['#805f79', '#b87f79', '#7e927c'].map((color, index) => {
        const height = 0.91 + index * 0.11
        return (
          <group key={color} position={[(index - 1) * 0.48, height / 2, 0]} rotation={[0, (index - 1) * 0.07, 0]}>
            <Box size={[0.3, height - 0.07, 0.68]} color={palette.cream} />
            {[-0.17, 0.17].map((x) => (
              <Box key={x} size={[0.04, height, 0.78]} position={[x, 0, 0]} color={color} hovered={hovered} />
            ))}
            <Box size={[0.38, height, 0.065]} position={[0, 0, 0.375]} color={color} hovered={hovered} />
            <Box size={[0.26, 0.28, 0.018]} position={[0, height * 0.18, 0.415]} color={palette.cream} hovered={hovered} />
            <Box size={[0.14, 0.022, 0.012]} position={[0, height * 0.18, 0.432]} color={color} />
            <Box size={[0.29, 0.035, 0.018]} position={[0, -height * 0.33, 0.415]} color={palette.gold} />
          </group>
        )
      })}
    </group>
  )
}
