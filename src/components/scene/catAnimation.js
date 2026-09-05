export function getCatReactionPose(currentTime, startTime, reduceMotion) {
  const elapsed = currentTime - startTime
  const active = elapsed >= 0 && elapsed < 0.8 && !reduceMotion
  if (!active) return { y: 0, rotationZ: 0 }

  const falloff = 1 - elapsed / 0.8
  return {
    y: Math.abs(Math.sin(elapsed * Math.PI * 3.2)) * 0.32 * falloff,
    rotationZ: Math.sin(elapsed * Math.PI * 8) * 0.12 * falloff,
  }
}

export function getCatWalkPose(currentTime, startTime, reduceMotion) {
  const elapsed = currentTime - startTime
  const duration = 3
  if (reduceMotion || elapsed < 0 || elapsed >= duration) {
    return { x: 0, z: 0, rotationY: 0, bob: 0 }
  }

  const progress = elapsed / duration
  const x = Math.sin(progress * Math.PI) * 0.72
  const z = Math.sin(progress * Math.PI * 2) * 0.34
  const dx = Math.cos(progress * Math.PI) * Math.PI * 0.72
  const dz = Math.cos(progress * Math.PI * 2) * Math.PI * 2 * 0.34

  return {
    x,
    z,
    rotationY: Math.atan2(dx, dz),
    bob: Math.abs(Math.sin(elapsed * Math.PI * 2.8)) * 0.04,
  }
}
