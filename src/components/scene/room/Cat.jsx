import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { getCatReactionPose } from '../catAnimation'
import { Material, palette } from './materials'

function Box({ size, color, ...props }) {
  return (
    <mesh castShadow {...props}>
      <boxGeometry args={size} />
      <Material color={color} />
    </mesh>
  )
}

export default function Cat({ reaction }) {
  const cat = useRef()
  const reactionStart = useRef(-10)
  const reactionPending = useRef(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (reaction > 0) reactionPending.current = true
  }, [reaction])

  useFrame(({ clock }) => {
    if (!cat.current) return
    if (reactionPending.current) {
      reactionStart.current = clock.elapsedTime
      reactionPending.current = false
    }
    const pose = getCatReactionPose(clock.elapsedTime, reactionStart.current, reduceMotion)
    cat.current.position.y = pose.y
    cat.current.rotation.z = pose.rotationZ
  })

  return (
    <group ref={cat} rotation={[0, -0.35, 0]}>
      <Box size={[0.6, 0.65, 0.9]} position={[0, 0.28, 0]} color="#bb8775" />
      <Box size={[0.68, 0.45, 0.73]} position={[0, 0.25, -0.015]} color="#c8917c" />
      <Box size={[0.43, 0.55, 0.18]} position={[0, 0.36, 0.44]} color="#dfb99a" />
      <Box size={[0.64, 0.53, 0.55]} position={[0, 0.87, 0.3]} color="#c8917c" />
      <Box size={[0.55, 0.4, 0.63]} position={[0, 0.85, 0.32]} color="#d29c84" />
      {[-0.21, 0.21].map((x) => (
        <group key={x}>
          <group position={[x, 1.21, 0.31]} rotation={[0, 0, -x * 1.1]}>
            <Box size={[0.19, 0.31, 0.2]} color="#a9776b" />
            <Box size={[0.1, 0.18, 0.025]} position={[0, 0.015, 0.11]} color={palette.blush} />
          </group>
          <Box size={[0.065, 0.085, 0.025]} position={[x, 0.92, 0.648]} color={palette.ink} />
          <Box size={[0.022, 0.023, 0.012]} position={[x - 0.012, 0.941, 0.666]} color={palette.cream} />
        </group>
      ))}
      {[-0.1, 0.1].map((x) => (
        <Box key={x} size={[0.2, 0.16, 0.13]} position={[x, 0.765, 0.65]} color="#efd1b1" />
      ))}
      <Box size={[0.085, 0.06, 0.04]} position={[0, 0.815, 0.731]} color="#96635f" />
      {[-0.22, 0.22].flatMap((x) => [-0.3, 0.32].map((z) => (
        <mesh castShadow key={`${x}-${z}`} position={[x, -0.19, z]}>
          <cylinderGeometry args={[0.12, 0.14, 0.37, 8]} />
          <Material color={z > 0 ? '#e3bea0' : '#a9776b'} />
        </mesh>
      )))}
      {/* Short cylinder segments curve the striped tail up beside the body. */}
      {Array.from({ length: 7 }, (_, index) => (
        <mesh
          castShadow
          key={index}
          position={[0.3 + Math.sin(index * 0.24) * 0.34, 0.01 + index * 0.145, -0.39 - index * 0.025]}
          rotation={[0, 0, -0.46 + index * 0.075]}
        >
          <cylinderGeometry args={[0.085 - index * 0.004, 0.09 - index * 0.004, 0.19, 8]} />
          <Material color={index % 2 ? '#9e6c62' : '#d29c84'} />
        </mesh>
      ))}
    </group>
  )
}
