import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useAnimations, useGLTF } from '@react-three/drei'
import { LoopRepeat } from 'three'
import { getCatWalkPose } from '../catAnimation'

const CAT_MODEL_URL = '/models/fluffy-cat.glb'
const CAT_SCALE = 0.36

export default function Cat({ reaction }) {
  const cat = useRef()
  const walkStart = useRef(-10)
  const walkPending = useRef(false)
  const trotActive = useRef(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const { scene, animations } = useGLTF(CAT_MODEL_URL)
  const { actions } = useAnimations(animations, cat)

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
      if (!reduceMotion) {
        const trot = actions[animations[0]?.name]
        trot?.reset().setLoop(LoopRepeat, Infinity).fadeIn(0.12).play()
        trotActive.current = Boolean(trot)
      }
    }
    const pose = getCatWalkPose(clock.elapsedTime, walkStart.current, reduceMotion)
    cat.current.position.set(pose.x, pose.bob, pose.z)
    cat.current.rotation.y = pose.rotationY

    if (trotActive.current && clock.elapsedTime - walkStart.current >= 3) {
      actions[animations[0]?.name]?.fadeOut(0.18)
      trotActive.current = false
    }
  })

  return (
    <group ref={cat}>
      <primitive object={scene} position={[0, -0.375, 0]} rotation={[0, -0.35, 0]} scale={CAT_SCALE} />
    </group>
  )
}

useGLTF.preload(CAT_MODEL_URL)
