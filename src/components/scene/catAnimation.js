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
