import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils, Vector3 } from 'three'
import { OrbitControls } from '@react-three/drei'
import {
  getCameraPreset,
  getResponsiveCameraPosition,
  getResponsiveCameraTarget,
  hasCameraPreset,
} from '../../data/cameraPresets'

export default function CameraController({ selectedSection }) {
  const controls = useRef(null)
  const lookAt = useRef(new Vector3(...getCameraPreset(null).target))
  const previousSelection = useRef(selectedSection)
  const returningHome = useRef(false)
  const dragging = useRef(false)
  const parallaxOffset = useRef(new Vector3())
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReduceMotion(media.matches)
    updatePreference()
    media.addEventListener?.('change', updatePreference)
    return () => media.removeEventListener?.('change', updatePreference)
  }, [])

  useEffect(() => {
    const orbit = controls.current
    if (!orbit) return
    const home = getCameraPreset(null)
    orbit.target.set(...home.target)
    orbit.update()
    orbit.saveState?.()
  }, [])

  useEffect(() => {
    const orbit = controls.current
    if (!orbit) return
    if (selectedSection) {
      orbit.enabled = false
      returningHome.current = false
    } else if (previousSelection.current) {
      returningHome.current = true
      orbit.enabled = false
    }
    previousSelection.current = selectedSection
  }, [selectedSection])

  useFrame(({ camera, pointer, size }, delta) => {
    camera.position.sub(parallaxOffset.current)
    const preset = getCameraPreset(selectedSection)
    const hasSelection = hasCameraPreset(selectedSection)
    const aspect = size.width / size.height
    const position = getResponsiveCameraPosition(
      preset,
      aspect,
      hasSelection,
      size.width,
    )
    const target = getResponsiveCameraTarget(
      preset,
      aspect,
      hasSelection,
      size.width,
    )
    const orbit = controls.current
    const overviewParallax = hasSelection || dragging.current || returningHome.current
      ? [0, 0, 0]
      : [pointer.x * 0.34, pointer.y * 0.16, pointer.x * 0.12]
    const easing = reduceMotion ? 18 : 4.5

    if (orbit && !hasSelection && !returningHome.current) {
      orbit.enabled = true
      orbit.update()
    }

    const animatingPreset = hasSelection || returningHome.current
    if (animatingPreset) {
      camera.position.x = MathUtils.damp(camera.position.x, position[0], easing, delta)
      camera.position.y = MathUtils.damp(camera.position.y, position[1], easing, delta)
      camera.position.z = MathUtils.damp(camera.position.z, position[2], easing, delta)
    }

    const desiredParallax = new Vector3(...overviewParallax)
    parallaxOffset.current.x = MathUtils.damp(
      parallaxOffset.current.x,
      desiredParallax.x,
      easing,
      delta,
    )
    parallaxOffset.current.y = MathUtils.damp(
      parallaxOffset.current.y,
      desiredParallax.y,
      easing,
      delta,
    )
    parallaxOffset.current.z = MathUtils.damp(
      parallaxOffset.current.z,
      desiredParallax.z,
      easing,
      delta,
    )
    if (!animatingPreset) camera.position.add(parallaxOffset.current)

    if (animatingPreset) {
      lookAt.current.x = MathUtils.damp(lookAt.current.x, target[0], easing, delta)
      lookAt.current.y = MathUtils.damp(lookAt.current.y, target[1], easing, delta)
      lookAt.current.z = MathUtils.damp(lookAt.current.z, target[2], easing, delta)
      camera.lookAt(lookAt.current)
    }

    if (returningHome.current) {
      const home = getCameraPreset(null)
      const closeEnough = camera.position.distanceTo(new Vector3(...position)) < 0.05
      if (closeEnough) {
        returningHome.current = false
        if (orbit) {
          orbit.target.set(...getResponsiveCameraTarget(home, aspect, false, size.width))
          orbit.enabled = true
          orbit.update()
        }
      }
    }
  })

  return (
    <OrbitControls
      ref={controls}
      enableDamping
      dampingFactor={0.08}
      enablePan={false}
      minDistance={6}
      maxDistance={18}
      minPolarAngle={0.58}
      maxPolarAngle={1.42}
      minAzimuthAngle={-0.65}
      maxAzimuthAngle={1.75}
      onStart={() => { dragging.current = true }}
      onEnd={() => { dragging.current = false }}
    />
  )
}
