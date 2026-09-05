import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { getCatWalkPose } from '../catAnimation'

const CAT_MODEL_URL = '/models/fluffy-cat.glb'
const CAT_SCALE = 0.72

export default function Cat({ reaction }) {
  const cat = useRef()
  const walkStart = useRef(-10)
  const walkPending = useRef(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const { scene } = useGLTF(CAT_MODEL_URL)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReduceMotion(media.matches)
    updatePreference()
    media.addEventListener?.('change', updatePreference)
    return () => media.removeEventListener?.('change', updatePreference)
  }, [])

  useEffect(() => {
    if (reaction > 0) walkPending.current = true
  }, [reaction])

  useFrame(({ clock }) => {
    if (!cat.current) return
    if (walkPending.current) {
      walkStart.current = clock.elapsedTime
      walkPending.current = false
    }
    const pose = getCatWalkPose(clock.elapsedTime, walkStart.current, reduceMotion)
    cat.current.position.set(pose.x, pose.bob, pose.z)
    cat.current.rotation.y = pose.rotationY
  })

  return (
    <group ref={cat}>
      <primitive object={scene} position={[0, -0.375, 0]} rotation={[0, -0.35, 0]} scale={CAT_SCALE} />
    </group>
  )
}

useGLTF.preload(CAT_MODEL_URL)
