import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils, Vector3 } from 'three'
import {
  getCameraPreset,
  getResponsiveCameraPosition,
  getResponsiveCameraTarget,
  hasCameraPreset,
} from '../../data/cameraPresets'

export default function CameraController({ selectedSection }) {
  const lookAt = useRef(new Vector3(...getCameraPreset(null).target))
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReduceMotion(media.matches)
    updatePreference()
    media.addEventListener?.('change', updatePreference)
    return () => media.removeEventListener?.('change', updatePreference)
  }, [])

  useFrame(({ camera, pointer, size }, delta) => {
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
    const overviewParallax = hasSelection
      ? [0, 0, 0]
      : [pointer.x * 0.34, pointer.y * 0.16, pointer.x * 0.12]
    const easing = reduceMotion ? 18 : 4.5

    camera.position.x = MathUtils.damp(
      camera.position.x,
      position[0] + overviewParallax[0],
      easing,
      delta,
    )
    camera.position.y = MathUtils.damp(
      camera.position.y,
      position[1] + overviewParallax[1],
      easing,
      delta,
    )
    camera.position.z = MathUtils.damp(
      camera.position.z,
      position[2] + overviewParallax[2],
      easing,
      delta,
    )

    lookAt.current.x = MathUtils.damp(
      lookAt.current.x,
      target[0],
      easing,
      delta,
    )
    lookAt.current.y = MathUtils.damp(
      lookAt.current.y,
      target[1],
      easing,
      delta,
    )
    lookAt.current.z = MathUtils.damp(
      lookAt.current.z,
      target[2],
      easing,
      delta,
    )
    camera.lookAt(lookAt.current)
  })

  return null
}
